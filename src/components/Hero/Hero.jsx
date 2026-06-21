import { useState, useEffect } from "react";
import "./Hero.css";
import schoolImage from "../../assets/images/school.png";

const heroImages = [
  schoolImage,
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=1920&q=80"
];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
  };

  // Autoplay functionality
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
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

      // Fallback for older browsers
      setTimeout(() => {
        window.__navScrolling = false;
        document.body.classList.remove("nav-scrolling");
        window.removeEventListener("scrollend", handleScrollEnd);
      }, 1500);
    }
  };

  return (
    <div className="hero">
      {/* Background Slides */}
      <div className="hero-slides">
        {heroImages.map((image, idx) => (
          <div
            key={idx}
            className={`hero-slide ${idx === currentIndex ? "active" : ""}`}
            style={{
              backgroundImage: `url(${image})`
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
            Welcome To <br />
            Swami Vivekanand Sen. Sec. School
          </h1>
          <p>Quality Education For Bright Future</p>
          <button onClick={scrollToAdmissions}>
            Apply For Admission
          </button>
        </div>

        {/* Slide Indicators / Dots */}
        <div className="hero-dots">
          {heroImages.map((_, idx) => (
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