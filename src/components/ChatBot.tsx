"use client";

import { useState } from "react";
import { X, Send, User, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface ChatBotProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ChatBot({ isOpen, onClose }: ChatBotProps) {
    const [messages, setMessages] = useState([
        { role: "bot", content: "Hello! How can I help you today?" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage = { role: "user", content: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setInputValue("");
        setIsTyping(true);

        // Mock bot response
        setTimeout(() => {
            const botMessage = { role: "bot", content: "Thank you for your message! Our travel expert will get back to you shortly. You can also call us at +44 79 8526 9296." };
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 100, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 100, scale: 0.8 }}
                    className="fixed bottom-24 right-6 w-full max-w-[350px] z-[100]"
                >
                    <Card className="border-none shadow-2xl rounded-2xl overflow-hidden bg-white">
                        <CardHeader className="bg-[#007654] text-white p-4 flex flex-row items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <MessageCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg">Naseem support</CardTitle>
                                    <p className="text-xs text-white/80">Online • typically responds in minutes</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10">
                                <X className="w-5 h-5" />
                            </Button>
                        </CardHeader>
                        <CardContent className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${msg.role === "user" ? "bg-[#007654] text-white rounded-tr-none" : "bg-white text-gray-800 rounded-tl-none" }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                        <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                    </div>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="p-4 bg-white border-t border-gray-100">
                            <form onSubmit={handleSend} className="flex gap-2 w-full">
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type a message..."
                                    className="rounded-xl border-gray-200 focus:ring-[#007654] focus:border-[#007654]"
                                />
                                <Button type="submit" size="icon" className="bg-[#007654] hover:bg-[#005c42] text-white rounded-xl shrink-0">
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                        </CardFooter>
                    </Card>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
