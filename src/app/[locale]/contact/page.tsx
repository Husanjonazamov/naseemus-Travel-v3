"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Header } from "@/src/components/header";
import { Footer } from "@/src/components/footer";


export default function ContactPage() {
  const locale = useLocale();
  const t = useTranslations("contact"); 

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // APIga yuborish
      // await axios.post("/api/contact", formData);
      console.log(formData);
      setSuccess(true);
      setFormData({ name: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* Header */}
      <Header locale={locale} />

      {/* Hero Section */}
      <section className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] bg-green-600 flex items-center justify-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-white text-center">
          {t("contact_us")}
        </h1>
      </section>

      {/* Contact Form */}
      <section className="py-12 bg-[#dcfae7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
            {t("get_in_touch")}
          </h2>

          {success && (
            <p className="mb-4 text-green-600 font-semibold text-center">
              {t("message_sent")}
            </p>
          )}

          <form onSubmit={handleSubmit} className="bg-[#dcfae7] shadow-md rounded-lg p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="name"
                placeholder={t("full_name")}
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="tel"
                name="phone"
                placeholder={t("phone")}
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <textarea
              name="message"
              placeholder={t("message")}
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded transition-colors"
            >
              {loading ? t("sending") : t("send_message")}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
