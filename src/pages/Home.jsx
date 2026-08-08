import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Facilities from "../components/Facilities/Facilities";
import Gallery from "../components/Gallery/Gallery";
import WhyChoose from "../components/WhyChoose/WhyChoose";
import Academics from "../components/Academics/Academics";
import Admissions from "../components/Admissions/Admissions";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import "./Home.css";

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      let attempts = 0;

      const scroll = () => {
        const target = document.getElementById(targetId);
        if (target) {
          // Show navbar and pause scroll detector during navigation
          document.body.classList.remove("scroll-down");
          document.body.classList.add("scroll-up");
          document.body.classList.add("nav-scrolling");
          window.__navScrolling = true;

          const navbar = document.querySelector(".school-header");
          const navbarHeight = navbar ? navbar.offsetHeight : 135;
          const targetTop =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            navbarHeight;

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
        } else if (attempts < 10) {
          attempts++;
          setTimeout(scroll, 100);
        }
      };

      // Delay slightly for initial render transition
      const timer = setTimeout(scroll, 100);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  return (
    <div>
      <Navbar />
      <section id="home"><Hero /></section>
      <section id="about"><About /></section>
      <section id="facilities"><Facilities /></section>
      <section id="gallery"><Gallery /></section>
      <section id="whychoose"><WhyChoose /></section>
      <section id="academics"><Academics /></section>
      <section id="admissions"><Admissions /></section>
      <section id="contact"><Contact /></section>
      <Footer />
    </div>
  );
}

export default Home;
