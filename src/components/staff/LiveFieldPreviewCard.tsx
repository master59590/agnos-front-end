import React from 'react';
import { Card } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/Badge';
import { RealtimeSyncPayload } from '@/types/realtime';
import { Eye, Edit2, ShieldAlert } from 'lucide-react';
import { PatientFormData } from '@/types/patient';

interface LiveFieldPreviewCardProps {
  session: RealtimeSyncPayload | null;
}

export const LiveFieldPreviewCard: React.FC<LiveFieldPreviewCardProps> = ({
  session,
}) => {
  if (!session) {
    return (
      <Card className="mb-6 bg-slate-50/50 dark:bg-slate-900/50 border-dashed">
        <div className="text-center py-8 text-slate-400">
          <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm font-medium">Select an active session above to view live field typing</p>
        </div>
      </Card>
    );
  }

  const { formData, activeField, status, sessionId, updatedAt } = session;

  const renderFieldRow = (
    label: string,
    fieldKey: keyof PatientFormData,
    val: string | undefined
  ) => {
    const isActive = activeField === fieldKey && status === 'typing/filling';

    return (
      <div
        className={`p-3 rounded-xl border transition-all ${
          isActive
            ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-400 shadow-sm ring-1 ring-amber-400'
            : 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800'
        }`}
      >
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
          <span>{label}</span>
          {isActive && (
            <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1 font-bold animate-pulse">
              <Edit2 className="w-3 h-3" /> Typing now...
            </span>
          )}
        </div>
        <div className="text-sm font-medium text-slate-800 dark:text-slate-100 min-h-[20px] font-mono break-words">
          {val || <span className="text-slate-300 dark:text-slate-600 font-sans italic">Not filled yet</span>}
        </div>
      </div>
    );
  };

  return (
    <Card className="mb-6 border-teal-500/30 dark:border-teal-500/20 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 px-2.5 py-1 rounded-lg border border-teal-200 dark:border-teal-800">
              {sessionId}
            </span>
            <StatusBadge status={status} />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mt-2">
            Live Field Inspector (เรียลไทม์ขณะผู้ป่วยพิมพ์)
          </h3>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Last sync: {new Date(updatedAt).toLocaleTimeString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {renderFieldRow('First Name', 'firstName', formData.firstName)}
        {renderFieldRow('Middle Name', 'middleName', formData.middleName)}
        {renderFieldRow('Last Name', 'lastName', formData.lastName)}
        {renderFieldRow('Date of Birth', 'dob', formData.dob)}
        {renderFieldRow('Gender', 'gender', formData.gender)}
        {renderFieldRow('Phone Number', 'phone', formData.phone)}
        {renderFieldRow('Email Address', 'email', formData.email)}
        {renderFieldRow('Address', 'address', formData.address)}
        {renderFieldRow('Language', 'preferredLanguage', formData.preferredLanguage)}
        {renderFieldRow('Nationality', 'nationality', formData.nationality)}
        {renderFieldRow('Emergency Contact Name', 'emergencyContactName', formData.emergencyContactName)}
        {renderFieldRow('Emergency Phone', 'emergencyContactPhone', formData.emergencyContactPhone)}
        {renderFieldRow('Relationship', 'emergencyRelationship', formData.emergencyRelationship)}
        {renderFieldRow('Religion', 'religion', formData.religion)}
      </div>
    </Card>
  );
};
