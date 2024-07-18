import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { apiSlice } from '../services/apiSlice'; 
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../slices/authslice';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../store';

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [loginUser] = apiSlice.useLoginUserMutation(); 
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const userRole = useSelector((state: RootState) => state.auth.user?.role);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response: any = await loginUser(data).unwrap();
      dispatch(login({
        user: {
          id: response.user.userId,
          email: response.user.email,
          role: response.user.role // Make sure your API returns the user's role
        },
        token: response.token
      }));
      localStorage.setItem('token', response.token);
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  const userId = useSelector((state: RootState) => state.auth.userId);
  useEffect(() => {
    if (userId) {
      console.log('User ID in Redux store:', userId);
    }
  }, [userId]);

  useEffect(() => {
    if (isAuthenticated) {
      if (userRole === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    }
  }, [isAuthenticated, userRole, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700">
      <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-8">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email or User ID</label>
            <input
              type="text"
              id="email"
              className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Email or User ID"
              {...register('email')}
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
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="text-gray-400 hover:underline">Forgot Password?</a>
        </div>
        <div className="mt-2 text-center">
          <Link to='/register' className="text-gray-400 hover:underline">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
