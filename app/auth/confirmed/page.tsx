'use client';

import { CheckCircle2, Smartphone } from 'lucide-react';

export default function ConfirmedPage() {
    const handleOpenApp = () => {
        // Skema URL Deep Link aplikasi Flutter Anda (ganti sesuai konfigurasi di Flutter)
        // Misalnya: constraareports://login
        window.location.href = 'constraareports://login';

        // Fallback jika aplikasi tidak terinstal, beri waktu beberapa detik lalu beri tahu user
        setTimeout(() => {
            alert("Jika aplikasi tidak terbuka, pastikan aplikasi ConstrAAReports sudah terinstal di HP Anda.");
        }, 2500);
    };

    return (
        <main className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl text-center border border-gray-100">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                    <CheckCircle2 className="h-10 w-10" />
                </div>

                <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                    ConstrAAReports
                </span>

                <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
                    Email Berhasil Dikonfirmasi!
                </h1>

                <p className="mt-3 text-sm leading-relaxed text-gray-500">
                    Akun Anda telah aktif dan siap digunakan untuk pencatatan laporan proyek teknik sipil.
                </p>

                <div className="mt-8 space-y-3">
                    <button
                        onClick={handleOpenApp}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-all duration-200"
                    >
                        <Smartphone className="h-4 w-4" />
                        Buka Aplikasi HP
                    </button>

                    <p className="text-xs text-gray-400">
                        Atau Anda dapat langsung membuka kembali aplikasi ConstrAAReports yang ada di HP Anda secara manual.
                    </p>
                </div>
            </div>
        </main>
    );
}