import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaGraduationCap,
  FaCheckCircle,
  FaFileAlt,
  FaPhoneAlt,
  FaUserCheck,
  FaClipboardList,
  FaIdCard,
  FaArrowRight
} from "react-icons/fa";
import "./Admissions.css";

const API_BASE = "http://localhost:5000/api";

function Admissions() {
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    className: "",
    mobile: "",
    address: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [schoolInfo, setSchoolInfo] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await axios.get(`${API_BASE}/public/info`);
        if (res.data && res.data.data) {
          setSchoolInfo(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching school info in Admissions component", err);
      }
    };
    fetchInfo();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { studentName, parentName, className, mobile, address } = formData;

    if (!studentName || !parentName || !className || !mobile || !address) {
      setError("⚠️ Please fill all fields before submitting.");
      return;
    }

    if (mobile.length < 10) {
      setError("⚠️ Please enter a valid 10-digit mobile number.");
      return;
    }

    setSubmitted(true);
    setFormData({ studentName: "", parentName: "", className: "", mobile: "", address: "" });

    setTimeout(() => setSubmitted(false), 4000);
  };

  const defaultSteps = [
    {
      num: "01",
      title: "Fill Inquiry Form",
      desc: "Submit student details online or at our school admission desk."
    },
    {
      num: "02",
      title: "Document Verification",
      desc: "Provide necessary certificates and previous academic records."
    },
    {
      num: "03",
      title: "School Interaction",
      desc: "Brief friendly discussion with student & parent for stream guidance."
    },
    {
      num: "04",
      title: "Seat Confirmation",
      desc: "Pay installment fee to secure admission and get student roll ID."
    }
  ];

  const steps = schoolInfo && schoolInfo.admissionSteps && schoolInfo.admissionSteps.length > 0
    ? schoolInfo.admissionSteps.map((st, i) => ({
        num: (i + 1).toString().padStart(2, "0"),
        title: st.title || `Step ${i + 1}`,
        desc: st.desc || ""
      }))
    : defaultSteps;

  const docs = [
    "Birth Certificate",
    "Aadhar Card (Student & Parent)",
    "Previous Class Report Card",
    "Transfer Certificate (TC)",
    "4 Passport Size Photographs"
  ];

  return (
    <section className="admissions" id="admissions">
      <div className="admissions-header">
        <p className="admission-label">
          APPLY FOR ACADEMIC SESSION {schoolInfo?.admissionSession || "2026-27"}
        </p>
        <h2>{schoolInfo?.admissionTitle || "Admissions Open"}</h2>
        <p className="admission-subtitle">
          {schoolInfo?.admissionSubtitle ||
            "Join Swami Vivekanand Sen. Sec. School — Nurturing excellence, values, and bright futures for every child."}
        </p>
        {schoolInfo?.admissionPdfUrl && (
          <div style={{ marginTop: "12px" }}>
            <a
              href={schoolInfo.admissionPdfUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-download-prospectus"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 18px",
                background: "#2563eb",
                color: "#fff",
                borderRadius: "20px",
                fontSize: "0.88rem",
                fontWeight: "600",
                textDecoration: "none",
                boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)"
              }}
            >
              📄 Download Official School Prospectus (PDF)
            </a>
          </div>
        )}
      </div>

      <div className="admissions-wrapper">
        {/* LEFT COLUMN: PROCESS & HIGHLIGHTS */}
        <div className="admissions-info-col">
          {/* ADMISSION STEPS */}
          <div className="adm-block">
            <h3 className="adm-block-title">
              <FaClipboardList className="adm-title-icon" /> Simple 4-Step Admission Process
            </h3>
            <div className="adm-steps-grid">
              {steps.map((s, idx) => (
                <div className="adm-step-card" key={idx}>
                  <span className="adm-step-num">{s.num}</span>
                  <div className="adm-step-text">
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* REQUIRED DOCUMENTS */}
          <div className="adm-block">
            <h3 className="adm-block-title">
              <FaFileAlt className="adm-title-icon" /> Required Documents
            </h3>
            <ul className="adm-docs-list">
              {docs.map((doc, idx) => (
                <li key={idx}>
                  <FaCheckCircle className="adm-check-icon" /> {doc}
                </li>
              ))}
            </ul>
          </div>

          {/* HELPLINE BANNER */}
          <div className="adm-helpline-box">
            <div className="adm-help-icon">
              <FaPhoneAlt />
            </div>
            <div className="adm-help-details">
              <span className="adm-help-label">Admission Desk Helpline</span>
              <a
                href={`tel:${schoolInfo?.admissionPhone1 || schoolInfo?.phone || "+919829739603"}`}
                className="adm-help-number"
              >
                {schoolInfo?.admissionPhone1 || schoolInfo?.phone || "+91 9829739603"}
              </a>
              {schoolInfo?.admissionPhone2 && (
                <a
                  href={`tel:${schoolInfo.admissionPhone2}`}
                  className="adm-help-number"
                  style={{ fontSize: "0.95rem", display: "block", marginTop: "2px" }}
                >
                  📞 {schoolInfo.admissionPhone2}
                </a>
              )}
              <span className="adm-help-time">
                {schoolInfo?.officeHours || "Available Mon - Sat | 08:00 AM - 03:00 PM"}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: INQUIRY FORM */}
        <div className="admissions-form-col">
          <div className="adm-form-header">
            <h3>Online Admission Inquiry</h3>
            <p>Fill out the form below and our counselor will call you within 24 hours.</p>
          </div>

          {submitted && (
            <div className="admission-success">
              ✅ Inquiry submitted successfully! Our counselor will call you shortly.
            </div>
          )}

          {error && (
            <div className="admission-error">
              {error}
            </div>
          )}

          <form className="admission-form" onSubmit={handleSubmit}>
            <div className="adm-field">
              <label>Student Name *</label>
              <input
                type="text"
                name="studentName"
                placeholder="Enter full student name"
                value={formData.studentName}
                onChange={handleChange}
              />
            </div>

            <div className="adm-field">
              <label>Parent / Guardian Name *</label>
              <input
                type="text"
                name="parentName"
                placeholder="Enter parent/guardian name"
                value={formData.parentName}
                onChange={handleChange}
              />
            </div>

            <div className="adm-field-row">
              <div className="adm-field">
                <label>Applying Class *</label>
                <select
                  name="className"
                  value={formData.className}
                  onChange={handleChange}
                  className="adm-select"
                >
                  <option value="">Select Class</option>
                  <option value="Nursery / KG">Nursery / KG</option>
                  <option value="Class 1 to 5 (Primary)">Class 1 to 5 (Primary)</option>
                  <option value="Class 6 to 8 (Middle)">Class 6 to 8 (Middle)</option>
                  <option value="Class 9 & 10 (Secondary)">Class 9 & 10 (Secondary)</option>
                  <option value="Class 11 Science">Class 11 Science</option>
                  <option value="Class 11 Arts">Class 11 Arts</option>
                  <option value="Class 11 Commerce">Class 11 Commerce</option>
                  <option value="Class 12 Science">Class 12 Science</option>
                  <option value="Class 12 Arts">Class 12 Arts</option>
                  <option value="Class 12 Commerce">Class 12 Commerce</option>
                </select>
              </div>

              <div className="adm-field">
                <label>Mobile Number *</label>
                <input
                  type="number"
                  name="mobile"
                  placeholder="10-digit mobile no."
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="adm-field">
              <label>Residential Address *</label>
              <textarea
                name="address"
                placeholder="Enter village/city and district address"
                value={formData.address}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="adm-submit-btn">
              Submit Admission Form <FaArrowRight />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Admissions;