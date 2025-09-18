'use client';

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

import { useState } from 'react';
import { DateRange } from 'react-day-picker';

interface Props {
  active: 'tours' | 'hotel';
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

  const cities = ['Самарканд', 'Бухара', 'Наваи', 'Бишкек', 'Казан', 'Астана'];
  const filteredCities = cities.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  const formatDateString = (date?: Date) =>
    date ? format(date, 'dd/MM/yyyy') : '';

  return (
    <>
      {active === 'hotel' && (
        <div className="mt-10 bg-white shadow-sm py-4 gap-4 w-full max-w-[1200px] rounded-3xl grid grid-cols-4 items-center px-10 max-lg:hidden font-medium">

          {/* City Selection */}
          <div className="relative gap-2 h-full ">
            <div
              onClick={() => { setOpenCity(!openCity); setSearch(''); }}
              className="cursor-pointer flex flex-col gap-2"
            >
              <Label className="font-semibold text-md">{t('directions')}</Label>
              <div className="relative">
                <Input
                  className="h-[60px] text-md placeholder:text-md"
                  placeholder={t('placeholder_city')}
                  value={selectedCity}
                  readOnly
                />
              </div>
            </div>

            {openCity && <div className="fixed inset-0 z-40" onClick={() => setOpenCity(false)} />}
            {openCity && (
              <ArrowDropUpOutlinedIcon
                sx={{
                  position: 'absolute',
                  top: '85px',
                  zIndex: 60,
                  fontSize: '32px',
                  color: 'white',
                  left: '10px'
                }}
              />
            )}

            {openCity && (
              <div
                className="absolute top-[105px] border border-white shadow-2xl rounded-2xl bg-white w-60 z-50 p-2"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative mb-2">
                  <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder={t('start_search')}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 text-black"
                    onClick={(e) => e.stopPropagation()}
                    onFocus={(e) => e.stopPropagation()}
                  />
                </div>

                {filteredCities.length > 0 ? (
                  filteredCities.map((cityName) => (
                    <div
                      key={cityName}
                      className="p-2 hover:bg-gray-200 rounded-lg text-black items-center cursor-pointer flex justify-between"
                      onClick={() => { setSelectedCity(cityName); setOpenCity(false); }}
                    >
                      {cityName}
                      {cityName === selectedCity && <DoneIcon sx={{ width: '14px', height: '14px' }} />}
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-black">{t('no_results')}</div>
                )}
              </div>
            )}
          </div>

          {/* Date Selection */}
          <div className="relative gap-2 h-full ">
            <div
              onClick={() => setDataOpen(!dataOpen)}
              className="cursor-pointer flex flex-col gap-2"
            >
              <Label className="font-semibold text-md">{t('start_date')}</Label>
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
                    pointerEvents: 'none'
                  }}
                />
              </div>
            </div>

            {dataOpen && <div className="fixed inset-0 z-40" onClick={() => setDataOpen(false)} />}
            {dataOpen && (
              <ArrowDropUpOutlinedIcon
                sx={{
                  position: 'absolute',
                  top: '85px',
                  zIndex: 60,
                  fontSize: '32px',
                  color: 'white',
                  left: '10px'
                }}
              />
            )}

            {dataOpen && (
              <div
                className="absolute top-[105px] border border-white shadow-2xl rounded-2xl bg-white z-50 p-2"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex gap-2 items-center">
                  <Input
                    placeholder={t('when')}
                    value={formatDateString(fromDate)}
                    onClick={(e) => e.stopPropagation()}
                    onFocus={(e) => e.stopPropagation()}
                    className="w-full text-black h-[50px]"
                  />
                  <ArrowRightAltIcon color="action" sx={{ width: '28px', height: '28px' }} />
                  <Input
                    placeholder={t('departure')}
                    value={formatDateString(toDate)}
                    disabled={!fromDate}
                    onClick={(e) => e.stopPropagation()}
                    onFocus={(e) => e.stopPropagation()}
                    className="w-full text-black h-[50px]"
                  />
                </div>

                <div className="flex gap-2 border-t-2 p-2 border-b-2 mt-5 border-t-secondary">
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
                  />
                </div>

                <div className="grid grid-cols-2 mt-5 gap-2">
                  <button
                    className="bg-green-500/40 rounded-3xl p-3 text-green-600 cursor-pointer"
                    onClick={() => { setDataOpen(false); setFromDate(undefined); setToDate(undefined); }}
                  >
                    {t('cancel')}
                  </button>
                  <button
                    className="bg-green-600 rounded-3xl text-white"
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
              </div>
            )}
          </div>

          {/* Tourists Selection */}
          <div className="relative gap-2 h-full ">
            <div
              onClick={() => setAgeOpen(!ageOpen)}
              className="cursor-pointer flex flex-col gap-2"
            >
              <Label className="font-semibold text-md">{t('tourists')}</Label>
              <div className="relative">
                <Input
                  className="h-[60px] text-md placeholder:text-md"
                  placeholder={`${adults} ${t('adults')}, ${children} ${t('children')}`}
                  value={selectAge === 0 ? '' : selectAge}
                  readOnly
                />
              </div>
            </div>

            {ageOpen && (
              <ArrowDropUpOutlinedIcon
                sx={{
                  position: 'absolute',
                  top: '85px',
                  zIndex: 60,
                  fontSize: '32px',
                  color: 'white',
                  left: '10px'
                }}
              />
            )}

            {ageOpen && <div className="fixed inset-0 z-40" onClick={() => setAgeOpen(false)} />}

            {ageOpen && (
              <div
                className="absolute top-[105px] border border-white shadow-2xl rounded-2xl bg-white z-50 p-2 px-4 w-96 font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between">
                  <Label className="flex flex-col gap-0 items-start">
                    <p className="font-semibold text-lg">{t('adults')}</p>
                    <p className="text-ring text-sm">{t('adults_info')}</p>
                  </Label>
                  <div className="grid grid-cols-3 border justify-center items-center rounded-lg w-48">
                    <Button variant="ghost" onClick={() => setAdults(prev => Math.max(prev - 1, 0))}>
                      <RemoveIcon className="text-green-600" />
                    </Button>
                    <Button variant="ghost" className="rounded-none border-r-2 h-full border-l-2 text-lg">
                      {adults}
                    </Button>
                    <Button variant="ghost" onClick={() => setAdults(prev => prev + 1)}>
                      <AddIcon className="text-green-600" />
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between mt-5">
                  <Label className="flex flex-col gap-0 items-start">
                    <p className="font-semibold text-lg">{t('children')}</p>
                    <p className="text-ring text-sm">{t('children_info')}</p>
                  </Label>
                  <div className="grid grid-cols-3 border justify-center items-center rounded-lg w-48">
                    <Button variant="ghost" onClick={() => setChildren(prev => Math.max(prev - 1, 0))}>
                      <RemoveIcon className="text-green-600" />
                    </Button>
                    <Button variant="ghost" className="rounded-none border-r-2 h-full border-l-2 text-lg">
                      {children}
                    </Button>
                    <Button variant="ghost" onClick={() => setChildren(prev => prev + 1)}>
                      <AddIcon className="text-green-600" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <div className="flex flex-col gap-2">
            <div className="h-[25px]" />
            <Link href={'#'} className="bg-green-600 text-white h-[60px] flex items-center justify-center rounded-4xl text-center">
              <p>{t('search_tours')}</p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default TabsHotel;
