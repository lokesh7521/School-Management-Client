import { Link } from "react-router-dom";
import "./Academics.css";
import {
  FaMicroscope,
  FaPalette,
  FaChartBar,
  FaFlask,
  FaShieldAlt,
  FaTrophy
} from "react-icons/fa";

function Academics() {

  return (

    <section className="academics" id="academics">

      <p className="section-label">EDUCATION STREAMS</p>

      <h2>Our Academics</h2>

      <p className="academic-subtitle">
        We provide quality education with multiple streams and practical learning. Click on any card to view detailed curriculum.
      </p>

      <div className="academic-container">

        <Link to="/academics?stream=science" className="academic-card">
          <FaMicroscope className="academic-icon" />
          <h3>Science Stream</h3>
          <p>Physics, Chemistry and Biology with practical laboratories.</p>
          <span className="academic-hint">Explore curriculum ➔</span>
        </Link>

        <Link to="/academics?stream=arts" className="academic-card">
          <FaPalette className="academic-icon" />
          <h3>Arts Stream</h3>
          <p>Arts subjects with practical activities and projects.</p>
          <span className="academic-hint">Explore curriculum ➔</span>
        </Link>

        <Link to="/academics?stream=commerce" className="academic-card">
          <FaChartBar className="academic-icon" />
          <h3>Commerce Stream</h3>
          <p>Commerce education with business and accounting knowledge.</p>
          <span className="academic-hint">Explore curriculum ➔</span>
        </Link>

        <Link to="/academics?stream=practical" className="academic-card">
          <FaFlask className="academic-icon" />
          <h3>Practical Learning</h3>
          <p>Focus on practical education and real learning experience.</p>
          <span className="academic-hint">Explore details ➔</span>
        </Link>

        <Link to="/academics?stream=discipline" className="academic-card">
          <FaShieldAlt className="academic-icon" />
          <h3>Discipline & Moral Values</h3>
          <p>Building strong discipline and moral values in students.</p>
          <span className="academic-hint">Explore details ➔</span>
        </Link>

        <Link to="/academics?stream=competitive" className="academic-card">
          <FaTrophy className="academic-icon" />
          <h3>Competitive Preparation</h3>
          <p>Preparing students for future competitive exams and careers.</p>
          <span className="academic-hint">Explore details ➔</span>
        </Link>

      </div>

    </section>

  );
}

export default Academics;