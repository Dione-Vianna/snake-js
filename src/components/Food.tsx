import { FaBolt } from 'react-icons/fa';
import { GiGrapes } from 'react-icons/gi';
import { PiOrangeBold } from "react-icons/pi";
import { TbAppleFilled } from "react-icons/tb";
import { CELL_SIZE } from '../constants';
import type { Fruit, FruitType } from '../types';

type FoodProps = {
  fruits: Fruit[];
};

const getFruitIcon = (type: FruitType, size: number) => {
  switch (type) {
    case 'APPLE':
      return <TbAppleFilled size={size} />;
    case 'ORANGE':
      return <PiOrangeBold size={size} />;
    case 'GRAPE':
      return <GiGrapes size={size} />;
    case 'BOLT':
      return <FaBolt size={size} />;
    default:
      return <TbAppleFilled size={size} />;
  }
};

const getFruitColor = (type: FruitType) => {
  switch (type) {
    case 'APPLE':
      return 'text-red-500';
    case 'ORANGE':
      return 'text-orange-500';
    case 'GRAPE':
      return 'text-purple-500';
    case 'BOLT':
      return 'text-orange-500 animate-pulse';
    default:
      return 'text-red-500';
  }
};

export const Food = ({ fruits }: FoodProps) => {
  return (
    <>
      {fruits.map((fruit) => (
        <div
          key={fruit.id}
          className={`absolute ${getFruitColor(fruit.type)} flex items-center justify-center bg-white rounded-full shadow-lg`}
          style={{
            left: fruit.x * CELL_SIZE,
            top: fruit.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE,
          }}
        >
          {getFruitIcon(fruit.type, CELL_SIZE * 0.7)}
        </div>
      ))}
    </>
  );
};
