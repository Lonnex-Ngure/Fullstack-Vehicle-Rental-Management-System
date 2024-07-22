// vehicleApiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const vehicleApiSlice = createApi({
  reducerPath: 'vehicleApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://vehicle-rental-backend-xpxy.onrender.com/api' }),
  tagTypes: ['Vehicle'],
  endpoints: (builder) => ({
    fetchVehicles: builder.query({
      query: (filters) => ({
        url: '/vehicles',
        method: 'GET',
        params: filters,
      }),
      providesTags: ['Vehicle'],
    }),
    fetchVehicleById: builder.query({
      query: (id) => ({
        url: `/vehicles/${id}`,
        method: 'GET',
      }),
      providesTags: (_, __, id) => [{ type: 'Vehicle', id }],
    }),
    addVehicle: builder.mutation({
      query: (vehicle) => ({
        url: '/vehicles',
        method: 'POST',
        body: vehicle,
      }),
      invalidatesTags: ['Vehicle'],
    }),
    updateVehicle: builder.mutation({
      query: ({ id, ...vehicle }) => ({
        url: `/vehicles/${id}`,
        method: 'PUT',
        body: vehicle,
      }),
      invalidatesTags: (_, __, arg) => [{ type: 'Vehicle', id: arg.id }],
    }),
    deleteVehicle: builder.mutation({
      query: (id) => ({
        url: `/vehicles/${id}`,
        method: 'PUT',
        body: { availability: false },
      }),
      invalidatesTags: ['Vehicle'],
    }),
  }),
});

export default vehicleApiSlice;