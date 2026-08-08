import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  FaMicroscope,
  FaPalette,
  FaChartBar,
  FaFlask,
  FaShieldAlt,
  FaTrophy,
  FaCheckCircle,
  FaArrowLeft,
  FaBook
} from "react-icons/fa";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./AcademicsPage.css";

const defaultAcademicsData = {
  science: {
    streamId: "science",
    title: "Science Stream (Grade 11 & 12)",
    subtitle: "Inquiry, Experimentation & Analytical Thinking",
    image: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=800&q=80",
    overview: "The Science Stream is designed to foster critical thinking, scientific inquiry, and a deep appreciation for the physical and biological world. Our curriculum balances rigorous theoretical coursework with extensive laboratory experimentation to prepare students for career pathways in engineering, medicine, research, computer science, and technology.",
    subjects: [
      { name: "Physics", details: "Theoretical and experimental physics covering mechanics, electromagnetism, optics, and modern physics." },
      { name: "Chemistry", details: "Inorganic, organic, and physical chemistry with hands-on lab experiments." },
      { name: "Biology", details: "Study of life, human physiology, plant biology, genetics, and biotechnology." },
      { name: "Mathematics", details: "Calculus, algebra, trigonometry, probability, and analytical geometry." },
      { name: "Computer Science", details: "Programming concepts, data structures, and database management." }
    ],
    highlights: [
      "Dedicated Physics, Chemistry, and Biology Laboratories",
      "Smart Classrooms with interactive 3D learning resources",
      "Regular visits to science exhibitions and research labs",
      "Weekly mock tests and progress tracker reports"
    ]
  },
  arts: {
    streamId: "arts",
    title: "Arts Stream (Grade 11 & 12)",
    subtitle: "Creativity, Culture & Social Science Studies",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
    overview: "The Humanities & Arts Stream provides a rich exploration of human culture, history, society, and creativity. We emphasize analytical writing, historical inquiry, geographic literacy, and artistic expression, preparing students for careers in civil services, law, journalism, design, literature, and social research.",
    subjects: [
      { name: "History", details: "World history, ancient civilizations, and modern Indian history." },
      { name: "Political Science", details: "Indian constitution, global politics, democracy, and governance models." },
      { name: "Geography", details: "Physical geography, human demographics, mapping, and spatial analysis." },
      { name: "Economics", details: "Microeconomics, macroeconomics, and Indian economic development." },
      { name: "Sanskrit / Fine Arts", details: "Classical language study, painting, sketch craft, and history of arts." }
    ],
    highlights: [
      "Creative arts practical studio and exhibition gallery",
      "Debate club, model united nations, and mock assemblies",
      "Regular field visits to historical museums and libraries",
      "Focus on analytical writing and social research methodology"
    ]
  },
  commerce: {
    streamId: "commerce",
    title: "Commerce Stream (Grade 11 & 12)",
    subtitle: "Finance, Administration & Entrepreneurship",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    overview: "The Commerce Stream introduces students to the principles of financial accounting, corporate management, trade economics, and entrepreneurship. We focus on real-world business case studies, practical bookkeeping exercises, and startup ideation to equip students for corporate, financial, or entrepreneurial ventures.",
    subjects: [
      { name: "Accountancy", details: "Double-entry bookkeeping, partnership accounts, and corporate financial statements." },
      { name: "Business Studies", details: "Principles of management, marketing, finance, and consumer protection." },
      { name: "Economics", details: "Economic policy analysis, statistics, and business economics." },
      { name: "Mathematics / IP", details: "Financial math, statistics, and digital information practices." }
    ],
    highlights: [
      "Annual Business Plan and Startup Pitch competition",
      "Mock Stock Market trading workshops and financial literacy sessions",
      "Interactive lectures from industry professionals and successful founders",
      "Focus on business analytics and professional case study solving"
    ]
  },
  practical: {
    streamId: "practical",
    title: "Practical Learning",
    subtitle: "Experiential Education & Real-World Application",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    overview: "We believe that learning is most impactful when it is active, practical, and experiential. Across all streams and grades, our curriculum incorporates laboratory projects, interactive smartboards, models, educational field trips, and project-based assignments to bridge the gap between classroom theory and real-world application.",
    subjects: [
      { name: "Laboratory Work", details: "Frequent science lab practicals starting from middle school." },
      { name: "Interactive Smart Boards", details: "Visual explanations using animation and video software." },
      { name: "Field Excursions", details: "Educational visits to industrial plants, botanical gardens, and science museums." },
      { name: "Project Exhibitions", details: "Annual science and arts exhibitions where students build working models." }
    ],
    highlights: [
      "Weekly practical sessions for science and arts classes",
      "Well-equipped computer labs with internet access",
      "Project-based assessment formats to evaluate analytical skills",
      "Collaborative group project workshops"
    ]
  },
  discipline: {
    streamId: "discipline",
    title: "Discipline & Moral Values",
    subtitle: "Character Building & Swami Vivekananda's Teachings",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=800&q=80",
    overview: "Swami Vivekanand Sen. Sec. School is committed to nurturing not just intellectual minds, but responsible, ethical, and empathetic citizens. Our moral value curriculum is inspired by Swami Vivekananda's teachings on character, resilience, self-discipline, and community service. We foster a respectful, structured, and compassionate environment.",
    subjects: [
      { name: "Ethical Leadership", details: "Interactive discussions on values, integrity, and social responsibility." },
      { name: "Morning Reflection", details: "Assembly programs focused on moral insights and motivational talks." },
      { name: "Community Service", details: "Social drives, environmental awareness, and helping nearby communities." },
      { name: "Peer Mentorship", details: "Senior students assisting juniors, promoting unity and mutual respect." }
    ],
    highlights: [
      "Eco-Club initiatives for clean campus and tree plantations",
      "Charity drives and local community outreach events",
      "Code of conduct emphasizing punctuality, clean uniform, and polite language",
      "Special talks by community leaders on ethics and moral values"
    ]
  },
  competitive: {
    streamId: "competitive",
    title: "Competitive Preparation",
    subtitle: "Coaching for National Entrance Exams & Career Success",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    overview: "To support our students' career aspirations, we provide integrated preparation classes for national competitive examinations. Under the guidance of experienced coaches, we run dedicated foundation batches and mock test series to build confidence and conceptual clarity for advanced entrance tests.",
    subjects: [
      { name: "Engineering (JEE)", details: "Integrated Physics, Chemistry, and Mathematics tutoring for JEE Mains & Advanced." },
      { name: "Medical (NEET)", details: "Comprehensive Biology, Chemistry, and Physics coaching for medical entrance." },
      { name: "Olympiads & NTSE", details: "Mental ability and advanced science/math classes for junior classes." },
      { name: "Commerce (CA Foundation)", details: "Economics, accounting, and commercial law fundamentals for finance exams." }
    ],
    highlights: [
      "Experienced faculty specializing in competitive exam patterns",
      "Comprehensive study material and topic-wise test papers",
      "Weekly computer-based mock tests simulating official exam environments",
      "Individual doubt-solving desks and counseling sessions"
    ]
  }
};

