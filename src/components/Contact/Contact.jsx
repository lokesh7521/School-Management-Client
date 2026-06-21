import { useState } from "react";
import "./Contact.css";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

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

      <h2>
        Contact Us
      </h2>

      <p className="contact-subtitle">
        Get in touch with our school for any inquiry.
      </p>

      <div className="contact-container">

        {/* LEFT SIDE */}

        <div className="contact-info">

          {/* ADDRESS */}

          <div className="info-box">

            <h3>Address</h3>

            <a
              href="https://maps.google.com/?q=Swami+Vivekanand+Sen+Sec+School+Dansroli+Sikar+Rajasthan"
              target="_blank"
              rel="noreferrer"
            >
              Swami Vivekanand Sen. Sec. School,
              Dansroli, Sikar, Rajasthan,
              332742
            </a>

          </div>

          {/* MOBILE */}

          <div className="info-box">

            <h3>Mobile</h3>

            <a href="tel:+919829739603">
              +91 9829739603
            </a>

          </div>

          {/* EMAIL */}

          <div className="info-box">

            <h3>Email</h3>

            <a href="mailto:sitaramjetiwal1985@gmail.com">
              sitaramjetiwal1985@gmail.com
            </a>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div>

          {submitted && (
            <div className="contact-success">
              ✅ Message sent successfully! We will get back to you soon.
            </div>
          )}

          {error && (
            <div className="contact-error">
              {error}
            </div>
          )}

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

            <button type="submit">
              Send Message
            </button>

          </form>

        </div>

      </div>

    </section>

  );
}

export default Contact;