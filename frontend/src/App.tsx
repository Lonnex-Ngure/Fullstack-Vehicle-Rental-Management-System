import React from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import HomePage from './features/HomePage'; 
import LoginForm from './features/LoginForm'; 
import RegisterForm from './features/RegisterForm'; 
import AdminDashboard from './features/AdminDashboard'; 
import UserDashboard from './features/UserDashboard'; 
import BookingPage from './features/BookingPage'; 
import ContactPage from './features/ContactPage'; 
import VehicleListing from './features/VehicleListing'; 
import SupportTicket from './features/SupportTicket'; 
import AboutPage from './features/AboutPage'; 
import VehicleDetails from './features/VehicleDetails';
import PaymentPage from './features/PaymentPage'; 
import BookingConfirmation from './features/BookingConfirmation';

const App: React.FC = () => {   
  return (     
    <Router>       
      <Routes>         
        <Route path="/" element={<HomePage />} />         
        <Route path="/login" element={<LoginForm />} />         
        <Route path="/register" element={<RegisterForm />} />         
        <Route path="/admin/dashboard" element={<AdminDashboard />} />         
        <Route path="/user/dashboard" element={<UserDashboard />} />         
        <Route path="/booking/:id" element={<BookingPage />} />       
        <Route path="/contact" element={<ContactPage />} />         
        <Route path="/vehicles" element={<VehicleListing />} />         
        <Route path="/support-ticket" element={<SupportTicket />} />         
        <Route path="/about" element={<AboutPage />} />         
        <Route path="/vehicles/:id" element={<VehicleDetails />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />

      
      </Routes>     
    </Router>   
  ); 
}; 

export default App;
