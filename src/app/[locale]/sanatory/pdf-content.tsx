"use client";

import { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

// PDF.js worker manzilini belgilaymiz
pdfjsLib.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PdfTextViewer({ url }) {
  const [pagesText, setPagesText] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(url).promise;
        const textPages = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map(item => item.str);
          textPages.push(strings.join(" "));
        }

        setPagesText(textPages);
        setLoading(false);
      } catch (err) {
        console.error("PDFni o'qishda xato:", err);
        setLoading(false);
      }
    };

    loadPdf();
  }, [url]);

  if (loading) return <p>Yuklanmoqda...</p>;

  return (
    <div>
      {pagesText.map((pageText, index) => (
        <div key={index} style={{ marginBottom: "2rem" }}>
          <h3>Varaq {index + 1}</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>{pageText}</p>
        </div>
      ))}
    </div>
  );
}
