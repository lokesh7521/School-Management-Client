import { useState, useEffect } from "react";
import axios from "axios";
import "./Contact.css";

const API_BASE = "http://localhost:5000/api";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = formData;

    if (!name || !email || !phone || !message) {
      setError("⚠️ Please fill all fields before submitting.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("⚠️ Please enter a valid email address.");
      return;
    }

    if (phone.length < 10) {
      setError("⚠️ Please enter a valid 10-digit contact number.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${API_BASE}/public/contact`, formData);
      if (res.data && res.data.success) {
        setSubmitted(true);
        setSuccessMsg(res.data.message || "✅ Message sent successfully! We will get back to you soon.");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(res.data?.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setError(err.response?.data?.message || "Server error while sending message. Please try again.");
    } finally {
      setLoading(false);
    }
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
              {successMsg || "✅ Message sent successfully! We will get back to you soon."}
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
              disabled={loading}
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Your Contact / Mobile Number"
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              disabled={loading}
            ></textarea>

            <button type="submit" disabled={loading}>
              {loading ? "Sending Message..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );

}

export default Contact;