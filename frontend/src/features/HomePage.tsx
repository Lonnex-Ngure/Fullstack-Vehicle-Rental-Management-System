import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import heroImage from '../assets/pexels-introspectivedsgn-4732636.jpg';
// Import featured vehicle images
import rangeRoverImage from '../assets/range-rover-2015635_1280.jpg';
import mercedesAMGImage from '../assets/pexels-mikebirdy-3729464.jpg';
import audiTTImage from '../assets/kalden-swart-5jegJRzcrfg-unsplash.jpg';

// Import new vehicle icons
import icon1 from '../assets/car-front.png';
import icon2 from '../assets/car-front.png';
import icon3 from '../assets/car-front.png';
import icon4 from '../assets/car-front.png';

// Import customer review images
import customer1Image from '../assets/19.jpg';
import customer2Image from '../assets/3.jpg';
import customer3Image from '../assets/31.jpg';

const HomePage = () => {
  const featuredVehicles = [
    { name: 'Range Rover Sport', image: rangeRoverImage },
    { name: 'Mercedes AMG GT Coupe', image: mercedesAMGImage },
    { name: 'Audi TT RS', image: audiTTImage },
  ];

  const newVehicleSteps = [
    { icon: icon1, text: 'Select Vehicle' },
    { icon: icon2, text: 'Book' },
    { icon: icon3, text: 'Pay' },
    { icon: icon4, text: 'Drive' },
  ];

  const customerReviews = [
    { image: customer1Image, text: 'Great service! Will definitely use again.' },
    { image: customer2Image, text: 'Luxurious cars and professional staff.' },
    { image: customer3Image, text: 'An unforgettable experience. Highly recommended!' },
  ];

  return (
    <div className="bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-screen">
        <img src={heroImage} alt="Luxury Car" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start p-12">
            <h1 className="text-5xl font-bold text-red-600 mb-4">Luxury Rides at Your Fingertips</h1>
            <p className="text-xl text-red-600 mb-8">Experience luxury and comfort with our top-of-the-line vehicles</p>
            <Link to="/vehicles" className="px-8 py-3 bg-red-600 text-white text-lg font-semibold rounded">
              BOOK NOW
            </Link>
          </div>
        </section>

        {/* Featured Vehicles */}
        <section className="container mx-auto py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Vehicles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredVehicles.map((car, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                  <button className="px-4 py-2 bg-red-600 text-white rounded">Learn More</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* New Vehicles */}
        <section className="bg-gray-100 py-12">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">How it Works</h2>
            <div className="flex items-center justify-center">
              {newVehicleSteps.map((step, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center">
                    <img src={step.icon} alt={`Step ${index + 1}`} className="w-16 h-16 mb-4" />
                    <p className="text-center text-sm">{step.text}</p>
                  </div>
                  {index < newVehicleSteps.length - 1 && (
                    <div className="flex-grow flex items-center mx-4">
                      <div className="h-0.5 bg-gray-300 flex-grow"></div>
                      <svg className="w-4 h-4 text-gray-300 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="container mx-auto py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {customerReviews.map((review, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6 text-center">
                <img src={review.image} alt={`Customer ${index + 1}`} className="w-20 h-20 rounded-full mx-auto mb-4" />
                <p className="text-gray-600 mb-4">{review.text}</p>
                <div className="flex justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;