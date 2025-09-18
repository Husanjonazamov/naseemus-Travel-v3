'use client';

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
        <div className="w-full h-[220px] md:h-[280px] overflow-hidden rounded-2xl bg-gradient-to-r from-green-800 via-green-600 to-green-400 relative">
          {/* Matn va button */}
          <div className="h-full px-4 md:px-6 flex flex-col justify-center gap-2">
            <p className="text-white text-lg md:text-3xl font-semibold leading-snug">
             {t("offerOfDay")}
            </p>
            <p className="text-gray-100 text-sm md:text-lg font-medium">
              {t("bestDirections")}
            </p>
            <Link
              href={'#'}
              className="bg-white mt-4 text-black flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 shadow-sm rounded-3xl w-fit text-sm md:text-base font-medium"
            >
              <span>{t("seePrices")}</span>
              <EastIcon fontSize="small" />
            </Link>
          </div>
        </div>

        {/* Tugmalar (tours/hotel) */}
        <div className="bg-[#edeef1] flex justify-center py-2 h-[40px] w-[240px] md:w-[260px] absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full">
          <div className="w-[200px] md:w-[220px] bg-white grid grid-cols-2 py-1 px-1 h-[40px] md:h-[45px] rounded-3xl shadow-sm">
            <button
              onClick={() => setActive('tours')}
              className={`flex items-center justify-center gap-1 px-3 py-1 md:py-2 rounded-3xl font-semibold transition
                ${active === 'tours' ? 'bg-green-700 text-white' : 'text-black'}`}
            >
              <LuggageIcon fontSize="small" />
              <p className="text-sm md:text-base">{t("tours")}</p>
            </button>

            <button
              onClick={() => setActive('hotel')}
              className={`flex items-center justify-center gap-1 px-3 py-1 md:py-2 rounded-3xl font-semibold transition
                ${active === 'hotel' ? 'bg-green-600 text-white' : 'text-black'}`}
            >
              <HotelIcon fontSize="small" />
              <p className="text-sm md:text-base">{t("hotels")}</p>
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
