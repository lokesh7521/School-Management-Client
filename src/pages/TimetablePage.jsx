import { useState } from "react";
import { FaClock, FaHourglassHalf, FaBookOpen } from "react-icons/fa";
import { timetableData } from "../data/schoolData";
import Navbar from "../components/Navbar/Navbar";
import "./TimetablePage.css";

function TimetablePage() {
  const [activeTab, setActiveTab] = useState("hours"); // "hours" or "lectures"

  return (
    <div className="timetable-page">
      {/* Main Navbar */}
      <Navbar />

      <main className="timetable-container">
        {/* Intro */}
        <section className="timetable-intro">
          <div className="timetable-intro-icon">
            <FaClock />
          </div>
          <h2>Timings & Academic Schedules</h2>
          <p>
            Choose between general school operating hours and standard daily class lecture timings.
          </p>
        </section>

        {/* Tab Selectors */}
        <div className="timetable-tabs">
          <button 
            className={`tab-btn ${activeTab === "hours" ? "active" : ""}`}
            onClick={() => setActiveTab("hours")}
          >
            <FaHourglassHalf /> School Operating Hours
          </button>
          <button 
            className={`tab-btn ${activeTab === "lectures" ? "active" : ""}`}
            onClick={() => setActiveTab("lectures")}
          >
            <FaBookOpen /> Student Lecture Schedule
          </button>
        </div>

        {/* Tab Contents */}
        <div className="timetable-content-wrapper">
          {activeTab === "hours" ? (
            <div className="hours-tab-content">
              <div className="content-intro">
                <h3>General School Day Schedule</h3>
                <p>Detailed outline of daily school operations from morning arrival to dismissal.</p>
              </div>

              <div className="timeline-grid">
                {timetableData.schoolHours.map((slot, idx) => (
                  <div key={idx} className="timeline-card">
                    <div className="timeline-dot"></div>
                    <div className="timeline-time">{slot.time}</div>
                    <div className="timeline-info">
                      <h4>{slot.title}</h4>
                      <p>{slot.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="lectures-tab-content">
              <div className="content-intro">
                <h3>Daily Academic Lecture Schedule</h3>
                <p>Standard lecture duration breakdown for standard standard-level classrooms.</p>
              </div>

              <div className="lectures-table-wrapper">
                <table className="lectures-table">
                  <thead>
                    <tr>
                      <th>Lecture Block</th>
                      <th>Class Timing</th>
                      <th>Core Subject Example</th>
                      <th>Room / Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timetableData.lectureTimetable.map((lect, idx) => (
                      <tr key={idx} className={lect.period.includes("Recess") ? "recess-row" : ""}>
                        <td className="lect-period">
                          <span className="period-badge">{lect.period}</span>
                        </td>
                        <td className="lect-time">
                          <FaClock className="cell-clock-icon" /> {lect.time}
                        </td>
                        <td className="lect-subject">{lect.subject}</td>
                        <td className="lect-room">{lect.room}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="timetable-footer-note">
                <p><strong>Note:</strong> Practical lab sessions for Physics, Chemistry, and Biology are conducted on rotation in the afternoon lecture blocks (5th and 6th lectures).</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default TimetablePage;
