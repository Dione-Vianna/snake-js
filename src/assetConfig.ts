// Asset Configuration
// Centralized configuration for game assets

export const LEVEL_ASSETS = {
  music: [
    '/music/VoxelRevolution.mp3',      // Level 1
    '/music/NewerWave.mp3',             // Level 2
    '/music/BleepingDemo.mp3',          // Level 3
    '/music/BeautyFlow.mp3',            // Level 4
    '/music/DesertofLostSouls.mp3',    // Level 5
  ],
  wallpapers: [
    '/wallpaper/01.gif',  // Level 1
    '/wallpaper/02.gif',  // Level 2
    '/wallpaper/03.gif',  // Level 3
    '/wallpaper/04.gif',  // Level 4
    '/wallpaper/05.gif',  // Level 5
  ],
} as const;

// Helper functions to get assets by level (1-indexed) - cycles for levels 6-10
export const getMusicForLevel = (level: number): string => {
  const index = (level - 1) % LEVEL_ASSETS.music.length;
  return LEVEL_ASSETS.music[index];
};

export const getWallpaperForLevel = (level: number): string => {
  const index = (level - 1) % LEVEL_ASSETS.wallpapers.length;
  return LEVEL_ASSETS.wallpapers[index];
};
