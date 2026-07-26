'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, QrCode, ExternalLink } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  sessionId,
}) => {
  const [patientUrl, setPatientUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/patient?sessionId=${sessionId}`;
      setPatientUrl(url);
    }
  }, [sessionId]);

  const handleCopy = () => {
    if (patientUrl) {
      navigator.clipboard.writeText(patientUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Patient Registration QR Code">
      <div className="text-center py-2 space-y-4">
        <p className="text-xs text-slate-500">
          ให้ผู้ป่วยสแกน QR Code นี้เพื่อเปิดแบบฟอร์มบนสมาร์ทโฟน (Real-Time Synchronized)
        </p>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 inline-block shadow-inner">
          {patientUrl && <QRCodeSVG value={patientUrl} size={200} level="H" />}
        </div>

        <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl flex items-center justify-between text-xs gap-2">
          <span className="font-mono truncate text-slate-600 dark:text-slate-300">
            {patientUrl}
          </span>
          <Button variant="ghost" size="sm" onClick={handleCopy} className="shrink-0 gap-1">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </div>

        <div className="flex gap-3 pt-2">
          <a
            href={patientUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button variant="outline" className="w-full gap-2">
              <ExternalLink className="w-4 h-4" /> Open in New Tab
            </Button>
          </a>
          <Button variant="primary" className="w-full" onClick={onClose}>
            Done / เสร็จสิ้น
          </Button>
        </div>
      </div>
    </Modal>
  );
};
