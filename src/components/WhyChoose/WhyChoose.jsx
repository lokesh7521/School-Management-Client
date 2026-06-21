import { useState } from "react";
import { Link } from "react-router-dom";
import "./WhyChoose.css";
import {
  FaChalkboardTeacher,
  FaMicroscope,
  FaPalette,
  FaRunning,
  FaHome,
  FaBus,
  FaCamera
} from "react-icons/fa";

const whyChooseData = [
  {
    id: 1,
    title: "Experienced Teachers",
    desc: "Qualified and experienced teachers for better learning.",
    iconType: "teacher",
    images: [
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80"
    ],
    videos: [
      "https://assets.mixkit.co/videos/preview/mixkit-kids-in-class-raising-hands-to-answer-teacher-42289-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-teacher-explaining-a-topic-on-a-chalkboard-to-her-students-42291-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-woman-teacher-writing-math-formulas-on-blackboard-42295-large.mp4"
    ],
    details: "Our school takes pride in its team of 20 highly qualified and experienced teachers. They are dedicated to delivering academic excellence, character building, and individual mentoring.",
    features: ["Experienced Subject Mentors", "Interactive Smart Classes", "Regular Parents-Teacher Meets", "Personalized Counseling Programs"],
    link: "/teachers",
    linkLabel: "View All Teachers"
  },
  {
    id: 2,
    title: "Science Laboratories",
    desc: "Physics, Chemistry and Biology practical labs available.",
    iconType: "microscope",
    images: [
      "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=600&q=80"
    ],
    videos: [
      "https://assets.mixkit.co/videos/preview/mixkit-science-laboratory-close-up-of-microscope-and-flasks-40343-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-microscope-close-up-in-lab-40342-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-chemical-reaction-in-flasks-40344-large.mp4"
    ],
    details: "Our science laboratories are state-of-the-art facilities equipped with modern instruments, safety guidelines, and qualified lab assistants to help students explore physics, chemistry, and biology practically.",
    features: ["Fully Equipped Physics & Chemistry Labs", "Advanced Biology Specimens & Microscopes", "Individual Workspaces & Safety Kits", "Experienced Lab Instructors"],
    link: "/classrooms?type=Lab",
    linkLabel: "Explore Laboratories"
  },
  {
    id: 3,
    title: "Arts Practical Room",
    desc: "Dedicated room for arts practical activities.",
    iconType: "palette",
    images: [
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80"
    ],
    videos: [
      "https://assets.mixkit.co/videos/preview/mixkit-children-painting-in-art-class-at-school-42296-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-little-girl-painting-with-watercolors-at-school-42301-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-children-hands-painting-with-brush-42300-large.mp4"
    ],
    details: "A creative haven for young artists. In our Arts Practical Room, students are encouraged to express themselves through drawing, painting, canvas sketching, pottery, sculpting, and handcrafts under expert mentorship.",
    features: ["Professional Easels & Canvases", "All Painting & Sketching Supplies provided", "Exhibition Area for Student Masterpieces", "Regular Inter-School Art Competitions"],
    link: "/classrooms?type=Practical",
    linkLabel: "Explore Arts Room"
  },
  {
    id: 4,
    title: "Sports Activities",
    desc: "Indoor and outdoor sports for students fitness.",
    iconType: "running",
    images: [
      "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80"
    ],
    videos: [
      "https://assets.mixkit.co/videos/preview/mixkit-boys-playing-football-on-sports-field-31718-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-children-running-a-race-on-a-sports-day-track-42316-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-happy-kids-playing-tag-in-a-sunny-park-42315-large.mp4"
    ],
    details: "Physical health and mental stamina are crucial. Our school offers a comprehensive physical education curriculum featuring indoor and outdoor sports facilities, team training, and annual sports events.",
    features: ["Full-sized Football & Cricket ground", "Basketball & Badminton courts", "Indoor Sports room for Chess & Table Tennis", "Professional sports coaching & drills"],
    link: null,
    linkLabel: null
  },
  {
    id: 5,
    title: "Hostel Facility",
    desc: "Safe and comfortable hostel environment.",
    iconType: "home",
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
    ],
    videos: [
      "https://assets.mixkit.co/videos/preview/mixkit-children-reading-books-together-in-library-42307-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-students-sitting-on-campus-lawn-studying-42312-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-students-walking-out-of-a-school-building-42311-large.mp4"
    ],
    details: "We provide a 'home away from home' for our boarding students. The hostel is equipped with spacious, clean, and well-ventilated rooms, dynamic recreational areas, a hygienic mess, and 24/7 security.",
    features: ["Hygienic Mess serving nutritious vegetarian meals", "Dedicated daily study hours under teacher guidance", "24/7 security, CCTV monitoring & medical checkups", "Warden & supportive boarding staff supervision"],
    link: null,
    linkLabel: null
  },
  {
    id: 6,
    title: "Transport Facility",
    desc: "School buses available in nearby villages and areas.",
    iconType: "bus",
    images: [
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1464851707681-f9d5fdacccd8?auto=format&fit=crop&w=600&q=80"
    ],
    videos: [
      "https://assets.mixkit.co/videos/preview/mixkit-students-walking-out-of-a-school-building-42311-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-students-sitting-on-campus-lawn-studying-42312-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-children-reading-books-together-in-library-42307-large.mp4"
    ],
    details: "Our transport facility ensures safe and punctual transit for students residing in nearby villages and cities. Our fleet of modern buses is run by experienced, background-verified drivers and monitors.",
    features: ["GPS tracked vehicles with real-time updates", "Dedicated female conductors & student attendants", "Coverage across all major town areas & stops", "First-aid kits, speed governors & emergency exit equipped"],
    link: "/buses",
    linkLabel: "View Bus Routes"
  }
];
function WhyChoose() {
  const [selectedStrength, setSelectedStrength] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);

  const openModal = (strength) => {
    setSelectedStrength(strength);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStrength(null);
    document.body.style.overflow = "unset"; // Restore background scroll
  };

  const getIcon = (type) => {
    switch (type) {
      case "teacher": return <FaChalkboardTeacher className="why-icon" />;
      case "microscope": return <FaMicroscope className="why-icon" />;
      case "palette": return <FaPalette className="why-icon" />;
      case "running": return <FaRunning className="why-icon" />;
      case "home": return <FaHome className="why-icon" />;
      case "bus": return <FaBus className="why-icon" />;
      default: return null;
    }
  };

  return (
    <section className="whychoose" id="whychoose">
      <p className="section-label">OUR STRENGTHS</p>
      <h2>Why Choose Our School</h2>
      <p className="why-subtitle">
        We focus on quality education, discipline and overall student development. Click on any card to view photos and details.
      </p>

      <div className="why-container">
        {whyChooseData.map(fac => (
          <div
            className="why-card"
            key={fac.id}
            onClick={() => openModal(fac)}
          >
            {getIcon(fac.iconType)}
            <h3>{fac.title}</h3>
            <p>{fac.desc}</p>
            <span className="why-card-hint">Click to learn more ➔</span>
          </div>
        ))}
      </div>

      {/* DETAILS POPUP MODAL */}
      {isModalOpen && selectedStrength && (
        <div className="why-modal-overlay" onClick={closeModal}>
          <div className="why-modal-content" onClick={e => e.stopPropagation()}>
            <div className="why-modal-header">
              <div>
                <h3>{selectedStrength.title}</h3>
                <p className="why-modal-desc">{selectedStrength.desc}</p>
              </div>
              <button className="why-modal-close" onClick={closeModal}>&times;</button>
            </div>

            <div className="why-modal-body">
              {/* MEDIA SECTION */}
              <div className="why-modal-media-section">
                <div className="why-modal-tab-content">
                  <div className="why-modal-gallery">
                    {selectedStrength.images.map((img, idx) => (
                      <div
                        className="why-gallery-item"
                        key={idx}
                        onClick={() => setLightboxImg(img)}
                      >
                        <img
                          src={img}
                          alt={`${selectedStrength.title} ${idx + 1}`}
                          className="why-gallery-img zoomable-img"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* DETAILS AND FEATURES */}
              <div className="why-modal-info">
                <h4>Overview</h4>
                <p className="why-info-text">{selectedStrength.details}</p>

                <h4>Key Highlights</h4>
                <ul className="why-features-list">
                  {selectedStrength.features.map((feat, idx) => (
                    <li key={idx}>✔ {feat}</li>
                  ))}
                </ul>

                {selectedStrength.link && (
                  <div className="why-action-container">
                    <Link
                      to={
                        selectedStrength.link.includes("?")
                          ? `${selectedStrength.link}&from=whychoose`
                          : `${selectedStrength.link}?from=whychoose`
                      }
                      className="why-action-btn"
                      onClick={closeModal}
                    >
                      {selectedStrength.linkLabel} ➔
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX FOR INDIVIDUAL IMAGE */}
      {lightboxImg && (
        <div className="lightbox-overlay" onClick={() => setLightboxImg(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={lightboxImg} alt="Enlarged view" className="lightbox-img" />
            <button className="lightbox-close" onClick={() => setLightboxImg(null)}>&times;</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default WhyChoose;