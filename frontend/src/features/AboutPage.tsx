import Header from '../components/Header';
import Footer from '../components/Footer';

// Import images
import missionImage from '../assets/1 vehicle.jpg';
import visionImage from '../assets/fleet.jpg';
import teamImage from '../assets/office.jpg';
import teamMember1 from '../assets/31.jpg';
import teamMember2 from '../assets/3.jpg';
import teamMember3 from '../assets/42.jpg';
import teamMember4 from '../assets/44.jpg';
import customer1Image from '../assets/68.jpg';
import customer2Image from '../assets/77.jpg';
import customer3Image from '../assets/63.jpg';

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">About Our Company</h1>
        
        {/* Mission and Vision Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <img src={missionImage} alt="Our Mission" className="w-full h-48 object-cover rounded" />
            <img src={visionImage} alt="Our Vision" className="w-full h-48 object-cover rounded" />
            <img src={teamImage} alt="Our Team" className="w-full h-48 object-cover rounded" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-8">
              To provide unparalleled vehicle rental experiences through a diverse fleet, exceptional customer service, and a commitment to safety and quality.
            </p>
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-700">
              Since our founding in 2020, we've committed to serving our customers with integrity and passion. We believe in the power of mobility, which is why we offer the most comprehensive and reliable vehicle rental services.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: 'John Doe', role: 'CEO', email: 'john.doe@company.com', image: teamMember1 },
              { name: 'Jane Smith', role: 'COO', email: 'jane.smith@company.com', image: teamMember2 },
              { name: 'Robert Brown', role: 'CTO', email: 'robert.brown@company.com', image: teamMember3 },
              { name: 'Emma Green', role: 'CFO', email: 'emma.green@company.com', image: teamMember4 },
            ].map((member, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg text-center">
                <img src={member.image} alt={member.name} className="w-24 h-24 mx-auto rounded-full mb-4" />
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
                <p className="text-gray-600">{member.email}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { text: '"Renting a car from this company was a breeze! The vehicle was in excellent condition, and the customer service was top-notch."', name: 'Sarah Johnson', image: customer1Image },
              { text: '"Great selection of cars and fantastic service. I will definitely rent from them again."', name: 'Andrew Lee', image: customer2Image },
              { text: '"The team was so easy to work with, and my vehicle exceeded my expectations. I highly recommend this company."', name: 'Jessica Miller', image: customer3Image },
            ].map((review, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center mb-4">
                  <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <p className="font-bold">{review.name}</p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{review.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;