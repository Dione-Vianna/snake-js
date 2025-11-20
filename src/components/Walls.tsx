import { CELL_SIZE } from '../constants';
import type { Point } from '../types';

type WallsProps = {
  walls: Point[];
  level: number;
};

const getWallStyle = (level: number) => {
  // Cycle colors for levels 6-10 (reuse 1-5)
  const colorLevel = ((level - 1) % 5) + 1;

  switch (colorLevel) {
    case 1: // Stone: Slate gray/metal
      return 'bg-gradient-to-br from-slate-600 to-slate-800 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.5),inset_2px_2px_4px_rgba(255,255,255,0.2)] border-slate-900';
    case 2: // Ice: Cyan/Blue
      return 'bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.3),inset_2px_2px_4px_rgba(255,255,255,0.5)] border-blue-800';
    case 3: // Violet
      return 'bg-gradient-to-br from-violet-600 to-purple-900 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.5),inset_2px_2px_4px_rgba(255,255,255,0.3)] border-purple-950';
    case 4: // Gray
      return 'bg-gradient-to-br from-gray-600 to-gray-900 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.5),inset_2px_2px_4px_rgba(255,255,255,0.2)] border-gray-950';
    case 5: // Lava: Orange/Red
      return 'bg-gradient-to-br from-orange-600 to-red-900 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.5),inset_2px_2px_4px_rgba(255,255,255,0.2)] border-red-950';
    default:
      return 'bg-gradient-to-br from-gray-600 to-gray-800 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.5),inset_2px_2px_4px_rgba(255,255,255,0.2)]';
  }
};

export const Walls = ({ walls, level }: WallsProps) => {
  const styleClass = getWallStyle(level);

  return (
    <>
      {walls.map((wall, index) => (
        <div
          key={`wall-${index}`}
          className={`absolute rounded-sm ${styleClass}`}
          style={{
            left: wall.x * CELL_SIZE,
            top: wall.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
          }}
        >
          {/* Top highlight for extra 3D pop */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/20 rounded-t-sm" />
        </div>
      ))}
    </>
  );
};
