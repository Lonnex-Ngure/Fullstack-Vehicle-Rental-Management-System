import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen text-gray-900">
      <Header />
      <div className="container mx-auto py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">About Our Company</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <img src="mission-image.jpg" alt="Our Mission" className="w-full h-48 object-cover rounded" />
            <img src="vision-image.jpg" alt="Our Vision" className="w-full h-48 object-cover rounded" />
            <img src="team-image.jpg" alt="Our Team" className="w-full h-48 object-cover rounded" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-8">
              To provide unparalleled vehicle rental experiences through a diverse fleet, exceptional customer service, and a commitment to safety and quality.
            </p>
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-700">
              Since our founding in 2020, we’ve committed to serving our customers with integrity and passion. We believe in the power of mobility, which is why we offer the most comprehensive and reliable vehicle rental services.
            </p>
          </div>
        </section>
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img src="team-member1.jpg" alt="John Doe" className="w-24 h-24 mx-auto rounded-full mb-4" />
              <h3 className="text-xl font-bold">John Doe</h3>
              <p className="text-gray-600">CEO</p>
              <p className="text-gray-600">john.doe@company.com</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img src="team-member2.jpg" alt="Jane Smith" className="w-24 h-24 mx-auto rounded-full mb-4" />
              <h3 className="text-xl font-bold">Jane Smith</h3>
              <p className="text-gray-600">COO</p>
              <p className="text-gray-600">jane.smith@company.com</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img src="team-member3.jpg" alt="Robert Brown" className="w-24 h-24 mx-auto rounded-full mb-4" />
              <h3 className="text-xl font-bold">Robert Brown</h3>
              <p className="text-gray-600">CTO</p>
              <p className="text-gray-600">robert.brown@company.com</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img src="team-member4.jpg" alt="Emma Green" className="w-24 h-24 mx-auto rounded-full mb-4" />
              <h3 className="text-xl font-bold">Emma Green</h3>
              <p className="text-gray-600">CFO</p>
              <p className="text-gray-600">emma.green@company.com</p>
            </div>
          </div>
        </section>
        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <p className="text-gray-700">"Renting a car from this company was a breeze! The vehicle was in excellent condition, and the customer service was top-notch."</p>
              <p className="text-gray-600 mt-4">- Sarah Johnson</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <p className="text-gray-700">"Great selection of cars and fantastic service. I will definitely rent from them again."</p>
              <p className="text-gray-600 mt-4">- Andrew Lee</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <p className="text-gray-700">"The team was so easy to work with, and my vehicle exceeded my expectations. I highly recommend this company."</p>
              <p className="text-gray-600 mt-4">- Jessica Miller</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;