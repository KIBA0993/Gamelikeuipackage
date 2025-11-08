import { HealthState, BUFF_CAPS } from '../types/game';

/**
 * Calculate daily Energy award per PRD §4
 * E_day = round(150 × max(0, 1 − r)^γ)
 * where r = U/L and γ ∈ [0.8..1.4] (default 1.0)
 */
export function calculateEnergyAward(
  usageMinutes: number,
  limitMinutes: number,
  gamma: number = 1.0
): number {
  if (limitMinutes <= 0) return 0;
  if (limitMinutes > 180) return 0; // PRD: limit > 180 = no award
  
  const r = Math.max(0, usageMinutes / limitMinutes);
  const baseAward = Math.max(0, 1 - r);
  const award = 150 * Math.pow(baseAward, gamma);
  
  return Math.round(award);
}

/**
 * Get the current buff cap based on health state and fragile status
 */
export function getBuffCap(
  healthState: HealthState,
  isFragile: boolean
): number {
  if (healthState === 'dead') return 0;
  if (healthState === 'sick') return BUFF_CAPS.sick;
  if (isFragile) return BUFF_CAPS.fragile;
  return BUFF_CAPS.healthy;
}

/**
 * Calculate effective daily buff with cap enforcement
 */
export function calculateEffectiveBuff(
  buffSum: number,
  healthState: HealthState,
  isFragile: boolean
): number {
  const cap = getBuffCap(healthState, isFragile);
  return Math.min(buffSum, cap);
}

/**
 * Calculate growth for the day
 * Base growth + buff modifier
 */
export function calculateDailyGrowth(
  energyAward: number,
  dailyBuff: number,
  healthState: HealthState
): number {
  // No growth if sick or dead
  if (healthState === 'sick' || healthState === 'dead') return 0;
  
  // Base growth from energy (normalize to 0-1 range)
  const baseGrowth = energyAward / 150; // 0-1
  
  // Apply buff multiplier (1 + buff)
  const growthUnits = baseGrowth * (1 + dailyBuff);
  
  // Convert to percentage points (0-100 scale)
  return growthUnits * 100;
}

/**
 * Check if enough time has passed for recovery cooldown
 */
export function isCooldownExpired(
  lastActionAt: Date | null,
  cooldownHours: number
): boolean {
  if (!lastActionAt) return true;
  
  const now = new Date();
  const cooldownMs = cooldownHours * 60 * 60 * 1000;
  const elapsed = now.getTime() - lastActionAt.getTime();
  
  return elapsed >= cooldownMs;
}

/**
 * Check if within count limit for a period
 */
export function isWithinLimit(
  count: number,
  maxCount: number
): boolean {
  return count < maxCount;
}

/**
 * Get next available time for an action
 */
export function getNextAvailableTime(
  lastActionAt: Date | null,
  cooldownHours: number
): Date | null {
  if (!lastActionAt) return null;
  
  const next = new Date(lastActionAt);
  next.setHours(next.getHours() + cooldownHours);
  
  return next;
}

/**
 * Check if user is in fragile state (post-revive)
 */
export function isFragile(fragileUntil: Date | null): boolean {
  if (!fragileUntil) return false;
  return new Date() < fragileUntil;
}

/**
 * Get ratio description for UI
 */
export function getRatioDescription(ratio: number): {
  label: string;
  color: string;
  emoji: string;
} {
  if (ratio <= 0.15) {
    return { label: 'Excellent', color: 'green', emoji: '🎯' };
  } else if (ratio <= 0.25) {
    return { label: 'Great', color: 'lime', emoji: '✨' };
  } else if (ratio <= 0.50) {
    return { label: 'Good', color: 'yellow', emoji: '⭐' };
  } else if (ratio < 1.0) {
    return { label: 'OK', color: 'orange', emoji: '✓' };
  } else {
    return { label: 'Exceeded', color: 'red', emoji: '❌' };
  }
}
