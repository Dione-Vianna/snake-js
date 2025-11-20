import { FaApple, FaBolt } from 'react-icons/fa';
import { GiGrapes, GiOrangeSlice } from 'react-icons/gi';

export const FruitValues = () => {
  const fruits = [
    { name: 'Apple', icon: FaApple, points: 10, color: 'text-red-500' },
    { name: 'Orange', icon: GiOrangeSlice, points: 20, color: 'text-orange-500' },
    { name: 'Grape', icon: GiGrapes, points: 30, color: 'text-purple-500' },
    { name: 'Bolt', icon: FaBolt, points: 50, color: 'text-yellow-400' },
  ];

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg border-2 border-gray-700">
      <h2 className="text-xl font-bold mb-3 text-center text-yellow-400">
        🍎 Fruit Values
      </h2>
      <div className="space-y-2">
        {fruits.map((fruit, index) => {
          const Icon = fruit.icon;
          return (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-700 p-2 rounded"
            >
              <div className="flex items-center gap-2">
                <Icon className={`${fruit.color} text-xl`} />
                <span className="text-sm font-medium">{fruit.name}</span>
              </div>
              <span className="text-yellow-400 font-bold">{fruit.points} pts</span>
            </div>
          );
        })}
      </div>
      <div className="mt-3 pt-3 border-t border-gray-600">
        <p className="text-xs text-gray-400 text-center">
          ⚡ Bolt also increases speed!
        </p>
      </div>
    </div>
  );
};
