"use client";

import { useState, useEffect } from "react";
import { Header } from "@/src/components/header";
import { Footer } from "@/src/components/footer";
import { User, Lock, Eye, EyeOff, Loader2, ArrowRight, ShieldCheck, Mail } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Card, CardContent } from "@/src/components/ui/card";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useAuth } from "@/src/context/AuthContext";
import authService from "@/src/services/auth.service";

export default function LoginPage() {
    const t = useTranslations("auth.login");
    const locale = useLocale();
    const router = useRouter();
    const { login: authContextLogin, isAuthenticated } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Check if user is already logged in
    useEffect(() => {
        if (isAuthenticated) {
            router.push(`/${locale}/my-bookings`);
        }
    }, [isAuthenticated, locale, router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simple validation
        if (!email || !password) {
            toast.error("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        try {
            const response = await authService.login({ email, password });

            // Store tokens and update context
            authContextLogin(response.access, response.refresh, { email });

            toast.success("Welcome back!");
            router.push(`/${locale}/my-bookings`);
        } catch (error: any) {
            console.error("Login error:", error);
            const errorMessage = error.response?.data?.detail || "Login failed. Please check your credentials.";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fbfbf9] flex flex-col font-plus-jakarta">
            <Header />

            <main className="flex-grow flex items-center justify-center px-4 py-20 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#dcfae7]/30 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#dcfae7]/20 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-[480px] relative z-10"
                >
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 bg-[#dcfae7] px-4 py-2 rounded-full mb-6">
                            <ShieldCheck size={16} className="text-[#007654]" />
                            <span className="text-[10px] font-black tracking-widest text-[#007654]">Secure access</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-4 tracking-tight">
                            {t("title")}
                        </h1>
                        <p className="text-gray-500 font-medium">
                            {t("subtitle")}
                        </p>
                    </div>

                    <Card className="border border-[#f0f0f0] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] rounded-[32px] overflow-hidden bg-white/80 backdrop-blur-xl">
                        <CardContent className="p-8 md:p-12">
                            <form onSubmit={handleLogin} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black tracking-widest text-gray-400 ml-1">{t("email")}</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#007654] transition-colors" />
                                        <Input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="hello@example.com"
                                            className="pl-12 h-16 border-gray-100 rounded-2xl bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-[#007654]/5 transition-all outline-none"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center ml-1">
                                        <label className="text-[11px] font-black tracking-widest text-gray-400">{t("password")}</label>
                                        <Link href={`/${locale}/contact`} className="text-[11px] font-bold text-[#007654] hover:underline tracking-wider">
                                            {t("forgot_password")}
                                        </Link>
                                    </div>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#007654] transition-colors" />
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="pl-12 h-16 border-gray-100 rounded-2xl bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-[#007654]/5 transition-all outline-none"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-[#007654] hover:bg-[#008c64] text-white h-16 rounded-2xl text-lg font-bold transition-all duration-300 shadow-xl shadow-[#007654]/20 hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center gap-3">
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            <span>{t("loading")}</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            {t("submit")}
                                            <ArrowRight size={20} className="ml-1" />
                                        </div>
                                    )}
                                </Button>
                            </form>

                            <div className="mt-12 text-center">
                                <p className="text-gray-500 font-medium text-sm">
                                    {t("no_account")}{" "}
                                    <Link href={`/${locale}/signup`} className="text-[#007654] font-black hover:underline ml-1">
                                        {t("signup_link")}
                                    </Link>
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mt-8 text-center flex items-center justify-center gap-8 grayscale opacity-40">
                        {/* Mock Social Trust logos could go here */}
                        <span className="text-[10px] font-black tracking-[0.2em] text-gray-400">Trusted by 5K+ travelers</span>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
