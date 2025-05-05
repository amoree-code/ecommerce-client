import Announcement from "../components/Announcement";
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

      <Products />
      <Newsletter />
      <Footer />
    </>
  );
}
