import Navbar from "../components/Navbar/Navbar";
import Admissions from "../components/Admissions/Admissions";
import Footer from "../components/Footer/Footer";
import "./AdmissionsPage.css";

function AdmissionsPage() {
  return (
    <div className="adm-page">
      <Navbar />
      <div className="adm-page-content">
        <Admissions />
      </div>
      <Footer />
    </div>
  );
}

export default AdmissionsPage;
