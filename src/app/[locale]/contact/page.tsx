"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Header } from "@/src/components/header";
import { Footer } from "@/src/components/footer";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Mail,
  Phone,
  Send,
  MessageCircle,
  Sparkles
} from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");
  const tFaq = useTranslations("faq");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const subject = encodeURIComponent(`Website enquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
      );

      window.location.href = `mailto:naseemstravel@gmail.com?subject=${subject}&body=${body}`;
      setSuccess(true);
      setFormData({ name: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      labelKey: "phone_label",
      valueKey: "phone_value",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Mail,
      labelKey: "email_label",
      valueKey: "email_value",
      color: "from-blue-500 to-cyan-500"
    }
  ];

  return (
    <div className="w-full overflow-x-hidden bg-[#fbfbf9] min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#007654] via-[#00a572] to-[#007654] py-16 sm:py-20 md:py-24">
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 h-[320px] w-[320px] rounded-full bg-white/5 blur-[120px] sm:h-[600px] sm:w-[600px] sm:blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-[240px] w-[240px] rounded-full bg-white/5 blur-[90px] sm:h-[400px] sm:w-[400px] sm:blur-[120px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 sm:mb-6">
              <MessageCircle size={16} className="text-white" />
              <span className="text-xs font-bold tracking-wider text-white sm:text-sm">{t("badge")}</span>
            </div>
            <h1 className="mb-5 text-3xl font-black tracking-tight text-white sm:text-4xl md:mb-6 md:text-6xl lg:text-7xl">
              {t("title")}
            </h1>
            <p className="mx-auto max-w-2xl text-base text-white/80 sm:text-lg md:text-xl">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative z-20 -mt-8 py-12 sm:-mt-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.labelKey}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col items-center rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-lg transition-all hover:shadow-xl sm:p-8"
              >
                <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${info.color} shadow-lg transition-transform group-hover:scale-110 sm:mb-6 sm:h-16 sm:w-16`}>
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <p className="text-sm text-gray-500 font-bold tracking-widest mb-2">{t(info.labelKey)}</p>
                <p className="text-lg font-black text-[#1a1a1a] sm:text-xl md:text-2xl">{t(info.valueKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-gradient-to-b from-white to-[#dcfae7]/30 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center sm:mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-[#007654]/10 px-4 py-2 rounded-full mb-6 border border-[#007654]/20">
              <span className="w-2 h-2 bg-[#007654] rounded-full animate-pulse" />
              <span className="text-xs font-bold tracking-wider text-[#007654] sm:text-sm">{t("form_badge")}</span>
            </div>
            <h2 className="mb-4 text-3xl font-black text-[#1a1a1a] sm:text-4xl md:text-5xl">
              {t("form_title")}
            </h2>
            <p className="mb-8 text-gray-600 sm:mb-10">{t("form_subtitle")}</p>
          </motion.div>

          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 flex items-center gap-4 rounded-3xl border border-green-200 bg-green-50 p-5 sm:p-6"
            >
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <p className="text-base font-bold text-green-700 sm:text-lg">{t("message_sent")}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm sm:space-y-8 sm:rounded-[40px] sm:p-8 md:p-12">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              <div className="space-y-3">
                <label className="block text-sm font-black text-gray-900 tracking-widest">
                  {t("full_name")}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border-2 border-transparent bg-[#fbfbf9] px-5 py-4 font-bold text-gray-900 outline-none transition-all placeholder:font-medium placeholder:text-gray-300 focus:border-[#007654] sm:px-6"
                  placeholder={t("name_placeholder")}
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-black text-gray-900 tracking-widest">
                  {t("phone")}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border-2 border-transparent bg-[#fbfbf9] px-5 py-4 font-bold text-gray-900 outline-none transition-all placeholder:font-medium placeholder:text-gray-300 focus:border-[#007654] sm:px-6"
                  placeholder={t("phone_placeholder")}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-black text-gray-900 tracking-widest">
                {t("message")}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full resize-none rounded-2xl border-2 border-transparent bg-[#fbfbf9] px-5 py-4 font-bold text-gray-900 outline-none transition-all placeholder:font-medium placeholder:text-gray-300 focus:border-[#007654] sm:px-6"
                placeholder={t("message_placeholder")}
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#007654] to-[#00a572] py-4 text-base font-black tracking-widest text-white shadow-xl transition-all disabled:cursor-not-allowed disabled:opacity-70 hover:bg-green-700 sm:py-5 sm:text-lg"
            >
              <Send className="w-6 h-6" />
              {loading ? t("sending") : t("send_message")}
            </motion.button>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-[#007654]/10 px-4 py-2 rounded-full mb-6 border border-[#007654]/20">
              <span className="w-2 h-2 bg-[#007654] rounded-full animate-pulse" />
              <span className="text-xs font-bold tracking-wider text-[#007654] sm:text-sm">{tFaq("badge")}</span>
            </div>
            <h2 className="mb-4 text-3xl font-black text-[#1a1a1a] sm:text-4xl md:text-5xl">
              {tFaq("title")}
            </h2>
            <p className="text-gray-600 font-medium max-w-2xl mx-auto">
              {tFaq("subtitle")}
            </p>
          </motion.div>

          <div className="space-y-4">
            {["booking", "payment", "cancellation", "visa", "insurance"].map((key, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <FAQItem
                  question={tFaq(`items.${key}.q`)}
                  answer={tFaq(`items.${key}.a`)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-[24px] border-2 border-gray-100 bg-white shadow-sm transition-all hover:border-[#007654]/30 sm:rounded-3xl">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-5 text-left sm:p-8"
      >
        <span className="pr-4 text-base font-bold text-[#1a1a1a] sm:text-lg md:text-xl">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl shadow-md transition-all sm:h-12 sm:w-12 ${isOpen ? 'bg-[#007654] text-white' : 'bg-[#fbfbf9] text-gray-500'}`}
        >
          <ChevronDown size={20} className="sm:h-6 sm:w-6" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 text-base leading-relaxed text-gray-600 sm:px-8 sm:pb-8 sm:text-lg">
          {answer}
        </div>
      </motion.div>
    </div>
  );
}
