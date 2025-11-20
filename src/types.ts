export type Point = {
  x: number;
  y: number;
};

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export type FruitType = 'APPLE' | 'ORANGE' | 'GRAPE' | 'BOLT';

export interface Fruit extends Point {
  id: string;
  type: FruitType;
  points: number;
}
