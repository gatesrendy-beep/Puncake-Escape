import logoImg from '../assets/images/puncake_logo_1789261741327.jpg';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  subtextColor?: string;
}

export function BrandLogo({
  size = 'md',
  showText = true,
  className = '',
  subtextColor = 'text-stone-300',
}: BrandLogoProps) {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`relative ${sizeMap[size]} rounded-full p-[1.5px] bg-gradient-to-tr from-amber-600 via-amber-200 to-amber-500 shadow-md shrink-0`}>
        <img
          src={logoImg}
          alt="Puncak Escape - Private Villa Collection"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-display text-base sm:text-lg font-bold tracking-tight text-white leading-none">
              PUNCAKE ESCAPE
            </span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-widest text-amber-300 bg-amber-950/70 border border-amber-500/40 rounded-sm">
              Official
            </span>
          </div>
          <span className={`text-[10px] tracking-wider uppercase font-medium ${subtextColor} leading-tight mt-0.5`}>
            Private Villa Collection • Puncak
          </span>
        </div>
      )}
    </div>
  );
}
