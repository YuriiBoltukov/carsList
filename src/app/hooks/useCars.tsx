import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { fetchCars }                      from '@/app/store/slices/carsSlice';
import { useEffect, useMemo }                      from 'react';

export const useCars = (page: number, limit: number, order?: string) => {
  const dispatch = useAppDispatch();
  const key = useMemo(() => `${order || 'default'}-${page}`, [order, page]);

  const carsFromStore = useAppSelector((state) => state.cars.carsByPage[key] || []);
  const totalCount = useAppSelector((state) => state.cars.totalCount);
  const loading = useAppSelector((state) => state.cars.loading);

  useEffect(() => {
    if (!carsFromStore.length) {
      dispatch(fetchCars({ page, limit, order }));
    }
  }, [key, page, limit, order, dispatch]);

  return { cars: carsFromStore, totalCount, loading };
};
