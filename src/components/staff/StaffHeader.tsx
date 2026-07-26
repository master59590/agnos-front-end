import React from 'react';
import { Button } from '@/components/ui/Button';
import { QrCode, Stethoscope, Users, CheckCircle } from 'lucide-react';

interface StaffHeaderProps {
  onOpenQR: () => void;
  activeCount: number;
  submittedCount: number;
}

export const StaffHeader: React.FC<StaffHeaderProps> = ({
  onOpenQR,
  activeCount,
  submittedCount,
}) => {
  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-900/10 mb-8 border border-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 rounded-full text-xs font-medium text-teal-400 border border-teal-500/20 mb-3">
            <Stethoscope className="w-4 h-4 text-teal-400" /> Agnos Clinical Staff Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Real-Time Patient Monitor
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            แดชบอร์ดติดตามการกรอกข้อมูลผู้ป่วยแบบ Real-Time และประวัติการลงทะเบียน
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-3 rounded-2xl border border-slate-700">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Active Live Sessions</div>
              <div className="text-lg font-bold font-mono text-amber-400">{activeCount}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-3 rounded-2xl border border-slate-700">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Total Submitted</div>
              <div className="text-lg font-bold font-mono text-emerald-400">{submittedCount}</div>
            </div>
          </div>

          <Button
            variant="primary"
            onClick={onOpenQR}
            className="h-full bg-teal-500 hover:bg-teal-600 shadow-teal-500/20"
          >
            <QrCode className="w-5 h-5" /> Patient QR Code
          </Button>
        </div>
      </div>
    </div>
  );
};
