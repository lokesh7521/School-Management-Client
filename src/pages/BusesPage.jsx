import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FaBus, FaUsers, FaUser, FaPhone, FaSearch, FaMapMarkerAlt, FaCircle, FaArrowLeft
} from "react-icons/fa";
import Navbar from "../components/Navbar/Navbar";
import { buses } from "../data/schoolData";
import "./BusesPage.css";

function BusesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
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

  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const [lightboxImg, setLightboxImg] = useState(null);

  const statuses = ["All", "Active", "Maintenance"];

  const filtered = buses.filter(b => {
    const matchSearch =
      b.busNo.toLowerCase().includes(search.toLowerCase()) ||
      b.route.toLowerCase().includes(search.toLowerCase()) ||
      b.driver.toLowerCase().includes(search.toLowerCase());
    const matchStatus = activeStatus === "All" || b.status === activeStatus;
    return matchSearch && matchStatus;
  });

  const totalSeats = buses.reduce((s, b) => s + b.capacity, 0);
  const activeCount = buses.filter(b => b.status === "Active").length;
  
  // Calculate total unique stops
  const allStops = new Set();
  buses.forEach(b => b.stops.forEach(s => allStops.add(s)));

  return (
    <div className="bp-page">
      {/* Main Navbar */}
      <Navbar />

      <div className="bp-content">

        {/* PAGE HEADING */}
        <div className="bp-page-heading">
          <FaBus className="bp-heading-icon" />
          <div>
            <h1 className="bp-heading-title">Transport (Buses)</h1>
            <p className="bp-heading-sub">Swami Vivekanand Sen. Sec. School — School Bus Routes & Fleet</p>
          </div>
          <button className="bp-heading-back-btn" onClick={handleBack}>
            <FaArrowLeft /> Back
          </button>
        </div>

        {/* SUMMARY CARDS */}
        <div className="bp-summary">
          <div className="bp-sum-card">
            <FaBus className="bp-sum-icon" />
            <span className="bp-sum-num">{buses.length}</span>
            <span className="bp-sum-label">Total Buses</span>
          </div>
          <div className="bp-sum-card">
            <div className="bp-sum-icon status-active" />
            <span className="bp-sum-num">{activeCount}</span>
            <span className="bp-sum-label">Active Buses</span>
          </div>
          <div className="bp-sum-card">
            <FaMapMarkerAlt className="bp-sum-icon" />
            <span className="bp-sum-num">{allStops.size}</span>
            <span className="bp-sum-label">Covered Stops</span>
          </div>
          <div className="bp-sum-card highlight">
            <FaUsers className="bp-sum-icon" />
            <span className="bp-sum-num">{totalSeats}</span>
            <span className="bp-sum-label">Total Seat Capacity</span>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="bp-controls">
          <div className="bp-search-box">
            <FaSearch className="bp-search-icon" />
            <input
              type="text"
              placeholder="Search route, bus no, driver..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="bp-filters">
            {statuses.map(s => (
              <button
                key={s}
                className={`bp-filter-btn ${activeStatus === s ? "active" : ""}`}
                onClick={() => setActiveStatus(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <p className="bp-showing">
          Showing <strong>{filtered.length}</strong> vehicles
        </p>

        {/* BUS ROUTE CARDS GRID */}
        <div className="bp-grid">
          {filtered.map(bus => (
            <div
              className="bp-card"
              key={bus.id}
              style={{ borderTop: `4px solid ${bus.iconColor}` }}
            >
              {/* BUS VISUAL HEADER */}
              <div className="bp-card-visual" onClick={() => setLightboxImg(bus.image)}>
                <img
                  src={bus.image}
                  alt={bus.busNo}
                  className="bp-card-img zoomable-img"
                  onError={e => {
                    e.target.style.display = "none";
                  }}
                />
                <div className="bp-card-overlay" />
                <div className="bp-visual-icon">
                  <FaBus color={bus.iconColor} size={22} />
                </div>
                <span
                  className={`bp-status-badge ${bus.status.toLowerCase()}`}
                  style={{
                    backgroundColor: bus.status === "Active" ? "#e8f5e9" : "#ffebee",
                    color: bus.status === "Active" ? "#2e7d32" : "#c62828"
                  }}
                >
                  {bus.status}
                </span>
              </div>

              {/* CARD BODY */}
              <div className="bp-card-body">
                <div className="bp-card-header">
                  <h3 className="bp-bus-no">{bus.busNo}</h3>
                  <div className="bp-capacity-badge">
                    <FaUsers size={12} />
                    <span>{bus.capacity} seats</span>
                  </div>
                </div>

                <p className="bp-route-title">{bus.route}</p>

                {/* VISUAL TIMELINE */}
                <div className="bp-timeline">
                  <p className="bp-timeline-heading">Stops Sequence</p>
                  <div className="bp-timeline-line">
                    {bus.stops.map((stop, i) => (
                      <div className="bp-timeline-node" key={i}>
                        <FaCircle className="bp-node-dot" style={{ color: bus.iconColor }} />
                        <span className="bp-node-label">{stop}</span>
                        {i < bus.stops.length - 1 && <span className="bp-node-arrow">→</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* STAFF INFO */}
                <div className="bp-staff">
                  <div className="bp-staff-row">
                    <span className="bp-staff-label"><FaUser size={10} /> Driver</span>
                    <span className="bp-staff-val">{bus.driver}</span>
                  </div>
                  <div className="bp-staff-row">
                    <span className="bp-staff-label"><FaPhone size={10} /> Contact</span>
                    <a href={`tel:${bus.phone}`} className="bp-staff-phone">{bus.phone}</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="bp-empty">
            <FaBus size={48} color="#ccc" />
            <p>No transport vehicle found matching your search.</p>
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

    </div>
  );
}

export default BusesPage;
