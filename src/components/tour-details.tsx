"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { Calendar, Users, DollarSign } from "lucide-react";
import config from "../config";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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
  const t = useTranslations("silk");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "+998", // default qiymat
    quantity: 1,
    date: "",
    comment: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Telefon uchun maxsus shart
    if (name === "phone") {
      // Faqat +998 bilan boshlansin
      if (!value.startsWith("+998")) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${config.BASE_URL}/api/order/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          quantity: Number(formData.quantity),
          date: formData.date,
          comment: formData.comment,
          tour_id: tour.id,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create order");
      }

      const result = await res.json();
      console.log("✅ Order created:", result);

      toast.success(t("success"));

      setIsOpen(false);
      setFormData({
        name: "",
        phone: "+998",
        quantity: 1,
        date: "",
        comment: "",
      });
    } catch (err) {
      console.error("❌ Order error:", err);
      toast.error(t("error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      {/* Title */}
      <div className="text-center mb-6 md:mb-10">
        <h1 className="text-2xl md:text-4xl font-extrabold text-[#007654] mb-4">
          {tour.title}
        </h1>

        {/* Price, Duration, Dates, CTA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6">
          {/* Price */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-xl md:text-2xl font-bold text-[#007654]">
              <DollarSign size={20} />
              ${tour.price}
            </div>
            <p className="text-sm text-gray-600">{t("price_label")}</p>
          </div>

          {/* Duration */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-xl md:text-2xl font-bold text-[#007654]">
              <Users size={20} />
              {tour.date} {t("day")}
            </div>
            <p className="text-sm text-gray-600">{t("duration_label")}</p>
          </div>

          {/* Dates */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-lg font-semibold text-[#007654]">
              <Calendar size={18} />
              {t("departure_dates")}
            </div>
            <p className="text-sm text-gray-600">{t("departure_dates_label")}</p>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-center">
            <Button
              onClick={() => setIsOpen(true)}
              className="bg-gradient-to-r from-[#007654] to-[#009e6f] 
                hover:from-[#006148] hover:to-[#00885d] 
                text-white px-6 py-6 rounded-lg shadow-md 
                transition-transform transform hover:scale-105 w-full sm:w-auto text-xl"
            >
              {t("cta_book")}
            </Button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div
            className="relative bg-white rounded-t-2xl md:rounded-2xl shadow-xl p-5 sm:p-6 w-full max-w-md md:max-w-lg z-10 
            h-[90vh] sm:h-auto overflow-y-auto animate-slideUp"
          >
            <h2 className="text-xl md:text-2xl font-bold text-[#007654] mb-4 text-center">
              {t("booking_form.title")}
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("booking_form.name")}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm 
                    focus:ring-2 focus:ring-[#007654] focus:border-[#007654]"
                  placeholder={t("booking_form.name_placeholder")}
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("booking_form.phone")}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  pattern="^\+998\d{9}$"
                  maxLength={13} // +998XXXXXXXXX (13 ta belgidan oshmasin)
                  className="w-full px-4 py-2 border rounded-lg shadow-sm 
                    focus:ring-2 focus:ring-[#007654] focus:border-[#007654]"
                  placeholder="+998 901234567"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Format: +998901234567
                </p>
              </div>

              {/* Passengers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("booking_form.passengers")}
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm 
                    focus:ring-2 focus:ring-[#007654] focus:border-[#007654]"
                  min={1}
                  max={20}
                  step={1}
                  required
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("booking_form.date")}
                </label>
              <DatePicker
                  selected={formData.date ? new Date(formData.date) : null}
                  onChange={(date: Date | null) =>
                    setFormData(prev => ({ ...prev, date: date ? date.toISOString().split("T")[0] : "" }))
                  }
                  minDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                  className="w-full px-4 py-3 border rounded-lg shadow-sm 
                    focus:ring-2 focus:ring-[#007654] focus:border-[#007654]"
                  placeholderText="Sana tanlang"
                />

              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("booking_form.notes")}
                </label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm 
                    focus:ring-2 focus:ring-[#007654] focus:border-[#007654]"
                  rows={3}
                  placeholder={t("booking_form.notes_placeholder")}
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col md:flex-row justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="w-full md:w-auto"
                >
                  {t("booking_form.cancel")}
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto bg-[#007654] hover:bg-[#006148] text-white px-6"
                >
                  {loading ? t("loading") : t("submit")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
