import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import PrincipalLogin from "./pages/PrincipalLogin";
import AdminLogin from "./pages/AdminLogin";
import TeacherLogin from "./pages/TeacherLogin";
import StudentLogin from "./pages/StudentLogin";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard/TeacherDashboard";
import PrincipalDashboard from "./pages/PrincipalDashboard/PrincipalDashboard";
import StudentsByClass from "./pages/StudentsByClass";
import TeachersPage from "./pages/TeachersPage";
import ClassroomsPage from "./pages/ClassroomsPage";
import BusesPage from "./pages/BusesPage";
import AcademicsPage from "./pages/AcademicsPage";
import FeesPage from "./pages/FeesPage";
import CalendarPage from "./pages/CalendarPage";
import TimetablePage from "./pages/TimetablePage";
import FacilitiesPage from "./pages/FacilitiesPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import GalleryPage from "./pages/GalleryPage";
import WhyChoosePage from "./pages/WhyChoosePage";
import AdmissionsPage from "./pages/AdmissionsPage";
import AdminPage from "./pages/AdminPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    const threshold = 10;

    const handleScroll = () => {
      // Skip scroll detection during programmatic scrolling, mobile menu open, or locked overflow
      if (
        window.__navScrolling ||
        document.body.classList.contains("nav-scrolling") ||
        document.body.classList.contains("mobile-menu-open") ||
        document.body.style.overflow === "hidden"
      ) {
        return;
      }

      // If the page has very little scrollable range (short pages), keep the navbar visible and return
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight < 400) {
        document.body.classList.remove("scroll-down", "scroll-up");
        return;
      }

      const scrollY = window.pageYOffset;

      // At top of page — always show navbar
      if (scrollY <= 80) {
        document.body.classList.remove("scroll-down");
        document.body.classList.remove("scroll-up");
        lastScrollY = scrollY;
        return;
      }

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        return;
      }

      if (scrollY > lastScrollY) {
        document.body.classList.add("scroll-down");
        document.body.classList.remove("scroll-up");
      } else {
        document.body.classList.remove("scroll-down");
        document.body.classList.add("scroll-up");
      }

      lastScrollY = scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/principal-login" element={<PrincipalLogin />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/principal-dashboard" element={<PrincipalDashboard />} />
        <Route path="/students-by-class" element={<StudentsByClass />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/classrooms" element={<ClassroomsPage />} />
        <Route path="/buses" element={<BusesPage />} />
        <Route path="/academics" element={<AcademicsPage />} />
        <Route path="/fees" element={<FeesPage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/why-choose" element={<WhyChoosePage />} />
        <Route path="/admissions" element={<AdmissionsPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/timetable" element={<TimetablePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;