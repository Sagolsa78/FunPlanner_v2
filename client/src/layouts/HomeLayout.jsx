
import Footer from "../components/sections/Footer";
import HeroSection from "../components/sections/HeroSection";
import Navbar from "../components/sections/Navbar";

const HomeLayout = () => {
    return(
         <div className="min-h-screen bg-#000000">
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
    )
}

export default HomeLayout;