import { useNavigate, useSearchParams } from "react-router-dom";
import { FaChalkboardTeacher, FaPhone, FaBook, FaArrowLeft } from "react-icons/fa";
import Navbar from "../components/Navbar/Navbar";
import { teachers, subjectColors } from "../data/schoolData";
import "./TeachersPage.css";


function TeachersPage() {
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

  const getAvatar = (name, gender) => {
    const bg = gender === "female" ? "c2185b" : "003366";
    const color = "ffffff";
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bg}&color=${color}&size=150&bold=true&rounded=true`;
  };

  return (
    <div className="tp-page">

      {/* Main Navbar */}
      <Navbar />

      <div className="tp-content">

        {/* PAGE HEADING */}
        <div className="tp-page-heading">
          <FaChalkboardTeacher className="tp-heading-icon" />
          <div>
            <h1 className="tp-heading-title">Our Teachers</h1>
            <p className="tp-heading-sub">Swami Vivekanand Sen. Sec. School — Faculty Directory</p>
          </div>
          <button className="tp-heading-back-btn" onClick={handleBack}>
            <FaArrowLeft /> Back
          </button>
        </div>

        {/* SUMMARY */}
        <div className="tp-summary">
          <div className="tp-sum-card">
            <span className="tp-sum-num">{teachers.length}</span>
            <span className="tp-sum-label">Total Teachers</span>
          </div>
          <div className="tp-sum-card">
            <span className="tp-sum-num">{teachers.filter(t => t.gender === "male").length}</span>
            <span className="tp-sum-label">Male Teachers</span>
          </div>
          <div className="tp-sum-card">
            <span className="tp-sum-num">{teachers.filter(t => t.gender === "female").length}</span>
            <span className="tp-sum-label">Female Teachers</span>
          </div>
          <div className="tp-sum-card highlight">
            <span className="tp-sum-num">25+</span>
            <span className="tp-sum-label">Avg Experience</span>
          </div>
        </div>

        {/* TEACHER GRID */}
        <div className="tp-grid">
          {teachers.map((teacher) => (
            <div className="tp-card" key={teacher.id}
              style={{ borderTop: `4px solid ${teacher.gender === "female" ? "#c2185b" : "#003366"}` }}
            >
              {/* PROFILE PIC */}
              <div className="tp-avatar-wrapper">
                <img
                  src={getAvatar(teacher.name, teacher.gender)}
                  alt={teacher.name}
                  className="tp-avatar"
                  onError={e => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div
                  className="tp-avatar-fallback"
                  style={{
                    background: teacher.gender === "female" ? "#c2185b" : "#003366",
                    display: "none"
                  }}
                >
                  {teacher.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
              </div>

              {/* INFO */}
              <div className="tp-card-body">
                <h3 className="tp-name">{teacher.name}</h3>
                <span
                  className="tp-subject-badge"
                  style={{ background: subjectColors[teacher.subject] || "#f5f5f5" }}
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
                    <a className="tp-phone" href={`tel:${teacher.phone}`}>{teacher.phone}</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default TeachersPage;
