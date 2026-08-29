import { useState, useEffect, useRef } from 'react';

interface LogLine {
  id: string;
  timestamp: string;
  message: string;
  level: 'info' | 'warn' | 'error';
}

export function NativeSSELogViewer() {
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [status, setStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const url = '/api/logs/sse-stream';
    const eventSource = new EventSource(url);

    setStatus('connecting');
    setError(null);

    eventSource.onopen = () => {
      setStatus('connected');
    };

    eventSource.onmessage = (event) => {
      try {
        const parsedLog: LogLine = JSON.parse(event.data);
        setLogs((prevLogs) => [...prevLogs, parsedLog]);
      } catch (err) {
        console.error('Failed to parse log event data:', err);
      }
    };

    eventSource.addEventListener('end', () => {
      setStatus('disconnected');
      eventSource.close();
    });

    eventSource.onerror = (err) => {
      console.error('EventSource error:', err);
      setError('Connection lost or failed to connect.');
      setStatus('disconnected');
    };

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs.length]);

  return (
    <div style={{ padding: '20px', background: '#1e1e1e', color: '#fff' }}>
      <h3>
        System Logs
        <span style={{ marginLeft: '10px', fontSize: '14px' }}>
          {status === 'connecting' && '🟡 Connecting...'}
          {status === 'connected' && '🟢 Live'}
          {status === 'disconnected' && '🔴 Disconnected'}
        </span>
      </h3>

      {error && <div style={{ color: '#ff6b6b', marginBottom: '10px' }}>{error}</div>}

      <div style={{ height: '400px', overflowY: 'scroll', fontFamily: 'monospace', background: '#111', padding: '10px' }}>
        {logs.map((log) => (
          <div key={log.id} style={{ color: log.level === 'error' ? '#ff6b6b' : log.level === 'warn' ? '#f1fa8c' : '#ae81ff' }}>
            [{log.timestamp}] {log.level.toUpperCase()}: {log.message}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
