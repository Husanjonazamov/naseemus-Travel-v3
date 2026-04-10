export type SupportedLocale = "en" | "ru" | "uz";

export type DestinationSlug = "tashkent" | "samarkand" | "bukhara" | "khiva";

export interface DestinationContent {
  slug: DestinationSlug;
  image: string;
  heroImage: string;
  title: string;
  preview: Record<SupportedLocale, string>;
  about: Record<SupportedLocale, string>;
  attractions: Record<SupportedLocale, string[]>;
  thingsToDo: Record<SupportedLocale, string[]>;
  bestTime: Record<SupportedLocale, string>;
  tips: Record<SupportedLocale, string[]>;
}

export const destinations: DestinationContent[] = [
  {
    slug: "tashkent",
    image: "/images/tashkent-uzbequistao.jpg",
    heroImage: "/images/tashkent-uzbequistao.jpg",
    title: "Tashkent",
    preview: {
      en: "Uzbekistan's vibrant capital blends broad boulevards, living heritage, elegant metro stations, and a welcoming modern rhythm.",
      ru: "Яркая столица Узбекистана объединяет широкие проспекты, живое наследие, красивые станции метро и современный городской ритм.",
      uz: "O‘zbekistonning gavjum poytaxti keng xiyobonlar, boy meros, nafis metro bekatlari va zamonaviy shahar ruhi bilan ajralib turadi.",
    },
    about: {
      en:
        "Tashkent, the capital of Uzbekistan, is a city where contemporary life and deep-rooted history meet in a way that feels both dynamic and welcoming. As the largest city in Central Asia, it serves as the main gateway to the country and gives many travelers their first impression of Uzbek culture, hospitality, and everyday life. The city feels spacious and green, with broad avenues, shaded parks, and lively public squares that make it comfortable to explore.\n\nOne of the most fascinating things about Tashkent is the contrast between its modern districts and its older neighborhoods. In one part of the city, visitors find business centers, stylish cafes, museums, and modern shopping streets. In another, they encounter traditional mahallas, historic mosques, domed markets, and quieter lanes that preserve the atmosphere of an earlier era. This balance gives Tashkent a special character that is different from the more monument-focused Silk Road cities.\n\nHistorically, Tashkent played an important role as a crossroads of trade, religion, and culture. It stood on major routes connecting East and West, and over the centuries it absorbed influences from Persian, Turkic, Islamic, Russian, and Soviet worlds. That layered past can still be seen in places such as the Khast Imam Complex, where one of the world's oldest Quran is preserved, as well as in the city's urban design and civic landmarks.\n\nTashkent is also known for its cultural significance. The city offers excellent museums, theaters, galleries, and music venues, making it an important center for contemporary Uzbek identity. The famous metro system is more than public transportation: many stations are designed like underground art halls, decorated with chandeliers, mosaics, marble, and symbolic motifs that reflect different periods and ideas. Exploring the metro is a memorable experience in its own right.\n\nThe food scene in Tashkent adds another dimension to the visit. Travelers can taste classic Uzbek dishes such as plov, lagman, shashlik, and samsa, but the capital also offers refined restaurants, casual teahouses, bakeries, and international cuisine. Markets such as Chorsu Bazaar make the city feel especially alive, with fresh produce, spices, bread, sweets, and local street food giving insight into daily life.\n\nFor many visitors, Tashkent is not only a starting point but a destination worth understanding on its own. It introduces the story of Uzbekistan through history, architecture, cuisine, and urban life, while providing the comfort and infrastructure of a modern capital. Spending time here helps travelers appreciate the wider journey across the Silk Road with much greater depth.",
      ru:
        "Ташкент, столица Узбекистана, — это город, в котором современная жизнь естественно сочетается с глубокой историей. Как крупнейший город Центральной Азии, он служит главными воротами в страну и часто становится первым знакомством путешественников с узбекской культурой, гостеприимством и повседневной жизнью. Город кажется просторным и зеленым: широкие проспекты, тенистые парки и оживленные площади делают его удобным и приятным для знакомства.\n\nОсобая привлекательность Ташкента заключается в контрасте между современными районами и старой частью города. В одних кварталах находятся деловые центры, стильные кафе, музеи и современные торговые улицы. В других сохраняются традиционные махалли, исторические мечети, купольные базары и более спокойный ритм жизни. Именно это сочетание придает Ташкенту характер, который заметно отличается от более монументальных городов Шелкового пути.\n\nС исторической точки зрения Ташкент был важным перекрестком торговли, религии и культурного обмена. Он находился на крупных маршрутах между Востоком и Западом и на протяжении веков впитывал персидские, тюркские, исламские, российские и советские влияния. Это многослойное прошлое до сих пор ощущается в таких местах, как комплекс Хаст-Имам, где хранится один из древнейших Коранов мира, а также в городской планировке и архитектурных ориентирах.\n\nТашкент имеет и большое культурное значение. Здесь работают сильные музеи, театры, галереи и концертные площадки, поэтому город остается важным центром современной узбекской идентичности. Знаменитое ташкентское метро — это не просто транспорт: многие станции оформлены как подземные художественные залы с люстрами, мозаикой, мрамором и символическими деталями, отражающими разные эпохи и идеи. Осмотр метро сам по себе становится яркой частью путешествия.\n\nКулинарная сцена Ташкента делает впечатление от города еще богаче. Здесь можно попробовать классические узбекские блюда — плов, лагман, шашлык и самсу, — а также открыть для себя современные рестораны, уютные чайханы, пекарни и международную кухню. Особую атмосферу создают рынки, прежде всего Чорсу, где свежие фрукты, специи, лепешки, сладости и уличная еда помогают лучше почувствовать ритм местной жизни.\n\nДля многих гостей Ташкент становится не только отправной точкой, но и полноценным направлением, которое стоит понять и прочувствовать. Он знакомит с историей Узбекистана через архитектуру, кухню, городскую культуру и живую повседневность, при этом предлагая комфорт и инфраструктуру современной столицы. Время, проведенное здесь, помогает гораздо глубже воспринять дальнейшее путешествие по городам Шелкового пути.",
      uz:
        "Toshkent, O‘zbekiston poytaxti, zamonaviy hayot va chuqur tarixiy qatlamlar uyg‘unlashgan shahardir. Markaziy Osiyodagi eng yirik shahar sifatida u mamlakatga kirishning asosiy darvozasi bo‘lib, ko‘plab sayyohlar uchun o‘zbek madaniyati, mehmondo‘stligi va kundalik hayoti bilan ilk tanishuv aynan shu yerda boshlanadi. Shahar keng va yashil ko‘rinadi: ulkan xiyobonlar, soya-salqin bog‘lar va jonli maydonlar uni sayr qilish uchun juda qulay qiladi.\n\nToshkentning eng qiziqarli jihatlaridan biri uning zamonaviy hududlari bilan eski mahallalari o‘rtasidagi kontrastdir. Shaharning bir tomonida biznes markazlari, zamonaviy kafelar, muzeylar va savdo ko‘chalari joylashgan bo‘lsa, boshqa tomonida an’anaviy mahallalar, tarixiy masjidlar, gumbazli bozorlar va sokin ko‘chalar saqlanib qolgan. Ana shu uyg‘unlik Toshkentga Ipak yo‘lining boshqa, ko‘proq monumental shaharlardan farq qiladigan o‘ziga xos ruh bag‘ishlaydi.\n\nTarixiy jihatdan Toshkent savdo, din va madaniy almashinuv chorrahasi bo‘lgan. U Sharq va G‘arbni bog‘lovchi yirik yo‘llar ustida joylashgan va asrlar davomida fors, turkiy, islomiy, rus va sovet ta’sirlarini o‘zida mujassam etgan. Bu ko‘p qatlamli o‘tmishni bugun ham Hazrati Imom majmuasi kabi maskanlarda yaqqol ko‘rish mumkin. U yerda dunyodagi eng qadimiy Qur’on nusxalaridan biri saqlanadi, shuningdek shahar me’morchiligi va jamoat makonlarida ham tarix izlari sezilib turadi.\n\nToshkent madaniy hayoti bilan ham alohida ahamiyatga ega. Bu yerda muzeylar, teatrlar, galereyalar va musiqa maskanlari faol ishlaydi, shu sababli shahar zamonaviy o‘zbek madaniyatining muhim markazi hisoblanadi. Mashhur Toshkent metrosi esa oddiy transport vositasi emas: ko‘plab bekatlar qandillar, marmar, mozaikalar va ramziy bezaklar bilan bezatilgan haqiqiy san’at makonlariga o‘xshaydi. Metro bo‘ylab sayr qilishning o‘zi ham alohida taassurot qoldiradi.\n\nToshkentning gastronomik muhiti ham safarni yanada boyitadi. Bu yerda plov, lag‘mon, shashlik va somsa kabi an’anaviy taomlarni tatib ko‘rish mumkin, shu bilan birga poytaxtda zamonaviy restoranlar, choyxonalar, novvoyxonalar va xalqaro oshxona namunalari ham ko‘p. Ayniqsa Chorsu bozori kabi joylarda yangi mevalar, ziravorlar, non, shirinliklar va ko‘cha taomlari orqali mahalliy hayotning haqiqiy ritmini his qilish mumkin.\n\nKo‘plab mehmonlar uchun Toshkent shunchaki boshlanish nuqtasi emas, balki o‘zini chuqur anglashga arziydigan mustaqil manzildir. U O‘zbekiston hikoyasini tarix, me’morchilik, taomlar va shahar hayoti orqali ochib beradi, shu bilan birga zamonaviy poytaxtga xos qulaylik va infratuzilmani taklif etadi. Bu yerda o‘tkazilgan vaqt keyingi Ipak yo‘li shaharlari bo‘ylab safarni yanada mazmunli qiladi.",
    },
    attractions: {
      en: ["Khast Imam Complex", "Chorsu Bazaar", "Amir Timur Square", "Tashkent Metro"],
      ru: ["Комплекс Хаст-Имам", "Базар Чорсу", "Площадь Амира Темура", "Ташкентский метрополитен"],
      uz: ["Hazrati Imom majmuasi", "Chorsu bozori", "Amir Temur xiyoboni", "Toshkent metrosi"],
    },
    thingsToDo: {
      en: [
        "Walk through the Old City to experience traditional neighborhoods and religious landmarks.",
        "Visit museums, galleries, and theaters to understand the country's artistic and historical identity.",
        "Taste plov, samsa, fresh bread, and local sweets in bazaars, teahouses, and modern restaurants.",
        "Ride the metro and stop at different stations to admire their architecture and design.",
      ],
      ru: [
        "Прогуляйтесь по Старому городу, чтобы почувствовать атмосферу традиционных кварталов и исторических религиозных памятников.",
        "Посетите музеи, галереи и театры, чтобы лучше понять художественную и историческую идентичность страны.",
        "Попробуйте плов, самсу, свежие лепешки и местные сладости на базарах, в чайханах и современных ресторанах.",
        "Прокатитесь на метро и выходите на разных станциях, чтобы увидеть их архитектуру и художественное оформление.",
      ],
      uz: [
        "An’anaviy mahallalar va diniy obidalar muhitini his qilish uchun Eski shahar bo‘ylab sayr qiling.",
        "Mamlakatning san’at va tarixiy qiyofasini chuqurroq anglash uchun muzeylar, galereyalar va teatrlarga boring.",
        "Bozorlar, choyxonalar va zamonaviy restoranlarda plov, somsa, issiq non va milliy shirinliklarni tatib ko‘ring.",
        "Metroda sayohat qilib, turli bekatlarda tushib ularning me’morchiligi va bezaklarini tomosha qiling.",
      ],
    },
    bestTime: {
      en: "Spring from April to June and autumn from September to October offer the mildest weather for city walks and sightseeing.",
      ru: "Весна с апреля по июнь и осень с сентября по октябрь считаются самым комфортным временем для прогулок и знакомства с городом.",
      uz: "Apreldan iyungacha bo‘lgan bahor va sentyabrdan oktyabrgacha bo‘lgan kuz shaharda sayr qilish uchun eng qulay mavsum hisoblanadi.",
    },
    tips: {
      en: [
        "Use the metro for quick and affordable travel across the city.",
        "Carry some cash when shopping in traditional markets.",
        "Set aside at least one full day to explore both the old and modern parts of Tashkent.",
      ],
      ru: [
        "Для быстрого и недорогого передвижения по городу пользуйтесь метро.",
        "Для покупок на традиционных рынках лучше иметь при себе наличные.",
        "Выделите хотя бы один полный день, чтобы увидеть и старую, и современную части Ташкента.",
      ],
      uz: [
        "Shahar bo‘ylab tez va arzon yurish uchun metrodan foydalaning.",
        "An’anaviy bozorlarda xarid qilish uchun yoningizda biroz naqd pul bo‘lsin.",
        "Toshkentning eski va zamonaviy qismlarini ko‘rish uchun kamida bir to‘liq kun ajrating.",
      ],
    },
  },
  {
    slug: "samarkand",
    image: "/images/samarkand-2.jpg",
    heroImage: "/images/samarkand-2.jpg",
    title: "Samarkand",
    preview: {
      en: "A legendary Silk Road capital filled with blue domes, royal squares, scientific heritage, and unforgettable Timurid grandeur.",
      ru: "Легендарная столица Шелкового пути славится голубыми куполами, величественными площадями, научным наследием и блеском эпохи Тимуридов.",
      uz: "Buyuk Ipak yo‘lining afsonaviy poytaxti moviy gumbazlar, ulug‘vor maydonlar, ilmiy meros va Temuriylar shukuhi bilan mashhur.",
    },
    about: {
      en:
        "Samarkand is one of the most celebrated cities on the Silk Road and one of the great historical symbols of Central Asia. With a history stretching back more than twenty-seven centuries, it developed as a major center of trade, diplomacy, learning, and artistic exchange. For travelers, Samarkand feels immediately monumental: it is a city of grand proportions, luminous blue domes, and architectural ensembles that leave a lasting impression.\n\nThe city reached extraordinary prominence during the reign of Amir Timur, who made Samarkand the capital of his vast empire. He gathered craftsmen, scholars, and architects from different regions and transformed the city into a place of power, beauty, and intellectual ambition. That Timurid legacy still defines Samarkand today and gives it a prestige that few cities in the region can match.\n\nAt the heart of the city stands Registan Square, one of the most iconic urban spaces in the Islamic world. Surrounded by three magnificent madrasahs decorated with intricate tilework, calligraphy, and soaring portals, the square expresses the grandeur of Samarkand more than any single monument. It is not only visually breathtaking but historically important as a place where education, ceremony, and public life came together.\n\nOther major landmarks deepen the experience. Shah-i-Zinda is a sacred necropolis whose dazzling mosaics and layered tombs create one of the most memorable architectural walks in Uzbekistan. Gur-e-Amir, the mausoleum of Amir Timur, reveals the refinement of Timurid design. The Ulugh Beg Observatory reminds visitors that Samarkand was also a center of scientific thought, where astronomy and mathematics flourished at a remarkably advanced level.\n\nSamarkand is not only about monumental history. The city continues to live through local traditions, crafts, markets, music, and cuisine. Visitors can experience Uzbek hospitality in courtyards and family-run guesthouses, taste regional specialties, and observe how ancient heritage coexists with modern tourism and urban life. The atmosphere feels ceremonial yet warm, and many travelers find that Samarkand captures their imagination more deeply than any photograph can.\n\nWhy visit Samarkand? Because it offers one of the clearest windows into the historical power, artistic sophistication, and cultural richness of the Silk Road. It is a destination where history does not feel distant: it rises in domes, echoes in courtyards, and remains visible in the life of the city today.",
      ru:
        "Самарканд — один из самых прославленных городов Великого шелкового пути и один из главных исторических символов Центральной Азии. Его история насчитывает более двадцати семи веков, и на протяжении этого времени город был крупным центром торговли, дипломатии, знаний и художественного обмена. Для путешественника Самарканд сразу производит впечатление монументальности: это город огромных масштабов, сияющих голубых куполов и архитектурных ансамблей, которые надолго остаются в памяти.\n\nОсобого расцвета Самарканд достиг во времена Амира Темура, сделавшего его столицей своей огромной империи. Он собирал здесь мастеров, ученых и архитекторов из разных земель и превратил город в место силы, красоты и интеллектуальных амбиций. Это тимуридское наследие до сих пор определяет облик Самарканда и придает ему особое величие, с которым могут сравниться очень немногие города региона.\n\nСердцем города является площадь Регистан — одно из самых знаковых городских пространств исламского мира. Три великолепных медресе, украшенные сложной мозаикой, каллиграфией и устремленными ввысь порталами, делают площадь подлинным символом самаркандского величия. Регистан поражает не только красотой, но и историческим значением: здесь пересекались образование, церемонии и общественная жизнь.\n\nДругие памятники делают знакомство с городом еще глубже. Шахи-Зинда — это священный некрополь, где сверкающие мозаики и цепочка мавзолеев создают один из самых впечатляющих архитектурных маршрутов в Узбекистане. Гур-Эмир, мавзолей Амира Темура, показывает утонченность тимуридского искусства. Обсерватория Улугбека напоминает, что Самарканд был и центром научной мысли, где астрономия и математика развивались на исключительно высоком уровне.\n\nСамарканд — это не только великая история и знаменитые памятники. Город продолжает жить через местные традиции, ремесла, рынки, музыку и кухню. Здесь можно ощутить узбекское гостеприимство в уютных двориках и семейных гостиницах, попробовать региональные блюда и увидеть, как древнее наследие соседствует с современной туристической инфраструктурой и городской жизнью. Атмосфера Самарканда торжественна, но при этом тепла и человечна, поэтому он часто производит более сильное впечатление, чем ожидалось.\n\nПочему стоит посетить Самарканд? Потому что именно здесь особенно ярко раскрываются историческая мощь, художественная изысканность и культурное богатство Шелкового пути. Это город, где история не кажется далекой: она поднимается в куполах, звучит в старых двориках и остается видимой в современной жизни города.",
      uz:
        "Samarqand Buyuk Ipak yo‘lining eng mashhur shaharlaridan biri va Markaziy Osiyoning buyuk tarixiy ramzlaridan biridir. Uning tarixi yigirma yetti asrdan ham ortiq vaqtga borib taqaladi va shu davr davomida shahar savdo, diplomatiya, ilm-fan hamda san’at almashinuvining yirik markazi bo‘lib kelgan. Sayyoh uchun Samarqand birinchi daqiqalardanoq ulug‘vor taassurot qoldiradi: bu moviy gumbazlar, mahobatli inshootlar va keng miqyosli me’moriy ansambllar shahri.\n\nSamarqand Amir Temur davrida ayniqsa beqiyos ravnaq topdi. Temur uni ulkan imperiyasining poytaxtiga aylantirib, turli yurtlardan ustalar, olimlar va me’morlarni shu yerga jamladi. Natijada shahar kuch-qudrat, go‘zallik va aql-zakovat markaziga aylandi. Bugun ham aynan shu temuriy meros Samarqandning qiyofasini belgilaydi va unga mintaqadagi kam sonli shaharlar bilan tenglashadigan ulug‘lik baxsh etadi.\n\nShaharning yuragi — Registon maydoni. U islom olamidagi eng mashhur va go‘zal maydonlardan biri hisoblanadi. Murakkab koshinkorlik, nafis xattotlik va baland peshtoqlar bilan bezatilgan uch ulkan madrasa Registonni Samarqandning eng yorqin ramziga aylantiradi. Bu maskan nafaqat betakror manzara, balki tarixan ta’lim, marosim va jamoat hayoti tutashgan muhim markaz ham bo‘lgan.\n\nBoshqa yodgorliklar ham shahar haqidagi tasavvurni chuqurlashtiradi. Shohi Zinda majmuasi yorqin mozaikalari va qator maqbaralari bilan O‘zbekistondagi eng ta’sirli me’moriy yo‘laklardan birini yaratadi. Amir Temur dafn etilgan Go‘ri Amir maqbarasi temuriy uslubning nafisligini namoyon etadi. Ulug‘bek rasadxonasi esa Samarqand faqat siyosiy va madaniy markaz emas, balki astronomiya va matematika yuksak taraqqiy etgan ilm maskani bo‘lganini eslatadi.\n\nSamarqand faqat tarixiy obidalar shahri emas. U mahalliy urf-odatlar, hunarmandchilik, bozorlar, musiqa va oshxona orqali bugun ham yashab turibdi. Mehmonlar hovlili mehmon uylarida o‘zbek mehmondo‘stligini his etadilar, hududga xos taomlarni tatib ko‘radilar va qadimiy meros zamonaviy turizm bilan qanday uyg‘un yashayotganini ko‘radilar. Samarqandning muhiti bir vaqtning o‘zida tantanavor ham, samimiy hamdir.\n\nNega Samarqandga borish kerak? Chunki aynan shu yerda Ipak yo‘lining tarixiy qudrati, badiiy nozikligi va madaniy boyligi eng yorqin ko‘rinadi. Bu shunday manzilki, unda tarix uzoq o‘tmish bo‘lib tuyulmaydi: u gumbazlarda ko‘tariladi, hovlilarda jaranglaydi va bugungi shahar hayotida ham sezilib turadi.",
    },
    attractions: {
      en: ["Registan Square", "Shah-i-Zinda", "Gur-e-Amir Mausoleum", "Ulugh Beg Observatory"],
      ru: ["Площадь Регистан", "Шахи-Зинда", "Мавзолей Гур-Эмир", "Обсерватория Улугбека"],
      uz: ["Registon maydoni", "Shohi Zinda", "Go‘ri Amir maqbarasi", "Ulug‘bek rasadxonasi"],
    },
    thingsToDo: {
      en: [
        "Visit major monuments early in the day to enjoy softer light and fewer crowds.",
        "Explore local workshops and markets to see paper making, ceramics, textiles, and souvenirs.",
        "Try regional cuisine and traditional sweets after a day of sightseeing around the old city.",
        "Spend time in the evening around Registan to experience the square in a different atmosphere.",
      ],
      ru: [
        "Посещайте главные памятники рано утром, чтобы увидеть их при мягком свете и без больших толп.",
        "Загляните в мастерские и на рынки, чтобы познакомиться с бумагой ручной работы, керамикой, текстилем и сувенирами.",
        "После прогулок по старому городу попробуйте местные блюда и традиционные сладости.",
        "Останьтесь у Регистана вечером, чтобы увидеть площадь в совершенно другой атмосфере.",
      ],
      uz: [
        "Asosiy yodgorliklarga ertaroq boring, shunda ularni yumshoq yorug‘likda va kamroq odam bilan tomosha qilasiz.",
        "Qo‘lda qog‘oz tayyorlash, kulolchilik, to‘qimachilik va suvenirlar bilan tanishish uchun ustaxona va bozorlarga kiring.",
        "Eski shahar bo‘ylab sayrdan so‘ng hududga xos taomlar va an’anaviy shirinliklarni tatib ko‘ring.",
        "Registonni kechqurun ham ko‘rib chiqing, chunki maydon o‘sha paytda butunlay boshqacha muhit kasb etadi.",
      ],
    },
    bestTime: {
      en: "Spring and autumn bring the most pleasant temperatures for sightseeing, walking, and spending long hours outdoors.",
      ru: "Весна и осень считаются лучшим временем для прогулок, экскурсий и длительного осмотра города на открытом воздухе.",
      uz: "Bahor va kuz sayr qilish, ekskursiyalar va ochiq havoda uzoq vaqt bo‘lish uchun eng qulay mavsumdir.",
    },
    tips: {
      en: [
        "Wear comfortable shoes because many attractions require extended walking on stone or uneven surfaces.",
        "Arrive early at the most famous monuments to avoid peak crowds and midday heat.",
        "Dress respectfully when visiting religious and memorial sites.",
      ],
      ru: [
        "Надевайте удобную обувь, потому что осмотр многих памятников связан с длительной ходьбой по камню и неровным поверхностям.",
        "Приходите к самым известным памятникам пораньше, чтобы избежать толпы и полуденной жары.",
        "Одевайтесь уважительно при посещении религиозных и мемориальных мест.",
      ],
      uz: [
        "Qulay oyoq kiyim kiying, chunki ko‘plab yodgorliklarni ko‘rish uzoq piyoda yurishni talab qiladi.",
        "Eng mashhur obidalarga ertaroq boring, shunda issiq va gavjum paytdan qochasiz.",
        "Diniy va xotira maskanlariga kirayotganda hurmatli kiyinishga e’tibor bering.",
      ],
    },
  },
  {
    slug: "bukhara",
    image: "/images/istockphoto-1184019772-612x612.jpg",
    heroImage: "/images/istockphoto-1184019772-612x612.jpg",
    title: "Bukhara",
    preview: {
      en: "A deeply atmospheric Silk Road city where living traditions, Islamic scholarship, and preserved old streets shape every step.",
      ru: "Атмосферный город Шелкового пути, где живые традиции, исламское ученое наследие и хорошо сохранившиеся старые улицы ощущаются на каждом шагу.",
      uz: "Ipak yo‘lining nihoyatda muhitli shahri bo‘lib, unda tirik an’analar, islomiy ilm markazlari va yaxshi saqlangan eski ko‘chalar har qadamda seziladi.",
    },
    about: {
      en:
        "Bukhara is one of the most atmospheric cities in Uzbekistan and one of the most authentic places on the Silk Road. Its historic center preserves the feeling of a true trading city, where narrow streets, mudbrick walls, domed structures, and monumental religious buildings create a setting that feels remarkably intact. Walking through Bukhara often feels less like visiting isolated monuments and more like entering a complete historical environment.\n\nFor centuries Bukhara was known as a major center of Islamic scholarship, spirituality, and intellectual life. Scholars, theologians, merchants, and craftsmen passed through the city, helping it grow into one of the most respected cultural centers in the region. Its importance can still be felt in the many mosques, madrasahs, libraries, and courtyard spaces that remain woven into the urban fabric.\n\nThe city is rich in architectural highlights. The Poi Kalyan Complex stands as one of the defining landmarks of Bukhara, with its famous minaret rising above the old city skyline. The Ark Fortress speaks of royal authority, political history, and centuries of change. Around Lyabi-Hauz, visitors find one of the most relaxed and charming parts of the city, where pools, trees, old buildings, and tea houses come together in a beautifully human-scale setting.\n\nBukhara also offers a distinctive cultural experience because traditional crafts remain visible and meaningful. Embroidery, metalwork, miniature art, carpet weaving, and wood carving continue to shape the identity of the city. In its trading domes and artisan workshops, travelers can still witness skilled workmanship rather than only staged souvenirs. This gives Bukhara a lived-in, authentic character that many visitors find deeply memorable.\n\nFood is another important part of the experience. Bukhara's cuisine reflects the city's history as a crossroads of communities and tastes. Meals often feel slower and more intimate here, whether enjoyed in a historic courtyard, a family guesthouse, or a traditional tea house. Along with classic Uzbek dishes, travelers can discover regional variations and the pleasure of taking time over tea, sweets, and conversation.\n\nWhy visit Bukhara? Because it offers a rare sense of continuity between past and present. History here is not reduced to a backdrop; it remains tied to craft, faith, hospitality, and daily life. For travelers who want depth, atmosphere, and cultural texture rather than only photographs of monuments, Bukhara is one of the most rewarding destinations in Uzbekistan.",
      ru:
        "Бухара — один из самых атмосферных городов Узбекистана и одно из самых подлинных мест на Великом шелковом пути. Ее исторический центр сохраняет ощущение настоящего торгового города, где узкие улицы, глинобитные стены, купольные сооружения и монументальные религиозные здания создают удивительно цельную среду. Прогулка по Бухаре часто воспринимается не как осмотр отдельных памятников, а как погружение в целостный исторический мир.\n\nНа протяжении веков Бухара была крупным центром исламской учености, духовной жизни и интеллектуальной культуры. Через город проходили ученые, богословы, торговцы и ремесленники, благодаря чему он стал одним из наиболее уважаемых культурных центров региона. Его значение до сих пор чувствуется в многочисленных мечетях, медресе, библиотеках и внутренних двориках, вплетенных в ткань старого города.\n\nБухара богата выдающимися архитектурными памятниками. Комплекс Пои-Калян является одним из главных символов города, а его знаменитый минарет возвышается над старой частью Бухары как многовековой ориентир. Крепость Арк рассказывает об истории власти, правителей и политических перемен. Вокруг Ляби-Хауза открывается одна из самых уютных и привлекательных частей города, где водоем, деревья, исторические фасады и чайханы создают особенно теплую и человечную атмосферу.\n\nБухара дарит особый культурный опыт еще и потому, что традиционные ремесла здесь остаются не декоративным воспоминанием, а живой частью городской идентичности. Вышивка, чеканка, миниатюра, ковроткачество и резьба по дереву до сих пор заметны в мастерских и торговых куполах. Путешественники могут увидеть здесь настоящее мастерство, а не только сувенирную витрину, и именно это делает Бухару особенно подлинной и запоминающейся.\n\nБольшую роль играет и кухня. Бухарская гастрономия отражает историю города как перекрестка разных общин и вкусов. Здесь еда часто воспринимается более неспешно и камерно — во внутреннем дворике, семейном гостевом доме или традиционной чайхане. Наряду с классическими узбекскими блюдами можно открыть для себя региональные особенности и удовольствие от неспешного чаепития со сладостями и беседой.\n\nПочему стоит посетить Бухару? Потому что здесь особенно ясно чувствуется непрерывность между прошлым и настоящим. История в этом городе не служит просто декорацией — она по-прежнему связана с ремеслом, верой, гостеприимством и повседневной жизнью. Для тех, кто ищет глубину, атмосферу и культурную насыщенность, Бухара становится одним из самых ценных впечатлений в Узбекистане.",
      uz:
        "Buxoro O‘zbekistonning eng muhitli shaharlardan biri va Buyuk Ipak yo‘lining eng haqiqiy maskanlaridan biridir. Uning tarixiy markazi tor ko‘chalar, paxsa devorlar, gumbazli inshootlar va mahobatli diniy binolar orqali qadimiy savdo shahrining yaxlit qiyofasini saqlab qolgan. Shu sababli Buxoro bo‘ylab yurish alohida yodgorliklarni ko‘rishdan ko‘ra, butun boshli tarixiy muhitga kirib borishga o‘xshaydi.\n\nAsrlar davomida Buxoro islom ilmi, ma’naviyat va tafakkur markazi sifatida mashhur bo‘lgan. Bu yer orqali olimlar, ulamolar, savdogarlar va hunarmandlar o‘tgan, natijada shahar mintaqaning eng hurmatli madaniy markazlaridan biriga aylangan. Bugun ham uning ahamiyati ko‘plab masjidlar, madrasalar, kutubxonalar va hovli makonlarida yaqqol sezilib turadi.\n\nBuxoro me’moriy yodgorliklarga juda boy. Poyi Kalon majmuasi shaharning bosh ramzlaridan biri bo‘lib, uning mashhur minorasi eski shahar ustidan asrlar davomida baland ko‘tarilib turadi. Ark qal’asi hukmdorlar, hokimiyat va siyosiy o‘zgarishlar tarixini eslatadi. Labi Hovuz atrofida esa shaharning eng yoqimli va sokin qismi namoyon bo‘ladi: hovuz, daraxtlar, qadimiy binolar va choyxonalar insoniy o‘lchamdagi juda iliq muhit yaratadi.\n\nBuxoro o‘ziga xos madaniy tajriba ham beradi, chunki bu yerda an’anaviy hunarmandchilik hanuzgacha jonli tarzda yashab turibdi. Kashtachilik, misgarlik, miniatyura, gilam to‘qish va yog‘och o‘ymakorligi shahar qiyofasining muhim qismi bo‘lib qolmoqda. Savdo gumbazlari va ustaxonalarda sayyohlar sahnalashtirilgan suvenirlarni emas, balki haqiqiy mahoratni ko‘rishlari mumkin. Aynan shu jihat Buxoroga chuqur va samimiy qiyofa beradi.\n\nTaomlar ham bu tajribaning muhim qismidir. Buxoro oshxonasi shaharning turli jamoalar va didlar chorrahasi bo‘lgan tarixini aks ettiradi. Bu yerda ovqatlanish ko‘pincha sokinroq va yaqinroq kayfiyatda o‘tadi — tarixiy hovlida, oilaviy mehmon uyida yoki an’anaviy choyxonada. Klassik o‘zbek taomlari bilan birga hududiy xususiyatlarni ham kashf etish, choy, shirinlik va suhbatdan zavqlanish mumkin.\n\nNega Buxoroga borish kerak? Chunki aynan shu yerda o‘tmish va bugun o‘rtasidagi uzviylik eng kuchli seziladi. Bu shaharda tarix shunchaki fon emas — u hunar, e’tiqod, mehmondo‘stlik va kundalik hayot bilan hanuz chambarchas bog‘langan. Suratga tushishga emas, balki chuqur muhit va madaniy mazmun izlaydigan sayyohlar uchun Buxoro O‘zbekistondagi eng qimmatli manzillardan biridir.",
    },
    attractions: {
      en: ["Poi Kalyan Complex", "Ark Fortress", "Lyabi-Hauz", "Trading Domes"],
      ru: ["Комплекс Пои-Калян", "Крепость Арк", "Ляби-Хауз", "Торговые купола"],
      uz: ["Poyi Kalon majmuasi", "Ark qal’asi", "Labi Hovuz", "Savdo gumbazlari"],
    },
    thingsToDo: {
      en: [
        "Explore artisan workshops to see embroidery, metalwork, ceramics, and other traditional crafts.",
        "Take slow walks through the old city to absorb the atmosphere rather than rushing between monuments.",
        "Enjoy tea or dinner in historic courtyards and roof terraces overlooking the old skyline.",
        "Spend time around Lyabi-Hauz, where local life and the historic environment meet most naturally.",
      ],
      ru: [
        "Посетите ремесленные мастерские, чтобы увидеть вышивку, чеканку, керамику и другие традиционные искусства.",
        "Гуляйте по старому городу неспешно, стараясь прочувствовать атмосферу, а не только отмечать памятники.",
        "Устройте чаепитие или ужин во внутреннем дворике или на террасе с видом на старую часть города.",
        "Проведите время у Ляби-Хауза, где особенно естественно соединяются местная жизнь и историческая среда.",
      ],
      uz: [
        "Kashtachilik, misgarlik, kulolchilik va boshqa an’anaviy san’atlarni ko‘rish uchun hunarmand ustaxonalari bilan tanishing.",
        "Faqat yodgorliklarni sanab chiqish emas, balki muhitni his qilish uchun eski shahar bo‘ylab shoshilmay sayr qiling.",
        "Tarixiy hovlilarda yoki eski shahar manzarali tom terrasalarida choy iching yoki kechki ovqat qiling.",
        "Mahalliy hayot va tarixiy muhit eng tabiiy tutashgan joy bo‘lgan Labi Hovuz atrofida vaqt o‘tkazing.",
      ],
    },
    bestTime: {
      en: "Spring and autumn are the most comfortable seasons for walking through the historic center and visiting monuments.",
      ru: "Весна и осень лучше всего подходят для прогулок по историческому центру и осмотра архитектурных памятников.",
      uz: "Bahor va kuz tarixiy markaz bo‘ylab sayr qilish va yodgorliklarni ko‘rish uchun eng qulay fasllardir.",
    },
    tips: {
      en: [
        "Take your time and explore slowly because Bukhara rewards unhurried travel.",
        "Visit local workshops and small markets, not only the major monuments.",
        "Stay in a traditional guesthouse to experience the city's hospitality more personally.",
      ],
      ru: [
        "Не спешите, потому что Бухара особенно хорошо раскрывается в спокойном ритме.",
        "Заглядывайте не только к главным памятникам, но и в небольшие мастерские и местные рынки.",
        "Остановитесь в традиционном гостевом доме, чтобы ближе почувствовать местное гостеприимство.",
      ],
      uz: [
        "Shoshilmang, chunki Buxoro eng yaxshi taassurotni sokin sur’atda beradi.",
        "Faqat yirik obidalarga emas, balki kichik ustaxonalar va mahalliy bozorlarga ham kiring.",
        "Mahalliy mehmondo‘stlikni yaqinroq his qilish uchun an’anaviy mehmon uyida turing.",
      ],
    },
  },
  {
    slug: "khiva",
    image: "/images/uzbekistan-khiva-city-aerial-view-wy0xdod6kx9i0w79.jpg",
    heroImage: "/images/uzbekistan-khiva-city-aerial-view-wy0xdod6kx9i0w79.jpg",
    title: "Khiva",
    preview: {
      en: "A beautifully preserved walled city where blue-tiled minarets, desert light, and Silk Road history create a dreamlike setting.",
      ru: "Прекрасно сохранившийся город-крепость, где синие минареты, пустынный свет и история Шелкового пути создают почти сказочную атмосферу.",
      uz: "Moviy koshinli minoralar, cho‘l nuri va Ipak yo‘li tarixi uyg‘unlashgan, juda yaxshi saqlangan devorli shahar.",
    },
    about: {
      en:
        "Khiva is one of the best-preserved historical cities in Central Asia and one of the most visually striking destinations in Uzbekistan. Its inner city, Itchan Kala, is enclosed by ancient walls and contains an extraordinary concentration of madrasahs, mosques, palaces, courtyards, and minarets. More than many other historic cities, Khiva creates the feeling of stepping directly into a complete urban world from another era.\n\nWhat makes Khiva especially memorable is its compact and walkable layout. Visitors can explore much of the historic center on foot, moving easily from one monument to another through narrow lanes lined with mudbrick facades and turquoise tilework. Every turn reveals a new composition of towers, domes, carved doors, and sunlit courtyards, giving the city a rhythm that feels intimate as well as monumental.\n\nKhiva was an important stop on regional trade routes and later became a significant cultural and political center in Khorezm. Its historical importance is reflected in the architecture that has survived with remarkable integrity. Landmarks such as Kalta Minor, the Kunya-Ark, Juma Mosque, and Islam Khoja Minaret tell stories of power, faith, urban life, and craftsmanship. Because so much of the city remains coherent, Khiva offers one of the clearest impressions of pre-modern Central Asian urban culture.\n\nThe cultural experience in Khiva is shaped not only by architecture but also by atmosphere. At sunrise and sunset, the city's warm walls and blue tiles change color with the light, and the entire old town can feel almost theatrical in its beauty. Music performances, artisan displays, and evenings in historic courtyards add another layer to the visit, making the city feel both preserved and alive.\n\nKhiva also rewards travelers through its food and hospitality. Traditional dishes, local bread, tea, and regional specialties are often served in settings that overlook the old walls or tiled monuments. Meals here tend to feel calm and reflective, fitting the pace of a city where wandering and observation are part of the pleasure.\n\nWhy visit Khiva? Because it offers a rare chance to experience a historic city that still feels spatially and emotionally complete. It is not simply a collection of monuments; it is an environment. For travelers seeking atmosphere, photogenic beauty, and a strong sense of place, Khiva is unforgettable.",
      ru:
        "Хива — один из лучше всего сохранившихся исторических городов Центральной Азии и одно из самых выразительных по красоте направлений в Узбекистане. Ее внутренний город Ичан-Кала окружен древними стенами и содержит удивительно плотное собрание медресе, мечетей, дворцов, дворов и минаретов. В большей степени, чем многие другие исторические города, Хива создает ощущение прямого перехода в целостный городской мир другой эпохи.\n\nОсобенно запоминающейся Хиву делает ее компактная и удобная для прогулок структура. Исторический центр легко исследовать пешком, переходя от одного памятника к другому по узким улицам с глинобитными фасадами и бирюзовой плиткой. Почти за каждым поворотом открывается новая композиция башен, куполов, резных дверей и залитых солнцем двориков, поэтому город кажется одновременно камерным и монументальным.\n\nХива была важной остановкой на региональных торговых маршрутах, а позднее стала заметным культурным и политическим центром Хорезма. Ее историческая значимость отражена в архитектуре, сохранившейся с поразительной цельностью. Такие памятники, как Калта-Минор, Куня-Арк, мечеть Джума и минарет Ислам-Ходжа, рассказывают о власти, вере, городской жизни и ремесленном мастерстве. Благодаря тому, что большая часть старого города сохранила единство, Хива дает одно из самых ясных представлений о домодерной городской культуре Центральной Азии.\n\nКультурное впечатление от Хивы формируется не только архитектурой, но и атмосферой. На рассвете и закате теплые стены и синие плитки меняют оттенки вместе со светом, и весь старый город приобретает почти театральную красоту. Музыкальные вечера, ремесленные показы и ужины во внутренних двориках добавляют к поездке еще один слой, благодаря чему Хива воспринимается одновременно как сохраненное и живое пространство.\n\nХива радует и своей кухней, и гостеприимством. Традиционные блюда, местный хлеб, чай и региональные угощения часто подаются в заведениях с видом на крепостные стены или на старинные плиточные фасады. Еда здесь соответствует ритму самого города — спокойному, вдумчивому и располагающему к неторопливому наблюдению.\n\nПочему стоит посетить Хиву? Потому что она дает редкую возможность оказаться в историческом городе, который до сих пор воспринимается цельным и в пространственном, и в эмоциональном смысле. Это не просто набор памятников, а полноценная среда. Для тех, кто ищет атмосферу, фотогеничную красоту и сильное ощущение места, Хива становится по-настоящему незабываемой.",
      uz:
        "Xiva Markaziy Osiyodagi eng yaxshi saqlanib qolgan tarixiy shaharlardan biri va O‘zbekistondagi eng ko‘rkam manzillardan biridir. Uning ichki shahri — Ichan-Qala — qadimiy devorlar bilan o‘ralgan bo‘lib, unda madrasalar, masjidlar, saroylar, hovlilar va minoralarning juda boy jamlanmasi mavjud. Ko‘plab tarixiy shaharlarga qaraganda, Xiva boshqa bir davrning yaxlit shahar olamiga kirib borgandek taassurot uyg‘otadi.\n\nXivani ayniqsa esda qolarli qiladigan jihat uning ixcham va piyoda sayr qilishga qulay tuzilishidir. Tarixiy markazni bir yodgorlikdan boshqasiga tor ko‘chalar orqali bemalol kezib chiqish mumkin. Paxsa devorlar, feruza rang koshinlar, minoralar, gumbazlar va quyosh tushgan hovlilar deyarli har bir burilishda yangi manzara yaratadi. Shu bois shahar bir vaqtning o‘zida ham yaqin, ham ulug‘vor tuyg‘u beradi.\n\nXiva mintaqaviy savdo yo‘llarining muhim nuqtasi bo‘lgan, keyinchalik esa Xorazmning madaniy va siyosiy markazlaridan biriga aylangan. Uning tarixiy ahamiyati bugungacha juda yaxlit saqlanib qolgan me’morchilikda aks etadi. Kalta Minor, Ko‘hna Ark, Juma masjidi va Islom Xo‘ja minorasi hokimiyat, e’tiqod, shahar hayoti va hunarmandchilik haqida hikoya qiladi. Shaharning katta qismi yaxlit holda saqlangani sababli, Xiva Markaziy Osiyoning qadimiy shahar madaniyatini juda aniq his qilish imkonini beradi.\n\nXivadagi madaniy taassurot nafaqat me’morchilik, balki muhit orqali ham shakllanadi. Tong va shom paytida shaharning iliq devorlari va moviy koshinlari yorug‘lik bilan birga rangini o‘zgartiradi va butun eski shahar deyarli sahnaviy go‘zallikka kiradi. Musiqiy kechalar, hunarmandchilik namoyishlari va tarixiy hovlilardagi oqshomlar safarga qo‘shimcha mazmun beradi, natijada Xiva bir vaqtning o‘zida ham saqlangan, ham yashab turgan makon sifatida tuyuladi.\n\nXiva taomlari va mehmondo‘stligi bilan ham sayyohni o‘ziga tortadi. An’anaviy ovqatlar, mahalliy non, choy va hududga xos lazzatlar ko‘pincha qadimiy devorlar yoki koshinli obidalar ko‘rinib turadigan joylarda tortiladi. Bu yerdagi ovqatlanish jarayoni shahar sur’atiga mos ravishda sokin va mulohazali kechadi.\n\nNega Xivaga borish kerak? Chunki u tarixiy shaharni makon va hissiyot jihatidan yaxlit holatda his qilish uchun juda noyob imkoniyat beradi. Bu shunchaki yodgorliklar to‘plami emas, balki to‘liq muhitdir. Kuchli atmosfera, fotogenik go‘zallik va joy ruhini izlaydigan sayyohlar uchun Xiva unutilmas manzildir.",
    },
    attractions: {
      en: ["Itchan Kala", "Kalta Minor", "Kunya-Ark", "Juma Mosque"],
      ru: ["Ичан-Кала", "Калта-Минор", "Куня-Арк", "Мечеть Джума"],
      uz: ["Ichan-Qala", "Kalta Minor", "Ko‘hna Ark", "Juma masjidi"],
    },
    thingsToDo: {
      en: [
        "Walk the old city in the early morning or at sunset when the light is most beautiful.",
        "Climb viewpoints and minarets where permitted to enjoy panoramic views over the walled city.",
        "Photograph tiled facades, carved wooden columns, and quiet alleys throughout Itchan Kala.",
        "Attend an evening performance or dine in a historic courtyard to experience Khiva after dark.",
      ],
      ru: [
        "Гуляйте по старому городу рано утром или на закате, когда свет делает Хиву особенно красивой.",
        "Поднимайтесь на смотровые площадки и минареты, где это разрешено, чтобы увидеть панораму города-крепости.",
        "Фотографируйте плиточные фасады, резные деревянные колонны и тихие улочки по всей Ичан-Кале.",
        "Сходите на вечернее выступление или поужинайте в историческом дворике, чтобы почувствовать Хиву после захода солнца.",
      ],
      uz: [
        "Eski shahar bo‘ylab ertalab yoki quyosh botishi paytida sayr qiling, chunki o‘sha vaqtda Xiva ayniqsa chiroyli ko‘rinadi.",
        "Ruxsat berilgan joylarda kuzatuv maydonchalari va minoralarga chiqib, devorli shahar manzarasidan bahramand bo‘ling.",
        "Ichan-Qala bo‘ylab koshinli fasadlar, o‘yma yog‘och ustunlar va sokin ko‘chalarni suratga oling.",
        "Kechki chiqish tomosha qiling yoki tarixiy hovlida ovqatlanib, Xivani tun paytida his eting.",
      ],
    },
    bestTime: {
      en: "Spring and autumn provide the most comfortable temperatures for walking inside the walled city and exploring monuments.",
      ru: "Весна и осень дают самые комфортные условия для прогулок по городу-крепости и осмотра памятников.",
      uz: "Bahor va kuz devorli shahar ichida sayr qilish hamda yodgorliklarni ko‘rish uchun eng qulay haroratni beradi.",
    },
    tips: {
      en: [
        "Stay overnight if possible so you can experience Khiva after day visitors leave.",
        "Carry water, especially in warmer months, because much of the sightseeing is outdoors.",
        "Plan time for both broad views and slow walks through the smaller lanes.",
      ],
      ru: [
        "По возможности останьтесь на ночь, чтобы увидеть Хиву после отъезда дневных гостей.",
        "Берите с собой воду, особенно в теплое время года, потому что большая часть осмотра проходит на улице.",
        "Запланируйте время и для панорамных видов, и для медленных прогулок по узким улицам.",
      ],
      uz: [
        "Imkon bo‘lsa, bir kecha qoling, shunda kunlik mehmonlar ketgandan keyingi Xivani ham ko‘rasiz.",
        "Ayniqsa issiq mavsumda yoningizda suv bo‘lsin, chunki sayrning katta qismi ochiq havoda o‘tadi.",
        "Ham keng panoramalar, ham tor ko‘chalar bo‘ylab sekin sayr qilish uchun alohida vaqt ajrating.",
      ],
    },
  },
];

export function getDestinationBySlug(slug: string) {
  return destinations.find((destination) => destination.slug === slug);
}
