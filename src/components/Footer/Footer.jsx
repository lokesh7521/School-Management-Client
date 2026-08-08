import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Footer.css";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaWhatsapp
} from "react-icons/fa";

const API_BASE = "http://localhost:5000/api";

function Footer() {
  const [info, setInfo] = useState({
    schoolName: "Swami Vivekanand",
    tagline: "Sen. Sec. School",
    footerText: "Quality education with discipline, moral values and practical learning.",
    address: "Dansroli, Sikar, Raj.",
    phone: "+91 9829739603",
    email: "sitaram1985@gmail.com",
    whatsappPhone: "+91 9829739603",
    facebookUrl: "",
    instagramUrl: "",
    youtubeUrl: "",
    twitterUrl: "",
    copyrightText: `© ${new Date().getFullYear()} Swami Vivekanand Sen. Sec. School. All Rights Reserved.`
  });

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await axios.get(`${API_BASE}/public/info`);
        if (res.data && res.data.data) {
          setInfo((prev) => ({ ...prev, ...res.data.data }));
        }
      } catch (err) {
        console.error("Error fetching footer info", err);
      }
    };
    fetchInfo();
  }, []);

  const cleanPhoneForWa = (ph) => {
    if (!ph) return "919829739603";
    return ph.replace(/\D/g, "");
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* LEFT */}
        <div className="footer-box">
          <h2>
            {info.schoolName} {info.tagline}
          </h2>

          <p>{info.footerText}</p>

          {/* SOCIAL ICONS */}
          <div className="social-icons">
            {info.facebookUrl ? (
              <a href={info.facebookUrl} target="_blank" rel="noreferrer">
                <FaFacebook />
              </a>
            ) : (
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebook />
              </a>
            )}

            {info.instagramUrl ? (
              <a href={info.instagramUrl} target="_blank" rel="noreferrer">
                <FaInstagram />
              </a>
            ) : (
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram />
              </a>
            )}

            {info.youtubeUrl ? (
              <a href={info.youtubeUrl} target="_blank" rel="noreferrer">
                <FaYoutube />
              </a>
            ) : (
              <a href="https://youtube.com" target="_blank" rel="noreferrer">
                <FaYoutube />
              </a>
            )}

            {info.twitterUrl && (
              <a href={info.twitterUrl} target="_blank" rel="noreferrer">
                <FaTwitter />
              </a>
            )}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-box">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/academics">Academics</Link></li>
            <li><Link to="/admissions">Admissions</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-box">
          <h3>Contact Us</h3>

          {/* ADDRESS */}
          <a
            href={info.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(info.address || "Dansroli Sikar Rajasthan")}`}
            target="_blank"
            rel="noreferrer"
          >
            <FaMapMarkerAlt className="footer-icon" />
            <span>{info.address || "Dansroli, Sikar, Rajasthan"}</span>
          </a>

          {/* PHONE */}
          <a href={`tel:${info.phone || "+919829739603"}`}>
            <FaPhoneAlt className="footer-icon" />
            <span>{info.phone || "+91 9829739603"}</span>
          </a>

          {/* EMAIL */}
          <a href={`mailto:${info.email || "sitaram1985@gmail.com"}`}>
            <FaEnvelope className="footer-icon" />
            <span>{info.email || "sitaram1985@gmail.com"}</span>
          </a>

          {/* WHATSAPP */}
          <a
            href={`https://wa.me/${cleanPhoneForWa(info.whatsappPhone || info.phone)}`}
            target="_blank"
            rel="noreferrer"
            className="whatsapp-link"
          >
            <FaWhatsapp className="footer-icon" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>{info.copyrightText || `© ${new Date().getFullYear()} Swami Vivekanand Sen. Sec. School. All Rights Reserved.`}</p>
      </div>
    </footer>
  );
}

export default Footer;
