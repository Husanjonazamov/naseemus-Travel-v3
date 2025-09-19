'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import { useTranslations } from 'next-intl';
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
        <div className="mt-20 bg-white shadow-sm py-4 gap-4 w-full rounded-2xl grid grid-cols-1 items-center px-10 min-lg:hidden font-medium">
          
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
                  <p className="text-lg font-semibold">{t('start_search')}</p>
                  <Button onClick={() => setOpenCityMobile(false)}>
                    <CloseIcon sx={{ color: 'black' }} />
                  </Button>
                </div>
                <div className="relative">
                  <Input
                    placeholder={t('searchTours')}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 text-black h-[60px]"
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
                    filteredCities.map((city) => (
                      <div
                        key={city.slug}
                        className="p-2 hover:bg-gray-200 rounded-lg text-black flex justify-between cursor-pointer"
                        onClick={() => {
                          setSelectedCity(city.title);
                          setOpenCityMobile(false);
                        }}
                      >
                        {city.title}
                        {city.title === selectedCity && (
                          <DoneIcon sx={{ width: '14px', height: '14px' }} />
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-black">{t('noResults')}</div>
                  )}
                </div>
              </div>
            </Drawer>
          </div>

          {/* Qayerga */}
          <div className="relative flex gap-2 h-full ">
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
                  <p className="text-lg font-semibold">{t('start_search')}</p>
                  <Button onClick={() => setWhereMobile(false)}>
                    <CloseIcon sx={{ color: 'black' }} />
                  </Button>
                </div>
                <div className="relative">
                  <Input
                    placeholder={t('searchTours')}
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
                    filteredCitiesWhere.map((city) => (
                      <div
                        key={city.slug}
                        className="p-2 hover:bg-gray-200 rounded-lg text-black flex justify-between cursor-pointer"
                        onClick={() => {
                          setSelectedWhere(city.title);
                          setWhereMobile(false);
                        }}
                      >
                        {city.title}
                        {city.title === selectedWhere && (
                          <DoneIcon sx={{ width: '14px', height: '14px' }} />
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-black">{t('noResults')}</div>
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
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  padding: 2,
                  width: '100%',
                  overflow: 'auto',
                  minHeight: '70%',
                },
              }}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold">{t('departureDate')}</p>
                  <Button onClick={() => setDataOpenMobile(false)}>
                    <CloseIcon sx={{ color: 'black' }} />
                  </Button>
                </div>
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
                />
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
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  padding: 2,
                  width: '100%',
                  overflow: 'auto',
                  minHeight: '50%',
                },
              }}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold">{t('tourists')}</p>
                  <Button onClick={() => setAgeOpen(false)}>
                    <CloseIcon sx={{ color: 'black' }} />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <p>{t('adults')}</p>
                  <div className="flex items-center gap-2">
                    <Button color='success' onClick={() => setAdults(Math.max(1, adults - 1))}>
                      <RemoveIcon />
                    </Button>
                    <span>{adults}</span>
                    <Button color='success' onClick={() => setAdults(adults + 1)}>
                      <AddIcon />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p>{t('children')}</p>
                  <div className="flex items-center gap-2">
                    <Button color='success' onClick={() => setChildren(Math.max(0, children - 1))}>
                      <RemoveIcon />
                    </Button>
                    <span>{children}</span>
                    <Button color='success' onClick={() => setChildren(children + 1)}>
                      <AddIcon />
                    </Button>
                  </div>
                </div>

               {/* <Button
                    variant="contained"
                    color="success"
                    sx={{
                      backgroundColor: '#16a34a', // tailwind green-600
                      '&:hover': {
                        backgroundColor: '#15803d', // green-700
                      },
                      borderRadius: '12px',
                      height: '48px',
                      fontSize: '14px',
                    }}
                  >
                    {t('start_search')}
                  </Button> */}

              </div>
            </Drawer>
          </div>

          {/* Search button */}
          <div className="flex flex-col gap-2">
            <Link
              href={'#'}
              className="bg-green-600 text-white h-[60px] flex items-center justify-center rounded-2xl text-center"
            >
              <p>{t('searchTours')}</p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default TabsTourMobile;
