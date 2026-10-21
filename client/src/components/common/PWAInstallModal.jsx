import React from 'react';
import { X, Download, Share2, PlusSquare, Smartphone, Zap, WifiOff, CheckCircle2 } from 'lucide-react';
import { usePWA } from '../../context/PWAContext';

export default function PWAInstallModal() {
  const { modalOpen, closeInstallModal, promptInstall, isInstallable, isInstalled } = usePWA();

  if (!modalOpen) return null;

  // Detect iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#0a231b] p-6 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#d97706]/10 rounded-full blur-2xl pointer-events-none" />

          <button
            onClick={closeInstallModal}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-stone-300 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Logo Badge */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#d97706] to-[#fbbf24] p-0.5 mx-auto mb-3 shadow-xl">
            <div className="w-full h-full rounded-[14px] bg-[#0d221a] flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-10 h-10 fill-current">
                <circle cx="50" cy="50" r="46" fill="#e59325" />
                <circle cx="28" cy="24" r="7" fill="#fef08a" />
                <polygon points="12,78 38,42 62,78" fill="#1b4d3e" />
                <polygon points="40,78 65,34 90,78" fill="#0d221a" />
              </svg>
            </div>
          </div>

          <h3 className="text-2xl font-serif font-black tracking-tight text-white">
            Install YATHRA App
          </h3>
          <p className="text-xs text-emerald-300/90 mt-1">
            Progressive Web App • Fast, Lightweight & Offline-Ready
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Benefits Grid */}
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#faf8f5] border border-stone-100">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-stone-900">Instant One-Tap Access</h4>
                <p className="text-[11px] text-stone-500 leading-tight mt-0.5">
                  Launch full-screen directly from your home screen without using an app store.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#faf8f5] border border-stone-100">
              <div className="p-2 rounded-xl bg-amber-100 text-[#d97706] shrink-0">
                <WifiOff className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-stone-900">Offline & Fast Browsing</h4>
                <p className="text-[11px] text-stone-500 leading-tight mt-0.5">
                  View your saved stays and itineraries even with spotty hill station network.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#faf8f5] border border-stone-100">
              <div className="p-2 rounded-xl bg-purple-100 text-purple-800 shrink-0">
                <Smartphone className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-stone-900">Zero Storage Hassle</h4>
                <p className="text-[11px] text-stone-500 leading-tight mt-0.5">
                  Takes less than 1 MB of phone memory and updates automatically.
                </p>
              </div>
            </div>
          </div>

          {/* Platform Specific Action */}
          {isInstalled ? (
            <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-900 text-center border border-emerald-200 text-xs">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
              <p className="font-bold">YATHRA is already installed on your device!</p>
              <p className="text-[11px] text-emerald-700 mt-0.5">You can launch it anytime from your home screen or apps.</p>
            </div>
          ) : isIOS ? (
            /* iOS Instructions */
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-left space-y-2 text-xs">
              <div className="font-bold text-stone-900 flex items-center gap-1.5">
                <span>How to Install on iPhone / iPad:</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-[10px] shrink-0">1</span>
                <span>Tap the <strong>Share</strong> button <Share2 className="w-3.5 h-3.5 inline mx-1 text-blue-600" /> at bottom of Safari</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-[10px] shrink-0">2</span>
                <span>Scroll down and select <strong>"Add to Home Screen"</strong> <PlusSquare className="w-3.5 h-3.5 inline mx-1 text-stone-700" /></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-[10px] shrink-0">3</span>
                <span>Tap <strong>Add</strong> at top-right to launch YATHRA like a native app!</span>
              </div>
            </div>
          ) : (
            /* Android / Desktop / Chrome 1-Click Install */
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={promptInstall}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#d97706] to-[#e59325] hover:from-[#c26500] hover:to-[#d97706] text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Install YATHRA App</span>
              </button>
              <p className="text-[11px] text-stone-400 text-center">
                Works on Chrome, Edge, Brave, and Android devices
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
