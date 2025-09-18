import Link from 'next/link';
import { formatDate } from 'date-fns';
import Button from '@mui/material/Button';
import { Calendar } from './ui/calendar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import AddIcon from '@mui/icons-material/Add';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import LocationOnIcon from '@mui/icons-material/LocationOn';
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

const TabsTourMobile = ({ active }: Props) => {
  const t = useTranslations();
  const [openCityMobile, setOpenCityMobile] = useState(false);
  const [ageOpen, setAgeOpen] = useState(false);
  const [dataOpenMobile, setDataOpenMobile] = useState(false);
  const [whereMobile, setWhereMobile] = useState(false);
  const [selectAge, setSelectAge] = useState<number>(0);
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedWhere, setSelectedWhere] = useState('');
  const [searchWhere, setSearchWhere] = useState('');
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [selectData, setSelectData] = useState<string>();
  const [adults, setAdults] = useState<number>(0);
  const [range, setRange] = useState<DateRange | undefined>();
  const [children, setChildren] = useState<number>(0);

  const cities = ['Самарканд', 'Бухара', 'Наваи', 'Бишкек', 'Казан', 'Астана'];
  const filteredCities = cities.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredCitiesWhere = cities.filter((c) =>
    c.toLowerCase().includes(searchWhere.toLowerCase()),
  );

  return (
    <>
      {active === 'tours' && (
        <div className="mt-20 bg-white shadow-sm py-4 gap-4 w-full rounded-2xl grid grid-cols-1 items-center px-10 min-lg:hidden font-medium">
          <div className="relative flex gap-2 h-full">
            <div
              onClick={() => setOpenCityMobile(!openCityMobile)}
              className="cursor-pointer flex flex-col w-full gap-2"
            >
              <Label className="font-semibold text-md ">Откуда</Label>
              <div className="relative w-full">
                <Input
                  className="h-[60px] w-full text-md placeholder:text-md"
                  placeholder="Ташкент"
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
                  <p className="text-lg font-semibold">{t('Выберите город')}</p>
                  <Button
                    variant={'outline'}
                    className="rounded-full h-[40px] w-[40px] cursor-pointer"
                    onClick={() => setOpenCityMobile(false)}
                  >
                    <CloseIcon sx={{ color: 'black' }} />
                  </Button>
                </div>
                <div className="relative">
                  <Input
                    placeholder="Укажите город"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 text-black h-[60px]"
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
                    <div className="p-2 text-black">Hech narsa topilmadi</div>
                  )}
                </div>
              </div>
            </Drawer>
          </div>

          <div className="relative flex gap-2 h-full ">
            <div
              onClick={() => setWhereMobile(!whereMobile)}
              className="cursor-pointer flex flex-col gap-2 w-full"
            >
              <Label className="font-semibold text-md">Куда</Label>
              <div className="relative">
                <Input
                  className="h-[60px] text-md placeholder:text-md"
                  placeholder="Страна, курорт"
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
            <Drawer
              anchor="bottom"
              className=""
              onClose={() => setWhereMobile(false)}
              open={whereMobile}
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
                  <p className="text-lg font-semibold">{t('Выберите город')}</p>
                  <Button
                    variant={'outline'}
                    className="rounded-full h-[40px] w-[40px] cursor-pointer"
                    onClick={() => setWhereMobile(false)}
                  >
                    <CloseIcon sx={{ color: 'black' }} />
                  </Button>
                </div>
                <div className="relative">
                  <Input
                    placeholder={t('Поиск')}
                    value={searchWhere}
                    onChange={(e) => setSearchWhere(e.target.value)}
                    className="w-full pl-12 text-base h-[60px]"
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
                  {filteredCitiesWhere.length > 0 ? (
                    filteredCitiesWhere.map((cityName) => (
                      <div
                        key={cityName}
                        className="p-2 hover:bg-gray-200 rounded-lg text-black items-center cursor-pointer flex justify-between"
                        onClick={() => {
                          setSelectedWhere(cityName);
                          setWhereMobile(false);
                        }}
                      >
                        {cityName}
                        {cityName === selectedWhere && (
                          <DoneIcon sx={{ width: '14px', height: '14px' }} />
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-black">Hech narsa topilmadi</div>
                  )}
                </div>
              </div>
            </Drawer>
          </div>

          <div className="relative flex gap-2 h-full">
            <div
              onClick={() => {
                setDataOpenMobile(!dataOpenMobile);
              }}
              className="cursor-pointer flex flex-col gap-2 w-full"
            >
              <Label className="font-semibold text-md">Дата отправления</Label>
              <div className="relative">
                <Input
                  className="h-[60px] text-md placeholder:text-md"
                  placeholder="Когда"
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
                setDataOpenMobile(false),
                  setFromDate(undefined),
                  setToDate(undefined);
              }}
              PaperProps={{
                sx: {
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  padding: 2,
                  width: '100vw',
                  maxHeight: '95vh',
                  overflow: 'auto',
                },
              }}
            >
              <div className="flex flex-col gap-4 w-full font-medium">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold">
                    {t('Дата отправления')}
                  </p>
                  <Button
                    variant={'outline'}
                    className="rounded-full h-[40px] w-[40px] cursor-pointer"
                    onClick={() => setDataOpenMobile(false)}
                  >
                    <CloseIcon sx={{ color: 'black' }} />
                  </Button>
                </div>
                <div className="flex flex-row gap-2">
                  <Input
                    placeholder="Когда"
                    value={
                      fromDate ? formatDate.format(fromDate, 'DD/MM/YYYY') : ''
                    }
                    readOnly
                    className={clsx(
                      'w-full text-black h-[50px]',
                      !fromDate && 'border border-red-600',
                    )}
                    onClick={(e) => e.stopPropagation()}
                    onFocus={(e) => e.stopPropagation()}
                  />
                  <ArrowRightAltIcon
                    color="action"
                    sx={{ width: '28px', height: '28px' }}
                    className="self-center mx-2"
                  />
                  <Input
                    placeholder="Выезд"
                    value={
                      toDate ? formatDate.format(toDate, 'DD/MM/YYYY') : ''
                    }
                    disabled={!fromDate}
                    readOnly
                    className={clsx(
                      'w-full text-black h-[50px]',
                      fromDate && 'border border-red-600',
                    )}
                    onClick={(e) => e.stopPropagation()}
                    onFocus={(e) => e.stopPropagation()}
                  />
                </div>
                <div className="grid grid-cols-1 mt-4">
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
                  {/* <Calendar
                    mode="single"
                    className="w-full max-sm:hidden"
                    selected={fromDate}
                    onSelect={setFromDate}
                    disabled={(date: Date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today;
                    }}
                  />
                  <Calendar
                    mode="single"
                    className="w-full max-sm:hidden"
                    selected={toDate}
                    onSelect={setToDate}
                    disabled={(date: Date) => {
                      if (!fromDate) return true;
                      return date <= fromDate;
                    }}
                  /> */}
                  {/* {!fromDate && (
                    <Calendar
                      mode="single"
                      className="w-full h-auto min-sm:hidden"
                      selected={fromDate}
                      onSelect={setFromDate}
                      disabled={(date: Date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today;
                      }}
                    />
                  )}
                  {fromDate && (
                    <Calendar
                      mode="single"
                      className="w-full min-sm:hidden"
                      selected={toDate}
                      onSelect={setToDate}
                      disabled={(date: Date) => {
                        if (!fromDate) return true;
                        return date <= fromDate;
                      }}
                    />
                  )} */}
                </div>
                <div className="grid grid-cols-1 mt-0 gap-2">
                  <button
                    className="bg-green-600 rounded-3xl p-3 text-white"
                    onClick={() => {
                      setDataOpenMobile(false);
                      setFromDate(undefined);
                      setToDate(undefined);
                      if (fromDate && toDate) {
                        setSelectData(
                          `${formatDate.format(fromDate, 'DD/MM/YYYY')} - ${formatDate.format(toDate, 'DD/MM/YYYY')}`,
                        );
                      } else {
                        setSelectData('');
                      }
                    }}
                  >
                    Применять
                  </button>
                </div>
              </div>
            </Drawer>
          </div>

          <div className="relative flex gap-2 h-full">
            <div
              onClick={() => setAgeOpen(!ageOpen)}
              className="cursor-pointer flex flex-col w-full gap-2"
            >
              <Label className="font-semibold text-md">Туристы</Label>
              <div className="relative">
                <Input
                  value={selectAge === 0 ? '' : selectAge}
                  className="h-[60px] text-md placeholder:text-md"
                  placeholder="2 Вызрослых"
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
                  <p className="text-lg font-semibold">{t('Туристы')}</p>
                  <Button
                    variant={'outline'}
                    className="rounded-full h-[40px] w-[40px] cursor-pointer"
                    onClick={() => setAgeOpen(false)}
                  >
                    <CloseIcon sx={{ color: 'black' }} />
                  </Button>
                </div>
                <div className="flex justify-between">
                  <Label className="flex flex-col gap-0 items-start">
                    <p className="font-semibold text-lg">2 Вызрослых</p>
                    <p className="text-ring text-sm">старше 13 лет</p>
                  </Label>
                  <div className="grid grid-cols-3 border justify-center items-center rounded-lg w-48">
                    <Button
                      variant={'ghost'}
                      className="h-full rounded-tl-lg rounded-bl-lg rounded-br-none rounded-tr-none"
                      onClick={() =>
                        setAdults((prev) => (prev > 0 ? prev - 1 : prev))
                      }
                    >
                      <RemoveIcon className="text-green-600" />
                    </Button>
                    <Button
                      variant={'ghost'}
                      className="rounded-none border-r-2 h-full border-l-2 text-lg"
                    >
                      {adults}
                    </Button>
                    <Button
                      variant={'ghost'}
                      className="h-full rounded-tl-none rounded-bl-none rounded-br-lg rounded-tr-lg"
                      onClick={() =>
                        setAdults((prev) => (prev === 2 ? prev : prev + 1))
                      }
                    >
                      <AddIcon className="text-green-600" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <Label className="flex flex-col gap-0 items-start">
                    <p className="font-semibold text-lg">Дети</p>
                    <p className="text-ring text-sm">до 13 лет</p>
                  </Label>
                  <div className="grid grid-cols-3 border justify-center items-center rounded-lg w-48">
                    <Button
                      variant={'ghost'}
                      className="h-full rounded-tl-lg rounded-bl-lg rounded-br-none rounded-tr-none"
                      onClick={() =>
                        setChildren((prev) => (prev > 0 ? prev - 1 : prev))
                      }
                    >
                      <RemoveIcon className="text-green-600" />
                    </Button>
                    <Button
                      variant={'ghost'}
                      className="rounded-none border-r-2 h-full border-l-2 text-lg"
                    >
                      {children}
                    </Button>
                    <Button
                      variant={'ghost'}
                      className="h-full rounded-tl-none rounded-bl-none rounded-br-lg rounded-tr-lg"
                      onClick={() => setChildren((prev) => prev + 1)}
                    >
                      <AddIcon className="text-green-600" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-auto grid grid-cols-1 gap-2">
                <button
                  className="bg-green-600 rounded-2xl p-3 text-white cursor-pointer"
                  onClick={() => {
                    setSelectAge(adults + children);
                    setAgeOpen(false);
                  }}
                >
                  Применять
                </button>
              </div>
            </Drawer>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href={'#'}
              className="bg-green-600 text-white h-[60px] flex items-center justify-center rounded-2xl text-center"
            >
              <p>Искать туры</p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default TabsTourMobile;
