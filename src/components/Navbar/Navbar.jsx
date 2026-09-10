import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
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

const API_BASE = "http://localhost:5000/api";

const DEFAULT_NAV = [
  { _id: "1", title: "Home", path: "/", order: 1 },
  { _id: "2", title: "About", path: "/about", order: 2 },
  { _id: "21", title: "About School", path: "/about", parentId: "2", order: 1 },
  { _id: "22", title: "Why Choose Us", path: "/why-choose", parentId: "2", order: 2 },
  { _id: "3", title: "Gallery", path: "/gallery", order: 3 },
  { _id: "4", title: "Academics", path: "/academics", order: 4 },
  { _id: "41", title: "Science Stream", path: "/academics?stream=science", parentId: "4", order: 1 },
  { _id: "42", title: "Arts Stream", path: "/academics?stream=arts", parentId: "4", order: 2 },
  { _id: "43", title: "Commerce Stream", path: "/academics?stream=commerce", parentId: "4", order: 3 },
  { _id: "5", title: "Fees Structure", path: "/fees", order: 5 },
  { _id: "6", title: "School Calendar", path: "/calendar", order: 6 },
  { _id: "7", title: "School Timetable", path: "/timetable", order: 7 },
  { _id: "8", title: "Teachers", path: "/teachers", order: 8 },
  { _id: "9", title: "Classrooms", path: "/classrooms", order: 9 },
  { _id: "10", title: "Transport (Buses)", path: "/buses", order: 10 },
  { _id: "11", title: "Facilities", path: "/facilities", order: 11 },
  { _id: "12", title: "Contact", path: "/contact", order: 12 },
  { _id: "13", title: "Login Portal", path: "/login", order: 13, isButton: true }
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoLightbox, setLogoLightbox] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [navItems, setNavItems] = useState(DEFAULT_NAV);
  const [schoolInfo, setSchoolInfo] = useState({
    logoUrl: "",
    schoolName: "Swami Vivekanand",
    tagline: "Sen. Sec. School",
    location: "Dansroli, Sikar, Raj.",
    email: "sitaram1985@gmail.com",
    phone: "+91 9829739603"
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("mobile-menu-open");
      document.documentElement.classList.add("mobile-menu-open");
    } else {
      document.body.classList.remove("mobile-menu-open");
      document.documentElement.classList.remove("mobile-menu-open");
    }
    return () => {
      document.body.classList.remove("mobile-menu-open");
      document.documentElement.classList.remove("mobile-menu-open");
    };
  }, [menuOpen]);

  // Fetch Navbar items & School Info from backend
  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const [navRes, infoRes] = await Promise.allSettled([
          axios.get(`${API_BASE}/public/navbar`),
          axios.get(`${API_BASE}/public/info`)
        ]);

        if (navRes.status === "fulfilled" && navRes.value.data.data?.length > 0) {
          const cleanedNav = navRes.value.data.data.map((item) => {
            const t = (item.title || "").toLowerCase();
            const p = (item.path || "").toLowerCase();

            if (t.includes("gallery") || p.includes("gallery")) {
              return { ...item, path: "/gallery" };
            }
            if (t.includes("facility") || p.includes("facility")) {
              return { ...item, path: "/facilities" };
            }
            if (t.includes("contact") || p.includes("contact")) {
              return { ...item, path: "/contact" };
            }
            if (t === "about" || t.includes("about school") || p === "/#about" || p === "#about") {
              return { ...item, path: "/about" };
            }
            if (t.includes("why choose") || p.includes("whychoose")) {
              return { ...item, path: "/why-choose" };
            }
            if (t.includes("admission") || p.includes("admission")) {
              return { ...item, path: "/admissions" };
            }
            if (t === "home" || p === "/#home" || p === "#home") {
              return { ...item, path: "/" };
            }
            return item;
          });
          setNavItems(cleanedNav);
        }

        if (infoRes.status === "fulfilled" && infoRes.value.data.data) {
          const info = infoRes.value.data.data;
          setSchoolInfo({
            logoUrl: info.logoUrl || "",
            schoolName: info.schoolName || "Swami Vivekanand",
            tagline: info.tagline || "Sen. Sec. School",
            location: info.address || "Dansroli, Sikar, Raj.",
            googleMapsUrl: info.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(info.address || "Dansroli Sikar Rajasthan")}`,
            email: info.email || "sitaram1985@gmail.com",
            phone: info.phone || "+91 9829739603"
          });
        }
      } catch (err) {
        console.error("Error fetching navbar data:", err);
      }
    };

    fetchHeaderData();
  }, []);

  const handleNavClick = (e, path) => {
    // Check if it is a section hash link (e.g. /#about or #about)
    if (path && path.includes("#")) {
      const targetId = path.split("#")[1];
      if (targetId) {
        e.preventDefault();
        setMenuOpen(false);
        setOpenDropdown(null);

        const isSameHash = location.pathname === "/" && location.hash === `#${targetId}`;

        if (isSameHash) {
          const target = document.getElementById(targetId);
          if (target) {
            document.body.classList.remove("scroll-down");
            document.body.classList.add("scroll-up");
            document.body.classList.add("nav-scrolling");
            window.__navScrolling = true;

            const navbar = document.querySelector(".school-header");
            const navbarHeight = navbar ? navbar.offsetHeight : 115;
            const targetTop =
              target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

            window.scrollTo({ top: targetTop, behavior: "smooth" });

            const handleScrollEnd = () => {
              window.__navScrolling = false;
              document.body.classList.remove("nav-scrolling");
              window.removeEventListener("scrollend", handleScrollEnd);
            };
            window.addEventListener("scrollend", handleScrollEnd);

            setTimeout(() => {
              window.__navScrolling = false;
              document.body.classList.remove("nav-scrolling");
              window.removeEventListener("scrollend", handleScrollEnd);
            }, 1500);
          }
        } else {
          navigate(`/#${targetId}`);
        }
      }
    } else {
      setMenuOpen(false);
      setOpenDropdown(null);
    }
  };

  const toggleDropdown = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  // Group top-level items and children
  const topItems = navItems
    .filter((item) => !item.parentId)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const getChildren = (parentId) =>
    navItems
      .filter((item) => item.parentId && item.parentId.toString() === parentId.toString())
      .sort((a, b) => (a.order || 0) - (b.order || 0));

  // Render a single navigation link or action
  const renderNavLink = (item, isChild = false) => {
    const isSectionHash = item.path && item.path.includes("#");
    const isExternal = item.isExternal || (item.path && item.path.startsWith("http"));

    if (isExternal) {
      return (
        <a
          href={item.path}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            setMenuOpen(false);
            setOpenDropdown(null);
          }}
        >
          {item.title}
        </a>
      );
    }

    if (isSectionHash) {
      return (
        <Link to={item.path} onClick={(e) => handleNavClick(e, item.path)}>
          {item.title}
        </Link>
      );
    }

    return (
      <Link
        to={item.path}
        onClick={() => {
          setMenuOpen(false);
          setOpenDropdown(null);
        }}
      >
        {item.title}
      </Link>
    );
  };

  return (
    <header className="school-header">
      {/* MOBILE BACKDROP OVERLAY */}
      {menuOpen && (
        <div
          className="mobile-drawer-backdrop"
          onTouchMove={(e) => e.preventDefault()}
          onClick={() => {
            setMenuOpen(false);
            setOpenDropdown(null);
          }}
        />
      )}

      {/* TIER 1: TOP INFO HEADER */}
      <div className="top-header">
        <div className="top-header-inner">
          <div className="school-brand" onClick={() => navigate("/")}>
            <img
              src={schoolInfo.logoUrl || logo}
              alt="School Logo"
              className="school-logo zoomable-img"
              onClick={(e) => {
                e.stopPropagation();
                setLogoLightbox(true);
              }}
            />
            <div className="school-name-container">
              <h1 className="school-name">{schoolInfo.schoolName}</h1>
              <span className="school-tagline">{schoolInfo.tagline}</span>
            </div>
          </div>

          <div className="header-info-blocks">
            <a
              href={schoolInfo.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(schoolInfo.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="info-block link-block"
            >
              <FaMapMarkerAlt className="info-icon" />
              <div className="info-text">
                <span className="info-title">Location</span>
                <span className="info-val">{schoolInfo.location}</span>
              </div>
            </a>

            <a href={`mailto:${schoolInfo.email}`} className="info-block link-block">
              <FaEnvelope className="info-icon" />
              <div className="info-text">
                <span className="info-title">Email</span>
                <span className="info-val">{schoolInfo.email}</span>
              </div>
            </a>

            <a href={`tel:${schoolInfo.phone}`} className="info-block link-block">
              <FaPhoneAlt className="info-icon" />
              <div className="info-text">
                <span className="info-title">Phone</span>
                <span className="info-val">{schoolInfo.phone}</span>
              </div>
            </a>
          </div>

          {/* MOBILE MENU TOGGLE ICON */}
          <div
            className="menu-icon"
            onClick={() => {
              setMenuOpen(!menuOpen);
              setOpenDropdown(null);
            }}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER BACKDROP */}
      {menuOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={() => {
            setMenuOpen(false);
            setOpenDropdown(null);
          }}
          onTouchMove={(e) => e.preventDefault()}
        />
      )}

      {/* TIER 2: MAIN NAVBAR */}
      <nav className={`nav-bar ${menuOpen ? "active" : ""}`}>
        {menuOpen && (
          <div className="drawer-header">
            <span className="drawer-title">Navigation</span>
          </div>
        )}
        <ul className="nav-links">
          {topItems.map((item) => {
            const children = getChildren(item._id);
            const hasChildren = children.length > 0;
            const isOpen = openDropdown === item._id;
            const liClass = item.isButton
              ? "nav-login-item"
              : hasChildren
                ? `dropdown-li ${isOpen ? "mobile-open" : ""}`
                : "";

            if (hasChildren) {
              return (
                <li key={item._id} className={liClass}>
                  <span
                    className="nav-dropdown-toggle"
                    onClick={() => toggleDropdown(item._id)}
                  >
                    {item.title}{" "}
                    <FaChevronDown
                      className={`dropdown-arrow ${isOpen ? "rotated" : ""}`}
                    />
                  </span>
                  <ul className="dropdown-menu">
                    {children.map((child) => (
                      <li key={child._id}>{renderNavLink(child, true)}</li>
                    ))}
                  </ul>
                </li>
              );
            }

            return (
              <li key={item._id} className={liClass}>
                {renderNavLink(item)}
              </li>
            );
          })}
        </ul>
      </nav>

      {logoLightbox && (
        <div className="lightbox-overlay" onClick={() => setLogoLightbox(false)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={schoolInfo.logoUrl || logo} alt="School Logo" className="lightbox-img" />
            <button className="lightbox-close" onClick={() => setLogoLightbox(false)}>
              &times;
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
