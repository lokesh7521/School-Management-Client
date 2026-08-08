import Navbar from "../components/Navbar/Navbar";
import WhyChoose from "../components/WhyChoose/WhyChoose";
import Footer from "../components/Footer/Footer";
import "./WhyChoosePage.css";

function WhyChoosePage() {
  return (
    <div className="why-page">
      <Navbar />
      <div className="why-page-content">
        <WhyChoose />
      </div>
      <Footer />
    </div>
  );
}

export default WhyChoosePage;
