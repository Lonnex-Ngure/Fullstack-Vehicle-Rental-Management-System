import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <main className="bg-gray-100 min-h-screen text-gray-900">
        <section className="container mx-auto py-8">
          <h1 className="text-4xl font-bold mb-6 text-center">Luxury Rides at Your Fingertips</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <img src="car-banner.jpg" alt="Luxury Rides" className="w-full h-64 object-cover rounded" />
            <img src="car-banner.jpg" alt="Luxury Rides" className="w-full h-64 object-cover rounded" />
            <img src="car-banner.jpg" alt="Luxury Rides" className="w-full h-64 object-cover rounded" />
          </div>
          <div className="text-center">
            <button className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full">Book Now</button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;