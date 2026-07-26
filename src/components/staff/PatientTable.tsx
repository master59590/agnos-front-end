import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PatientRecord } from '@/types/patient';
import { Search, Filter, Eye, FileText, Phone, Mail, Globe } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface PatientTableProps {
  records: PatientRecord[];
  onViewRecord: (record: PatientRecord) => void;
}

export const PatientTable: React.FC<PatientTableProps> = ({
  records,
  onViewRecord,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [nationalityFilter, setNationalityFilter] = useState('');

  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone.includes(searchTerm) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesNationality =
      !nationalityFilter || r.nationality === nationalityFilter;

    return matchesSearch && matchesNationality;
  });

  const uniqueNationalities = Array.from(
    new Set(records.map((r) => r.nationality))
  ).filter(Boolean);

  return (
    <Card>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
        <div>
          <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-600" /> Submitted Medical Records (เวชระเบียนผู้ป่วยที่ลงทะเบียนแล้ว)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            รายการประวัติผู้ป่วยที่กดยืนยันส่งฟอร์มสมบูรณ์เรียบร้อยแล้ว
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Name, HN, Phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-teal-500 w-48"
            />
          </div>

          <div className="relative">
            <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <select
              value={nationalityFilter}
              onChange={(e) => setNationalityFilter(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-teal-500 appearance-none cursor-pointer"
            >
              <option value="">All Nationalities</option>
              {uniqueNationalities.map((nat) => (
                <option key={nat} value={nat}>
                  {nat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredRecords.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <FileText className="w-10 h-10 mx-auto mb-2 opacity-40" />
          <p className="text-sm font-medium">No submitted patient records found</p>
          <p className="text-xs text-slate-500 mt-1">
            ลองปรับเปลี่ยนคำค้นหา หรือทดลองส่งแบบฟอร์มในฝั่ง Patient Form
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-semibold">
                <th className="py-3 px-4">HN / Patient ID</th>
                <th className="py-3 px-4">Patient Name</th>
                <th className="py-3 px-4">DOB & Gender</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Language / Nationality</th>
                <th className="py-3 px-4">Submitted At</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredRecords.map((r) => (
                <tr
                  key={r.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-teal-600 dark:text-teal-400">
                    {r.id}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                    {r.firstName} {r.middleName || ''} {r.lastName}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    <div>{formatDate(r.dob)}</div>
                    <div className="text-[10px] text-slate-400 capitalize">{r.gender}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 space-y-0.5">
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400" /> {r.phone}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Mail className="w-3 h-3 text-slate-400" /> {r.email}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-1 font-medium">
                      <Globe className="w-3 h-3 text-slate-400" /> {r.nationality}
                    </div>
                    <div className="text-[10px] text-slate-400">{r.preferredLanguage}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono">
                    {new Date(r.submittedAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewRecord(r)}
                      className="gap-1 text-xs"
                    >
                      <Eye className="w-3.5 h-3.5 text-teal-600" /> View Record
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};
