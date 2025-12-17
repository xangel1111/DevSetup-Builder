import { Link } from 'react-router';
import { ArrowRight, Monitor, ShieldCheck, Zap } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] -z-10"></div>
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 text-xs font-medium text-blue-400 mb-6 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          v2.0 Now Available
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl">
          Build your dream <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 text-transparent bg-clip-text">
            Developer Setup
          </span>
        </h1>
        
        <p className="text-lg text-slate-400 max-w-2xl mb-10 leading-relaxed">
          The ultimate tool for developers to plan, budget, and visualize their workstation upgrades. 
          Manage your budget in real-time with our smart calculator.
        </p>

        <div className="flex gap-4">
          <Link 
            to="/builder" 
            className="px-8 py-4 rounded-xl bg-white text-slate-950 font-bold hover:bg-slate-200 transition flex items-center gap-2"
          >
            Start Building <ArrowRight size={20} />
          </Link>
          <Link 
            to="/admin" 
            className="px-8 py-4 rounded-xl bg-slate-900 border border-slate-800 text-white font-medium hover:bg-slate-800 transition"
          >
            Admin Demo
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 pb-20">
        {[
          { icon: Zap, title: "Real-time Budget", desc: "Track every dollar as you add components to your cart." },
          { icon: Monitor, title: "Premium Catalog", desc: "Curated selection of top-tier developer hardware." },
          { icon: ShieldCheck, title: "Admin Control", desc: "Full CRUD capabilities to manage inventory easily." }
        ].map((feature, idx) => (
          <div key={idx} className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 transition">
            <feature.icon className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-slate-400">{feature.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};