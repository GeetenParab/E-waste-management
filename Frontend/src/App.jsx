import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import Layout from "./Footer/Layout.jsx"; // Import the new Layout component
import About from "./About/About.jsx";
import Home from "./Home/Home.jsx";
import SignUp from "./SignUp/Signup.jsx";
import SignIn from "./SignIn/SignIn.jsx";
import ContactUs from "./About/ContactUs.jsx";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./SignIn/AuthContext.jsx";
import Profile from "./Header/Profile.jsx";
import EForm from "./EForm/Eform.jsx";
import AdminLogin from "./Admin/AdminLogin.jsx";
import AdminDashboard from "./Admin/AdminDashBoard.jsx";
import { useAdminContext } from "./Admin/AdminContext.jsx";
import Unauthorized from "./Admin/Unauthorized.jsx";
import { Admin } from "./Admin/Admin.jsx";
import WasteRecyclerMap from "./EForm/WasteRecyclerMap.jsx";
import EducationPage from "./Home/EducationPage.jsx";

function App() {
  const { authUser } = useAuthContext();
  const { token } = useAdminContext();

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/services" element={<EForm />} />
            <Route path="/education" element={<EducationPage/>} />
            <Route path="/facilities" element={<WasteRecyclerMap />} />

            {/* Auth routes for normal users */}
            <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
            <Route path="/signIn" element={authUser ? <Navigate to="/" /> : <SignIn />} />
            <Route path="/profile" element={!authUser ? <Navigate to="/" /> : <Profile />} />

            {/* Admin routes */}
            <Route path="/admin/login" element={token ? <Navigate to="/admin/dashboard" /> : <AdminLogin />} />
            <Route path="/admin/dashboard" element={!token ? <Unauthorized /> : <AdminDashboard />} />
            <Route path="/admin" element={<Admin/>} />

            {/* Fallback for unauthorized access */}
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </Layout>
        <Toaster />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
