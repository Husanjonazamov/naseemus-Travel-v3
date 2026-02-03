"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { Calendar, Users, DollarSign, ArrowRight, Loader2, Sparkles } from "lucide-react";
import config from "../config";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Card, CardContent } from "./ui/card";
import { motion, AnimatePresence } from "framer-motion";

interface TourDetailsProps {
  tour: {
    id: number;
    title: string;
    slug: string;
    description: string;
    price: string;
    image: string;
    date: number;
    category?: { id: number; title: string } | null;
    is_popular: boolean;
    is_new: boolean;
    images: string[];
  };
}

export function TourDetails({ tour }: TourDetailsProps) {
  const t = useTranslations("tour_booking");
  const silkT = useTranslations("silk");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "+998",
    quantity: 1,
    date: "",
    comment: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "phone" && !value.startsWith("+998")) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${config.BASE_URL}/api/order/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          quantity: Number(formData.quantity),
          tour_id: tour.id,
        }),
      });

      if (!res.ok) throw new Error("Failed");
      toast.success(silkT("success"));
      setIsOpen(false);
      setFormData({ name: "", phone: "+998", quantity: 1, date: "", comment: "" });
    } catch (err) {
      toast.error(silkT("error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Card className="border-0 shadow-2xl overflow-hidden bg-white/80 backdrop-blur-xl rounded-[40px] border-b-8 border-[#007654]">
        <CardContent className="p-10">
          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#dcfae7] px-4 py-2 rounded-full">
                <Sparkles size={16} className="text-[#007654]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#007654]">{t("premium_booking")}</span>
              </div>
              <h3 className="text-3xl font-black text-[#1a1a1a] tracking-tight">{t("reserve_spot")}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{t("reserve_description")}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50/80 p-6 rounded-3xl border border-gray-100 flex flex-col items-center text-center">
                <DollarSign size={24} className="text-[#007654] mb-2" />
                <p className="text-[9px] font-black uppercase text-gray-400 mb-1">{t("fixed_price")}</p>
                <p className="text-xl font-black text-[#1a1a1a]">${tour.price}</p>
              </div>
              <div className="bg-gray-50/80 p-6 rounded-3xl border border-gray-100 flex flex-col items-center text-center">
                <Calendar size={24} className="text-[#007654] mb-2" />
                <p className="text-[9px] font-black uppercase text-gray-400 mb-1">{t("duration")}</p>
                <p className="text-xl font-black text-[#1a1a1a]">{tour.date} {t("days")}</p>
              </div>
            </div>

            <Button
              onClick={() => setIsOpen(true)}
              className="w-full h-20 bg-[#007654] hover:bg-[#008c64] text-white rounded-[24px] text-xl font-black transition-all duration-300 shadow-xl shadow-[#007654]/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              {t("proceed_booking")}
              <ArrowRight size={24} className="ml-3" />
            </Button>

            <div className="flex items-center justify-center gap-4 py-2 text-gray-400">
              <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#007654]" />
                {t("best_price_guarantee")}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className="relative bg-white w-full max-w-[500px] rounded-[40px] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              <div className="p-8 md:p-12">
                <div className="mb-10 text-center">
                  <h2 className="text-3xl font-black text-[#1a1a1a] tracking-tight">{silkT("booking_form.title")}</h2>
                  <p className="text-gray-500 font-medium mt-2">{t("personalize_experience")}</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{silkT("booking_form.name")}</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full h-16 px-6 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:bg-white focus:ring-4 focus:ring-[#007654]/5 transition-all outline-none"
                      placeholder={silkT("booking_form.name_placeholder")}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{silkT("booking_form.phone")}</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full h-16 px-6 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:bg-white focus:ring-4 focus:ring-[#007654]/5 transition-all outline-none"
                        placeholder="+998"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{t("travelers")}</label>
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="w-full h-16 px-6 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:bg-white focus:ring-4 focus:ring-[#007654]/5 transition-all outline-none"
                        min={1}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{t("preferred_date")}</label>
                    <DatePicker
                      selected={formData.date ? new Date(formData.date) : null}
                      onChange={(date: Date | null) => setFormData(prev => ({ ...prev, date: date ? date.toISOString().split("T")[0] : "" }))}
                      minDate={new Date()}
                      dateFormat="dd/MM/yyyy"
                      className="w-full h-16 px-6 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:bg-white focus:ring-4 focus:ring-[#007654]/5 transition-all outline-none"
                      placeholderText={t("select_date")}
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-16 bg-[#007654] hover:bg-[#008c64] text-white rounded-2xl font-black text-lg shadow-xl shadow-[#007654]/20"
                    >
                      {loading ? <Loader2 className="animate-spin" /> : t("confirm_booking")}
                    </Button>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="w-full mt-4 text-xs font-black text-gray-300 uppercase tracking-widest hover:text-gray-600 transition-colors"
                    >
                      {t("dismiss")}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
