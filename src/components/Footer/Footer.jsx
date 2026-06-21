import { Link } from "react-router-dom";
import "./Footer.css";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaWhatsapp
} from "react-icons/fa";

function Footer() {

  return (

    <footer className="footer">

      <div className="footer-container">

        {/* LEFT */}

        <div className="footer-box">

          <h2>
            Swami Vivekanand Sen. Sec. School
          </h2>

          <p>
            Quality education with discipline,
            moral values and practical learning.
          </p>

          {/* SOCIAL ICONS */}

          <div className="social-icons">

            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook />
            </a>

            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>

            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <FaYoutube />
            </a>

          </div>

        </div>

        {/* QUICK LINKS */}

        <div className="footer-box">

          <h3>
            Quick Links
          </h3>

          <ul>

            <li>
              <Link to="/#home">
                Home
              </Link>
            </li>

            <li>
              <Link to="/#about">
                About
              </Link>
            </li>

            <li>
              <Link to="/#academics">
                Academics
              </Link>
            </li>

            <li>
              <Link to="/#admissions">
                Admissions
              </Link>
            </li>

            <li>
              <Link to="/#contact">
                Contact
              </Link>
            </li>

          </ul>

        </div>

        {/* CONTACT */}

        <div className="footer-box">

          <h3>
            Contact Us
          </h3>

          {/* ADDRESS */}

          <a
            href="https://maps.google.com/?q=Swami+Vivekanand+Sen+Sec+School+Dansroli+Sikar"
            target="_blank"
            rel="noreferrer"
          >
            <FaMapMarkerAlt className="footer-icon" />
            <span>Dansroli, Sikar, Rajasthan</span>
          </a>

          {/* PHONE */}

          <a href="tel:+919829739603">
            <FaPhoneAlt className="footer-icon" />
            <span>+91 9829739603</span>
          </a>

          {/* EMAIL */}

          <a href="mailto:sitaramjetiwal1985@gmail.com">
            <FaEnvelope className="footer-icon" />
            <span>sitaramjetiwal1985@gmail.com</span>
          </a>

          {/* WHATSAPP */}

          <a
            href="https://wa.me/919829739603"
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

        <p>
          © 2026 Swami Vivekanand Sen. Sec. School.
          All Rights Reserved.
        </p>

      </div>

    </footer>

  );
}

export default Footer;
