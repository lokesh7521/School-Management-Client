import { useState, useRef } from "react";
import { FaPlay } from "react-icons/fa";
import "./Gallery.css";

const schoolPhotos = [
  { id: 1, url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80", title: "School Main Campus Building" },
  { id: 2, url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80", title: "Student Graduation Ceremony" },
  { id: 3, url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80", title: "Interactive Classroom Study" },
  { id: 4, url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80", title: "Front Entrance Campus Gate" },
  { id: 5, url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80", title: "Students Studying in Library" },
  { id: 6, url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80", title: "Modern Science Laboratory" },
  { id: 7, url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=600&q=80", title: "School Library Study Room" },
  { id: 8, url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80", title: "Classroom Blackboard Study" },
  { id: 9, url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80", title: "Computer Science Laboratory" },
  { id: 10, url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80", title: "Collaborative Study Group" },
  { id: 11, url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80", title: "Modern Campus Lecture Hall" },
  { id: 12, url: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=600&q=80", title: "Student Campus Corridors" }
];

const schoolVideos = [
  {
    id: 1,
    url: "https://assets.mixkit.co/videos/preview/mixkit-kids-in-class-raising-hands-to-answer-teacher-42289-large.mp4",
    poster: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
    title: "Interactive Classroom Session"
  },
  {
    id: 2,
    url: "https://assets.mixkit.co/videos/preview/mixkit-science-laboratory-close-up-of-microscope-and-flasks-40343-large.mp4",
    poster: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=600&q=80",
    title: "Science Lab Experiments"
  },
  {
    id: 3,
    url: "https://assets.mixkit.co/videos/preview/mixkit-boys-playing-football-on-sports-field-31718-large.mp4",
    poster: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=600&q=80",
    title: "Annual Sports Football Match"
  },
  {
    id: 4,
    url: "https://assets.mixkit.co/videos/preview/mixkit-children-painting-in-art-class-at-school-42296-large.mp4",
    poster: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80",
    title: "Creative Arts Workshop"
  },
  {
    id: 5,
    url: "https://assets.mixkit.co/videos/preview/mixkit-science-laboratory-close-up-of-microscope-and-flasks-40343-large.mp4",
    poster: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=600&q=80",
    title: "Science Fair & Exhibitions"
  },
  {
    id: 6,
    url: "https://assets.mixkit.co/videos/preview/mixkit-kids-in-class-raising-hands-to-answer-teacher-42289-large.mp4",
    poster: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    title: "Annual Day Dance Performance"
  },
  {
    id: 7,
    url: "https://assets.mixkit.co/videos/preview/mixkit-kids-in-class-raising-hands-to-answer-teacher-42289-large.mp4",
    poster: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=600&q=80",
    title: "Computer Laboratory Class"
  },
  {
    id: 8,
    url: "https://assets.mixkit.co/videos/preview/mixkit-children-painting-in-art-class-at-school-42296-large.mp4",
    poster: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80",
    title: "Painting & Hand-Crafts Session"
  }
];

function Gallery() {
  const [activeTab, setActiveTab] = useState("photos");
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showAllVideos, setShowAllVideos] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [lightboxVideo, setLightboxVideo] = useState(null);
  const galleryRef = useRef(null);

  const handleShowLessPhotos = () => {
    setShowAllPhotos(false);
    setTimeout(() => {
      galleryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleShowLessVideos = () => {
    setShowAllVideos(false);
    setTimeout(() => {
      galleryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <section className="gallery" ref={galleryRef}>
      <p className="gallery-label">PHOTO & VIDEO GALLERY</p>
      <h2>School Gallery</h2>
      <p className="gallery-subtitle">
        Some beautiful moments and interactive video glimpses of our school campus. Click on any picture to view full screen.
      </p>

      {/* TAB CONTROLS */}
      <div className="gallery-tabs">
        <button
          className={`gallery-tab-btn ${activeTab === "photos" ? "active" : ""}`}
          onClick={() => setActiveTab("photos")}
        >
          School Pics
        </button>
        <button
          className={`gallery-tab-btn ${activeTab === "videos" ? "active" : ""}`}
          onClick={() => setActiveTab("videos")}
        >
          School Videos
        </button>
      </div>

      {/* TAB CONTENT */}
      {activeTab === "photos" ? (
        <>
          <div className="gallery-container">
            {schoolPhotos.slice(0, showAllPhotos ? schoolPhotos.length : 6).map(photo => (
              <div
                className="gallery-card"
                key={photo.id}
                onClick={() => setLightboxImg(photo.url)}
              >
                <img src={photo.url} alt={photo.title} className="zoomable-img" />
                <div className="gallery-card-overlay">
                  <span className="gallery-card-title">{photo.title}</span>
                </div>
              </div>
            ))}
          </div>
          {schoolPhotos.length > 6 && (
            <div className="gallery-more-container">
              <button
                className="gallery-more-btn"
                onClick={() => showAllPhotos ? handleShowLessPhotos() : setShowAllPhotos(true)}
              >
                {showAllPhotos ? "Show Less" : "View More"}
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="gallery-video-container">
            {schoolVideos.slice(0, showAllVideos ? schoolVideos.length : 2).map(video => (
              <div
                className="gallery-video-card"
                key={video.id}
                onClick={() => setLightboxVideo(video.url)}
              >
                <div className="gallery-video-thumbnail">
                  <img src={video.poster} alt={video.title} />
                  <div className="video-play-btn">
                    <FaPlay />
                  </div>
                </div>
                <div className="gallery-video-info">
                  <h4>{video.title}</h4>
                </div>
              </div>
            ))}
          </div>
          {schoolVideos.length > 2 && (
            <div className="gallery-more-container">
              <button
                className="gallery-more-btn"
                onClick={() => showAllVideos ? handleShowLessVideos() : setShowAllVideos(true)}
              >
                {showAllVideos ? "Show Less" : "View More"}
              </button>
            </div>
          )}
        </>
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

export default Gallery;