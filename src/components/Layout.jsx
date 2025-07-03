import NavBar from "./NavBar";
import Footer from "../sections/Footer";
import MobileNav from "./MobileNav";
// import ScrollToTop from "./ScrollToTop";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />

      {/* <ScrollToTop /> */}
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
