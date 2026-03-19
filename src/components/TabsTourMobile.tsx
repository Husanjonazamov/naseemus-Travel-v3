"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import { useLocale, useTranslations } from 'next-intl';
import config from '../config';

import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';

import { Calendar } from './ui/calendar';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface City {
  title: string;
  slug: string;
}

interface Props {
  active: 'tours' | 'hotel';
}

const TabsTourMobile = ({ active }: Props) => {
  const t = useTranslations('searchPage');
  const locale = useLocale();

  const [openCityMobile, setOpenCityMobile] = useState(false);
  const [whereMobile, setWhereMobile] = useState(false);
  const [dataOpenMobile, setDataOpenMobile] = useState(false);
  const [ageOpen, setAgeOpen] = useState(false);

  const [cities, setCities] = useState<City[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [filteredCitiesWhere, setFilteredCitiesWhere] = useState<City[]>([]);

  const [search, setSearch] = useState('');
  const [searchWhere, setSearchWhere] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedWhere, setSelectedWhere] = useState('');

  const [range, setRange] = useState<DateRange | undefined>();
  const [selectData, setSelectData] = useState<string>();

  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [selectAge, setSelectAge] = useState<number>(0);

  // Cities fetch
  useEffect(() => {
    fetch(`${config.BASE_URL}/api/tour/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status && data.data.results) {
          const cityData = data.data.results.map((tour: any) => ({
            title: tour.title,
            slug: tour.slug,
          }));
          setCities(cityData);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Search filter (from)
  useEffect(() => {
    const filtered = cities.filter((c) =>
      c.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCities(filtered);
  }, [search, cities]);

  // Search filter (to)
  useEffect(() => {
    const filtered = cities.filter((c) =>
      c.title.toLowerCase().includes(searchWhere.toLowerCase())
    );
    setFilteredCitiesWhere(filtered);
  }, [searchWhere, cities]);

  return (
    <>
      {active === 'tours' && (
        <div className="mt-12 bg-white/95 backdrop-blur-xl shadow-[0_24px_48px_-12px_rgba(0,0,0,0.1)] border border-white/20 p-6 rounded-[24px] w-full grid grid-cols-1 gap-6 lg:hidden font-medium">

          {/* Qayerdan */}
          <div className="relative flex gap-2 h-full">
            <div
              onClick={() => setOpenCityMobile(true)}
              className="cursor-pointer flex flex-col w-full gap-2"
            >
              <Label className="font-semibold text-md">{t('from')}</Label>
              <div className="relative w-full">
                <Input
                  className="h-[60px] w-full text-md placeholder:text-md"
                  placeholder={t('tashkent')}
                  value={selectedCity}
                  readOnly
                />
                <LocationOnIcon
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

            {/* Drawer From */}
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
                  <p className="text-xl font-bold text-gray-800">{t('start_search')}</p>
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
                    placeholder={t('searchTours')}
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
                    <div className="p-6 text-center text-gray-400 text-sm">{t('noResults')}</div>
                  )}
                </div>
              </div>
            </Drawer>
          </div>

          {/* Qayerga */}
          <div className="relative flex gap-2 h-full">
            <div
              onClick={() => setWhereMobile(true)}
              className="cursor-pointer flex flex-col gap-2 w-full"
            >
              <Label className="font-semibold text-md">{t('to')}</Label>
              <div className="relative">
                <Input
                  className="h-[60px] text-md placeholder:text-md"
                  placeholder={t('countryResort')}
                  value={selectedWhere}
                  readOnly
                />
                <AirplanemodeActiveIcon
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

            {/* Drawer To */}
            <Drawer
              anchor="bottom"
              open={whereMobile}
              onClose={() => setWhereMobile(false)}
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
                  <p className="text-xl font-bold text-gray-800">{t('start_search')}</p>
                  <Button
                    onClick={() => setWhereMobile(false)}
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
                    placeholder={t('searchTours')}
                    value={searchWhere}
                    onChange={(e) => setSearchWhere(e.target.value)}
                    className="w-full pl-10 h-14 bg-gray-50 border-none rounded-2xl text-md focus-visible:ring-1 focus-visible:ring-[#007654]/20"
                  />
                </div>
                <div className="flex flex-col gap-2 overflow-y-auto max-h-[60vh] px-1">
                  {filteredCitiesWhere.length > 0 ? (
                    filteredCitiesWhere.map((city) => (
                      <div
                        key={city.slug}
                        className="group p-4 hover:bg-[#dcfae7]/40 rounded-2xl text-gray-700 items-center cursor-pointer flex justify-between transition-all duration-200"
                        onClick={() => {
                          setSelectedWhere(city.title);
                          setWhereMobile(false);
                        }}
                      >
                        <div className="flex flex-col">
                          <span className="font-bold text-base group-hover:text-[#007654] transition-colors">{city.title}</span>
                          <span className="text-xs text-gray-400">Destination</span>
                        </div>
                        {city.title === selectedWhere && (
                          <div className="bg-[#007654] rounded-full p-0.5">
                            <DoneIcon sx={{ width: '14px', height: '14px', color: 'white' }} />
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-400 text-sm">{t('noResults')}</div>
                  )}
                </div>
              </div>
            </Drawer>
          </div>

          {/* Jo‘nash sanasi */}
          <div className="relative flex gap-2 h-full">
            <div
              onClick={() => setDataOpenMobile(true)}
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

            {/* Drawer Calendar */}
            <Drawer
              anchor="bottom"
              open={dataOpenMobile}
              onClose={() => setDataOpenMobile(false)}
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
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-xl font-bold text-gray-800">{t('departureDate')}</p>
                  <Button
                    onClick={() => setDataOpenMobile(false)}
                    sx={{ minWidth: 0, padding: 1, borderRadius: '12px', color: 'gray' }}
                  >
                    <CloseIcon />
                  </Button>
                </div>
                <div className="flex justify-center mb-6">
                  <Calendar
                    mode="range"
                    selected={range}
                    onSelect={(val) => {
                      setRange(val);
                      if (val?.from && val?.to) {
                        setSelectData(
                          `${val.from.toLocaleDateString()} - ${val.to.toLocaleDateString()}`
                        );
                        setDataOpenMobile(false);
                      }
                    }}
                    className="rounded-3xl border border-gray-100 p-4"
                  />
                </div>
              </div>
            </Drawer>
          </div>

          {/* Sayyohlar */}
          <div className="relative flex gap-2 h-full">
            <div
              onClick={() => setAgeOpen(true)}
              className="cursor-pointer flex flex-col w-full gap-2"
            >
              <Label className="font-semibold text-md">{t('tourists')}</Label>
              <div className="relative">
                <Input
                  value={selectAge === 0 ? '' : selectAge}
                  className="h-[60px] text-md placeholder:text-md"
                  placeholder={t('twoAdults')}
                  readOnly
                />
              </div>
            </div>

            {/* Drawer Tourists */}
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
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between mb-8">
                  <p className="text-xl font-bold text-gray-800">{t('tourists')}</p>
                  <Button
                    onClick={() => setAgeOpen(false)}
                    sx={{ minWidth: 0, padding: 1, borderRadius: '12px', color: 'gray' }}
                  >
                    <CloseIcon />
                  </Button>
                </div>

                <div className="flex items-center justify-between mb-8 group">
                  <div className="flex flex-col">
                    <span className="font-bold text-lg text-gray-700">{t('adults')}</span>
                    <span className="text-xs text-gray-400">{t('twoAdults')}</span>
                  </div>
                  <div className="flex items-center bg-gray-50 rounded-[18px] p-1 border border-gray-100">
                    <button
                      className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition-all text-gray-500 hover:text-[#007654]"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                    >
                      <RemoveIcon />
                    </button>
                    <span className="w-12 text-center font-bold text-gray-700 text-xl">{adults}</span>
                    <button
                      className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition-all text-gray-500 hover:text-[#007654]"
                      onClick={() => setAdults(adults + 1)}
                    >
                      <AddIcon />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-10 group">
                  <div className="flex flex-col">
                    <span className="font-bold text-lg text-gray-700">{t('children')}</span>
                    <span className="text-xs text-gray-400">до 13 лет</span>
                  </div>
                  <div className="flex items-center bg-gray-50 rounded-[18px] p-1 border border-gray-100">
                    <button
                      className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition-all text-gray-500 hover:text-[#007654]"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                    >
                      <RemoveIcon />
                    </button>
                    <span className="w-12 text-center font-bold text-gray-700 text-xl">{children}</span>
                    <button
                      className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition-all text-gray-500 hover:text-[#007654]"
                      onClick={() => setChildren(children + 1)}
                    >
                      <AddIcon />
                    </button>
                  </div>
                </div>

                <button
                  className="w-full bg-[#007654] hover:bg-[#008c64] shadow-lg shadow-[#007654]/20 rounded-2xl p-4 text-white font-bold transition-all duration-200"
                  onClick={() => {
                    setSelectAge(adults + children);
                    setAgeOpen(false);
                  }}
                >
                  {t('searchTours')}
                </button>
              </div>
            </Drawer>
          </div>

          {/* Search button */}
          <div className="flex flex-col gap-2">
            <Link
              href={`/${locale}/tour`}
              className="bg-[#007654] hover:bg-[#008c64] text-white h-[64px] flex items-center justify-center rounded-[20px] text-center transition-all duration-300 shadow-xl shadow-[#007654]/10"
            >
              <p className="text-white font-bold text-lg">{t('searchTours')}</p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default TabsTourMobile;
