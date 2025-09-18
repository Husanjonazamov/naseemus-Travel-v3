import Link from 'next/link';
// import formatDate from '@/shared/lib/formatDate';
import { formatDate } from 'date-fns';
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
  const t = useTranslations();
  const [openCity, setOpenCity] = useState(false);
  const [ageOpen, setAgeOpen] = useState(false);
  const [where, setWhere] = useState(false);
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
    c.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      {active === 'hotel' && (
        <div className="mt-10 bg-white shadow-sm py-4 gap-4 w-full max-w-[1200px] rounded-3xl grid grid-cols-4 items-center px-10 max-lg:hidden font-medium">
          <div className="relative gap-2 h-full ">
            <div
              onClick={() => {
                setOpenCity(!openCity), setSearch('');
              }}
              className="cursor-pointer flex flex-col gap-2"
            >
              <Label className="font-semibold text-md ">Направления</Label>
              <div className="relative">
                <Input
                  className="h-[60px] text-md placeholder:text-md"
                  placeholder="Страна, город"
                  value={selectedCity}
                  readOnly
                />
              </div>
            </div>

            {openCity && (
              <div
                className="fixed inset-0 z-40 "
                onClick={() => setOpenCity(false)}
              />
            )}

            {openCity && (
              <ArrowDropUpOutlinedIcon
                sx={{
                  position: 'absolute',
                  top: '85px',
                  zIndex: 60,
                  fontSize: '32px',
                  color: 'white',
                  filter: 'drop-shadow(0px 0px 0px rgba(0,0,0,0.3))',
                  left: '10px',
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
                    placeholder="Начните искать"
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
                      onClick={() => {
                        setSelectedCity(cityName);
                        setOpenCity(false);
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
            )}
          </div>

          <div className="relative gap-2 h-full ">
            <div
              onClick={() => {
                setDataOpen(!dataOpen);
              }}
              className="cursor-pointer flex flex-col gap-2"
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

            {dataOpen && (
              <div
                className="fixed inset-0 z-40 "
                onClick={() => setDataOpen(false)}
              />
            )}

            {dataOpen && (
              <ArrowDropUpOutlinedIcon
                sx={{
                  position: 'absolute',
                  top: '85px',
                  zIndex: 60,
                  fontSize: '32px',
                  color: 'white',
                  filter: 'drop-shadow(0px 0px 0px rgba(0,0,0,0.3))',
                  left: '10px',
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
                    placeholder="Когда"
                    value={
                      fromDate ? formatDate.format(fromDate, 'DD/MM/YYYY') : ''
                    }
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full text-black h-[50px]"
                    onClick={(e) => e.stopPropagation()}
                    onFocus={(e) => e.stopPropagation()}
                  />
                  <ArrowRightAltIcon
                    color="action"
                    sx={{ width: '28px', height: '28px' }}
                  />
                  <Input
                    placeholder="Выезд"
                    value={
                      toDate ? formatDate.format(toDate, 'DD/MM/YYYY') : ''
                    }
                    disabled={fromDate === undefined}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full text-black h-[50px]"
                    onClick={(e) => e.stopPropagation()}
                    onFocus={(e) => e.stopPropagation()}
                  />
                </div>
                <div className="flex gap-2 border-t-2 p-2 border-b-2 mt-5 border-t-secondary">
                  {/* <Calendar
                    mode="single"
                    className="border-r-2"
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
                    selected={toDate}
                    onSelect={setToDate}
                    disabled={(date: Date) => {
                      if (!fromDate) return true;
                      return date <= fromDate;
                    }}
                  /> */}
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
                    onClick={() => {
                      setDataOpen(false), setFromDate(undefined);
                      setToDate(undefined);
                    }}
                  >
                    Отмена
                  </button>
                  <button
                    className="bg-green-600 rounded-3xl text-white"
                    onClick={() => {
                      setDataOpen(false);
                      if (fromDate && toDate) {
                        setSelectData(
                          `${formatDate.format(fromDate, 'DD/MM/YYYY') + ' - ' + formatDate.format(toDate, 'DD/MM/YYYY')}`,
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
            )}
          </div>

          <div className="relative gap-2 h-full ">
            <div
              onClick={() => {
                setAgeOpen(!where);
              }}
              className="cursor-pointer flex flex-col gap-2"
            >
              <Label className="font-semibold text-md">Туристы</Label>
              <div className="relative">
                <Input
                  className="h-[60px] text-md placeholder:text-md"
                  placeholder="2 Вызрослых"
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
                  filter: 'drop-shadow(0px 0px 0px rgba(0,0,0,0.3))',
                  left: '10px',
                }}
              />
            )}

            {ageOpen && (
              <div
                className="fixed inset-0 z-40 "
                onClick={() => setAgeOpen(false)}
              />
            )}

            {ageOpen && (
              <div
                className="absolute top-[105px] border border-white shadow-2xl rounded-2xl bg-white z-50 p-2 px-4 w-96 font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between">
                  <Label className="flex flex-col gap-0 items-start">
                    <p className="font-semibold text-lg">Вызрослых</p>
                    <p className="text-ring text-sm">старше 13 лет</p>
                  </Label>
                  <div className="grid grid-cols-3 border justify-center items-center rounded-lg w-48">
                    <Button
                      variant={'ghost'}
                      className="h-full rounded-bl-lg rounded-br-none rounded-tr-none"
                      onClick={() => {
                        setAdults((prev) => (prev > 0 ? prev - 1 : prev));
                      }}
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
                      onClick={() => {
                        setAdults((prev) => prev + 1);
                      }}
                    >
                      <AddIcon className="text-green-600" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between mt-5">
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
                      onClick={() => {
                        setChildren((prev) => prev + 1);
                      }}
                    >
                      <AddIcon className="text-green-600" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="h-[25px]" />
            <Link
              href={'#'}
              className="bg-green-600 text-white h-[60px] flex items-center justify-center rounded-4xl text-center"
            >
              <p>Искать туры</p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default TabsHotel;
