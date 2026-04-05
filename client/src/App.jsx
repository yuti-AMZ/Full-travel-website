import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";


import SignupPage from './pages/auth/SignupPage';
import LoginPage from './pages/auth/LoginPage';
import ForgetPassword from './pages/auth/ForgetPassword';
import ResetPasswordPage from './pages/auth/resetpasswordpage';
import LandingPage from './pages/LandingPage';


import WelcomePage from './pages/dashboard/WelcomePage';
import EditProfile from './pages/dashboard/EditProfile';
import UserList from './pages/dashboard/UserList';

import DestinationsPage from './pages/dashboard/destinations';
import AboutPage from './pages/dashboard/about';
import PackagesPage from './pages/dashboard/packages';
import GalleryPage from './pages/dashboard/gallery';
import ContactPage from './pages/dashboard/contact';

function App() {
  return (
    <Router>
      <Routes>
        {}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        {}
        <Route path="/welcome" element={<WelcomePage />} /> 
        <Route path="/profile" element={<EditProfile />} /> 
        <Route path="/users" element={<UserList />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      {}
      <Toaster position="top-center" richColors />
    </Router>
  );
}

export default App;