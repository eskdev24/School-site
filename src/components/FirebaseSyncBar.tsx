import React, { useState, useEffect } from 'react';
import { Database, ShieldCheck, ExternalLink, Users, Sparkles, LayoutDashboard } from 'lucide-react';
import { subscribeParentRegistrations, subscribeDemoBookings } from '../services/firebaseDb';

interface FirebaseSyncBarProps {
  onOpenAdminPortal: () => void;
}

export const FirebaseSyncBar: React.FC<FirebaseSyncBarProps> = ({ onOpenAdminPortal }) => {
  const [parentCount, setParentCount] = useState<number>(0);
  const [demoCount, setDemoCount] = useState<number>(0);

  useEffect(() => {
    const unsubP = subscribeParentRegistrations((data) => setParentCount(data.length));
    const unsubD = subscribeDemoBookings((data) => setDemoCount(data.length));
    return () => {
      unsubP();
      unsubD();
    };
  }, []);

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-slate-200 text-xs px-3 sm:px-6 py-2">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Status */}
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>

          <span className="flex items-center gap-1 font-bold text-slate-100">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Firebase Database:</span>
            <span className="text-emerald-400">Realtime DB Live</span>
          </span>

          <span className="text-slate-600 hidden sm:inline">•</span>

          <span className="text-slate-400 hidden md:inline">
            Real-time Parent Registrations & School Demos Syncing
          </span>
        </div>

        {/* Right: Live Lead Portal Access */}
        <div className="flex items-center gap-2 ml-auto">
          <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-md text-[11px] text-slate-300">
            <span>Leads:</span>
            <span className="text-emerald-400 font-bold">{parentCount} Parents</span>
            <span className="text-slate-600">|</span>
            <span className="text-teal-400 font-bold">{demoCount} Schools</span>
          </div>

          <button
            onClick={onOpenAdminPortal}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2.5 py-1 rounded-md text-[11px] flex items-center gap-1 transition-all cursor-pointer shadow-xs active:scale-[0.98]"
            title="Open SAMATHS Lead & Registration Management Portal"
          >
            <LayoutDashboard className="w-3 h-3" />
            <span>Lead & Admin Portal</span>
          </button>
        </div>
      </div>
    </div>
  );
};
