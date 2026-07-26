import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  isActiveField?: boolean;
  required?: boolean;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      isActiveField,
      required,
      icon,
      className,
      type,
      onClick,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const handleIconClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (inputRef.current) {
        inputRef.current.focus();
        if (type === 'date') {
          try {
            inputRef.current.showPicker();
          } catch (err) {
            // Fallback for older browser engines
          }
        }
      }
    };

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center justify-between">
            <span>
              {label} {required && <span className="text-rose-500">*</span>}
            </span>
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <button
              type="button"
              onClick={handleIconClick}
              title="Click to open calendar picker"
              className="absolute left-3 text-slate-400 hover:text-teal-500 z-10 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
            >
              {icon}
            </button>
          )}
          <input
            ref={inputRef}
            type={type}
            onClick={onClick}
            className={cn(
              'w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border text-slate-900 dark:text-slate-100 rounded-xl text-sm transition-all focus:outline-none placeholder:text-slate-400 font-sans',
              icon && 'pl-11',
              type === 'date' && 'scheme-dark dark:scheme-dark cursor-text',
              error
                ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20 bg-rose-50/20'
                : isActiveField
                ? 'border-teal-500 ring-2 ring-teal-500/30 bg-teal-50/20 dark:bg-teal-950/20'
                : 'border-slate-200 dark:border-slate-800 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20',
              className
            )}
            {...props}
          />
        </div>
        {error ? (
          <span className="text-xs text-rose-500 font-medium flex items-center gap-1">
            ⚠️ {error}
          </span>
        ) : helperText ? (
          <span className="text-xs text-slate-400">{helperText}</span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
