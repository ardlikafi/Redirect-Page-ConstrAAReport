'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { KeyRound, Eye, EyeOff, CheckCircle2, AlertTriangle, Smartphone, ShieldCheck } from 'lucide-react';

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [hasSession, setHasSession] = useState<boolean | null>(null);

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        // Check if there is an active session (user clicked the recovery link and went through callback)
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setHasSession(true);
            } else {
                setHasSession(false);
                setErrorMessage('Sesi tidak ditemukan atau telah kedaluwarsa. Silakan ajukan reset password kembali dari aplikasi mobile.');
            }
        };
        checkSession();
    }, [supabase]);

    // Password validation criteria
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigits = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const passwordsMatch = password === confirmPassword && password.length > 0;

    const isPasswordValid = hasMinLength && hasUppercase && hasLowercase && hasDigits && hasSpecialChar;
    const canSubmit = isPasswordValid && passwordsMatch && !isLoading;

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;

        setIsLoading(true);
        setErrorMessage('');

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) {
                throw error;
            }

            // Sign out to clean up session and force logging in again in the app
            await supabase.auth.signOut();
            setIsSuccess(true);
        } catch (error: any) {
            setErrorMessage(error.message || 'Gagal mengubah kata sandi. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenApp = () => {
        window.location.href = 'constraareports://login';
        setTimeout(() => {
            alert("Jika aplikasi tidak terbuka secara otomatis, silakan buka aplikasi ConstrAAReports di HP Anda secara manual.");
        }, 2500);
    };

    const renderRequirement = (text: string, isMet: boolean) => (
        <div className="flex items-center gap-2 text-xs transition-colors duration-200">
            <span className={`h-1.5 w-1.5 rounded-full ${isMet ? 'bg-emerald-500' : 'bg-slate-300'}`} />
            <span className={isMet ? 'text-emerald-600 font-medium' : 'text-slate-400'}>
                {text}
            </span>
        </div>
    );

    if (hasSession === null) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-900 text-slate-100 p-4">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
            </main>
        );
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-900 text-slate-100 p-4 relative overflow-hidden">
            {/* Background Architecture Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

            <div className="w-full max-w-md rounded-2xl bg-slate-800/80 backdrop-blur-md p-8 shadow-2xl border border-slate-700/50 relative z-10">
                <div className="text-center mb-6">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-lg shadow-amber-500/5">
                        <KeyRound className="h-7 w-7 animate-pulse" />
                    </div>
                    <span className="text-xs font-black tracking-widest text-amber-500 uppercase">
                        ConstrAA<span className="text-white">Reports</span>
                    </span>
                    <h1 className="mt-2 text-2xl font-bold tracking-tight text-white">
                        {isSuccess ? 'Password Berhasil Diubah!' : 'Buat Password Baru'}
                    </h1>
                    <p className="mt-2 text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                        {isSuccess 
                            ? 'Akun Anda sudah diperbarui dengan kata sandi baru.' 
                            : 'Silakan masukkan kata sandi baru Anda yang aman untuk melanjutkan.'}
                    </p>
                </div>

                {errorMessage && (
                    <div className="mb-6 rounded-xl bg-red-950/50 border border-red-500/30 p-4 flex gap-3 items-start animate-in fade-in duration-200">
                        <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-red-300 leading-relaxed">{errorMessage}</p>
                    </div>
                )}

                {isSuccess ? (
                    <div className="space-y-6 animate-in zoom-in-95 duration-300">
                        <div className="rounded-xl bg-emerald-950/30 border border-emerald-500/20 p-5 text-center">
                            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                                <CheckCircle2 className="h-8 w-8" />
                            </div>
                            <h3 className="text-sm font-semibold text-emerald-200">Selesai!</h3>
                            <p className="text-xs text-emerald-400/80 mt-1 leading-relaxed">
                                Password baru Anda sudah aktif. Anda dapat menggunakannya langsung untuk masuk ke aplikasi.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={handleOpenApp}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/10 hover:bg-amber-400 hover:shadow-amber-500/20 active:scale-95 transition-all duration-200"
                            >
                                <Smartphone className="h-4 w-4" />
                                Buka Aplikasi HP
                            </button>

                            <p className="text-[10px] text-center text-slate-500">
                                Atau Anda dapat langsung membuka kembali aplikasi ConstrAAReports yang ada di HP Anda secara manual.
                            </p>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleResetPassword} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-300">Password Baru</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    disabled={!hasSession || isLoading}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Masukkan password baru"
                                    className="w-full bg-slate-900/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/40 transition-all duration-200 disabled:opacity-50"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-300">Konfirmasi Password Baru</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    disabled={!hasSession || isLoading}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Konfirmasi password baru"
                                    className="w-full bg-slate-900/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/40 transition-all duration-200 disabled:opacity-50"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        {password.length > 0 && (
                            <div className="rounded-xl bg-slate-900/40 border border-slate-700/40 p-4 space-y-2.5 animate-in slide-in-from-top-2 duration-200">
                                <p className="text-[11px] font-bold text-slate-400">Kriteria Keamanan Password:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                                    {renderRequirement('Minimal 8 karakter', hasMinLength)}
                                    {renderRequirement('Kombinasi Huruf A-Z', hasUppercase && hasLowercase)}
                                    {renderRequirement('Mengandung Angka (0-9)', hasDigits)}
                                    {renderRequirement('Mengandung Simbol khusus', hasSpecialChar)}
                                </div>
                                <div className="border-t border-slate-800 pt-2 mt-2">
                                    {renderRequirement('Kesesuaian konfirmasi password', passwordsMatch)}
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={!canSubmit}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/10 hover:bg-amber-400 hover:shadow-amber-500/20 active:scale-95 disabled:opacity-40 disabled:hover:bg-amber-500 disabled:hover:shadow-none disabled:active:scale-100 transition-all duration-200"
                        >
                            {isLoading ? (
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                            ) : (
                                <>
                                    <ShieldCheck className="h-4 w-4" />
                                    Ubah Kata Sandi
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </main>
    );
}
