import Link from 'react';
import { ArrowRight, Stethoscope, UserCheck, Activity, Sparkles, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden">
      {/* Background decoration gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />

      <header className="max-w-6xl w-full mx-auto flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-500 rounded-2xl flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-teal-500/20">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-white">Agnos Health</span>
            <span className="text-xs text-teal-400 block font-medium">Real-Time Patient Portal</span>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-900 border border-slate-800 rounded-full text-xs text-slate-400 font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-400" /> Front-End Assignment
        </div>
      </header>

      <section className="max-w-4xl w-full mx-auto my-12 z-10 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4" /> Next.js + Real-Time Sync Engine
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
          Patient Form & Staff View <br />
          <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Real-Time Synchronization System
          </span>
        </h1>

        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          ระบบกรอกประวัติผู้ป่วยล่วงหน้าพร้อมหน้าจอติดตามผลสำหรับเจ้าหน้าที่ทางการแพทย์
          ซิงก์ข้อมูลสดแบบ Real-Time ทันทีขณะพิมพ์ พร้อม Status Indicator (กำลังกรอก, submitted, inactive)
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto pt-6">
          <a
            href="/patient"
            className="group relative bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-teal-500/50 p-6 rounded-3xl transition-all text-left shadow-2xl hover:shadow-teal-500/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-teal-500/10 text-teal-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors">
                1. Patient Form View
              </h3>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                หน้าสำหรับผู้ป่วยกรอกข้อมูลประวัติส่วนตัว, ช่องทางติดต่อ, สัญชาติ, ภาษา และบุคคลติดต่อฉุกเฉิน
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-teal-400 group-hover:translate-x-1 transition-transform">
              Open Patient Form <ArrowRight className="w-4 h-4" />
            </div>
          </a>

          <a
            href="/staff"
            className="group relative bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-teal-500/50 p-6 rounded-3xl transition-all text-left shadow-2xl hover:shadow-teal-500/10 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                2. Staff View Dashboard
              </h3>
              <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                หน้าจอสำหรับเจ้าหน้าที่ เฝ้าดูการพิมพ์ของผู้ป่วยสดๆ แบบเรียลไทม์ พร้อมตัวระบุสถานะและตารางเวชระเบียน
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
              Open Staff Dashboard <ArrowRight className="w-4 h-4" />
            </div>
          </a>
        </div>
      </section>

      <footer className="max-w-6xl w-full mx-auto text-center text-xs text-slate-600 border-t border-slate-900 pt-6 z-10">
        Developed for Agnos Health Front-End Developer Assignment
      </footer>
    </main>
  );
}
