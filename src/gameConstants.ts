// Game Configuration Constants

// Scoring
export const SCORE_PER_LEVEL = 100;
export const MAX_LEVEL = 10;

// Speed
export const MIN_SPEED = 50;
export const SPEED_DECREASE_PER_BOLT = 20;

// Fruits
export const MIN_FRUITS = 3;
export const MAX_FRUITS = 5;
export const EXTRA_FRUIT_CHANCE = 0.3;

// Fruit spawn probabilities (must sum to 1.0)
export const FRUIT_SPAWN_RATES = {
  BOLT: 0.2,   // 20% chance (> 0.8)
  GRAPE: 0.2,  // 20% chance (> 0.6)
  ORANGE: 0.2, // 20% chance (> 0.4)
  APPLE: 0.4,  // 40% chance (remaining)
} as const;

// Touch controls
export const MIN_SWIPE_DISTANCE = 30;
