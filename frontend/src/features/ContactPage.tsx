import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = data => {
    console.log(data);
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
          <form className="max-w-lg mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                id="name"
                className="w-full p-2 bg-gray-200 text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="Jane Doe"
                {...register('name')}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-2 bg-gray-200 text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="jane.doe@example.com"
                {...register('email')}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <textarea
                id="message"
                className="w-full p-2 bg-gray-200 text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="Your message..."
                rows={4}
                {...register('message')}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded"
            >
              Send Message
            </button>
          </form>
        </section>
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">Our Offices</h2>
          <div className="bg-white p-4 rounded-lg shadow-lg inline-block">
            <h3 className="text-xl font-bold">Headquarters</h3>
            <p>123 Main St, Anytown, USA</p>
            <p>+1 234-567-8901</p>
            <p>info@luxuryrides.com</p>
          </div>
        </section>
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto text-left">
            <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
              <h3 className="text-xl font-bold mb-2">What is the process to rent a vehicle?</h3>
              <p className="text-gray-700">The process is simple: Select your vehicle, book your rental, and then drive away in style.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
              <h3 className="text-xl font-bold mb-2">Can I extend my rental period?</h3>
              <p className="text-gray-700">Yes, you can extend your rental period, subject to vehicle availability. Please contact our support team at least 24 hours before your rental period ends to arrange an extension. Additional charges may apply based on the extended rental period.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
              <h3 className="text-xl font-bold mb-2">What documents do I need to rent a vehicle?</h3>
              <p className="text-gray-700">To rent a vehicle, you will need a valid driver's license, a credit card for the deposit, and proof of insurance. Some locations may have additional requirements, so be sure to check with our rental office in advance.</p>
            </div>
          </div>
        </section>
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">Need More Help?</h2>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Create a Support Ticket
          </button>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;