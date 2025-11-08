import { FoodItem } from '../types/game';

// Food catalog per PRD §7
export const FOOD_CATALOG: FoodItem[] = [
  // Cat items
  {
    id: 'cat_tuna_25',
    title: 'Tuna Treats',
    priceEnergy: 25,
    speciesScope: 'cat',
    fullnessDelta: 12,
    moodDelta: 1,
    buffFrac: 0.00,
    animation: 'chew_fish',
    emoji: '🐟',
  },
  {
    id: 'cat_chicken_50',
    title: 'Chicken Bites',
    priceEnergy: 50,
    speciesScope: 'cat',
    fullnessDelta: 22,
    moodDelta: 1,
    buffFrac: 0.05,
    animation: 'chew_bite',
    emoji: '🍗',
  },
  {
    id: 'cat_salmon_100',
    title: 'Salmon Bowl',
    priceEnergy: 100,
    speciesScope: 'cat',
    fullnessDelta: 40,
    moodDelta: 2,
    buffFrac: 0.10,
    animation: 'slurp_bowl',
    emoji: '🍱',
  },
  {
    id: 'cat_catnip_150',
    title: 'Catnip Feast',
    priceEnergy: 150,
    speciesScope: 'cat',
    fullnessDelta: 55,
    moodDelta: 3,
    buffFrac: 0.15,
    animation: 'catnip_spin',
    emoji: '🌿',
    seasonal: {
      startDate: '2025-01-01',
      endDate: '2025-12-31',
    },
  },
  
  // Dog items
  {
    id: 'dog_biscuit_25',
    title: 'Crunch Biscuit',
    priceEnergy: 25,
    speciesScope: 'dog',
    fullnessDelta: 15,
    moodDelta: 1,
    buffFrac: 0.00,
    animation: 'crunch_biscuit',
    emoji: '🦴',
  },
  {
    id: 'dog_jerky_50',
    title: 'Turkey Jerky',
    priceEnergy: 50,
    speciesScope: 'dog',
    fullnessDelta: 25,
    moodDelta: 1,
    buffFrac: 0.05,
    animation: 'tug_jerky',
    emoji: '🥓',
  },
  {
    id: 'dog_stew_100',
    title: 'Beef Stew',
    priceEnergy: 100,
    speciesScope: 'dog',
    fullnessDelta: 45,
    moodDelta: 2,
    buffFrac: 0.10,
    animation: 'lap_stew',
    emoji: '🍲',
  },
  {
    id: 'dog_bones_150',
    title: 'Birthday Bones',
    priceEnergy: 150,
    speciesScope: 'dog',
    fullnessDelta: 60,
    moodDelta: 3,
    buffFrac: 0.15,
    animation: 'bone_party',
    emoji: '🎉',
    seasonal: {
      startDate: '2025-01-01',
      endDate: '2025-12-31',
    },
  },
  
  // Both species
  {
    id: 'both_veggie_75',
    title: 'Veggie Medley',
    priceEnergy: 75,
    speciesScope: 'both',
    fullnessDelta: 30,
    moodDelta: 1,
    buffFrac: 0.05,
    animation: 'chew_crunch',
    emoji: '🥗',
  },
];

// Helper to filter food by species
export function getFoodForSpecies(species: 'cat' | 'dog'): FoodItem[] {
  return FOOD_CATALOG.filter(
    item => item.speciesScope === species || item.speciesScope === 'both'
  );
}

// Helper to check if seasonal item is available
export function isFoodAvailable(item: FoodItem): boolean {
  if (!item.seasonal) return true;
  
  const now = new Date();
  const start = new Date(item.seasonal.startDate);
  const end = new Date(item.seasonal.endDate);
  
  return now >= start && now <= end;
}
