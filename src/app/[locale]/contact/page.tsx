"use client";

import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Header } from "@/src/components/header";
import { Footer } from "@/src/components/footer";
import { motion } from "framer-motion";
import config from "@/src/config";

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

  const [bannerImage, setBannerImage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(formData);
      setSuccess(true);
      setFormData({ name: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch(`${config.BASE_URL}/api/banner/`);
        const data = await res.json();
        if (data.status && data.data.results.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * data.data.results.length
          );
          setBannerImage(data.data.results[randomIndex].image);
        }
      } catch (error) {
        console.error("Banner olishda xato:", error);
      }
    };
    fetchBanner();
  }, []);

  return (
    <div className="w-full overflow-x-hidden bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <Header locale={locale} />

      {/* Hero Section */}
      <section className="relative w-full h-[280px] sm:h-[350px] md:h-[400px] flex items-center justify-center shadow-lg">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: `url(${bannerImage || "/images/hero.jpg"})`,
          }}
        ></div>

        <div className="absolute inset-0 bg-black/50"></div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-3xl sm:text-5xl font-extrabold text-white text-center drop-shadow-lg px-4"
        >
          {t("contact_us")}
        </motion.h1>

        {/* Wave Divider */}
        <div className="absolute -bottom-1 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            className="w-full h-[60px] md:h-[80px] lg:h-[100px]"
          >
            <path
              d="M0.00,49.98 C150.00,150.00 349.71,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
              className="fill-gray-50"
            ></path>
          </svg>
        </div>
      </section>

      {/* Contact Section */}
      <section className="flex-1 py-12 bg-[#f3fdf7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center"
          >
            {t("get_in_touch")}
          </motion.h2>

          {/* ✅ Uch tilda izoh */}
          <p className="text-center text-gray-600 mb-8">
            {locale === "uz" &&
              "Biz bilan bog‘lanish uchun quyidagi formani to‘ldiring."}
            {locale === "ru" &&
              "Для связи с нами заполните форму ниже."}
            {locale === "en" &&
              "Fill out the form below to get in touch with us."}
          </p>

          {success && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 text-green-600 font-semibold text-center"
            >
              ✅ {t("message_sent")}
            </motion.p>
          )}

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-green-100"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("full_name")}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("phone")}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("message")}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              ></textarea>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl shadow-lg transition-all"
            >
              {loading ? t("sending") + "..." : t("send_message")}
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
