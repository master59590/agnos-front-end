import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { PatientRecord } from '@/types/patient';
import { Printer, Phone, HeartHandshake, ShieldCheck, Activity } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface PatientDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: PatientRecord | null;
}

export const PatientDetailModal: React.FC<PatientDetailModalProps> = ({
  isOpen,
  onClose,
  record,
}) => {
  if (!record) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* 1. Modal View (Shown on screen) */}
      <Modal isOpen={isOpen} onClose={onClose} title={`Medical Record - ${record.id}`}>
        <div className="space-y-6 text-slate-800 dark:text-slate-200">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center font-bold text-xl">
                {record.firstName.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  {record.firstName} {record.middleName || ''} {record.lastName}
                </h2>
                <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
                  <span>HN: {record.id}</span> • <span>Session: {record.sessionId}</span>
                </div>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold rounded-full">
              Submitted / ลงทะเบียนแล้ว
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-slate-400">Date of Birth:</span>
              <div className="font-semibold text-sm">{formatDate(record.dob)}</div>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400">Gender:</span>
              <div className="font-semibold text-sm capitalize">{record.gender}</div>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400">Preferred Language:</span>
              <div className="font-semibold text-sm">{record.preferredLanguage}</div>
            </div>
            <div className="space-y-1">
              <span className="text-slate-400">Nationality:</span>
              <div className="font-semibold text-sm">{record.nationality}</div>
            </div>
          </div>

          <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-4 text-xs">
            <h4 className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-teal-600" /> Contact & Address
            </h4>
            <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl space-y-1.5">
              <div><span className="text-slate-400">Phone:</span> <span className="font-semibold">{record.phone}</span></div>
              <div><span className="text-slate-400">Email:</span> <span className="font-semibold">{record.email}</span></div>
              <div><span className="text-slate-400">Address:</span> <span className="font-semibold">{record.address}</span></div>
            </div>
          </div>

          {(record.emergencyContactName || record.religion) && (
            <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-4 text-xs">
              <h4 className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-teal-600" /> Additional Details
              </h4>
              <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl space-y-1.5">
                {record.emergencyContactName && (
                  <div>
                    <span className="text-slate-400">Emergency Contact:</span>{' '}
                    <span className="font-semibold">{record.emergencyContactName}</span>{' '}
                    {record.emergencyContactPhone && `(${record.emergencyContactPhone})`}{' '}
                    {record.emergencyRelationship && `- ${record.emergencyRelationship}`}
                  </div>
                )}
                {record.religion && (
                  <div><span className="text-slate-400">Religion:</span> <span className="font-semibold">{record.religion}</span></div>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2 no-print">
            <Button variant="outline" className="w-full gap-2" onClick={handlePrint}>
              <Printer className="w-4 h-4" /> Print Record / พิมพ์เอกสาร
            </Button>
            <Button variant="primary" className="w-full" onClick={onClose}>
              Close / ปิดหน้าต่าง
            </Button>
          </div>
        </div>
      </Modal>

      {/* 2. Dedicated Official A4 Document Sheet (Hidden on screen, Visible ONLY when Printing) */}
      <div id="printable-medical-record" className="hidden print:block p-8 font-sans bg-white text-black leading-relaxed">
        {/* Document Header */}
        <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight">Agnos Health Medical Center</h1>
            <p className="text-sm font-semibold text-gray-700">Official Patient Medical Registration Form / เวชระเบียนผู้ป่วยใหม่</p>
            <p className="text-xs text-gray-500">Document No: {record.id} | Session: {record.sessionId}</p>
          </div>
          <div className="text-right">
            <span className="inline-block border-2 border-black px-3 py-1 text-xs font-bold uppercase rounded">
              Status: Verified / Registration Completed
            </span>
            <p className="text-xs text-gray-500 mt-1">Printed Date: {new Date().toLocaleDateString('en-GB')}</p>
          </div>
        </div>

        {/* Section 1: Patient Basic Profile */}
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase bg-gray-100 p-2 border-l-4 border-black mb-3">
            1. Personal Details / ข้อมูลส่วนตัวผู้ป่วย
          </h2>
          <table className="w-full text-xs border-collapse border border-gray-300">
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="p-2.5 font-bold bg-gray-50 border-r border-gray-300 w-1/4">Full Name (ชื่อ-นามสกุล):</td>
                <td className="p-2.5 font-semibold text-sm w-3/4">{record.firstName} {record.middleName || ''} {record.lastName}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-2.5 font-bold bg-gray-50 border-r border-gray-300">HN / Patient ID:</td>
                <td className="p-2.5 font-mono font-bold text-sm">{record.id}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-2.5 font-bold bg-gray-50 border-r border-gray-300">Date of Birth (วันเกิด):</td>
                <td className="p-2.5">{formatDate(record.dob)}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-2.5 font-bold bg-gray-50 border-r border-gray-300">Gender (เพศ):</td>
                <td className="p-2.5 capitalize">{record.gender}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-2.5 font-bold bg-gray-50 border-r border-gray-300">Language / Nationality:</td>
                <td className="p-2.5">{record.preferredLanguage} / {record.nationality}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 2: Contact & Address */}
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase bg-gray-100 p-2 border-l-4 border-black mb-3">
            2. Contact & Location / ข้อมูลการติดต่อและที่อยู่
          </h2>
          <table className="w-full text-xs border-collapse border border-gray-300">
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="p-2.5 font-bold bg-gray-50 border-r border-gray-300 w-1/4">Phone Number:</td>
                <td className="p-2.5 font-semibold">{record.phone}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-2.5 font-bold bg-gray-50 border-r border-gray-300">Email Address:</td>
                <td className="p-2.5">{record.email}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-2.5 font-bold bg-gray-50 border-r border-gray-300">Residential Address:</td>
                <td className="p-2.5">{record.address}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 3: Additional Details */}
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase bg-gray-100 p-2 border-l-4 border-black mb-3">
            3. Additional Information / ข้อมูลเพิ่มเติม
          </h2>
          <table className="w-full text-xs border-collapse border border-gray-300">
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="p-2.5 font-bold bg-gray-50 border-r border-gray-300 w-1/4">Emergency Contact:</td>
                <td className="p-2.5">
                  {record.emergencyContactName || 'N/A'}{' '}
                  {record.emergencyContactPhone && `(${record.emergencyContactPhone})`}{' '}
                  {record.emergencyRelationship && `- ${record.emergencyRelationship}`}
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-2.5 font-bold bg-gray-50 border-r border-gray-300">Religion:</td>
                <td className="p-2.5">{record.religion || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Official Signatures Line */}
        <div className="mt-16 pt-8 border-t border-gray-300 grid grid-cols-2 gap-12 text-xs text-center">
          <div>
            <div className="border-b border-black mb-2 pb-8"></div>
            <p className="font-bold">Patient Signature (ลายเซ็นผู้ป่วย)</p>
            <p className="text-gray-500 text-[10px]">Date: ____ / ____ / ________</p>
          </div>
          <div>
            <div className="border-b border-black mb-2 pb-8"></div>
            <p className="font-bold">Medical Officer Signature (ลายเซ็นเจ้าหน้าที่)</p>
            <p className="text-gray-500 text-[10px]">Date: ____ / ____ / ________</p>
          </div>
        </div>
      </div>
    </>
  );
};
