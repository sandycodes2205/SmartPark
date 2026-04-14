
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="theme-landing">
            <style>{`
               .theme-landing {
  --color-on-error: #ffffff;
  --color-tertiary: #822800;
  --color-on-tertiary: #ffffff;
  --color-surface-dim: #d9dadb;
  --color-on-secondary: #ffffff;
  --color-secondary: #4a5d8e;
  --color-secondary-container: #b3c5fd;
  --color-inverse-primary: #b2c5ff;
  --color-on-primary-fixed: #001847;
  --color-tertiary-container: #a93802;
  --color-outline: #737785;
  --color-on-secondary-fixed-variant: #324575;
  --color-primary-fixed-dim: #b2c5ff;
  --color-primary: #0040a1;
  --color-secondary-fixed: #dae2ff;
  --color-tertiary-fixed-dim: #ffb59b;
  --color-on-secondary-fixed: #001847;
  --color-secondary-fixed-dim: #b3c5fd;
  --color-on-primary-fixed-variant: #0040a1;
  --color-primary-fixed: #dae2ff;
  --color-surface: #f8f9fa;
  --color-tertiary-fixed: #ffdbcf;
  --color-surface-container: #edeeef;
  --color-on-tertiary-container: #ffcebd;
  --color-surface-container-high: #e7e8e9;
  --color-on-surface: #191c1d;
  --color-surface-container-highest: #e1e3e4;
  --color-surface-bright: #f8f9fa;
  --color-surface-container-low: #f3f4f5;
  --color-surface-container-lowest: #ffffff;
  --color-error: #ba1a1a;
  --color-surface-tint: #0056d2;
  --color-on-error-container: #93000a;
  --color-primary-container: #0056d2;
  --color-on-surface-variant: #424654;
  --color-on-primary-container: #ccd8ff;
  --color-outline-variant: #c3c6d6;
  --color-on-tertiary-fixed: #380d00;
  --color-on-primary: #ffffff;
  --color-error-container: #ffdad6;
  --color-on-secondary-container: #3e5181;
  --color-background: #f8f9fa;
  --color-on-background: #191c1d;
  --color-inverse-on-surface: #f0f1f2;
  --color-inverse-surface: #2e3132;
  --color-on-tertiary-fixed-variant: #812800;
  --color-surface-variant: #e1e3e4;

               }

        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .hero-grain {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            opacity: 0.05;
        }
    
            `}</style>
            <div className="min-h-screen bg-background font-body text-on-surface">
                
