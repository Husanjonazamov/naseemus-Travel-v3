"use client";

import Link from 'next/link';
import { format } from 'date-fns';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DoneIcon from '@mui/icons-material/Done';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';


import { useState, useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import config from '../config';

interface Props {
  active: 'tours' | 'hotel';
}

interface City {
  title: string;
  slug: string;
}


const TabsHotel = ({ active }: Props) => {
  const t = useTranslations("hotel");
  const [openCity, setOpenCity] = useState(false);
  const [ageOpen, setAgeOpen] = useState(false);
  const [dataOpen, setDataOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [selectData, setSelectData] = useState<string>();
  const [adults, setAdults] = useState<number>(0);
  const [children, setChildren] = useState<number>(0);
  const selectAge = adults + children;
  const [range, setRange] = useState<DateRange | undefined>();
  const [searchWhere, setSearchWhere] = useState('');

  const formatDateString = (date?: Date) =>
    date ? format(date, 'dd/MM/yyyy') : '';


  const [cities, setCities] = useState<City[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [filteredCitiesWhere, setFilteredCitiesWhere] = useState<City[]>([]);

  useEffect(() => {
    fetch(`${config.BASE_URL}/api/hotel/`)
      .then(res => res.json())
      .then(data => {
        if (data.status && data.data.results) {
          const cityData = data.data.results.map((tour: any) => ({
            title: tour.title,
            slug: tour.slug
          }));
          setCities(cityData);
        }
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const filtered = cities.filter(c =>
      c.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCities(filtered);
  }, [search, cities]);

  useEffect(() => {
    const filtered = cities.filter(c =>
      c.title.toLowerCase().includes(searchWhere.toLowerCase())
    );
    setFilteredCitiesWhere(filtered);
  }, [searchWhere, cities]);


  return (
    <>
      {active === 'hotel' && (
        <div className="mt-12 bg-white/95 backdrop-blur-xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white/20 p-2 rounded-[32px] w-full max-w-[1240px] grid grid-cols-4 items-center max-lg:hidden font-medium">

          {/* City Selection */}
          <div className="relative gap-2 h-full ">
            <div
              onClick={() => { setOpenCity(!openCity); setSearch(''); }}
              className="cursor-pointer flex flex-col gap-2 p-4 rounded-3xl hover:bg-gray-50 transition-colors"
            >
              <Label className="font-bold text-xs uppercase tracking-widest text-gray-400 pl-1">{t('directions')}</Label>
              <div className="relative">
                <Input
                  className="h-10 border-none shadow-none text-lg font-bold placeholder:text-gray-300 focus-visible:ring-0 p-1"
                  placeholder={t('placeholder_city')}
                  value={selectedCity}
                  readOnly
                />
              </div>
            </div>

            {openCity && <div className="fixed inset-0 z-40" onClick={() => setOpenCity(false)} />}

            <AnimatePresence>
              {openCity && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-[115px] border border-white/40 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] rounded-[28px] bg-white/95 backdrop-blur-xl w-[320px] z-50 p-3 overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative mb-3 pt-1 px-1">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <SearchIcon fontSize="small" />
                    </div>
                    <Input
                      placeholder={t('start_search')}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 h-11 bg-gray-50 border-none rounded-2xl text-sm focus-visible:ring-1 focus-visible:ring-[#007654]/20"
                      onClick={(e) => e.stopPropagation()}
                      onFocus={(e) => e.stopPropagation()}
                    />
                  </div>

                  <div className="max-h-[300px] overflow-y-auto custom-scrollbar px-1">
                    {filteredCities.length > 0 ? (
                      filteredCities.map((city) => (
                        <div
                          key={city.slug}
                          className="group p-3 hover:bg-[#dcfae7]/40 rounded-2xl text-gray-700 items-center cursor-pointer flex justify-between transition-all duration-200"
                          onClick={() => {
                            setSelectedCity(city.title);
                            setOpenCity(false);
                          }}
                        >
                          <div className="flex flex-col">
                            <span className="font-bold text-[15px] group-hover:text-[#007654] transition-colors">{city.title}</span>
                            <span className="text-xs text-gray-400">City, Uzbekistan</span>
                          </div>
                          {city.title === selectedCity && (
                            <div className="bg-[#007654] rounded-full p-0.5">
                              <DoneIcon sx={{ width: '14px', height: '14px', color: 'white' }} />
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-400 text-sm">{t('no_results')}</div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Date Selection */}
          <div className="relative gap-2 h-full ">
            <div
              onClick={() => setDataOpen(!dataOpen)}
              className="cursor-pointer flex flex-col gap-2 p-4 rounded-3xl hover:bg-gray-50 transition-colors border-l border-gray-100"
            >
              <Label className="font-bold text-xs uppercase tracking-widest text-gray-400 pl-1">{t('start_date')}</Label>
              <div className="relative">
                <Input
                  className="h-10 border-none shadow-none text-lg font-bold placeholder:text-gray-300 focus-visible:ring-0 p-1"
                  placeholder={t('when')}
                  value={selectData}
                  readOnly
                />
                <CalendarMonthIcon
                  sx={{
                    position: 'absolute',
                    color: 'black',
                    top: '50%',
                    right: '10px',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none'
                  }}
                />
              </div>
            </div>

            {dataOpen && <div className="fixed inset-0 z-40" onClick={() => setDataOpen(false)} />}

            <AnimatePresence>
              {dataOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-[115px] border border-white/40 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] rounded-[28px] bg-white/95 backdrop-blur-xl z-50 p-6 overflow-hidden min-w-[600px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex gap-4 items-center mb-6">
                    <div className="flex-1 bg-gray-50 p-3 rounded-2xl border-none">
                      <Label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">{t('start_date')}</Label>
                      <span className="text-base font-bold text-gray-700">
                        {fromDate ? formatDateString(fromDate) : t('when')}
                      </span>
                    </div>
                    <ArrowRightAltIcon color="action" />
                    <div className="flex-1 bg-gray-50 p-3 rounded-2xl border-none">
                      <Label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">{t('departure')}</Label>
                      <span className="text-base font-bold text-gray-700">
                        {toDate ? formatDateString(toDate) : t('departure')}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center border-y border-gray-100 py-4">
                    <Calendar
                      mode="range"
                      selected={range}
                      onSelect={(val) => {
                        setRange(val);
                        setFromDate(val?.from);
                        setToDate(val?.to);
                      }}
                      showOutsideDays={false}
                      numberOfMonths={2}
                      className="rounded-3xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 mt-6 gap-3">
                    <button
                      className="bg-gray-100 hover:bg-gray-200 rounded-2xl p-4 text-gray-500 font-bold transition-all duration-200"
                      onClick={() => { setDataOpen(false); setFromDate(undefined); setToDate(undefined); setRange(undefined); }}
                    >
                      {t('cancel')}
                    </button>
                    <button
                      className="bg-[#007654] hover:bg-[#008c64] shadow-lg shadow-[#007654]/20 rounded-2xl p-4 text-white font-bold transition-all duration-200"
                      onClick={() => {
                        setDataOpen(false);
                        if (fromDate && toDate) {
                          setSelectData(`${formatDateString(fromDate)} - ${formatDateString(toDate)}`);
                        } else setSelectData('');
                      }}
                    >
                      {t('apply')}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tourists Selection */}
          <div className="relative gap-2 h-full ">
            <div
              onClick={() => setAgeOpen(!ageOpen)}
              className="cursor-pointer flex flex-col gap-2 p-4 rounded-3xl hover:bg-gray-50 transition-colors border-l border-gray-100"
            >
              <Label className="font-bold text-xs uppercase tracking-widest text-gray-400 pl-1">{t('tourists')}</Label>
              <div className="relative">
                <Input
                  className="h-10 border-none shadow-none text-lg font-bold placeholder:text-gray-300 focus-visible:ring-0 p-1"
                  placeholder={`${adults} ${t('adults')}, ${children} ${t('children')}`}
                  value={selectAge === 0 ? '' : selectAge}
                  readOnly
                />
              </div>
            </div>

            {ageOpen && <div className="fixed inset-0 z-40" onClick={() => setAgeOpen(false)} />}

            <AnimatePresence>
              {ageOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-[115px] border border-white/40 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] rounded-[28px] bg-white/95 backdrop-blur-xl z-50 p-6 w-[340px] overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-8 group">
                    <div className="flex flex-col">
                      <span className="font-bold text-lg text-gray-700">{t('adults')}</span>
                      <span className="text-xs text-gray-400">{t('adults_info')}</span>
                    </div>
                    <div className="flex items-center bg-gray-50 rounded-[18px] p-1 border border-gray-100">
                      <button
                        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition-all text-gray-500 hover:text-[#007654]"
                        onClick={() => setAdults(prev => Math.max(prev - 1, 0))}
                      >
                        <RemoveIcon fontSize="small" />
                      </button>
                      <span className="w-10 text-center font-bold text-gray-700 text-lg">{adults}</span>
                      <button
                        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition-all text-gray-500 hover:text-[#007654]"
                        onClick={() => setAdults(prev => prev + 1)}
                      >
                        <AddIcon fontSize="small" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between group">
                    <div className="flex flex-col">
                      <span className="font-bold text-lg text-gray-700">{t('children')}</span>
                      <span className="text-xs text-gray-400">{t('children_info')}</span>
                    </div>
                    <div className="flex items-center bg-gray-50 rounded-[18px] p-1 border border-gray-100">
                      <button
                        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition-all text-gray-500 hover:text-[#007654]"
                        onClick={() => setChildren(prev => Math.max(prev - 1, 0))}
                      >
                        <RemoveIcon fontSize="small" />
                      </button>
                      <span className="w-10 text-center font-bold text-gray-700 text-lg">{children}</span>
                      <button
                        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition-all text-gray-500 hover:text-[#007654]"
                        onClick={() => setChildren(prev => prev + 1)}
                      >
                        <AddIcon fontSize="small" />
                      </button>
                    </div>
                  </div>

                  <button
                    className="w-full mt-8 bg-[#007654] hover:bg-[#008c64] shadow-lg shadow-[#007654]/20 rounded-2xl p-4 text-white font-bold transition-all duration-200"
                    onClick={() => setAgeOpen(false)}
                  >
                    {t('apply')}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search Button */}
          <div className="p-2">
            <Link
              href={'#'}
              className="bg-[#007654] hover:bg-[#008c64] text-white h-[72px] flex items-center justify-center rounded-[24px] text-center transition-all duration-300 shadow-xl shadow-[#007654]/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <p className="text-white font-bold text-lg uppercase tracking-wider">{t('search_tours')}</p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default TabsHotel;
