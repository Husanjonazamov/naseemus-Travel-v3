"use client";

import { useState, useEffect } from "react";
import { Header } from "@/src/components/header";
import { Footer } from "@/src/components/footer";
import {
    User,
    Settings,
    ShoppingBag,
    Heart,
    CreditCard,
    LogOut,
    ChevronRight,
    Calendar,
    MapPin,
    ShieldCheck,
    Star,
    Clock,
    ArrowRight
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Tabs, TabsContent } from "@/src/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { TourCard } from "@/src/components/TourCard";

import { useAuth } from "@/src/context/AuthContext";
import tourService, { Tour } from "@/src/services/tour.service";

export default function MyBookingsPage() {
    const [activeTab, setActiveTab] = useState("bookings");
    const [likedTours, setLikedTours] = useState<Tour[]>([]);
    const [isLikesLoading, setIsLikesLoading] = useState(false);
    const { user, logout, loading: authLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login");
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (user && activeTab === "tours") {
            const fetchLikedTours = async () => {
                setIsLikesLoading(true);
                try {
                    const data = await tourService.getLikedTours();
                    if (data.status && data.data.results) {
                        setLikedTours(data.data.results.map((item: any) => item.tour));
                    }
                } catch (error) {
                    console.error("Failed to fetch liked tours:", error);
                } finally {
                    setIsLikesLoading(false);
                }
            };
            fetchLikedTours();
        }
    }, [user, activeTab]);

    const handleLogout = () => {
        logout();
    };

    if (authLoading || !user) return null;

    return (
        <div className="min-h-screen bg-[#fbfbf9] flex flex-col">
            <Header />

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-16 relative">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#dcfae7]/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 -z-10" />

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-80 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Card className="border border-[#f0f0f0] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.06)] overflow-hidden bg-white/80 backdrop-blur-xl rounded-[32px]">
                                <div className="bg-[#007654] p-8 text-center text-white relative">
                                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern.png')] opacity-10" />
                                    <div className="relative z-10">
                                        <div className="mx-auto bg-white/20 p-4 rounded-full w-24 h-24 mb-4 backdrop-blur-md border border-white/30 flex items-center justify-center">
                                            <User className="w-12 h-12" />
                                        </div>
                                        <h2 className="font-black text-2xl tracking-tight mb-1">{user.first_name || user.email.split('@')[0]}</h2>
                                        <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-sm border border-white/10">
                                            <ShieldCheck size={12} />
                                            Member
                                        </div>
                                    </div>
                                </div>
                                <CardContent className="p-4 pt-6">
                                    <nav className="space-y-1">
                                        {[
                                            { id: "bookings", icon: <ShoppingBag size={18} />, label: "My Bookings" },
                                            { id: "tours", icon: <Heart size={18} />, label: "Saved Tours" },
                                            { id: "payments", icon: <CreditCard size={18} />, label: "Payments" },
                                            { id: "settings", icon: <Settings size={18} />, label: "Settings" },
                                        ].map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => setActiveTab(item.id)}
                                                className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${activeTab === item.id
                                                    ? "bg-[#007654] text-white shadow-lg shadow-[#007654]/20"
                                                    : "text-gray-500 hover:bg-gray-50 hover:text-[#1a1a1a]"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    {item.icon}
                                                    {item.label}
                                                </div>
                                                <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${activeTab === item.id ? "translate-x-1" : ""}`} />
                                            </button>
                                        ))}
                                        <div className="pt-4 mt-4 border-t border-gray-100">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all duration-300"
                                            >
                                                <LogOut size={18} />
                                                Sign Out
                                            </button>
                                        </div>
                                    </nav>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-grow">
                        <Tabs value={activeTab} className="w-full">
                            <AnimatePresence mode="wait">
                                <TabsContent value="bookings" className="m-0 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                                        <div>
                                            <h1 className="text-4xl font-black text-[#1a1a1a] tracking-tight">Adventure History</h1>
                                            <p className="text-gray-500 font-medium mt-1">Manage your upcoming and past journeys.</p>
                                        </div>
                                        <div className="bg-[#dcfae7] text-[#007654] px-5 py-2 rounded-2xl text-xs font-black uppercase tracking-widest border border-[#c8f7da]">
                                            2 Active Bookings
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <BookingDashboardCard
                                            title="Swiss Alps Expedition"
                                            status="Confirmed"
                                            date="June 12 - June 20, 2026"
                                            location="Interlaken, Switzerland"
                                            price="£2,450"
                                            id="NT-8821"
                                            image="https://images.unsplash.com/photo-1531210483974-4f8c1f33fd35?q=80&w=800"
                                        />

                                        <BookingDashboardCard
                                            title="Samarkand Silk Road Tour"
                                            status="Action Required"
                                            date="September 05 - September 12, 2026"
                                            location="Samarkand, Uzbekistan"
                                            price="£1,200"
                                            id="NT-8945"
                                            image="https://images.unsplash.com/photo-1528644016040-20f9daaec6b8?q=80&w=800"
                                            statusColor="bg-amber-100 text-amber-700 border-amber-200"
                                            urgent
                                        />
                                    </div>
                                </TabsContent>

                                <TabsContent value="tours" className="m-0 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div>
                                        <h1 className="text-4xl font-black text-[#1a1a1a] tracking-tight">Saved Destinations</h1>
                                        <p className="text-gray-500 font-medium mt-1">Your personal collection of dream travels.</p>
                                    </div>

                                    {isLikesLoading ? (
                                        <div className="flex items-center justify-center py-20">
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#007654]"></div>
                                        </div>
                                    ) : likedTours && likedTours.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {likedTours.map((tour: any) => (
                                                <TourCard key={tour.id} tour={tour} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-gray-200">
                                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                                                <Heart size={40} />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">No saved tours yet</h3>
                                            <p className="text-gray-500 max-w-xs mx-auto mb-8">Start exploring and tap the heart icon to save itineraries here.</p>
                                            <Link href="/tour">
                                                <Button className="bg-[#007654] text-white px-8 rounded-2xl h-14 font-bold shadow-lg shadow-[#007654]/10">
                                                    Browse All Tours
                                                </Button>
                                            </Link>
                                        </div>
                                    )}
                                </TabsContent>

                                <TabsContent value="payments" className="m-0 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <h1 className="text-4xl font-black text-[#1a1a1a] tracking-tight">Payments</h1>
                                    <Card className="border border-[#f0f0f0] shadow-sm overflow-hidden bg-white rounded-[32px]">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left">
                                                <thead className="bg-[#fbfbf9] text-[#007654] text-[10px] font-black uppercase tracking-widest border-b border-gray-100">
                                                    <tr>
                                                        <th className="px-8 py-6">Transaction</th>
                                                        <th className="px-8 py-6">Date</th>
                                                        <th className="px-8 py-6">Reference</th>
                                                        <th className="px-8 py-6">Amount</th>
                                                        <th className="px-8 py-6 text-right">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-50 text-sm font-medium">
                                                    <tr className="hover:bg-gray-50/50 transition-colors">
                                                        <td className="px-8 py-6 font-mono text-gray-400">#TXN-9902</td>
                                                        <td className="px-8 py-6 text-gray-900">May 20, 2026</td>
                                                        <td className="px-8 py-6 font-bold text-[#007654]">NT-8821</td>
                                                        <td className="px-8 py-6 font-black text-[#1a1a1a]">£2,450</td>
                                                        <td className="px-8 py-6 text-right">
                                                            <span className="bg-[#dcfae7] text-[#007654] px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#c8f7da]">Success</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Card>
                                </TabsContent>
                            </AnimatePresence>
                        </Tabs>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

function BookingDashboardCard({ title, status, date, location, price, id, image, statusColor = "bg-[#dcfae7] text-[#007654] border-[#c8f7da]", urgent = false }: any) {
    return (
        <motion.div
            whileHover={{ y: -8, boxShadow: "0 32px 64px -16px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
            <Card className="border border-[#f0f0f0] shadow-sm overflow-hidden bg-white rounded-[32px] group">
                <div className="flex flex-col md:flex-row min-h-[240px]">
                    <div className="w-full md:w-72 relative overflow-hidden h-48 md:h-auto">
                        <Image src={image} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                    </div>
                    <div className="flex-grow p-8 flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-2xl font-black text-[#1a1a1a] tracking-tight group-hover:text-[#007654] transition-colors">{title}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#007654]" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Ref: {id}</p>
                                </div>
                            </div>
                            <span className={`${statusColor} px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border`}>
                                {status}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 mt-2">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#007654]">
                                    <Calendar size={18} />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Departure</p>
                                    <p className="text-sm font-bold text-[#1a1a1a]">{date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#007654]">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Destination</p>
                                    <p className="text-sm font-bold text-[#1a1a1a]">{location}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto pt-6 flex flex-col md:flex-row justify-between items-center border-t border-gray-50 gap-4">
                            <div className="flex items-center gap-4">
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Total Price</p>
                                    <p className="text-2xl font-black text-[#1a1a1a]">{price}</p>
                                </div>
                            </div>
                            <div className="flex gap-3 w-full md:w-auto">
                                <Button variant="outline" className="flex-grow md:flex-none h-14 px-8 border-[#f0f0f0] rounded-2xl font-bold text-[#1a1a1a] hover:bg-gray-50">
                                    Manage Trip
                                </Button>
                                <Button className="flex-grow md:flex-none h-14 px-8 bg-[#007654] text-white rounded-2xl font-bold shadow-lg shadow-[#007654]/10 hover:shadow-[#007654]/20 transition-all">
                                    View Itinerary
                                    <ArrowRight size={18} className="ml-2" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