const getStreamIcon = (streamId) => {
  switch (streamId) {
    case "science":
      return <FaMicroscope className="ap-icon" />;
    case "arts":
      return <FaPalette className="ap-icon" />;
    case "commerce":
      return <FaChartBar className="ap-icon" />;
    case "practical":
      return <FaFlask className="ap-icon" />;
    case "discipline":
      return <FaShieldAlt className="ap-icon" />;
    case "competitive":
      return <FaTrophy className="ap-icon" />;
    default:
      return <FaBook className="ap-icon" />;
  }
};

function AcademicsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [academicsMap, setAcademicsMap] = useState(defaultAcademicsData);
  const [programList, setProgramList] = useState([]);
  
  const initialStream = searchParams.get("stream") || "science";
  const [activeStream, setActiveStream] = useState(initialStream);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/public/academics")
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
          setProgramList(res.data.data);
          const map = {};
          res.data.data.forEach((item) => {
            map[item.streamId] = item;
          });
          setAcademicsMap(map);
        }
      })
      .catch((err) => {
        console.log("Error fetching academics data", err);
      });
  }, []);

  useEffect(() => {
    const stream = searchParams.get("stream");
    if (stream && (academicsMap[stream] || programList.some(p => p.streamId === stream))) {
      setActiveStream(stream);
    }
  }, [searchParams, academicsMap, programList]);

  const handleStreamChange = (streamId) => {
    setActiveStream(streamId);
    setSearchParams({ stream: streamId });
  };

  const currentProgramKeys = programList.length > 0
    ? programList.map((p) => p.streamId)
    : Object.keys(academicsMap);

  const streamInfo = academicsMap[activeStream] || programList[0] || academicsMap.science;

  return (
    <div className="ap-page">
      {/* Main Navbar */}
      <Navbar />

      <div className="ap-content">
        {/* PAGE HEADING */}
        <div className="ap-page-heading">
          <div className="ap-heading-main">
            <FaTrophy className="ap-heading-icon" />
            <div className="ap-heading-text">
              <h1 className="ap-heading-title">Academics</h1>
              <p className="ap-heading-sub">Swami Vivekanand Sen. Sec. School — Educational Programs & Streams</p>
            </div>
          </div>
          <button className="ap-heading-back-btn" onClick={() => navigate("/#academics")}>
            <FaArrowLeft /> Back
          </button>
        </div>

        <div className="ap-layout">
          {/* SIDEBAR NAVIGATION */}
          <div className="ap-sidebar">
            <h3>Academic Programs</h3>
            <div className="ap-nav-list">
              {currentProgramKeys.map((key) => {
                const prog = academicsMap[key] || programList.find((p) => p.streamId === key);
                const title = prog?.title || key;
                return (
                  <button
                    key={key}
                    className={`ap-nav-item ${activeStream === key ? "active" : ""}`}
                    onClick={() => handleStreamChange(key)}
                  >
                    {getStreamIcon(key)} {title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STREAM DETAILS PANEL */}
          <div className="ap-details-panel">
            {/* HERO BANNER */}
            <div className="ap-hero-banner">
              <img src={streamInfo.image} alt={streamInfo.title} className="ap-hero-img" />
              <div className="ap-hero-overlay">
                <div className="ap-hero-header">
                  {getStreamIcon(streamInfo.streamId)}
                  <div>
                    <h2>{streamInfo.title}</h2>
                    <p>{streamInfo.subtitle}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="ap-section card-style">
              <h3>Overview</h3>
              <p className="ap-overview-text">{streamInfo.overview}</p>
            </div>

            <div className="ap-grid-two">
              {/* SUBJECTS CHART */}
              <div className="ap-section card-style">
                <h3>Curriculum & Subjects</h3>
                <div className="ap-subjects-list">
                  {streamInfo.subjects && streamInfo.subjects.length > 0 ? (
                    streamInfo.subjects.map((sub, idx) => (
                      <div className="ap-subject-row" key={idx}>
                        <strong>{sub.name}</strong>
                        <p>{sub.details}</p>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: "#64748b" }}>No subjects specified.</p>
                  )}
                </div>
              </div>

              {/* PROGRAM HIGHLIGHTS */}
              <div className="ap-section card-style highlight-section">
                <h3>Program Highlights</h3>
                <ul className="ap-highlights-list">
                  {streamInfo.highlights && streamInfo.highlights.length > 0 ? (
                    streamInfo.highlights.map((high, idx) => (
                      <li key={idx}>
                        <FaCheckCircle className="check-icon" />
                        <span>{high}</span>
                      </li>
                    ))
                  ) : (
                    <li style={{ color: "#64748b" }}>No highlights specified.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AcademicsPage;
