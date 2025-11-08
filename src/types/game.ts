// Unhooked v2 Type Definitions

export type HealthState = 'healthy' | 'sick' | 'dead';
export type PetSpecies = 'cat' | 'dog';
export type Currency = 'energy' | 'gems';

export interface GameState {
  // Pet
  species: PetSpecies;
  stage: number; // 0-4 evolution stages
  growthProgress: number; // 0-100
  
  // Health
  healthState: HealthState;
  consecutiveUnfedDays: number;
  fragileUntil: Date | null; // Post-revive fragile period
  deadAt: Date | null;
  
  // Daily tracking
  fedToday: boolean; // true when ≥100 E spent on food today
  todayBuff: number; // Accumulated buff from food purchases today
  todayFoodSpend: number; // Total Energy spent on food today
  
  // Currencies
  energy: number; // Max 150/day earning
  gems: number; // Paid currency
  
  // Stats
  fullness: number; // 0-100%
  mood: number; // 1-5 scale
  
  // Daily usage
  currentUsage: number; // minutes
  currentLimit: number; // minutes
  lastEnergyAward: number;
  
  // Recovery tracking
  lastCureAt: Date | null;
  cureCount30d: number;
  lastReviveAt: Date | null;
  reviveCount90d: number;
  lastRestartAt: Date | null;
  
  // Meta
  lastResetDate: string; // yyyy-mm-dd
  createdAt: Date;
}

export interface FoodItem {
  id: string;
  title: string;
  priceEnergy: number; // 25-150
  speciesScope: 'cat' | 'dog' | 'both';
  fullnessDelta: number; // 10-60%
  moodDelta: number; // 1-3
  buffFrac: number; // 0.00-0.15
  animation?: string;
  emoji?: string;
  seasonal?: {
    startDate: string; // ISO date
    endDate: string;
  };
}

export interface RecoveryConfig {
  cureSickGems: number; // default 120
  reviveDeadGems: number; // default 400
  restartGems: number; // default 200
  cureCooldownH: number; // default 24
  reviveCooldownH: number; // default 168 (7 days)
  restartCooldownH: number; // default 24
  cureMaxPer30d: number; // default 5
  reviveMaxPer90d: number; // default 2
  fragileDays: number; // default 3
  fragileBuffCap: number; // default 0.15
}

export interface DailyStats {
  date: string; // yyyy-mm-dd
  usageMinutes: number;
  limitMinutes: number;
  ratio: number;
  energyAwarded: number;
  fedToday: boolean;
}

export const RECOVERY_CONFIG: RecoveryConfig = {
  cureSickGems: 120,
  reviveDeadGems: 400,
  restartGems: 200,
  cureCooldownH: 24,
  reviveCooldownH: 168,
  restartCooldownH: 24,
  cureMaxPer30d: 5,
  reviveMaxPer90d: 2,
  fragileDays: 3,
  fragileBuffCap: 0.15,
};

export const EVOLUTION_STAGES = [
  { name: 'Egg', threshold: 0 },
  { name: 'Baby', threshold: 25 },
  { name: 'Teen', threshold: 60 },
  { name: 'Adult', threshold: 100 },
  { name: 'Master', threshold: 150 },
];

// Health state buff caps
export const BUFF_CAPS = {
  healthy: 0.25,
  sick: 0.10,
  fragile: 0.15,
} as const;
