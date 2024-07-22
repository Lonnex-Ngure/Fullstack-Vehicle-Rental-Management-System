import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormData {
    bookingDate: string;
    returnDate: string;
    vehicleId: string | number; 
    rentalRate: string; 
    manufacturer?: string;
    model?: string;
    category?: string;
    imageUrl?: string;
    locationId?: number;
}

const initialState: FormData = {
  bookingDate: '',
  returnDate: '',
  vehicleId: '',
  rentalRate: '',
  locationId: 0,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData(_state, action: PayloadAction<FormData>) {
      return action.payload;
    },
    clearFormData() {
      return initialState;
    },
    setLocationId(state, action: PayloadAction<number>) {
      state.locationId = action.payload;
    },
  }
});

export const { setFormData, clearFormData, setLocationId } = formSlice.actions;
export default formSlice.reducer;