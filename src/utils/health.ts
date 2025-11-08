import { HealthState } from '../types/game';

/**
 * Determine health state based on consecutive unfed days per PRD §6
 * - Healthy: 0-2 consecutive unfed days
 * - Sick: 3-6 consecutive unfed days
 * - Dead: 7+ consecutive unfed days
 */
export function getHealthStateFromUnfedDays(consecutiveUnfedDays: number): HealthState {
  if (consecutiveUnfedDays >= 7) return 'dead';
  if (consecutiveUnfedDays >= 3) return 'sick';
  return 'healthy';
}

/**
 * Check if action is allowed in current health state per PRD Appendix A
 */
export function isActionAllowed(
  action: 'feed' | 'trick' | 'pet' | 'groom' | 'nap',
  healthState: HealthState
): boolean {
  switch (action) {
    case 'feed':
      return healthState !== 'dead';
    case 'trick':
      return healthState === 'healthy';
    case 'pet':
    case 'groom':
      return true; // Allowed in all states (memorial pat when dead)
    case 'nap':
      return healthState !== 'dead';
    default:
      return false;
  }
}

/**
 * Get health state visual effects
 */
export function getHealthStateEffects(healthState: HealthState): {
  overlay?: string;
  saturation: number;
  animation?: string;
  message: string;
} {
  switch (healthState) {
    case 'sick':
      return {
        overlay: 'rgba(0, 0, 0, 0.1)',
        saturation: 0.9, // 10% desaturation
        animation: 'cough_sneeze',
        message: 'Your friend is feeling unwell...',
      };
    case 'dead':
      return {
        overlay: 'rgba(0, 0, 0, 0.3)',
        saturation: 0.0, // Grayscale
        animation: 'ghost_float',
        message: 'Your friend has passed away...',
      };
    case 'healthy':
    default:
      return {
        saturation: 1.0,
        message: 'Your friend is happy and healthy!',
      };
  }
}

/**
 * Check if natural recovery from Sick is possible
 * Per PRD: 2 fed days in rolling 3-day window
 */
export function canNaturallyRecover(fedDaysInLast3: number[]): boolean {
  // Count true values in last 3 days
  const fedCount = fedDaysInLast3.filter(Boolean).length;
  return fedCount >= 2;
}

/**
 * Get recovery option availability
 */
export function getRecoveryOptions(
  healthState: HealthState,
  gems: number,
  cureGems: number,
  reviveGems: number,
  restartGems: number
): {
  cure: { available: boolean; reason?: string };
  revive: { available: boolean; reason?: string };
  restart: { available: boolean; reason?: string };
} {
  const options = {
    cure: { available: false as boolean, reason: undefined as string | undefined },
    revive: { available: false as boolean, reason: undefined as string | undefined },
    restart: { available: false as boolean, reason: undefined as string | undefined },
  };

  if (healthState === 'sick') {
    options.cure.available = gems >= cureGems;
    if (!options.cure.available) {
      options.cure.reason = 'Not enough Gems';
    }
    
    options.restart.available = gems >= restartGems;
    if (!options.restart.available) {
      options.restart.reason = 'Not enough Gems';
    }
  }

  if (healthState === 'dead') {
    options.revive.available = gems >= reviveGems;
    if (!options.revive.available) {
      options.revive.reason = 'Not enough Gems';
    }
    
    options.restart.available = gems >= restartGems;
    if (!options.restart.available) {
      options.restart.reason = 'Not enough Gems';
    }
  }

  return options;
}

/**
 * Get health state color for UI
 */
export function getHealthStateColor(healthState: HealthState): string {
  switch (healthState) {
    case 'healthy':
      return '#10b981'; // green
    case 'sick':
      return '#f59e0b'; // amber
    case 'dead':
      return '#ef4444'; // red
  }
}

/**
 * Get health state icon
 */
export function getHealthStateIcon(healthState: HealthState): string {
  switch (healthState) {
    case 'healthy':
      return '💚';
    case 'sick':
      return '🤒';
    case 'dead':
      return '👻';
  }
}
