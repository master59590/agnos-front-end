import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { PatientSchemaType } from '@/schemas/patientSchema';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { RELIGION_OPTIONS } from '@/config/constants';
import { HeartHandshake, PhoneCall } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

interface SectionProps {
  register: UseFormRegister<PatientSchemaType>;
  errors: FieldErrors<PatientSchemaType>;
  onFocusField: (fieldName: keyof PatientSchemaType) => void;
  setValue: (name: keyof PatientSchemaType, value: any) => void;
}

export const AdditionalInfoSection: React.FC<SectionProps> = ({
  register,
  errors,
  onFocusField,
  setValue,
}) => {
  return (
    <div className="space-y-4">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-teal-600" /> Optional Information / ข้อมูลเพิ่มเติม (ไม่บังคับ)
        </h3>
        <p className="text-xs text-slate-500">
          บุคคลติดต่อฉุกเฉินและข้อกำหนดทางศาสนา (ถ้ามี)
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="Emergency Contact Name / ชื่อผู้ติดต่อฉุกเฉิน"
          placeholder="e.g. Somsri (Mother)"
          error={errors.emergencyContactName?.message}
          {...register('emergencyContactName')}
          onFocus={() => onFocusField('emergencyContactName')}
        />
        <Input
          label="Emergency Contact Phone / เบอร์โทรฉุกเฉิน"
          placeholder="089-999-9999"
          icon={<PhoneCall className="w-4 h-4 text-slate-400" />}
          error={errors.emergencyContactPhone?.message}
          {...register('emergencyContactPhone', {
            onChange: (e) => {
              const formatted = formatPhoneNumber(e.target.value);
              setValue('emergencyContactPhone', formatted);
            },
          })}
          onFocus={() => onFocusField('emergencyContactPhone')}
        />
        <Input
          label="Relationship / ความสัมพันธ์"
          placeholder="e.g. Parent, Spouse"
          error={errors.emergencyRelationship?.message}
          {...register('emergencyRelationship')}
          onFocus={() => onFocusField('emergencyRelationship')}
        />
      </div>

      <div className="pt-2">
        <Select
          label="Religion / ศาสนา (Optional)"
          options={RELIGION_OPTIONS}
          error={errors.religion?.message}
          {...register('religion')}
          onFocus={() => onFocusField('religion')}
        />
      </div>
    </div>
  );
};
