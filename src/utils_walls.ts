import { GRID_HEIGHT, GRID_WIDTH } from './constants';
import type { Point } from './types';

export const getWallsForLevel = (level: number): Point[] => {
  const walls: Point[] = [];
  const midX = Math.floor(GRID_WIDTH / 2);
  const midY = Math.floor(GRID_HEIGHT / 2);

  switch (level) {
    case 2: // Horizontal bar
      for (let x = 5; x < GRID_WIDTH - 5; x++) {
        walls.push({ x, y: midY });
      }
      break;
    case 3: // Two vertical bars
      for (let y = 5; y < GRID_HEIGHT - 5; y++) {
        walls.push({ x: 8, y });
        walls.push({ x: GRID_WIDTH - 9, y });
      }
      break;
    case 4: // Box with openings
      // Top and Bottom walls
      for (let x = 8; x < GRID_WIDTH - 8; x++) {
        if (x !== midX && x !== midX - 1 && x !== midX + 1) {
          walls.push({ x, y: 8 });
          walls.push({ x, y: GRID_HEIGHT - 9 });
        }
      }
      // Left and Right walls
      for (let y = 8; y < GRID_HEIGHT - 8; y++) {
        if (y !== midY && y !== midY - 1 && y !== midY + 1) {
          walls.push({ x: 8, y });
          walls.push({ x: GRID_WIDTH - 9, y });
        }
      }
      break;
    case 5: // Cross
      // Horizontal line
      for (let x = 5; x < GRID_WIDTH - 5; x++) {
        if (x !== midX && x !== midX - 1 && x !== midX + 1) {
          walls.push({ x, y: midY });
        }
      }
      // Vertical line
      for (let y = 5; y < GRID_HEIGHT - 5; y++) {
        if (y !== midY && y !== midY - 1 && y !== midY + 1) {
          walls.push({ x: midX, y });
        }
      }
      break;
    case 6: // Diagonal corridors
      // Top-left to bottom-right diagonal
      for (let i = 5; i < Math.min(GRID_WIDTH, GRID_HEIGHT) - 5; i++) {
        if (i % 3 !== 0) { // Gaps every 3 blocks
          walls.push({ x: i, y: i });
        }
      }
      // Top-right to bottom-left diagonal
      for (let i = 5; i < Math.min(GRID_WIDTH, GRID_HEIGHT) - 5; i++) {
        if (i % 3 !== 1) { // Offset gaps
          walls.push({ x: GRID_WIDTH - 1 - i, y: i });
        }
      }
      break;
    case 7: // Maze-like corridors
      // Vertical corridors
      for (let x = 10; x < GRID_WIDTH - 10; x += 6) {
        for (let y = 3; y < GRID_HEIGHT - 3; y++) {
          if (y < midY - 2 || y > midY + 2) { // Opening in middle
            walls.push({ x, y });
          }
        }
      }
      break;
    case 8: // Spiral pattern
      const spiralSize = 8;
      // Outer box
      for (let x = spiralSize; x < GRID_WIDTH - spiralSize; x++) {
        walls.push({ x, y: spiralSize });
        walls.push({ x, y: GRID_HEIGHT - spiralSize - 1 });
      }
      for (let y = spiralSize; y < GRID_HEIGHT - spiralSize; y++) {
        walls.push({ x: spiralSize, y });
        walls.push({ x: GRID_WIDTH - spiralSize - 1, y });
      }
      // Inner partial box (with openings)
      for (let x = spiralSize + 4; x < GRID_WIDTH - spiralSize - 4; x++) {
        if (x < midX - 3 || x > midX + 3) {
          walls.push({ x, y: spiralSize + 4 });
          walls.push({ x, y: GRID_HEIGHT - spiralSize - 5 });
        }
      }
      break;
    case 9: // Scattered pillars
      for (let x = 8; x < GRID_WIDTH - 8; x += 8) {
        for (let y = 6; y < GRID_HEIGHT - 6; y += 6) {
          // 2x2 pillars with gaps
          walls.push({ x, y });
          walls.push({ x: x + 1, y });
          walls.push({ x, y: y + 1 });
          walls.push({ x: x + 1, y: y + 1 });
        }
      }
      break;
    case 10: // Ultimate challenge - Complex maze
      // Horizontal barriers with gaps
      for (let y = 8; y < GRID_HEIGHT - 8; y += 6) {
        for (let x = 5; x < GRID_WIDTH - 5; x++) {
          if (x % 8 < 5) { // Create gaps
            walls.push({ x, y });
          }
        }
      }
      // Vertical barriers with gaps
      for (let x = 12; x < GRID_WIDTH - 12; x += 10) {
        for (let y = 5; y < GRID_HEIGHT - 5; y++) {
          if (y % 7 < 4) { // Create gaps
            walls.push({ x, y });
          }
        }
      }
      break;
  }
  return walls;
};