{/*  TopNavBar  */}
<nav className="fixed top-0 z-50 w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-sm dark:shadow-none">
<div className="max-w-7xl mx-auto flex justify-between items-center w-full px-8 py-4">
<div className="flex items-center gap-12">
<a className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-50" href="#">Parking</a>
<div className="hidden md:flex gap-8">
<Link to="/dashboard" className="text-blue-700 dark:text-blue-400 font-bold border-b-2 border-blue-700 transition-colors">Find Parking</Link>
<a className="text-slate-600 dark:text-slate-400 font-medium hover:text-blue-600 dark:hover:text-blue-300 transition-colors" href="#">Reservations</a>
<a className="text-slate-600 dark:text-slate-400 font-medium hover:text-blue-600 dark:hover:text-blue-300 transition-colors" href="#">Business</a>
<a className="text-slate-600 dark:text-slate-400 font-medium hover:text-blue-600 dark:hover:text-blue-300 transition-colors" href="#">Help</a>
</div>
</div>
<div className="flex items-center gap-6">
<div className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium hover:text-blue-700 transition-all">
<span className="material-symbols-outlined text-[20px]">language</span>
<span className="text-sm">EN</span>
</div>
<div className="flex items-center gap-4">
<Link to="/dashboard" className="text-slate-600 font-medium hover:text-blue-700 transition-all active:scale-95 duration-200 block mt-2 text-center">Login</Link>
<Link to="/dashboard" className="bg-primary text-on-primary px-6 py-2 rounded-lg font-bold hover:bg-primary-container transition-all active:scale-95 duration-200">Sign Up</Link>
</div>
</div>
</div>
</nav>
{/*  Hero Section  */}
<section className="relative min-h-[870px] flex items-center pt-24 overflow-hidden">
{/*  Dark City Map Background  */}
<div className="absolute inset-0 bg-slate-900 z-0">
<div className="absolute inset-0 hero-grain"></div>
<div className="absolute inset-0 opacity-20" data-alt="abstract monochromatic urban city map from top view with glowing street lines and architectural silhouettes in dark navy blue" style={{backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAOqLpCqs_Ky2BGtql-gyz_UoUBcO_JHIpv_YTrDMqHCHTNku959d8fejSDcwxYoBNREsUu5OdgcHMQi4ynftsY_JzHJNqM6qFdfWuuwQ0rQEbQZP4ryiRmpC4Uz_IGFwI7gleDMNmwD0zKlzMeTdoEcm1nY1pFRzQZheMPxF8tToMy-IaxIzZl6cd-FrzvUOCJie0O2DQb3vVJjGbVDboT6UpUdgogec6wbACeal_uEHd9-ORR0jl-aX59WjzMmA9qxld9RZEy7cTH')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(1) contrast(1.2)'}}></div>
<div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/80 to-surface"></div>
</div>
{/*  Hero Content  */}
<div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
<div className="max-w-3xl">
<h1 className="font-headline text-[3.5rem] leading-tight font-extrabold text-white mb-6 tracking-tight">
                    Parking just got a <span className="text-primary-fixed">lot simpler</span>
</h1>
<p className="text-xl text-slate-300 mb-10 leading-relaxed font-body">
                    Mobile parking integration for a seamless experience. Discover, reserve, and manage your urban mobility with a single tap.
                </p>
<div className="flex flex-col sm:flex-row gap-4 items-start">
<Link to="/dashboard" className="bg-primary text-on-primary px-10 py-4 rounded-lg font-bold text-lg hover:bg-primary-container transition-all shadow-2xl active:scale-95 flex items-center gap-3">
<span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>directions_car</span>
                        Go to Dashboard
                    </Link>
<div className="flex items-center gap-4 px-6 py-4">
<div className="flex -space-x-3">
<div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-700" data-alt="close up headshot of smiling young professional man with glasses in soft urban lighting"></div>
<div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-700" data-alt="portrait of confident woman in modern office setting with warm sunlight and blurred background"></div>
<div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-700" data-alt="happy diverse person looking at phone in bright outdoor courtyard with greenery"></div>
</div>
<span className="text-slate-400 text-sm font-medium">Joined by 570K+ drivers</span>
</div>
</div>
</div>
{/*  Minimalist Decorative Icons/Paths  */}
<div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block w-[500px] h-[500px]">
<svg className="w-full h-full opacity-30" viewBox="0 0 400 400">
<path d="M 50,50 Q 200,50 200,200 T 350,350" fill="none" stroke="white" strokeDasharray="8,8" strokeWidth="2"></path>
<path d="M 350,50 Q 350,200 200,200 T 50,350" fill="none" stroke="#0056d2" strokeDasharray="8,8" strokeWidth="2"></path>
<circle cx="200" cy="200" fill="#0056d2" r="10"></circle>
</svg>
<div className="absolute top-[40px] left-[40px] bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20">
<span className="material-symbols-outlined text-white">directions_car</span>
</div>
<div className="absolute bottom-[40px] right-[40px] bg-primary/20 backdrop-blur-md p-3 rounded-full border border-primary/30">
<span className="material-symbols-outlined text-primary-fixed">local_parking</span>
</div>
<div className="absolute top-[340px] left-[40px] bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20">
<span className="material-symbols-outlined text-white">electric_car</span>
</div>
</div>
</div>
</section>
{/*  Content Section: Tonal Dual Cards  */}
<section className="max-w-7xl mx-auto px-8 -mt-20 relative z-20 pb-32">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
{/*  Left Card: Primary Solid  */}
<div className="bg-primary rounded-xl p-12 lg:p-16 flex flex-col justify-between min-h-[400px] shadow-2xl overflow-hidden relative group">
<div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/20 rounded-full -mr-20 -mt-20 blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
<div className="relative z-10">
<span className="material-symbols-outlined text-on-primary text-5xl mb-8" style={{fontVariationSettings: "'FILL' 1"}}>near_me</span>
<h2 className="font-headline text-3xl lg:text-4xl font-extrabold text-white leading-snug">
                        There are systems that offer nearby listings and competitive prices
                    </h2>
