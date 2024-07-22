import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../slices/authslice';
import { RootState } from '../store';
import { bookingApiSlice, Booking } from '../services/bookingApiSlice';
import apiSlice from '../services/apiSlice';


const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'dashboard' | 'bookVehicle' | 'currentBookings' | 'bookingHistory' | 'profile' | 'supportTickets'>('dashboard');

  const auth = useSelector((state: RootState) => state.auth);
  console.log("Auth state:", auth); 
  const { data: bookings, isLoading, isError, refetch } = bookingApiSlice.useGetBookingsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateBooking] = bookingApiSlice.useUpdateBookingMutation();


  const currentBookings = bookings?.filter((booking: Booking) => 
    (booking.bookingStatus === 'Pending' || booking.bookingStatus === 'Confirmed') && 
    booking.user?.email === auth.user?.email
  ) ?? [];
  
  const historyBookings = bookings?.filter((booking: Booking) => 
    (booking.bookingStatus === 'Cancelled' || booking.bookingStatus === 'Completed') && 
    booking.user?.email === auth.user?.email
  ) ?? [];

  const activeBookings = bookings?.filter((booking: Booking) => 
    (booking.bookingStatus === 'Pending' || booking.bookingStatus === 'Confirmed') && 
    booking.user?.email === auth.user?.email
  ) ?? [];

  const totalSpent = bookings?.reduce((total: number, booking: Booking) => {
    if (booking.bookingStatus === 'Confirmed' && booking.user?.email === auth.user?.email) {
      return total + booking.totalAmount;
    }
    return total;
  }, 0) ?? 0;

  const { data: profileData, isLoading: isProfileLoading, error: profileError } = apiSlice.useGetUserProfileQuery(auth.userId?.toString()) as {
    data: UserProfile | undefined;
    isLoading: boolean;
    error: unknown;
  };

console.log("Profile data:", profileData); // Check what's coming from the API
console.log("Profile loading:", isProfileLoading);
console.log("Profile error:", profileError);
  const [updateProfile] = apiSlice.useUpdateUserProfileMutation();
  interface UserProfile {
    fullName: string;
    email: string;
    contactPhone: string;
    address: string;
  }
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    fullName: '',
    email: '',
    contactPhone: '',
    address: ''
  });
  


  useEffect(() => {
    console.log("Effect running, profileData:", profileData);
    if (profileData) {
       console.log("Setting user profile:", profileData);
      setUserProfile({
        fullName: profileData.fullName || '',
        email: profileData.email || '',
        contactPhone: profileData.contactPhone || '',
        address: profileData.address || ''
      });
    }
  }, [profileData]);
