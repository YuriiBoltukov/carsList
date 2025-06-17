"use client";
import { useEffect, useState }                     from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Pagination, Spin }                        from "antd";
import CarCard from "./cars/components/CarCard";
import SortSelect from "./cars/components/SortSelect";
import { api } from '@/app/lib/api';
import { Car } from '@/app/types/car';

export default function CarsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [cars, setCars] = useState<Car[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const page = Number(searchParams.get("_page")) || 1;
  const pageSize = Number(searchParams.get("_limit")) || 12;
  const order = searchParams.get("_order") || "";

  const updateQuery = (params: Record<string, any>) => {
    const newParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) newParams.set(key, String(value));
      else newParams.delete(key);
    });
    router.push(`${pathname}?${newParams.toString()}`);
  };

  useEffect(() => {
    setLoading(true);
    const sortQuery = order ? `&_sort=price&_order=${order}` : "";
    api
      .get(`/cars?_limit=${pageSize}&_page=${page}${sortQuery}`)
      .then((res) => {
        setCars(res.data.data);
        const meta = res.headers["x-total-count"];
        setTotalCount(Number(meta));
      })
      .finally(() => setLoading(false));
  }, [page, pageSize, order]);


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
          total={totalCount}
          pageSize={pageSize}
          showSizeChanger
          pageSizeOptions={["8", "12", "16", "24", "32"]}
          onChange={(p, size) => updateQuery({ _page: p, _limit: size })}
        />
      </div>
    </div>
  );
}
