import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BookingConfirmation: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/user/dashboard');
    }, 20000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="bg-gray-700 min-h-screen text-white flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto py-8 flex items-center justify-center">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Booking Confirmed!</h2>
            <div className="animate-pulse">
              <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="mt-4 text-xl">Thank you for your booking.</p>
            <p className="mt-2">Your payment has been processed successfully.</p>
            <p className="mt-4 text-sm text-gray-400">You will be redirected to your dashboard in few seconds...</p>
          </div>
          <div className="mt-8">
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div className="bg-green-600 h-2.5 rounded-full animate-[grow_15s_linear]"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingConfirmation;