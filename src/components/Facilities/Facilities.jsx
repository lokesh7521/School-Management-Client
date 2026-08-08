import { useState, useEffect } from "react";
import axios from "axios";
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
    iconType: "leaf",
    images: [
      "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=600&q=80"
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-science-laboratory-close-up-of-microscope-and-flasks-40343-large.mp4",
    videoTitle: "Biology Microscope Setup & Slide Exam"
  },
  {
    id: 2,
    title: "Physics Lab",
    desc: "Physics practicals with required instruments and experiments.",
    iconType: "atom",
    images: [
      "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1534224039826-c7a0dea0e66a?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80"
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-science-laboratory-close-up-of-microscope-and-flasks-40343-large.mp4",
    videoTitle: "Physics Mechanics & Optics Practice"
  },
  {
    id: 3,
    title: "Chemistry Lab",
    desc: "Safe and advanced chemistry practical laboratory.",
    iconType: "flask",
    images: [
      "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1511200181977-668ff74c5f36?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&w=600&q=80"
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-science-laboratory-close-up-of-microscope-and-flasks-40343-large.mp4",
    videoTitle: "Chemistry Solutions & Titration Lab"
  },
  {
    id: 4,
    title: "Arts Practical Room",
    desc: "Dedicated room for arts practical activities.",
    iconType: "palette",
    images: [
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=600&q=80"
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-children-painting-in-art-class-at-school-42296-large.mp4",
    videoTitle: "Arts & Crafts Painting Session"
  },
  {
    id: 5,
    title: "Hostel Facility",
    desc: "Safe and comfortable hostel facility for students.",
    iconType: "home",
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80"
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-kids-in-class-raising-hands-to-answer-teacher-42289-large.mp4",
    videoTitle: "Boarding House & Mess Tour"
  },
  {
    id: 6,
    title: "Transport Facility",
    desc: "School buses available for nearby villages and areas.",
    iconType: "bus",
    images: [
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=600&q=80"
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-kids-in-class-raising-hands-to-answer-teacher-42289-large.mp4",
    videoTitle: "School Bus Fleet Operations"
  },
  {
    id: 7,
    title: "Sports Activities",
    desc: "Indoor and outdoor sports activities for students.",
    iconType: "running",
    images: [
      "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80"
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-boys-playing-football-on-sports-field-31718-large.mp4",
    videoTitle: "Annual Sports Day Football Match"
  },
  {
    id: 8,
    title: "Experienced Teachers",
    desc: "Qualified and experienced teaching staff.",
    iconType: "teacher",
    images: [
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80"
    ],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-kids-in-class-raising-hands-to-answer-teacher-42289-large.mp4",
    videoTitle: "Interactive Smart Classroom Mentorship"
  }
];

const getEmbedVideoUrl = (url) => {
  if (!url) return "";
  const str = url.trim();
  if (str.includes("youtube.com/watch")) {
    const match = str.match(/[?&]v=([^&]+)/);
    if (match && match[1]) return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
  }
  if (str.includes("youtu.be/")) {
    const id = str.split("youtu.be/")[1]?.split("?")[0]?.split("&")[0];
    if (id) return `https://www.youtube.com/embed/${id}?autoplay=1`;
  }
  if (str.includes("youtube.com/shorts/")) {
    const id = str.split("youtube.com/shorts/")[1]?.split("?")[0]?.split("&")[0];
    if (id) return `https://www.youtube.com/embed/${id}?autoplay=1`;
  }
  if (str.includes("youtube.com/embed/")) {
    return str.includes("autoplay=1") ? str : `${str}?autoplay=1`;
  }
  if (str.includes("vimeo.com/")) {
    const id = str.split("vimeo.com/")[1]?.split("?")[0];
    if (id) return `https://player.vimeo.com/video/${id}?autoplay=1`;
  }
  return str;
};

const isEmbedVideoUrl = (url) => {
  if (!url) return false;
  return url.includes("youtube.com") || url.includes("youtu.be") || url.includes("vimeo.com");
};

const getVideoThumbnail = (video, fallbackImg) => {
  if (video.poster) return video.poster;
  if (video.posterUrl) return video.posterUrl;
  const url = video.url || "";
  if (url.includes("youtube.com/watch")) {
    const match = url.match(/[?&]v=([^&]+)/);
    if (match && match[1]) return `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`;
  }
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split("?")[0]?.split("&")[0];
    if (id) return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
  }
  if (url.includes("youtube.com/shorts/")) {
    const id = url.split("youtube.com/shorts/")[1]?.split("?")[0]?.split("&")[0];
    if (id) return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
  }
  return fallbackImg || "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=600&q=80";
};

function Facilities() {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState("photos");
  const [lightboxImg, setLightboxImg] = useState(null);
  const [lightboxVideo, setLightboxVideo] = useState(null);
  const [facilities, setFacilities] = useState(facilitiesData);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/public/facilities")
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
          setFacilities(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching facilities:", err);
      });
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "bio":
      case "leaf": return <FaLeaf className="facility-icon" />;
      case "physics":
      case "atom": return <FaAtom className="facility-icon" />;
      case "chemistry":
      case "flask": return <FaFlask className="facility-icon" />;
      case "art":
      case "palette": return <FaPalette className="facility-icon" />;
      case "hostel":
      case "home": return <FaHome className="facility-icon" />;
      case "bus": return <FaBus className="facility-icon" />;
      case "sports":
      case "running": return <FaRunning className="facility-icon" />;
      case "teacher": return <FaChalkboardTeacher className="facility-icon" />;
      default: return <FaFlask className="facility-icon" />;
    }
  };

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
        {facilities.map((fac, idx) => (
          <div
            className="facility-card"
            key={fac._id || fac.id || idx}
            onClick={() => openModal(fac)}
          >
            {fac.icon || getIcon(fac.iconType)}
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
                  {(selectedFacility.images || []).map((img, idx) => (
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
                  {(() => {
                    const allVids = Array.isArray(selectedFacility.videos) && selectedFacility.videos.length > 0
                      ? selectedFacility.videos
                      : selectedFacility.videoUrl
                        ? [{ title: selectedFacility.videoTitle || `${selectedFacility.title} Tour Video`, url: selectedFacility.videoUrl }]
                        : [];
                    if (allVids.length === 0) {
                      return <p style={{ color: "#64748b", padding: "12px" }}>No videos available for this facility.</p>;
                    }
                    return allVids.map((vid, idx) => (
                      <div
                        className="fac-video-item"
                        key={idx}
                        onClick={() => setLightboxVideo(vid.url)}
                      >
                        <div className="fac-video-thumbnail">
                          <img
                            src={getVideoThumbnail(vid, selectedFacility.images && selectedFacility.images[0])}
                            alt={vid.title || selectedFacility.title}
                          />
                          <div className="fac-video-play-overlay">
                            <FaPlay />
                          </div>
                        </div>
                        <span className="fac-video-title">{vid.title || `Video #${idx + 1}`}</span>
                      </div>
                    ));
                  })()}
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
          <div className="lightbox-content" onClick={e => e.stopPropagation()} style={{ width: "90%", maxWidth: "800px", background: "black", borderRadius: "12px", padding: "10px" }}>
            {isEmbedVideoUrl(lightboxVideo) ? (
              <iframe
                src={getEmbedVideoUrl(lightboxVideo)}
                title="Video Player"
                width="100%"
                height="480px"
                style={{ borderRadius: "8px", border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={lightboxVideo}
                controls
                autoPlay
                className="lightbox-img"
                style={{ width: "100%", maxHeight: "85vh", outline: "none", background: "black" }}
              />
            )}
            <button className="lightbox-close" onClick={() => setLightboxVideo(null)}>&times;</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Facilities;