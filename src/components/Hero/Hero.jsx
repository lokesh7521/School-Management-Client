import { useState, useEffect } from "react";
import axios from "axios";
import "./Hero.css";
import schoolImage from "../../assets/images/school.png";

const defaultHeroImages = [
  schoolImage,
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=1920&q=80"
];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [announcements, setAnnouncements] = useState([]);
  const [heroSliders, setHeroSliders] = useState([]);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/public/sliders")
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data)) {
          const activeSliders = res.data.data.filter((item) => item.isActive !== false);
          if (activeSliders.length > 0) {
            setHeroSliders(activeSliders);
          }
        }
      })
      .catch((err) => {
        console.log("Using default hero images", err);
      });
  }, []);

  const currentSliderList = heroSliders.length > 0 ? heroSliders : defaultHeroImages.map((img) => ({
    image: img,
    title: "Welcome To Swami Vivekanand Sen. Sec. School",
    subtitle: "Quality Education For Bright Future"
  }));

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? currentSliderList.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === currentSliderList.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 35;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    setTouchStartX(0);
    setTouchEndX(0);
  };

  // Autoplay functionality
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [currentSliderList.length]);

  // Fetch announcements
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/public/announcements")
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data)) {
          setAnnouncements(res.data.data);
        }
      })
      .catch((err) => {
        console.log("No announcements server response");
      });
  }, []);

  const scrollToAdmissions = () => {
    const target = document.getElementById("admissions");
    if (target) {
      document.body.classList.remove("scroll-down");
      document.body.classList.add("scroll-up");
      document.body.classList.add("nav-scrolling");
      window.__navScrolling = true;

      const navbar = document.querySelector(".school-header");
      const navbarHeight = navbar ? navbar.offsetHeight : 120;
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

  const activeSlide = currentSliderList[currentIndex] || currentSliderList[0] || {};

  return (
    <div
      className="hero"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Slides */}
      <div className="hero-slides">
        {currentSliderList.map((item, idx) => (
          <div
            key={idx}
            className={`hero-slide ${idx === currentIndex ? "active" : ""}`}
            style={{
              backgroundImage: `url(${item.image || item})`
            }}
          />
        ))}
      </div>

      <div className="overlay">
        {/* Navigation Arrows */}
        <button className="hero-arrow hero-arrow-left" onClick={prevSlide} aria-label="Previous Slide">
          &#10094;
        </button>
        <button className="hero-arrow hero-arrow-right" onClick={nextSlide} aria-label="Next Slide">
          &#10095;
        </button>

        {/* Hero Content */}
        <div className="hero-content">
          <h1>
            {activeSlide.title || "Welcome To Swami Vivekanand Sen. Sec. School"}
          </h1>
          <p>{activeSlide.subtitle || "Quality Education For Bright Future"}</p>
          <button onClick={scrollToAdmissions}>
            Apply For Admission
          </button>

          {/* ANNOUNCEMENT TICKER BANNER */}
          {announcements.length > 0 && (
            <div style={{
              marginTop: "1.5rem",
              background: "rgba(220, 38, 38, 0.9)",
              color: "#ffffff",
              padding: "0.5rem 1.25rem",
              borderRadius: "30px",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              fontSize: "0.88rem",
              fontWeight: "600",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
            }}>
              <span style={{ background: "#ffffff", color: "#dc2626", padding: "2px 8px", borderRadius: "12px", fontSize: "0.75rem", textTransform: "uppercase" }}>
                📢 Notice
              </span>
              <span>{announcements[0].title}: {announcements[0].content}</span>
            </div>
          )}
        </div>

        {/* Slide Indicators / Dots */}
        <div className="hero-dots">
          {currentSliderList.map((_, idx) => (
            <span
              key={idx}
              className={`hero-dot ${idx === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;