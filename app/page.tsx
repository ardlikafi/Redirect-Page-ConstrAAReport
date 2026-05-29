import { HardHat, AlertTriangle, Smartphone, ShieldCheck, ClipboardList, BarChart3 } from 'lucide-react';

interface PageProps {
    searchParams: { error?: string };
}

export default function HomePage({ searchParams }: PageProps) {
    const isAuthFailed = searchParams.error === 'auth-failed';

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between relative overflow-hidden">

            {/* Ornamen Latar Belakang (Grid Arsitektur/Sipil) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

            {/* Bagian Atas / Header */}
            <header className="container mx-auto px-6 py-6 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                    <div className="bg-amber-500 text-slate-950 p-2 rounded-lg shadow-lg shadow-amber-500/20">
                        <HardHat className="h-6 w-6" />
                    </div>
                    <span className="text-xl font-black tracking-wider text-white uppercase">
                        ConstrAA<span className="text-amber-500">Reports</span>
                    </span>
                </div>
            </header>

            {/* Konten Utama */}
            <main className="container mx-auto px-6 py-12 flex flex-col items-center justify-center flex-grow relative z-10 text-center">

                {/* Banner Notifikasi Error jika autentikasi gagal */}
                {isAuthFailed && (
                    <div className="mb-8 max-w-md w-full rounded-xl bg-red-950/50 border border-red-500/30 p-4 text-left flex gap-3 items-start animate-in fade-in slide-in-from-top-4 duration-300">
                        <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-sm font-semibold text-red-200">Verifikasi Gagal</h3>
                            <p className="text-xs text-red-400 mt-1">
                                Tautan konfirmasi email Anda kemungkinan sudah kedaluwarsa atau tidak valid. Silakan coba kirim ulang email konfirmasi melalui aplikasi mobile Anda.
                            </p>
                        </div>
                    </div>
                )}

                {/* Hero Section */}
                <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                        Sistem Manajemen & Pencatatan Proyek Konstruksi Sipil
                    </h1>
                    <p className="mt-4 text-base md:text-lg text-slate-400 max-w-lg mx-auto">
                        Aplikasi pencatatan proyek terstruktur yang dirancang khusus untuk mahasiswa teknik sipil, kontraktor, dan praktisi lapangan.
                    </p>
                </div>

                {/* Tampilan Fitur Utama (Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl w-full">
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-left hover:border-slate-600/50 transition-colors">
                        <div className="bg-blue-500/10 text-blue-400 p-2 rounded-lg w-fit mb-4">
                            <ClipboardList className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold text-white">Laporan Harian</h3>
                        <p className="text-xs text-slate-400 mt-2">Catat progres pekerjaan, cuaca, kendala lapangan, hingga bahan material secara berkala.</p>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-left hover:border-slate-600/50 transition-colors">
                        <div className="bg-amber-500/10 text-amber-400 p-2 rounded-lg w-fit mb-4">
                            <BarChart3 className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold text-white">Analisis Kurva-S</h3>
                        <p className="text-xs text-slate-400 mt-2">Pantau deviasi progres rencana dibandingkan realisasi lapangan dengan grafik visual.</p>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-left hover:border-slate-600/50 transition-colors">
                        <div className="bg-emerald-500/10 text-emerald-400 p-2 rounded-lg w-fit mb-4">
                            <ShieldCheck className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold text-white">Data Tersimpan Aman</h3>
                        <p className="text-xs text-slate-400 mt-2">Seluruh dokumentasi dan arsip laporan proyek Anda tersimpan dengan aman di database awan.</p>
                    </div>
                </div>

                {/* Tombol Aksi */}
                <div className="mt-12">
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 border border-slate-700 text-xs text-slate-300">
                        <Smartphone className="h-4 w-4 text-amber-500" />
                        Gunakan aplikasi mobile untuk akses penuh
                    </div>
                </div>

            </main>

            {/* Bagian Bawah / Footer */}
            <footer className="container mx-auto px-6 py-6 text-center text-xs text-slate-500 border-t border-slate-800 relative z-10">
                &copy; {new Date().getFullYear()} ConstrAAReports. All rights reserved.
            </footer>
        </div>
    );
}