console.log("Current userProfile state:", userProfile); // Check the current state

  useEffect(() => {
    if (bookings && bookings.length > 0) {
      console.log('Full booking object:', JSON.stringify(bookings[0], null, 2));
    }
  }, [bookings]);

  useEffect(() => {
    console.log('Auth state:', auth);
    console.log('User ID:', auth.userId);
    console.log('User object:', auth.user);
    console.log('All bookings:', bookings);
    console.log('Pending bookings:', currentBookings);
    console.log('History bookings:', historyBookings);
  }, [auth, bookings, currentBookings, historyBookings]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
  };

  const handlePayment = (booking: Booking) => {
    navigate('/payment', {
      state: {
        bookingData: {
          bookingId: booking.bookingId,
          bookingDate: booking.bookingDate,
          returnDate: booking.returnDate,
          locationId: booking.location.locationId
        },
        vehicleSummary: {
          imageUrl: booking.vehicle.imageUrl, // Add this if available
          manufacturer: booking.vehicle.manufacturer,
          model: booking.vehicle.model,
          category: booking.vehicle.category,
          rentalRate: booking.vehicle.rentalRate
        },
        totalAmount: booking.totalAmount
      }
    });
  };

  const handleCreateNewTicket = () => {
    navigate('/support-ticket');
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({ userId: auth.userId, ...userProfile }).unwrap();
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile');
    }
  };
  
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancelBooking = async (booking: Booking) => {
    const isConfirmed = window.confirm("Are you sure you want to cancel this booking? This action cannot be undone.");
    
    if (isConfirmed) {
      setIsCancelling(true);
      try {
        await updateBooking({
          bookingId: booking.bookingId,
          user: booking.user,
          vehicle: booking.vehicle,
          location: booking.location,
          bookingDate: booking.bookingDate,
          returnDate: booking.returnDate,
          totalAmount: booking.totalAmount,
          bookingStatus: 'Cancelled'
        }).unwrap();
        
        alert("Booking cancelled successfully!");
        refetch();
      } catch (error: any) {
        console.error('Failed to cancel booking:', error);
        let errorMessage = "Failed to cancel booking. " + (error.message || JSON.stringify(error.data) || "An unknown error occurred.");
        alert(errorMessage);
      } finally {
        setIsCancelling(false);
      }
    }
  };
  console.log('Pending bookings:', currentBookings);


  const renderCurrentBookings = () => {
    if (isLoading) {
      return <p>Loading bookings...</p>;
    }
  
    if (isError) {
      return <p>Error loading bookings. Please try again.</p>;
    }
  
    if (!bookings) {
      return <p>No bookings data available.</p>;
    }
  
    const currentBookings = bookings.filter((booking: Booking) => 
      (booking.bookingStatus === 'Pending' || booking.bookingStatus === 'Confirmed') && 
      booking.user?.email === auth.user?.email
    );
  
    if (currentBookings.length === 0) {
      return <p>No current bookings found.</p>;
    }
  
    return (
      <div className="flex flex-wrap -mx-2">
        {currentBookings.map((booking: Booking) => (
          <div key={booking.id} className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
            <div className="bg-gray-900 p-4 rounded-lg shadow-lg h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">{booking.vehicle.vehicleSpecId} - {booking.location.name}</h3>
                <p>Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p>Return Date: {new Date(booking.returnDate).toLocaleDateString()}</p>
                <p>Total Amount: ${booking.totalAmount}</p>
                <p>Location: {booking.location.name}</p>
                <p>Vehicle Daily Rate: ${booking.vehicle.rentalRate}</p>
                <p>Status: {booking.bookingStatus}</p>
              </div>
              <div className="mt-4 space-x-2">
                {booking.bookingStatus === 'Pending' && (
                  <button
                    className="bg-green-600 py-2 px-4 rounded hover:bg-green-700 transition"
                    onClick={() => handlePayment(booking)}
                  >
                    Pay
                  </button>
                )}
                <button
                  className="bg-red-600 py-2 px-4 rounded hover:bg-red-700 transition"
                  onClick={() => handleCancelBooking(booking)}
                  disabled={isCancelling}
                >
                  {isCancelling ? 'Cancelling...' : 'Cancel Booking'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderBookingHistory = () => {
    if (isLoading) {
      return <p>Loading booking history...</p>;
    }
  
    if (isError) {
      return <p>Error loading booking history. Please try again.</p>;
    }
  
    if (!bookings) {
      return <p>No booking history available.</p>;
    }
  
    if (historyBookings.length === 0) {
      return <p>No completed or cancelled bookings found.</p>;
    }

    return (
      <div className="flex flex-wrap -mx-2">
        {historyBookings.map((booking: Booking) => (
          <div key={booking.bookingId} className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
            <div className="bg-gray-900 p-4 rounded-lg shadow-lg h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">{booking.vehicle.vehicleSpecId} - {booking.location.name}</h3>
                <p>Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                <p>Return Date: {new Date(booking.returnDate).toLocaleDateString()}</p>
                <p>Total Amount: ${booking.totalAmount}</p>
                <p>Location: {booking.location.name}</p>
                <p>Status: {booking.bookingStatus}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };


  return (
    <div className="min-h-screen flex">
      <aside className="bg-gray-900 text-white w-64 p-4">
        <h2 className="text-2xl font-bold mb-8">User Dashboard</h2>
        <nav className="space-y-4">
          <a
            href="#"
            onClick={() => setActiveSection('dashboard')}
            className={`block text-lg p-2 rounded ${activeSection === 'dashboard' ? 'bg-red-600' : 'hover:bg-gray-700'}`}
          >
            Dashboard
          </a>
          <a
            href="#"
            onClick={() => setActiveSection('bookVehicle')}
            className={`block text-lg p-2 rounded ${activeSection === 'bookVehicle' ? 'bg-red-600' : 'hover:bg-gray-700'}`}
          >
            Book a Vehicle
          </a>
          <a
            href="#"
            onClick={() => setActiveSection('currentBookings')}
            className={`block text-lg p-2 rounded ${activeSection === 'currentBookings' ? 'bg-red-600' : 'hover:bg-gray-700'}`}
          >
            Current Bookings
          </a>
          <a
            href="#"
            onClick={() => setActiveSection('bookingHistory')}
            className={`block text-lg p-2 rounded ${activeSection === 'bookingHistory' ? 'bg-red-600' : 'hover:bg-gray-700'}`}
          >
            Booking History
          </a>
          <a
            href="#"
            onClick={() => setActiveSection('profile')}
            className={`block text-lg p-2 rounded ${activeSection === 'profile' ? 'bg-red-600' : 'hover:bg-gray-700'}`}
          >
            Profile
          </a>
          <a
            href="#"
            onClick={() => setActiveSection('supportTickets')}
            className={`block text-lg p-2 rounded ${activeSection === 'supportTickets' ? 'bg-red-600' : 'hover:bg-gray-700'}`}
          >
            Support Tickets
          </a>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-800 text-white p-8">
        <header className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {auth.user?.email.split('@')[0] || '[User Name]'}!</h1>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">Active Bookings</h2>
            <p className="text-2xl">{activeBookings.length}</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">Total Spent</h2>
            <p className="text-2xl">${totalSpent.toFixed(2)}</p>
          </div>
        </section>
        <section className="mb-8">
          {activeSection === 'dashboard' && (
            <div className="bg-gray-900 p-4 rounded-lg shadow-lg mb-4">
              <h2 className="text-xl font-bold">Dashboard</h2>
              <p>Here you can see an overview of your account activity.</p>
              {/* You can add more dashboard content here */}
            </div>
          )}
          {activeSection === 'bookVehicle' && (
            <div className="bg-gray-900 p-4 rounded-lg shadow-lg mb-4">
              <h2 className="text-xl font-bold">Book a Vehicle</h2>
              <button className="bg-red-600 py-2 px-4 rounded mt-2" onClick={() => navigate('/vehicles')}>Book Now</button>
              {/* Content for Book a Vehicle */}
            </div>
          )}
          {activeSection === 'currentBookings' && (
            <div className="bg-gray-900 p-4 rounded-lg shadow-lg mb-4">
              <h2 className="text-xl font-bold">Current Bookings</h2>
              {renderCurrentBookings()}
            </div>
          )}
          {activeSection === 'bookingHistory' && (
  <div className="bg-gray-900 p-4 rounded-lg shadow-lg mb-4">
    <h2 className="text-xl font-bold">Booking History</h2>
    {renderBookingHistory()}
  </div>
          )}
         {activeSection === 'profile' && (
  <div className="bg-gray-900 p-4 rounded-lg shadow-lg mb-4">
    <h2 className="text-xl font-bold mb-4">Profile Information</h2>
    {isProfileLoading ? (
      <p>Loading profile...</p>
    ) : profileError ? (
      <p>Error loading profile: {JSON.stringify(profileError)}</p>
    ) : !profileData ? (
      <p>No profile data available</p>
    ) : (
      <form className="space-y-4" onSubmit={handleSaveChanges}>
        <div>
          <label htmlFor="fullName" className="block mb-1">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={userProfile.fullName}
            onChange={(e) => setUserProfile({...userProfile, fullName: e.target.value})}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Email:</label>
          <input
            type="email"
            id="email"
            value={userProfile.email}
            onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block mb-1">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={userProfile.contactPhone}
            onChange={(e) => setUserProfile({...userProfile, contactPhone: e.target.value})}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>
        <div>
          <label htmlFor="address" className="block mb-1">Address:</label>
          <textarea
            id="address"
            value={userProfile.address}
            onChange={(e) => setUserProfile({...userProfile, address: e.target.value})}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>
        <div className="flex justify-between">
          <button type="submit" className="bg-red-600 py-2 px-4 rounded">
            Save Changes
          </button>
          <button
            type="button"
            className="bg-red-600 py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </form>
    )}
  </div>
)}
          {activeSection === 'supportTickets' && (
            <div className="bg-gray-900 p-4 rounded-lg shadow-lg mb-4">
              <h2 className="text-xl font-bold">Support Tickets</h2>
              <button 
          className="bg-red-600 py-2 px-4 rounded mt-2"
          onClick={handleCreateNewTicket}
        >
          Create New Ticket
        </button>
              
              {/* Content for Support Tickets */}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;
