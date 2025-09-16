"use client";

import { useState, useEffect } from "react";

export default function SanatoryPDFSection() {
  const [pdfText, setPdfText] = useState<string>("Yuklanmoqda...");

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const { pdfjs } = await import("react-pdf"); // ✅ faqat clientda yuklanadi
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        const pdfUrl = "/pdf/pg.pdf";
        const pdf = await pdfjs.getDocument(pdfUrl).promise;

        let textContent = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const text = await page.getTextContent();
          const pageText = text.items.map((item: any) => item.str).join(" ");
          textContent += `\n\n${pageText}`;
        }

        setPdfText(textContent);
      } catch (err) {
        console.error("PDF yuklashda xatolik:", err);
        setPdfText("PDFni yuklab bo‘lmadi ❌");
      }
    };

    loadPdf();
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
        📄 Sanatoriya haqida to‘liq ma’lumot
      </h2>

      <div className="bg-white shadow-lg rounded-xl p-6 max-h-[500px] overflow-y-auto border">
        <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed">
          {pdfText}
        </pre>
      </div>
    </section>
  );
}
