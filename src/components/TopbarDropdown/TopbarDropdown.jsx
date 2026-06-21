import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./TopbarDropdown.css";

function TopbarDropdown({ currentPath }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const options = [
    { label: "Home", value: "/" },
    { label: "Academics", value: "/academics" },
    { label: "Students", value: "/students-by-class" },
    { label: "Teachers", value: "/teachers" },
    { label: "Classrooms", value: "/classrooms" },
    { label: "Buses", value: "/buses" }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <div className="topbar-nav-dropdown" ref={dropdownRef}>
      <button
        className={`topbar-dropdown-btn ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Navigation Menu"
      >
        <FaBars />
      </button>

      {isOpen && (
        <ul className="topbar-dropdown-menu">
          <li className="dropdown-header">Quick Navigation</li>
          {options.map((opt) => (
            <li key={opt.value}>
              <button
                className={`dropdown-item ${currentPath === opt.value ? "selected" : ""}`}
                onClick={() => handleSelect(opt.value)}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TopbarDropdown;
