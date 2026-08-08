import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  FaSchool, FaUsers, FaLightbulb,
  FaChalkboard, FaMicroscope, FaPalette, FaSearch, FaArrowLeft
} from "react-icons/fa";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { classrooms as defaultClassrooms, typeColors } from "../data/schoolData";
import "./ClassroomsPage.css";


function ClassroomsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialType = searchParams.get("type") || "All";
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState(initialType);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [classList, setClassList] = useState(defaultClassrooms);

  const from = searchParams.get("from");

  const handleBack = () => {
    if (from === "whychoose") {
      navigate("/#whychoose");
    } else if (from === "about") {
      navigate("/#about");
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/public/classrooms")
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
          const formatted = res.data.data.map((c, idx) => ({
            id: c._id || idx,
            room: c.roomNo,
            assignedTo: c.assignedTo,
            type: c.type || "Regular",
            capacity: c.capacity || 40,
            image: c.image || "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80",
            iconColor: c.iconColor || "#1565c0",
            icon: c.type === "Lab" ? "lab" : c.type === "Practical" ? "arts" : "chalkboard",
            features: Array.isArray(c.features) && c.features.length > 0 ? c.features : ["Smart Board", "Airy Windows"]
          }));
          setClassList(formatted);
        }
      })
      .catch((err) => {
        console.log("Using default classrooms list");
      });
  }, []);

  useEffect(() => {
    const type = searchParams.get("type");
    if (type) {
      setActiveType(type);
    } else {
      setActiveType("All");
    }
  }, [searchParams]);

  const handleTypeChange = (type) => {
    setActiveType(type);
    const newParams = {};
    if (type !== "All") newParams.type = type;
    if (from) newParams.from = from;
    setSearchParams(newParams);
  };

  const types = ["All", "Regular", "Lab", "Practical"];

  const filtered = classList.filter(c => {
    const matchSearch =
      (c.room && c.room.toLowerCase().includes(search.toLowerCase())) ||
      (c.assignedTo && c.assignedTo.toLowerCase().includes(search.toLowerCase()));
    const matchType = activeType === "All" || c.type === activeType;
    return matchSearch && matchType;
  });

  const getIcon = (type, iconColor) => {
    if (type === "lab") return <FaMicroscope size={32} color={iconColor} />;
    if (type === "arts") return <FaPalette size={32} color={iconColor} />;
    return <FaChalkboard size={32} color={iconColor} />;
  };

  return (
    <div className="cp-page">

      {/* Main Navbar */}
      <Navbar />

      <div className="cp-content">

        {/* CONTROLS */}
        <div className="cp-controls">
          <div className="cp-search-box">
            <FaSearch className="cp-search-icon" />
            <input
              type="text"
              placeholder="Search room or class..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="cp-filters">
            {types.map(t => (
              <button
                key={t}
                className={`cp-filter-btn ${activeType === t ? "active" : ""}`}
                onClick={() => handleTypeChange(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <p className="cp-showing">
          Showing <strong>{filtered.length}</strong> rooms
        </p>

        {/* ROOMS GRID */}
        <div className="cp-grid">
          {filtered.map(room => (
            <div
              className="cp-card"
              key={room.id}
            >

              {/* ROOM VISUAL */}
              <div className="cp-card-visual" onClick={() => setLightboxImg(room.image)}>
                <img
                  src={room.image}
                  alt={room.room}
                  className="cp-card-img zoomable-img"
                  onError={e => {
                    e.target.style.display = "none";
                  }}
                />
                <div className="cp-card-overlay" />
                <div className="cp-visual-icon">
                  {getIcon(room.icon, room.iconColor)}
                </div>
                <span
                  className="cp-type-badge"
                  style={{
                    background: typeColors[room.type]?.bg,
                    color: typeColors[room.type]?.color
                  }}
                >
                  {room.type}
                </span>
              </div>

              {/* ROOM INFO */}
              <div className="cp-card-body">
                <h3 className="cp-room-name">{room.room}</h3>
                <p className="cp-assigned">{room.assignedTo}</p>

                <div className="cp-meta">
                  <div className="cp-meta-item">
                    <FaUsers size={11} />
                    <span>Capacity: <strong>{room.capacity}</strong></span>
                  </div>
                  <div className="cp-meta-item">
                    <FaLightbulb size={11} />
                    <span>Features: <strong>{room.features.length}</strong></span>
                  </div>
                </div>

                {/* FEATURES */}
                <div className="cp-features">
                  {room.features.map((f, i) => (
                    <span key={i} className="cp-feature-tag">{f}</span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="cp-empty">
            <FaSchool size={48} color="#ccc" />
            <p>No room found matching your search.</p>
          </div>
        )}

      </div>

      {/* LIGHTBOX POPUP */}
      {lightboxImg && (
        <div className="lightbox-overlay" onClick={() => setLightboxImg(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={lightboxImg} alt="Enlarged view" className="lightbox-img" />
            <button className="lightbox-close" onClick={() => setLightboxImg(null)}>&times;</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ClassroomsPage;
