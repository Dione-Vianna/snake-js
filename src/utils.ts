import { GRID_HEIGHT, GRID_WIDTH } from './constants';
import type { Fruit, FruitType, Point } from './types';

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
  }
  return walls;
};

export const generateFruit = (
  currentSnake: Point[],
  currentWalls: Point[],
  existingFruits: Point[] = []
): Fruit => {
  let newFruit: Fruit;
  let isColliding;

  do {
    const x = Math.floor(Math.random() * GRID_WIDTH);
    const y = Math.floor(Math.random() * GRID_HEIGHT);

    // Determine type
    const rand = Math.random();
    let type: FruitType = 'APPLE';
    let points = 10;

    if (rand > 0.8) {
      type = 'BOLT';
      points = 50;
    } else if (rand > 0.6) {
      type = 'GRAPE';
      points = 30;
    } else if (rand > 0.4) {
      type = 'ORANGE';
      points = 20;
    }

    newFruit = {
      x,
      y,
      type,
      points,
      id: Math.random().toString(36).substr(2, 9),
    };

    isColliding =
      currentSnake.some((segment) => segment.x === newFruit.x && segment.y === newFruit.y) ||
      currentWalls.some((wall) => wall.x === newFruit.x && wall.y === newFruit.y) ||
      existingFruits.some((fruit) => fruit.x === newFruit.x && fruit.y === newFruit.y);
  } while (isColliding);

  return newFruit;
};

// Shared AudioContext to prevent hitting browser limits
let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContext) {
      audioContext = new AudioContext();
    }
  }
  return audioContext;
};

export const playEatSound = (type: FruitType = 'APPLE') => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'BOLT') {
      // Zap sound for bolt
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } else {
      // Normal beep
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    }
  } catch (e) {
    console.error('Audio play failed', e);
  }
};

export const playGameOverSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.5);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch (e) {
    console.error('Audio play failed', e);
  }
};

export const playMoveSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'square';
    osc.frequency.setValueAtTime(150, ctx.currentTime);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {
    console.error('Audio play failed', e);
  }
};

export const playStepSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Very short, low frequency "tick"
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, ctx.currentTime);

    gain.gain.setValueAtTime(0.1, ctx.currentTime); // Increased volume
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  } catch (e) {
    console.error('Audio play failed', e);
  }
};
