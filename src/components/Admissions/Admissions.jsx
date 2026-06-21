import { useState } from "react";
import "./Admissions.css";

function Admissions() {

  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    className: "",
    mobile: "",
    address: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { studentName, parentName, className, mobile, address } = formData;

    if (!studentName || !parentName || !className || !mobile || !address) {
      setError("⚠️ Please fill all fields before submitting.");
      return;
    }

    if (mobile.length < 10) {
      setError("⚠️ Please enter a valid 10-digit mobile number.");
      return;
    }

    setSubmitted(true);
    setFormData({ studentName: "", parentName: "", className: "", mobile: "", address: "" });

    setTimeout(() => setSubmitted(false), 4000);
  };

  return (

    <section className="admissions">

      <p className="admission-label">APPLY NOW</p>

      <h2>
        Admission Open
      </h2>

      <p className="admission-subtitle">
        Fill the form below for admission inquiry.
      </p>

      {submitted && (
        <div className="admission-success">
          ✅ Form submitted successfully! We will contact you soon.
        </div>
      )}

      {error && (
        <div className="admission-error">
          {error}
        </div>
      )}

      <form className="admission-form" onSubmit={handleSubmit}>

        <input
          type="text"
          name="studentName"
          placeholder="Student Name"
          value={formData.studentName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="parentName"
          placeholder="Parent / Guardian Name"
          value={formData.parentName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="className"
          placeholder="Class (e.g. Class 9)"
          value={formData.className}
          onChange={handleChange}
        />

        <input
          type="number"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        ></textarea>

        <button type="submit">
          Submit Admission Form
        </button>

      </form>

    </section>

  );
}

export default Admissions;