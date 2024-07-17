import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { vehicleApiSlice } from "../services/vehicleApiSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { RootState } from "../store";
import { Vehicle } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { setFormData, FormData } from '../slices/formSlice';

const VehicleListing: React.FC = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});
  const { data: vehicles, error, isLoading } = vehicleApiSlice.useFetchVehiclesQuery(filters);
  console.log("All vehicles data:", vehicles);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    vehicleApiSlice.useFetchVehiclesQuery(filters);
  };

  return (
    <div>
      <Header />
      <div className="bg-gray-700 min-h-screen text-white">
        <div className="container mx-auto py-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-4">
              <select name="location" className="bg-gray-800 p-2 rounded" onChange={handleFilterChange}>
                <option value="">Any Location</option>
                {/* Add more options */}
              </select>
              <select name="type" className="bg-gray-800 p-2 rounded" onChange={handleFilterChange}>
                <option value="">Any Vehicle Type</option>
                {/* Add more options */}
              </select>
              <select name="priceRange" className="bg-gray-800 p-2 rounded" onChange={handleFilterChange}>
                <option value="">Any Price Range</option>
                {/* Add more options */}
              </select>
              <select name="availability" className="bg-gray-800 p-2 rounded" onChange={handleFilterChange}>
                <option value="">Any Availability</option>
                <option value="available">Available</option>
                <option value="not-available">Not Available</option>
              </select>
              <select name="fuelType" className="bg-gray-800 p-2 rounded" onChange={handleFilterChange}>
                <option value="">Any Fuel Type</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                {/* Add more options */}
              </select>
              <select name="category" className="bg-gray-800 p-2 rounded" onChange={handleFilterChange}>
                <option value="">Any Category</option>
                <option value="2-wheeler">2-Wheeler</option>
                <option value="4-wheeler">4-Wheeler</option>
              </select>
            </div>
            <button className="bg-red-600 px-4 py-2 rounded" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error loading vehicles.</p>
            ) : (
              vehicles?.map((vehicle: Vehicle) => (
                <div key={vehicle.vehicleId} className="bg-gray-900 p-4 rounded-lg shadow-lg">
                  <img src={vehicle.imageUrl} alt={vehicle.specifications?.model || "Vehicle"} className="w-full h-48 object-cover rounded" />
                  <h3 className="mt-4 font-bold">
                    {vehicle.specifications?.manufacturer} {vehicle.specifications?.model}
                  </h3>
                  <p className="text-gray-400">Transmission: {vehicle.specifications?.transmission}</p>
                  <p className="text-gray-400">Seating Capacity: {vehicle.specifications?.seatingCapacity}</p>
                  <p className="text-gray-400">Rental Rate: ${vehicle.rentalRate}</p>
                  <div className="flex justify-between mt-4">
                  <button
  className="bg-red-600 px-4 py-2 rounded"
  onClick={() => {
    console.log("Book Now clicked for vehicle:", vehicle);
    if (isAuthenticated) {
      const formData: FormData = {
        bookingDate: '',
        returnDate: '',
        vehicleId: vehicle.vehicleId,
        rentalRate: vehicle.rentalRate as unknown as string,
        manufacturer: vehicle.specifications?.manufacturer || '',
        model: vehicle.specifications?.model || '',
        category: (vehicle.specifications as any)?.category || '',
        imageUrl: vehicle.imageUrl
      };
      console.log("Dispatching form data:", formData);
      dispatch(setFormData(formData));
      console.log("Form data dispatched, navigating to:", `/booking/${vehicle.vehicleId}`);
      navigate(`/booking/${vehicle.vehicleId}`);
    } else {
      console.log("User not authenticated, navigating to login");
      navigate("/login");
    }
  }}
>
  Book Now
</button>
      <button 
      className="bg-red-600 px-4 py-2 rounded" 
      onClick={() => {
        console.log("Entire vehicle object:", vehicle);
        console.log("Vehicle ID:", vehicle.vehicleId);
        console.log("Vehicle ID type:", typeof vehicle.vehicleId);
        if (vehicle.vehicleId === undefined) {
          console.error("vehicleId is undefined for this vehicle:", vehicle);
        }
        navigate(`/vehicles/${vehicle.vehicleId}`);
      }}
    >
      View Details
    </button>


                  </div>
                </div>
              ))
            )}
          </div>
          <div className="mt-8 flex justify-center">
            <button className="bg-red-600 px-4 py-2 rounded mx-2">1</button>
            <button className="bg-red-600 px-4 py-2 rounded mx-2">2</button>
            <button className="bg-red-600 px-4 py-2 rounded mx-2">3</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VehicleListing;
