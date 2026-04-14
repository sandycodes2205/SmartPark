import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const FEATURES = [
    {
        icon: '⚡',
        title: 'Real-Time Status',
        desc: 'Get instant updates on parking slot availability across all locations',
    },
    {
        icon: '🕐',
        title: 'Quick Reservations',
        desc: 'Reserve your spot in seconds with our seamless booking system',
    },
    {
        icon: '🛡',
        title: 'Secure System',
        desc: 'Your data is protected with enterprise-grade security standards',
    },
    {
        icon: '📈',
        title: 'Analytics',
        desc: 'Track parking patterns and optimize your parking strategy',
    },
];

/* A tiny animated dot-grid that pulses like a live sensor map */
const DotGrid = () => {
    const [active, setActive] = useState<number[]>([]);
    const dotsRef = useRef<number[]>([]);

    useEffect(() => {
        const total = 9;
        dotsRef.current = Array.from({ length: total }, (_, i) => i);
        const pulse = () => {
            const n = Math.floor(Math.random() * total);
            setActive(prev => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n]);
        };
        const id = setInterval(pulse, 550);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="grid grid-cols-3 gap-5">
            {Array.from({ length: 9 }, (_, i) => (
                <div
                    key={i}
                    className="w-4 h-4 rounded-full transition-all duration-500"
                    style={{
                        background: active.includes(i) ? '#00e5ff' : '#1e4976',
                        boxShadow: active.includes(i) ? '0 0 14px 4px rgba(0,229,255,0.5)' : 'none',
                        transform: active.includes(i) ? 'scale(1.3)' : 'scale(1)',
                    }}
                />
            ))}
        </div>
    );
};

