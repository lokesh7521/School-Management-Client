import "./StudentDashboard.css";

import { useState } from "react";

import {
  FaUserGraduate,
  FaClipboardCheck,
  FaMoneyBillWave,
  FaBus,
  FaBell,
  FaBook,
  FaFileAlt,
  FaSignOutAlt,
  FaClock,
  FaDownload
} from "react-icons/fa";

function StudentDashboard() {

  const [activePage, setActivePage] =
    useState("dashboard");

  const studentName =
    localStorage.getItem("studentName") ||
    "Student";

  const [profileImage, setProfileImage] =
    useState("");

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {

      setProfileImage(
        URL.createObjectURL(file)
      );

    }
  };

  const handleLogout = () => {

    localStorage.removeItem(
      "studentName"
    );

    window.location.href =
      "/student-login";
  };

  return (

    <div className="student-dashboard">

      {/* SIDEBAR */}

      <div className="sidebar">

        {/* PROFILE */}

        <div className="profile-card">

          <div className="profile-image-box">

            <img
              src={
                profileImage
                  ? profileImage
                  : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="Profile"
              className="profile-image"
            />

            <label
              htmlFor="profileUpload"
              className="edit-profile-btn"
            >
              ✏️
            </label>

            <input
              type="file"
              id="profileUpload"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />

          </div>

          <h3>
            {studentName}
          </h3>

          <p>
            Class 12 - Science
          </p>

        </div>

        {/* MENU */}

        <ul>

          <li
            className={
              activePage === "dashboard"
                ? "active"
                : ""
            }

            onClick={() =>
              setActivePage("dashboard")
            }
          >
            <FaUserGraduate />
            Dashboard
          </li>

          <li
            className={
              activePage === "attendance"
                ? "active"
                : ""
            }

            onClick={() =>
              setActivePage("attendance")
            }
          >
            <FaClipboardCheck />
            Attendance
          </li>

          <li
            className={
              activePage === "fees"
                ? "active"
                : ""
            }

            onClick={() =>
              setActivePage("fees")
            }
          >
            <FaMoneyBillWave />
            Fees
          </li>

          <li
            className={
              activePage === "assignments"
                ? "active"
                : ""
            }

            onClick={() =>
              setActivePage("assignments")
            }
          >
            <FaBook />
            Assignments
          </li>

          <li
            className={
              activePage === "results"
                ? "active"
                : ""
            }

            onClick={() =>
              setActivePage("results")
            }
          >
            <FaFileAlt />
            Results
          </li>

          <li
            className={
              activePage === "bus"
                ? "active"
                : ""
            }

            onClick={() =>
              setActivePage("bus")
            }
          >
            <FaBus />
            Bus Timing
          </li>

          <li
            className={
              activePage === "timetable"
                ? "active"
                : ""
            }

            onClick={() =>
              setActivePage("timetable")
            }
          >
            <FaClock />
            Timetable
          </li>

          <li
            className={
              activePage === "notifications"
                ? "active"
                : ""
            }

            onClick={() =>
              setActivePage("notifications")
            }
          >
            <FaBell />
            Notifications
          </li>

          <li
            className="logout"
            onClick={handleLogout}
          >

            <FaSignOutAlt />
            Logout

          </li>

        </ul>

      </div>

      {/* MAIN */}

      <div className="dashboard-content">

        {/* TOP */}

        <div className="top-bar">

          <div>

            <h1>
              Welcome back,
              {studentName}! 👋
            </h1>

            <p>
              Have a great day at school!
            </p>

          </div>

          <div className="date-box">

            <h3>
              {new Date().toLocaleDateString()}
            </h3>

            <p>
              {
                new Date().toLocaleDateString(
                  "en-US",
                  { weekday: "long" }
                )
              }
            </p>

          </div>

        </div>

        {/* DASHBOARD */}

        {
          activePage === "dashboard" && (

            <div className="dashboard-cards">

              <div
                className="dashboard-card"
                onClick={() =>
                  setActivePage("attendance")
                }
              >

                <h3>
                  Attendance
                </h3>

                <p>
                  92%
                </p>

                <span>
                  Overall Attendance
                </span>

              </div>

              <div
                className="dashboard-card"
                onClick={() =>
                  setActivePage("fees")
                }
              >

                <h3>
                  Fees
                </h3>

                <p>
                  ₹5600
                </p>

                <span>
                  Pending Fees
                </span>

              </div>

              <div
                className="dashboard-card"
                onClick={() =>
                  setActivePage("assignments")
                }
              >

                <h3>
                  Assignments
                </h3>

                <p>
                  5
                </p>

                <span>
                  New Assignments
                </span>

              </div>

              <div
                className="dashboard-card"
                onClick={() =>
                  setActivePage("results")
                }
              >

                <h3>
                  Results
                </h3>

                <p>
                  A+
                </p>

                <span>
                  Latest Result
                </span>

              </div>

            </div>

          )
        }

        {/* ATTENDANCE */}

        {
          activePage === "attendance" && (

            <div className="attendance-section">

              <h2>
                Attendance Details
              </h2>

              <div className="attendance-boxes">

                <div className="attendance-box">

                  <h3>
                    Total Classes
                  </h3>

                  <p>
                    220
                  </p>

                </div>

                <div className="attendance-box">

                  <h3>
                    Present
                  </h3>

                  <p>
                    202
                  </p>

                </div>

                <div className="attendance-box">

                  <h3>
                    Absent
                  </h3>

                  <p>
                    18
                  </p>

                </div>

              </div>

              <div className="progress-container">

                <div className="progress-bar">

                  <div className="progress-fill">

                    92%

                  </div>

                </div>

              </div>

            </div>

          )
        }

        {/* FEES */}

        {
          activePage === "fees" && (

            <div className="attendance-section">

              <h2>
                Fees Details
              </h2>

              <div className="fees-card">

                <h3>
                  Pending Fees
                </h3>

                <p>
                  ₹5,600
                </p>

                <button>

                  <FaDownload />
                  Download Receipt

                </button>

              </div>

            </div>

          )
        }

        {/* ASSIGNMENTS */}

        {
          activePage === "assignments" && (

            <div className="attendance-section">

              <h2>
                Assignments
              </h2>

              <div className="assignment-list">

                <div className="assignment-card">

                  <div>

                    <h3>
                      Mathematics Assignment
                    </h3>

                    <p>
                      Algebra Chapter
                    </p>

                  </div>

                  <button>

                    <FaDownload />
                    Download

                  </button>

                </div>

                <div className="assignment-card">

                  <div>

                    <h3>
                      Physics Assignment
                    </h3>

                    <p>
                      Motion & Force
                    </p>

                  </div>

                  <button>

                    <FaDownload />
                    Download

                  </button>

                </div>

              </div>

            </div>

          )
        }

        {/* RESULTS */}

        {
          activePage === "results" && (

            <div className="attendance-section">

              <h2>
                Exam Results
              </h2>

              <table className="result-table">

                <thead>

                  <tr>

                    <th>
                      Subject
                    </th>

                    <th>
                      Marks
                    </th>

                    <th>
                      Grade
                    </th>

                  </tr>

                </thead>

                <tbody>

                  <tr>

                    <td>
                      Mathematics
                    </td>

                    <td>
                      88
                    </td>

                    <td>
                      A
                    </td>

                  </tr>

                  <tr>

                    <td>
                      Physics
                    </td>

                    <td>
                      91
                    </td>

                    <td>
                      A+
                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

          )
        }

      </div>

    </div>

  );
}

export default StudentDashboard;