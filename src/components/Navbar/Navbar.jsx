import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaChevronDown
} from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoLightbox, setLogoLightbox] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.classList.remove("mobile-menu-open");
    }
    return () => {
      document.body.classList.remove("mobile-menu-open");
    };
  }, [menuOpen]);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMenuOpen(false);
    setOpenDropdown(null);
    
    // Check if we are already on the homepage and the hash matches
    const isSameHash = location.pathname === "/" && location.hash === `#${targetId}`;

    if (isSameHash) {
      const target = document.getElementById(targetId);
      if (target) {
        document.body.classList.remove("scroll-down");
        document.body.classList.add("scroll-up");
        document.body.classList.add("nav-scrolling");
        window.__navScrolling = true;

        const navbar = document.querySelector(".school-header");
        const navbarHeight = navbar ? navbar.offsetHeight : 120;
        const targetTop =
          target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        window.scrollTo({ top: targetTop, behavior: "smooth" });

        const handleScrollEnd = () => {
          window.__navScrolling = false;
          document.body.classList.remove("nav-scrolling");
          window.removeEventListener("scrollend", handleScrollEnd);
        };
        window.addEventListener("scrollend", handleScrollEnd);

        // Fallback for older browsers
        setTimeout(() => {
          window.__navScrolling = false;
          document.body.classList.remove("nav-scrolling");
          window.removeEventListener("scrollend", handleScrollEnd);
        }, 1500);
      }
    } else {
      // Let React Router update the hash in the URL, triggering Home.jsx scroll logic
      navigate(`/#${targetId}`);
    }
  };

  const toggleDropdown = (name) => {
    setOpenDropdown(prev => prev === name ? null : name);
  };

  return (
    <header className="school-header">
      {/* TIER 1: TOP INFO HEADER */}
      <div className="top-header">
        <div className="top-header-inner">
          <div className="school-brand" onClick={() => navigate("/")}>
            <img
              src={logo}
              alt="School Logo"
              className="school-logo zoomable-img"
              onClick={(e) => {
                e.stopPropagation();
                setLogoLightbox(true);
              }}
            />
            <div className="school-name-container">
              <h1 className="school-name">Swami Vivekanand</h1>
              <span className="school-tagline">Sen. Sec. School</span>
            </div>
          </div>

          <div className="header-info-blocks">
            <div className="info-block">
              <FaMapMarkerAlt className="info-icon" />
              <div className="info-text">
                <span className="info-title">Location</span>
                <span className="info-val">Dansroli, Sikar, Raj.</span>
              </div>
            </div>

            <a href="mailto:sitaramjetiwal1985@gmail.com" className="info-block link-block">
              <FaEnvelope className="info-icon" />
              <div className="info-text">
                <span className="info-title">Email</span>
                <span className="info-val">sitaram1985@gmail.com</span>
              </div>
            </a>

            <a href="tel:+919829739603" className="info-block link-block">
              <FaPhoneAlt className="info-icon" />
              <div className="info-text">
                <span className="info-title">Phone</span>
                <span className="info-val">+91 9829739603</span>
              </div>
            </a>
          </div>

          {/* MOBILE MENU TOGGLE ICON */}
          <div
            className="menu-icon"
            onClick={() => { setMenuOpen(!menuOpen); setOpenDropdown(null); }}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>

      {/* TIER 2: MAIN NAVBAR */}
      <nav className={`nav-bar ${menuOpen ? "active" : ""}`}>
        <ul className="nav-links">
          <li>
            <Link to="/" onClick={(e) => handleNavClick(e, "home")}>Home</Link>
          </li>

          <li className={`dropdown-li ${openDropdown === "about" ? "mobile-open" : ""}`}>
            <span
              className="nav-dropdown-toggle"
              onClick={() => toggleDropdown("about")}
            >
              About <FaChevronDown className={`dropdown-arrow ${openDropdown === "about" ? "rotated" : ""}`} />
            </span>
            <ul className="dropdown-menu">
              <li><Link to="/" onClick={(e) => handleNavClick(e, "about")}>About School</Link></li>
              <li><Link to="/" onClick={(e) => handleNavClick(e, "whychoose")}>Why Choose Us</Link></li>
            </ul>
          </li>

          <li>
            <Link to="/" onClick={(e) => handleNavClick(e, "gallery")}>Gallery</Link>
          </li>

          <li className={`dropdown-li ${openDropdown === "academics" ? "mobile-open" : ""}`}>
            <span
              className="nav-dropdown-toggle"
              onClick={() => toggleDropdown("academics")}
            >
              Academics <FaChevronDown className={`dropdown-arrow ${openDropdown === "academics" ? "rotated" : ""}`} />
            </span>
            <ul className="dropdown-menu">
              <li><Link to="/academics?stream=science" onClick={() => { setMenuOpen(false); setOpenDropdown(null); }}>Science Stream</Link></li>
              <li><Link to="/academics?stream=arts" onClick={() => { setMenuOpen(false); setOpenDropdown(null); }}>Arts Stream</Link></li>
              <li><Link to="/academics?stream=commerce" onClick={() => { setMenuOpen(false); setOpenDropdown(null); }}>Commerce Stream</Link></li>
            </ul>
          </li>

          <li>
            <Link to="/fees" onClick={() => setMenuOpen(false)}>Fees Structure</Link>
          </li>

          <li>
            <Link to="/calendar" onClick={() => setMenuOpen(false)}>School Calendar</Link>
          </li>

          <li>
            <Link to="/timetable" onClick={() => setMenuOpen(false)}>Class Timetable</Link>
          </li>

          <li>
            <Link to="/teachers" onClick={() => setMenuOpen(false)}>Teachers</Link>
          </li>

          <li>
            <Link to="/classrooms" onClick={() => setMenuOpen(false)}>Classrooms</Link>
          </li>

          <li>
            <Link to="/buses" onClick={() => setMenuOpen(false)}>Transport (Buses)</Link>
          </li>

          <li>
            <Link to="/" onClick={(e) => handleNavClick(e, "facilities")}>Facilities</Link>
          </li>

          <li>
            <Link to="/" onClick={(e) => handleNavClick(e, "contact")}>Contact</Link>
          </li>

          <li className="nav-login-item">
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login Portal</Link>
          </li>
        </ul>
      </nav>

      {logoLightbox && (
        <div className="lightbox-overlay" onClick={() => setLogoLightbox(false)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={logo} alt="School Logo" className="lightbox-img" />
            <button className="lightbox-close" onClick={() => setLogoLightbox(false)}>&times;</button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