const Landing = () => {
    return (
        <div style={{ fontFamily: "'Manrope', sans-serif", background: '#080d1a', minHeight: '100vh', color: '#e2e8f0' }}>
            {/* Google Fonts */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Manrope:wght@400;500;600;700&display=swap');

                .sp-serif { font-family: 'Playfair Display', Georgia, serif; }

                .nav-glass {
                    background: rgba(8, 13, 26, 0.8);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border-bottom: 1px solid rgba(0,229,255,0.08);
                }
                .hero-visual {
                    background: linear-gradient(145deg, #0d1f3c 0%, #071428 100%);
                    border: 1px solid rgba(0,229,255,0.12);
                    border-radius: 24px;
                }
                .inner-card {
                    background: linear-gradient(145deg, #0a1a30 0%, #060e1e 100%);
                    border-radius: 16px;
                }
                .feature-card {
                    background: #0d1f3c;
                    border: 1px solid rgba(0,229,255,0.08);
                    border-radius: 16px;
                    transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
                }
                .feature-card:hover {
                    transform: translateY(-4px);
                    border-color: rgba(0,229,255,0.25);
                    box-shadow: 0 12px 40px rgba(0,229,255,0.08);
                }
                .icon-chip {
                    background: rgba(0,229,255,0.12);
                    border-radius: 10px;
                    width: 48px; height: 48px;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 22px;
                }
                .cta-card {
                    background: linear-gradient(135deg, #0d1f3c 0%, #091629 100%);
                    border: 1px solid rgba(0,229,255,0.15);
                    border-radius: 20px;
                    box-shadow: 0 0 60px rgba(0,229,255,0.05);
                }
                .btn-primary {
                    background: #00e5ff;
                    color: #080d1a;
                    font-weight: 700;
                    border-radius: 10px;
                    padding: 12px 32px;
                    border: none;
                    cursor: pointer;
                    transition: filter 0.2s, transform 0.15s;
                    font-family: 'Manrope', sans-serif;
                }
                .btn-primary:hover { filter: brightness(1.12); transform: scale(1.02); }
                .btn-primary:active { transform: scale(0.97); }
                .btn-outline {
                    background: transparent;
                    color: #e2e8f0;
                    font-weight: 600;
                    border-radius: 10px;
                    padding: 11px 28px;
                    border: 1px solid rgba(255,255,255,0.2);
                    cursor: pointer;
                    transition: border-color 0.2s, background 0.2s;
                    font-family: 'Manrope', sans-serif;
                }
                .btn-outline:hover { border-color: rgba(0,229,255,0.5); background: rgba(0,229,255,0.06); }

                .badge {
                    display: inline-flex; align-items: center; gap: 6px;
                    border: 1px solid rgba(0,229,255,0.3);
                    border-radius: 999px;
                    padding: 5px 14px;
                    font-size: 12px; color: #94a3b8;
                    background: rgba(0,229,255,0.05);
                }
                .nav-link {
                    color: #94a3b8; font-size: 14px; font-weight: 500;
                    transition: color 0.2s;
                    cursor: pointer; text-decoration: none;
                }
                .nav-link:hover { color: #e2e8f0; }
                .logo-icon {
                    background: rgba(0,229,255,0.15);
                    border-radius: 10px;
                    padding: 6px;
                    display: flex; align-items: center; justify-content: center;
                }
            `}</style>

            {/* ── NAV ───────────────────────────────────────────── */}
            <nav className="nav-glass" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div className="logo-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#00e5ff"/>
                                <circle cx="12" cy="9" r="2.5" fill="#080d1a"/>
                            </svg>
                        </div>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 20, color: '#e2e8f0', letterSpacing: '-0.3px' }}>SmartPark</span>
                    </div>
                    {/* Right actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                        <Link to="/dashboard" className="nav-link">Dashboard</Link>
                        <Link to="/dashboard">
                            <button className="btn-primary" style={{ padding: '9px 22px', fontSize: 14 }}>Get Started</button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* ── HERO ──────────────────────────────────────────── */}
            <section style={{ maxWidth: 1200, margin: '0 auto', padding: '128px 32px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
                {/* Left */}
                <div>
                    <div className="badge" style={{ marginBottom: 28 }}>
                        <span>✨</span> Intelligent Parking Solutions
                    </div>
                    <h1 className="sp-serif" style={{ fontSize: 'clamp(44px, 6vw, 72px)', lineHeight: 1.1, fontWeight: 900, color: '#f1f5f9', marginBottom: 24 }}>
                        Find Your{' '}
                        <span style={{ color: '#00e5ff', fontStyle: 'italic' }}>Perfect<br />Spot</span>
                    </h1>
                    <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.75, maxWidth: 420, marginBottom: 40 }}>
                        Real-time parking management with instant slot availability, seamless reservations, and intelligent navigation. Your parking solution made simple.
                    </p>
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                        <Link to="/dashboard"><button className="btn-primary">Explore Dashboard</button></Link>
                        <button className="btn-outline">Learn More</button>
                    </div>
                </div>

                {/* Right – hero visual */}
                <div className="hero-visual" style={{ padding: 28, aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="inner-card" style={{ width: '75%', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <DotGrid />
                    </div>
                </div>
            </section>

            {/* ── FEATURES ──────────────────────────────────────── */}
            <section style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 32px 96px' }}>
                <div style={{ textAlign: 'center', marginBottom: 56 }}>
                    <h2 className="sp-serif" style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: '#00e5ff', marginBottom: 12 }}>
                        Powerful Features
                    </h2>
                    <p style={{ color: '#64748b', fontSize: 16 }}>Everything you need to manage parking efficiently</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
                    {FEATURES.map(f => (
                        <div key={f.title} className="feature-card" style={{ padding: '36px 32px' }}>
                            <div className="icon-chip" style={{ marginBottom: 24 }}>{f.icon}</div>
                            <h3 className="sp-serif" style={{ fontSize: 22, fontWeight: 700, color: '#e2e8f0', marginBottom: 14 }}>{f.title}</h3>
                            <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.7 }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA ───────────────────────────────────────────── */}
            <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 96px' }}>
                <div className="cta-card" style={{ padding: '72px 48px', textAlign: 'center' }}>
                    <h2 className="sp-serif" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: '#e2e8f0', marginBottom: 18 }}>
                        Ready to Find Your Perfect Parking Spot?
                    </h2>
                    <p style={{ color: '#64748b', fontSize: 16, marginBottom: 40 }}>
                        Start managing your parking experience today with SmartPark
                    </p>
                    <Link to="/dashboard">
                        <button className="btn-primary" style={{ fontSize: 15, padding: '14px 40px' }}>Launch Dashboard</button>
                    </Link>
                </div>
            </section>

            {/* ── FOOTER ────────────────────────────────────────── */}
            <footer style={{ borderTop: '1px solid rgba(0,229,255,0.07)', padding: '32px', textAlign: 'center' }}>
                <p style={{ color: '#334155', fontSize: 13 }}>
                    © 2024 SmartPark. Intelligent parking management made simple.
                </p>
            </footer>
        </div>
    );
};

export default Landing;
