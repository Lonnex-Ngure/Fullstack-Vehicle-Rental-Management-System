import { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/authslice';
import { useNavigate } from 'react-router-dom';
import {vehicleApiSlice} from '../services/vehicleApiSlice'
import {apiSlice, Ticket, FleetManagementItem } from '../services/apiSlice'
import { bookingApiSlice } from '../services/bookingApiSlice';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface User {
  userId: number;
  fullName: string;
  email: string;
  contactPhone: string;
  address: string;
  role: string;
}

interface Location {
  locationId: number;
  name: string;
  address: string;
  contactPhone: string;
}

interface Vehicle {
  vehicleId: number;
  specification: {
    manufacturer: string;
    model: string;
    year: number;
  };
  rentalRate: number;
  availability: boolean;
}


const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('Dashboard');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: vehicles, error, isLoading } = vehicleApiSlice.useFetchVehiclesQuery({});
  const { data: users, error: usersError, isLoading: isUsersLoading, refetch: refetchUsers } = apiSlice.useFetchUsersQuery();
  const [createUser] = apiSlice.useCreateUserMutation();
  const [updateUser] = apiSlice.useUpdateUserMutation();
  const [deleteUser] = apiSlice.useDeleteUserMutation();

  const { data: locations, error: locationsError, isLoading: isLocationsLoading, refetch: refetchLocations } = apiSlice.useGetLocationsQuery();
const [createLocation] = apiSlice.useCreateLocationMutation();
const [updateLocation] = apiSlice.useUpdateLocationMutation();
const [deleteLocation] = apiSlice.useDeleteLocationMutation();

const { data: tickets, error: ticketsError, isLoading: isTicketsLoading, refetch: refetchTickets } = apiSlice.useGetTicketsQuery();
const [updateTicket] = apiSlice.useUpdateTicketMutation();

const { data: fleetManagement, error: fleetError, isLoading: isFleetLoading, refetch: refetchFleet } = apiSlice.useGetFleetManagementQuery();
const [updateFleetItem] = apiSlice.useUpdateFleetManagementItemMutation();
const [deleteFleetItem] = apiSlice.useDeleteFleetManagementItemMutation();
const [createFleetItem] = apiSlice.useCreateFleetManagementItemMutation();

const [editingFleetItem, setEditingFleetItem] = useState<FleetManagementItem | null>(null);
const [newFleetItem, setNewFleetItem] = useState<Partial<FleetManagementItem>>({
  acquisitionDate: new Date().toISOString().split('T')[0],
  depreciationRate: 0,
  currentValue: 0,
  maintenanceCost: 0,
  status: 'Active',
  vehicle: {
    vehicleId: 0,
    rentalRate: 0,
    availability: true,
  },
});

