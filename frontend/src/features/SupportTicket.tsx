import { useForm, SubmitHandler } from 'react-hook-form';

interface SupportTicketFormData {
  subject: string;
  description: string;
}

const SupportTicket = () => {
  const { register, handleSubmit } = useForm<SupportTicketFormData>();
  const onSubmit: SubmitHandler<SupportTicketFormData> = data => {
    console.log(data);
  };

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
              {...register('subject')}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
            <textarea
              id="description"
              className="w-full p-2 bg-gray-200 text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Describe your issue..."
              rows={4}  // Set rows as a number
              {...register('description')}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded"
          >
            Create Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default SupportTicket;