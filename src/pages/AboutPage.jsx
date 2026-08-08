import Navbar from "../components/Navbar/Navbar";
import About from "../components/About/About";
import Footer from "../components/Footer/Footer";
import "./AboutPage.css";

function AboutPage() {
  return (
    <div className="about-page">
      <Navbar />
      <div className="about-page-content">
        <About />
      </div>
      <Footer />
    </div>
  );
}

export default AboutPage;
