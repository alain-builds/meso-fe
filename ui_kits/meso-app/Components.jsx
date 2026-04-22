// Components.jsx — primitive UI for Meso
const { useState, useEffect } = React;

// ── Icons (Lucide-style inlined SVG) ──────────────────────────────
const Icon = ({ name, size = 20, color = 'currentColor', strokeWidth = 1.5, style = {} }) => {
  const paths = {
    'layout-grid': <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    'users': <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    'users-round': <><path d="M18 21a8 8 0 0 0-16 0"/><circle cx="10" cy="8" r="5"/><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/></>,
    'id-card': <><path d="M16 10h2"/><path d="M16 14h2"/><path d="M6.17 15a3 3 0 0 1 5.66 0"/><circle cx="9" cy="11" r="2"/><rect x="2" y="5" width="20" height="14" rx="2"/></>,
    'workflow': <><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M9 6h6a3 3 0 0 1 3 3v6"/></>,
    'shield': <><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></>,
    'network': <><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></>,
    'settings': <><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></>,
    'search': <><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></>,
    'bell': <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></>,
    'plus': <><path d="M5 12h14"/><path d="M12 5v14"/></>,
    'chevron-right': <><path d="m9 18 6-6-6-6"/></>,
    'chevron-down': <><path d="m6 9 6 6 6-6"/></>,
    'more-horizontal': <><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></>,
    'check': <><path d="M20 6 9 17l-5-5"/></>,
    'check-check': <><path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></>,
    'info': <><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></>,
    'x': <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>,
    'gavel': <><path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/></>,
    'alert-triangle': <><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></>,
    'building-2': <><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></>,
    'arrow-up-right': <><path d="M7 7h10v10"/><path d="M7 17 17 7"/></>,
    'history': <><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></>,
    'sparkles': <><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      {paths[name] || null}
    </svg>
  );
};

// ── Button ────────────────────────────────────────────────────────
const Button = ({ children, variant = 'primary', size = 'md', icon, onClick, disabled, type = 'button' }) => {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    borderRadius: 8, fontFamily: 'Inter, sans-serif', fontWeight: 500,
    cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1,
    transition: 'all 150ms cubic-bezier(0.16,1,0.3,1)',
    border: '1px solid transparent', whiteSpace: 'nowrap',
  };
  const sizes = {
    sm: { fontSize: 13, padding: '7px 16px' },
    md: { fontSize: 14, padding: '11px 22px' },
    lg: { fontSize: 15, padding: '14px 28px' },
  };
  const variants = {
    primary: { background: '#141412', color: '#F4F3F0', borderColor: '#141412' },
    secondary: { background: 'transparent', color: '#141412', borderColor: 'rgba(20,20,18,0.14)' },
    teal: { background: '#1A6B5C', color: '#fff', borderColor: '#1A6B5C' },
    ghost: { background: 'transparent', color: '#6B6966', borderColor: 'transparent', padding: '11px 0' },
    danger: { background: '#C0392B', color: '#fff', borderColor: '#C0392B' },
    stone: { background: '#ECEAE7', color: '#141412', borderColor: 'transparent' },
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      style={{ ...base, ...sizes[size], ...variants[variant] }}
      onMouseEnter={e => { if (!disabled && variant === 'primary') e.currentTarget.style.opacity = 0.88; if (!disabled && variant === 'secondary') { e.currentTarget.style.borderColor = 'rgba(20,20,18,0.22)'; e.currentTarget.style.background = '#ECEAE7'; } if (!disabled && variant === 'teal') e.currentTarget.style.opacity = 0.9; if (!disabled && variant === 'stone') e.currentTarget.style.background = '#DCDAD7'; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = disabled ? 0.4 : 1; if (variant === 'secondary') { e.currentTarget.style.borderColor = 'rgba(20,20,18,0.14)'; e.currentTarget.style.background = 'transparent'; } if (variant === 'stone') e.currentTarget.style.background = '#ECEAE7'; }}>
      {icon && <Icon name={icon} size={16} />}
      {children}
    </button>
  );
};

// ── Pill ──────────────────────────────────────────────────────────
const Pill = ({ variant = 'neutral', dot, children }) => {
  const variants = {
    neutral: { background: '#ECEAE7', color: '#6B6966' },
    teal: { background: 'rgba(26,107,92,0.09)', color: '#1A6B5C', border: '1px solid rgba(26,107,92,0.25)' },
    ink: { background: '#141412', color: '#F4F3F0' },
    outline: { border: '1px solid rgba(20,20,18,0.14)', color: '#6B6966' },
  };
  const dots = { live: '#1A6B5C', warn: '#C27C24', error: '#C0392B', off: '#A8A6A2' };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 5, fontSize: 11, fontWeight: 500, ...variants[variant] }}>
      {dot && <span style={{ width: 5, height: 5, borderRadius: '50%', background: dots[dot], flexShrink: 0 }} />}
      {children}
    </span>
  );
};

