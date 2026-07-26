import React from 'react';
import { Activity, ShieldCheck } from 'lucide-react';

interface PatientFormHeaderProps {
  sessionId: string;
}

export const PatientFormHeader: React.FC<PatientFormHeaderProps> = ({
  sessionId,
}) => {
  return (
    <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-teal-700/10 mb-8 relative overflow-hidden">
      <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 opacity-10 pointer-events-none">
        <Activity className="w-64 h-64 text-white" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-teal-100 mb-3 border border-white/20">
            <ShieldCheck className="w-4 h-4 text-emerald-300" /> Agnos Health Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Patient Registration Form
          </h1>
          <p className="text-teal-100 text-sm mt-1">
            แบบฟอร์มลงทะเบียนประวัติผู้ป่วยใหม่ (กรอกข้อมูลล่วงหน้า)
          </p>
        </div>

        <div className="flex flex-col items-start sm:items-end bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20">
          <span className="text-[10px] uppercase font-bold tracking-wider text-teal-200">
            Session ID
          </span>
          <span className="font-mono text-sm font-bold tracking-widest text-white">
            {sessionId}
          </span>
        </div>
      </div>
    </div>
  );
};
