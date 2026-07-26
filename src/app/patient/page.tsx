'use client';

import React, { useState, useEffect, useTransition, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { patientSchema, PatientSchemaType } from '@/schemas/patientSchema';
import { PatientFormHeader } from '@/components/patient/PatientFormHeader';
import { FormProgressBar } from '@/components/patient/FormProgressBar';
import { PersonalInfoSection } from '@/components/patient/PersonalInfoSection';
import { ContactInfoSection } from '@/components/patient/ContactInfoSection';
import { DemographicSection } from '@/components/patient/DemographicSection';
import { AdditionalInfoSection } from '@/components/patient/AdditionalInfoSection';
import { SuccessModal } from '@/components/patient/SuccessModal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';
import { useInactivityTimer } from '@/hooks/useInactivityTimer';
import { generateSessionId, generatePatientId } from '@/lib/utils';
import { PatientFormStatus } from '@/types/realtime';
import { PatientRecord } from '@/types/patient';
import { Send, RotateCcw, Home, Stethoscope } from 'lucide-react';

function PatientFormContent() {
  const searchParams = useSearchParams();
  const [sessionId, setSessionId] = useState<string>('');
  const [activeField, setActiveField] = useState<keyof PatientSchemaType | null>(null);
  const [formStatus, setFormStatus] = useState<PatientFormStatus>('typing/filling');
  const [submittedRecord, setSubmittedRecord] = useState<PatientRecord | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const { syncState } = useRealtimeSync();

  // Initialize Session ID
  useEffect(() => {
    const querySession = searchParams.get('sessionId');
    if (querySession) {
      setSessionId(querySession);
    } else {
      setSessionId(generateSessionId());
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PatientSchemaType>({
    resolver: zodResolver(patientSchema),
    mode: 'onChange',
  });

  const formData = watch();

  // Broadcast function to sync with Staff View
  const broadcastCurrentState = (
    statusOverride?: PatientFormStatus,
    fieldOverride?: keyof PatientSchemaType | null
  ) => {
    if (!sessionId) return;
    const statusToSync = statusOverride || formStatus;
    const activeFieldToSync = fieldOverride !== undefined ? fieldOverride : activeField;

    const patientName = `${formData.firstName || ''} ${formData.lastName || ''}`.trim();

    syncState({
      sessionId,
      patientName,
      status: statusToSync,
      activeField: activeFieldToSync as any,
      formData,
      updatedAt: new Date().toISOString(),
    });
  };

  // Inactivity Timer hook (30s)
  useInactivityTimer({
    enabled: formStatus !== 'submitted' && !!sessionId,
    timeoutMs: 30000,
    onInactive: () => {
      setFormStatus('inactive');
      broadcastCurrentState('inactive', null);
    },
    onActive: () => {
      if (formStatus === 'inactive') {
        setFormStatus('typing/filling');
        broadcastCurrentState('typing/filling', activeField);
      }
    },
  });

  // Broadcast when form data changes while typing
  useEffect(() => {
    if (sessionId && formStatus !== 'submitted') {
      broadcastCurrentState('typing/filling');
    }
  }, [JSON.stringify(formData)]);

  const handleFocusField = (field: keyof PatientSchemaType) => {
    setActiveField(field);
    setFormStatus('typing/filling');
    broadcastCurrentState('typing/filling', field);
  };

  const onSubmit = (data: PatientSchemaType) => {
    const newRecord: PatientRecord = {
      ...data,
      id: generatePatientId(),
      sessionId,
      submittedAt: new Date().toISOString(),
      status: 'submitted',
    };

    setFormStatus('submitted');
    setActiveField(null);
    setSubmittedRecord(newRecord);
    setIsSuccessOpen(true);

    // Broadcast final submitted state to Staff View
    syncState({
      sessionId,
      patientName: `${data.firstName} ${data.lastName}`,
      status: 'submitted',
      activeField: null,
      formData: data,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleReset = () => {
    reset();
    const newSess = generateSessionId();
    setSessionId(newSess);
    setFormStatus('typing/filling');
    setActiveField(null);
    setIsSuccessOpen(false);
    setSubmittedRecord(null);
  };

  // Calculate completion percentage based on filled fields
  const requiredKeys: (keyof PatientSchemaType)[] = [
    'firstName',
    'lastName',
    'dob',
    'gender',
    'phone',
    'email',
    'address',
    'preferredLanguage',
    'nationality',
  ];
  const filledRequiredCount = requiredKeys.filter(
    (key) => !!formData[key] && !errors[key]
  ).length;
  const progressPercentage = (filledRequiredCount / requiredKeys.length) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Navigation Bar */}
      <div className="flex items-center justify-between mb-6 text-xs text-slate-500">
        <a
          href="/"
          className="flex items-center gap-1 hover:text-teal-600 font-medium transition-colors"
        >
          <Home className="w-4 h-4" /> Home Portal
        </a>
        <a
          href="/staff"
          target="_blank"
          className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400 font-semibold hover:underline"
        >
          <Stethoscope className="w-4 h-4" /> Open Staff View in New Tab ↗
        </a>
      </div>

      {/* Header */}
      <PatientFormHeader sessionId={sessionId} />

      {/* Progress Bar */}
      <FormProgressBar progressPercentage={progressPercentage} />

      {/* Form Container */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card className="space-y-8 shadow-md">
          <PersonalInfoSection
            register={register}
            errors={errors}
            onFocusField={handleFocusField}
          />

          <ContactInfoSection
            register={register}
            errors={errors}
            onFocusField={handleFocusField}
            setValue={setValue}
          />

          <DemographicSection
            register={register}
            errors={errors}
            onFocusField={handleFocusField}
          />

          <AdditionalInfoSection
            register={register}
            errors={errors}
            onFocusField={handleFocusField}
            setValue={setValue}
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800 pt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={handleReset}
              className="w-full sm:w-auto text-slate-500 gap-1.5"
            >
              <RotateCcw className="w-4 h-4" /> Reset Form
            </Button>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto min-w-[200px]"
            >
              <Send className="w-5 h-5" /> Submit Patient Form
            </Button>
          </div>
        </Card>
      </form>

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        record={submittedRecord}
        onReset={handleReset}
      />
    </div>
  );
}

export default function PatientPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="text-center py-12 text-slate-500">Loading Patient Form...</div>}>
        <PatientFormContent />
      </Suspense>
    </div>
  );
}
