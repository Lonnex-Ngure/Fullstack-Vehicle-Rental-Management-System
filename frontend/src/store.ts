import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { apiSlice } from './services/apiSlice';
import authReducer from './slices/authslice';  
import vehicleApiSlice from './services/vehicleApiSlice';
import formReducer from './slices/formSlice';
import bookingReducer from './slices/bookingSlice'; 
import { bookingApiSlice } from './services/bookingApiSlice';
import vehicleReducer from './slices/vehicleSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [vehicleApiSlice.reducerPath]: vehicleApiSlice.reducer,
  [bookingApiSlice.reducerPath]: bookingApiSlice.reducer,
  auth: authReducer,
  form: formReducer,
  vehicle: vehicleReducer,
  booking: bookingReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware, 
      vehicleApiSlice.middleware,
      bookingApiSlice.middleware
    ),
});

const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
