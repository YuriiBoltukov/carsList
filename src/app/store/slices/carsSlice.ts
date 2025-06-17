import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Car } from '@/app/types/car';
import { api } from '@/app/lib/api';

interface CarsState {
  carsByPage: Record<string, Car[]>;
  totalCount: number;
  loading: boolean;
}

const initialState: CarsState = {
  carsByPage: {},
  totalCount: 0,
  loading: false,
};

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async ({ page, limit, order }: { page: number; limit: number; order?: string }) => {
    console.log('fetch');
    const sortQuery = order ? `&_sort=price&_order=${order}` : '';
    const response = await api.get(`/cars?_page=${page}&_limit=${limit}${sortQuery}`);
    return {
      data: response.data.data,
      total: Number(response.headers['x-total-count']),
      page,
      order: order || 'default',
    };
  }
);

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    resetCars: (state) => {
      state.carsByPage = {};
      state.totalCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        const { data, total, page, order } = action.payload;
        const key = `${order || 'default'}-${page}`;
        state.carsByPage[key] = data;
        state.totalCount = total;
        state.loading = false;
      })
      .addCase(fetchCars.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { resetCars } = carsSlice.actions;
export default carsSlice.reducer;
