import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FaChalkboardTeacher,
  FaPhone,
  FaBook,
  FaArrowLeft,
  FaUsers,
  FaUserTie,
  FaUserGraduate,
  FaAward,
  FaSearch,
  FaTimes
} from "react-icons/fa";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { teachers as defaultTeachers, subjectColors } from "../data/schoolData";
import "./TeachersPage.css";

function TeachersPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const [teacherList, setTeacherList] = useState(defaultTeachers);
  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/public/teachers")
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
          setTeacherList(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Using default teacher list");
      });
  }, []);

  const handleBack = () => {
    if (from === "whychoose") {
      navigate("/#whychoose");
    } else {
      navigate("/");
    }
  };

  const getAvatar = (name, gender) => {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
      name
    )}&gender=${gender === "female" ? "female" : "male"}`;
  };

  const totalCount = teacherList.length;
  const maleCount = teacherList.filter((t) => t.gender === "male").length;
  const femaleCount = teacherList.filter((t) => t.gender === "female").length;

  const handleReset = () => {
    setSearchQuery("");
    setCategoryFilter("all");
  };

  const filteredTeachers = teacherList.filter((teacher) => {
    const query = searchQuery.toLowerCase().trim();
    const matchName = (teacher.name || "").toLowerCase().includes(query);
    const matchSubject = (teacher.subject || "").toLowerCase().includes(query);
    const matchQual = (teacher.qualification || "").toLowerCase().includes(query);
    const matchesSearch = !query || matchName || matchSubject || matchQual;

    if (!matchesSearch) return false;

    if (genderFilter === "all") return true;
    if (genderFilter === "male") return teacher.gender === "male";
    if (genderFilter === "female") return teacher.gender === "female";

    return true;
  });

  return (
    <div className="tp-page">
      {/* Main Navbar */}
      <Navbar />

      <div className="tp-content">
        {/* CONTROLS (SEARCH BAR & FILTER CHIPS) */}
        <div className="tp-controls">
          <div className="tp-search-box">
            <FaSearch className="tp-search-icon" />
            <input
              type="text"
              placeholder="Search teacher by name or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="tp-search-clear" onClick={() => setSearchQuery("")}>
                <FaTimes />
              </button>
            )}
          </div>

          <div className="tp-filters">
            <button
              className={`tp-filter-btn ${genderFilter === "all" ? "active" : ""}`}
              onClick={() => setCategoryFilter("all")}
            >
              All Teachers ({totalCount})
            </button>
            <button
              className={`tp-filter-btn ${genderFilter === "male" ? "active" : ""}`}
              onClick={() => setCategoryFilter("male")}
            >
              Male Teachers ({maleCount})
            </button>
            <button
              className={`tp-filter-btn ${genderFilter === "female" ? "active" : ""}`}
              onClick={() => setCategoryFilter("female")}
            >
              Female Teachers ({femaleCount})
            </button>
          </div>
        </div>

        {/* TEACHER GRID */}
        <div className="tp-grid">
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map((teacher, idx) => (
              <div
                className="tp-card"
                key={teacher._id || teacher.id || idx}
              >
                {/* PROFILE PIC */}
                <div className="tp-avatar-wrapper">
                  <img
                    src={teacher.image || getAvatar(teacher.name, teacher.gender)}
                    alt={teacher.name}
                    className="tp-avatar"
                    onError={(e) => {
                      e.target.src = getAvatar(teacher.name, teacher.gender);
                    }}
                  />
                  <div
                    className="tp-avatar-fallback"
                    style={{
                      background: teacher.gender === "female" ? "#c2185b" : "#003366",
                      display: "none"
                    }}
                  >
                    {teacher.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                </div>

                {/* INFO */}
                <div className="tp-card-body">
                  <h3 className="tp-name">{teacher.name}</h3>
                  <span
                    className="tp-subject-badge"
                    style={{ background: subjectColors[teacher.subject] || "#e3f2fd" }}
                  >
                    <FaBook size={10} style={{ marginRight: 4 }} />
                    {teacher.subject}
                  </span>

                  <div className="tp-details">
                    <div className="tp-detail-row">
                      <span className="tp-detail-label">Qualification</span>
                      <span className="tp-detail-val">{teacher.qualification}</span>
                    </div>
                    <div className="tp-detail-row">
                      <span className="tp-detail-label">Experience</span>
                      <span className="tp-detail-val">{teacher.experience}</span>
                    </div>
                    <div className="tp-detail-row">
                      <span className="tp-detail-label"><FaPhone size={10} /> Phone</span>
                      <a className="tp-phone" href={`tel:${teacher.phone}`}>{teacher.phone || "N/A"}</a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="tp-empty">
              <p>No teachers found matching your criteria.</p>
              <button className="tp-reset-btn" onClick={handleReset}>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TeachersPage;
