import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface FormProgressBarProps {
  progressPercentage: number;
}

export const FormProgressBar: React.FC<FormProgressBarProps> = ({
  progressPercentage,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-6 shadow-sm">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-teal-500" /> Form Completion
        </span>
        <span className="text-teal-600 dark:text-teal-400 font-bold font-mono">
          {Math.round(progressPercentage)}%
        </span>
      </div>
      <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};
