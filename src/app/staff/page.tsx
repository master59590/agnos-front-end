'use client';

import React, { useState, useCallback } from 'react';
import { StaffHeader } from '@/components/staff/StaffHeader';
import { LiveSessionMonitor } from '@/components/staff/LiveSessionMonitor';
import { LiveFieldPreviewCard } from '@/components/staff/LiveFieldPreviewCard';
import { PatientTable } from '@/components/staff/PatientTable';
import { PatientDetailModal } from '@/components/staff/PatientDetailModal';
import { QRCodeModal } from '@/components/staff/QRCodeModal';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';
import { RealtimeSyncPayload } from '@/types/realtime';
import { PatientRecord } from '@/types/patient';
import { generatePatientId } from '@/lib/utils';
import { Home, ExternalLink, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function StaffPage() {
  const [sessionsMap, setSessionsMap] = useState<Record<string, RealtimeSyncPayload>>({});
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [submittedRecords, setSubmittedRecords] = useState<PatientRecord[]>([]);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<PatientRecord | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Real-time Event Receiver Callback
  const handleRealtimeUpdate = useCallback((payload: RealtimeSyncPayload) => {
    setSessionsMap((prev) => {
      const updated = { ...prev, [payload.sessionId]: payload };
      return updated;
    });

    // Automatically select the active session if none selected
    setSelectedSessionId((current) => current || payload.sessionId);

    // If payload status is 'submitted', convert to PatientRecord and add to submitted records table
    if (payload.status === 'submitted' && payload.formData.firstName) {
      setSubmittedRecords((prev) => {
        // Prevent duplicate entries
        if (prev.some((r) => r.sessionId === payload.sessionId)) {
          return prev;
        }
        const newRecord: PatientRecord = {
          ...(payload.formData as any),
          id: generatePatientId(),
          sessionId: payload.sessionId,
          submittedAt: payload.updatedAt || new Date().toISOString(),
          status: 'submitted',
        };
        return [newRecord, ...prev];
      });
    }
  }, []);

  // Connect Real-time Sync Engine
  useRealtimeSync(handleRealtimeUpdate);

  const activeSessionsList = Object.values(sessionsMap);
  const activeCount = activeSessionsList.filter((s) => s.status !== 'submitted').length;
  const selectedSessionPayload = selectedSessionId ? sessionsMap[selectedSessionId] || null : null;

  const handleViewRecord = (record: PatientRecord) => {
    setSelectedRecord(record);
    setIsDetailModalOpen(true);
  };

  // Add dummy sample submitted record for rich UI demonstration
  const handleAddSampleRecord = () => {
    const sample: PatientRecord = {
      id: generatePatientId(),
      sessionId: 'SESS-SAMPLE1',
      firstName: 'Somsak',
      lastName: 'Sukjai',
      dob: '1992-05-15',
      gender: 'male',
      phone: '081-987-6543',
      email: 'somsak.s@example.com',
      address: '99/1 Sukhumvit Rd, Khlong Toei, Bangkok 10110',
      preferredLanguage: 'Thai',
      nationality: 'Thai',
      emergencyContactName: 'Somsri Sukjai',
      emergencyContactPhone: '089-123-4567',
      emergencyRelationship: 'Spouse',
      religion: 'Buddhism',
      submittedAt: new Date().toISOString(),
      status: 'submitted',
    };
    setSubmittedRecords((prev) => [sample, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Navbar */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-500">
          <a
            href="/"
            className="flex items-center gap-1 hover:text-teal-600 font-medium transition-colors"
          >
            <Home className="w-4 h-4" /> Home Portal
          </a>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAddSampleRecord}
              className="text-xs text-slate-500 hover:text-teal-600"
            >
              + Add Sample Record
            </Button>
            <a
              href="/patient"
              target="_blank"
              className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400 font-semibold hover:underline"
            >
              <ExternalLink className="w-4 h-4" /> Open Patient Form in New Tab ↗
            </a>
          </div>
        </div>

        {/* Staff Header */}
        <StaffHeader
          onOpenQR={() => setIsQRModalOpen(true)}
          activeCount={activeCount}
          submittedCount={submittedRecords.length}
        />

        {/* Active Live Sessions Monitor */}
        <LiveSessionMonitor
          sessions={activeSessionsList}
          selectedSessionId={selectedSessionId}
          onSelectSession={setSelectedSessionId}
        />

        {/* Real-time Field Inspector */}
        <LiveFieldPreviewCard session={selectedSessionPayload} />

        {/* Historical Submitted Patients Table */}
        <PatientTable
          records={submittedRecords}
          onViewRecord={handleViewRecord}
        />
      </div>

      {/* QR Code Sharing Modal */}
      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        sessionId={selectedSessionId || 'SESS-AGNOS01'}
      />

      {/* Patient Detail Record Modal */}
      <PatientDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        record={selectedRecord}
      />
    </div>
  );
}
