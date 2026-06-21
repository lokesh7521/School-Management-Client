import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaUserGraduate, FaSearch, FaChartBar, FaArrowLeft } from "react-icons/fa";
import Navbar from "../components/Navbar/Navbar";
import { classData, streamColors } from "../data/schoolData";
import "./StudentsByClass.css";

const maxStudents = Math.max(...classData.map(c => c.students));
const totalStudents = classData.reduce((sum, c) => sum + c.students, 0);


function StudentsByClass() {
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
  const [activeStream, setActiveStream] = useState("All");

  const streams = ["All", "Primary", "Middle", "Secondary", "Senior"];

  const filtered = classData.filter(c => {
    const matchSearch = c.class.toLowerCase().includes(search.toLowerCase());
    const matchStream = activeStream === "All" || c.stream === activeStream;
    return matchSearch && matchStream;
  });

  const filteredTotal = filtered.reduce((sum, c) => sum + c.students, 0);

  return (
    <div className="sbc-page">

      {/* Main Navbar */}
      <Navbar />

      <div className="sbc-content">

        {/* PAGE HEADING */}
        <div className="sbc-page-heading">
          <FaUserGraduate className="sbc-heading-icon" />
          <div>
            <h1 className="sbc-heading-title">Students By Class</h1>
            <p className="sbc-heading-sub">Swami Vivekanand Sen. Sec. School — Class-wise Enrollment Overview</p>
          </div>
          <button className="sbc-back-btn" onClick={handleBack}>
            <FaArrowLeft /> Back
          </button>
        </div>

        {/* SUMMARY CARDS */}
        <div className="sbc-summary">
          <div className="sbc-summary-card">
            <span className="sbc-sum-num">{totalStudents}</span>
            <span className="sbc-sum-label">Total Students</span>
          </div>
          <div className="sbc-summary-card">
            <span className="sbc-sum-num">12</span>
            <span className="sbc-sum-label">Total Classes</span>
          </div>
          <div className="sbc-summary-card">
            <span className="sbc-sum-num">{Math.round(totalStudents / 12)}</span>
            <span className="sbc-sum-label">Avg Per Class</span>
          </div>
          <div className="sbc-summary-card highlight">
            <span className="sbc-sum-num">{classData.find(c => c.students === maxStudents)?.class}</span>
            <span className="sbc-sum-label">Largest Class</span>
          </div>
        </div>

        {/* SEARCH + FILTER */}
        <div className="sbc-controls">
          <div className="sbc-search-box">
            <FaSearch className="sbc-search-icon" />
            <input
              type="text"
              placeholder="Search class..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="sbc-filters">
            {streams.map(s => (
              <button
                key={s}
                className={`sbc-filter-btn ${activeStream === s ? "active" : ""}`}
                onClick={() => setActiveStream(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* SHOWING COUNT */}
        <p className="sbc-showing">
          Showing <strong>{filtered.length}</strong> classes · <strong>{filteredTotal}</strong> students
        </p>

        {/* CLASS CARDS WITH BAR */}
        <div className="sbc-grid">
          {filtered.map((item, i) => {
            const colors = streamColors[item.stream];
            const barWidth = Math.round((item.students / maxStudents) * 100);
            return (
              <div className="sbc-card" key={i}>
                <div className="sbc-card-top">
                  <div className="sbc-card-title">
                    <FaChartBar className="sbc-card-icon" style={{ color: colors.bar }} />
                    <span>{item.class}</span>
                  </div>
                  <span
                    className="sbc-stream-badge"
                    style={{ backgroundColor: colors.bg, color: colors.color }}
                  >
                    {item.stream}
                  </span>
                </div>

                <div className="sbc-student-count">
                  <span className="sbc-count-num" style={{ color: colors.bar }}>
                    {item.students}
                  </span>
                  <span className="sbc-count-label">Students</span>
                </div>

                {/* PROGRESS BAR */}
                <div className="sbc-bar-bg">
                  <div
                    className="sbc-bar-fill"
                    style={{ width: `${barWidth}%`, backgroundColor: colors.bar }}
                  />
                </div>
                <div className="sbc-bar-info">
                  <span>Sections: {item.section}</span>
                  <span>{barWidth}% of max</span>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="sbc-empty">
            <FaUserGraduate size={48} color="#ccc" />
            <p>No class found matching your search.</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default StudentsByClass;
