import "./PrincipalDashboard.css";

import { useState } from "react";

import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaClipboardCheck,
  FaBell,
  FaChartBar,
  FaSignOutAlt
} from "react-icons/fa";

function PrincipalDashboard() {

  const [activePage, setActivePage] =
    useState("dashboard");

  const principalName =
    localStorage.getItem("principalName") ||
    "Principal";

  const handleLogout = () => {

    window.location.href =
      "/principal-login";
  };

  return (

    <div className="principal-dashboard">

      {/* SIDEBAR */}

      <div className="principal-sidebar">

        <div className="principal-profile">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Principal"
          />

          <h3>
            {principalName}
          </h3>

          <p>
            School Administrator
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

            <FaChartBar />
            Dashboard

          </li>

          <li
            className={
              activePage === "students"
                ? "active"
                : ""
            }

            onClick={() =>
              setActivePage("students")
            }
          >

            <FaUserGraduate />
            Students

          </li>

          <li
            className={
              activePage === "teachers"
                ? "active"
                : ""
            }

            onClick={() =>
              setActivePage("teachers")
            }
          >

            <FaChalkboardTeacher />
            Teachers

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
              activePage === "notices"
                ? "active"
                : ""
            }

            onClick={() =>
              setActivePage("notices")
            }
          >

            <FaBell />
            Notices

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

      <div className="principal-content">

        <div className="principal-topbar">

          <h1>
            Welcome,
            {principalName} 👑
          </h1>

        </div>

        {/* DASHBOARD */}

        {
          activePage === "dashboard" && (

            <div className="principal-cards">

              <div className="principal-card">

                <FaUserGraduate />

                <h3>
                  Total Students
                </h3>

                <p>
                  1200
                </p>

              </div>

              <div className="principal-card">

                <FaChalkboardTeacher />

                <h3>
                  Total Teachers
                </h3>

                <p>
                  85
                </p>

              </div>

              <div className="principal-card">

                <FaMoneyBillWave />

                <h3>
                  Fees Collection
                </h3>

                <p>
                  ₹8L
                </p>

              </div>

              <div className="principal-card">

                <FaClipboardCheck />

                <h3>
                  Attendance
                </h3>

                <p>
                  92%
                </p>

              </div>

            </div>

          )
        }

        {/* STUDENTS */}

        {
          activePage === "students" && (

            <div className="principal-section">

              <h2>
                Student Management
              </h2>

              <table className="principal-table">

                <thead>

                  <tr>

                    <th>
                      Name
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
                      Active
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
                      Active
                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

          )
        }

        {/* TEACHERS */}

        {
          activePage === "teachers" && (

            <div className="principal-section">

              <h2>
                Teacher Management
              </h2>

              <table className="principal-table">

                <thead>

                  <tr>

                    <th>
                      Teacher
                    </th>

                    <th>
                      Subject
                    </th>

                    <th>
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  <tr>

                    <td>
                      Mr. Sharma
                    </td>

                    <td>
                      Physics
                    </td>

                    <td>
                      Active
                    </td>

                  </tr>

                  <tr>

                    <td>
                      Mrs. Verma
                    </td>

                    <td>
                      Mathematics
                    </td>

                    <td>
                      Active
                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

          )
        }

        {/* FEES */}

        {
          activePage === "fees" && (

            <div className="principal-section">

              <h2>
                Fees Analytics
              </h2>

              <div className="analytics-boxes">

                <div className="analytics-box">

                  <h3>
                    Collected
                  </h3>

                  <p>
                    ₹8,00,000
                  </p>

                </div>

                <div className="analytics-box">

                  <h3>
                    Pending
                  </h3>

                  <p>
                    ₹1,20,000
                  </p>

                </div>

              </div>

            </div>

          )
        }

        {/* ATTENDANCE */}

        {
          activePage === "attendance" && (

            <div className="principal-section">

              <h2>
                Attendance Analytics
              </h2>

              <div className="analytics-boxes">

                <div className="analytics-box">

                  <h3>
                    Students
                  </h3>

                  <p>
                    92%
                  </p>

                </div>

                <div className="analytics-box">

                  <h3>
                    Teachers
                  </h3>

                  <p>
                    96%
                  </p>

                </div>

              </div>

            </div>

          )
        }

        {/* NOTICES */}

        {
          activePage === "notices" && (

            <div className="principal-section">

              <h2>
                School Notices
              </h2>

              <div className="notice-card">

                <h3>
                  Summer Vacation
                </h3>

                <p>
                  School will remain closed from June 1.
                </p>

              </div>

              <div className="notice-card">

                <h3>
                  PTM Meeting
                </h3>

                <p>
                  Parent Teacher Meeting on Friday.
                </p>

              </div>

            </div>

          )
        }

      </div>

    </div>

  );
}

export default PrincipalDashboard;