import React, { useState, useEffect } from 'react';
import { Download, X, Sparkles, Smartphone } from 'lucide-react';
import { usePWA } from '../../context/PWAContext';

export default function PWAInstallPrompt() {
  const { isInstalled, openInstallModal } = usePWA();
  const [showCard, setShowCard] = useState(false);
  const [minimized, setMinimized] = useState(true);

  useEffect(() => {
    if (isInstalled) return;

    // Check if user minimized the prompt in this session
    const sessionDismissed = sessionStorage.getItem('yathra_pwa_session_dismissed');
    if (!sessionDismissed) {
      // Show full card after 1.5 seconds
      const timer = setTimeout(() => {
        setShowCard(true);
        setMinimized(false);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setMinimized(true);
    }
  }, [isInstalled]);

  const handleDismiss = () => {
    setShowCard(false);
    setMinimized(true);
    sessionStorage.setItem('yathra_pwa_session_dismissed', 'true');
  };

  const handleAction = () => {
    setShowCard(false);
    setMinimized(true);
    openInstallModal();
  };

  if (isInstalled) return null;

  return (
    <>
      {/* 1. Full Interactive Slide-up Card (Shows initially) */}
      {showCard && (
        <div className="fixed bottom-20 md:bottom-6 right-4 left-4 sm:left-auto sm:right-6 z-50 max-w-sm bg-[#0a231b] text-white p-4 rounded-3xl shadow-2xl border border-amber-400/30 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#d97706] to-[#fbbf24] p-0.5 shrink-0 shadow-md">
                <div className="w-full h-full rounded-[14px] bg-[#0d221a] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-serif font-bold text-white">Install YATHRA App</h4>
                <p className="text-[11px] text-stone-300 leading-tight mt-0.5">
                  Install on your mobile home screen for 1-tap bookings & offline access.
                </p>
              </div>
            </div>

            <button
              onClick={handleDismiss}
              className="text-stone-400 hover:text-white p-1 rounded-lg cursor-pointer"
              aria-label="Dismiss prompt"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3.5 flex items-center gap-2 pt-2 border-t border-white/10">
            <button
              onClick={handleAction}
              className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#d97706] to-[#e59325] hover:from-[#c26500] hover:to-[#d97706] text-white text-xs font-bold tracking-wide shadow flex items-center justify-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install Web App</span>
            </button>
            <button
              onClick={handleDismiss}
              className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-stone-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              Later
            </button>
          </div>
        </div>
      )}

      {/* 2. Persistent Floating PWA Install Pill (Always available on screen when card is closed) */}
      {minimized && !showCard && (
        <aside aria-label="Install YATHRA App" className="fixed bottom-5 right-4 z-40 flex items-center animate-in fade-in zoom-in-95 duration-200">
          <button
            type="button"
            onClick={openInstallModal}
            className="group px-3.5 py-2.5 rounded-full bg-[#0a231b]/95 hover:bg-[#0a231b] text-white border border-amber-400/50 shadow-2xl backdrop-blur-md flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            title="Install YATHRA Progressive Web App"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-300">
              <Smartphone className="w-3.5 h-3.5" />
              <span>App</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-amber-500 group-hover:bg-amber-400 text-[#0a231b] flex items-center justify-center shadow-sm">
              <Download className="w-3.5 h-3.5 font-bold" />
            </div>
          </button>
        </aside>
      )}
    </>
  );
}
