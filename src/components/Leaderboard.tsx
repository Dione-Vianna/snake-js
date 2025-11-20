import React from 'react';

interface LeaderboardProps {
  highScores: number[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ highScores }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg border-4 border-gray-700 shadow-xl w-64 h-fit">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center border-b-2 border-gray-700 pb-2">
        Top 5
      </h2>
      <div className="space-y-2">
        {highScores.length === 0 ? (
          <div className="text-gray-500 text-center py-4">No scores yet</div>
        ) : (
          highScores.map((score, index) => (
            <div
              key={index}
              className={`flex justify-between items-center p-3 rounded transition-colors ${index === 0
                  ? 'bg-yellow-900/40 text-yellow-200 border border-yellow-700/50'
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                }`}
            >
              <div className="flex items-center gap-3">
                <span className={`font-mono font-bold w-6 text-center ${index === 0 ? 'text-yellow-400 text-lg' : 'text-gray-500'
                  }`}>
                  #{index + 1}
                </span>
                <span className="font-mono text-xl">{score}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
