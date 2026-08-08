import Navbar from "../components/Navbar/Navbar";
import Facilities from "../components/Facilities/Facilities";
import Footer from "../components/Footer/Footer";
import "./FacilitiesPage.css";

function FacilitiesPage() {
  return (
    <div className="fac-page">
      {/* Main Navbar */}
      <Navbar />

      <div className="fac-page-content">
        {/* MAIN FACILITIES COMPONENT */}
        <Facilities />
      </div>

      <Footer />
    </div>
  );
}

export default FacilitiesPage;
