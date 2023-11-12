import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <div style={{ width: "80%", margin: "0 auto", paddingTop: "20px", paddingBottom: "20px" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default SharedLayout;
