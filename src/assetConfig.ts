// Asset Configuration
// Centralized configuration for game assets

export const LEVEL_ASSETS = {
  music: [
    '/src/music/VoxelRevolution.mp3',      // Level 1
    '/src/music/NewerWave.mp3',             // Level 2
    '/src/music/BleepingDemo.mp3',          // Level 3
    '/src/music/BeautyFlow.mp3',            // Level 4
    '/src/music/DesertofLostSouls.mp3',    // Level 5
  ],
  wallpapers: [
    '/src/wallpaper/01.gif',  // Level 1
    '/src/wallpaper/02.gif',  // Level 2
    '/src/wallpaper/03.gif',  // Level 3
    '/src/wallpaper/04.gif',  // Level 4
    '/src/wallpaper/05.gif',  // Level 5
  ],
} as const;

// Helper functions to get assets by level (1-indexed)
export const getMusicForLevel = (level: number): string => {
  const index = Math.max(0, Math.min(level - 1, LEVEL_ASSETS.music.length - 1));
  return LEVEL_ASSETS.music[index];
};

export const getWallpaperForLevel = (level: number): string => {
  const index = Math.max(0, Math.min(level - 1, LEVEL_ASSETS.wallpapers.length - 1));
  return LEVEL_ASSETS.wallpapers[index];
};
