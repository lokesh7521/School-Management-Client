import "./TeacherDashboard.css";

import { useState } from "react";

import {
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaBook,
  FaFileAlt,
  FaBell,
  FaClock,
  FaSignOutAlt,
  FaUpload,
  FaUsers
} from "react-icons/fa";

function TeacherDashboard() {

  const [activePage, setActivePage] =
    useState("dashboard");

  const teacherName =
    localStorage.getItem("teacherName") ||
    "Teacher";

  const handleLogout = () => {

    window.location.href =
      "/teacher-login";
  };

  return (

    <div className="teacher-dashboard">

      {/* SIDEBAR */}

      <div className="teacher-sidebar">

        <div className="teacher-profile">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Teacher"
          />

          <h3>
            {teacherName}
          </h3>

          <p>
            Science Teacher
          </p>

        </div>

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

            <FaChalkboardTeacher />
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
            className="logout"
            onClick={handleLogout}
          >

            <FaSignOutAlt />
            Logout

          </li>

        </ul>

      </div>

      {/* CONTENT */}

      <div className="teacher-content">

        <div className="teacher-topbar">

          <h1>
            Welcome,
            {teacherName} 👋
          </h1>

        </div>

        {/* DASHBOARD */}

        {
          activePage === "dashboard" && (

            <div className="teacher-cards">

              <div className="teacher-card">

                <FaUsers />

                <h3>
                  Students
                </h3>

                <p>
                  320
                </p>

              </div>

              <div className="teacher-card">

                <FaBook />

                <h3>
                  Assignments
                </h3>

                <p>
                  12
                </p>

              </div>

              <div className="teacher-card">

                <FaClipboardCheck />

                <h3>
                  Attendance
                </h3>

                <p>
                  Updated
                </p>

              </div>

              <div className="teacher-card">

                <FaBell />

                <h3>
                  Notices
                </h3>

                <p>
                  5
                </p>

              </div>

            </div>

          )
        }

        {/* ATTENDANCE */}

        {
          activePage === "attendance" && (

            <div className="teacher-section">

              <h2>
                Mark Attendance
              </h2>

              <table className="teacher-table">

                <thead>

                  <tr>

                    <th>
                      Student
                    </th>

                    <th>
                      Class
                    </th>

                    <th>
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  <tr>

                    <td>
                      Rahul
                    </td>

                    <td>
                      12th
                    </td>

                    <td>
                      Present
                    </td>

                  </tr>

                  <tr>

                    <td>
                      Mohit
                    </td>

                    <td>
                      11th
                    </td>

                    <td>
                      Absent
                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

          )
        }

        {/* ASSIGNMENTS */}

        {
          activePage === "assignments" && (

            <div className="teacher-section">

              <h2>
                Upload Assignments
              </h2>

              <button className="upload-btn">

                <FaUpload />
                Upload Assignment

              </button>

            </div>

          )
        }

        {/* RESULTS */}

        {
          activePage === "results" && (

            <div className="teacher-section">

              <h2>
                Upload Results
              </h2>

              <button className="upload-btn">

                <FaUpload />
                Upload Results

              </button>

            </div>

          )
        }

        {/* NOTIFICATIONS */}

        {
          activePage === "notifications" && (

            <div className="teacher-section">

              <h2>
                School Notifications
              </h2>

              <button className="upload-btn">

                <FaUpload />
                Add Notification

              </button>

            </div>

          )
        }

      </div>

    </div>

  );
}

export default TeacherDashboard;