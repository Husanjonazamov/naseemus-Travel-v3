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
  const t = useTranslations("searchPage");
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
  const [adults, setAdults] = useState<number>(2);
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
          
          {/* Qayerdan */}
          <div className="relative flex gap-2 h-full">
            <div
              onClick={() => setOpenCityMobile(!openCityMobile)}
              className="cursor-pointer flex flex-col w-full gap-2"
            >
              <Label className="font-semibold text-md">{t("from")}</Label>
              <div className="relative w-full">
                <Input
                  className="h-[60px] w-full text-md placeholder:text-md"
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
                  <p className="text-lg font-semibold">{t("selectCity")}</p>
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
                    placeholder={t("searchTours")}
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
                    <div className="p-2 text-black">{t("noResults")}</div>
                  )}
                </div>
              </div>
            </Drawer>
          </div>

          {/* Qayerga */}
          <div className="relative flex gap-2 h-full ">
            <div
              onClick={() => setWhereMobile(!whereMobile)}
              className="cursor-pointer flex flex-col gap-2 w-full"
            >
              <Label className="font-semibold text-md">{t("to")}</Label>
              <div className="relative">
                <Input
                  className="h-[60px] text-md placeholder:text-md"
                  placeholder={t("countryResort")}
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
                  <p className="text-lg font-semibold">{t("selectCity")}</p>
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
                    placeholder={t("searchTours")}
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
                    <div className="p-2 text-black">{t("noResults")}</div>
                  )}
                </div>
              </div>
            </Drawer>
          </div>

          {/* Jo‘nash sanasi */}
          <div className="relative flex gap-2 h-full">
            <div
              onClick={() => setDataOpenMobile(!dataOpenMobile)}
              className="cursor-pointer flex flex-col gap-2 w-full"
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
            {/* Drawer kodi xuddi yuqoridagi kabi */}
          </div>

          {/* Sayyohlar */}
          <div className="relative flex gap-2 h-full">
            <div
              onClick={() => setAgeOpen(!ageOpen)}
              className="cursor-pointer flex flex-col w-full gap-2"
            >
              <Label className="font-semibold text-md">{t("tourists")}</Label>
              <div className="relative">
                <Input
                  value={selectAge === 0 ? '' : selectAge}
                  className="h-[60px] text-md placeholder:text-md"
                  placeholder={t("twoAdults")}
                  readOnly
                />
              </div>
            </div>
            {/* Drawer kodi xuddi yuqoridagi kabi */}
          </div>

          <div className="flex flex-col gap-2">
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

export default TabsTourMobile;
