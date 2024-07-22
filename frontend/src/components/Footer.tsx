import { Link } from 'react-router-dom';

// Import social media icons
import facebookIcon from '../assets/facebook (1).png';
import twitterIcon from '../assets/twitter (1).png';
import instagramIcon from '../assets/instagram (1).png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-red-600 transition duration-300">Home</Link></li>
            <li><Link to="/about" className="hover:text-red-600 transition duration-300">About</Link></li>
            <li><Link to="/contact" className="hover:text-red-600 transition duration-300">Contact</Link></li>
            <li><Link to="/vehicles" className="hover:text-red-600 transition duration-300">Vehicles</Link></li>
          </ul>
        </div>
        <div className="w-full md:w-1/3 mb-6 md:mb-0 text-center">
          <h3 className="font-bold text-lg mb-4">Contact Information</h3>
          <p className="mb-2">123 Main St, Anytown, USA</p>
          <p className="mb-2">(123) 456-7890</p>
          <p>info@luxuryrides.com</p>
        </div>
        <div className="w-full md:w-1/3 md:text-right">
          <h3 className="font-bold text-lg mb-4">Follow Us</h3>
          <div className="flex justify-end space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={facebookIcon} alt="Facebook" className="w-8 h-8" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src={twitterIcon} alt="Twitter" className="w-8 h-8" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={instagramIcon} alt="Instagram" className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <p>&copy; 2024 Luxury Rides. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;