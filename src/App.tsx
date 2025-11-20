import { getMusicForLevel, getWallpaperForLevel } from './assetConfig';
import { Food } from './components/Food';
import { FruitValues } from './components/FruitValues';
import { GameOver } from './components/GameOver';
import { Leaderboard } from './components/Leaderboard';
import { MusicPlayer } from './components/MusicPlayer';
import { ScoreBoard } from './components/ScoreBoard';
import { Snake } from './components/Snake';
import { Walls } from './components/Walls';
import { CELL_SIZE, GRID_HEIGHT, GRID_WIDTH } from './constants';
import { useSnakeGame } from './hooks/useSnakeGame';

function App() {
  const {
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
    isAutoPlay,
    toggleAutoPlay,
  } = useSnakeGame();



  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white touch-none">
      <h1 className="text-4xl font-bold mb-4">Snake Game</h1>

      {/* Auto-Play Toggle */}
      <button
        onClick={toggleAutoPlay}
        className={`mb-4 px-6 py-3 rounded-lg font-bold transition-all ${isAutoPlay
          ? 'bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/50'
          : 'bg-gray-700 hover:bg-gray-600'
          }`}
      >
        {isAutoPlay ? '🤖 AI Playing' : '🎮 Manual Mode'}
      </button>

      <ScoreBoard score={score} level={level} fps={fps} />

      <div className="relative w-full max-w-6xl flex flex-col lg:flex-row items-start justify-center gap-8 p-4">
        {/* Left Panel - Fruit Values */}
        <div className="w-full max-w-md lg:w-64 shrink-0 order-2 lg:order-1">
          <FruitValues />
        </div>

        {/* Center - Game Board */}
        <div className="flex flex-col items-center w-full lg:w-auto order-1 lg:order-2">
          <div
            className="relative bg-gray-800 border-4 border-gray-700 shadow-2xl rounded-lg overflow-hidden shrink-0"
            style={{
              width: GRID_WIDTH * CELL_SIZE,
              height: GRID_HEIGHT * CELL_SIZE,
              backgroundImage: `url(${getWallpaperForLevel(level)})`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="absolute inset-0 bg-black/30" /> {/* Overlay for better visibility */}
            <Walls walls={walls} level={level} />
            <Snake snake={snake} direction={direction} />
            <Food fruits={fruits} />

            {isPaused && !gameOver && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                <div className="text-4xl font-bold text-white animate-pulse">PAUSED</div>
              </div>
            )}

            {gameOver && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-30 backdrop-blur-sm">
                <GameOver onReset={resetGame} />
              </div>
            )}
          </div>

          <div className="h-24 lg:hidden" />

          <div className="mt-4 text-gray-400 text-sm text-center">
            Swipe or use arrow keys to move<br />
            Tap space to pause
          </div>
        </div>

        {/* Right Panel - Leaderboard */}
        <div className="w-full max-w-md lg:w-64 shrink-0 order-3">
          <Leaderboard highScores={highScores} />
        </div>
      </div>

      <MusicPlayer src={getMusicForLevel(level)} initialVolume={0.3} gameOver={gameOver} isPaused={isPaused} />
    </div>
  );
}

export default App;
