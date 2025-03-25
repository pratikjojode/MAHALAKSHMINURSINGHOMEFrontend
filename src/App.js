import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import Notification from "./pages/Notification";
import "./App.css";
import Users from "./pages/admin/Users";
import Doctors from "./pages/admin/Doctors";
import Profile from "./pages/doctor/Profile";
import UsersDoctors from "./pages/users/UsersDoctors";
import BokkingPage from "./pages/BokkingPage";
import UserAppointments from "./pages/UserAppointments";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import AllTestimonials from "./pages/AllTestimonials";
import AppointmenstAdmin from "./pages/admin/AppointmenstAdmin";
import UserProfile from "./pages/users/UserProfile";
import FeedbackForm from "./components/FeedbackForm";
import AdminFeedback from "./components/AdminFeedback";
import ForgotPassword from "./pages/ForgotPassword";
import EditUser from "./pages/users/editUser";
import HelpPage from "./components/HelpPage";
import ImageGallery from "./pages/ImageGallery";
import ServicesAll from "./pages/ServicesAll";
import NursesPage from "./pages/NursesPage";
import EnquiryForm from "./pages/EnquiryForm";
import VisionMissions from "./pages/VisionMissions";
import Custom404 from "./components/Custom404";

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {/* Add ScrollToTop component inside BrowserRouter */}
        <ScrollToTop />
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/notification"
              element={
                <ProtectedRoutes>
                  <Notification />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/doctor/book-appointment/:doctorId"
              element={
                <ProtectedRoutes>
                  <BokkingPage />
                </ProtectedRoutes>
              }
            />
            <Route path="*" element={<Custom404 />} />
            <Route path="/user/doctors" element={<UsersDoctors />} />
            <Route
              path="/doctor/profile/:id"
              element={
                <ProtectedRoutes>
                  <Profile />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/apply-doctor"
              element={
                <ProtectedRoutes>
                  <ApplyDoctor />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoutes>
                  <Users />
                </ProtectedRoutes>
              }
            />
            <Route path="/feedback" element={<FeedbackForm />} />
            <Route
              path="/admin/feedback"
              element={
                <ProtectedRoutes>
                  <AdminFeedback />
                </ProtectedRoutes>
              }
            />
            <Route path="/admin/doctors" element={<Doctors />} />
            <Route path="/user/profile/:id" element={<UserProfile />} />

            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/enquiry" element={<EnquiryForm />} />
            <Route path="/admin/edit-user/:id" element={<EditUser />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/gallery" element={<ImageGallery />} />
            <Route path="/NursesAll" element={<NursesPage />} />
            <Route path="/vision" element={<VisionMissions />} />

            <Route
              path="/admin/Allappointments"
              element={
                <ProtectedRoutes>
                  <AppointmenstAdmin />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/user/show-bookings/:userId"
              element={<UserAppointments />}
            />
            <Route
              path="/doctor/show-bookings/:doctorId"
              element={<DoctorAppointments />}
            />

            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/testimonials" element={<AllTestimonials />} />
            <Route path="/servicesAll" element={<ServicesAll />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
};

export default App;
