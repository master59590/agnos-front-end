import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { PatientSchemaType } from '@/schemas/patientSchema';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { GENDER_OPTIONS } from '@/config/constants';
import { User, Calendar } from 'lucide-react';

interface SectionProps {
  register: UseFormRegister<PatientSchemaType>;
  errors: FieldErrors<PatientSchemaType>;
  onFocusField: (fieldName: keyof PatientSchemaType) => void;
}

export const PersonalInfoSection: React.FC<SectionProps> = ({
  register,
  errors,
  onFocusField,
}) => {
  return (
    <div className="space-y-4">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <User className="w-5 h-5 text-teal-600" /> Personal Details / ข้อมูลส่วนตัว
        </h3>
        <p className="text-xs text-slate-500">
          กรุณากรอกข้อมูลตามบัตรประชาชนหรือหนังสือเดินทาง
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="First Name / ชื่อจริง"
          required
          placeholder="e.g. Somchai"
          error={errors.firstName?.message}
          {...register('firstName')}
          onFocus={() => onFocusField('firstName')}
        />
        <Input
          label="Middle Name / ชื่อกลาง"
          placeholder="Optional"
          error={errors.middleName?.message}
          {...register('middleName')}
          onFocus={() => onFocusField('middleName')}
        />
        <Input
          label="Last Name / นามสกุล"
          required
          placeholder="e.g. Deejaikub"
          error={errors.lastName?.message}
          {...register('lastName')}
          onFocus={() => onFocusField('lastName')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <Input
          type="date"
          label="Date of Birth / วันเกิด"
          required
          icon={<Calendar className="w-4 h-4 text-slate-400" />}
          error={errors.dob?.message}
          {...register('dob')}
          onFocus={() => onFocusField('dob')}
        />
        <Select
          label="Gender / เพศ"
          required
          options={GENDER_OPTIONS}
          error={errors.gender?.message}
          {...register('gender')}
          onFocus={() => onFocusField('gender')}
        />
      </div>
    </div>
  );
};
