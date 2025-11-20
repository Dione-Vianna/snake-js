import { useEffect, useState } from 'react';

interface SimpleLog {
  id: string;
  time: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

export const SimpleLogsPanel = () => {
  const [logs, setLogs] = useState<SimpleLog[]>([]);

  useEffect(() => {
    // Intercept console methods
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    const addLog = (message: string, type: SimpleLog['type']) => {
      const newLog: SimpleLog = {
        id: `${Date.now()}-${Math.random()}`,
        time: new Date().toLocaleTimeString(),
        message,
        type,
      };
      setLogs((prev) => [newLog, ...prev].slice(0, 50)); // Keep last 50
    };

    console.log = (...args) => {
      originalLog(...args);
      addLog(args.join(' '), 'info');
    };

    console.error = (...args) => {
      originalError(...args);
      addLog(args.join(' '), 'error');
    };

    console.warn = (...args) => {
      originalWarn(...args);
      addLog(args.join(' '), 'warning');
    };

    // Cleanup
    return () => {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  const getColor = (type: SimpleLog['type']) => {
    switch (type) {
      case 'error':
        return 'text-red-400 bg-red-900/20';
      case 'warning':
        return 'text-yellow-400 bg-yellow-900/20';
      case 'success':
        return 'text-green-400 bg-green-900/20';
      default:
        return 'text-gray-300 bg-gray-800/50';
    }
  };

  return (
    <div className="w-full max-w-6xl mt-8 bg-gray-900 border-2 border-gray-700 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-yellow-400">📋 Game Logs</h3>
        <button
          onClick={() => setLogs([])}
          className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 rounded transition-colors"
        >
          Clear
        </button>
      </div>
      <div className="h-64 overflow-y-auto space-y-1 font-mono text-xs">
        {logs.length === 0 ? (
          <div className="text-gray-500 text-center py-8">No logs yet</div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className={`p-2 rounded ${getColor(log.type)}`}
            >
              <span className="text-gray-500 mr-2">[{log.time}]</span>
              {log.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
