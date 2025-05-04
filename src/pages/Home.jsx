import Announcement from "../components/Announcement";
import Categorise from "../components/Categorise";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";

export default function Home() {
  return (
    <>
      <Announcement />
      <Navbar />
      <Slider />
      {/* <Categorise /> */}
      <Products />
      <Newsletter />
      <Footer />
    </>
  );
}
