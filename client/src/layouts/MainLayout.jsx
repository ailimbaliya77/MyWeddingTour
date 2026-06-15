import Navbar from "../shared/components/layout/Navbar";
import Footer from "../shared/components/layout/Footer";

const MainLayout = ({ children, setLoginOpen }) => {
  return (
    <>
      <Navbar setLoginOpen={setLoginOpen} />

      <main>{children}</main>

      <Footer />
    </>
  );
};

export default MainLayout;    