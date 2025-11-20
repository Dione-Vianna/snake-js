import { useEffect, useRef } from 'react';
import type { GameLog } from '../hooks/useGameLogger';

interface GameLogsPanelProps {
  logs: GameLog[];
  onClear: () => void;
}

export const GameLogsPanel = ({ logs, onClear }: GameLogsPanelProps) => {
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getLogColor = (type: GameLog['type']) => {
    switch (type) {
      case 'success':
        return 'text-green-400 bg-green-900/20 border-green-700';
      case 'error':
        return 'text-red-400 bg-red-900/20 border-red-700';
      case 'warning':
        return 'text-yellow-400 bg-yellow-900/20 border-yellow-700';
      case 'game':
        return 'text-blue-400 bg-blue-900/20 border-blue-700';
      default:
        return 'text-gray-400 bg-gray-800/50 border-gray-700';
    }
  };

  const getLogIcon = (type: GameLog['type']) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✗';
      case 'warning':
        return '⚠';
      case 'game':
        return '🎮';
      default:
        return '•';
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3
    });
  };

  return (
    <div className="bg-gray-900 border-2 border-gray-700 rounded-lg shadow-lg flex flex-col h-96">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-700 bg-gray-800">
        <h3 className="text-lg font-bold text-yellow-400 flex items-center gap-2">
          📋 Game Logs
          <span className="text-xs text-gray-400">({logs.length})</span>
        </h3>
        <button
          onClick={onClear}
          className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Logs Container */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1 font-mono text-xs">
        {logs.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            No logs yet. Start playing!
          </div>
        ) : (
          <>
            {logs.map((log) => (
              <div
                key={log.id}
                className={`p-2 rounded border ${getLogColor(log.type)} transition-all hover:scale-[1.01]`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-sm">{getLogIcon(log.type)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gray-500 text-[10px]">
                        {formatTime(log.timestamp)}
                      </span>
                      <span className="text-[10px] px-1 py-0.5 bg-black/30 rounded">
                        {log.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="break-words">{log.message}</div>
                    {log.data && (
                      <div className="mt-1 text-[10px] text-gray-500 bg-black/30 p-1 rounded overflow-x-auto">
                        {JSON.stringify(log.data, null, 2)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={logsEndRef} />
          </>
        )}
      </div>
    </div>
  );
};
