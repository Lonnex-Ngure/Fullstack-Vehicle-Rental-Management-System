import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// in bookingSlice.ts
export interface Booking {
  id: string;
  bookingId: number;
  userId: number;
  vehicleId: number;
  locationId: number;
  bookingDate: string;
  returnDate: string;
  totalAmount: number;
  bookingStatus: string;
  gps: boolean;
  insurance: boolean;
  additionalDriver: boolean;
  rentalRate: number;
}

export interface BookingState {
  bookings: Booking[];
  currentBooking: Booking | null;
}

const initialState: BookingState = {
  bookings: [],
  currentBooking: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    addBooking(state, action: PayloadAction<Booking>) {
      state.bookings.push(action.payload);
      state.currentBooking = action.payload;
    },
    removeBooking(state, action: PayloadAction<string>) {
      state.bookings = state.bookings.filter(booking => booking.id !== action.payload);
      if (state.currentBooking && state.currentBooking.id === action.payload) {
        state.currentBooking = null;
      }
    },
    setCurrentBooking(state, action: PayloadAction<Booking | null>) {
      state.currentBooking = action.payload;
    },
  },
});

export const { addBooking, removeBooking, setCurrentBooking } = bookingSlice.actions;
export default bookingSlice.reducer;