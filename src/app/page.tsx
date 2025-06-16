"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Pagination, Spin } from "antd";
import CarCard from "./cars/components/CarCard";
import SortSelect from "./cars/components/SortSelect";
import { api } from '@/app/lib/api';
import { Car } from '@/app/types/car';

const PAGE_SIZE = 12;

export default function CarsPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [cars, setCars] = useState<Car[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("");

  const updateQuery = (params: Record<string, any>) => {
    const newParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([key, value]) => {
      if (value) newParams.set(key, String(value));
      else newParams.delete(key);
    });
    router.push(`${pathname}?${newParams.toString()}`);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const _page = Number(searchParams.get("_page")) || 1;
    const _order = searchParams.get("_order") || "";
    setPage(_page);
    setOrder(_order);
  }, [typeof window !== "undefined" && window.location.search]);

  useEffect(() => {
    setLoading(true);
    const sortQuery = order ? `&_sort=price&_order=${order}` : "";
    api
      .get(`/cars?_limit=${PAGE_SIZE}&_page=${page}${sortQuery}`)
      .then((res) => {
        setCars(res.data.data);
        const meta = res.headers["x-total-count"];
        setTotalPages(Math.ceil(Number(meta) / PAGE_SIZE));
      })
      .finally(() => setLoading(false));
  }, [page, order]);

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <h1 className="text-2xl font-bold">Автомобили</h1>
        <SortSelect value={order} onChange={(value) => updateQuery({ _order: value, _page: 1 })} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cars.map((car) => (
            <CarCard key={car.unique_id} car={car} />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-8">
        <Pagination
          current={page}
          total={totalPages * PAGE_SIZE}
          pageSize={PAGE_SIZE}
          onChange={(p) => updateQuery({ _page: p })}
        />
      </div>
    </div>
  );
}
