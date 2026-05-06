import React, { useState, useEffect, useCallback } from 'react';

/* ─── Global singleton store ─────────────────────────────────────────────── */
let _dispatch = null;
let _uid = 0;

export const toast = {
  success: (msg, duration = 4000) => _emit('success', msg, duration),
  error:   (msg, duration = 5000) => _emit('error',   msg, duration),
  info:    (msg, duration = 4000) => _emit('info',    msg, duration),
  warn:    (msg, duration = 4500) => _emit('warn',    msg, duration),
};

function _emit(type, message, duration) {
  if (!_dispatch) return;
  _dispatch({ id: ++_uid, type, message, duration });
}

/* ─── Per-type config ────────────────────────────────────────────────────── */
const CONFIG = {
  success: {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="10" fill="#22c55e" fillOpacity=".15"/>
        <path d="M5.5 10.5l3 3 6-6" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    accent: '#22c55e',
    label: 'Success',
  },
  error: {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="10" fill="#ef4444" fillOpacity=".15"/>
        <path d="M7 7l6 6M13 7l-6 6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    accent: '#ef4444',
    label: 'Error',
  },
  info: {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="10" fill="#6366f1" fillOpacity=".15"/>
        <path d="M10 9v5" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="10" cy="6.5" r="1" fill="#6366f1"/>
      </svg>
    ),
    accent: '#6366f1',
    label: 'Info',
  },
  warn: {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L18.66 17H1.34L10 2z" fill="#f59e0b" fillOpacity=".15" stroke="#f59e0b" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M10 8v4" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="10" cy="14.5" r="1" fill="#f59e0b"/>
      </svg>
    ),
    accent: '#f59e0b',
    label: 'Warning',
  },
};

/* ─── Single Toast item ──────────────────────────────────────────────────── */
const ToastItem = ({ item, onRemove }) => {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(100);
  const cfg = CONFIG[item.type];

  /* Animate in */
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 15);
    return () => clearTimeout(t);
  }, []);

  /* Progress bar countdown */
  useEffect(() => {
    const step = 50; // ms per tick
    const decrement = (step / item.duration) * 100;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p <= 0) { clearInterval(interval); return 0; }
        return p - decrement;
      });
    }, step);
    return () => clearInterval(interval);
  }, [item.duration]);

  /* Auto-dismiss */
  useEffect(() => {
    const t = setTimeout(() => dismiss(), item.duration);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setShow(false);
    setTimeout(() => onRemove(item.id), 350);
  };

  return (
    <div
      style={{
        transform: show ? 'translateX(0)' : 'translateX(110%)',
        opacity: show ? 1 : 0,
        transition: 'transform 0.38s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease',
        marginBottom: '10px',
        width: '360px',
      }}
    >
      <div style={{
        background: '#ffffff',
        borderRadius: '14px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
      }}>
        {/* Main row */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          padding: '16px 16px 14px',
          borderLeft: `4px solid ${cfg.accent}`,
        }}>
          {/* Icon */}
          <div style={{ flexShrink: 0, marginTop: '1px' }}>
            {cfg.icon}
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: '13px',
              fontWeight: 700,
              color: cfg.accent,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '3px',
            }}>
              {cfg.label}
            </div>
            <div style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#1e293b',
              lineHeight: 1.55,
              wordBreak: 'break-word',
            }}>
              {item.message}
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={dismiss}
            style={{
              flexShrink: 0,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '2px 4px',
              color: '#94a3b8',
              fontSize: '16px',
              lineHeight: 1,
              borderRadius: '6px',
              transition: 'color 0.15s, background 0.15s',
              marginTop: '-2px',
            }}
            onMouseOver={e => { e.currentTarget.style.color = '#475569'; e.currentTarget.style.background = '#f1f5f9'; }}
            onMouseOut={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'none'; }}
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>

        {/* Progress bar */}
        <div style={{
          height: '3px',
          background: '#f1f5f9',
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: cfg.accent,
            transition: 'width 50ms linear',
            borderRadius: '0 2px 2px 0',
          }} />
        </div>
      </div>
    </div>
  );
};

/* ─── Provider — mount once at the app root ──────────────────────────────── */
export const ToastProvider = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    _dispatch = (item) => setToasts(prev => [...prev, item]);
    return () => { _dispatch = null; };
  }, []);

  const remove = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '28px',
      right: '28px',
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column-reverse',
      pointerEvents: 'none',
    }}>
      {toasts.map(item => (
        <div key={item.id} style={{ pointerEvents: 'all' }}>
          <ToastItem item={item} onRemove={remove} />
        </div>
      ))}
    </div>
  );
};

export default ToastProvider;
