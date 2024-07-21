import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { bookingApiSlice } from '../services/bookingApiSlice';

const stripePromise = loadStripe('pk_test_51PdSAoRrHTEGWLv6NqycQD3vltrtTEgrM6BZ4jfkLSvYsLtg4PQptNsldUuPa1fkg66H7VXh4RBUQv68fMV3cayL00gMnm0C2c');

interface PaymentFormProps {
  clientSecret: string;
  bookingId: number;
  totalAmount: number;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ bookingId, totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processPayment] = bookingApiSlice.useProcessPaymentMutation();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProcessing(true);
  
    if (!stripe || !elements) {
      setError('Stripe has not been initialized');
      setProcessing(false);
      return;
    }
  
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError('Card element not found');
      setProcessing(false);
      return;
    }
  
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
  
      if (error) {
        setError(error.message || 'An error occurred during payment method creation');
      } else if (paymentMethod) {
        const response = await processPayment({ 
          bookingId, 
          paymentMethodId: paymentMethod.id 
        }).unwrap();
        
        if (response) {
          alert('Payment successful!');
          navigate('/booking-confirmation');
        } else {
          setError('Payment failed. Please try again.');
        }
      }
    } catch (err) {
      setError('An error occurred during payment processing. Please try again.');
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full py-2 mt-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded disabled:opacity-50"
      >
        {processing ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
      </button>
    </form>
  );
};

interface BookingData {
  bookingId: number;
  bookingDate: string;
  returnDate: string;
  locationId: number;
}

interface VehicleSummary {
  imageUrl?: string;
  manufacturer: string;
  model: string;
  category: string;
  rentalRate: number;
}

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as { bookingData: BookingData; vehicleSummary: VehicleSummary; totalAmount: number } | null;
  const { bookingData, vehicleSummary, totalAmount } = state || {};
  const [clientSecret, setClientSecret] = useState<string>('');
  const [createPaymentIntent] = bookingApiSlice.useCreatePaymentIntentMutation();

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      if (totalAmount) {
        try {
          const response = await createPaymentIntent({ amount: totalAmount });
          // Fix: Add type guard to check if 'data' property exists
          if ('data' in response && response.data && 'clientSecret' in response.data) {
            setClientSecret(response.data.clientSecret);
          } else {
            console.error('Error creating payment intent:', 'data' in response ? response.error : 'Unknown error');
          }
        } catch (error) {
          console.error('Error creating payment intent:', error);
        }
      }
    };

    fetchPaymentIntent();
  }, [createPaymentIntent, totalAmount]);

  if (!bookingData || !vehicleSummary || !totalAmount) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-700 min-h-screen text-white">
      <Header />
      <div className="container mx-auto py-8">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Booking Summary</h2>
            <div className="flex mb-4">
              <img src={vehicleSummary.imageUrl || "vehicle-summary.jpg"} alt="Selected Vehicle" className="w-48 h-32 object-cover rounded" />
              <div className="ml-4">
                <p>{vehicleSummary.manufacturer} {vehicleSummary.model}</p>
                <p>{vehicleSummary.category}</p>
                <p>Rental Rate: ${vehicleSummary.rentalRate}/day</p>
              </div>
            </div>
            <p>Rental Period: {new Date(bookingData.bookingDate).toLocaleDateString()} - {new Date(bookingData.returnDate).toLocaleDateString()}</p>
            <p>Location ID: {bookingData.locationId}</p>
            <p className="font-bold mt-2">Total Amount: ${totalAmount.toFixed(2)}</p>
          </div>
          {clientSecret && (
            <Elements stripe={stripePromise}>
              <PaymentForm clientSecret={clientSecret} bookingId={bookingData.bookingId} totalAmount={totalAmount} />
            </Elements>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;