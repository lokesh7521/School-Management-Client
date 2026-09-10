import { useState, useEffect } from "react";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaSchool,
  FaBus,
  FaEnvelope,
  FaPhoneAlt
} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { classData, teachers, classrooms, buses } from "../../data/schoolData";
import "./About.css";

const defaultAboutInfo = {
  aboutBadge: "ABOUT OUR SCHOOL",
  aboutTitle: "Swami Vivekanand Sen. Sec. School",
  aboutText: "Our school provides quality education with experienced teachers, hostel facility, transport system, science laboratories, arts practical labs and classrooms.",
  aboutParagraph2: "We focus on discipline, knowledge, moral values and overall development of every student.",
  director: {
    name: "Shri Sita Ram Kumawat",
    title: "Founder & Director",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80",
    quote: '"Holistic development is the cornerstone of progress. We prepare students for lifelong learning and success."',
    email: "director@svschool.com",
    phone: "+91 9829011111",
    qualification: "B.Tech, MBA (Ed. Management)",
    experience: "20+ Years in Educational Administration",
    message1: "Welcome to Swami Vivekanand Sen. Sec. School. As the founder and director, my vision has always been to create a learning hub that merges rich traditional values with state-of-the-art modern educational infrastructure.",
    message2: "We believe that every student has unique talents waiting to be nurtured. Our focus is on providing a safe, clean, and interactive environment—complete with advanced science laboratories, creative art practical spaces, comfortable residential boarding, and reliable bus services.",
    message3: "We strive to foster discipline, moral values, and academic excellence, equipping our students to take on the challenges of a competitive global environment with confidence and social responsibility."
  },
  principal: {
    name: "Dr. Mahaveer Shamota",
    title: "School Principal",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80",
    quote: '"Education is about discovering potential. We provide smart tools and supportive mentorship to make every child shine."',
    email: "principal@svschool.com",
    phone: "+91 9800000019",
    qualification: "M.A, M.Ed, Ph.D in Education",
    experience: "25 Years of Academic Mentorship",
    message1: "Education is not the filling of a vessel, but the kindling of a flame. Our mission at Swami Vivekanand School is to create an inspiring space where curiosity is sparked and intellect is shaped.",
    message2: "With a team of highly qualified and experienced teachers, we emphasize personalized classroom guidance, active smartboard lessons, and practical science/arts exercises to bring concepts to life.",
    message3: "Furthermore, our integrated competitive coaching batches (JEE, NEET, Olympiads) ensure that senior school students get the best guidance to succeed in career-defining entrance examinations, while maintaining high moral values."
  }
};

