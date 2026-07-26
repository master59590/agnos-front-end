import { PatientFormData } from './patient';

export type PatientFormStatus = 'typing/filling' | 'submitted' | 'inactive';

export interface RealtimeSyncPayload {
  sessionId: string;
  patientName?: string;
  status: PatientFormStatus;
  activeField?: keyof PatientFormData | null;
  formData: Partial<PatientFormData>;
  updatedAt: string; // ISO string
}

export type RealtimeEventCallback = (payload: RealtimeSyncPayload) => void;
