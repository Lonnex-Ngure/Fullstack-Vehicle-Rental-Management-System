import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { Key } from 'react';

export interface TIPayment {
  bookingId: number;
  amount: number;
  paymentStatus: string;
  paymentDate: Date;
  paymentMethod: string;
  transactionId: string;
}

export interface Booking {
  id: Key | null | undefined;
  bookingId: number;
  bookingDate: string;
  returnDate: string;
  totalAmount: number;
  bookingStatus: string;
  location: {
    locationId: number; // Changed from id to locationId
    name: string;
    address: string;
    contactPhone: string;
  };
  user: {
    userId: number;
    fullName: string;
    email: string;
    contactPhone: string;
    address: string;
  };
  vehicle: {
    imageUrl: any;
    manufacturer: any;
    model: any;
    category: any;
    vehicleSpecId: number;
    rentalRate: number;
    availability: boolean;
  };
}

export const bookingApiSlice = createApi({
  reducerPath: 'bookingApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://vehicle-rental-backend-xpxy.onrender.com/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Booking'],
  endpoints: (builder) => ({
    getBookings: builder.query<Booking[], void>({
      query: () => '/bookings',
      providesTags: ['Booking'],
    }),
    createBooking: builder.mutation<Booking, Partial<Booking>>({
      query: (bookingData) => ({
        url: '/bookings',
        method: 'POST',
        body: bookingData,
      }),
      invalidatesTags: ['Booking'],
    }),
    updateBooking: builder.mutation<Booking, Partial<Booking> & { bookingId: number }>({
      query: ({ bookingId, user, vehicle, location, ...booking }) => ({
        url: `/bookings/${bookingId}`,
        method: 'PUT',
        body: {
          ...booking,
          userId: user?.userId,
          vehicleId: vehicle?.vehicleSpecId,
          locationId: location?.locationId,
        },
      }),
      invalidatesTags: ['Booking'],
    }),
    createPaymentIntent: builder.mutation<{ clientSecret: string }, { amount: number }>({
      query: (data) => ({
        url: '/payments/create-payment-intent',
        method: 'POST',
        body: data,
      }),
    }),
    processPayment: builder.mutation<TIPayment, { bookingId: number; paymentMethodId: string }>({
      query: (data) => ({
        url: '/payments/process',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export default bookingApiSlice;