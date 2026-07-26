export type Gender = 'male' | 'female' | 'non_binary' | 'prefer_not_to_say';

export interface EmergencyContact {
  name?: string;
  phone?: string;
  relationship?: string;
}

export interface PatientFormData {
  // Personal Info
  firstName: string;
  middleName?: string;
  lastName: string;
  dob: string; // YYYY-MM-DD
  gender: Gender;

  // Contact Info
  phone: string;
  email: string;
  address: string;

  // Demographics
  preferredLanguage: string;
  nationality: string;

  // Optional Info
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyRelationship?: string;
  religion?: string;
}

export interface PatientRecord extends PatientFormData {
  id: string;
  sessionId: string;
  submittedAt: string; // ISO String
  status: 'submitted';
}
