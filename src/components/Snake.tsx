import { CELL_SIZE } from '../constants';
import type { Point } from '../types';

type SnakeProps = {
  snake: Point[];
  direction: string;
};

export const Snake = ({ snake, direction }: SnakeProps) => {
  return (
    <>
      {snake.map((segment, index) => {
        const isHead = index === 0;

        // Get neighbors
        const prevSegment = snake[index - 1];
        const nextSegment = snake[index + 1];

        // Determine connections
        const connectedTop =
          (prevSegment && prevSegment.x === segment.x && prevSegment.y === segment.y - 1) ||
          (nextSegment && nextSegment.x === segment.x && nextSegment.y === segment.y - 1);

        const connectedBottom =
          (prevSegment && prevSegment.x === segment.x && prevSegment.y === segment.y + 1) ||
          (nextSegment && nextSegment.x === segment.x && nextSegment.y === segment.y + 1);

        const connectedLeft =
          (prevSegment && prevSegment.x === segment.x - 1 && prevSegment.y === segment.y) ||
          (nextSegment && nextSegment.x === segment.x - 1 && nextSegment.y === segment.y);

        const connectedRight =
          (prevSegment && prevSegment.x === segment.x + 1 && prevSegment.y === segment.y) ||
          (nextSegment && nextSegment.x === segment.x + 1 && nextSegment.y === segment.y);

        // Calculate border radius
        const radius = '8px'; // Adjust for roundness
        const style: React.CSSProperties = {
          borderTopLeftRadius: (!connectedTop && !connectedLeft) ? radius : '0',
          borderTopRightRadius: (!connectedTop && !connectedRight) ? radius : '0',
          borderBottomLeftRadius: (!connectedBottom && !connectedLeft) ? radius : '0',
          borderBottomRightRadius: (!connectedBottom && !connectedRight) ? radius : '0',
          left: segment.x * CELL_SIZE,
          top: segment.y * CELL_SIZE,
          width: CELL_SIZE,
          height: CELL_SIZE,
          transform: 'scale(1.02)', // Slight overlap to prevent gaps
        };

        return (
          <div
            key={index}
            className={`absolute ${isHead ? 'bg-green-400 z-10' : 'bg-green-600 z-0'} shadow-sm transition-all duration-100`}
            style={style}
          >
            {isHead && (
              <>
                <div
                  className="absolute bg-white rounded-full shadow-sm"
                  style={{
                    width: '8px',
                    height: '8px',
                    ...((direction === 'UP' || direction === 'DOWN')
                      ? { [direction === 'UP' ? 'top' : 'bottom']: '2px', left: '2px' }
                      : { [direction === 'LEFT' ? 'left' : 'right']: '2px', top: '2px' })
                  }}
                >
                  <div className="absolute bg-black rounded-full w-3 h-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-50" />
                </div>
                <div
                  className="absolute bg-white rounded-full shadow-sm"
                  style={{
                    width: '8px',
                    height: '8px',
                    ...((direction === 'UP' || direction === 'DOWN')
                      ? { [direction === 'UP' ? 'top' : 'bottom']: '2px', right: '2px' }
                      : { [direction === 'LEFT' ? 'left' : 'right']: '2px', bottom: '2px' })
                  }}
                >
                  <div className="absolute bg-black rounded-full w-3 h-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-50" />
                </div>
              </>
            )}
          </div>
        );
      })}
    </>
  );
};
