'use client';

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
import { useTranslations } from 'next-intl';

import { useState } from 'react';
import { DateRange } from 'react-day-picker';

interface Props {
  active: 'tours' | 'hotel';
}

const TabsHotelMobile = ({ active }: Props) => {
  const t = useTranslations('hotel');

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

  const cities = ['Самарканд', 'Бухара', 'Наваи', 'Бишкек', 'Казан', 'Астана'];
  const filteredCities = cities.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  const formatDateString = (date?: Date) =>
    date ? format(date, 'dd/MM/yyyy') : '';

  return (
    <>
      {active === 'hotel' && (
        <div className="mt-20 bg-white shadow-sm py-4 gap-4 w-full rounded-3xl grid grid-cols-1 items-center px-10 min-lg:hidden font-medium">

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
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  padding: 2,
                  width: '100%',
                  overflow: 'auto',
                  minHeight: '70%',
                },
              }}
            >
              <div className="flex flex-col gap-4 w-full font-medium">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold">{t('directions')}</p>
                  <Button
                    variant="outlined"
                    className="rounded-full h-[40px] w-[40px]"
                    onClick={() => setOpenCityMobile(false)}
                  >
                    <CloseIcon sx={{ color: 'black' }} />
                  </Button>
                </div>
                <div className="relative">
                  <Input
                    placeholder={t('start_search')}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 text-black h-[60px]"
                    onClick={(e) => e.stopPropagation()}
                    onFocus={(e) => e.stopPropagation()}
                  />
                  <SearchIcon
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '12px',
                      transform: 'translateY(-50%)',
                      color: 'gray',
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2 overflow-y-auto max-h-[60vh]">
                  {filteredCities.length > 0 ? (
                    filteredCities.map((cityName) => (
                      <div
                        key={cityName}
                        className="p-2 hover:bg-gray-200 rounded-lg text-black items-center cursor-pointer flex justify-between"
                        onClick={() => {
                          setSelectedCity(cityName);
                          setOpenCityMobile(false);
                        }}
                      >
                        {cityName}
                        {cityName === selectedCity && (
                          <DoneIcon sx={{ width: '14px', height: '14px' }} />
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-black">{t('no_results')}</div>
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
              <Label className="font-semibold text-md">{t('departure_date')}</Label>
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
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  padding: 2,
                  width: '100vw',
                  maxHeight: '85vh',
                  overflow: 'auto',
                },
              }}
            >
              <div className="flex flex-col gap-4 w-full font-medium">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold">{t('departure_date')}</p>
                  <Button
                    variant="outlined"
                    className="rounded-full h-[40px] w-[40px]"
                    onClick={() => setDataOpenMobile(false)}
                  >
                    <CloseIcon sx={{ color: 'black' }} />
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

                <Calendar
                  className="w-full"
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

                <div className="grid grid-cols-1 mt-5 gap-2">
                  <button
                    className="bg-green-600 rounded-3xl p-3 text-white"
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
                  placeholder={t('adults_default')}
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
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  padding: 2,
                  width: '100%',
                  overflow: 'auto',
                  minHeight: '70%',
                },
              }}
            >
              <div className="flex flex-col gap-4 w-full h-full font-medium">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold">{t('tourists')}</p>
                  <Button
                    variant="outlined"
                    className="rounded-full h-[40px] w-[40px]"
                    onClick={() => setAgeOpen(false)}
                  >
                    <CloseIcon sx={{ color: 'black' }} />
                  </Button>
                </div>

                {/* Adults */}
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

                {/* Children */}
                <div className="flex justify-between mt-2">
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
              href={'#'}
              className="bg-green-600 text-white h-[60px] flex items-center justify-center rounded-4xl text-center"
            >
              <p>{t('search_tours')}</p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default TabsHotelMobile;
