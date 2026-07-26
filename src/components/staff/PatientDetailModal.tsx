import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { PatientRecord } from '@/types/patient';
import { Printer, User, Phone, Mail, MapPin, Globe, HeartHandshake, ShieldCheck } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface PatientDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: PatientRecord | null;
}

export const PatientDetailModal: React.FC<PatientDetailModalProps> = ({
  isOpen,
  onClose,
  record,
}) => {
  if (!record) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Medical Record - ${record.id}`}>
      <div className="space-y-6 text-slate-800 dark:text-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center font-bold text-xl">
              {record.firstName.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {record.firstName} {record.middleName || ''} {record.lastName}
              </h2>
              <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
                <span>HN: {record.id}</span> • <span>Session: {record.sessionId}</span>
              </div>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold rounded-full">
            Submitted / ลงทะเบียนแล้ว
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-slate-400">Date of Birth:</span>
            <div className="font-semibold text-sm">{formatDate(record.dob)}</div>
          </div>
          <div className="space-y-1">
            <span className="text-slate-400">Gender:</span>
            <div className="font-semibold text-sm capitalize">{record.gender}</div>
          </div>
          <div className="space-y-1">
            <span className="text-slate-400">Preferred Language:</span>
            <div className="font-semibold text-sm">{record.preferredLanguage}</div>
          </div>
          <div className="space-y-1">
            <span className="text-slate-400">Nationality:</span>
            <div className="font-semibold text-sm">{record.nationality}</div>
          </div>
        </div>

        <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-4 text-xs">
          <h4 className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-teal-600" /> Contact & Address
          </h4>
          <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl space-y-1.5">
            <div><span className="text-slate-400">Phone:</span> <span className="font-semibold">{record.phone}</span></div>
            <div><span className="text-slate-400">Email:</span> <span className="font-semibold">{record.email}</span></div>
            <div><span className="text-slate-400">Address:</span> <span className="font-semibold">{record.address}</span></div>
          </div>
        </div>

        {(record.emergencyContactName || record.religion) && (
          <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-4 text-xs">
            <h4 className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-teal-600" /> Additional Details
            </h4>
            <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl space-y-1.5">
              {record.emergencyContactName && (
                <div>
                  <span className="text-slate-400">Emergency Contact:</span>{' '}
                  <span className="font-semibold">{record.emergencyContactName}</span>{' '}
                  {record.emergencyContactPhone && `(${record.emergencyContactPhone})`}{' '}
                  {record.emergencyRelationship && `- ${record.emergencyRelationship}`}
                </div>
              )}
              {record.religion && (
                <div><span className="text-slate-400">Religion:</span> <span className="font-semibold">{record.religion}</span></div>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="w-full gap-2" onClick={handlePrint}>
            <Printer className="w-4 h-4" /> Print Record / พิมพ์เอกสาร
          </Button>
          <Button variant="primary" className="w-full" onClick={onClose}>
            Close / ปิดหน้าต่าง
          </Button>
        </div>
      </div>
    </Modal>
  );
};
