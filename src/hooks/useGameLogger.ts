import { useState } from 'react';

export interface GameLog {
  id: string;
  timestamp: number;
  type: 'info' | 'success' | 'warning' | 'error' | 'game';
  message: string;
  data?: any;
}

export const useGameLogger = () => {
  const [logs, setLogs] = useState<GameLog[]>([]);
  const maxLogs = 100; // Keep last 100 logs

  const addLog = (type: GameLog['type'], message: string, data?: any) => {
    const newLog: GameLog = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
      type,
      message,
      data,
    };

    setLogs((prev) => {
      const updated = [newLog, ...prev];
      return updated.slice(0, maxLogs);
    });

    // Also log to console for debugging
    const consoleMsg = `[${type.toUpperCase()}] ${message}`;
    switch (type) {
      case 'error':
        console.error(consoleMsg, data);
        break;
      case 'warning':
        console.warn(consoleMsg, data);
        break;
      default:
        console.log(consoleMsg, data);
    }
  };

  const clearLogs = () => setLogs([]);

  return { logs, addLog, clearLogs };
};
