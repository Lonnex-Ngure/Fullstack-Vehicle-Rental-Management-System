import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Booking {
  id: string;
  vehicleId: string;
  bookingDate: string;
  returnDate: string;
  locationId: number;  // Changed from 'location: string'
  totalAmount: number;
  gps: boolean;
  insurance: boolean;
  additionalDriver: boolean;
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