function About() {
  const [aboutData, setAboutData] = useState(defaultAboutInfo);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [isLeaderModalOpen, setIsLeaderModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/public/info")
      .then((res) => {
        if (res.data.success && res.data.data) {
          const fetched = res.data.data;
          setAboutData({
            aboutBadge: fetched.aboutBadge || defaultAboutInfo.aboutBadge,
            aboutTitle: fetched.aboutTitle || fetched.schoolName || defaultAboutInfo.aboutTitle,
            aboutText: fetched.aboutText || defaultAboutInfo.aboutText,
            aboutParagraph2: fetched.aboutParagraph2 || defaultAboutInfo.aboutParagraph2,
            director: {
              name: fetched.director?.name || defaultAboutInfo.director.name,
              title: fetched.director?.title || defaultAboutInfo.director.title,
              image: fetched.director?.image || defaultAboutInfo.director.image,
              quote: fetched.director?.quote || defaultAboutInfo.director.quote,
              email: fetched.director?.email || defaultAboutInfo.director.email,
              phone: fetched.director?.phone || defaultAboutInfo.director.phone,
              qualification: fetched.director?.qualification || defaultAboutInfo.director.qualification,
              experience: fetched.director?.experience || defaultAboutInfo.director.experience,
              message1: fetched.director?.message1 || defaultAboutInfo.director.message1,
              message2: fetched.director?.message2 || defaultAboutInfo.director.message2,
              message3: fetched.director?.message3 || defaultAboutInfo.director.message3
            },
            principal: {
              name: fetched.principal?.name || defaultAboutInfo.principal.name,
              title: fetched.principal?.title || defaultAboutInfo.principal.title,
              image: fetched.principal?.image || defaultAboutInfo.principal.image,
              quote: fetched.principal?.quote || defaultAboutInfo.principal.quote,
              email: fetched.principal?.email || defaultAboutInfo.principal.email,
              phone: fetched.principal?.phone || defaultAboutInfo.principal.phone,
              qualification: fetched.principal?.qualification || defaultAboutInfo.principal.qualification,
              experience: fetched.principal?.experience || defaultAboutInfo.principal.experience,
              message1: fetched.principal?.message1 || defaultAboutInfo.principal.message1,
              message2: fetched.principal?.message2 || defaultAboutInfo.principal.message2,
              message3: fetched.principal?.message3 || defaultAboutInfo.principal.message3
            }
          });
        }
      })
      .catch((err) => {
        console.log("Error fetching about info", err);
      });
  }, []);

  const scrollToAcademics = () => {
    const target = document.getElementById("academics");
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
  };

  const openLeaderModal = (leaderType) => {
    const leader = aboutData[leaderType];
    setSelectedLeader(leader);
    setIsLeaderModalOpen(true);
    document.body.classList.add("modal-open");
    document.documentElement.classList.add("modal-open");
  };

  const closeLeaderModal = () => {
    setIsLeaderModalOpen(false);
    setSelectedLeader(null);
    document.body.classList.remove("modal-open");
    document.documentElement.classList.remove("modal-open");
  };

  const totalStudents = classData.reduce((sum, c) => sum + c.students, 0);
  const totalTeachers = teachers.length;
  const totalClassrooms = classrooms.length;
  const totalBuses = buses.length;

  return (
    <section className="about" id="about">
      {/* ABOUT CONTAINER */}
      <div className="about-container">
        {/* LEFT SIDE */}
        <div className="about-left">
          <h4>{aboutData.aboutBadge}</h4>
          <h2>{aboutData.aboutTitle}</h2>
          <p>{aboutData.aboutText}</p>
          {aboutData.aboutParagraph2 && <p>{aboutData.aboutParagraph2}</p>}
          <button onClick={scrollToAcademics}>
            Read More
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="about-right">
          {/* STUDENTS BOX */}
          <Link to="/students-by-class?from=about" className="about-box about-box-link">
            <FaUserGraduate className="about-icon" />
            <h3>{totalStudents}</h3>
            <p>Students</p>
            <span className="about-box-hint">View Class-wise ↗</span>
          </Link>

          {/* TEACHERS BOX */}
          <Link to="/teachers?from=about" className="about-box about-box-link">
            <FaChalkboardTeacher className="about-icon" />
            <h3>{totalTeachers}</h3>
            <p>Teachers</p>
            <span className="about-box-hint">View Staff ↗</span>
          </Link>

          {/* CLASSROOMS BOX */}
          <Link to="/classrooms?from=about" className="about-box about-box-link">
            <FaSchool className="about-icon" />
            <h3>{totalClassrooms}</h3>
            <p>Classrooms</p>
            <span className="about-box-hint">View Rooms ↗</span>
          </Link>

          {/* BUSES BOX */}
          <Link to="/buses?from=about" className="about-box about-box-link">
            <FaBus className="about-icon" />
            <h3>{totalBuses}</h3>
            <p>Buses</p>
            <span className="about-box-hint">View Routes ↗</span>
          </Link>
        </div>
      </div>

      {/* LEADERSHIP SECTION */}
      <div className="leadership-section">
        <p className="section-label">SCHOOL LEADERSHIP</p>
        <h2>Messages from Management</h2>

        <div className="leadership-container">
          {/* DIRECTOR CARD */}
          <div className="leader-card">
            <div className="leader-image-wrap">
              <img src={aboutData.director.image} alt={aboutData.director.name} />
            </div>
            <div className="leader-info">
              <span className="leader-badge">{aboutData.director.title}</span>
              <h3>{aboutData.director.name}</h3>
              <p className="leader-quote">
                {aboutData.director.quote}
              </p>
              <div className="leader-contact">
                <a href={`mailto:${aboutData.director.email}`} className="contact-item">
                  <FaEnvelope className="contact-icon" />
                  <span>{aboutData.director.email}</span>
                </a>
                <a href={`tel:${aboutData.director.phone}`} className="contact-item">
                  <FaPhoneAlt className="contact-icon" />
                  <span>{aboutData.director.phone}</span>
                </a>
              </div>
              <button className="leader-btn" onClick={() => openLeaderModal("director")}>
                Read Message Desk ➔
              </button>
            </div>
          </div>

          {/* PRINCIPAL CARD */}
          <div className="leader-card">
            <div className="leader-image-wrap">
              <img src={aboutData.principal.image} alt={aboutData.principal.name} />
            </div>
            <div className="leader-info">
              <span className="leader-badge">{aboutData.principal.title}</span>
              <h3>{aboutData.principal.name}</h3>
              <p className="leader-quote">
                {aboutData.principal.quote}
              </p>
              <div className="leader-contact">
                <a href={`mailto:${aboutData.principal.email}`} className="contact-item">
                  <FaEnvelope className="contact-icon" />
                  <span>{aboutData.principal.email}</span>
                </a>
                <a href={`tel:${aboutData.principal.phone}`} className="contact-item">
                  <FaPhoneAlt className="contact-icon" />
                  <span>{aboutData.principal.phone}</span>
                </a>
              </div>
              <button className="leader-btn" onClick={() => openLeaderModal("principal")}>
                Read Message Desk ➔
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* LEADERSHIP DETAILS MODAL */}
      {isLeaderModalOpen && selectedLeader && (
        <div className="leader-modal-overlay" onClick={closeLeaderModal}>
          <div className="leader-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="leader-modal-header">
              <div className="leader-modal-header-profile">
                <img src={selectedLeader.image} alt={selectedLeader.name} className="leader-modal-avatar" />
                <div>
                  <h3>{selectedLeader.name}</h3>
                  <p className="leader-modal-title">{selectedLeader.title}</p>
                </div>
              </div>
              <button className="leader-modal-close" onClick={closeLeaderModal}>&times;</button>
            </div>

            <div className="leader-modal-body">
              <div className="leader-modal-meta">
                <div className="meta-block">
                  <strong>Qualifications:</strong>
                  <span>{selectedLeader.qualification}</span>
                </div>
                <div className="meta-block">
                  <strong>Experience:</strong>
                  <span>{selectedLeader.experience}</span>
                </div>
                <div className="meta-block">
                  <strong>Email:</strong>
                  <a href={`mailto:${selectedLeader.email}`}>{selectedLeader.email}</a>
                </div>
                <div className="meta-block">
                  <strong>Contact:</strong>
                  <a href={`tel:${selectedLeader.phone}`}>{selectedLeader.phone}</a>
                </div>
              </div>

              <div className="leader-modal-message">
                <h4>Message Desk</h4>
                {selectedLeader.message1 && <p>{selectedLeader.message1}</p>}
                {selectedLeader.message2 && <p>{selectedLeader.message2}</p>}
                {selectedLeader.message3 && <p>{selectedLeader.message3}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default About;
