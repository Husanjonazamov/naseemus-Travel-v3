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
      // Mock API call
      console.log(formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
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
      <section className="relative py-24 bg-gradient-to-br from-[#007654] via-[#00a572] to-[#007654] overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 border border-white/20">
              <MessageCircle size={16} className="text-white" />
              <span className="text-white text-sm font-bold uppercase tracking-wider">{t("badge")}</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
              {t("title")}
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 -mt-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.labelKey}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all group flex flex-col items-center text-center"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-2">{t(info.labelKey)}</p>
                <p className="text-xl md:text-2xl font-black text-[#1a1a1a]">{t(info.valueKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#dcfae7]/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-[#007654]/10 px-4 py-2 rounded-full mb-6 border border-[#007654]/20">
              <span className="w-2 h-2 bg-[#007654] rounded-full animate-pulse" />
              <span className="text-[#007654] text-sm font-bold uppercase tracking-wider">{t("form_badge")}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-4">
              {t("form_title")}
            </h2>
            <p className="text-gray-600 mb-10">{t("form_subtitle")}</p>
          </motion.div>

          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-6 bg-green-50 border border-green-200 rounded-3xl flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <p className="text-green-700 font-bold text-lg">{t("message_sent")}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="block text-sm font-black text-gray-900 uppercase tracking-widest">
                  {t("full_name")}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-[#fbfbf9] border-2 border-transparent focus:border-[#007654] rounded-2xl outline-none transition-all text-gray-900 font-bold placeholder:text-gray-300 placeholder:font-medium"
                  placeholder={t("name_placeholder")}
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-black text-gray-900 uppercase tracking-widest">
                  {t("phone")}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-[#fbfbf9] border-2 border-transparent focus:border-[#007654] rounded-2xl outline-none transition-all text-gray-900 font-bold placeholder:text-gray-300 placeholder:font-medium"
                  placeholder={t("phone_placeholder")}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-black text-gray-900 uppercase tracking-widest">
                {t("message")}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-6 py-4 bg-[#fbfbf9] border-2 border-transparent focus:border-[#007654] rounded-2xl outline-none transition-all text-gray-900 font-bold placeholder:text-gray-300 placeholder:font-medium resize-none"
                placeholder={t("message_placeholder")}
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-[#007654] to-[#00a572] hover:bg-green-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-black py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 text-lg uppercase tracking-widest"
            >
              <Send className="w-6 h-6" />
              {loading ? t("sending") : t("send_message")}
            </motion.button>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-[#007654]/10 px-4 py-2 rounded-full mb-6 border border-[#007654]/20">
              <span className="w-2 h-2 bg-[#007654] rounded-full animate-pulse" />
              <span className="text-[#007654] text-sm font-bold uppercase tracking-wider">{tFaq("badge")}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-4">
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
    <div className="bg-white border-2 border-gray-100 rounded-3xl overflow-hidden hover:border-[#007654]/30 transition-all shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-8 text-left"
      >
        <span className="font-bold text-[#1a1a1a] pr-4 text-lg md:text-xl">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all shadow-md ${isOpen ? 'bg-[#007654] text-white' : 'bg-[#fbfbf9] text-gray-500'}`}
        >
          <ChevronDown size={24} />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-8 pb-8 text-gray-600 leading-relaxed text-lg">
          {answer}
        </div>
      </motion.div>
    </div>
  );
}
