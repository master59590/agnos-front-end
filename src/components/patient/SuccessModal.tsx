import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, ShieldAlert } from 'lucide-react';
import { PatientRecord } from '@/types/patient';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: PatientRecord | null;
  onReset: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  record,
  onReset,
}) => {
  if (!record) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center py-4 space-y-4">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/50 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400 animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">
            Form Submitted Successfully!
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            ส่งข้อมูลประวัติผู้ป่วยเรียบร้อยแล้ว ข้อมูลจะถูก Sync ไปยังระบบเจ้าหน้าที่ทันที
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 text-left border border-slate-100 dark:border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">Patient HN:</span>
            <span className="font-mono font-bold text-teal-600 dark:text-teal-400">{record.id}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">Full Name:</span>
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {record.firstName} {record.middleName || ''} {record.lastName}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">Phone:</span>
            <span className="font-medium text-slate-700 dark:text-slate-200">{record.phone}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">Session ID:</span>
            <span className="font-mono text-slate-500">{record.sessionId}</span>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="w-full" onClick={onClose}>
            Close / ปิดหน้าต่าง
          </Button>
          <Button variant="primary" className="w-full" onClick={onReset}>
            Fill New Form / กรอกอีกครั้ง
          </Button>
        </div>
      </div>
    </Modal>
  );
};
