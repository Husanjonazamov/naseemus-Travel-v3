import Image from "next/image";
import Link from "next/link";

interface TourDetailProps {
  params: {
    id: string;
  };
}

export default function TourDetail({ params }: TourDetailProps) {
  // Demo ma'lumotlar
  const tour = {
    id: params.id,
    title: "Paris Tour",
    description:
      "Parij bo‘ylab 7 kunlik sayohat. Eyfel minorasi, Luvr muzeyi va boshqa mashhur joylarni ko‘rasiz.",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200",
  };

  const otherTours = [
    {
      id: 2,
      title: "Dubai Luxury Tour",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
    },
    {
      id: 3,
      title: "Istanbul Culture Tour",
      image:
        "https://images.unsplash.com/photo-1544986581-efac024faf62?w=600",
    },
  ];

  return (
    <div className="w-full">
      {/* Banner */}
      <div className="relative w-full h-[400px]">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">{tour.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">{tour.title}</h2>
        <p className="text-gray-600 mb-6">{tour.description}</p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Buyurtma qilish
        </button>
      </div>

      {/* Other tours */}
      <div className="max-w-6xl mx-auto p-6">
        <h3 className="text-xl font-bold mb-4">Boshqa turlar</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {otherTours.map((item) => (
            <Link
              key={item.id}
              href={`/tours/${item.id}`}
              className="rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <div className="relative w-full h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="font-semibold">{item.title}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
