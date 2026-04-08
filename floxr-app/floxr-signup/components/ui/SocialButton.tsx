import React from "react";

interface SocialButtonProps {
  iconSrc: string;
  provider: string;
  onClick?: () => void;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  iconSrc,
  provider,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center gap-3 px-4 h-12 rounded-lg border dark:border-border-dark border-slate-200 dark:bg-surface-dark bg-white hover:bg-slate-50 dark:hover:bg-[#252932] transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
    >
      <img
        src={iconSrc}
        alt={`${provider} Logo`}
        className="w-5 h-5"
      />
      <span className="text-sm font-medium dark:text-white text-slate-700">
        {provider}
      </span>
    </button>
  );
};