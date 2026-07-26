import React from 'react';
import { PatientFormStatus } from '@/types/realtime';
import { cn } from '@/lib/utils';

interface BadgeProps {
  status: PatientFormStatus;
  className?: string;
}

export const StatusBadge: React.FC<BadgeProps> = ({ status, className }) => {
  const configs = {
    'typing/filling': {
      label: 'กำลังกรอก (Filling)',
      dotClass: 'bg-amber-500 animate-ping',
      badgeClass:
        'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/50',
    },
    submitted: {
      label: 'ส่งข้อมูลแล้ว (Submitted)',
      dotClass: 'bg-emerald-500',
      badgeClass:
        'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50',
    },
    inactive: {
      label: 'Inactive (ไม่มีเคลื่อนไหว)',
      dotClass: 'bg-slate-400',
      badgeClass:
        'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700',
    },
  };

  const current = configs[status] || configs['inactive'];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border transition-all shadow-sm',
        current.badgeClass,
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={cn(
            'absolute inline-flex h-full w-full rounded-full opacity-75',
            current.dotClass
          )}
        />
        <span
          className={cn(
            'relative inline-flex rounded-full h-2 w-2',
            current.dotClass.replace('animate-ping', '')
          )}
        />
      </span>
      {current.label}
    </span>
  );
};
