export interface Tour {
  name: string;
  price: string;
  desc: string;
  image: string;
}

const toursData: Tour[] = [
  {
    name: "Samarqand va Buxoro Safari",
    price: "$599 / kishi",
    desc: "Ushbu tur orqali siz qadimiy Samarqand va Buxoro shaharlarining tarixiy obidalarini, madaniy merosini va milliy an’analarini his qilasiz.",
    image: "/images/tours/samarkand-bukhara.jpg",
  },
  {
    name: "Xiva Qadimiy Shahar Turi",
    price: "$450 / kishi",
    desc: "Xiva – Ichan qal’a majmuasi bilan mashhur. Bu tur davomida siz qadimiy madrasalar, masjidlar va me’moriy yodgorliklarni tomosha qilasiz.",
    image: "/images/tours/khiva.jpg",
  },
  {
    name: "Toshkent Shahar Sayohati",
    price: "$299 / kishi",
    desc: "Zamonaviy va tarixiy Toshkentni birgalikda kashf eting: Hazrati Imom majmuasi, Chorsu bozori, Mustaqillik maydoni va boshqa diqqatga sazovor joylar.",
    image: "/images/tours/tashkent.jpg",
  },
  {
    name: "Farg‘ona Vodiysi Ekskursiyasi",
    price: "$520 / kishi",
    desc: "Farg‘ona vodiysi o‘zining tabiati, qo‘l mehnati ustalari va qadimiy an’analari bilan mashhur. Marg‘ilon, Qo‘qon va Rishton shaharlarini ziyorat qiling.",
    image: "/images/tours/fergana.jpg",
  },
  {
    name: "Cho‘l Safari va Qoraqalpog‘iston",
    price: "$680 / kishi",
    desc: "Qizilqum cho‘li bo‘ylab safari, Aydar ko‘li bo‘yida dam olish va Nukusdagi Savitskiy muzeyiga tashrif.",
    image: "/images/tours/karakalpakstan.jpg",
  },
];

export default toursData;
