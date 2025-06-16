"use client";

import { Card } from "antd";
import { Car }  from '@/app/types/car';
import Image    from 'next/image';

interface Props {
  car: Car;
}

export default function CarCard({ car }: Props) {
  const title = `${car.mark_id} ${car.folder_id}`;
  const imageUrl = Object.values(car.images)?.[0];
  const proxiedImage = `/api/proxy-image?url=${encodeURIComponent(imageUrl[0])}`;
  console.log(proxiedImage)
  return (
    <Card
      hoverable
      cover={<img src={proxiedImage} alt={title} className="h-48 w-full object-cover" />}
    >
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-700 font-medium">{car.price.toLocaleString()} ₽</p>
    </Card>
  );
}