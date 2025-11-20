import { useEffect, useRef, useState } from 'react';
import {
  GRID_HEIGHT,
  GRID_WIDTH,
  INITIAL_DIRECTION,
  INITIAL_SNAKE,
  INITIAL_SPEED,
} from '../constants';
import {
  EXTRA_FRUIT_CHANCE,
  MAX_FRUITS,
  MAX_LEVEL,
  MIN_FRUITS,
  MIN_SPEED,
  SCORE_PER_LEVEL,
  SPEED_DECREASE_PER_BOLT,
} from '../gameConstants';
import type { Fruit, Point } from '../types';
import { generateFruit, getWallsForLevel, playEatSound, playGameOverSound, playMoveSound, playStepSound } from '../utils';

export const useSnakeGame = () => {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [direction, setDirection] = useState<string>(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [fps, setFps] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(INITIAL_SPEED);
  const [level, setLevel] = useState<number>(1);
  const [walls, setWalls] = useState<Point[]>([]);
  const [highScores, setHighScores] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('snakeHighScores');
    if (saved) {
      try {
        setHighScores(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse high scores', e);
      }
    }
  }, []);

  useEffect(() => {
    if (gameOver) {
      setHighScores((prev) => {
        const newScores = [...prev, score]
          .sort((a, b) => b - a)
          .slice(0, 5);
        localStorage.setItem('snakeHighScores', JSON.stringify(newScores));
        return newScores;
      });
    }
  }, [gameOver]);

  useEffect(() => {
    setWalls(getWallsForLevel(level));
  }, [level]);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrameId: number;

    const calculateFps = () => {
      const currentTime = performance.now();
      frameCount++;

      if (currentTime - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }

      animationFrameId = requestAnimationFrame(calculateFps);
    };

    calculateFps();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
    setSpeed(INITIAL_SPEED);
    setLevel(1);

    // Initialize with 3 fruits
    const initialFruits: Fruit[] = [];
    for (let i = 0; i < MIN_FRUITS; i++) {
      initialFruits.push(generateFruit(INITIAL_SNAKE, [], initialFruits));
    }
    setFruits(initialFruits);
  };

  // Initial fruits setup
  // Initial fruits setup - only run once
  const isInitialized = useRef(false);
  useEffect(() => {
    if (!isInitialized.current && fruits.length === 0 && !gameOver) {
      const initialFruits: Fruit[] = [];
      for (let i = 0; i < MIN_FRUITS; i++) {
        initialFruits.push(generateFruit(snake, walls, initialFruits));
      }
      setFruits(initialFruits);
      isInitialized.current = true;
    }
  }, [fruits.length, gameOver, snake, walls]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') {
            setDirection('UP');
            playMoveSound();
          }
          break;
        case 'ArrowDown':
          if (direction !== 'UP') {
            setDirection('DOWN');
            playMoveSound();
          }
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') {
            setDirection('LEFT');
            playMoveSound();
          }
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') {
            setDirection('RIGHT');
            playMoveSound();
          }
          break;
        case ' ':
          setIsPaused((prev) => !prev);
          break;
      }
    };

    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartX || !touchStartY) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;

      // Minimum swipe distance
      if (Math.abs(diffX) < 30 && Math.abs(diffY) < 30) return; // MIN_SWIPE_DISTANCE

      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal swipe
        if (diffX > 0) {
          // Swipe Left
          if (direction !== 'RIGHT') {
            setDirection('LEFT');
            playMoveSound();
          }
        } else {
          // Swipe Right
          if (direction !== 'LEFT') {
            setDirection('RIGHT');
            playMoveSound();
          }
        }
      } else {
        // Vertical swipe
        if (diffY > 0) {
          // Swipe Up
          if (direction !== 'DOWN') {
            setDirection('UP');
            playMoveSound();
          }
        } else {
          // Swipe Down
          if (direction !== 'UP') {
            setDirection('DOWN');
            playMoveSound();
          }
        }
      }

      touchStartX = 0;
      touchStartY = 0;
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [direction]);

  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveSnake = () => {
      playStepSound();
      const newSnake = [...snake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      // Check collisions
      if (
        head.x < 0 ||
        head.x >= GRID_WIDTH ||
        head.y < 0 ||
        head.y >= GRID_HEIGHT ||
        newSnake.some((segment) => segment.x === head.x && segment.y === head.y) ||
        walls.some((wall) => wall.x === head.x && wall.y === head.y)
      ) {
        playGameOverSound();
        setGameOver(true);
        return;
      }

      newSnake.unshift(head);

      const eatenFruitIndex = fruits.findIndex(
        (f) => f.x === head.x && f.y === head.y
      );

      if (eatenFruitIndex !== -1) {
        const eatenFruit = fruits[eatenFruitIndex];
        playEatSound(eatenFruit.type);
        const newScore = score + eatenFruit.points;
        setScore(newScore);

        // Apply effects
        if (eatenFruit.type === 'BOLT') {
          setSpeed((prev) => Math.max(MIN_SPEED, prev - SPEED_DECREASE_PER_BOLT));
        }

        // Level up logic
        let nextLevel = level;
        if (newScore % SCORE_PER_LEVEL < score % SCORE_PER_LEVEL && level < MAX_LEVEL) {
          nextLevel = level + 1;
          setLevel(nextLevel);
        }

        const nextWalls = getWallsForLevel(nextLevel);

        // Remove eaten fruit and generate new one(s)
        const newFruits = [...fruits];
        newFruits.splice(eatenFruitIndex, 1);

        // Always maintain at least MIN_FRUITS
        while (newFruits.length < MIN_FRUITS) {
          newFruits.push(generateFruit(newSnake, nextWalls, newFruits));
        }

        // Chance to spawn extra fruit up to MAX_FRUITS
        if (newFruits.length < MAX_FRUITS && Math.random() < EXTRA_FRUIT_CHANCE) {
          newFruits.push(generateFruit(newSnake, nextWalls, newFruits));
        }

        setFruits(newFruits);
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    };

    const gameInterval = setInterval(moveSnake, speed);
    return () => clearInterval(gameInterval);
  }, [snake, direction, fruits, gameOver, isPaused, speed, walls, score, level]);

  return {
    snake,
    fruits,
    walls,
    score,
    level,
    fps,
    gameOver,
    isPaused,
    direction,
    resetGame,
    highScores,
  };
};
