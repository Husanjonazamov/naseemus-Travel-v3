"use client";

import { useState } from "react";
import { X, Mail, User, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

interface SubscribeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Mock subscription
        setTimeout(() => {
            setIsLoading(false);
            setIsSubscribed(true);
            setTimeout(() => {
                onClose();
                setIsSubscribed(false);
            }, 2000);
        }, 1500);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md border-none p-0 rounded-2xl overflow-hidden bg-white shadow-2xl">
                <div className="bg-[#007654] p-8 text-center text-white relative">
                    <div className="mx-auto bg-white/20 p-4 rounded-full w-fit mb-4">
                        <Mail className="w-8 h-8" />
                    </div>
                    <DialogTitle className="text-2xl font-bold mb-2">Join Our Newsletter</DialogTitle>
                    <DialogDescription className="text-white/80">
                        Subscribe to get exclusive travel deals and updates.
                    </DialogDescription>
                </div>

                <div className="p-8">
                    <AnimatePresence mode="wait">
                        {!isSubscribed ? (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <Input
                                        placeholder="Full Name"
                                        className="pl-10 py-6 border-gray-200 rounded-xl focus:ring-[#007654] focus:border-[#007654]"
                                        required
                                    />
                                </div>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <Input
                                        type="email"
                                        placeholder="Email Address"
                                        className="pl-10 py-6 border-gray-200 rounded-xl focus:ring-[#007654] focus:border-[#007654]"
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-[#007654] hover:bg-[#005c42] text-white py-6 rounded-xl text-lg font-bold transition-all duration-300 shadow-lg"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Subscribing...
                                        </>
                                    ) : (
                                        "Subscribe Now"
                                    )}
                                </Button>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-4 space-y-4"
                            >
                                <div className="mx-auto bg-green-100 p-4 rounded-full w-fit">
                                    <CheckCircle2 className="w-12 h-12 text-[#007654]" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Successfully Subscribed!</h3>
                                <p className="text-gray-600">You're on the list. Check your email soon.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </DialogContent>
        </Dialog>
    );
}
