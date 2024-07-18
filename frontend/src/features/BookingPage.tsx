import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from "../store";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FormData } from '../slices/formSlice';
import { bookingApiSlice } from '../services/bookingApiSlice';
import { addBooking } from '../slices/bookingSlice';
import { BookingData } from '../types';
import { apiSlice } from '../services/apiSlice';
import { setLocationId } from '../slices/formSlice'; 


interface BookingFormData extends FormData {
  gps: boolean;
  insurance: boolean;
  additionalDriver: boolean;
    locationId: number;

}

interface Location {
  locationId: number;
  name: string;
  address: string;
  contactPhone: string;
}

interface BookingFormData extends FormData {
  gps: boolean;
  insurance: boolean;
  additionalDriver: boolean;
  locationId: number;
}

const BookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const formData = useSelector((state: RootState) => state.form) as FormData;
  const user = useSelector((state: RootState) => state.auth.user);
  const currentVehicle = useSelector((state: RootState) => state.vehicle.currentVehicle);
  const locationId = useSelector((state: RootState) => state.form.locationId);

  const { register, handleSubmit, setValue, watch } = useForm<BookingFormData>({
    defaultValues: {
      ...formData,
      vehicleId: id ? parseInt(id, 10) : 0, // Set the vehicleId from the URL parameter
      gps: false,
      insurance: false,
      additionalDriver: false,
      locationId: 0
    }
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [createBooking] = bookingApiSlice.useCreateBookingMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: locations = [], isLoading: isLoadingLocations, error: locationsError } = apiSlice.endpoints.getLocations.useQuery({});

  useEffect(() => {
    console.log('Locations data:', locations);
    console.log('Is loading locations:', isLoadingLocations);
    console.log('Locations error:', locationsError);
  }, [locations, isLoadingLocations, locationsError]);
  
useEffect(() => {
  const formValues = watch();
  console.log('Form values:', formValues);
  console.log('Location ID:', formValues.locationId);
}, [watch]);


  useEffect(() => {
    setValue('bookingDate', formData.bookingDate);
    setValue('returnDate', formData.returnDate);
    
  }, [formData, setValue]);

  const watchedFields = watch();

  useEffect(() => {
    const calculateTotalPrice = () => {
      const startDate = new Date(watchedFields.bookingDate);
      const endDate = new Date(watchedFields.returnDate);
      const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      let total = (parseFloat(formData.rentalRate) || 0) * days;
      const serviceFee = 50;
      total += serviceFee;

      if (watchedFields.gps) total += 10 * days;
      if (watchedFields.insurance) total += 30 * days;
      if (watchedFields.additionalDriver) total += 20 * days;

      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [watchedFields, formData.rentalRate]);
  
  const onSubmit: SubmitHandler<BookingFormData> = async (data) => {
    if (!user) {
      alert('Please log in to create a booking.');
      return;
    }
  
    if (!id) {
      alert('Vehicle information is missing.');
      return;
    }
  
    if (!data.locationId || !data.bookingDate || !data.returnDate) {
      alert('Please fill in all required fields (Location, Booking Date, Return Date).');
      return;
    }
  
    try {
      const bookingData: BookingData = {
        userId: user.id, // Make sure this is coming from your auth state
        vehicleId: parseInt(id, 10),
        locationId: parseInt(data.locationId, 10), // Convert to number
        bookingDate: new Date(data.bookingDate).toISOString(),
        returnDate: new Date(data.returnDate).toISOString(),
        totalAmount: Math.round(totalPrice), // Make sure totalPrice is calculated correctly
        bookingStatus: "Pending",
        gps: data.gps || false,
        insurance: data.insurance || false,
        additionalDriver: data.additionalDriver || false,
        rentalRate: parseFloat(currentVehicle?.rentalRate || '0')
      };
  
    const result = await createBooking(bookingData).unwrap();

    console.log('Booking created successfully:', result);
    dispatch(addBooking(result));

    // Navigate to payment page with booking data
    navigate('/payment', { 
      state: { 
        bookingData: result,
        vehicleSummary: {
          manufacturer: currentVehicle?.specification?.manufacturer,
          model: currentVehicle?.specification?.model,
          category: currentVehicle?.specification?.category,
          rentalRate: currentVehicle?.rentalRate,
          imageUrl: currentVehicle?.imageUrl
        },
        totalAmount: totalPrice
      } 
    });
    } catch (error: any) {
      console.error('Failed to create booking:', error);
      if (error.data && error.data.message) {
        alert('Booking failed: ${error.data.message}');
      } else if (error.data) {
        alert(`Booking failed: ${JSON.stringify(error.data)}`);
      } else {
        alert('Failed to create booking. Please try again.');
      }
    }
  };

  useEffect(() => {
    console.log('Locations data:', locations);
    console.log('Is loading locations:', isLoadingLocations);
    console.log('Locations error:', locationsError);
  }, [locations, isLoadingLocations, locationsError]);

  useEffect(() => {
    console.log('User:', user);
    console.log('Vehicle ID:', id);
    console.log('Form Data:', formData);
    console.log('Watched Fields:', watchedFields);
  }, [user, id, formData, watchedFields]);

  return (
    <div className="bg-gray-700 min-h-screen text-white">
      <Header />
      <div className="container mx-auto py-8">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
          <div className="flex mb-8">
            <img src={currentVehicle?.imageUrl || "vehicle-summary.jpg"} alt="Selected Vehicle" className="w-48 h-32 object-cover rounded" />
            <div className="ml-4">
              <h2 className="text-3xl font-bold">Selected Vehicle Summary</h2>
              <p>{currentVehicle?.specification?.manufacturer} {currentVehicle?.specification?.model}</p>
              <p>{currentVehicle?.specification?.category}</p>
              <p>Rental Rate: ${currentVehicle?.rentalRate}/day</p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div>
                <label htmlFor="bookingDate" className="block text-sm font-medium mb-2">Booking Date</label>
                <input
                  type="date"
                  id="bookingDate"
                  className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                  {...register('bookingDate')}
                />
              </div>
              <div>
                <label htmlFor="returnDate" className="block text-sm font-medium mb-2">Return Date</label>
                <input
                  type="date"
                  id="returnDate"
                  className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                  {...register('returnDate')}
                />
              </div>
            </div>
            <div className="mb-8">
      <label htmlFor="locationId" className="block text-sm font-medium mb-2">Location Selector</label>
      {isLoadingLocations ? (
        <p>Loading locations...</p>
      ) : locationsError ? (
        <p>Error loading locations. Please try again. Error: {JSON.stringify(locationsError)}</p>
      ) : locations && locations.length > 0 ? (
        <select
  id="locationId"
  className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
  {...register('locationId', { 
    required: true,
    onChange: (e) => {
      const locationId = parseInt(e.target.value, 10);
      if (!isNaN(locationId)) {
        console.log('Selected location ID:', locationId);
        dispatch(setLocationId(locationId));
        setValue('locationId', locationId); // This should set it as a number
      }
    }
  })}
>
  <option value="">Select a location ID</option>
  {locations.map((location: any) => (
    <option key={location.locationId} value={location.locationId}>
      {location.locationId} - {location.name}
    </option>
  ))}
</select>
      ) : (
        <p>No locations available. Locations data: {JSON.stringify(locations)}</p>
      )}
    </div>
            <div className="mb-8">
              <label className="block text-sm font-medium mb-2">Additional Services/Options</label>
              <div className="flex items-center mb-2">
                <input type="checkbox" id="gps" className="mr-2" {...register('gps')} />
                <label htmlFor="gps">GPS Navigation</label>
              </div>
              <div className="flex items-center mb-2">
                <input type="checkbox" id="insurance" className="mr-2" {...register('insurance')} />
                <label htmlFor="insurance">Car Insurance</label>
              </div>
              <div className="flex items-center mb-2">
                <input type="checkbox" id="additionalDriver" className="mr-2" {...register('additionalDriver')} />
                <label htmlFor="additionalDriver">Additional Driver</label>
              </div>
            </div>
            <div className="bg-gray-800 p-4 rounded mb-8">
              <h3 className="text-xl font-bold mb-2">Price Breakdown</h3>
              <p>Base Price: ${formData.rentalRate * Math.ceil((new Date(watchedFields.returnDate).getTime() - new Date(watchedFields.bookingDate).getTime()) / (1000 * 60 * 60 * 24))}</p>
              <p>Service Fee: $50.00</p>
              {watchedFields.gps && <p>GPS: $10/day</p>}
              {watchedFields.insurance && <p>Insurance: $30/day</p>}
              {watchedFields.additionalDriver && <p>Additional Driver: $20/day</p>}
              <p className="mt-2 font-bold">Total: ${totalPrice.toFixed(2)}</p>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">Terms and Conditions</h3>
              <p className="text-gray-300 text-sm">
                Please read and agree to the terms and conditions before proceeding to payment. <br></br>
                1.Use of the vehicle is subject to all national and local laws. Failure to do so will result in a ruling charge, which includes the cost of fuel and a refueling service fee.<br></br>
                2.Renters are required to ensure the vehicle is clean and free of any damages upon return.
              </p>
              
              <p className="text-gray-300 text-sm mt-2">
                # By proceeding, you agree to the vehicle's condition and agree to indemnify the rental company for any damages that may occur during the rental period.
              </p>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded"
            >
              Proceed to Payment
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;
