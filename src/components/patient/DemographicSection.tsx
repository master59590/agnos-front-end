import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { PatientSchemaType } from '@/schemas/patientSchema';
import { Select } from '@/components/ui/Select';
import { LANGUAGE_OPTIONS, NATIONALITY_OPTIONS } from '@/config/constants';
import { Globe } from 'lucide-react';

interface SectionProps {
  register: UseFormRegister<PatientSchemaType>;
  errors: FieldErrors<PatientSchemaType>;
  onFocusField: (fieldName: keyof PatientSchemaType) => void;
}

export const DemographicSection: React.FC<SectionProps> = ({
  register,
  errors,
  onFocusField,
}) => {
  return (
    <div className="space-y-4">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Globe className="w-5 h-5 text-teal-600" /> Language & Nationality / ภาษาและสัญชาติ
        </h3>
        <p className="text-xs text-slate-500">
          เพื่อการประสานงานและจัดหาล่ามประจำโรงพยาบาล
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Preferred Language / ภาษาที่สะดวก"
          required
          options={LANGUAGE_OPTIONS}
          error={errors.preferredLanguage?.message}
          {...register('preferredLanguage')}
          onFocus={() => onFocusField('preferredLanguage')}
        />
        <Select
          label="Nationality / สัญชาติ"
          required
          options={NATIONALITY_OPTIONS}
          error={errors.nationality?.message}
          {...register('nationality')}
          onFocus={() => onFocusField('nationality')}
        />
      </div>
    </div>
  );
};