</div>
<div className="relative z-10 mt-8">
<a className="text-on-primary-container font-bold flex items-center gap-2 hover:gap-4 transition-all" href="#">
                        Explore listings <span className="material-symbols-outlined">arrow_forward</span>
</a>
</div>
</div>
{/*  Right Card: Metric/Stats Light Gray  */}
<div className="bg-surface-container-low rounded-xl p-12 lg:p-16 flex flex-col justify-between min-h-[400px]">
<div className="grid grid-cols-2 gap-8 mb-12">
<div>
<div className="font-headline text-5xl lg:text-6xl font-black text-primary mb-2">99%</div>
<div className="text-secondary font-medium tracking-wide uppercase text-xs">Success Rate</div>
</div>
<div>
<div className="font-headline text-5xl lg:text-6xl font-black text-slate-900 mb-2">570K+</div>
<div className="text-secondary font-medium tracking-wide uppercase text-xs">Active Users</div>
</div>
</div>
<div>
<p className="text-on-surface-variant mb-8 text-lg leading-relaxed">
                        Join the largest community of parkers worldwide and enjoy exclusive access to prime spots.
                    </p>
<div className="flex flex-wrap gap-4">
{/*  App Badges  */}
<div className="bg-slate-900 text-white px-5 py-2.5 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-slate-800 transition-colors">
<span className="material-symbols-outlined text-3xl">phone_iphone</span>
<div className="flex flex-col">
<span className="text-[10px] uppercase font-medium opacity-70">Download on the</span>
<span className="text-sm font-bold leading-none">App Store</span>
</div>
</div>
<div className="bg-slate-900 text-white px-5 py-2.5 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-slate-800 transition-colors">
<span className="material-symbols-outlined text-3xl">play_store_installed</span>
<div className="flex flex-col">
<span className="text-[10px] uppercase font-medium opacity-70">Get it on</span>
<span className="text-sm font-bold leading-none">Google Play</span>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
{/*  Footer  */}
<footer className="bg-slate-50 dark:bg-slate-950">
<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 p-12">
<div className="flex flex-col gap-4 items-center md:items-start">
<span className="font-bold text-slate-900 dark:text-white text-xl">Parking</span>
<p className="text-slate-500 text-sm max-w-xs text-center md:text-left">Revolutionizing urban mobility through intelligent digital infrastructure.</p>
</div>
<div className="flex flex-wrap justify-center gap-8">
<a className="text-slate-500 hover:text-slate-900 text-sm transition-all opacity-80 hover:opacity-100" href="#">Privacy Policy</a>
<a className="text-slate-500 hover:text-slate-900 text-sm transition-all opacity-80 hover:opacity-100" href="#">Terms of Service</a>
<a className="text-slate-500 hover:text-slate-900 text-sm transition-all opacity-80 hover:opacity-100" href="#">Cookie Settings</a>
<a className="text-slate-500 hover:text-slate-900 text-sm transition-all opacity-80 hover:opacity-100" href="#">Global Locations</a>
</div>
<div className="text-slate-500 text-sm">
                © 2024 Parking Inc. All rights reserved.
            </div>
</div>
</footer>

            </div>
        </div>
    );
};

export default Landing;
