"use client";

import { Card } from "antd";
import { Car }  from '@/app/types/car';
import Slider from "react-slick";
import { ArrowLeft } from '@/app/cars/components/ArrowLeft';
import { ArrowRight } from '@/app/cars/components/ArrowRight';

interface Props {
  car: Car;
}

export default function CarCard({ car }: Props) {
  const title = `${car.mark_id} ${car.folder_id}`;
  const imageUrl: string[] = Object.values(car.images)?.[0];

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    nextArrow: <ArrowRight />,
    prevArrow: <ArrowLeft />,
  };

  return (
    <Card
      hoverable
      cover={
        <Slider {...settings}>
          {imageUrl.map((url, index) => (
            <img
              key={index}
              src={`/api/proxy-image?url=${encodeURIComponent(url)}`}
              alt={`${title} ${index + 1}`}
              className="h-48 w-full object-cover"
            />
          ))}
        </Slider>
      }
    >
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-700 font-medium">{car.price.toLocaleString()} ₽</p>
    </Card>
  );
}