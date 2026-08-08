import { useState, useEffect } from "react";
import axios from "axios";
import "./Contact.css";

const API_BASE = "http://localhost:5000/api";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [schoolInfo, setSchoolInfo] = useState({
    schoolName: "Swami Vivekanand",
    tagline: "Sen. Sec. School",
    address: "Dansroli, Sikar, Raj.",
    phone: "+91 9829739603",
    email: "sitaram1985@gmail.com",
    googleMapsUrl: "https://maps.google.com/?q=Dansroli+Sikar+Rajasthan",
    officeHours: "Monday - Saturday: 08:00 AM - 03:00 PM"
  });

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await axios.get(`${API_BASE}/public/info`);
        if (res.data && res.data.data) {
          setSchoolInfo((prev) => ({ ...prev, ...res.data.data }));
        }
      } catch (err) {
        console.error("Error fetching contact info", err);
      }
    };
    fetchInfo();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setError("⚠️ Please fill all fields before submitting.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("⚠️ Please enter a valid email address.");
      return;
    }

    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="contact">
      <p className="contact-label">GET IN TOUCH</p>

      <h2>Contact Us</h2>

      <p className="contact-subtitle">
        Get in touch with our school for any inquiry.
      </p>

      <div className="contact-container">
        {/* LEFT SIDE */}
        <div className="contact-info">
          {/* ADDRESS */}
          <div className="info-box">
            <h3>Address / Location</h3>
            <a
              href={schoolInfo.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(schoolInfo.address || "Dansroli Sikar Rajasthan")}`}
              target="_blank"
              rel="noreferrer"
            >
              {schoolInfo.address || "Swami Vivekanand Sen. Sec. School, Dansroli, Sikar, Rajasthan"}
            </a>
          </div>

          {/* PHONE NUMBERS */}
          <div className="info-box">
            <h3>Contact Phone Numbers</h3>
            <a href={`tel:${schoolInfo.phone || "+919829739603"}`}>
              📞 {schoolInfo.phone || "+91 9829739603"}
            </a>
            {schoolInfo.admissionPhone2 && (
              <a href={`tel:${schoolInfo.admissionPhone2}`} style={{ marginTop: "4px", display: "block" }}>
                📞 {schoolInfo.admissionPhone2}
              </a>
            )}
          </div>

          {/* EMAIL */}
          <div className="info-box">
            <h3>Email Address</h3>
            <a href={`mailto:${schoolInfo.email || "sitaram1985@gmail.com"}`}>
              ✉️ {schoolInfo.email || "sitaram1985@gmail.com"}
            </a>
          </div>

          {/* OFFICE WORKING HOURS */}
          {schoolInfo.officeHours && (
            <div className="info-box">
              <h3>Office Working Hours</h3>
              <p style={{ margin: 0, color: "var(--primary-color)", fontWeight: "600" }}>
                ⏰ {schoolInfo.officeHours}
              </p>
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div>
          {submitted && (
            <div className="contact-success">
              ✅ Message sent successfully! We will get back to you soon.
            </div>
          )}

          {error && <div className="contact-error">{error}</div>}

          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;