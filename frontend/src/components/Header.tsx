import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-black text-white p-4 flex justify-between items-center">
      <div className="text-xl">LUXURY RIDES</div>
      <nav>
        <Link to="/" className="px-4">Home</Link>
        <Link to="/vehicles" className="px-4">Vehicles</Link>
        <Link to="/about" className="px-4">About</Link>
        <Link to="/contact" className="px-4">Contact</Link>
        <Link to="/login" className="px-4 bg-red-600 rounded-full">Login/SignUp</Link>
      </nav>
    </header>
  );
};

export default Header;