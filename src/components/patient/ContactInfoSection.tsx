import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { PatientSchemaType } from '@/schemas/patientSchema';
import { Input } from '@/components/ui/Input';
import { Phone, Mail, MapPin } from 'lucide-react';
import { formatPhoneNumber } from '@/lib/utils';

interface SectionProps {
  register: UseFormRegister<PatientSchemaType>;
  errors: FieldErrors<PatientSchemaType>;
  onFocusField: (fieldName: keyof PatientSchemaType) => void;
  setValue: (name: keyof PatientSchemaType, value: any) => void;
}

export const ContactInfoSection: React.FC<SectionProps> = ({
  register,
  errors,
  onFocusField,
  setValue,
}) => {
  return (
    <div className="space-y-4">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Phone className="w-5 h-5 text-teal-600" /> Contact & Address / ช่องทางติดต่อและที่อยู่
        </h3>
        <p className="text-xs text-slate-500">
          สำหรับจัดส่งเอกสารและติดต่อกรณีผลการตรวจ
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Phone Number / เบอร์โทรศัพท์"
          required
          placeholder="081-234-5678"
          icon={<Phone className="w-4 h-4 text-slate-400" />}
          error={errors.phone?.message}
          {...register('phone', {
            onChange: (e) => {
              const formatted = formatPhoneNumber(e.target.value);
              setValue('phone', formatted);
            },
          })}
          onFocus={() => onFocusField('phone')}
        />
        <Input
          type="email"
          label="Email Address / อีเมล"
          required
          placeholder="patient@example.com"
          icon={<Mail className="w-4 h-4 text-slate-400" />}
          error={errors.email?.message}
          {...register('email')}
          onFocus={() => onFocusField('email')}
        />
      </div>

      <div className="pt-2">
        <Input
          label="Address / ที่อยู่ปัจจุบัน"
          required
          placeholder="House No., Building, Street, Sub-district, District, Province, Postal Code"
          icon={<MapPin className="w-4 h-4 text-slate-400" />}
          error={errors.address?.message}
          {...register('address')}
          onFocus={() => onFocusField('address')}
        />
      </div>
    </div>
  );
};
