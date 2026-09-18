import React from 'react';

// Exact SVG icons corresponding to the 14 module cards from the presentation grid
export const ModuleIcon: React.FC<{ name: string; className?: string }> = ({ name, className = "w-10 h-10" }) => {
  switch (name) {
    case 'costo-fijo': // Truck with clock/calendar
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          <path d="M6 14C6 11.7909 7.79086 10 10 10H28V32H6V14Z" fill="#F97316" fillOpacity="0.15" stroke="#15181E" strokeWidth="2.5" strokeLinejoin="round"/>
          <path d="M28 17H35.5858C36.6466 17 37.664 17.4214 38.4142 18.1716L41.8284 21.5858C42.5786 22.336 43 23.3534 43 24.4142V32H28V17Z" fill="#F5B301" fillOpacity="0.25" stroke="#15181E" strokeWidth="2.5" strokeLinejoin="round"/>
          <circle cx="14" cy="34" r="5" fill="#F97316" stroke="#15181E" strokeWidth="2.5"/>
          <circle cx="14" cy="34" r="2" fill="#15181E"/>
          <circle cx="35" cy="34" r="5" fill="#F97316" stroke="#15181E" strokeWidth="2.5"/>
          <circle cx="35" cy="34" r="2" fill="#15181E"/>
          <path d="M12 18H22" stroke="#15181E" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );

    case 'gasoil': // Gas pump
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          <rect x="8" y="8" width="22" height="32" rx="3" fill="#F97316" fillOpacity="0.12" stroke="#15181E" strokeWidth="2.5"/>
          <rect x="13" y="14" width="12" height="8" rx="1.5" fill="#FFFFFF" stroke="#15181E" strokeWidth="2"/>
          <path d="M30 16H34C36.2091 16 38 17.7909 38 20V32C38 33.1046 37.1046 34 36 34C34.8954 34 34 33.1046 34 32V24" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M34 24L31 22" stroke="#15181E" strokeWidth="2" strokeLinecap="round"/>
          <path d="M14 28H24" stroke="#15181E" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      );

    case 'amortizacion': // Decreasing bar chart with downward arrow
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          <rect x="8" y="14" width="6" height="24" rx="1" fill="#15181E" stroke="#15181E" strokeWidth="2"/>
          <rect x="18" y="20" width="6" height="18" rx="1" fill="#3A4250" stroke="#15181E" strokeWidth="2"/>
          <rect x="28" y="26" width="6" height="12" rx="1" fill="#F5B301" stroke="#15181E" strokeWidth="2"/>
          <path d="M6 12L38 34M38 34H30M38 34V26" stroke="#C2410C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );

    case 'desgaste': // Tire wheel with wear markers and coin
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          <circle cx="22" cy="22" r="14" stroke="#15181E" strokeWidth="3" fill="#3A4250" fillOpacity="0.1"/>
          <circle cx="22" cy="22" r="7" stroke="#15181E" strokeWidth="2.5" fill="#FFFFFF"/>
          <circle cx="22" cy="22" r="2.5" fill="#15181E"/>
          <path d="M22 8V15M22 29V36M8 22H15M29 22H36" stroke="#15181E" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="34" cy="34" r="6.5" fill="#F5B301" stroke="#15181E" strokeWidth="2"/>
          <text x="32" y="37" fontSize="8" fontWeight="bold" fill="#15181E" fontFamily="sans-serif">$</text>
        </svg>
      );

    case 'costo-viaje': // Highway perspective lines with yellow center
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          <path d="M10 40L19 8H29L38 40H10Z" fill="#3A4250" fillOpacity="0.15" stroke="#15181E" strokeWidth="2.5" strokeLinejoin="round"/>
          <line x1="24" y1="12" x2="24" y2="18" stroke="#F5B301" strokeWidth="3" strokeLinecap="round"/>
          <line x1="24" y1="23" x2="24" y2="30" stroke="#F5B301" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="24" y1="35" x2="24" y2="40" stroke="#F5B301" strokeWidth="4" strokeLinecap="round"/>
        </svg>
      );

    case 'peajes': // Toll booth barrier gate
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          <rect x="8" y="18" width="10" height="22" rx="2" fill="#F97316" fillOpacity="0.2" stroke="#15181E" strokeWidth="2.5"/>
          <rect x="11" y="22" width="4" height="4" fill="#15181E"/>
          <path d="M13 18V12" stroke="#15181E" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="13" cy="10" r="2.5" fill="#C2410C"/>
          <path d="M18 24H38" stroke="#15181E" strokeWidth="3.5" strokeLinecap="round"/>
          <line x1="23" y1="22" x2="21" y2="26" stroke="#C2410C" strokeWidth="2"/>
          <line x1="29" y1="22" x2="27" y2="26" stroke="#C2410C" strokeWidth="2"/>
          <line x1="35" y1="22" x2="33" y2="26" stroke="#C2410C" strokeWidth="2"/>
          <line x1="38" y1="24" x2="38" y2="38" stroke="#15181E" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      );

    case 'viaticos': // Steering wheel with driver badge/coin
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          <circle cx="22" cy="24" r="14" stroke="#15181E" strokeWidth="3" fill="#F7F5F0"/>
          <circle cx="22" cy="24" r="4.5" fill="#15181E"/>
          <path d="M8 24H17.5M26.5 24H36M22 28.5V38" stroke="#15181E" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="34" cy="14" r="6.5" fill="#F97316" stroke="#15181E" strokeWidth="2"/>
          <text x="32" y="17" fontSize="8" fontWeight="bold" fill="#FFFFFF" fontFamily="sans-serif">$</text>
        </svg>
      );

    case 'espera': // Clock with hourglass and money icon
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          <circle cx="22" cy="22" r="13" stroke="#15181E" strokeWidth="2.5" fill="#FFFFFF"/>
          <polyline points="22,14 22,22 27,24" stroke="#15181E" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="34" cy="34" r="6.5" fill="#F5B301" stroke="#15181E" strokeWidth="2"/>
          <text x="32" y="37" fontSize="8" fontWeight="bold" fill="#15181E" fontFamily="sans-serif">$</text>
        </svg>
      );

    case 'tarifa-eventual': // Price tag with dollar sign
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          <path d="M12 22L26 8H36V18L22 32L12 22Z" fill="#F97316" fillOpacity="0.2" stroke="#15181E" strokeWidth="2.5" strokeLinejoin="round"/>
          <circle cx="30" cy="14" r="2.5" fill="#15181E"/>
          <text x="18" y="24" fontSize="9" fontWeight="bold" fill="#15181E" fontFamily="sans-serif">$</text>
        </svg>
      );

    case 'tarifa-fija': // Document contract with verified badge
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          <rect x="12" y="8" width="20" height="28" rx="2" fill="#FFFFFF" stroke="#15181E" strokeWidth="2.5"/>
          <line x1="16" y1="14" x2="26" y2="14" stroke="#15181E" strokeWidth="2" strokeLinecap="round"/>
          <line x1="16" y1="19" x2="28" y2="19" stroke="#15181E" strokeWidth="2" strokeLinecap="round"/>
          <line x1="16" y1="24" x2="24" y2="24" stroke="#15181E" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="28" cy="32" r="6" fill="#F5B301" stroke="#15181E" strokeWidth="2"/>
          <polyline points="25.5,32 27.5,34 30.5,30" stroke="#15181E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );

    case 'bulto-pallet': // Isometric package box
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          <path d="M24 8L38 16V32L24 40L10 32V16L24 8Z" fill="#EDE9E0" stroke="#15181E" strokeWidth="2.5" strokeLinejoin="round"/>
          <line x1="24" y1="8" x2="24" y2="24" stroke="#15181E" strokeWidth="2"/>
          <line x1="24" y1="24" x2="38" y2="16" stroke="#15181E" strokeWidth="2"/>
          <line x1="24" y1="24" x2="10" y2="16" stroke="#15181E" strokeWidth="2"/>
          <line x1="24" y1="24" x2="24" y2="40" stroke="#15181E" strokeWidth="2.5"/>
        </svg>
      );

    case 'actualizacion-indice': // Graph going up with red arrow
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          <polyline points="8,36 8,10" stroke="#15181E" strokeWidth="2.5" strokeLinecap="round"/>
          <polyline points="8,36 38,36" stroke="#15181E" strokeWidth="2.5" strokeLinecap="round"/>
          <polyline points="10,32 18,24 26,27 36,14" stroke="#C2410C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="30,14 36,14 36,20" stroke="#C2410C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );

    case 'punto-indiferencia': // Traffic light
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          <rect x="16" y="8" width="16" height="32" rx="4" fill="#15181E" stroke="#15181E" strokeWidth="2"/>
          <circle cx="24" cy="14" r="3" fill="#EF4444"/>
          <circle cx="24" cy="24" r="3" fill="#F5B301"/>
          <circle cx="24" cy="34" r="3" fill="#10B981"/>
        </svg>
      );

    case 'equilibrio-retiro': // Wallet with bills
      return (
        <svg viewBox="0 0 48 48" fill="none" className={className}>
          <rect x="8" y="14" width="30" height="22" rx="3" fill="#EDE9E0" stroke="#15181E" strokeWidth="2.5"/>
          <path d="M12 14V11C12 9.89543 12.8954 9 14 9H34C35.1046 9 36 9.89543 36 11V14" stroke="#15181E" strokeWidth="2" strokeLinecap="round"/>
          <rect x="26" y="20" width="14" height="10" rx="2" fill="#F5B301" stroke="#15181E" strokeWidth="2"/>
          <circle cx="31" cy="25" r="1.5" fill="#15181E"/>
        </svg>
      );

    default:
      return null;
  }
};