const [editingLocation, setEditingLocation] = useState<Location | null>(null);
const [newLocation, setNewLocation] = useState<Partial<Location>>({
  name: '',
  address: '',
  contactPhone: '',
});
 
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<Partial<User>>({
    fullName: '',
    email: '',
    contactPhone: '',
    address: '',
    role: 'user',
  });
  
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async () => {
    if (editingUser) {
      try {
        await updateUser(editingUser).unwrap();
        setEditingUser(null);
        refetchUsers();
      } catch (err) {
        console.error('Failed to update user:', err);
      }
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUser(userId).unwrap();
      refetchUsers();
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  const handleAddNewUser = async () => {
    try {
      await createUser(newUser).unwrap();
      setNewUser({
        fullName: '',
        email: '',
        contactPhone: '',
        address: '',
        role: 'user',
      });
      refetchUsers();
    } catch (err) {
      console.error('Failed to add new user:', err);
    }
  };

  const handleEditLocation = (location: Location) => {
    setEditingLocation(location);
  };
  
  const handleUpdateLocation = async () => {
    if (editingLocation) {
      try {
        await updateLocation(editingLocation).unwrap();
        setEditingLocation(null);
        refetchLocations();
      } catch (err) {
        console.error('Failed to update location:', err);
      }
    }
  };
  
  const handleDeleteLocation = async (locationId: number) => {
    try {
      await deleteLocation(locationId).unwrap();
      refetchLocations();
    } catch (err) {
      console.error('Failed to delete location:', err);
    }
  };
  
  const handleAddNewLocation = async () => {
    try {
      await createLocation(newLocation).unwrap();
      setNewLocation({
        name: '',
        address: '',
        contactPhone: '',
      });
      refetchLocations();
    } catch (err) {
      console.error('Failed to add new location:', err);
    }
  };

  const handleViewTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  const handleResolveTicket = async (ticketId: number) => {
    try {
      const ticketToUpdate = tickets?.find(t => t.ticketId === ticketId);
      if (!ticketToUpdate) {
        console.error('Ticket not found');
        return;
      }
      const updatedTicket = {
        ticketId,
        status: 'Resolved',
        subject: ticketToUpdate.subject,
        description: ticketToUpdate.description,
        userId: ticketToUpdate.user.userId
      };
      console.log('Sending update request with data:', updatedTicket);
      const result = await updateTicket(updatedTicket).unwrap();
      console.log('Update response:', result);
      refetchTickets();
      setSelectedTicket(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to resolve ticket:', error.message);
      } else {
        console.error('Failed to resolve ticket:', String(error));
      }
      if (typeof error === 'object' && error !== null && 'data' in error) {
        console.error('Server error response:', (error as { data: unknown }).data);
      }
    }
  };

  const handleEditFleetItem = (item: FleetManagementItem) => {
    setEditingFleetItem(item);
  };

  const handleUpdateFleetItem = async () => {
    if (editingFleetItem) {
      try {
        const updatedItem = {
          fleetId: editingFleetItem.fleetId,
          vehicleId: editingFleetItem.vehicle.vehicleId,
          acquisitionDate: editingFleetItem.acquisitionDate,
          depreciationRate: editingFleetItem.depreciationRate,
          currentValue: editingFleetItem.currentValue,
          maintenanceCost: editingFleetItem.maintenanceCost,
          status: editingFleetItem.status
        };
        await updateFleetItem(updatedItem).unwrap();
        setEditingFleetItem(null);
        refetchFleet();
      } catch (err) {
        console.error('Failed to update fleet item:', err);
      }
    }
  };
  
  const handleDeleteFleetItem = async (fleetId: number) => {
    try {
      await deleteFleetItem(fleetId).unwrap();
      refetchFleet();
    } catch (err) {
      console.error('Failed to delete fleet item:', err);
    }
  };
  
  const handleAddNewFleetItem = async () => {
    try {
      const newItem = {
        vehicleId: newFleetItem.vehicle?.vehicleId || 0,
        acquisitionDate: new Date(newFleetItem.acquisitionDate || '').toISOString(),
        depreciationRate: newFleetItem.depreciationRate || 0,
        currentValue: newFleetItem.currentValue || 0,
        maintenanceCost: newFleetItem.maintenanceCost || 0,
        status: newFleetItem.status || 'Active',
      };
      await createFleetItem(newItem).unwrap();
      setNewFleetItem({
        acquisitionDate: new Date().toISOString().split('T')[0],
        depreciationRate: 0,
        currentValue: 0,
        maintenanceCost: 0,
        status: 'Active',
        vehicle: {
          vehicleId: 0,
          rentalRate: 0,
          availability: true,
        },
      });
      refetchFleet();
    } catch (err) {
      console.error('Failed to add new fleet item:', err);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetchFleet();
    }, 30000); // Refetch every 30 seconds

    return () => clearInterval(intervalId);
  }, [refetchFleet]);

  const { data: bookings, error: _bookingsError, isLoading: _isBookingsLoading } = bookingApiSlice.useGetBookingsQuery();

  const [totalBookings, setTotalBookings] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [monthlyData, setMonthlyData] = useState<{ [key: string]: { bookings: number; revenue: number } }>({});

  useEffect(() => {
    if (bookings) {
      setTotalBookings(bookings.length);
      const revenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
      setTotalRevenue(revenue);

      const monthlyStats: { [key: string]: { bookings: number; revenue: number } } = {};
      bookings.forEach(booking => {
        const month = new Date(booking.bookingDate).toLocaleString('default', { month: 'long' });
        if (!monthlyStats[month]) {
          monthlyStats[month] = { bookings: 0, revenue: 0 };
        }
        monthlyStats[month].bookings += 1;
        monthlyStats[month].revenue += booking.totalAmount;
      });
      setMonthlyData(monthlyStats);
    }
  }, [bookings]);

  const chartData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: 'Bookings',
        data: Object.values(monthlyData).map(data => data.bookings),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Revenue',
        data: Object.values(monthlyData).map(data => data.revenue),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Bookings and Revenue',
      },
    },
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'Dashboard':
        return (
          <>
            <header className="mb-8">
              <h1 className="text-3xl font-bold">Overview</h1>
            </header>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold">Total Bookings</h2>
                <p className="text-2xl">{totalBookings}</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold">Total Revenue</h2>
                <p className="text-2xl">${totalRevenue.toLocaleString()}</p>
              </div>
            </section>
            <section className="mb-8">
              <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Monthly Statistics</h2>
                <Bar options={chartOptions} data={chartData} />
              </div>
            </section>
          </>
        );
        case 'Manage Vehicles':
          return (
            <div>
              <h1 className="text-3xl font-bold mb-4">Manage Vehicles</h1>
              {isLoading ? (
                <p>Loading vehicles...</p>
              ) : error ? (
                <p>Error loading vehicles: {error.toString()}</p>
              ) : (
                <>
                  <table className="w-full bg-gray-900 rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-gray-800">
                        <th className="px-4 py-2">Vehicle ID</th>
                        <th className="px-4 py-2">Manufacturer</th>
                        <th className="px-4 py-2">Model</th>
                        <th className="px-4 py-2">Year</th>
                        <th className="px-4 py-2">Rental Rate</th>
                        <th className="px-4 py-2">Availability</th>
                        <th className="px-4 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    {vehicles?.map((vehicle: Vehicle) => (
                        <tr key={vehicle.vehicleId} className="border-t border-gray-800">
                          <td className="px-4 py-2">{vehicle.vehicleId}</td>
                          <td className="px-4 py-2">{vehicle.specification.manufacturer}</td>
                          <td className="px-4 py-2">{vehicle.specification.model}</td>
                          <td className="px-4 py-2">{vehicle.specification.year}</td>
                          <td className="px-4 py-2">${vehicle.rentalRate}</td>
                          <td className="px-4 py-2">{vehicle.availability ? 'Available' : 'Unavailable'}</td>
                          <td className="px-4 py-2">
                            <button className="bg-blue-600 text-white px-2 py-1 rounded mr-2" onClick={() => handleEdit(vehicle.vehicleId)}>
                              Edit
                            </button>
                            <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleDelete(vehicle.vehicleId)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button className="bg-red-600 text-white px-4 py-2 rounded mt-4" onClick={handleAddNewVehicle}>
                    Add New Vehicle
                  </button>
                </>
              )}
            </div>
          );
      case 'Manage Users':
        return (
          <div>
             <h1 className="text-3xl font-bold mb-4">Manage Users</h1>
      {isUsersLoading ? (
        <p>Loading users...</p>
      ) : usersError ? (
        <p>Error loading users: {usersError.toString()}</p>
      ) : (
        <>
          <table className="w-full bg-gray-900 rounded-lg overflow-hidden mb-4">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">Full Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Contact Phone</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user: User) => (
                <tr key={user.userId} className="border-t border-gray-800">
                  <td className="px-4 py-2">{user.userId}</td>
                  <td className="px-4 py-2">
                    {editingUser?.userId === user.userId ? (
                      <input
                        className="bg-gray-700 px-2 py-1 rounded"
                        value={editingUser.fullName}
                        onChange={(e) => setEditingUser({ ...editingUser, fullName: e.target.value })}
                      />
                    ) : (
                      user.fullName
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingUser?.userId === user.userId ? (
                      <input
                        className="bg-gray-700 px-2 py-1 rounded"
                        value={editingUser.email}
                        onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingUser?.userId === user.userId ? (
                      <input
                        className="bg-gray-700 px-2 py-1 rounded"
                        value={editingUser.contactPhone}
                        onChange={(e) => setEditingUser({ ...editingUser, contactPhone: e.target.value })}
                      />
                    ) : (
                      user.contactPhone
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingUser?.userId === user.userId ? (
                      <input
                        className="bg-gray-700 px-2 py-1 rounded"
                        value={editingUser.address}
                        onChange={(e) => setEditingUser({ ...editingUser, address: e.target.value })}
                      />
                    ) : (
                      user.address
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingUser?.userId === user.userId ? (
                      <select
                        className="bg-gray-700 px-2 py-1 rounded"
                        value={editingUser.role}
                        onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingUser?.userId === user.userId ? (
                      <>
                        <button
                          className="bg-green-600 text-white px-2 py-1 rounded mr-2"
                          onClick={handleUpdateUser}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-600 text-white px-2 py-1 rounded"
                          onClick={() => setEditingUser(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="bg-blue-600 text-white px-2 py-1 rounded mr-2"
                          onClick={() => handleEditUser(user)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 text-white px-2 py-1 rounded"
                          onClick={() => handleDeleteUser(user.userId)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="bg-gray-900 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                className="bg-gray-700 px-2 py-1 rounded"
                placeholder="Full Name"
                value={newUser.fullName}
                onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
              />
              <input
                className="bg-gray-700 px-2 py-1 rounded"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
              <input
                className="bg-gray-700 px-2 py-1 rounded"
                placeholder="Contact Phone"
                value={newUser.contactPhone}
                onChange={(e) => setNewUser({ ...newUser, contactPhone: e.target.value })}
              />
              <input
                className="bg-gray-700 px-2 py-1 rounded"
                placeholder="Address"
                value={newUser.address}
                onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
              />
              <select
                className="bg-gray-700 px-2 py-1 rounded"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded mt-4"
              onClick={handleAddNewUser}
            >
              Add New User
            </button>
          </div>
        </>
      )}
    </div>
  );
      case 'Reports':
        return (
          <div>
            <h1 className="text-3xl font-bold mb-4">Reports</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Revenue Report */}
              <div className="bg-gray-900 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-2">Revenue Report</h2>
                <Bar options={chartOptions} data={chartData} />
              </div>
      
              {/* Vehicle Utilization Report */}
              <div className="bg-gray-900 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-2">Vehicle Utilization</h2>
                <p>Total Vehicles: {fleetManagement?.length}</p>
                <p>Available Vehicles: {fleetManagement?.filter(item => item.vehicle.availability).length}</p>
                <p>Utilization Rate: {((fleetManagement?.filter(item => !item.vehicle.availability).length || 0) / (fleetManagement?.length || 1) * 100).toFixed(2)}%</p>
              </div>
      
              {/* Maintenance Cost Report */}
              <div className="bg-gray-900 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-2">Maintenance Cost Report</h2>
                <p>Total Maintenance Cost: ${fleetManagement?.reduce((sum, item) => sum + item.maintenanceCost, 0).toLocaleString()}</p>
                <p>Average Cost per Vehicle: ${(fleetManagement 
  ? fleetManagement.reduce((sum, item) => sum + (item.maintenanceCost || 0), 0) / fleetManagement.length 
  : 0).toFixed(2)}</p>
              </div>
      
              {/* Customer Support Report */}
              <div className="bg-gray-900 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-2">Customer Support Report</h2>
                <p>Total Tickets: {tickets?.length}</p>
                <p>Open Tickets: {tickets?.filter(ticket => ticket.status !== 'Resolved').length}</p>
                <p>Resolution Rate: {((tickets?.filter(ticket => ticket.status === 'Resolved').length || 0) / (tickets?.length || 1) * 100).toFixed(2)}%</p>
              </div>
      
              {/* User Demographics Report */}
              <div className="bg-gray-900 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-2">User Demographics</h2>
                <p>Total Users: {users?.length}</p>
                <p>Admin Users: {users?.filter(user => user.role === 'admin').length}</p>
                <p>Regular Users: {users?.filter(user => user.role === 'user').length}</p>
              </div>
      
              {/* Fleet Value Report */}
              <div className="bg-gray-900 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-2">Fleet Value Report</h2>
                <p>Total Fleet Value: ${fleetManagement?.reduce((sum, item) => sum + item.currentValue, 0).toLocaleString()}</p>
                <p>Average Vehicle Value: ${(fleetManagement 
  ? fleetManagement.reduce((sum, item) => sum + (item.currentValue || 0), 0) / fleetManagement.length 
  : 0).toFixed(2)}</p>
              </div>
            </div>
          </div>
        );
      case 'Locations and Branches':
        return (
          <div>
            <h1 className="text-3xl font-bold mb-4">Locations and Branches</h1>
            {isLocationsLoading ? (
              <p>Loading locations...</p>
            ) : locationsError ? (
              <p>Error loading locations: {locationsError.toString()}</p>
            ) : (
              <>
                <table className="w-full bg-gray-900 rounded-lg overflow-hidden mb-4">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="px-4 py-2">Location ID</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Address</th>
                      <th className="px-4 py-2">Contact Phone</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {locations?.map((location: Location) => (
                      <tr key={location.locationId} className="border-t border-gray-800">
                        <td className="px-4 py-2">{location.locationId}</td>
                        <td className="px-4 py-2">
                          {editingLocation?.locationId === location.locationId ? (
                            <input
                              className="bg-gray-700 px-2 py-1 rounded"
                              value={editingLocation.name}
                              onChange={(e) => setEditingLocation({ ...editingLocation, name: e.target.value })}
                            />
                          ) : (
                            location.name
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {editingLocation?.locationId === location.locationId ? (
                            <input
                              className="bg-gray-700 px-2 py-1 rounded"
                              value={editingLocation.address}
                              onChange={(e) => setEditingLocation({ ...editingLocation, address: e.target.value })}
                            />
                          ) : (
                            location.address
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {editingLocation?.locationId === location.locationId ? (
                            <input
                              className="bg-gray-700 px-2 py-1 rounded"
                              value={editingLocation.contactPhone}
                              onChange={(e) => setEditingLocation({ ...editingLocation, contactPhone: e.target.value })}
                            />
                          ) : (
                            location.contactPhone
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {editingLocation?.locationId === location.locationId ? (
                            <>
                              <button
                                className="bg-green-600 text-white px-2 py-1 rounded mr-2"
                                onClick={handleUpdateLocation}
                              >
                                Save
                              </button>
                              <button
                                className="bg-gray-600 text-white px-2 py-1 rounded"
                                onClick={() => setEditingLocation(null)}
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="bg-blue-600 text-white px-2 py-1 rounded mr-2"
                                onClick={() => handleEditLocation(location)}
                              >
                                Edit
                              </button>
                              <button
                                className="bg-red-600 text-white px-2 py-1 rounded"
                                onClick={() => handleDeleteLocation(location.locationId)}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h2 className="text-xl font-bold mb-4">Add New Location</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      className="bg-gray-700 px-2 py-1 rounded"
                      placeholder="Name"
                      value={newLocation.name}
                      onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                    />
                    <input
                      className="bg-gray-700 px-2 py-1 rounded"
                      placeholder="Address"
                      value={newLocation.address}
                      onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
                    />
                    <input
                      className="bg-gray-700 px-2 py-1 rounded"
                      placeholder="Contact Phone"
                      value={newLocation.contactPhone}
                      onChange={(e) => setNewLocation({ ...newLocation, contactPhone: e.target.value })}
                    />
                  </div>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded mt-4"
                    onClick={handleAddNewLocation}
                  >
                    Add New Location
                  </button>
                </div>
              </>
            )}
          </div>
        );
      case 'Customer Support Tickets':
       return (
          <div>
            <h1 className="text-3xl font-bold mb-4">Customer Support Tickets</h1>
            {isTicketsLoading ? (
              <p>Loading tickets...</p>
            ) : ticketsError ? (
              <p>Error loading tickets: {ticketsError.toString()}</p>
            ) : (
              <>
                <table className="w-full bg-gray-900 rounded-lg overflow-hidden mb-4">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="px-4 py-2">Ticket ID</th>
                      <th className="px-4 py-2">User</th>
                      <th className="px-4 py-2">Subject</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets?.map((ticket: Ticket) => (
                      <tr key={ticket.ticketId} className="border-t border-gray-800">
                        <td className="px-4 py-2">{ticket.ticketId}</td>
                        <td className="px-4 py-2">{ticket.user.fullName}</td>
                        <td className="px-4 py-2">{ticket.subject}</td>
                        <td className="px-4 py-2">{ticket.status}</td>
                        <td className="px-4 py-2">
                          <button
                            className="bg-blue-600 text-white px-2 py-1 rounded mr-2"
                            onClick={() => handleViewTicket(ticket)}
                          >
                            View
                          </button>
                          {ticket.status !== 'Resolved' && (
                           <button
                               className="bg-green-600 text-white px-2 py-1 rounded"
                               onClick={() => handleResolveTicket(ticket.ticketId)}
                                 >
                                Resolve
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {selectedTicket && (
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Ticket Details</h2>
                    <p><strong>Subject:</strong> {selectedTicket.subject}</p>
                    <p><strong>Description:</strong> {selectedTicket.description}</p>
                    <p><strong>Status:</strong> {selectedTicket.status}</p>
                    <p><strong>User:</strong> {selectedTicket.user.fullName} ({selectedTicket.user.email})</p>
                    {selectedTicket.status !== 'Resolved' && (
                      <button
                         className="bg-green-600 text-white px-2 py-1 rounded"
                         onClick={() => handleResolveTicket(selectedTicket.ticketId)}
                            >
                          Resolve
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        );
      case 'Fleet Management':
        return (
          <div>
            <h1 className="text-3xl font-bold mb-4">Fleet Management</h1>
            {isFleetLoading ? (
              <p>Loading fleet management data...</p>
            ) : fleetError ? (
              <p>Error loading fleet management data: {fleetError.toString()}</p>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h2 className="text-xl font-bold">Total Vehicles</h2>
                    <p className="text-2xl">{fleetManagement?.length}</p>
                  </div>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h2 className="text-xl font-bold">Vehicles Available</h2>
                    <p className="text-2xl">
                      {fleetManagement?.filter(item => item.vehicle.availability).length}
                    </p>
                  </div>
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <h2 className="text-xl font-bold">Under Maintenance</h2>
                    <p className="text-2xl">
                      {fleetManagement?.filter(item => item.status === 'Under Maintenance').length}
                    </p>
                  </div>
                </div>
                <table className="w-full bg-gray-900 rounded-lg overflow-hidden mb-4">
                  <thead>
                    <tr className="bg-gray-800">
                    <th className="px-4 py-2">Fleet ID</th>
                <th className="px-4 py-2">Vehicle ID</th>
                <th className="px-4 py-2">Acquisition Date</th>
                <th className="px-4 py-2">Depreciation Rate</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Current Value</th>
                <th className="px-4 py-2">Maintenance Cost</th>
               
                <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fleetManagement?.map((item: FleetManagementItem) => (
                      <tr key={item.fleetId} className="border-t border-gray-800">
                        <td className="px-4 py-2">{item.fleetId}</td>
                        <td className="px-4 py-2">
                          {editingFleetItem?.fleetId === item.fleetId ? (
                            <input
                              className="bg-gray-700 px-2 py-1 rounded"
                              value={editingFleetItem.vehicle.vehicleId}
                              onChange={(e) => setEditingFleetItem({
                                ...editingFleetItem,
                                vehicle: { ...editingFleetItem.vehicle, vehicleId: parseInt(e.target.value) }
                              })}
                            />
                          ) : (
                            item.vehicle.vehicleId
                          )}
                        </td>
                        <td className="px-4 py-2">
                    {editingFleetItem?.fleetId === item.fleetId ? (
                      <input
                        className="bg-gray-700 px-2 py-1 rounded"
                        type="date"
                        value={editingFleetItem.acquisitionDate.split('T')[0]}
                        onChange={(e) => setEditingFleetItem({ ...editingFleetItem, acquisitionDate: e.target.value })}
                      />
                    ) : (
                      new Date(item.acquisitionDate).toLocaleDateString()
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingFleetItem?.fleetId === item.fleetId ? (
                      <input
                        className="bg-gray-700 px-2 py-1 rounded"
                        type="number"
                        value={editingFleetItem.depreciationRate}
                        onChange={(e) => setEditingFleetItem({ ...editingFleetItem, depreciationRate: parseFloat(e.target.value) })}
                      />
                    ) : (
                      item.depreciationRate
                    )}
                  </td>
                        <td className="px-4 py-2">
                          {editingFleetItem?.fleetId === item.fleetId ? (
                            <select
                              className="bg-gray-700 px-2 py-1 rounded"
                              value={editingFleetItem.status}
                              onChange={(e) => setEditingFleetItem({ ...editingFleetItem, status: e.target.value })}
                            >
                              <option value="Active">Active</option>
                              <option value="Under Maintenance">Under Maintenance</option>
                              <option value="Out of Service">Out of Service</option>
                            </select>
                          ) : (
                            item.status
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {editingFleetItem?.fleetId === item.fleetId ? (
                            <input
                              className="bg-gray-700 px-2 py-1 rounded"
                              type="number"
                              value={editingFleetItem.currentValue}
                              onChange={(e) => setEditingFleetItem({ ...editingFleetItem, currentValue: parseFloat(e.target.value) })}
                            />
                          ) : (
                            `$${item.currentValue.toLocaleString()}`
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {editingFleetItem?.fleetId === item.fleetId ? (
                            <input
                              className="bg-gray-700 px-2 py-1 rounded"
                              type="number"
                              value={editingFleetItem.maintenanceCost}
                              onChange={(e) => setEditingFleetItem({ ...editingFleetItem, maintenanceCost: parseFloat(e.target.value) })}
                            />
                          ) : (
                            `$${item.maintenanceCost.toLocaleString()}`
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {editingFleetItem?.fleetId === item.fleetId ? (
                            <>
                              <button
                                className="bg-green-600 text-white px-2 py-1 rounded mr-2"
                                onClick={handleUpdateFleetItem}
                              >
                                Save
                              </button>
                              <button
                                className="bg-gray-600 text-white px-2 py-1 rounded"
                                onClick={() => setEditingFleetItem(null)}
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="bg-blue-600 text-white px-2 py-1 rounded mr-2"
                                onClick={() => handleEditFleetItem(item)}
                              >
                                Edit
                              </button>
                              <button
                                className="bg-red-600 text-white px-2 py-1 rounded"
                                onClick={() => handleDeleteFleetItem(item.fleetId)}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="bg-gray-900 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Add New Fleet Item</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                className="bg-gray-700 px-2 py-1 rounded"
                type="number"
                placeholder="Vehicle ID"
                value={newFleetItem.vehicle?.vehicleId || ''}
                onChange={(e) => setNewFleetItem({
                  ...newFleetItem,
                  vehicle: { 
                    ...newFleetItem.vehicle, 
                    vehicleId: parseInt(e.target.value),
                    rentalRate: newFleetItem.vehicle?.rentalRate || 0,
                    availability: newFleetItem.vehicle?.availability || true
                  }
                })}
              />
              <input
                className="bg-gray-700 px-2 py-1 rounded"
                type="date"
                placeholder="Acquisition Date"
                value={newFleetItem.acquisitionDate?.split('T')[0] || ''}
                onChange={(e) => setNewFleetItem({ ...newFleetItem, acquisitionDate: e.target.value })}
              />
              <input
                className="bg-gray-700 px-2 py-1 rounded"
                type="number"
                placeholder="Depreciation Rate"
                value={newFleetItem.depreciationRate || ''}
                onChange={(e) => setNewFleetItem({ ...newFleetItem, depreciationRate: parseFloat(e.target.value) })}
              />
              <input
                className="bg-gray-700 px-2 py-1 rounded"
                type="number"
                placeholder="Current Value"
                value={newFleetItem.currentValue || ''}
                onChange={(e) => setNewFleetItem({ ...newFleetItem, currentValue: parseFloat(e.target.value) })}
              />
              <input
                className="bg-gray-700 px-2 py-1 rounded"
                type="number"
                placeholder="Maintenance Cost"
                value={newFleetItem.maintenanceCost || ''}
                onChange={(e) => setNewFleetItem({ ...newFleetItem, maintenanceCost: parseFloat(e.target.value) })}
              />
              <select
                className="bg-gray-700 px-2 py-1 rounded"
                value={newFleetItem.status || ''}
                onChange={(e) => setNewFleetItem({ ...newFleetItem, status: e.target.value })}
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Under Maintenance">Under Maintenance</option>
                <option value="Out of Service">Out of Service</option>
              </select>
            </div>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded mt-4"
              onClick={handleAddNewFleetItem}
            >
              Add New Fleet Item
            </button>
          </div>
        </>
      )}
    </div>
  );

      case 'Settings':
        return (
          <div>
            <h1 className="text-3xl font-bold mb-4">Settings</h1>
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">General Settings</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Company Name</label>
                <input
                  type="text"
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded"
                  placeholder="Enter company name"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Contact Email</label>
                <input
                  type="email"
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded"
                  placeholder="Enter contact email"
                />
              </div>
      
              <h2 className="text-xl font-bold mb-4">Security Settings</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Password Policy</label>
                <select className="w-full bg-gray-800 text-white px-3 py-2 rounded">
                  <option>Strong (min. 12 characters, uppercase, lowercase, number, symbol)</option>
                  <option>Medium (min. 8 characters, uppercase, lowercase, number)</option>
                  <option>Basic (min. 6 characters)</option>
                </select>
              </div>
              <div className="mb-6 flex items-center">
                <input type="checkbox" id="twoFactor" className="mr-2" />
                <label htmlFor="twoFactor" className="text-sm font-medium">Enable Two-Factor Authentication</label>
              </div>
      
              <h2 className="text-xl font-bold mb-4">Notification Settings</h2>
              <div className="mb-4 flex items-center">
                <input type="checkbox" id="emailNotifications" className="mr-2" />
                <label htmlFor="emailNotifications" className="text-sm font-medium">Enable Email Notifications</label>
              </div>
              <div className="mb-6 flex items-center">
                <input type="checkbox" id="smsNotifications" className="mr-2" />
                <label htmlFor="smsNotifications" className="text-sm font-medium">Enable SMS Notifications</label>
              </div>
      
              <h2 className="text-xl font-bold mb-4">Data Management</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Data Retention Period</label>
                <select className="w-full bg-gray-800 text-white px-3 py-2 rounded">
                  <option>1 year</option>
                  <option>2 years</option>
                  <option>3 years</option>
                  <option>5 years</option>
                </select>
              </div>
              <div className="mb-6">
                <button className="bg-blue-600 text-white px-4 py-2 rounded mr-2">Export All Data</button>
                <button className="bg-red-600 text-white px-4 py-2 rounded">Delete All Data</button>
              </div>
      
              <button className="bg-red-600 text-white px-6 py-2 rounded font-bold">
                Save Changes
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleEdit = (id: number) => {
    // Implement edit functionality
    console.log(`Edit vehicle with id: ${id}`);
  };

  const handleDelete = (id: number) => {
    // Implement delete functionality
    console.log(`Delete vehicle with id: ${id}`);
  };

  const handleAddNewVehicle = () => {
    // Implement add new vehicle functionality
    console.log('Add new vehicle');
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <nav>
          <ul>
            {['Dashboard', 'Manage Vehicles', 'Manage Users', 'Reports', 'Locations and Branches', 'Customer Support Tickets', 'Fleet Management', 'Settings'].map((item) => (
              <li key={item} className="mb-2">
                <button
                  onClick={() => setActiveSection(item)}
                  className={`w-full text-left py-2 px-4 rounded ${
                    activeSection === item ? 'bg-red-600' : 'hover:bg-gray-800'
                  }`}
                >
                  {item}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left py-2 px-4 rounded hover:bg-gray-800"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <main className="flex-1 bg-gray-800 text-white p-8">
        {renderActiveSection()}
      </main>
    </div>
  );
};

export default AdminDashboard;