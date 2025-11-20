type GameOverProps = {
  onReset: () => void;
};

export const GameOver = ({ onReset }: GameOverProps) => {
  return (
    <div className="bg-gray-800 p-8 rounded-xl border-4 border-gray-600 shadow-2xl text-center transform scale-110">
      <h2 className="text-4xl font-bold text-red-500 mb-4 animate-bounce">Game Over!</h2>
      <p className="text-gray-300 mb-6">Better luck next time!</p>
      <button
        onClick={onReset}
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg font-bold text-white hover:from-blue-500 hover:to-blue-400 transition-all transform hover:scale-105 shadow-lg"
      >
        Play Again
      </button>
    </div>
  );
};
