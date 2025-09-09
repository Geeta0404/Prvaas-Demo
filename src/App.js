import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Footer from './components/Footer';
import Header from './components/Header';

import Home from './components/Home';
import About from './components/About';
import Destination from './components/Destination';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import RoadTrip from './components/RoadTrip';
import Hillstation from './components/Hillstation';
import Adventure from './components/Adventure';
import NightLife from './components/NightLife';
import Historicplaces from './components/Historicplaces';
import Beaches from './components/Beaches';
import ResortDetails from './components/ResortDetails';
import BlogDetails from './components/BlogDetails';
import BookingForm from './components/BookingForm';

import Hotels from './components/pages/admin_panel/Hotels';
import Login from './components/pages/admin_panel/Login';
import Dashboard from './components/pages/admin_panel/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Profile from './components/pages/admin_panel/Profile';
import Logout from './components/pages/admin_panel/Logout';

import SignUp from './components/pages/admin_panel/Signup';
import NewRestaurant from './components/pages/admin_panel/hotels/NewRestaurant';
import RestaurantList from'./components/pages/admin_panel/RestaurantList';


// Layout Wrapper
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin_panel');
  return (
    <>
      {!isAdmin && <Header />}
      {children}
      {!isAdmin && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router basename="/">
      <Layout>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/destination" element={<Destination />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/resort/:resortName" element={<ResortDetails />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />

          <Route path="/RoadTrip" element={<RoadTrip />} />
          <Route path="/Hillstation" element={<Hillstation />} />
          <Route path="/Adventure" element={<Adventure />} />
          <Route path="/NightLife" element={<NightLife />} />
          <Route path="/historicplaces" element={<Historicplaces />} />
          <Route path="/Beaches" element={<Beaches />} />

          {/* Admin routes */}
          <Route path="/admin_panel/login" element={<Login />} />
          <Route path="/admin_panel/signup" element={<SignUp />} />
          <Route path="/admin_panel/dashboard" element={  <ProtectedRoute>    <Dashboard />  </ProtectedRoute>    }   />
           <Route path="/admin_panel/dashboard" element={<Dashboard />} />
          <Route path="/admin_panel/hotels" element={<Hotels />} />
          <Route path="/admin_panel/profile" element={<Profile />} /> 
          <Route path="/admin_panel/logout" element={<Logout />} /> 
            <Route path="/admin_panel/restaurant-list" element={<RestaurantList />} />
            <Route path="/admin_panel/hotels/New-Restaurant" element={<NewRestaurant />} />
            <Route path="/edit-hotel/:id" element={<NewRestaurant />} />








          </Routes>

       
      </Layout>
    </Router>
  );
}

export default App;
