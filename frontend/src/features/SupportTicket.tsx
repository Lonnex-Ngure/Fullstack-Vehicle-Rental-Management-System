import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { apiSlice } from '../services/apiSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store'; 

interface SupportTicketFormData {
  subject: string;
  description: string;
}

const SupportTicket = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SupportTicketFormData>();
  const [createSupportTicket, { isLoading }] = apiSlice.useCreateSupportTicketMutation();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const onSubmit: SubmitHandler<SupportTicketFormData> = async (data) => {
    if (!user) {
      alert('You must be logged in to create a support ticket.');
      navigate('/login');
      return;
    }

    try {
      await createSupportTicket({
        userId: user.id,
        subject: data.subject,
        description: data.description,
      }).unwrap();
      
      alert('Support ticket created successfully!');
      navigate('/user/dashboard');
    } catch (error) {
      console.error('Failed to create support ticket', error);
      alert('Failed to create support ticket. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-700">
        <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg">
          <p>You must be logged in to create a support ticket.</p>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700">
      <div className="bg-white text-gray-900 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Create Support Ticket</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
            <input
              type="text"
              id="subject"
              className="w-full p-2 bg-gray-200 text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Subject"
              {...register('subject', { required: 'Subject is required' })}
            />
            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
            <textarea
              id="description"
              className="w-full p-2 bg-gray-200 text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Describe your issue..."
              rows={4}
              {...register('description', { required: 'Description is required' })}
            ></textarea>
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Ticket'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SupportTicket;