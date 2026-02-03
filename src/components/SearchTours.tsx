"use client";

import Link from 'next/link';
import EastIcon from '@mui/icons-material/East';
import HotelIcon from '@mui/icons-material/Hotel';
import LuggageIcon from '@mui/icons-material/Luggage';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import TabsHotel from './TabsHotel';
import TabsHotelMobile from './TabsHotelMobile';
import TabsTourMobile from './TabsTourMobile';
import TabsTours from './TabsTours';


const SearchTours = () => {
  const [active, setActive] = useState<'tours' | 'hotel'>('tours');
  const t = useTranslations("searchPage");

  return (
    <div className="min-h-[500px] flex flex-col items-center justify-start pt-10">
      {/* Banner blok */}
      <div className="relative w-full max-w-[1200px] mx-auto px-3 md:px-0">
        <div className="w-full h-[240px] md:h-[320px] overflow-hidden rounded-[32px] bg-[#007654] relative shadow-2xl shadow-[#007654]/20">
          {/* Matn va button */}
          <div className="h-full px-8 md:px-12 flex flex-col justify-center gap-4">
            <h2 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-tight">
              {t("offerOfDay")}
            </h2>
            <p className="text-white/80 text-base md:text-xl font-medium max-w-2xl">
              {t("bestDirections")}
            </p>
            <Link
              href={'#newTour'}
              className="mt-4 bg-white text-[#007654] hover:bg-[#dcfae7] transition-all duration-300 flex items-center gap-3 px-8 py-4 shadow-xl shadow-black/10 rounded-2xl w-fit text-base md:text-lg font-bold"
            >
              <span>{t("seePrices")}</span>
              <EastIcon fontSize="medium" />
            </Link>
          </div>
        </div>

        {/* Tugmalar (tours/hotel) */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex justify-center w-full max-w-[400px] px-4">
          <div className="w-full bg-white/95 backdrop-blur-xl flex p-1.5 rounded-[24px] shadow-2xl border border-white/20">
            <button
              onClick={() => setActive('tours')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-[18px] font-bold transition-all duration-500
                ${active === 'tours' ? 'bg-[#007654] text-white shadow-lg shadow-[#007654]/30 scale-100' : 'text-gray-500 hover:text-[#007654] hover:bg-gray-50'}`}
            >
              <LuggageIcon fontSize="small" className={active === 'tours' ? 'text-white' : ''} />
              <span className="text-sm md:text-base whitespace-nowrap">{t("tours")}</span>
            </button>
            <button
              onClick={() => setActive('hotel')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-[18px] font-bold transition-all duration-500
                ${active === 'hotel' ? 'bg-[#007654] text-white shadow-lg shadow-[#007654]/30 scale-100' : 'text-gray-500 hover:text-[#007654] hover:bg-gray-50'}`}
            >
              <HotelIcon fontSize="small" className={active === 'hotel' ? 'text-white' : ''} />
              <span className="text-sm md:text-base whitespace-nowrap">{t("hotels")}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <TabsTours active={active} />
      <TabsTourMobile active={active} />
      <TabsHotel active={active} />
      <TabsHotelMobile active={active} />
    </div>
  );
};

export default SearchTours;
