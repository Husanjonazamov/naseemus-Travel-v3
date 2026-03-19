"use client";

import Link from 'next/link';
import { format } from 'date-fns';
import Button from '@mui/material/Button';
import { Calendar } from './ui/calendar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import AddIcon from '@mui/icons-material/Add';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchIcon from '@mui/icons-material/Search';
import Drawer from '@mui/material/Drawer';
import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';

import { useState, useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import config from '../config';


interface City {
  title: string;
  slug: string;
}

interface Props {
  active: 'tours' | 'hotel';
}

const TabsHotelMobile = ({ active }: Props) => {
  const t = useTranslations('hotel');
  const locale = useLocale();

  const [openCityMobile, setOpenCityMobile] = useState(false);
  const [ageOpen, setAgeOpen] = useState(false);
  const [dataOpenMobile, setDataOpenMobile] = useState(false);
  const [selectAge, setSelectAge] = useState<number>(0);
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [selectData, setSelectData] = useState<string>();
  const [adults, setAdults] = useState<number>(0);
  const [children, setChildren] = useState<number>(0);
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
        <div className="mt-12 bg-white/95 backdrop-blur-xl shadow-[0_24px_48px_-12px_rgba(0,0,0,0.1)] border border-white/20 p-6 rounded-[24px] w-full grid grid-cols-1 gap-6 lg:hidden font-medium">

          {/* City Selection */}
          <div className="relative flex gap-2 h-full">
            <div
              onClick={() => setOpenCityMobile(!openCityMobile)}
              className="cursor-pointer flex flex-col w-full gap-2"
            >
              <Label className="font-semibold text-md">{t('directions')}</Label>
              <div className="relative w-full">
                <Input
                  className="h-[60px] w-full text-md placeholder:text-md"
                  placeholder={t('placeholder_city')}
                  value={selectedCity}
                  readOnly
                />
              </div>
            </div>

            <Drawer
              anchor="bottom"
              open={openCityMobile}
              onClose={() => setOpenCityMobile(false)}
              PaperProps={{
                sx: {
                  borderTopLeftRadius: 32,
                  borderTopRightRadius: 32,
                  padding: 3,
                  width: '100%',
                  overflow: 'auto',
                  minHeight: '80%',
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(10px)',
                },
              }}
            >
              <div className="flex flex-col gap-4 w-full font-medium">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xl font-bold text-gray-800">{t('directions')}</p>
                  <Button
                    onClick={() => setOpenCityMobile(false)}
                    sx={{ minWidth: 0, padding: 1, borderRadius: '12px', color: 'gray' }}
                  >
                    <CloseIcon />
                  </Button>
                </div>
                <div className="relative mb-4">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <SearchIcon fontSize="small" />
                  </div>
                  <Input
                    placeholder={t('start_search')}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 h-14 bg-gray-50 border-none rounded-2xl text-md focus-visible:ring-1 focus-visible:ring-[#007654]/20"
                  />
                </div>
                <div className="flex flex-col gap-2 overflow-y-auto max-h-[60vh] px-1">
                  {filteredCities.length > 0 ? (
                    filteredCities.map((city) => (
                      <div
                        key={city.slug}
                        className="group p-4 hover:bg-[#dcfae7]/40 rounded-2xl text-gray-700 items-center cursor-pointer flex justify-between transition-all duration-200"
                        onClick={() => {
                          setSelectedCity(city.title);
                          setOpenCityMobile(false);
                        }}
                      >
                        <div className="flex flex-col">
                          <span className="font-bold text-base group-hover:text-[#007654] transition-colors">{city.title}</span>
                          <span className="text-xs text-gray-400">Destination</span>
                        </div>
                        {city.title === selectedCity && (
                          <div className="bg-[#007654] rounded-full p-0.5">
                            <DoneIcon sx={{ width: '14px', height: '14px', color: 'white' }} />
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-400 text-sm">{t('no_results')}</div>
                  )}
                </div>
              </div>
            </Drawer>
          </div>

          {/* Date Selection */}
          <div className="relative flex gap-2 h-full">
            <div
              onClick={() => setDataOpenMobile(!dataOpenMobile)}
              className="cursor-pointer flex flex-col gap-2 w-full"
            >
              <Label className="font-semibold text-md">{t('departureDate')}</Label>
              <div className="relative">
                <Input
                  className="h-[60px] text-md placeholder:text-md"
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
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </div>

            <Drawer
              anchor="bottom"
              open={dataOpenMobile}
              onClose={() => {
                setDataOpenMobile(false);
                setFromDate(undefined);
                setToDate(undefined);
              }}
              PaperProps={{
                sx: {
                  borderTopLeftRadius: 32,
                  borderTopRightRadius: 32,
                  padding: 3,
                  width: '100vw',
                  maxHeight: '85vh',
                  overflow: 'auto',
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(10px)',
                },
              }}
            >
              <div className="flex flex-col gap-4 w-full font-medium">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-xl font-bold text-gray-800">{t('departureDate')}</p>
                  <Button
                    onClick={() => setDataOpenMobile(false)}
                    sx={{ minWidth: 0, padding: 1, borderRadius: '12px', color: 'gray' }}
                  >
                    <CloseIcon />
                  </Button>
                </div>
                <div className="flex flex-row gap-2">
                  <Input
                    placeholder={t('when')}
                    value={fromDate ? formatDateString(fromDate) : ''}
                    readOnly
                    className={clsx('w-full text-black h-[50px]')}
                    onClick={(e) => e.stopPropagation()}
                    onFocus={(e) => e.stopPropagation()}
                  />
                  <ArrowRightAltIcon
                    color="action"
                    sx={{ width: '28px', height: '28px' }}
                    className="self-center mx-2"
                  />
                  <Input
                    placeholder={t('departure')}
                    value={toDate ? formatDateString(toDate) : ''}
                    disabled={!fromDate}
                    readOnly
                    className={clsx('w-full text-black h-[50px]')}
                    onClick={(e) => e.stopPropagation()}
                    onFocus={(e) => e.stopPropagation()}
                  />
                </div>

                <div className="flex justify-center mb-6">
                  <Calendar
                    className="w-full rounded-3xl border border-gray-100 p-4"
                    mode="range"
                    selected={range}
                    onSelect={(val) => {
                      setRange(val);
                      setFromDate(val?.from);
                      setToDate(val?.to);
                    }}
                    showOutsideDays={false}
                    numberOfMonths={1}
                  />
                </div>

                <div className="grid grid-cols-1 mt-5 gap-2">
                  <button
                    className="bg-[#007654] rounded-3xl p-3 text-white"
                    onClick={() => {
                      setDataOpenMobile(false);
                      if (fromDate && toDate) {
                        setSelectData(`${formatDateString(fromDate)} - ${formatDateString(toDate)}`);
                      } else setSelectData('');
                    }}
                  >
                    {t('apply')}
                  </button>
                </div>
              </div>
            </Drawer>
          </div>

          {/* Tourists Selection */}
          <div className="relative flex gap-2 h-full">
            <div
              onClick={() => setAgeOpen(!ageOpen)}
              className="cursor-pointer flex flex-col w-full gap-2"
            >
              <Label className="font-semibold text-md">{t('tourists')}</Label>
              <div className="relative">
                <Input
                  value={selectAge === 0 ? '' : selectAge}
                  className="h-[60px] text-md placeholder:text-md"
                  placeholder={t('adultsHint')}
                  readOnly
                />
              </div>
            </div>

            <Drawer
              anchor="bottom"
              open={ageOpen}
              onClose={() => setAgeOpen(false)}
              PaperProps={{
                sx: {
                  borderTopLeftRadius: 32,
                  borderTopRightRadius: 32,
                  padding: 3,
                  width: '100%',
                  overflow: 'auto',
                  minHeight: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(10px)',
                },
              }}
            >
              <div className="flex flex-col gap-4 w-full h-full font-medium">
                <div className="flex items-center justify-between mb-8">
                  <p className="text-xl font-bold text-gray-800">{t('tourists')}</p>
                  <Button
                    onClick={() => setAgeOpen(false)}
                    sx={{ minWidth: 0, padding: 1, borderRadius: '12px', color: 'gray' }}
                  >
                    <CloseIcon />
                  </Button>
                </div>

                {/* Adults */}
                <div className="flex justify-between">
                  <Label className="flex flex-col gap-0 items-start">
                    <p className="font-semibold text-lg">{t('adults')}</p>
                    <p className="text-ring text-sm">{t('adults_info')}</p>
                  </Label>
                  <div className="flex items-center bg-gray-50 rounded-[18px] p-1 border border-gray-100">
                    <button
                      className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition-all text-gray-500 hover:text-[#007654]"
                      onClick={() => setAdults(prev => Math.max(prev - 1, 0))}
                    >
                      <RemoveIcon />
                    </button>
                    <span className="w-12 text-center font-bold text-gray-700 text-xl">{adults}</span>
                    <button
                      className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition-all text-gray-500 hover:text-[#007654]"
                      onClick={() => setAdults(prev => prev + 1)}
                    >
                      <AddIcon />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex justify-between mt-2">
                  <Label className="flex flex-col gap-0 items-start">
                    <p className="font-semibold text-lg">{t('children')}</p>
                    <p className="text-ring text-sm">{t('children_info')}</p>
                  </Label>
                  <div className="flex items-center bg-gray-50 rounded-[18px] p-1 border border-gray-100">
                    <button
                      className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition-all text-gray-500 hover:text-[#007654]"
                      onClick={() => setChildren(prev => Math.max(prev - 1, 0))}
                    >
                      <RemoveIcon />
                    </button>
                    <span className="w-12 text-center font-bold text-gray-700 text-xl">{children}</span>
                    <button
                      className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition-all text-gray-500 hover:text-[#007654]"
                      onClick={() => setChildren(prev => prev + 1)}
                    >
                      <AddIcon />
                    </button>
                  </div>
                </div>

                <div className="mt-auto grid grid-cols-1 gap-2">
                  <button
                    className="bg-green-600 rounded-3xl p-3 text-white cursor-pointer"
                    onClick={() => {
                      setSelectAge(adults + children);
                      setAgeOpen(false);
                    }}
                  >
                    {t('apply')}
                  </button>
                </div>
              </div>
            </Drawer>
          </div>

          {/* Search Button */}
          <div className="flex flex-col gap-2">
            <Link
              href={`/${locale}/sanatory`}
              className="bg-[#007654] hover:bg-[#008c64] text-white h-[64px] flex items-center justify-center rounded-[20px] text-center transition-all duration-300 shadow-xl shadow-[#007654]/10"
            >
              <p className="text-white font-bold text-lg">{t('search_tours')}</p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default TabsHotelMobile;