// ── Input ─────────────────────────────────────────────────────────
const Input = ({ label, hint, error, value, onChange, placeholder, disabled }) => (
  <div style={{ marginBottom: 20 }}>
    {label && <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#141412', marginBottom: 6 }}>{label}</label>}
    <input
      type="text" value={value} disabled={disabled} placeholder={placeholder}
      onChange={e => onChange && onChange(e.target.value)}
      style={{
        width: '100%', padding: '10px 14px', borderRadius: 8,
        border: `1px solid ${error ? '#C0392B' : 'rgba(20,20,18,0.14)'}`,
        fontFamily: 'Inter', fontSize: 14, color: '#141412',
        background: '#fff', outline: 'none',
        opacity: disabled ? 0.45 : 1, cursor: disabled ? 'not-allowed' : 'text',
      }}
      onFocus={e => {
        if (error) return;
        e.target.style.boxShadow = '0 0 0 2px rgba(26,107,92,0.10)';
      }}
      onBlur={e => {
        e.target.style.border = `1px solid ${error ? '#C0392B' : 'rgba(20,20,18,0.14)'}`;
        e.target.style.padding = '10px 14px';
        e.target.style.boxShadow = 'none';
      }}
    />
    {hint && !error && <div style={{ fontSize: 11, color: '#A8A6A2', marginTop: 5 }}>{hint}</div>}
    {error && <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#C0392B', marginTop: 5 }}><Icon name="alert-triangle" size={12} color="#C0392B" />{error}</div>}
  </div>
);

// ── Card ──────────────────────────────────────────────────────────
const Card = ({ children, level = 1, padding = 36, style = {}, onClick, hoverable = false }) => {
  const shadows = { 1: '0 2px 8px rgba(0,0,0,0.06)', 2: '0 4px 16px rgba(0,0,0,0.10)', 3: '0 16px 48px rgba(0,0,0,0.18)' };
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => hoverable && setHover(true)}
      onMouseLeave={() => hoverable && setHover(false)}
      style={{
        background: '#fff', borderRadius: 12,
        boxShadow: hoverable && hover ? shadows[2] : shadows[level],
        padding, cursor: onClick ? 'pointer' : 'default',
        transform: hoverable && hover ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 150ms cubic-bezier(0.16,1,0.3,1)',
        ...style,
      }}>
      {children}
    </div>
  );
};

// ── Modal ─────────────────────────────────────────────────────────
const Modal = ({ open, title, children, footer, onClose }) => {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, animation: 'fade 200ms cubic-bezier(0.16,1,0.3,1)' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 16px 48px rgba(0,0,0,0.18)', padding: 40, maxWidth: 480, width: '90%', animation: 'pop 200ms cubic-bezier(0.16,1,0.3,1)' }}>
        {title && <div style={{ fontFamily: 'Funnel Display, sans-serif', fontSize: 22, fontWeight: 700, letterSpacing: '-0.5px', color: '#141412', marginBottom: 10 }}>{title}</div>}
        <div style={{ fontSize: 14, color: '#6B6966', lineHeight: 1.65, marginBottom: 28 }}>{children}</div>
        {footer && <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>{footer}</div>}
      </div>
    </div>
  );
};

// ── Toast ─────────────────────────────────────────────────────────
const Toast = ({ kind = 'success', msg, onDismiss }) => {
  const colors = {
    success: { c: '#2A9D87', name: 'check-check' },
    error:   { c: '#E05849', name: 'alert-triangle' },
    info:    { c: '#8BA9E3', name: 'info' },
  };
  const k = colors[kind];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: '#1E1D1B', borderRadius: 12, boxShadow: '0 16px 48px rgba(0,0,0,0.18)', maxWidth: 400, animation: 'slide 250ms cubic-bezier(0.16,1,0.3,1)' }}>
      <Icon name={k.name} size={16} color={k.c} strokeWidth={2} />
      <div style={{ fontSize: 13, color: 'rgba(244,243,240,0.92)', lineHeight: 1.45, flex: 1 }}>{msg}</div>
      <div onClick={onDismiss} style={{ cursor: 'pointer', display: 'flex', flexShrink: 0 }}>
        <Icon name="x" size={12} color="rgba(244,243,240,0.4)" strokeWidth={2.25} />
      </div>
    </div>
  );
};

// ── Skeleton ──────────────────────────────────────────────────────
const Skeleton = ({ h = 14, w = '100%', style = {} }) => (
  <div style={{
    height: h, width: w, borderRadius: 4,
    background: 'linear-gradient(90deg, #ECEAE7 25%, #F4F3F0 50%, #ECEAE7 75%)',
    backgroundSize: '800px 100%',
    animation: 'shimmer 1.4s ease-in-out infinite',
    ...style,
  }} />
);

Object.assign(window, { Icon, Button, Pill, Input, Card, Modal, Toast, Skeleton });
