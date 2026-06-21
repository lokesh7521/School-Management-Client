import { useState } from "react";
import "./Facilities.css";
import {
  FaLeaf,
  FaAtom,
  FaFlask,
  FaPalette,
  FaHome,
  FaBus,
  FaRunning,
  FaChalkboardTeacher,
  FaPlay
} from "react-icons/fa";

const facilitiesData = [
  {
    id: 1,
    title: "Biology Lab",
    desc: "Practical learning with modern biology equipment.",
    icon: <FaLeaf className="facility-icon" />,
    images: [
      "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=600&q=80"
    ],
    videos: [
      {
        url: "https://assets.mixkit.co/videos/preview/mixkit-science-laboratory-close-up-of-microscope-and-flasks-40343-large.mp4",
        poster: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=600&q=80",
        title: "Biology Microscope Setup & Slide Exam"
      }
    ]
  },
  {
    id: 2,
    title: "Physics Lab",
    desc: "Physics practicals with required instruments and experiments.",
    icon: <FaAtom className="facility-icon" />,
    images: [
      "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1534224039826-c7a0dea0e66a?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80"
    ],
    videos: [
      {
        url: "https://assets.mixkit.co/videos/preview/mixkit-science-laboratory-close-up-of-microscope-and-flasks-40343-large.mp4",
        poster: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=600&q=80",
        title: "Physics Mechanics & Optics Practice"
      }
    ]
  },
  {
    id: 3,
    title: "Chemistry Lab",
    desc: "Safe and advanced chemistry practical laboratory.",
    icon: <FaFlask className="facility-icon" />,
    images: [
      "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1511200181977-668ff74c5f36?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=600&q=80"
    ],
    videos: [
      {
        url: "https://assets.mixkit.co/videos/preview/mixkit-science-laboratory-close-up-of-microscope-and-flasks-40343-large.mp4",
        poster: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=600&q=80",
        title: "Chemistry Solutions & Titration Lab"
      }
    ]
  },
  {
    id: 4,
    title: "Arts Practical Room",
    desc: "Dedicated room for arts practical activities.",
    icon: <FaPalette className="facility-icon" />,
    images: [
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80"
    ],
    videos: [
      {
        url: "https://assets.mixkit.co/videos/preview/mixkit-children-painting-in-art-class-at-school-42296-large.mp4",
        poster: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80",
        title: "Arts & Crafts Painting Session"
      }
    ]
  },
  {
    id: 5,
    title: "Hostel Facility",
    desc: "Safe and comfortable hostel facility for students.",
    icon: <FaHome className="facility-icon" />,
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
    ],
    videos: [
      {
        url: "https://assets.mixkit.co/videos/preview/mixkit-kids-in-class-raising-hands-to-answer-teacher-42289-large.mp4",
        poster: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80",
        title: "Boarding House & Mess Tour"
      }
    ]
  },
  {
    id: 6,
    title: "Transport Facility",
    desc: "School buses available for nearby villages and areas.",
    icon: <FaBus className="facility-icon" />,
    images: [
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1464851707681-f9d5fdacccd8?auto=format&fit=crop&w=600&q=80"
    ],
    videos: [
      {
        url: "https://assets.mixkit.co/videos/preview/mixkit-kids-in-class-raising-hands-to-answer-teacher-42289-large.mp4",
        poster: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80",
        title: "School Bus Fleet Operations"
      }
    ]
  },
  {
    id: 7,
    title: "Sports Activities",
    desc: "Indoor and outdoor sports activities for students.",
    icon: <FaRunning className="facility-icon" />,
    images: [
      "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80"
    ],
    videos: [
      {
        url: "https://assets.mixkit.co/videos/preview/mixkit-boys-playing-football-on-sports-field-31718-large.mp4",
        poster: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=600&q=80",
        title: "Annual Sports Day Football Match"
      }
    ]
  },
  {
    id: 8,
    title: "Experienced Teachers",
    desc: "Qualified and experienced teaching staff.",
    icon: <FaChalkboardTeacher className="facility-icon" />,
    images: [
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1580894732444-8fecef2271ff?auto=format&fit=crop&w=600&q=80"
    ],
    videos: [
      {
        url: "https://assets.mixkit.co/videos/preview/mixkit-kids-in-class-raising-hands-to-answer-teacher-42289-large.mp4",
        poster: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
        title: "Interactive Smart Classroom Mentorship"
      }
    ]
  }
];

