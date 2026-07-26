import React from 'react';
import { Card } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/Badge';
import { RealtimeSyncPayload } from '@/types/realtime';
import { Activity, Clock, Edit3, User } from 'lucide-react';

interface LiveSessionMonitorProps {
  sessions: RealtimeSyncPayload[];
  selectedSessionId: string | null;
  onSelectSession: (sessionId: string) => void;
}

export const LiveSessionMonitor: React.FC<LiveSessionMonitorProps> = ({
  sessions,
  selectedSessionId,
  onSelectSession,
}) => {
  return (
    <Card className="mb-6">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
        <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Activity className="w-5 h-5 text-teal-600 animate-pulse" /> Live Patient Sessions / รายการเซสชันสด
        </h2>
        <span className="text-xs text-slate-400 font-mono">
          {sessions.length} Session(s) Active
        </span>
      </div>

      {sessions.length === 0 ? (
        <div className="text-center py-10 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
          <User className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            No Active Patient Form Session Right Now
          </p>
          <p className="text-xs text-slate-400 mt-1">
            เปิดหน้าต่างใหม่ในสถาปัตยกรรม Patient View หรือให้ผู้ป่วยสแกน QR Code เพื่อเริ่มกรอกข้อมูลแบบสด
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sessions.map((sess) => {
            const isSelected = sess.sessionId === selectedSessionId;
            const patientName =
              sess.formData.firstName || sess.formData.lastName
                ? `${sess.formData.firstName || ''} ${sess.formData.lastName || ''}`.trim()
                : 'Anonymous Patient';

            return (
              <div
                key={sess.sessionId}
                onClick={() => onSelectSession(sess.sessionId)}
                className={`cursor-pointer rounded-2xl p-4 border transition-all ${
                  isSelected
                    ? 'border-teal-500 bg-teal-50/30 dark:bg-teal-950/20 shadow-md ring-2 ring-teal-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                    {sess.sessionId}
                  </span>
                  <StatusBadge status={sess.status} />
                </div>

                <div className="space-y-1 mb-3">
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm truncate">
                    {patientName}
                  </h4>
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Updated: {new Date(sess.updatedAt).toLocaleTimeString()}
                  </div>
                </div>

                {sess.activeField && sess.status === 'typing/filling' && (
                  <div className="text-xs bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 p-2 rounded-xl border border-amber-200/60 dark:border-amber-800/40 flex items-center gap-1.5 font-medium animate-pulse">
                    <Edit3 className="w-3.5 h-3.5" />
                    Patient is editing: <span className="font-bold">{sess.activeField}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};
