import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';

const Dashboard = () => {
    const [slots, setSlots] = useState<any[]>([
        { id: "A1", status: "free" },
        { id: "A2", status: "free" },
        { id: "A3", status: "free" },
        { id: "A4", status: "free" },
        { id: "A5", status: "free" }
    ]);
    const [logs, setLogs] = useState<any[]>([]);
    const [isOnline, setIsOnline] = useState(false);
    const [lastUpdated, setLastUpdated] = useState("--:--:--");

    useEffect(() => {
        const slotsRef = ref(db, 'slots');
        const systemRef = ref(db, 'system');
        const logsRef = ref(db, 'logs');

        const unsubscribeSlots = onValue(slotsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const formattedSlots = Object.keys(data).map(key => ({
                    id: key,
                    status: data[key].status,
                    isReserved: Boolean(data[key].isReserved),
                    lastlog: data[key].lastlog
                }));
                formattedSlots.sort((a, b) => a.id.localeCompare(b.id));
                setSlots(formattedSlots);
            }
        });

        const unsubscribeSystem = onValue(systemRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setIsOnline(Boolean(data.isOnline));
                if (data.lastUpdated) {
                    const date = new Date(data.lastUpdated);
                    setLastUpdated(date.toLocaleTimeString());
                }
            } else {
                setIsOnline(false);
            }
        });

        const unsubscribeLogs = onValue(logsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const formattedLogs = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                })).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)).slice(0, 10);
                setLogs(formattedLogs);
            }
        });

        return () => {
            unsubscribeSlots();
            unsubscribeSystem();
            unsubscribeLogs();
        };
    }, []);

    const freeSlots = slots.filter(s => s.status === 'free').length;
    const occupiedSlots = slots.filter(s => s.status === 'occupied').length;
    const isFull = occupiedSlots === 5;
    return (
        <div className="theme-dashboard">
            <style>{`
               .theme-dashboard {
  --color-on-secondary-fixed: #111c2d;
  --color-surface-container-high: #222a3d;
  --color-surface-container: #171f33;
  --color-background: #0b1326;
  --color-on-surface-variant: #bac9cc;
  --color-on-primary: #00363d;
  --color-surface-dim: #0b1326;
  --color-on-secondary-fixed-variant: #3c475a;
  --color-surface-variant: #2d3449;
  --color-secondary: #bcc7de;
  --color-error: #ffb4ab;
  --color-on-background: #dae2fd;
  --color-on-secondary: #263143;
  --color-surface-container-lowest: #060e20;
  --color-tertiary-fixed: #c4e7ff;
  --color-primary-fixed-dim: #00daf3;
  --color-on-error-container: #ffdad6;
  --color-surface: #0b1326;
  --color-tertiary-fixed-dim: #7bd0ff;
  --color-on-primary-fixed: #001f24;
  --color-on-primary-container: #00626e;
  --color-on-tertiary-fixed: #001e2c;
  --color-on-surface: #dae2fd;
  --color-on-tertiary: #00354a;
  --color-tertiary: #dbf0ff;
  --color-primary-fixed: #9cf0ff;
  --color-tertiary-container: #99d9ff;
  --color-on-secondary-container: #aeb9d0;
  --color-surface-container-low: #131b2e;
  --color-inverse-on-surface: #283044;
  --color-primary: #c3f5ff;
  --color-secondary-container: #3e495d;
  --color-secondary-fixed-dim: #bcc7de;
  --color-inverse-surface: #dae2fd;
  --color-outline-variant: #3b494c;
  --color-primary-container: #00e5ff;
  --color-on-primary-fixed-variant: #004f58;
  --color-on-tertiary-fixed-variant: #004c69;
  --color-on-error: #690005;
  --color-secondary-fixed: #d8e3fb;
  --color-surface-container-highest: #2d3449;
  --color-inverse-primary: #006875;
  --color-error-container: #93000a;
  --color-surface-bright: #31394d;
  --color-on-tertiary-container: #006083;
  --color-surface-tint: #00daf3;
  --color-outline: #849396;

               }

        body {
            background-color: #0b1326;
            color: #dae2fd;
            font-family: 'Manrope', sans-serif;
        }
        .glass-panel {
            background: rgba(45, 52, 73, 0.4);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
        }
        .neon-pulse {
            box-shadow: 0 0 15px rgba(0, 229, 255, 0.4);
        }
        .status-glow-free {
            box-shadow: inset 0 0 12px rgba(52, 211, 153, 0.15);
        }
        .status-glow-occupied {
            box-shadow: inset 0 0 12px rgba(255, 180, 171, 0.3);
        }
        .status-glow-reserved {
            box-shadow: inset 0 0 12px rgba(251, 191, 36, 0.2);
        }
    
            `}</style>
            <div className="min-h-screen bg-background font-body text-on-surface">

                <main className="py-12 px-8 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Buzzer */}
                    {isFull && (
                        <div className="col-span-full bg-error/20 border border-error text-error text-center py-3 rounded-xl animate-pulse font-headline font-bold uppercase tracking-widest text-lg shadow-[0_0_20px_rgba(255,180,171,0.4)]">
                            ⚠️ PARKING FULL
                        </div>
                    )}

                    {/*  Left Column: Main Dashboard  */}
                    <div className="lg:col-span-8 space-y-8">
                        {/*  Heading Area  */}
                        <div className="flex items-end justify-between">
                            <div>
                                <div className="flex items-center space-x-4">
                                    <h1 className="text-4xl font-extrabold tracking-tight text-white font-headline">SmartPark</h1>
                                    {isOnline ? (
                                        <span className="flex items-center space-x-2 bg-primary/20 px-3 py-1 rounded-full border border-primary/30">
                                            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse neon-pulse"></span>
                                            <span className="font-label text-xs font-bold text-primary-container tracking-wider">LIVE</span>
                                        </span>
                                    ) : (
                                        <span className="flex items-center space-x-2 bg-error/20 px-3 py-1 rounded-full border border-error/30 opacity-80">
                                            <span className="w-2 h-2 rounded-full bg-error"></span>
                                            <span className="font-label text-xs font-bold text-error tracking-wider">OFFLINE</span>
                                        </span>
                                    )}
                                </div>
                                <p className="font-label text-on-surface-variant text-sm mt-1">Zone A • Floor 1 • Central Hub</p>

                            </div>
                            <div className="text-right hidden sm:block">
                                <span className="font-label text-[0.65rem] uppercase tracking-widest text-primary-container opacity-70">System Health</span>
                                <div className="flex items-center space-x-2 text-primary-container">
                                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>sensors</span>
                                    <span className="font-bold text-lg font-label">{isOnline ? '99.8%' : '0.0%'}</span>
                                </div>
                            </div>
                        </div>
                    {/*  Parking Slot Grid  */}
                    <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
                        {slots.map(slot => {
                            const isFree = slot.status === 'free';
                            const isReserved = isFree && slot.isReserved;

                            let glowClass = 'status-glow-occupied';
                            let borderClass = 'bg-surface-container-high/60 border-error/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)]';
                            let indicatorBg = 'bg-error shadow-[0_0_12px_rgba(255,180,171,0.8)]';
                            let borderDashed = 'border-solid border-error/30 bg-error/10';
                            let textColor = 'text-error';
                            let centerText = 'Occupied';
                            let centerTextColor = 'text-error/60';
                            let carVisible = true;

                            if (isReserved) {
                                glowClass = 'status-glow-reserved';
                                borderClass = 'border-amber-400/20 bg-amber-400/5 hover:scale-95';
                                indicatorBg = 'bg-amber-400 shadow-[0_0_12px_#fbbf24] animate-pulse';
                                borderDashed = 'border-dashed border-amber-400/50 group-hover:border-amber-400/70';
                                textColor = 'text-amber-400';
                                centerText = 'Reserved';
                                centerTextColor = 'text-amber-400/80';
                                carVisible = false;
                            } else if (isFree) {
                                glowClass = 'status-glow-free';
                                borderClass = 'border-outline-variant/10 hover:scale-95';
                                indicatorBg = 'bg-emerald-400 shadow-[0_0_12px_#34d399] animate-pulse';
                                borderDashed = 'border-dashed border-emerald-400/40 group-hover:border-emerald-400/60';
                                textColor = 'text-emerald-400';
                                centerText = 'Empty';
                                centerTextColor = 'text-emerald-400/60';
                                carVisible = false;
                            }

                            return (
                                <div key={slot.id} className={`glass-panel flex flex-col justify-between h-72 rounded-3xl p-6 border transition-all duration-700 cursor-pointer group overflow-hidden ${borderClass} ${glowClass}`}>
                                    <div className="flex justify-between items-start z-10 relative">
                                        <div className="flex flex-col">
                                            <span className="font-label text-base font-bold text-on-surface-variant">Slot {slot.id}</span>
                                            {slot.lastlog && <span className="text-[9px] text-on-surface-variant/50 font-mono tracking-widest mt-1">{slot.lastlog}</span>}
                                        </div>
                                        <span className={`w-3 h-3 rounded-full transition-colors duration-500 ${indicatorBg}`}></span>
                                    </div>
                                    <div className="flex-1 flex flex-col items-center justify-center mt-4">
                                        {/* Parking Area */}
                                        <div className={`relative w-24 h-40 border-[4px] rounded-xl flex items-center justify-center mb-4 transition-all duration-700 overflow-hidden ${borderDashed}`}>
                                            
                                            {/* Empty/Reserved Text */}
                                            <span className={`font-label text-xs font-bold ${centerTextColor} uppercase tracking-widest -rotate-90 origin-center absolute transition-all duration-500 delay-300 ${!carVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>{centerText}</span>

                                            {/* Car Vector Wrapper */}
                                            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${!carVisible ? 'translate-y-[150%] opacity-0 scale-95' : 'translate-y-0 opacity-100 scale-100'}`}>
                                                {/* Top Down Car SVG */}
                                                <svg viewBox="0 0 47.032 47.032" className="w-[85%] h-[90%] drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)]">
                                                    <path fill="#ffffff" d="M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759 c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713 v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336 h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805z" className="drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
                                                </svg>
                                            </div>
                                        </div>
                                        <span className={`font-headline font-extrabold text-2xl transition-colors duration-500 z-10 relative ${textColor}`}>
                                            {centerText === 'Empty' ? 'Free' : centerText}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {/*  Bottom Row: Environmental & Connection  */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/*  Environmental Info Card  */}
                        <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/10">
                            <h3 className="font-label text-sm font-bold text-on-surface mb-4 flex items-center space-x-2">
                                <span className="material-symbols-outlined text-primary-container text-lg">thermostat</span>
                                <span>Environmental Info</span>
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-surface-container-high rounded-lg p-4 flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary text-xl">device_thermostat</span>
                                    </div>
                                    <div>
                                        <p className="font-label text-[10px] text-on-surface-variant uppercase">Temperature</p>
                                        <p className="font-headline font-bold text-xl text-white">24°C</p>
                                    </div>
                                </div>
                                <div className="bg-surface-container-high rounded-lg p-4 flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-tertiary-fixed-dim/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-tertiary-fixed-dim text-xl">humidity_mid</span>
                                    </div>
                                    <div>
                                        <p className="font-label text-[10px] text-on-surface-variant uppercase">Humidity</p>
                                        <p className="font-headline font-bold text-xl text-white">48%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*  Connection Status Card  */}
                        <div className="bg-surface-container-low rounded-xl p-6 border border-primary/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                                {isOnline ? (
                                    <div className="flex items-center space-x-2 bg-primary/20 px-3 py-1 rounded-full border border-primary/30">
                                        <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse neon-pulse"></span>
                                        <span className="font-label text-[10px] font-bold text-primary-container tracking-wider">ONLINE</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2 bg-error/20 px-3 py-1 rounded-full border border-error/30">
                                        <span className="w-2 h-2 rounded-full bg-error"></span>
                                        <span className="font-label text-[10px] font-bold text-error tracking-wider">OFFLINE</span>
                                    </div>
                                )}
                            </div>
                            <h3 className="font-label text-sm font-bold text-on-surface mb-6 flex items-center space-x-2">
                                <span className="material-symbols-outlined text-primary-container text-lg">router</span>
                                <span>Connection Status</span>
                            </h3>
                            <div className="flex items-center space-x-8">
                                <div>
                                    <p className="font-label text-[10px] text-on-surface-variant uppercase mb-1">Last Updated</p>
                                    <p className="font-headline font-extrabold text-3xl text-white tracking-tight">{lastUpdated || '--:--:--'}</p>
                                </div>
                                <div className="h-10 w-[1px] bg-outline-variant/30"></div>
                                <div>
                                    <p className="font-label text-[10px] text-on-surface-variant uppercase mb-1">Latency</p>
                                    <p className="font-headline font-bold text-xl text-primary-container">12ms</p>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            {/*  Right Column: Sidebar  */}
            <div className="lg:col-span-4 space-y-8">
                {/*  Parking Overview  */}
                <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/10">
                    <h3 className="font-label text-sm font-bold text-on-surface mb-6">Parking Overview</h3>
                    <div className="flex items-center justify-between">
                        <div className="relative w-24 h-24">
                            {/*  Simple visual ring representation  */}
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 96 96">
                                <circle className="text-surface-variant" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="12"></circle>
                                <circle className="text-primary-container" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset={occupiedSlots === 0 ? "251.2" : (251.2 - (occupiedSlots / 5) * 251.2).toString()} strokeWidth="12" strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.5s ease" }}></circle>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="font-headline font-extrabold text-xl text-white leading-none">5</span>
                                <span className="font-label text-[8px] text-on-surface-variant">TOTAL</span>
                            </div>
                        </div>
                        <div className="flex-1 ml-8 space-y-3">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 rounded-full bg-primary-container"></div>
                                    <span className="font-label text-xs text-on-surface-variant">Free</span>
                                </div>
                                <span className="font-headline font-bold text-white">{freeSlots}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 rounded-full bg-error"></div>
                                    <span className="font-label text-xs text-on-surface-variant">Occupied</span>
                                </div>
                                <span className="font-headline font-bold text-white">{occupiedSlots}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="glass-panel rounded-xl p-6 border border-primary/20 shadow-xl">
                    <h3 className="font-label text-sm font-bold text-primary-container mb-4">Book your parking</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="font-label text-[10px] uppercase text-on-surface-variant mb-1 block">Arrival Time</label>
                            <div className="bg-surface-container-lowest rounded-lg p-3 flex items-center border border-outline-variant/10 focus-within:border-primary-container/40 transition-all">
                                <span className="material-symbols-outlined text-primary-container text-lg mr-2">calendar_today</span>
                                <input className="bg-transparent border-none text-sm text-on-surface w-full focus:ring-0 p-0 font-label" type="text" defaultValue="Nov 24, 2023 - 14:00" />
                            </div>
                        </div>
                        <button className="w-full bg-gradient-to-r from-primary-container to-primary py-3 rounded-lg font-headline font-extrabold text-on-primary-container hover:brightness-110 active:scale-95 transition-all">
                            CONFIRM RESERVATION
                        </button>
                    </div>
                </div>

                {/* Recent Activity Logs */}
                <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/10">
                    <h3 className="font-label text-sm font-bold text-on-surface mb-4 flex items-center space-x-2">
                        <span className="material-symbols-outlined text-primary-container text-lg">history</span>
                        <span>Recent Activity</span>
                    </h3>
                    <div className="space-y-4">
                        {logs.length === 0 ? (
                            <p className="text-on-surface-variant text-xs font-label opacity-60">No recent logs...</p>
                        ) : (
                            logs.map((log) => (
                                <div key={log.id} className="flex items-start space-x-3 text-sm">
                                    <div className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-primary-container shadow-[0_0_10px_#00e5ff]"></div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-label font-bold text-on-surface truncate">
                                            Slot {log.slot} <span className="font-normal text-on-surface-variant uppercase text-[10px] ml-1">{log.action || 'updated'}</span>
                                        </p>
                                        <p className="text-on-surface-variant text-[10px] font-mono">
                                            {log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : '--:--:--'}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </main>
{/*  Decorative Architectural Element  */ }
    <div className="fixed bottom-0 left-0 w-full h-[307px] bg-gradient-to-t from-[#00E5FF]/5 to-transparent pointer-events-none z-[-1]"></div>

            </div >
        </div >
    );
};

export default Dashboard;