function Facilities() {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState("photos");
  const [lightboxImg, setLightboxImg] = useState(null);
  const [lightboxVideo, setLightboxVideo] = useState(null);

  const openModal = (facility) => {
    setSelectedFacility(facility);
    setModalTab("photos"); // Default to photos
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFacility(null);
    document.body.style.overflow = "unset"; // Restore scrolling
  };

  return (
    <section className="facilities" id="facilities">
      <p className="section-label">WHAT WE OFFER</p>
      <h2>Our Facilities</h2>
      <p className="facility-subtitle">
        We provide quality facilities for better education and development. Click on any facility to view photos & videos.
      </p>

      <div className="facility-container">
        {facilitiesData.map(fac => (
          <div
            className="facility-card"
            key={fac.id}
            onClick={() => openModal(fac)}
          >
            {fac.icon}
            <h3>{fac.title}</h3>
            <p>{fac.desc}</p>
            <span className="facility-hint">Click to view gallery ➔</span>
          </div>
        ))}
      </div>

      {/* GALLERY POPUP MODAL */}
      {isModalOpen && selectedFacility && (
        <div className="fac-modal-overlay" onClick={closeModal}>
          <div className="fac-modal-content" onClick={e => e.stopPropagation()}>
            <div className="fac-modal-header">
              <div>
                <h3>{selectedFacility.title} Gallery</h3>
                <p className="fac-modal-desc">{selectedFacility.desc}</p>
              </div>
              <button className="fac-modal-close" onClick={closeModal}>&times;</button>
            </div>

            {/* TAB SELECTORS */}
            <div className="fac-modal-tabs">
              <button
                className={`fac-modal-tab-btn ${modalTab === "photos" ? "active" : ""}`}
                onClick={() => setModalTab("photos")}
              >
                Photos
              </button>
              <button
                className={`fac-modal-tab-btn ${modalTab === "videos" ? "active" : ""}`}
                onClick={() => setModalTab("videos")}
              >
                Videos
              </button>
            </div>

            <div className="fac-modal-body">
              {modalTab === "photos" ? (
                <div className="fac-modal-gallery">
                  {selectedFacility.images.map((img, idx) => (
                    <div
                      className="fac-gallery-item"
                      key={idx}
                      onClick={() => setLightboxImg(img)}
                    >
                      <img
                        src={img}
                        alt={`${selectedFacility.title} ${idx + 1}`}
                        className="fac-gallery-img zoomable-img"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="fac-modal-videos">
                  {selectedFacility.videos && selectedFacility.videos.map((vid, idx) => (
                    <div
                      className="fac-video-item"
                      key={idx}
                      onClick={() => setLightboxVideo(vid.url)}
                    >
                      <div className="fac-video-thumbnail">
                        <img src={vid.poster} alt={vid.title} />
                        <div className="fac-video-play-overlay">
                          <FaPlay />
                        </div>
                      </div>
                      <span className="fac-video-title">{vid.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PHOTO LIGHTBOX */}
      {lightboxImg && (
        <div className="lightbox-overlay" onClick={() => setLightboxImg(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={lightboxImg} alt="Enlarged view" className="lightbox-img" />
            <button className="lightbox-close" onClick={() => setLightboxImg(null)}>&times;</button>
          </div>
        </div>
      )}

      {/* VIDEO LIGHTBOX */}
      {lightboxVideo && (
        <div className="lightbox-overlay" onClick={() => setLightboxVideo(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <video
              src={lightboxVideo}
              controls
              autoPlay
              className="lightbox-img"
              style={{ width: "100%", maxHeight: "85vh", outline: "none", background: "black" }}
            />
            <button className="lightbox-close" onClick={() => setLightboxVideo(null)}>&times;</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Facilities;