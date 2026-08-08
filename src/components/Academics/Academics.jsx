import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Academics.css";
import {
  FaMicroscope,
  FaPalette,
  FaChartBar,
  FaFlask,
  FaShieldAlt,
  FaTrophy,
  FaBook
} from "react-icons/fa";

const defaultPrograms = [
  { streamId: "science", title: "Science Stream", subtitle: "Physics, Chemistry and Biology with practical laboratories." },
  { streamId: "arts", title: "Arts Stream", subtitle: "Arts subjects with practical activities and projects." },
  { streamId: "commerce", title: "Commerce Stream", subtitle: "Commerce education with business and accounting knowledge." },
  { streamId: "practical", title: "Practical Learning", subtitle: "Focus on practical education and real learning experience." },
  { streamId: "discipline", title: "Discipline & Moral Values", subtitle: "Building strong discipline and moral values in students." },
  { streamId: "competitive", title: "Competitive Preparation", subtitle: "Preparing students for future competitive exams and careers." }
];

const getStreamIcon = (streamId) => {
  switch (streamId) {
    case "science":
      return <FaMicroscope className="academic-icon" />;
    case "arts":
      return <FaPalette className="academic-icon" />;
    case "commerce":
      return <FaChartBar className="academic-icon" />;
    case "practical":
      return <FaFlask className="academic-icon" />;
    case "discipline":
      return <FaShieldAlt className="academic-icon" />;
    case "competitive":
      return <FaTrophy className="academic-icon" />;
    default:
      return <FaBook className="academic-icon" />;
  }
};

function Academics() {
  const [programs, setPrograms] = useState(defaultPrograms);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/public/academics")
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
          setPrograms(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error fetching academics data for homepage", err);
      });
  }, []);

  return (
    <section className="academics" id="academics">
      <p className="section-label">EDUCATION STREAMS</p>

      <h2>Our Academics</h2>

      <p className="academic-subtitle">
        We provide quality education with multiple streams and practical learning. Click on any card to view detailed curriculum.
      </p>

      <div className="academic-container">
        {programs.map((item, idx) => (
          <Link key={idx} to={`/academics?stream=${item.streamId}`} className="academic-card">
            {getStreamIcon(item.streamId)}
            <h3>{item.title}</h3>
            <p>{item.subtitle || item.overview?.substring(0, 70) + "..."}</p>
            <span className="academic-hint">Explore details ➔</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Academics;