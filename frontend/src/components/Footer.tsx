import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-center">
          <h3 className="font-bold">Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Vehicles</a></li>
          </ul>
        </div>
        <div className="text-center">
          <h3 className="font-bold">Contact Information</h3>
          <p>123 Main St, Anytown, USA</p>
          <p>(123) 456-7890</p>
          <p>info@luxuryrides.com</p>
        </div>
        <div className="text-center">
          <h3 className="font-bold">Follow Us</h3>
          <p>Social media links</p>
        </div>
      </div>
      <div className="text-center mt-4">
        <p>&copy; 2023 Your Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;