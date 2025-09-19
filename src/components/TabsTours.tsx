import Link from 'next/link';
import { format as formatDate } from 'date-fns';
import Button from '@mui/material/Button';
import { Calendar } from './ui/calendar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import AddIcon from '@mui/icons-material/Add';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DoneIcon from '@mui/icons-material/Done';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslations } from 'next-intl';
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

const TabsTours = ({ active }: Props) => {
  const t = useTranslations("searchPage");
  const [openCity, setOpenCity] = useState(false);
  const [ageOpen, setAgeOpen] = useState(false);
  const [where, setWhere] = useState(false);
  const [dataOpen, setDataOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedWhere, setSelectedWhere] = useState('');
  const [searchWhere, setSearchWhere] = useState('');
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [selectData, setSelectData] = useState<string>();
  const [adults, setAdults] = useState<number>(0);
  const [children, setChildren] = useState<number>(0);
  const selectAge = adults + children;
  const [range, setRange] = useState<DateRange | undefined>();

  const [cities, setCities] = useState<City[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [filteredCitiesWhere, setFilteredCitiesWhere] = useState<City[]>([]);

  useEffect(() => {
    fetch(`${config.BASE_URL}/api/tour/`)
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

  // Search bilan filter qilish (From)
  useEffect(() => {
    const filtered = cities.filter(c =>
      c.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCities(filtered);
  }, [search, cities]);

  // Search bilan filter qilish (To)
  useEffect(() => {
    const filtered = cities.filter(c =>
      c.title.toLowerCase().includes(searchWhere.toLowerCase())
    );
    setFilteredCitiesWhere(filtered);
  }, [searchWhere, cities]);

  return (
    <>
      {active === 'tours' && (
        <div className="mt-10 bg-white shadow-sm py-4 gap-4 w-full max-w-[1200px] rounded-2xl grid grid-cols-5 items-center px-10 max-lg:hidden font-medium">
          
          {/* FROM CITY */}
          <div className="relative gap-2 h-full ">
            <div
              onClick={() => {
                setOpenCity(!openCity);
                setSearch('');
              }}
              className="cursor-pointer flex flex-col gap-2"
            >
              <Label className="font-semibold text-md ">{t("from")}</Label>
              <div className="relative">
                <Input
                  className="h-[60px] text-md placeholder:text-md"
                  placeholder={t("tashkent")}
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

            {openCity && <div className="fixed inset-0 z-40" onClick={() => setOpenCity(false)} />}

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
                    placeholder="Укажите город"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 text-black"
                  />
                </div>

                {filteredCities.length > 0 ? (
                  filteredCities.map((city) => (
                    <div
                      key={city.slug}
                      className="p-2 hover:bg-gray-200 rounded-lg text-black items-center cursor-pointer flex justify-between"
                      onClick={() => {
                        setSelectedCity(city.title);
                        setOpenCity(false);
                      }}
                    >
                      {city.title}
                      {city.title === selectedCity && (
                        <DoneIcon sx={{ width: '14px', height: '14px' }} />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-black">{t("noResults")}</div>
                )}
              </div>
            )}
          </div>

          {/* TO CITY */}
          <div className="relative gap-2 h-full ">
            <div
              onClick={() => {
                setWhere(!where);
                setSearchWhere('');
              }}
              className="cursor-pointer flex flex-col gap-2"
            >
              <Label className="font-semibold text-md ">{t("to")}</Label>
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

            {where && <div className="fixed inset-0 z-40 " onClick={() => setWhere(false)} />}

            {where && (
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

            {where && (
              <div
                className="absolute top-[105px] border border-white shadow-2xl rounded-2xl bg-white w-60 z-50 p-2"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative mb-2">
                  <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Укажите город"
                    value={searchWhere}
                    onChange={(e) => setSearchWhere(e.target.value)}
                    className="w-full pl-10 text-black"
                  />
                </div>

                {filteredCitiesWhere.length > 0 ? (
                  filteredCitiesWhere.map((city) => (
                    <div
                      key={city.slug}
                      className="p-2 hover:bg-gray-200 rounded-lg text-black items-center cursor-pointer flex justify-between"
                      onClick={() => {
                        setSelectedWhere(city.title);
                        setWhere(false);
                      }}
                    >
                      {city.title}
                      {city.title === selectedWhere && (
                        <DoneIcon sx={{ width: '14px', height: '14px' }} />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-black">{t("noResults")}</div>
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
              <Label className="font-semibold text-md">{t("departureDate")}</Label>
              <div className="relative">
                <Input
                  className="h-[60px] text-md placeholder:text-md"
                  placeholder={t("when")}
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
                    placeholder={t("from")}
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
                    placeholder={t("to")}
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
                    {t("exit")}
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
                    {t("apply")}
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
              <Label className="font-semibold text-md">{t("tourists")}</Label>
              <div className="relative">
                <Input
                  className="h-[60px] text-md placeholder:text-md"
                  placeholder={t("adults")}
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
                    <p className="font-semibold text-lg">{t("adults")}</p>
                    <p className="text-ring text-sm">{t("childrenHint")}</p>
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
              className="bg-green-600 text-white h-[60px] flex items-center justify-center rounded-2xl text-center"
            >
              <p>{t("searchTours")}</p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default TabsTours;
