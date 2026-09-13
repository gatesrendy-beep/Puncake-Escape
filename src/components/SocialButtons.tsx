import { MessageCircle, CheckCircle2 } from 'lucide-react';
import { SOCIAL_LINKS, SOCIAL_HANDLE, WHATSAPP_DISPLAY } from '../data/villas';

// Custom clean SVG icons for Instagram and TikTok for authentic branding
function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01v8.43c0 2.37-.87 4.7-2.43 6.36-1.57 1.66-3.79 2.59-6.09 2.58-3.08.01-6.04-1.6-7.51-4.28-1.47-2.69-1.28-6.07.48-8.56 1.76-2.5 4.79-3.86 7.78-3.48v4.2c-1.32-.32-2.77-.07-3.89.69-1.12.76-1.78 2.05-1.74 3.39.04 1.34.78 2.58 1.94 3.25 1.16.67 2.62.62 3.73-.13 1.11-.75 1.75-2.02 1.68-3.35V.02z" />
    </svg>
  );
}

function YouTubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

interface SocialButtonsProps {
  variant?: 'compact' | 'cards' | 'badges';
  className?: string;
}

export function SocialButtons({ variant = 'compact', className = '' }: SocialButtonsProps) {
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <a
          href={SOCIAL_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-xl bg-stone-800/80 hover:bg-gradient-to-tr hover:from-amber-600 hover:via-rose-600 hover:to-purple-600 text-stone-300 hover:text-white transition-all duration-300 border border-stone-700/60 shadow-xs hover:scale-105"
          title={`Instagram ${SOCIAL_HANDLE}`}
          aria-label="Instagram"
        >
          <InstagramIcon className="w-4 h-4" />
        </a>
        <a
          href={SOCIAL_LINKS.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-xl bg-stone-800/80 hover:bg-stone-900 text-stone-300 hover:text-cyan-400 transition-all duration-300 border border-stone-700/60 shadow-xs hover:scale-105"
          title={`TikTok ${SOCIAL_HANDLE}`}
          aria-label="TikTok"
        >
          <TikTokIcon className="w-4 h-4" />
        </a>
        <a
          href={SOCIAL_LINKS.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-xl bg-stone-800/80 hover:bg-red-600 text-stone-300 hover:text-white transition-all duration-300 border border-stone-700/60 shadow-xs hover:scale-105"
          title={`YouTube ${SOCIAL_HANDLE}`}
          aria-label="YouTube"
        >
          <YouTubeIcon className="w-4 h-4" />
        </a>
        <a
          href={SOCIAL_LINKS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-xl bg-emerald-700/90 hover:bg-emerald-600 text-white transition-all duration-300 border border-emerald-500/40 shadow-xs hover:scale-105"
          title={`WhatsApp ${WHATSAPP_DISPLAY}`}
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
        </a>
      </div>
    );
  }

  if (variant === 'badges') {
    return (
      <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
        {/* Verified Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Official {SOCIAL_HANDLE}</span>
        </div>

        {/* Instagram Pill */}
        <a
          href={SOCIAL_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/90 hover:bg-gradient-to-r hover:from-amber-600 hover:to-rose-600 text-stone-200 hover:text-white text-xs font-medium border border-stone-800 transition-all hover:scale-105 shadow-xs"
        >
          <InstagramIcon className="w-3.5 h-3.5" />
          <span>Instagram</span>
        </a>

        {/* TikTok Pill */}
        <a
          href={SOCIAL_LINKS.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/90 hover:bg-black text-stone-200 hover:text-cyan-300 text-xs font-medium border border-stone-800 transition-all hover:scale-105 shadow-xs"
        >
          <TikTokIcon className="w-3.5 h-3.5" />
          <span>TikTok</span>
        </a>

        {/* WhatsApp Pill */}
        <a
          href={SOCIAL_LINKS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/90 hover:bg-emerald-700 text-white text-xs font-semibold border border-emerald-600/50 transition-all hover:scale-105 shadow-xs"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
          <span>{WHATSAPP_DISPLAY}</span>
        </a>
      </div>
    );
  }

  // Cards layout (perfect for Footer or Contact section)
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 ${className}`}>
      
      {/* Instagram Card */}
      <a
        href={SOCIAL_LINKS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative p-3.5 rounded-2xl bg-stone-900/80 hover:bg-stone-900 border border-stone-800 hover:border-rose-500/50 transition-all duration-300 flex flex-col items-start gap-2 shadow-xs hover:shadow-lg hover:-translate-y-0.5"
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-md">
          <InstagramIcon className="w-4 h-4" />
        </div>
        <div>
          <span className="text-xs font-bold text-stone-100 group-hover:text-rose-400 transition-colors block">
            Instagram
          </span>
          <span className="text-[11px] text-stone-400 font-mono">
            {SOCIAL_HANDLE}
          </span>
        </div>
      </a>

      {/* TikTok Card */}
      <a
        href={SOCIAL_LINKS.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative p-3.5 rounded-2xl bg-stone-900/80 hover:bg-stone-900 border border-stone-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col items-start gap-2 shadow-xs hover:shadow-lg hover:-translate-y-0.5"
      >
        <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center border border-stone-700 shadow-md">
          <TikTokIcon className="w-4 h-4 text-cyan-400" />
        </div>
        <div>
          <span className="text-xs font-bold text-stone-100 group-hover:text-cyan-400 transition-colors block">
            TikTok
          </span>
          <span className="text-[11px] text-stone-400 font-mono">
            {SOCIAL_HANDLE}
          </span>
        </div>
      </a>

      {/* YouTube Card */}
      <a
        href={SOCIAL_LINKS.youtube}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative p-3.5 rounded-2xl bg-stone-900/80 hover:bg-stone-900 border border-stone-800 hover:border-red-500/50 transition-all duration-300 flex flex-col items-start gap-2 shadow-xs hover:shadow-lg hover:-translate-y-0.5"
      >
        <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md">
          <YouTubeIcon className="w-4 h-4" />
        </div>
        <div>
          <span className="text-xs font-bold text-stone-100 group-hover:text-red-400 transition-colors block">
            YouTube
          </span>
          <span className="text-[11px] text-stone-400 font-mono">
            {SOCIAL_HANDLE}
          </span>
        </div>
      </a>

      {/* WhatsApp Official Card */}
      <a
        href={SOCIAL_LINKS.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative p-3.5 rounded-2xl bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-700/50 hover:border-emerald-500 transition-all duration-300 flex flex-col items-start gap-2 shadow-xs hover:shadow-lg hover:-translate-y-0.5"
      >
        <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
          <MessageCircle className="w-4 h-4 fill-current" />
        </div>
        <div>
          <span className="text-xs font-bold text-emerald-200 group-hover:text-emerald-100 transition-colors block">
            WhatsApp CS
          </span>
          <span className="text-[11px] text-emerald-300 font-mono font-medium">
            {WHATSAPP_DISPLAY}
          </span>
        </div>
      </a>

    </div>
  );
}
