import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VehicleState {
  currentVehicle: any | null;
}

const initialState: VehicleState = {
  currentVehicle: null,
};

const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    setVehicleDetails: (state, action: PayloadAction<any>) => {
      state.currentVehicle = action.payload;
    },
  },
});

export const { setVehicleDetails } = vehicleSlice.actions;
export default vehicleSlice.reducer;