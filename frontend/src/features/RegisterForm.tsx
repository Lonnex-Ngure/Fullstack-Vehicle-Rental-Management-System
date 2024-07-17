import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { apiSlice } from '../services/apiSlice';
import { useNavigate } from 'react-router-dom';

interface FormData {
  fullName: string;
  email: string;
  contactPhone: string;
  address: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [registerUser] = apiSlice.useRegisterUserMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      console.log('Attempting to register user...');
      const result = await registerUser(data).unwrap();
      console.log('Registration successful:', result);
      
      // Add a small delay before navigation
      setTimeout(() => {
        console.log('Navigating to login page...');
        navigate('/login');
      }, 100);
    } catch (error) {
      console.error('Failed to register user:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700">
      <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-8">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              id="fullName"
              className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Full Name"
              {...register('fullName')}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Email"
              {...register('email')}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contactPhone" className="block text-sm font-medium mb-2">Contact Phone</label>
            <input
              type="text"
              id="contactPhone"
              className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Contact Phone"
              {...register('contactPhone')}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium mb-2">Address</label>
            <input
              type="text"
              id="address"
              className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Address"
              {...register('address')}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Password"
              {...register('password')}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
