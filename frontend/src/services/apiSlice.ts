// apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserProfile } from '../types';

export interface User {
  userId: number;
  fullName: string;
  email: string;
  contactPhone: string;
  address: string;
  role: string;
}

export interface Location {
  locationId: number;
  name: string;
  address: string;
  contactPhone: string;
}

export interface Ticket {
  ticketId: number;
  subject: string;
  description: string;
  status: string;
  user: {
    userId: number;
    fullName: string;
    email: string;
  };
}

export interface FleetManagementItem {
  fleetId: number;
  acquisitionDate: string;
  depreciationRate: number;
  currentValue: number;
  maintenanceCost: number;
  status: string;
  vehicle: {
    vehicleId: number;
    rentalRate: number;
    availability: boolean;
  };
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: '/auth/register',
        method: 'POST',
        body: newUser,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    fetchVehicles: builder.query({
      query: (filters) => ({
        url: '/vehicles',
        method: 'GET',
        params: filters,
      }),
    }),
    // getLocations: builder.query({
    //   query: () => '/locations',
    //   transformResponse: (response: any) => {
    //     console.log('Raw locations API response:', response);
    //     return response;
    //   },
    // }),
    getUserProfile: builder.query<UserProfile, string | void>({
      query: (userId) => userId ? `/users/${userId}` : '/users',
    }),
    updateUserProfile: builder.mutation({
      query: ({ userId, ...updatedProfile }) => ({
        url: `/users/${userId}`,
        method: 'PUT',
        body: updatedProfile,
      }),
    }),
    fetchUsers: builder.query<User[], void>({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
    }),
    createUser: builder.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
    }),
    updateUser: builder.mutation<User, Partial<User> & Pick<User, 'userId'>>({
      query: ({ userId, ...updates }) => ({
        url: `/users/${userId}`,
        method: 'PUT',
        body: updates,
      }),
    }),
    deleteUser: builder.mutation<void, number>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'DELETE',
      }),
    }),

getLocations: builder.query<Location[], void>({
  query: () => ({
    url: '/locations',
    method: 'GET',
  }),
}),
createLocation: builder.mutation<Location, Partial<Location>>({
  query: (newLocation) => ({
    url: '/locations',
    method: 'POST',
    body: newLocation,
  }),
}),
updateLocation: builder.mutation<Location, Partial<Location> & Pick<Location, 'locationId'>>({
  query: ({ locationId, ...updates }) => ({
    url: `/locations/${locationId}`,
    method: 'PUT',
    body: updates,
  }),
}),
deleteLocation: builder.mutation<void, number>({
  query: (locationId) => ({
    url: `/locations/${locationId}`,
    method: 'DELETE',
  }),
}),
getTickets: builder.query<Ticket[], void>({
  query: () => ({
    url: '/customer-support-tickets',
    method: 'GET',
  }),
}),
updateTicket: builder.mutation<Ticket, Partial<Ticket> & { userId: number }>({
  query: (updates) => ({
    url: `/customer-support-tickets/${updates.ticketId}`,
    method: 'PUT',
    body: updates,
    headers: {
      'Content-Type': 'application/json',
    },
  }),
}),
  getFleetManagement: builder.query<FleetManagementItem[], void>({
    query: () => ({
      url: '/fleet-management',
      method: 'GET',
    }),
  }),
  updateFleetManagementItem: builder.mutation<FleetManagementItem, Partial<FleetManagementItem> & Pick<FleetManagementItem, 'fleetId'>>({
    query: ({ fleetId, ...updates }) => ({
      url: `/fleet-management/${fleetId}`,
      method: 'PUT',
      body: updates,
    }),
  }),
  deleteFleetManagementItem: builder.mutation<void, number>({
    query: (fleetId) => ({
      url: `/fleet-management/${fleetId}`,
      method: 'DELETE',
    }),
  }),
  createFleetManagementItem: builder.mutation<FleetManagementItem, Partial<FleetManagementItem>>({
    query: (newItem) => ({
      url: '/fleet-management',
      method: 'POST',
      body: newItem,
    }),
  }),
}),
});





export default apiSlice;