// // import React, { createContext, useState, ReactNode, useContext } from 'react';

// // interface BookingData {
// //   vehicleId?: string;
// //   bookingDate?: string;
// //   returnDate?: string;
// //   location?: string;
// //   gps?: boolean;
// //   insurance?: boolean;
// //   additionalDriver?: boolean;
// // }

// // interface BookingContextProps {
// //   bookingData: BookingData;
// //   setBookingData: (data: BookingData) => void;
// // }

// // const BookingContext = createContext<BookingContextProps | undefined>(undefined);

// // export const useBooking = () => {
// //   const context = useContext(BookingContext);
// //   if (!context) {
// //     throw new Error('useBooking must be used within a BookingProvider');
// //   }
// //   return context;
// // };

// // export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
// //   const [bookingData, setBookingData] = useState<BookingData>({});

// //   return (
// //     <BookingContext.Provider value={{ bookingData, setBookingData }}>
// //       {children}
// //     </BookingContext.Provider>
// //   );
// // };


// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { logout } from '../slices/authslice';
// import { useNavigate } from 'react-router-dom';
// import { 
//   useFetchVehiclesQuery, 
//   useAddVehicleMutation, 
//   useUpdateVehicleMutation, 
//   useDeleteVehicleMutation 
// } from '../services/vehicleApiSlice';

