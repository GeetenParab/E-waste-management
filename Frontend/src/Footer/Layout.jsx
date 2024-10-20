import { useLocation } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Footer from "./Footer.jsx";

function Layout({ children }) {
  const location = useLocation(); // Hook to get the current path
  const isAdminRoute = location.pathname.startsWith("/admin"); // Check if it's an admin route

  return (
    <>
      {/* Conditionally render Header and Footer based on the route */}
      {!isAdminRoute && <Header />}
      {children} {/* Render the children passed from the App */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default Layout;
