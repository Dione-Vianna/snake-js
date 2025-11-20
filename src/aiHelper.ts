import { GRID_HEIGHT, GRID_WIDTH } from './constants';
import type { Fruit, Point } from './types';

// A* Pathfinding for Snake AI

interface PathNode {
  x: number;
  y: number;
  g: number; // Cost from start
  h: number; // Heuristic to goal
  f: number; // Total cost
  parent: PathNode | null;
}

// Manhattan distance heuristic
const heuristic = (a: Point, b: Point): number => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

// Check if position is safe (no collision)
const isSafe = (
  pos: Point,
  snake: Point[],
  walls: Point[]
): boolean => {
  // Check boundaries
  if (pos.x < 0 || pos.x >= GRID_WIDTH || pos.y < 0 || pos.y >= GRID_HEIGHT) {
    return false;
  }

  // Check snake body collision (skip head)
  if (snake.some((segment) => segment.x === pos.x && segment.y === pos.y)) {
    return false;
  }

  // Check wall collision
  if (walls.some((wall) => wall.x === pos.x && wall.y === pos.y)) {
    return false;
  }

  return true;
};

// A* pathfinding algorithm
const findPath = (
  start: Point,
  goal: Point,
  snake: Point[],
  walls: Point[]
): Point[] | null => {
  const openList: PathNode[] = [];
  const closedList: Set<string> = new Set();

  const startNode: PathNode = {
    x: start.x,
    y: start.y,
    g: 0,
    h: heuristic(start, goal),
    f: heuristic(start, goal),
    parent: null,
  };

  openList.push(startNode);

  while (openList.length > 0) {
    // Get node with lowest f score
    openList.sort((a, b) => a.f - b.f);
    const current = openList.shift()!;

    const currentKey = `${current.x},${current.y}`;

    // Check if we reached the goal
    if (current.x === goal.x && current.y === goal.y) {
      // Reconstruct path
      const path: Point[] = [];
      let node: PathNode | null = current;
      while (node) {
        path.unshift({ x: node.x, y: node.y });
        node = node.parent;
      }
      return path;
    }

    closedList.add(currentKey);

    // Check all 4 directions
    const directions = [
      { x: 0, y: -1 }, // UP
      { x: 0, y: 1 },  // DOWN
      { x: -1, y: 0 }, // LEFT
      { x: 1, y: 0 },  // RIGHT
    ];

    for (const dir of directions) {
      const neighbor = {
        x: current.x + dir.x,
        y: current.y + dir.y,
      };

      const neighborKey = `${neighbor.x},${neighbor.y}`;

      // Skip if already evaluated or unsafe
      if (closedList.has(neighborKey) || !isSafe(neighbor, snake, walls)) {
        continue;
      }

      const g = current.g + 1;
      const h = heuristic(neighbor, goal);
      const f = g + h;

      // Check if neighbor is already in open list
      const existingNode = openList.find(
        (n) => n.x === neighbor.x && n.y === neighbor.y
      );

      if (existingNode) {
        // Update if we found a better path
        if (g < existingNode.g) {
          existingNode.g = g;
          existingNode.f = f;
          existingNode.parent = current;
        }
      } else {
        // Add new node
        openList.push({
          x: neighbor.x,
          y: neighbor.y,
          g,
          h,
          f,
          parent: current,
        });
      }
    }
  }

  return null; // No path found
};

// Find nearest fruit
const findNearestFruit = (head: Point, fruits: Fruit[]): Fruit | null => {
  if (fruits.length === 0) return null;

  let nearest = fruits[0];
  let minDist = heuristic(head, nearest);

  for (const fruit of fruits) {
    const dist = heuristic(head, fruit);
    if (dist < minDist) {
      minDist = dist;
      nearest = fruit;
    }
  }

  return nearest;
};

// Get safest direction when no path exists
const getSafestDirection = (
  head: Point,
  currentDirection: string,
  snake: Point[],
  walls: Point[]
): string => {
  const directions = [
    { dir: 'UP', dx: 0, dy: -1 },
    { dir: 'DOWN', dx: 0, dy: 1 },
    { dir: 'LEFT', dx: -1, dy: 0 },
    { dir: 'RIGHT', dx: 1, dy: 0 },
  ];

  // Filter out opposite direction to prevent instant death
  const opposites: Record<string, string> = {
    UP: 'DOWN',
    DOWN: 'UP',
    LEFT: 'RIGHT',
    RIGHT: 'LEFT',
  };

  const validDirections = directions.filter(
    (d) => d.dir !== opposites[currentDirection]
  );

  // Score each direction by open space
  let bestDir = currentDirection;
  let maxSpace = -1;

  for (const { dir, dx, dy } of validDirections) {
    const nextPos = { x: head.x + dx, y: head.y + dy };

    if (!isSafe(nextPos, snake, walls)) continue;

    // Count open spaces around this position
    let openSpace = 0;
    for (const { dx: dx2, dy: dy2 } of directions) {
      const checkPos = { x: nextPos.x + dx2, y: nextPos.y + dy2 };
      if (isSafe(checkPos, snake, walls)) {
        openSpace++;
      }
    }

    if (openSpace > maxSpace) {
      maxSpace = openSpace;
      bestDir = dir;
    }
  }

  return bestDir;
};

// Main AI function - returns next direction
export const getAIDirection = (
  snake: Point[],
  fruits: Fruit[],
  walls: Point[],
  currentDirection: string
): string => {
  const head = snake[0];

  // Find nearest fruit
  const targetFruit = findNearestFruit(head, fruits);
  if (!targetFruit) {
    return getSafestDirection(head, currentDirection, snake, walls);
  }

  // Find path to fruit
  const path = findPath(head, targetFruit, snake, walls);

  if (path && path.length > 1) {
    // Get next step
    const nextStep = path[1];
    const dx = nextStep.x - head.x;
    const dy = nextStep.y - head.y;

    if (dy === -1) return 'UP';
    if (dy === 1) return 'DOWN';
    if (dx === -1) return 'LEFT';
    if (dx === 1) return 'RIGHT';
  }

  // No path found, move to safest direction
  return getSafestDirection(head, currentDirection, snake, walls);
};
