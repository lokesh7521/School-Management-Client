import Navbar from "../components/Navbar/Navbar";
import Gallery from "../components/Gallery/Gallery";
import Footer from "../components/Footer/Footer";
import "./GalleryPage.css";

function GalleryPage() {
  return (
    <div className="gallery-page">
      <Navbar />
      <div className="gallery-page-content">
        <Gallery />
      </div>
      <Footer />
    </div>
  );
}

export default GalleryPage;
