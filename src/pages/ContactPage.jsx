import Navbar from "../components/Navbar/Navbar";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import "./ContactPage.css";

function ContactPage() {
  return (
    <div className="contact-page">
      {/* Main Navbar */}
      <Navbar />

      <div className="contact-page-content">
        {/* CONTACT FORM & INFO COMPONENT */}
        <Contact />
      </div>

      <Footer />
    </div>
  );
}

export default ContactPage;
