import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaPlay } from "react-icons/fa";
import "./Gallery.css";

const defaultPhotos = [
  { _id: "1", url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80", title: "School Main Campus Building" },
  { _id: "2", url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80", title: "Student Graduation Ceremony" },
  { _id: "3", url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80", title: "Interactive Classroom Study" },
  { _id: "4", url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80", title: "Front Entrance Campus Gate" },
  { _id: "5", url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80", title: "Students Studying in Library" },
  { _id: "6", url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80", title: "Modern Science Laboratory" },
  { _id: "7", url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=600&q=80", title: "School Library Study Room" },
  { _id: "8", url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80", title: "Classroom Blackboard Study" }
];

const defaultVideos = [
  {
    _id: "v1",
    url: "https://assets.mixkit.co/videos/preview/mixkit-kids-in-class-raising-hands-to-answer-teacher-42289-large.mp4",
    posterUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80",
    title: "Interactive Classroom Session"
  },
  {
    _id: "v2",
    url: "https://assets.mixkit.co/videos/preview/mixkit-science-laboratory-close-up-of-microscope-and-flasks-40343-large.mp4",
    posterUrl: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=600&q=80",
    title: "Science Lab Experiments"
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

const getVideoThumbnail = (video) => {
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
  return url;
};

function Gallery() {
  const [activeTab, setActiveTab] = useState("photos");
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showAllVideos, setShowAllVideos] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [lightboxVideo, setLightboxVideo] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const galleryRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/public/gallery")
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data)) {
          setGalleryItems(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching gallery items:", err);
      });
  }, []);

  const photos = galleryItems.filter((item) => item.mediaType === "photo" || !item.mediaType);
  const displayPhotos = photos.length > 0 ? photos : defaultPhotos;

  const videos = galleryItems.filter((item) => item.mediaType === "video");
  const displayVideos = videos.length > 0 ? videos : defaultVideos;

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
            {displayPhotos.slice(0, showAllPhotos ? displayPhotos.length : 6).map((photo, idx) => (
              <div
                className="gallery-card"
                key={photo._id || idx}
                onClick={() => setLightboxImg(photo.url)}
              >
                <img src={photo.url} alt={photo.title} className="zoomable-img" />
                <div className="gallery-card-overlay">
                  <span className="gallery-card-title">{photo.title}</span>
                </div>
              </div>
            ))}
          </div>
          {displayPhotos.length > 6 && (
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
            {displayVideos.slice(0, showAllVideos ? displayVideos.length : 2).map((video, idx) => (
              <div
                className="gallery-video-card"
                key={video._id || idx}
                onClick={() => setLightboxVideo(video.url)}
              >
                <div className="gallery-video-thumbnail">
                  <img src={getVideoThumbnail(video)} alt={video.title} />
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
          {displayVideos.length > 2 && (
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
            {isEmbedVideoUrl(lightboxVideo) ? (
              <iframe
                src={getEmbedVideoUrl(lightboxVideo)}
                title="Video Player"
                width="100%"
                height="450px"
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

export default Gallery;