// // AddVehicleModal Component
// const AddVehicleModal = ({ onClose, onSubmit }) => {
//   const [vehicleData, setVehicleData] = useState({
//     rentalRate: '',
//     availability: true,
//     specification: {
//       manufacturer: '',
//       model: '',
//       year: '',
//       fuelType: '',
//       engineCapacity: '',
//       transmission: '',
//       seatingCapacity: '',
//       color: '',
//       features: '',
//     },
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.includes('.')) {
//       const [parent, child] = name.split('.');
//       setVehicleData(prev => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: value
//         }
//       }));
//     } else {
//       setVehicleData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(vehicleData);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-8 rounded-lg max-w-2xl w-full">
//         <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Vehicle</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Rental Rate</label>
//             <input
//               type="number"
//               name="rentalRate"
//               value={vehicleData.rentalRate}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Manufacturer</label>
//             <input
//               type="text"
//               name="specification.manufacturer"
//               value={vehicleData.specification.manufacturer}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Model</label>
//             <input
//               type="text"
//               name="specification.model"
//               value={vehicleData.specification.model}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Year</label>
//             <input
//               type="number"
//               name="specification.year"
//               value={vehicleData.specification.year}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
//             <input
//               type="text"
//               name="specification.fuelType"
//               value={vehicleData.specification.fuelType}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Engine Capacity</label>
//             <input
//               type="number"
//               name="specification.engineCapacity"
//               value={vehicleData.specification.engineCapacity}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Transmission</label>
//             <input
//               type="text"
//               name="specification.transmission"
//               value={vehicleData.specification.transmission}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Seating Capacity</label>
//             <input
//               type="number"
//               name="specification.seatingCapacity"
//               value={vehicleData.specification.seatingCapacity}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Color</label>
//             <input
//               type="text"
//               name="specification.color"
//               value={vehicleData.specification.color}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Features</label>
//             <input
//               type="text"
//               name="specification.features"
//               value={vehicleData.specification.features}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               required
//             />
//           </div>
//           <div className="flex justify-end space-x-2">
//             <button type="button" onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
//             <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Vehicle</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // EditVehicleModal Component
// const EditVehicleModal = ({ vehicle, onClose, onSubmit }) => {
//   const [vehicleData, setVehicleData] = useState({
//     rentalRate: vehicle.rentalRate,
//     availability: vehicle.availability,
//     specification: { ...vehicle.specification },
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.includes('.')) {
//       const [parent, child] = name.split('.');
//       setVehicleData(prev => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: value
//         }
//       }));
//     } else {
//       setVehicleData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(vehicleData);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-8 rounded-lg max-w-2xl w-full">
//         <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Vehicle</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Rental Rate</label>
//             <input
//               type="number"
//               name="rentalRate"
//               value={vehicleData.rentalRate}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Manufacturer</label>
//             <input
//               type="text"
//               name="specification.manufacturer"
//               value={vehicleData.specification.manufacturer}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Model</label>
//             <input
//               type="text"
//               name="specification.model"
//               value={vehicleData.specification.model}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Year</label>
//             <input
//               type="number"
//               name="specification.year"
//               value={vehicleData.specification.year}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
//             <input
//               type="text"
//               name="specification.fuelType"
//               value={vehicleData.specification.fuelType}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Engine Capacity</label>
//             <input
//               type="number"
//               name="specification.engineCapacity"
//               value={vehicleData.specification.engineCapacity}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Transmission</label>
//             <input
//               type="text"
//               name="specification.transmission"
//               value={vehicleData.specification.transmission}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Seating Capacity</label>
//             <input
//               type="number"
//               name="specification.seatingCapacity"
//               value={vehicleData.specification.seatingCapacity}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Color</label>
//             <input
//               type="text"
//               name="specification.color"
//               value={vehicleData.specification.color}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Features</label>
//             <input
//               type="text"
//               name="specification.features"
//               value={vehicleData.specification.features}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//               required
//             />
//           </div>
//           <div className="flex justify-end space-x-2">
//             <button type="button" onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
//             <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Update Vehicle</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Main AdminDashboard Component
// const AdminDashboard: React.FC = () => {
//   const [activeSection, setActiveSection] = useState('Dashboard');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { data: vehicles, error, isLoading } = useFetchVehiclesQuery({});
//   const [addVehicle] = useAddVehicleMutation();
//   const [updateVehicle] = useUpdateVehicleMutation();
//   const [deleteVehicle] = useDeleteVehicleMutation();

//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [currentVehicle, setCurrentVehicle] = useState(null);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/');
//   };

//   const handleEdit = (vehicle) => {
//     setCurrentVehicle(vehicle);
//     setIsEditModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this vehicle?')) {
//       try {
//         await deleteVehicle(id).unwrap();
//         alert('Vehicle deleted successfully');
//       } catch (err) {
//         alert('Failed to delete vehicle');
//         console.error('Delete error:', err);
//       }
//     }
//   };

//   const handleAddNewVehicle = () => {
//     setIsAddModalOpen(true);
//   };

//   const handleAddSubmit = async (vehicleData) => {
//     try {
//       await addVehicle(vehicleData).unwrap();
//       setIsAddModalOpen(false);
//       alert('Vehicle added successfully');
//     } catch (err) {
//       alert('Failed to add vehicle');
//       console.error('Add error:', err);
//     }
//   };

//   const handleEditSubmit = async (vehicleData) => {
//     try {
//       await updateVehicle({ id: currentVehicle.vehicleId, ...vehicleData }).unwrap();
//       setIsEditModalOpen(false);
//       alert('Vehicle updated successfully');
//     } catch (err) {
//       alert('Failed to update vehicle');
//       console.error('Update error:', err);
//     }
//   };

//   const renderActiveSection = () => {
//     switch (activeSection) {
//       case 'Manage Vehicles':
//         return (
//           <div>
//             <h1 className="text-3xl font-bold mb-4">Manage Vehicles</h1>
//             {isLoading ? (
//               <p>Loading vehicles...</p>
//             ) : error ? (
//               <p>Error loading vehicles: {error.toString()}</p>
//             ) : (
//               <>
//                 <button 
//                   className="bg-green-600 text-white px-4 py-2 rounded mb-4 hover:bg-green-700"
//                   onClick={handleAddNewVehicle}
//                 >
//                   Add New Vehicle
//                 </button>
//                 <table className="w-full bg-gray-900 rounded-lg overflow-hidden">
//                   <thead>
//                     <tr className="bg-gray-800"></tr>
//                     <th className="px-4 py-2">Vehicle ID</th>
//                       <th className="px-4 py-2">Manufacturer</th>
//                       <th className="px-4 py-2">Model</th>
//                       <th className="px-4 py-2">Year</th>
//                       <th className="px-4 py-2">Rental Rate</th>
//                       <th className="px-4 py-2">Availability</th>
//                       <th className="px-4 py-2">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {vehicles?.map((vehicle) => (
//                       <tr key={vehicle.vehicleId} className="border-t border-gray-800">
//                         <td className="px-4 py-2">{vehicle.vehicleId}</td>
//                         <td className="px-4 py-2">{vehicle.specification.manufacturer}</td>
//                         <td className="px-4 py-2">{vehicle.specification.model}</td>
//                         <td className="px-4 py-2">{vehicle.specification.year}</td>
//                         <td className="px-4 py-2">${vehicle.rentalRate}</td>
//                         <td className="px-4 py-2">{vehicle.availability ? 'Available' : 'Unavailable'}</td>
//                         <td className="px-4 py-2">
//                           <button 
//                             className="bg-blue-600 text-white px-2 py-1 rounded mr-2 hover:bg-blue-700"
//                             onClick={() => handleEdit(vehicle)}
//                           >
//                             Edit
//                           </button>
//                           <button 
//                             className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
//                             onClick={() => handleDelete(vehicle.vehicleId)}
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </>
//             )}
//           </div>
//         );
//       // ... other cases ...
//       default:
//         return (
//           <div>
//             <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
//             <p>Welcome to the admin dashboard. Select a section from the sidebar to manage various aspects of the car rental system.</p>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       <div className="w-64 bg-gray-900 text-white p-4">
//         <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
//         <nav>
//           <ul>
//             {['Dashboard', 'Manage Vehicles', 'Manage Users', 'Reports', 'Settings'].map((item) => (
//               <li key={item} className="mb-2">
//                 <button
//                   onClick={() => setActiveSection(item)}
//                   className={`w-full text-left py-2 px-4 rounded ${
//                     activeSection === item ? 'bg-red-600' : 'hover:bg-gray-800'
//                   }`}
//                 >
//                   {item}
//                 </button>
//               </li>
//             ))}
//             <li>
//               <button
//                 onClick={handleLogout}
//                 className="w-full text-left py-2 px-4 rounded hover:bg-gray-800"
//               >
//                 Logout
//               </button>
//             </li>
//           </ul>
//         </nav>
//       </div>
//       <main className="flex-1 p-8">
//         {renderActiveSection()}
//       </main>
//       {isAddModalOpen && (
//         <AddVehicleModal 
//           onClose={() => setIsAddModalOpen(false)} 
//           onSubmit={handleAddSubmit} 
//         />
//       )}
//       {isEditModalOpen && (
//         <EditVehicleModal 
//           vehicle={currentVehicle} 
//           onClose={() => setIsEditModalOpen(false)} 
//           onSubmit={handleEditSubmit} 
//         />
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;