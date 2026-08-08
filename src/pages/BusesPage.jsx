import { useState, useEffect } from "react";
import {
  FaBus, FaUsers, FaUser, FaPhone, FaSearch, FaCircle
} from "react-icons/fa";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { buses as defaultBuses } from "../data/schoolData";
import "./BusesPage.css";

function BusesPage() {
  const [busList, setBusList] = useState(defaultBuses);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/public/buses")
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
          setBusList(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Using default buses list");
      });
  }, []);

  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const [lightboxImg, setLightboxImg] = useState(null);

  const statuses = ["All", "Active", "Maintenance"];

  const filtered = busList.filter((bus) => {
    const term = search.toLowerCase();
    const matchBusNo = (bus.busNumber || "").toLowerCase().includes(term);
    const matchRoute = (bus.routeName || "").toLowerCase().includes(term);
    const matchDriver = (bus.driverName || "").toLowerCase().includes(term);
    const matchStops = (bus.stops || []).some((s) => (s.stopName || "").toLowerCase().includes(term));
    const matchStatus = activeStatus === "All" || bus.status === activeStatus;
    return (matchBusNo || matchRoute || matchDriver || matchStops) && matchStatus;
  });

  return (
    <div className="bp-page">
      {/* Main Navbar */}
      <Navbar />

      <div className="bp-content">

        {/* CONTROLS */}
        <div className="bp-controls">
          <div className="bp-search-box">
            <FaSearch className="bp-search-icon" />
            <input
              type="text"
              placeholder="Search by bus number, route or driver..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bp-search-input"
            />
          </div>

          <div className="bp-filters">
            {statuses.map((st) => (
              <button
                key={st}
                className={`bp-filter-btn ${activeStatus === st ? "active" : ""}`}
                onClick={() => setActiveStatus(st)}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* BUS GRID */}
        <div className="bp-grid">
          {filtered.map((bus, idx) => (
            <div
              className="bp-card"
              key={bus._id || bus.id || bus.busNo || bus.busNumber || idx}
            >
              {/* BUS VISUAL HEADER */}
              <div className="bp-card-visual" onClick={() => setLightboxImg(bus.image)}>
                <img
                  src={bus.image}
                  alt={bus.busNo}
                  className="bp-card-img zoomable-img"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <div className="bp-card-overlay" />
                <div className="bp-visual-icon">
                  <FaBus color={bus.iconColor || "#003366"} size={22} />
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
                {bus.stops && bus.stops.length > 0 && (
                  <div className="bp-timeline">
                    <p className="bp-timeline-heading">Stops Sequence</p>
                    <div className="bp-timeline-line">
                      {bus.stops.map((stop, i) => (
                        <div className="bp-timeline-node" key={i}>
                          <FaCircle className="bp-node-dot" style={{ color: bus.iconColor || "#003366" }} />
                          <span className="bp-node-label">{stop}</span>
                          {i < bus.stops.length - 1 && <span className="bp-node-arrow">→</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxImg} alt="Enlarged view" className="lightbox-img" />
            <button className="lightbox-close" onClick={() => setLightboxImg(null)}>&times;</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default BusesPage;
