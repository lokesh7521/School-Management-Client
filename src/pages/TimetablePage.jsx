import { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";
import axios from "axios";
import { timetableData as defaultTimetableData } from "../data/schoolData";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./TimetablePage.css";

function TimetablePage() {
  const [schoolHours, setSchoolHours] = useState(defaultTimetableData.schoolHours);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/public/timetable")
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
          const hours = res.data.data
            .filter((item) => item.category === "hours")
            .map((item) => ({
              title: item.periodOrTitle,
              time: item.time,
              description: item.subjectOrDesc
            }));

          if (hours.length > 0) setSchoolHours(hours);
        }
      })
      .catch((err) => {
        console.log("Using default timetable data");
      });
  }, []);

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
          <h2>School Operating Hours</h2>
          <p>
            Detailed outline of daily school operations from morning arrival to dismissal.
          </p>
        </section>

        {/* Schedule Content */}
        <div className="timetable-content-wrapper">
          <div className="hours-tab-content">
            <div className="content-intro">
              <h3>General School Day Schedule</h3>
              <p>Detailed outline of daily school operations from morning assembly to dismissal.</p>
            </div>

            <div className="timeline-grid">
              {schoolHours.map((slot, idx) => (
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
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default TimetablePage;
