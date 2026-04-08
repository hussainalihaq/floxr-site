import React, { useState } from "react";

interface InputGroupProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

export const InputGroup: React.FC<InputGroupProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  id,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <label className="flex flex-col gap-2 w-full" htmlFor={id}>
      <span className="text-sm font-medium dark:text-slate-200 text-slate-700">
        {label}
      </span>
      <div className="relative">
        <input
          id={id}
          type={inputType}
          className="form-input w-full rounded-lg dark:bg-surface-dark bg-white border dark:border-border-dark border-slate-300 dark:text-white text-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-500 h-12 px-4 focus:border-primary focus:ring-1 focus:ring-primary transition-all pr-10"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <span className="material-symbols-outlined text-[20px]">
              {showPassword ? "visibility" : "visibility_off"}
            </span>
          </button>
        )}
      </div>
    </label>
  );
};