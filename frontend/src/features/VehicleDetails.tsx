import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { vehicleApiSlice } from '../services/vehicleApiSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { RootState } from "../store";
import { setFormData } from '../slices/formSlice';
import { setVehicleDetails } from '../slices/vehicleSlice';

const VehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  console.log("Vehicle ID from URL Params:", id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const { data: vehicle, error: vehicleError, isLoading: vehicleLoading } = vehicleApiSlice.useFetchVehicleByIdQuery(id!);

  useEffect(() => {
    if (vehicle) {
      dispatch(setVehicleDetails(vehicle));
    }
  }, [vehicle, dispatch]);

  console.log("Full vehicle data:", vehicle);

  if (vehicleLoading) return <p className="text-white text-center py-8">Loading...</p>;

  if (vehicleError) {
    let errorMessage = 'An error occurred';
    if ('status' in vehicleError) {
      errorMessage = `Error: ${vehicleError.status}`;
    } else if ('message' in vehicleError && typeof vehicleError.message === 'string') {
      errorMessage = vehicleError.message;
    }
    return <p className="text-white text-center py-8">{errorMessage}</p>;
  }

  if (!vehicle) {
    return <p className="text-white text-center py-8">No vehicle data available.</p>;
  }

  const features: string[] = vehicle.specification?.features?.split(',') ?? [];

  const handleBooking = () => {
    const bookingDate = (document.getElementById("pickupDate") as HTMLInputElement)?.value;
    const returnDate = (document.getElementById("returnDate") as HTMLInputElement)?.value;
    const location = (document.getElementById("location") as HTMLInputElement)?.value;

    const formData = {
      bookingDate: bookingDate ?? '',
      returnDate: returnDate ?? '',
      location: location ?? '',
      vehicleId: vehicle?.vehicleId?.toString() ?? '',
      rentalRate: vehicle?.rentalRate?.toString() ?? '',
      manufacturer: vehicle?.specification?.manufacturer ?? '',
      model: vehicle?.specification?.model ?? '',
      category: vehicle?.specification?.category ?? '',
      imageUrl: vehicle?.imageUrl ?? '',
      locationId: 0 
    };

    dispatch(setFormData(formData));

    if (isAuthenticated) {
      navigate(`/booking/${id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="bg-gray-700 min-h-screen text-white">
      <Header />
      <div className="container mx-auto py-8">
        <div className="bg-gray-900 p-4 rounded-lg shadow-lg flex justify-center items-center">
        <img
  src={vehicle.specification?.imageUrl || "https://via.placeholder.com/300x200?text=No+Image"}
  alt={`${vehicle.specification?.manufacturer} ${vehicle.specification?.model}`}
  className="w-full max-w-2xl h-64 object-cover rounded"
  onError={(e) => {
    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=No+Image';
  }}
/>
        </div>
        <div className="mt-8 bg-gray-900 p-8 rounded-lg shadow-lg flex">
          <div className="w-1/2">
            <h2 className="text-3xl font-bold mb-4">{`${vehicle.specification?.manufacturer} ${vehicle.specification?.model}`}</h2>
            <p><strong>Year:</strong> {vehicle.specification?.year || 'N/A'}</p>
            <p><strong>Price:</strong> ${vehicle.rentalRate}/day</p>
            <p><strong>Fuel Type:</strong> {vehicle.specification?.fuelType || 'N/A'}</p>
            <p><strong>Engine Capacity:</strong> {vehicle.specification?.engineCapacity || 'N/A'} cc</p>
            <p><strong>Transmission:</strong> {vehicle.specification?.transmission || 'N/A'}</p>
            <p><strong>Seating Capacity:</strong> {vehicle.specification?.seatingCapacity || 'N/A'}</p>
            <p><strong>Color:</strong> {vehicle.specification?.color || 'N/A'}</p>
            <p className={vehicle.availability ? "text-green-600 mt-4" : "text-red-600 mt-4"}>
              <strong>{vehicle.availability ? "Available Now" : "Not Available"}</strong>
            </p>
          </div>
          <div className="w-1/2 pl-8">
            <form onSubmit={(e) => { e.preventDefault(); handleBooking(); }}>
              <div className="mb-4">
                <label htmlFor="bookingDate" className="block text-sm font-medium mb-2">Booking Date</label>
                <input
                  type="date"
                  id="pickupDate"
                  className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="returnDate" className="block text-sm font-medium mb-2">Return Date</label>
                <input
                  type="date"
                  id="returnDate"
                  className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  id="location"
                  className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                  placeholder="Enter location manually"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded"
              >
                Book Now
              </button>
            </form>
          </div>
        </div>
        <section className="mt-8 bg-gray-900 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Vehicle Features</h2>
          <ul className="list-disc pl-5 grid grid-cols-2 gap-4">
            {features.map((feature: string, index: number) => (
              <li key={index} className="text-gray-300">{feature.trim()}</li>
            ))}
          </ul>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default VehicleDetails;
