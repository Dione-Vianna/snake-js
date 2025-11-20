type ScoreBoardProps = {
  score: number;
  level: number;
  fps: number;
};

export const ScoreBoard = ({ score, level, fps }: ScoreBoardProps) => {
  return (
    <div className="mb-4 flex gap-8 text-xl font-mono">
      <div>Score: {score}</div>
      <div className="text-blue-400">Level: {level}</div>
      <div className="text-yellow-400">FPS: {fps}</div>
    </div>
  );
};
