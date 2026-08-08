import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import axios from "axios";
import logo from "../assets/images/logo.png";
import "./AdminPage.css";

const API_BASE = "http://localhost:5000/api";

const parseFeeNumber = (val) => {
  if (typeof val === "number") return isNaN(val) ? 0 : val;
  if (!val) return 0;
  const str = String(val).trim().replace(/,/g, "");
  if (!isNaN(str) && str !== "") {
    return parseFloat(str);
  }
  const matches = str.match(/\d+/);
  return matches ? parseFloat(matches[0]) : 0;
};

const renderBusFee = (busFee) => {
  if (busFee === undefined || busFee === null || busFee === "") return "₹0";
  const str = String(busFee).trim();
  const cleanStr = str.replace(/,/g, "").replace(/^₹\s*/, "");
  if (!isNaN(cleanStr) && cleanStr !== "") {
    return `₹${parseFloat(cleanStr).toLocaleString()}`;
  }
  return str;
};

function AdminPage() {
  const [activeTab, setActiveTab] = useState("sliders");
  const [contactSubTab, setContactSubTab] = useState(null); // null = Main 3-Options Hub
  const [toast, setToast] = useState({ message: "", type: "" });

  const defaultSchoolInfo = {
    logoUrl: "",
    schoolName: "Swami Vivekanand",
    tagline: "Sen. Sec. School",
    establishedYear: "1998",
    phone: "+91 9829739603",
    email: "sitaram1985@gmail.com",
    address: "Dansroli, Sikar, Raj.",
    googleMapsUrl: "https://maps.google.com/?q=Dansroli+Sikar+Rajasthan",
    aboutBadge: "ABOUT OUR SCHOOL",
    aboutTitle: "Swami Vivekanand Sen. Sec. School",
    aboutText: "Our school provides quality education with experienced teachers, hostel facility, transport system, science laboratories, arts practical labs and classrooms.",
    aboutParagraph2: "We focus on discipline, knowledge, moral values and overall development of every student.",
    aboutReadMoreText: "Read More",
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
    },
    principalMessage: "Education is the light of life. We focus on building character, discipline, and knowledge in every student.",
    stats: { totalStudents: 1250, totalTeachers: 45, passPercentage: "98.5%", totalClassrooms: 32 }
  };

  // Data states
  const [schoolInfo, setSchoolInfo] = useState(defaultSchoolInfo);

  const [announcements, setAnnouncements] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [buses, setBuses] = useState([]);
  const [fees, setFees] = useState([]);
  const [events, setEvents] = useState([]);
  const [navItems, setNavItems] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [timetableItems, setTimetableItems] = useState([]);
  const [academics, setAcademics] = useState([]);
  const [sliders, setSliders] = useState([]);
  const [adminCalYear, setAdminCalYear] = useState(2026);
  const [adminCalMonth, setAdminCalMonth] = useState(6); // Default July 2026

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [currentItem, setCurrentItem] = useState(null);

  // Circular Cropper Modal States
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [rawImageSrc, setRawImageSrc] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [panPos, setPanPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const cropperCanvasRef = useRef(null);

  // Header Quick Edit States & Ref
  const headerLogoInputRef = useRef(null);
  const [headerQuickEdit, setHeaderQuickEdit] = useState({
    open: false,
    field: "", // 'logo' | 'name' | 'location' | 'email' | 'phone'
    title: "",
    value: "",
    extraValue: ""
  });
  const [viewPhotoFullscreen, setViewPhotoFullscreen] = useState(false);
  const [showLogoEditMenu, setShowLogoEditMenu] = useState(false);

  // Direct Header Logo File Upload Handler
  const handleHeaderLogoFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileDataUrl = event.target.result;
        setViewPhotoFullscreen(false);
        setShowLogoEditMenu(false);
        setRawImageSrc(fileDataUrl);
        setCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error("Header logo upload error", err);
      showToast("Failed to load image file", "error");
    }
  };

  // Open Quick Edit Modal for Header fields
  const openHeaderQuickEdit = (field) => {
    if (field === "logo") {
      setHeaderQuickEdit({
        open: true,
        field: "logo",
        title: "🖼️ Change School Logo",
        value: schoolInfo.logoUrl || "",
        extraValue: ""
      });
    } else if (field === "name") {
      setHeaderQuickEdit({
        open: true,
        field: "name",
        title: "🏫 Edit School Name & Tagline",
        value: schoolInfo.schoolName || "",
        extraValue: schoolInfo.tagline || ""
      });
    } else if (field === "location") {
      setHeaderQuickEdit({
        open: true,
        field: "location",
        title: "📍 Edit Location / Address",
        value: schoolInfo.address || "",
        extraValue: schoolInfo.googleMapsUrl || ""
      });
    } else if (field === "email") {
      setHeaderQuickEdit({
        open: true,
        field: "email",
        title: "✉️ Edit Contact Email Address",
        value: schoolInfo.email || "",
        extraValue: ""
      });
    } else if (field === "phone") {
      setHeaderQuickEdit({
        open: true,
        field: "phone",
        title: "📞 Edit Contact Phone Number",
        value: schoolInfo.phone || "",
        extraValue: ""
      });
    }
  };

  // Save Quick Edit Modal
  const handleSaveHeaderQuickEdit = async (e) => {
    e.preventDefault();
    try {
      let updated = { ...schoolInfo };
      if (headerQuickEdit.field === "logo") {
        updated.logoUrl = headerQuickEdit.value;
      } else if (headerQuickEdit.field === "name") {
        updated.schoolName = headerQuickEdit.value;
        updated.tagline = headerQuickEdit.extraValue;
      } else if (headerQuickEdit.field === "location") {
        updated.address = headerQuickEdit.value;
        if (headerQuickEdit.extraValue) {
          updated.googleMapsUrl = headerQuickEdit.extraValue;
        }
      } else if (headerQuickEdit.field === "email") {
        updated.email = headerQuickEdit.value;
      } else if (headerQuickEdit.field === "phone") {
        updated.phone = headerQuickEdit.value;
      }

      setSchoolInfo(updated);

      const res = await axios.put(`${API_BASE}/admin/info`, updated);
      if (res.data.success) {
        showToast("Header details updated successfully!");
      }
      setHeaderQuickEdit({ open: false, field: "", title: "", value: "", extraValue: "" });
    } catch (err) {
      console.error("Error saving header quick edit", err);
      showToast("Failed to update header info", "error");
    }
  };

  // Dynamic Admission Steps Handlers
  const defaultAdmissionStepsList = [
    { stepNumber: 1, title: schoolInfo.admissionStep1 || "Step 1: Registration Form Submission", desc: "Fill out online or offline application form at desk." },
    { stepNumber: 2, title: schoolInfo.admissionStep2 || "Step 2: Interaction / Entrance Assessment", desc: "Short placement assessment or interactive guidance session." },
    { stepNumber: 3, title: schoolInfo.admissionStep3 || "Step 3: Document Verification & Review", desc: "Verification of TC, Birth Certificate, Aadhaar, and Report Card." },
    { stepNumber: 4, title: schoolInfo.admissionStep4 || "Step 4: Fee Confirmation & Student Enrollment", desc: "Deposit admission fees to confirm enrollment and receive student ID." }
  ];

  const getActiveAdmissionSteps = () => {
    if (schoolInfo.admissionSteps && schoolInfo.admissionSteps.length > 0) {
      return schoolInfo.admissionSteps;
    }
    return defaultAdmissionStepsList;
  };

  const handleAddAdmissionStep = () => {
    const current = getActiveAdmissionSteps();
    const nextNum = current.length + 1;
    const updated = [...current, { stepNumber: nextNum, title: `Step ${nextNum}: New Admission Step`, desc: "" }];
    setSchoolInfo({ ...schoolInfo, admissionSteps: updated });
  };

  const handleUpdateAdmissionStep = (index, field, value) => {
    const current = [...getActiveAdmissionSteps()];
    current[index] = { ...current[index], [field]: value };
    setSchoolInfo({ ...schoolInfo, admissionSteps: current });
  };

  const handleDeleteAdmissionStep = (index) => {
    const current = [...getActiveAdmissionSteps()];
    const filtered = current.filter((_, i) => i !== index);
    const renumbered = filtered.map((step, i) => ({ ...step, stepNumber: i + 1 }));
    setSchoolInfo({ ...schoolInfo, admissionSteps: renumbered });
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3500);
  };

  // Fetch data functions
  const fetchAllData = async () => {
    try {
      const [
        infoRes,
        annRes,
        teacherRes,
        busRes,
        feeRes,
        eventRes,
        navRes,
        galleryRes,
        facilitiesRes,
        classroomsRes,
        timetableRes,
        academicsRes,
        slidersRes
      ] = await Promise.allSettled([
        axios.get(`${API_BASE}/public/info`),
        axios.get(`${API_BASE}/public/announcements`),
        axios.get(`${API_BASE}/public/teachers`),
        axios.get(`${API_BASE}/public/buses`),
        axios.get(`${API_BASE}/public/fees`),
        axios.get(`${API_BASE}/public/events`),
        axios.get(`${API_BASE}/admin/navbar`),
        axios.get(`${API_BASE}/public/gallery`),
        axios.get(`${API_BASE}/public/facilities`),
        axios.get(`${API_BASE}/public/classrooms`),
        axios.get(`${API_BASE}/public/timetable`),
        axios.get(`${API_BASE}/public/academics`),
        axios.get(`${API_BASE}/public/sliders`)
      ]);

      if (infoRes.status === "fulfilled" && infoRes.value.data.data) {
        const fetched = infoRes.value.data.data;
        setSchoolInfo({
          ...defaultSchoolInfo,
          ...fetched,
          director: { ...defaultSchoolInfo.director, ...(fetched.director || {}) },
          principal: { ...defaultSchoolInfo.principal, ...(fetched.principal || {}) }
        });
      }
      if (annRes.status === "fulfilled") {
        setAnnouncements(annRes.value.data.data || []);
      }
      if (teacherRes.status === "fulfilled") {
        setTeachers(teacherRes.value.data.data || []);
      }
      if (busRes.status === "fulfilled") {
        setBuses(busRes.value.data.data || []);
      }
      if (feeRes.status === "fulfilled") {
        setFees(feeRes.value.data.data || []);
      }
      if (eventRes.status === "fulfilled") {
        setEvents(eventRes.value.data.data || []);
      }
      if (navRes.status === "fulfilled") {
        setNavItems(navRes.value.data.data || []);
      }
      if (galleryRes.status === "fulfilled") {
        setGallery(galleryRes.value.data.data || []);
      }
      if (facilitiesRes.status === "fulfilled") {
        setFacilities(facilitiesRes.value.data.data || []);
      }
      if (classroomsRes.status === "fulfilled") {
        setClassrooms(classroomsRes.value.data.data || []);
      }
      if (timetableRes.status === "fulfilled") {
        setTimetableItems(timetableRes.value.data.data || []);
      }
      if (academicsRes.status === "fulfilled") {
        setAcademics(academicsRes.value.data.data || []);
      }
      if (slidersRes.status === "fulfilled") {
        setSliders(slidersRes.value.data.data || []);
      }
    } catch (err) {
      console.error("Error fetching admin data", err);
    }
  };

  useEffect(() => {
    fetchAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save School Info & Header Branding
  const handleSaveSchoolInfo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${API_BASE}/admin/info`, schoolInfo);
      if (res.data.success) {
        showToast("School Info & Header Branding updated successfully!");
        fetchAllData();
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to update school info", "error");
    }
  };

  // Handle Logo File Upload (Open Interactive Circular DP Crop Modal)
  const handleLogoFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setRawImageSrc(event.target.result);
        setZoom(1);
        setRotation(0);
        setPanPos({ x: 0, y: 0 });
        setCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Gallery Image / Video File Upload
  const handleGalleryFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCurrentItem((prev) => ({
          ...prev,
          url: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

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

  // Handle Facility Images Upload
  const handleFacilityFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const promises = files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => resolve(event.target.result);
          reader.readAsDataURL(file);
        });
      });
      Promise.all(promises).then((newImages) => {
        setCurrentItem((prev) => ({
          ...prev,
          uploadedImages: [...(prev.uploadedImages || []), ...newImages],
          images: Array.from(new Set([...(prev.images || []), ...newImages]))
        }));
      });
    }
  };

  // Handle Video File Upload from local PC for Facilities
  const handleVideoFileUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const videoDataUrl = event.target.result;
        setCurrentItem((prev) => {
          const currentVids = Array.isArray(prev.videos) && prev.videos.length > 0
            ? [...prev.videos]
            : [{ title: "", url: "" }];

          currentVids[index] = {
            title: currentVids[index]?.title || file.name.replace(/\.[^/.]+$/, ""),
            url: videoDataUrl
          };

          if (index === currentVids.length - 1) {
            currentVids.push({ title: "", url: "" });
          }

          return {
            ...prev,
            videos: currentVids,
            videoUrl: currentVids[0]?.url || "",
            videoTitle: currentVids[0]?.title || ""
          };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Canvas Drawing Effect for Cropper Preview
  useEffect(() => {
    if (!cropModalOpen || !rawImageSrc || !cropperCanvasRef.current) return;
    const canvas = cropperCanvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();

      ctx.translate(canvas.width / 2 + panPos.x, canvas.height / 2 + panPos.y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(zoom, zoom);

      const fitScale = Math.min(canvas.width / img.width, canvas.height / img.height);
      const drawW = img.width * fitScale;
      const drawH = img.height * fitScale;

      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.restore();
    };
    img.src = rawImageSrc;
  }, [cropModalOpen, rawImageSrc, zoom, rotation, panPos]);

  // Pan / Drag handlers for Cropper
  const handlePanStart = (e) => {
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX - panPos.x, y: clientY - panPos.y });
  };

  const handlePanMove = (e) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setPanPos({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y
    });
  };

  const handlePanEnd = () => {
    setIsDragging(false);
  };

  // Crop & Apply Circular Logo
  const handleApplyCrop = async () => {
    if (!rawImageSrc) return;
    const offscreen = document.createElement("canvas");
    const size = 300;
    offscreen.width = size;
    offscreen.height = size;
    const ctx = offscreen.getContext("2d");

    const img = new Image();
    img.onload = async () => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      const scaleFactor = size / 280;
      ctx.translate(size / 2 + panPos.x * scaleFactor, size / 2 + panPos.y * scaleFactor);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(zoom, zoom);

      const fitScale = Math.min(280 / img.width, 280 / img.height) * scaleFactor;
      const drawW = img.width * fitScale;
      const drawH = img.height * fitScale;

      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.restore();

      const croppedDataUrl = offscreen.toDataURL("image/png", 0.95);
      const updatedInfo = { ...schoolInfo, logoUrl: croppedDataUrl };
      setSchoolInfo(updatedInfo);
      setHeaderQuickEdit((prev) => ({ ...prev, value: croppedDataUrl }));

      try {
        await axios.put(`${API_BASE}/admin/info`, updatedInfo);
        showToast("Circular Logo cropped & updated live!");
      } catch (err) {
        showToast("Cropped logo set in preview!");
      }
      setCropModalOpen(false);
    };
    img.src = rawImageSrc;
  };

  // Toggle Navbar Item Active Status
  const handleToggleNavActive = async (item) => {
    try {
      const res = await axios.put(`${API_BASE}/admin/navbar/${item._id}`, {
        isActive: !item.isActive
      });
      if (res.data.success) {
        showToast(`'${item.title}' visibility updated!`);
        fetchAllData();
      }
    } catch (err) {
      showToast("Failed to update visibility", "error");
    }
  };

  // Move Navbar item up or down
  const handleMoveNavItem = async (index, direction) => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= navItems.length) return;

    const newNavItems = [...navItems];
    const tempOrder = newNavItems[index].order;
    newNavItems[index].order = newNavItems[targetIndex].order;
    newNavItems[targetIndex].order = tempOrder;

    const temp = newNavItems[index];
    newNavItems[index] = newNavItems[targetIndex];
    newNavItems[targetIndex] = temp;

    setNavItems(newNavItems);

    try {
      await axios.put(`${API_BASE}/admin/navbar/reorder`, {
        items: newNavItems.map((item, idx) => ({ _id: item._id, order: idx + 1 }))
      });
      showToast("Navbar reordered!");
      fetchAllData();
    } catch (err) {
      showToast("Error reordering navbar", "error");
    }
  };

  // Reset Navbar Defaults
  const handleResetNavbarDefaults = async () => {
    if (!window.confirm("Reset all navbar menu items to default structure? Custom links will be replaced.")) return;
    try {
      const res = await axios.post(`${API_BASE}/admin/navbar/reset-default`);
      if (res.data.success) {
        showToast("Navbar reset to default items!");
        fetchAllData();
      }
    } catch (err) {
      showToast("Error resetting navbar", "error");
    }
  };

  // Handle Bus Image Upload
  const handleBusFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCurrentItem((prev) => ({
          ...prev,
          image: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Classroom Image Upload
  const handleClassroomFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCurrentItem((prev) => ({
          ...prev,
          image: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Teacher Image Upload
  const handleTeacherFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCurrentItem((prev) => ({
          ...prev,
          image: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Modal Open Handlers
  const handleOpenAdd = () => {
    setModalMode("add");
    if (activeTab === "home") {
      setCurrentItem({ _type: "home", title: "", content: "", category: "General", isImportant: false });
    } else if (activeTab === "teachers") {
      setCurrentItem({ name: "", subject: "", qualification: "", experience: "5 yrs", phone: "", gender: "male", image: "" });
    } else if (activeTab === "buses") {
      setCurrentItem({
        busNo: "",
        routeName: "",
        driverName: "",
        driverPhone: "",
        capacity: 40,
        status: "Active",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=60",
        stops: ""
      });
    } else if (activeTab === "fees") {
      setCurrentItem({ className: "", tuitionFee: 0, busFee: "1500", activityFee: 0, totalFee: 0, description: "", frequency: "Quarterly" });
    } else if (activeTab === "calendar") {
      setCurrentItem({ title: "", date: new Date().toISOString().split("T")[0], category: "Event", description: "" });
    } else if (activeTab === "gallery") {
      setCurrentItem({ title: "", url: "", mediaType: "photo", posterUrl: "" });
    } else if (activeTab === "facilities") {
      setCurrentItem({
        title: "",
        desc: "",
        iconType: "leaf",
        images: [],
        webImageUrls: ["", ""],
        uploadedImages: [],
        videoUrl: "",
        videoTitle: "",
        videos: [{ title: "", url: "" }]
      });
    } else if (activeTab === "classrooms") {
      setCurrentItem({
        roomNo: "",
        assignedTo: "",
        type: "Regular",
        capacity: 40,
        image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80",
        features: ""
      });
    } else if (activeTab === "timetable") {
      setCurrentItem({
        category: "hours",
        periodOrTitle: "",
        time: "",
        subjectOrDesc: "",
        room: "",
        order: timetableItems.length + 1
      });
    } else if (activeTab === "academics") {
      setCurrentItem({
        streamId: `stream_${Date.now()}`,
        title: "",
        subtitle: "",
        image: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=800&q=80",
        overview: "",
        subjects: [{ name: "", details: "" }],
        highlights: [""],
        order: academics.length + 1
      });
    } else if (activeTab === "sliders") {
      setCurrentItem({
        _type: "sliders",
        title: "Welcome To Swami Vivekanand Sen. Sec. School",
        subtitle: "Quality Education For Bright Future",
        image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1920&q=80",
        order: sliders.length + 1,
        isActive: true
      });
    }
    setModalOpen(true);
  };

  const handleOpenAddNotice = () => {
    setModalMode("add");
    setCurrentItem({ _type: "home", title: "", content: "", category: "General", isImportant: false });
    setModalOpen(true);
  };

  const handleOpenAddSlider = () => {
    setModalMode("add");
    setCurrentItem({
      _type: "sliders",
      title: "Welcome To Swami Vivekanand Sen. Sec. School",
      subtitle: "Quality Education For Bright Future",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1920&q=80",
      order: sliders.length + 1,
      isActive: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item, explicitType) => {
    setModalMode("edit");
    const targetType = explicitType || item._type || (item.content !== undefined ? "home" : (item.subtitle !== undefined ? "sliders" : activeTab));
    if (targetType === "buses") {
      const stopsStr = Array.isArray(item.stops) ? item.stops.join(", ") : (item.stops || "");
      setCurrentItem({
        ...item,
        _type: targetType,
        stops: stopsStr,
        status: item.status || "Active",
        capacity: item.capacity || 40,
        image: item.image || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=60"
      });
    } else if (targetType === "classrooms") {
      const featuresStr = Array.isArray(item.features) ? item.features.join(", ") : (item.features || "");
      setCurrentItem({
        ...item,
        _type: targetType,
        features: featuresStr,
        type: item.type || "Regular",
        capacity: item.capacity || 40,
        image: item.image || "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=60"
      });
    } else if (targetType === "facilities") {
      const existingImgs = (Array.isArray(item.images) ? item.images : [])
        .filter((img) => typeof img === "string" && img.trim() !== "");
      const webUrls = existingImgs.filter((img) => !img.startsWith("data:"));
      const uploaded = existingImgs.filter((img) => img.startsWith("data:"));
      if (webUrls.length === 0 || webUrls[webUrls.length - 1] !== "") {
        webUrls.push("");
      }
      let vids = Array.isArray(item.videos) && item.videos.length > 0
        ? item.videos.map(v => ({ title: v.title || "", url: v.url || "" }))
        : item.videoUrl
          ? [{ title: item.videoTitle || "Tour Video", url: item.videoUrl }]
          : [{ title: "", url: "" }];

      if (vids.length === 0 || (vids[vids.length - 1].url && vids[vids.length - 1].url !== "")) {
        vids.push({ title: "", url: "" });
      }

      setCurrentItem({
        ...item,
        _type: targetType,
        images: existingImgs,
        webImageUrls: webUrls,
        uploadedImages: uploaded,
        videos: vids
      });
    } else if (targetType === "academics") {
      setCurrentItem({
        ...item,
        _type: targetType,
        subjects: Array.isArray(item.subjects) && item.subjects.length > 0 ? item.subjects : [{ name: "", details: "" }],
        highlights: Array.isArray(item.highlights) && item.highlights.length > 0 ? item.highlights : [""]
      });
    } else {
      setCurrentItem({ ...item, _type: targetType });
    }
    setModalOpen(true);
  };

  // Delete Handlers
  const handleDelete = async (id, explicitType) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const targetType = explicitType || currentItem?._type || activeTab;
      let endpoint = "";
      if (targetType === "home") endpoint = `${API_BASE}/admin/announcements/${id}`;
      else if (targetType === "teachers") endpoint = `${API_BASE}/admin/teachers/${id}`;
      else if (targetType === "buses") endpoint = `${API_BASE}/admin/buses/${id}`;
      else if (targetType === "fees") endpoint = `${API_BASE}/admin/fees/${id}`;
      else if (targetType === "calendar") endpoint = `${API_BASE}/admin/events/${id}`;
      else if (targetType === "gallery") endpoint = `${API_BASE}/admin/gallery/${id}`;
      else if (targetType === "facilities") endpoint = `${API_BASE}/admin/facilities/${id}`;
      else if (targetType === "classrooms") endpoint = `${API_BASE}/admin/classrooms/${id}`;
      else if (targetType === "timetable") endpoint = `${API_BASE}/admin/timetable/${id}`;
      else if (targetType === "academics") endpoint = `${API_BASE}/admin/academics/${id}`;
      else if (targetType === "sliders") endpoint = `${API_BASE}/admin/sliders/${id}`;

      const res = await axios.delete(endpoint);
      if (res.data.success) {
        showToast("Item deleted successfully!");
        fetchAllData();
      }
    } catch (err) {
      showToast("Error deleting item", "error");
    }
  };

  // Submit Form Handler inside Modal
  const handleSubmitModal = async (e) => {
    e.preventDefault();
    try {
      let endpoint = "";
      let payload = { ...currentItem };
      const targetType = currentItem._type || (currentItem.content !== undefined ? "home" : (currentItem.subtitle !== undefined ? "sliders" : activeTab));

      if (targetType === "buses" && typeof payload.stops === "string") {
        payload.stops = payload.stops.split(",").map((s) => s.trim()).filter(Boolean);
      }

      if (targetType === "classrooms" && typeof payload.features === "string") {
        payload.features = payload.features.split(",").map((s) => s.trim()).filter(Boolean);
      }

      if (targetType === "facilities") {
        const validWebUrls = (payload.webImageUrls || []).map((u) => u.trim()).filter(Boolean);
        const currentImgs = Array.isArray(payload.images) ? payload.images : [];
        payload.images = Array.from(new Set([...currentImgs, ...validWebUrls]));

        const validVideos = (payload.videos || [])
          .filter((v) => v.url && v.url.trim() !== "")
          .map((v) => ({ title: v.title?.trim() || "Facility Video Tour", url: v.url.trim() }));
        payload.videos = validVideos;
        if (validVideos.length > 0) {
          payload.videoUrl = validVideos[0].url;
          payload.videoTitle = validVideos[0].title;
        }
      }

      if (targetType === "academics") {
        payload.subjects = (payload.subjects || [])
          .filter((s) => s.name && s.name.trim() !== "");
        payload.highlights = (payload.highlights || [])
          .map((h) => (typeof h === "string" ? h.trim() : ""))
          .filter(Boolean);
      }

      if (targetType === "home") endpoint = `${API_BASE}/admin/announcements`;
      else if (targetType === "teachers") endpoint = `${API_BASE}/admin/teachers`;
      else if (targetType === "buses") endpoint = `${API_BASE}/admin/buses`;
      else if (targetType === "fees") endpoint = `${API_BASE}/admin/fees`;
      else if (targetType === "calendar") endpoint = `${API_BASE}/admin/events`;
      else if (targetType === "gallery") endpoint = `${API_BASE}/admin/gallery`;
      else if (targetType === "facilities") endpoint = `${API_BASE}/admin/facilities`;
      else if (targetType === "classrooms") endpoint = `${API_BASE}/admin/classrooms`;
      else if (targetType === "timetable") endpoint = `${API_BASE}/admin/timetable`;
      else if (targetType === "academics") endpoint = `${API_BASE}/admin/academics`;
      else if (targetType === "sliders") endpoint = `${API_BASE}/admin/sliders`;

      if (modalMode === "edit") {
        await axios.put(`${endpoint}/${currentItem._id}`, payload);
        showToast("Updated successfully!");
      } else {
        await axios.post(endpoint, payload);
        showToast("Added successfully!");
      }

      setModalOpen(false);
      fetchAllData();
    } catch (err) {
      showToast("Error saving item", "error");
    }
  };

  return (
    <div className="admin-page-container">
      {/* TWO-TIER ADMIN HEADER MATCHING FRONTEND WEBSITE 1:1 */}
      <header className="admin-two-tier-header">
        {/* Tier 1: Light Sky-Blue Top Header with Direct Click-To-Edit */}
        <div className="admin-top-header">
          {/* Hidden File Input for Direct Logo Click Upload */}
          <input
            type="file"
            ref={headerLogoInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleHeaderLogoFileChange}
          />

          <div className="admin-top-header-inner">
            <div className="admin-brand" style={{ gap: "16px" }}>
              <div
                className="admin-logo-editable"
                onClick={() => setViewPhotoFullscreen(true)}
                title="Click to View & Edit School Logo"
              >
                <img
                  src={schoolInfo.logoUrl || logo}
                  alt="Swami Vivekanand School Logo"
                  className="admin-brand-logo"
                  onError={(e) => { e.target.src = logo; }}
                />
                <div className="admin-logo-editable-overlay">
                  <span>👁️</span>
                  <span style={{ fontSize: "9px" }}>View</span>
                </div>
              </div>

              <div
                className="admin-brand-text admin-editable-item"
                onClick={() => openHeaderQuickEdit("name")}
                title="Click to Edit School Name & Tagline"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span className="admin-brand-name">
                    {schoolInfo.schoolName || "Swami Vivekanand"}
                  </span>
                  <span className="admin-editable-badge">✏️ Edit</span>
                </div>
                <span className="admin-brand-tagline">
                  {schoolInfo.tagline || "ADMIN CONTROL PANEL"}
                </span>
              </div>
            </div>

            <div className="admin-header-contacts">
              <div
                className="admin-contact-block admin-editable-item"
                onClick={() => openHeaderQuickEdit("location")}
                title="Click to Edit Location Address"
              >
                <div className="admin-contact-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="admin-contact-info">
                  <span className="admin-contact-label">LOCATION <span className="admin-editable-badge">✏️</span></span>
                  <span className="admin-contact-value">{schoolInfo.address || "Dansroli, Sikar, Raj."}</span>
                </div>
              </div>

              <div
                className="admin-contact-block admin-editable-item"
                onClick={() => openHeaderQuickEdit("email")}
                title="Click to Edit Email Address"
              >
                <div className="admin-contact-icon">
                  <FaEnvelope />
                </div>
                <div className="admin-contact-info">
                  <span className="admin-contact-label">EMAIL <span className="admin-editable-badge">✏️</span></span>
                  <span className="admin-contact-value">{schoolInfo.email || "sitaram1985@gmail.com"}</span>
                </div>
              </div>

              <div
                className="admin-contact-block admin-editable-item"
                onClick={() => openHeaderQuickEdit("phone")}
                title="Click to Edit Phone Number"
              >
                <div className="admin-contact-icon">
                  <FaPhoneAlt />
                </div>
                <div className="admin-contact-info">
                  <span className="admin-contact-label">PHONE <span className="admin-editable-badge">✏️</span></span>
                  <span className="admin-contact-value">{schoolInfo.phone || "+91 9829739603"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tier 2: Deep Navy Main Admin Navbar */}
        <nav className="admin-main-navbar">
          <ul className="admin-nav-tabs-list">
            <li>
              <button
                className={`admin-nav-tab-btn ${activeTab === "sliders" ? "active" : ""}`}
                onClick={() => setActiveTab("sliders")}
              >
                Hero Sliders ({sliders.length})
              </button>
            </li>
            <li>
              <button
                className={`admin-nav-tab-btn ${activeTab === "about" ? "active" : ""}`}
                onClick={() => setActiveTab("about")}
              >
                About
              </button>
            </li>
            <li>
              <button
                className={`admin-nav-tab-btn ${activeTab === "gallery" ? "active" : ""}`}
                onClick={() => setActiveTab("gallery")}
              >
                Gallery ({gallery.length})
              </button>
            </li>
            <li>
              <button
                className={`admin-nav-tab-btn ${activeTab === "academics" ? "active" : ""}`}
                onClick={() => setActiveTab("academics")}
              >
                Academics ({academics.length})
              </button>
            </li>
            <li>
              <button
                className={`admin-nav-tab-btn ${activeTab === "fees" ? "active" : ""}`}
                onClick={() => setActiveTab("fees")}
              >
                Fees ({fees.length})
              </button>
            </li>
            <li>
              <button
                className={`admin-nav-tab-btn ${activeTab === "calendar" ? "active" : ""}`}
                onClick={() => setActiveTab("calendar")}
              >
                Calendar ({events.length})
              </button>
            </li>
            <li>
              <button
                className={`admin-nav-tab-btn ${activeTab === "timetable" ? "active" : ""}`}
                onClick={() => setActiveTab("timetable")}
              >
                Timetable ({timetableItems.length})
              </button>
            </li>
            <li>
              <button
                className={`admin-nav-tab-btn ${activeTab === "teachers" ? "active" : ""}`}
                onClick={() => setActiveTab("teachers")}
              >
                Teachers ({teachers.length})
              </button>
            </li>
            <li>
              <button
                className={`admin-nav-tab-btn ${activeTab === "classrooms" ? "active" : ""}`}
                onClick={() => setActiveTab("classrooms")}
              >
                Classrooms ({classrooms.length})
              </button>
            </li>
            <li>
              <button
                className={`admin-nav-tab-btn ${activeTab === "buses" ? "active" : ""}`}
                onClick={() => setActiveTab("buses")}
              >
                Buses ({buses.length})
              </button>
            </li>
            <li>
              <button
                className={`admin-nav-tab-btn ${activeTab === "facilities" ? "active" : ""}`}
                onClick={() => setActiveTab("facilities")}
              >
                Facilities ({facilities.length})
              </button>
            </li>
            <li>
              <button
                className={`admin-nav-tab-btn ${activeTab === "contact" ? "active" : ""}`}
                onClick={() => { setActiveTab("contact"); setContactSubTab(null); }}
              >
                Contact
              </button>
            </li>
            <li>
              <button
                className={`admin-nav-tab-btn ${activeTab === "navbar" ? "active" : ""}`}
                onClick={() => setActiveTab("navbar")}
              >
                🌐 Navbar Links
              </button>
            </li>
          </ul>

          <Link to="/" className="btn-view-public-website">
            ← View Public Website
          </Link>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="admin-content-body">
        {toast.message && <div className={`toast-msg ${toast.type}`}>{toast.message}</div>}

        {/* 1. TOP HEADER & BRANDING TAB */}
        {activeTab === "topheader" && (
          <div className="admin-card">
            <div className="admin-card-header">
              <h2 className="admin-card-title">📌 Top Header Branding & Contact Details</h2>
            </div>
            <form onSubmit={handleSaveSchoolInfo}>
              {/* School Logo Upload & Link Box */}
              <div className="admin-form-group" style={{ background: "#f8fafc", padding: "1rem", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "1.25rem" }}>
                <label style={{ fontWeight: "700", color: "#1e3a8a", marginBottom: "0.5rem", display: "block" }}>
                  🖼️ School Logo Upload & Link
                </label>
                <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap" }}>
                  {schoolInfo.logoUrl && (
                    <div style={{ textAlign: "center" }}>
                      <img
                        src={schoolInfo.logoUrl}
                        alt="Logo Preview"
                        style={{ height: "60px", width: "auto", objectFit: "contain", border: "1px solid #cbd5e1", borderRadius: "6px", background: "#ffffff", padding: "4px" }}
                      />
                      <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "2px" }}>Current Logo</div>
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: "220px" }}>
                    <label style={{ fontSize: "0.85rem", color: "#475569" }}>Option 1: Upload Logo File from Computer</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="admin-form-control"
                      onChange={handleLogoFileUpload}
                      style={{ padding: "0.35rem 0.5rem" }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: "220px" }}>
                    <label style={{ fontSize: "0.85rem", color: "#475569" }}>Option 2: Paste Image URL or Link</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="https://example.com/logo.png"
                      value={schoolInfo.logoUrl || ""}
                      onChange={(e) => setSchoolInfo({ ...schoolInfo, logoUrl: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="grid-2">
                <div className="admin-form-group">
                  <label>School Name</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    required
                    value={schoolInfo.schoolName || ""}
                    onChange={(e) => setSchoolInfo({ ...schoolInfo, schoolName: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Tagline</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    value={schoolInfo.tagline || ""}
                    onChange={(e) => setSchoolInfo({ ...schoolInfo, tagline: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="admin-form-group">
                  <label>Location / Address (Displayed in Topbar)</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    required
                    value={schoolInfo.address || ""}
                    onChange={(e) => setSchoolInfo({ ...schoolInfo, address: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Email Address (Displayed in Topbar)</label>
                  <input
                    type="email"
                    className="admin-form-control"
                    required
                    value={schoolInfo.email || ""}
                    onChange={(e) => setSchoolInfo({ ...schoolInfo, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="admin-form-group">
                  <label>Phone Number (Displayed in Topbar)</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    required
                    value={schoolInfo.phone || ""}
                    onChange={(e) => setSchoolInfo({ ...schoolInfo, phone: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Established Year</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    placeholder="Enter established year..."
                    value={schoolInfo.establishedYear || ""}
                    onChange={(e) => setSchoolInfo({ ...schoolInfo, establishedYear: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-form-group" style={{ marginTop: "1rem" }}>
                <label>Google Maps Live Location URL (Opened when user clicks Location)</label>
                <input
                  type="text"
                  className="admin-form-control"
                  placeholder="Enter Google Maps live location embed URL..."
                  value={schoolInfo.googleMapsUrl || ""}
                  onChange={(e) => setSchoolInfo({ ...schoolInfo, googleMapsUrl: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-primary-add" style={{ marginTop: "1rem" }}>
                💾 Save Top Header & Branding
              </button>
            </form>
          </div>
        )}

        {/* 2. ABOUT SCHOOL & MANAGEMENT TAB */}
        {activeTab === "about" && (
          <div className="admin-card">
            <div className="admin-card-header">
              <h2 className="admin-card-title">🏫 About School & Management Desk</h2>
            </div>

            <form onSubmit={handleSaveSchoolInfo}>
              {/* SECTION 1: ABOUT SCHOOL MAIN */}
              <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "1.1rem", color: "#1e293b", marginBottom: "12px", borderBottom: "2px solid #e2e8f0", paddingBottom: "6px" }}>
                  ℹ️ About School Overview
                </h3>

                <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="admin-form-group">
                    <label>About Section Badge Subtitle</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      value={schoolInfo.aboutBadge || ""}
                      onChange={(e) => setSchoolInfo({ ...schoolInfo, aboutBadge: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Main Heading Title</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="Enter main heading title..."
                      value={schoolInfo.aboutTitle || ""}
                      onChange={(e) => setSchoolInfo({ ...schoolInfo, aboutTitle: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>About Paragraph 1 (Main Introduction)</label>
                  <textarea
                    rows="3"
                    className="admin-form-control"
                    placeholder="Enter main introduction paragraph..."
                    value={schoolInfo.aboutText || ""}
                    onChange={(e) => setSchoolInfo({ ...schoolInfo, aboutText: e.target.value })}
                  ></textarea>
                </div>

                <div className="admin-form-group">
                  <label>About Paragraph 2 (Focus & Values)</label>
                  <textarea
                    rows="3"
                    className="admin-form-control"
                    placeholder="Enter focus and values paragraph..."
                    value={schoolInfo.aboutParagraph2 || ""}
                    onChange={(e) => setSchoolInfo({ ...schoolInfo, aboutParagraph2: e.target.value })}
                  ></textarea>
                </div>
              </div>

              {/* SECTION 2: FOUNDER & DIRECTOR DESK */}
              <div style={{ background: "#f0f9ff", padding: "16px", borderRadius: "10px", border: "1px solid #bae6fd", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "1.1rem", color: "#0369a1", marginBottom: "12px", borderBottom: "2px solid #bae6fd", paddingBottom: "6px" }}>
                  👨‍💼 Founder & Director Desk
                </h3>
                <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="admin-form-group">
                    <label>Director Name</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      value={schoolInfo.director?.name || ""}
                      onChange={(e) => setSchoolInfo({ ...schoolInfo, director: { ...(schoolInfo.director || {}), name: e.target.value } })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Designation / Badge</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="Enter designation / badge title..."
                      value={schoolInfo.director?.title || ""}
                      onChange={(e) => setSchoolInfo({ ...schoolInfo, director: { ...(schoolInfo.director || {}), title: e.target.value } })}
                    />
                  </div>
                </div>

                <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem" }}>
                  <div className="admin-form-group">
                    <label>Director Photo URL</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      value={schoolInfo.director?.image || ""}
                      onChange={(e) => setSchoolInfo({ ...schoolInfo, director: { ...(schoolInfo.director || {}), image: e.target.value } })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Upload Photo</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="admin-form-control"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setSchoolInfo({
                              ...schoolInfo,
                              director: { ...(schoolInfo.director || {}), image: event.target.result }
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Short Banner Quote</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    placeholder="e.g. Holistic development is the cornerstone of progress..."
                    value={schoolInfo.director?.quote || ""}
                    onChange={(e) => setSchoolInfo({ ...schoolInfo, director: { ...(schoolInfo.director || {}), quote: e.target.value } })}
                  />
                </div>

                <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="admin-form-group">
                    <label>Director Email</label>
                    <input
                      type="email"
                      className="admin-form-control"
                      value={schoolInfo.director?.email || ""}
                      onChange={(e) => setSchoolInfo({ ...schoolInfo, director: { ...(schoolInfo.director || {}), email: e.target.value } })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Director Phone Number</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      value={schoolInfo.director?.phone || ""}
                      onChange={(e) => setSchoolInfo({ ...schoolInfo, director: { ...(schoolInfo.director || {}), phone: e.target.value } })}
                    />
                  </div>
                </div>

                <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="admin-form-group">
                    <label>Qualification</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="e.g. B.Tech, MBA (Ed. Management)"
                      value={schoolInfo.director?.qualification || ""}
                      onChange={(e) => setSchoolInfo({ ...schoolInfo, director: { ...(schoolInfo.director || {}), qualification: e.target.value } })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Experience</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="e.g. 20+ Years in Educational Administration"
                      value={schoolInfo.director?.experience || ""}
                      onChange={(e) => setSchoolInfo({ ...schoolInfo, director: { ...(schoolInfo.director || {}), experience: e.target.value } })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Full Message Desk Paragraph 1</label>
                  <textarea
                    rows="3"
                    className="admin-form-control"
                    value={schoolInfo.director?.message1 || ""}
                    onChange={(e) => setSchoolInfo({ ...schoolInfo, director: { ...(schoolInfo.director || {}), message1: e.target.value } })}
                  ></textarea>
                </div>
                <div className="admin-form-group">
                  <label>Full Message Desk Paragraph 2</label>
                  <textarea
                    rows="3"
                    className="admin-form-control"
                    value={schoolInfo.director?.message2 || ""}
                    onChange={(e) => setSchoolInfo({ ...schoolInfo, director: { ...(schoolInfo.director || {}), message2: e.target.value } })}
                  ></textarea>
                </div>
                <div className="admin-form-group">
                  <label>Full Message Desk Paragraph 3</label>
                  <textarea
                    rows="3"
                    className="admin-form-control"
                    value={schoolInfo.director?.message3 || ""}
                    onChange={(e) => setSchoolInfo({ ...schoolInfo, director: { ...(schoolInfo.director || {}), message3: e.target.value } })}
                  ></textarea>
                </div>
              </div>

              {/* SECTION 3: PRINCIPAL DESK */}
              <div style={{ background: "#fefce8", padding: "16px", borderRadius: "10px", border: "1px solid #fef08a", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "1.1rem", color: "#854d0e", marginBottom: "12px", borderBottom: "2px solid #fef08a", paddingBottom: "6px" }}>
                  🎓 School Principal Desk
                </h3>
                <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="admin-form-group">
                    <label>Principal Name</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      value={schoolInfo.principal?.name || ""}
                      onChange={(e) => setSchoolInfo({ ...schoolInfo, principal: { ...(schoolInfo.principal || {}), name: e.target.value } })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Designation / Badge</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="Enter designation / badge title..."
                      value={schoolInfo.principal?.title || ""}
                      onChange={(e) => setSchoolInfo({ ...schoolInfo, principal: { ...(schoolInfo.principal || {}), title: e.target.value } })}
                    />
                  </div>
                </div>

                <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem" }}>
                  <div className="admin-form-group">
                    <label>Principal Photo URL</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      value={schoolInfo.principal?.image || ""}
                      onChange={(e) => setSchoolInfo({ ...schoolInfo, principal: { ...(schoolInfo.principal || {}), image: e.target.value } })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Upload Photo</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="admin-form-control"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setSchoolInfo({
                              ...schoolInfo,
                              principal: { ...(schoolInfo.principal || {}), image: event.target.result }
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Short Banner Quote</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    placeholder="e.g. Education is about discovering potential..."
                    value={schoolInfo.principal?.quote || ""}
                    onChange={(e) => setSchoolInfo({ ...schoolInfo, principal: { ...(schoolInfo.principal || {}), quote: e.target.value } })}
                  />
                </div>

                <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="admin-form-group">
                    <label>Principal Email</label>
                    <input
                      type="email"
                      className="admin-form-control"
                      value={schoolInfo.principal?.phone || ""}
                      onChange={(e) => setSchoolInfo({ ...schoolInfo, principal: { ...(schoolInfo.principal || {}), email: e.target.value } })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Principal Phone Number</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      value={schoolInfo.principal?.phone || ""}
                      onChange={(e) => setSchoolInfo({ ...schoolInfo, principal: { ...(schoolInfo.principal || {}), phone: e.target.value } })}
                    />
                  </div>
                </div>

                <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="admin-form-group">
                    <label>Qualification</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="e.g. M.A, M.Ed, Ph.D in Education"
                      value={schoolInfo.principal?.qualification || ""}
                      onChange={(e) => setSchoolInfo({ ...schoolInfo, principal: { ...(schoolInfo.principal || {}), qualification: e.target.value } })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Experience</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="e.g. 25 Years of Academic Mentorship"
                      value={schoolInfo.principal?.experience || ""}
                      onChange={(e) => setSchoolInfo({ ...schoolInfo, principal: { ...(schoolInfo.principal || {}), experience: e.target.value } })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Full Message Desk Paragraph 1</label>
                  <textarea
                    rows="3"
                    className="admin-form-control"
                    value={schoolInfo.principal?.message1 || ""}
                    onChange={(e) => setSchoolInfo({ ...schoolInfo, principal: { ...(schoolInfo.principal || {}), message1: e.target.value } })}
                  ></textarea>
                </div>
                <div className="admin-form-group">
                  <label>Full Message Desk Paragraph 2</label>
                  <textarea
                    rows="3"
                    className="admin-form-control"
                    value={schoolInfo.principal?.message2 || ""}
                    onChange={(e) => setSchoolInfo({ ...schoolInfo, principal: { ...(schoolInfo.principal || {}), message2: e.target.value } })}
                  ></textarea>
                </div>
                <div className="admin-form-group">
                  <label>Full Message Desk Paragraph 3</label>
                  <textarea
                    rows="3"
                    className="admin-form-control"
                    value={schoolInfo.principal?.message3 || ""}
                    onChange={(e) => setSchoolInfo({ ...schoolInfo, principal: { ...(schoolInfo.principal || {}), message3: e.target.value } })}
                  ></textarea>
                </div>
              </div>

              <button type="submit" className="btn-primary-add" style={{ padding: "12px 28px", fontSize: "1.05rem" }}>
                💾 Save All About Content & Leadership Messages
              </button>
            </form>
          </div>
        )}

        {/* 4. GALLERY TAB */}
        {activeTab === "gallery" && (
          <div className="admin-card">
            <div className="admin-card-header">
              <h2 className="admin-card-title">🖼️ Gallery & Cards Image Management</h2>
              <button className="btn-primary-add" onClick={handleOpenAdd}>
                + Add Photo / Video Card
              </button>
            </div>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Preview</th>
                    <th>Title</th>
                    <th>Media Type</th>
                    <th>URL</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {gallery.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center", color: "#64748b" }}>
                        No gallery items found. Click '+ Add Photo / Video Card'.
                      </td>
                    </tr>
                  ) : (
                    gallery.map((item) => (
                      <tr key={item._id}>
                        <td>
                          {item.mediaType === "video" ? (
                            <div style={{ width: 60, height: 45, background: "#0f172a", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "#60a5fa", fontSize: "0.75rem", fontWeight: "bold" }}>
                              ▶ Video
                            </div>
                          ) : (
                            <img
                              src={item.url}
                              alt={item.title}
                              style={{ width: 65, height: 45, objectFit: "cover", borderRadius: 6, border: "1px solid #cbd5e1" }}
                              onError={(e) => { e.target.style.display = "none"; }}
                            />
                          )}
                        </td>
                        <td><strong>{item.title}</strong></td>
                        <td>
                          <span style={{ textTransform: "capitalize", padding: "2px 10px", borderRadius: "12px", background: item.mediaType === "video" ? "#fee2e2" : "#e0f2fe", color: item.mediaType === "video" ? "#991b1b" : "#075985", fontSize: "0.78rem", fontWeight: "600" }}>
                            {item.mediaType || "photo"}
                          </span>
                        </td>
                        <td><code style={{ fontSize: "0.78rem", wordBreak: "break-all" }}>{item.url?.length > 40 ? item.url.substring(0, 40) + "..." : item.url}</code></td>
                        <td>
                          <button className="btn-action-edit" onClick={() => handleOpenEdit(item)}>Edit</button>
                          <button className="btn-action-delete" onClick={() => handleDelete(item._id)}>Delete</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* HERO BANNER SLIDERS & ANNOUNCEMENTS TAB */}
        {activeTab === "sliders" && (
          <>
            {/* SECTION 1: HERO BANNER SLIDERS */}
            <div className="admin-card" style={{ marginBottom: "2rem" }}>
              <div className="admin-card-header">
                <h2 className="admin-card-title">🎠 Homepage Hero Banner Slider Management</h2>
                <button className="btn-primary-add" onClick={handleOpenAddSlider}>
                  + Add Hero Slider Banner
                </button>
              </div>
              <p style={{ color: "#64748b", marginBottom: "15px" }}>
                Upload and manage specific hero banner photos and captions exclusively for the top homepage carousel slider (separated from gallery).
              </p>
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Banner Preview</th>
                      <th>Heading Title & Subtitle</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sliders.length === 0 ? (
                      <tr>
                        <td colSpan="5" style={{ textAlign: "center", color: "#64748b" }}>
                          No hero slider banners found. Click '+ Add Hero Slider Banner'.
                        </td>
                      </tr>
                    ) : (
                      sliders.map((sl) => (
                        <tr key={sl._id}>
                          <td><span style={{ fontWeight: "700", color: "#64748b" }}>#{sl.order || 1}</span></td>
                          <td>
                            <img
                              src={sl.image}
                              alt={sl.title}
                              style={{ width: 100, height: 50, objectFit: "cover", borderRadius: 6, border: "1px solid #cbd5e1" }}
                              onError={(e) => { e.target.style.display = "none"; }}
                            />
                          </td>
                          <td>
                            <strong style={{ color: "#0f172a", fontSize: "0.92rem" }}>{sl.title}</strong>
                            <br />
                            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>{sl.subtitle}</span>
                          </td>
                          <td>
                            <span style={{
                              padding: "3px 10px",
                              borderRadius: "12px",
                              fontSize: "0.78rem",
                              fontWeight: "600",
                              background: sl.isActive !== false ? "#dcfce7" : "#f1f5f9",
                              color: sl.isActive !== false ? "#15803d" : "#64748b"
                            }}>
                              {sl.isActive !== false ? "🟢 Active" : "⚪ Hidden"}
                            </span>
                          </td>
                          <td>
                            <button className="btn-action-edit" onClick={() => handleOpenEdit(sl, "sliders")}>Edit</button>
                            <button className="btn-action-delete" onClick={() => handleDelete(sl._id, "sliders")}>Delete</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SECTION 2: NOTICES & ANNOUNCEMENTS TICKER */}
            <div className="admin-card">
              <div className="admin-card-header">
                <h2 className="admin-card-title">📢 Notices & Announcements Ticker Management</h2>
                <button className="btn-primary-add" onClick={handleOpenAddNotice}>
                  + Add Notice / Announcement
                </button>
              </div>
              <p style={{ color: "#64748b", marginBottom: "15px" }}>
                Add and manage live announcement ticker notices displayed on the homepage.
              </p>

              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Importance</th>
                      <th>Publish Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {announcements.length === 0 ? (
                      <tr>
                        <td colSpan="5" style={{ textAlign: "center", color: "#64748b" }}>
                          No announcements published yet. Click '+ Add Notice / Announcement' to create one.
                        </td>
                      </tr>
                    ) : (
                      announcements.map((item) => (
                        <tr key={item._id}>
                          <td>
                            <strong>{item.title}</strong>
                            <div style={{ fontSize: "0.8rem", color: "#64748b" }}>{item.content}</div>
                          </td>
                          <td>{item.category}</td>
                          <td>
                            <span className={`status-badge ${item.isImportant ? "badge-important" : "badge-normal"}`}>
                              {item.isImportant ? "High Importance" : "Normal"}
                            </span>
                          </td>
                          <td>{new Date(item.publishDate).toLocaleDateString()}</td>
                          <td>
                            <button className="btn-action-edit" onClick={() => handleOpenEdit(item, "home")}>
                              Edit
                            </button>
                            <button className="btn-action-delete" onClick={() => handleDelete(item._id, "home")}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* 5. ACADEMICS TAB */}
        {activeTab === "academics" && (
          <div className="admin-card">
            <div className="admin-card-header">
              <h2 className="admin-card-title">🎓 Academics & Educational Streams Management</h2>
              <button className="btn-primary-add" onClick={handleOpenAdd}>
                + Add Academic Stream / Program
              </button>
            </div>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Banner Image</th>
                    <th>Stream ID & Title</th>
                    <th>Subtitle & Tagline</th>
                    <th>Subjects & Highlights</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {academics.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center", color: "#64748b" }}>
                        No academic programs added yet.
                      </td>
                    </tr>
                  ) : (
                    academics.map((ac) => (
                      <tr key={ac._id}>
                        <td><span style={{ fontWeight: "700", color: "#64748b" }}>#{ac.order || 1}</span></td>
                        <td>
                          <img
                            src={ac.image}
                            alt={ac.title}
                            style={{ width: 65, height: 45, objectFit: "cover", borderRadius: 6, border: "1px solid #cbd5e1" }}
                            onError={(e) => { e.target.style.display = "none"; }}
                          />
                        </td>
                        <td>
                          <strong style={{ color: "#0f172a", fontSize: "0.95rem" }}>{ac.title}</strong>
                          <br />
                          <code style={{ fontSize: "0.75rem", background: "#f1f5f9", padding: "2px 6px", borderRadius: "4px" }}>
                            Key: {ac.streamId}
                          </code>
                        </td>
                        <td style={{ fontSize: "0.85rem", color: "#475569", maxWidth: "220px" }}>
                          {ac.subtitle}
                        </td>
                        <td style={{ fontSize: "0.82rem" }}>
                          <span style={{ background: "#e0f2fe", color: "#0369a1", padding: "2px 8px", borderRadius: "10px", fontWeight: "600", marginRight: "6px", display: "inline-block", marginBottom: "4px" }}>
                            📘 {ac.subjects?.length || 0} Subjects
                          </span>
                          <span style={{ background: "#fef3c7", color: "#b45309", padding: "2px 8px", borderRadius: "10px", fontWeight: "600", display: "inline-block" }}>
                            ⭐ {ac.highlights?.length || 0} Highlights
                          </span>
                        </td>
                        <td>
                          <button className="btn-action-edit" onClick={() => handleOpenEdit(ac)}>Edit</button>
                          <button className="btn-action-delete" onClick={() => handleDelete(ac._id)}>Delete</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 6. FEES STRUCTURE TAB */}
        {activeTab === "fees" && (
          <>
            {/* SECTION 1: CLASS-WISE FEE STRUCTURE */}
            <div className="admin-card">
              <div className="admin-card-header">
                <h2 className="admin-card-title">💰 Fee Structure Management</h2>
                <button className="btn-primary-add" onClick={handleOpenAdd}>
                  + Add Fee Structure
                </button>
              </div>
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Class Name</th>
                      <th>📘 Tuition Fee (₹)</th>
                      <th>🚌 Bus Fee (₹ / Text)</th>
                      <th>🎨 Activity Fee (₹)</th>
                      <th>💰 Total Fee (₹)</th>
                      <th>Payment Term</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fees.length === 0 ? (
                      <tr>
                        <td colSpan="7" style={{ textAlign: "center", color: "#64748b" }}>
                          No fee structures added yet.
                        </td>
                      </tr>
                    ) : (
                      fees.map((f) => {
                        const tuition = Number(f.tuitionFee || 0);
                        const busNum = parseFeeNumber(f.busFee);
                        const act = Number(f.activityFee || 0);
                        const grandTotal = f.totalFee || (tuition + busNum + act);

                        return (
                          <tr key={f._id}>
                            <td><strong>{f.className}</strong></td>
                            <td><strong style={{ color: "#2563eb" }}>₹{tuition.toLocaleString()}</strong></td>
                            <td><span style={{ color: "#d97706", fontWeight: "600" }}>{renderBusFee(f.busFee)}</span></td>
                            <td><strong style={{ color: "#059669" }}>₹{act.toLocaleString()}</strong></td>
                            <td><strong style={{ color: "#16a34a", fontSize: "1rem" }}>₹{grandTotal.toLocaleString()}</strong></td>
                            <td><span style={{ background: "#f1f5f9", padding: "2px 8px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: "600" }}>{f.frequency || "Yearly"}</span></td>
                            <td>
                              <button className="btn-action-edit" onClick={() => handleOpenEdit(f)}>Edit</button>
                              <button className="btn-action-delete" onClick={() => handleDelete(f._id)}>Delete</button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SECTION 2: PAYMENT GUIDELINES & INSTALLMENT SCHEDULE CONTROLS */}
            <div className="admin-card">
              <div className="admin-card-header">
                <h2 className="admin-card-title">ℹ️ Payment Guidelines & Installment Schedule (किस्त विवरण)</h2>
              </div>
              <p style={{ color: "#64748b", marginBottom: "20px" }}>
                Edit all guideline bullet points and installment session details displayed at the bottom of the public Fees page.
              </p>

              <form onSubmit={handleSaveSchoolInfo}>
                {/* 1. Payment Guidelines Bullets */}
                <div style={{ background: "#f8fafc", padding: "1.25rem", borderRadius: "10px", border: "1px solid #e2e8f0", marginBottom: "1.5rem" }}>
                  <h3 style={{ fontSize: "1.05rem", color: "#1e293b", marginBottom: "1rem" }}>
                    ℹ️ Payment Guidelines (Bullet Points)
                  </h3>
                  {((schoolInfo.feeGuidelines && schoolInfo.feeGuidelines.length > 0) ? schoolInfo.feeGuidelines : [
                    "Fees are payable in designated installments as per the installment schedule.",
                    "A late payment fine of ₹50 per week is applicable after the respective deadlines.",
                    "Modes of payment accepted include Demand Draft, Net Banking, UPI, and Card Payments at the main school desk.",
                    "Transport charges are computed separately based on stops and bus routes."
                  ]).map((gText, gIdx) => (
                    <div key={gIdx} className="admin-form-group" style={{ marginBottom: "10px" }}>
                      <label style={{ fontSize: "0.85rem", color: "#475569" }}>Guideline #{gIdx + 1}</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        value={gText}
                        onChange={(e) => {
                          const currentG = [...(schoolInfo.feeGuidelines || [
                            "Fees are payable in designated installments as per the installment schedule.",
                            "A late payment fine of ₹50 per week is applicable after the respective deadlines.",
                            "Modes of payment accepted include Demand Draft, Net Banking, UPI, and Card Payments at the main school desk.",
                            "Transport charges are computed separately based on stops and bus routes."
                          ])];
                          currentG[gIdx] = e.target.value;
                          setSchoolInfo({ ...schoolInfo, feeGuidelines: currentG });
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* 2. Installment Schedule (3 Steps) */}
                <div style={{ background: "#f8fafc", padding: "1.25rem", borderRadius: "10px", border: "1px solid #e2e8f0", marginBottom: "1.5rem" }}>
                  <h3 style={{ fontSize: "1.05rem", color: "#1e293b", marginBottom: "1rem" }}>
                    📅 Installment Schedule Steps (किस्त विवरण)
                  </h3>
                  {((schoolInfo.feeInstallments && schoolInfo.feeInstallments.length > 0) ? schoolInfo.feeInstallments : [
                    { badge: "1st Kist (50%)", session: "July Session", desc: "Payable at the beginning of the academic session." },
                    { badge: "2nd Kist (30%)", session: "November Session", desc: "Payable by the 10th of November." },
                    { badge: "3rd Kist (20%)", session: "February Session", desc: "Payable by the 10th of February." }
                  ]).map((inst, iIdx) => (
                    <div key={iIdx} style={{ background: "#ffffff", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", marginBottom: "12px" }}>
                      <strong style={{ color: "#2563eb", fontSize: "0.9rem", display: "block", marginBottom: "8px" }}>
                        Installment #{iIdx + 1}
                      </strong>
                      <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr", gap: "10px" }}>
                        <div className="admin-form-group" style={{ marginBottom: 0 }}>
                          <label style={{ fontSize: "0.8rem" }}>Badge Text</label>
                          <input
                            type="text"
                            className="admin-form-control"
                            value={inst.badge || ""}
                            onChange={(e) => {
                              const currentI = [...(schoolInfo.feeInstallments || [
                                { badge: "1st Kist (50%)", session: "July Session", desc: "Payable at the beginning of the academic session." },
                                { badge: "2nd Kist (30%)", session: "November Session", desc: "Payable by the 10th of November." },
                                { badge: "3rd Kist (20%)", session: "February Session", desc: "Payable by the 10th of February." }
                              ])];
                              currentI[iIdx].badge = e.target.value;
                              setSchoolInfo({ ...schoolInfo, feeInstallments: currentI });
                            }}
                          />
                        </div>
                        <div className="admin-form-group" style={{ marginBottom: 0 }}>
                          <label style={{ fontSize: "0.8rem" }}>Session Name</label>
                          <input
                            type="text"
                            className="admin-form-control"
                            value={inst.session || ""}
                            onChange={(e) => {
                              const currentI = [...(schoolInfo.feeInstallments || [
                                { badge: "1st Kist (50%)", session: "July Session", desc: "Payable at the beginning of the academic session." },
                                { badge: "2nd Kist (30%)", session: "November Session", desc: "Payable by the 10th of November." },
                                { badge: "3rd Kist (20%)", session: "February Session", desc: "Payable by the 10th of February." }
                              ])];
                              currentI[iIdx].session = e.target.value;
                              setSchoolInfo({ ...schoolInfo, feeInstallments: currentI });
                            }}
                          />
                        </div>
                        <div className="admin-form-group" style={{ marginBottom: 0 }}>
                          <label style={{ fontSize: "0.8rem" }}>Payment Details / Deadline</label>
                          <input
                            type="text"
                            className="admin-form-control"
                            value={inst.desc || ""}
                            onChange={(e) => {
                              const currentI = [...(schoolInfo.feeInstallments || [
                                { badge: "1st Kist (50%)", session: "July Session", desc: "Payable at the beginning of the academic session." },
                                { badge: "2nd Kist (30%)", session: "November Session", desc: "Payable by the 10th of November." },
                                { badge: "3rd Kist (20%)", session: "February Session", desc: "Payable by the 10th of February." }
                              ])];
                              currentI[iIdx].desc = e.target.value;
                              setSchoolInfo({ ...schoolInfo, feeInstallments: currentI });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button type="submit" className="btn-primary-add">
                  💾 Save Payment Guidelines & Installment Schedule
                </button>
              </form>
            </div>
          </>
        )}

        {/* 7. SCHOOL CALENDAR TAB */}
        {activeTab === "calendar" && (
          <div className="admin-card">
            <div className="admin-card-header">
              <h2 className="admin-card-title">📅 School Calendar & Interactive Holiday Planner</h2>
              <button className="btn-primary-add" onClick={handleOpenAdd}>
                + Add Event / Holiday
              </button>
            </div>

            {/* INTERACTIVE CALENDAR GRID WIDGET */}
            {(() => {
              const monthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
              ];
              const daysInMonth = new Date(adminCalYear, adminCalMonth + 1, 0).getDate();
              const firstDayIndex = new Date(adminCalYear, adminCalMonth, 1).getDay();

              const adminGrid = [];
              for (let i = 0; i < firstDayIndex; i++) adminGrid.push(null);
              for (let i = 1; i <= daysInMonth; i++) adminGrid.push(i);

              const handleAdminDayClick = (day) => {
                if (!day) return;
                const monthStr = String(adminCalMonth + 1).padStart(2, "0");
                const dayStr = String(day).padStart(2, "0");
                const dateStr = `${adminCalYear}-${monthStr}-${dayStr}`;

                const existing = events.find((e) => e.date === dateStr);
                if (existing) {
                  handleOpenEdit(existing);
                } else {
                  setModalMode("add");
                  setCurrentItem({
                    title: "School Holiday",
                    date: dateStr,
                    category: "holiday",
                    description: "Official school holiday."
                  });
                  setModalOpen(true);
                }
              };

              return (
                <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0", marginBottom: "25px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <h3 style={{ margin: 0, color: "#0f172a", fontSize: "1.2rem", fontWeight: "700" }}>
                        🗓️ {monthNames[adminCalMonth]} {adminCalYear}
                      </h3>
                      <span style={{ fontSize: "0.8rem", background: "#fee2e2", color: "#991b1b", padding: "2px 8px", borderRadius: "12px", fontWeight: "600" }}>
                        Sundays & Holidays highlighted in RED
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button
                        type="button"
                        style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#ffffff", cursor: "pointer", fontWeight: "bold" }}
                        onClick={() => {
                          if (adminCalMonth === 0) { setAdminCalMonth(11); setAdminCalYear(adminCalYear - 1); }
                          else setAdminCalMonth(adminCalMonth - 1);
                        }}
                      >
                        ◀ Prev
                      </button>
                      <button
                        type="button"
                        style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", background: "#ffffff", cursor: "pointer", fontWeight: "bold" }}
                        onClick={() => {
                          if (adminCalMonth === 11) { setAdminCalMonth(0); setAdminCalYear(adminCalYear + 1); }
                          else setAdminCalMonth(adminCalMonth + 1);
                        }}
                      >
                        Next ▶
                      </button>
                    </div>
                  </div>

                  {/* Weekday Names Header */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", fontWeight: "700", fontSize: "0.85rem", color: "#64748b", marginBottom: "8px" }}>
                    <span style={{ color: "#ef4444" }}>Sun</span>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                  </div>

                  {/* Days Grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "6px" }}>
                    {adminGrid.map((day, idx) => {
                      if (!day) return <div key={idx} style={{ height: "50px" }}></div>;

                      const monthStr = String(adminCalMonth + 1).padStart(2, "0");
                      const dayStr = String(day).padStart(2, "0");
                      const dateQuery = `${adminCalYear}-${monthStr}-${dayStr}`;

                      const dayEvents = events.filter((e) => e.date === dateQuery);
                      const isSunday = new Date(adminCalYear, adminCalMonth, day).getDay() === 0;
                      const isHoliday = dayEvents.some((e) => (e.category || "").toLowerCase() === "holiday");

                      return (
                        <div
                          key={idx}
                          onClick={() => handleAdminDayClick(day)}
                          title={dayEvents.length > 0 ? dayEvents.map(e => e.title).join(", ") : "Click to add holiday/event"}
                          style={{
                            minHeight: "50px",
                            padding: "6px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            textAlign: "center",
                            transition: "all 0.2s ease",
                            border: isHoliday ? "2px solid #ef4444" : isSunday ? "1px solid #fecdd3" : "1px solid #e2e8f0",
                            background: isHoliday ? "#fef2f2" : isSunday ? "#fff1f2" : dayEvents.length > 0 ? "#f0fdf4" : "#ffffff",
                            position: "relative"
                          }}
                        >
                          <div style={{ fontWeight: "700", fontSize: "0.9rem", color: isHoliday || isSunday ? "#dc2626" : "#1e293b" }}>
                            {day}
                          </div>
                          {isHoliday && (
                            <span style={{ fontSize: "0.65rem", background: "#ef4444", color: "#ffffff", padding: "1px 4px", borderRadius: "4px", fontWeight: "bold", display: "inline-block", marginTop: "2px" }}>
                              Holiday
                            </span>
                          )}
                          {!isHoliday && dayEvents.length > 0 && (
                            <span style={{ fontSize: "0.65rem", background: "#3b82f6", color: "#ffffff", padding: "1px 4px", borderRadius: "4px", fontWeight: "bold", display: "inline-block", marginTop: "2px" }}>
                              {dayEvents[0].category || "Event"}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <p style={{ marginTop: "12px", marginBottom: 0, fontSize: "0.8rem", color: "#64748b", fontStyle: "italic" }}>
                    💡 <strong>Tip:</strong> Kisi bhi date box par click karke us date par 1-click me Holiday ya Event add/edit karein!
                  </p>
                </div>
              );
            })()}

            <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "12px", color: "#1e293b" }}>
              📋 Scheduled Events & Holidays List
            </h3>

            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Event Title</th>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center", color: "#64748b" }}>
                        No events in calendar.
                      </td>
                    </tr>
                  ) : (
                    events.map((ev) => (
                      <tr key={ev._id}>
                        <td><strong>{ev.title}</strong></td>
                        <td><span style={{ fontWeight: "600", color: "#1e293b" }}>{ev.date}</span></td>
                        <td>
                          <span
                            style={{
                              padding: "4px 10px",
                              borderRadius: "12px",
                              fontSize: "0.75rem",
                              fontWeight: "600",
                              textTransform: "uppercase",
                              background:
                                (ev.category || "").toLowerCase() === "holiday" ? "#fee2e2" :
                                  (ev.category || "").toLowerCase() === "exam" ? "#ffedd5" :
                                    (ev.category || "").toLowerCase() === "celebration" ? "#f3e8ff" :
                                      (ev.category || "").toLowerCase() === "activity" ? "#dcfce7" : "#dbeafe",
                              color:
                                (ev.category || "").toLowerCase() === "holiday" ? "#991b1b" :
                                  (ev.category || "").toLowerCase() === "exam" ? "#c2410c" :
                                    (ev.category || "").toLowerCase() === "celebration" ? "#6b21a8" :
                                      (ev.category || "").toLowerCase() === "activity" ? "#166534" : "#1e40af"
                            }}
                          >
                            {ev.category || "Event"}
                          </span>
                        </td>
                        <td>{ev.description || "—"}</td>
                        <td>
                          <button className="btn-action-edit" onClick={() => handleOpenEdit(ev)}>Edit</button>
                          <button className="btn-action-delete" onClick={() => handleDelete(ev._id)}>Delete</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 8. TEACHERS TAB */}
        {activeTab === "teachers" && (
          <div className="admin-card">
            <div className="admin-card-header">
              <h2 className="admin-card-title">👨‍🏫 Faculty & Teachers Directory</h2>
              <button className="btn-primary-add" onClick={handleOpenAdd}>
                + Add Teacher
              </button>
            </div>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Teacher Name</th>
                    <th>Subject</th>
                    <th>Qualification</th>
                    <th>Experience</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: "center", color: "#64748b" }}>
                        No teachers added yet.
                      </td>
                    </tr>
                  ) : (
                    teachers.map((t) => {
                      const avatarUrl = t.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=${t.gender === "female" ? "c2185b" : "003366"}&color=ffffff&size=100&bold=true`;
                      return (
                        <tr key={t._id}>
                          <td>
                            <img
                              src={avatarUrl}
                              alt={t.name}
                              style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover", border: "1px solid #cbd5e1" }}
                              onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=003366&color=ffffff`;
                              }}
                            />
                          </td>
                          <td>
                            <strong>{t.name}</strong>
                            <div>
                              <small style={{ color: "#64748b", textTransform: "capitalize" }}>{t.gender || "male"}</small>
                            </div>
                          </td>
                          <td>
                            <span style={{ background: "#e3f2fd", color: "#0d47a1", padding: "3px 8px", borderRadius: "12px", fontSize: "0.75rem", fontWeight: "600" }}>
                              {t.subject}
                            </span>
                          </td>
                          <td>{t.qualification}</td>
                          <td>{t.experience}</td>
                          <td>{t.phone || "N/A"}</td>
                          <td>
                            <button className="btn-action-edit" onClick={() => handleOpenEdit(t)}>Edit</button>
                            <button className="btn-action-delete" onClick={() => handleDelete(t._id)}>Delete</button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 9. CLASSROOMS TAB */}
        {activeTab === "classrooms" && (
          <div className="admin-card">
            <div className="admin-card-header">
              <h2 className="admin-card-title">🏫 Classrooms & Labs</h2>
              <button className="btn-primary-add" onClick={handleOpenAdd}>
                + Add Classroom
              </button>
            </div>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Room No</th>
                    <th>Assigned Class / Section</th>
                    <th>Category Type</th>
                    <th>Capacity</th>
                    <th>Features</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classrooms.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: "center", color: "#64748b" }}>
                        No classroom records added.
                      </td>
                    </tr>
                  ) : (
                    classrooms.map((c) => (
                      <tr key={c._id}>
                        <td>
                          <img
                            src={c.image || "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80"}
                            alt={c.roomNo}
                            style={{ width: "55px", height: "40px", objectFit: "cover", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                          />
                        </td>
                        <td><strong>{c.roomNo}</strong></td>
                        <td>{c.assignedTo}</td>
                        <td>
                          <span
                            style={{
                              padding: "4px 10px",
                              borderRadius: "12px",
                              fontSize: "0.75rem",
                              fontWeight: "600",
                              background: c.type === "Lab" ? "#f3e8ff" : c.type === "Practical" ? "#ffedd5" : "#dbeafe",
                              color: c.type === "Lab" ? "#6b21a8" : c.type === "Practical" ? "#c2410c" : "#1e40af"
                            }}
                          >
                            {c.type || "Regular"}
                          </span>
                        </td>
                        <td>{c.capacity || 40} seats</td>
                        <td>
                          {Array.isArray(c.features) && c.features.length > 0 ? (
                            <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                              {c.features.map((f, idx) => (
                                <span key={idx} style={{ background: "#f1f5f9", padding: "2px 6px", borderRadius: "4px", fontSize: "0.75rem", color: "#475569" }}>
                                  {f}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <small style={{ color: "#94a3b8" }}>Standard</small>
                          )}
                        </td>
                        <td>
                          <button className="btn-action-edit" onClick={() => handleOpenEdit(c)}>Edit</button>
                          <button className="btn-action-delete" onClick={() => handleDelete(c._id)}>Delete</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TIMETABLE TAB */}
        {activeTab === "timetable" && (
          <div className="admin-card">
            <div className="admin-card-header">
              <h2 className="admin-card-title">⏰ School Timetable & Operating Hours</h2>
              <button className="btn-primary-add" onClick={handleOpenAdd}>
                + Add Timetable Slot
              </button>
            </div>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Schedule Category</th>
                    <th>Title / Lecture Block</th>
                    <th>Time Slot</th>
                    <th>Description / Subject</th>
                    <th>Room / Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {timetableItems.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center", color: "#64748b" }}>
                        No timetable slots added yet.
                      </td>
                    </tr>
                  ) : (
                    timetableItems.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <span
                            style={{
                              padding: "4px 10px",
                              borderRadius: "12px",
                              fontSize: "0.75rem",
                              fontWeight: "600",
                              background: item.category === "hours" ? "#e0f2fe" : "#fef3c7",
                              color: item.category === "hours" ? "#0369a1" : "#b45309"
                            }}
                          >
                            {item.category === "hours" ? "⏳ Operating Hours" : "📖 Lecture Schedule"}
                          </span>
                        </td>
                        <td><strong>{item.periodOrTitle}</strong></td>
                        <td><span style={{ fontWeight: "600", color: "#1e293b" }}>{item.time}</span></td>
                        <td>{item.subjectOrDesc || "—"}</td>
                        <td>{item.room || (item.category === "hours" ? "Campus" : "Standard Room")}</td>
                        <td>
                          <button className="btn-action-edit" onClick={() => handleOpenEdit(item)}>Edit</button>
                          <button className="btn-action-delete" onClick={() => handleDelete(item._id)}>Delete</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 10. TRANSPORT BUSES TAB */}
        {activeTab === "buses" && (
          <div className="admin-card">
            <div className="admin-card-header">
              <h2 className="admin-card-title">🚌 Bus Routes & Transport</h2>
              <button className="btn-primary-add" onClick={handleOpenAdd}>
                + Add Bus Route
              </button>
            </div>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Bus No</th>
                    <th>Route Name & Stops</th>
                    <th>Driver Info</th>
                    <th>Capacity</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {buses.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: "center", color: "#64748b" }}>
                        No bus routes added yet.
                      </td>
                    </tr>
                  ) : (
                    buses.map((b) => (
                      <tr key={b._id}>
                        <td>
                          <img
                            src={b.image || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=60"}
                            alt={b.busNo}
                            style={{ width: "55px", height: "40px", objectFit: "cover", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                          />
                        </td>
                        <td><strong>{b.busNo}</strong></td>
                        <td>
                          <div style={{ fontWeight: "600" }}>{b.routeName}</div>
                          {Array.isArray(b.stops) && b.stops.length > 0 && (
                            <small style={{ color: "#64748b" }}>Stops: {b.stops.join(" → ")}</small>
                          )}
                        </td>
                        <td>
                          <div>{b.driverName}</div>
                          <small style={{ color: "#64748b" }}>{b.driverPhone}</small>
                        </td>
                        <td>{b.capacity || 40} seats</td>
                        <td>
                          <span
                            style={{
                              padding: "4px 10px",
                              borderRadius: "12px",
                              fontSize: "0.75rem",
                              fontWeight: "600",
                              background: (b.status || "Active") === "Active" ? "#dcfce7" : "#fee2e2",
                              color: (b.status || "Active") === "Active" ? "#166534" : "#991b1b"
                            }}
                          >
                            {b.status || "Active"}
                          </span>
                        </td>
                        <td>
                          <button className="btn-action-edit" onClick={() => handleOpenEdit(b)}>Edit</button>
                          <button className="btn-action-delete" onClick={() => handleDelete(b._id)}>Delete</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 11. FACILITIES TAB */}
        {activeTab === "facilities" && (
          <div className="admin-card">
            <div className="admin-card-header">
              <h2 className="admin-card-title">⚽ Facilities & Infrastructure Management</h2>
              <button className="btn-primary-add" onClick={handleOpenAdd}>
                + Add New Facility Card
              </button>
            </div>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Preview</th>
                    <th>Facility Title</th>
                    <th>Icon Category</th>
                    <th>Description</th>
                    <th>Photos Count</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {facilities.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center", color: "#64748b" }}>
                        No facilities added yet. Click '+ Add New Facility Card'.
                      </td>
                    </tr>
                  ) : (
                    facilities.map((fac) => (
                      <tr key={fac._id}>
                        <td>
                          {fac.images && fac.images.length > 0 ? (
                            <img
                              src={fac.images[0]}
                              alt={fac.title}
                              style={{ width: 65, height: 45, objectFit: "cover", borderRadius: 6, border: "1px solid #cbd5e1" }}
                              onError={(e) => { e.target.style.display = "none"; }}
                            />
                          ) : (
                            <div style={{ width: 65, height: 45, background: "#f1f5f9", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", color: "#64748b" }}>
                              No Image
                            </div>
                          )}
                        </td>
                        <td><strong>{fac.title}</strong></td>
                        <td>
                          <span style={{ textTransform: "capitalize", padding: "2px 10px", borderRadius: "12px", background: "#e0f2fe", color: "#0369a1", fontSize: "0.78rem", fontWeight: "600" }}>
                            {fac.iconType || "lab"}
                          </span>
                        </td>
                        <td>{fac.desc}</td>
                        <td>
                          <span className="badge-normal" style={{ padding: "2px 8px", borderRadius: "10px", fontSize: "0.78rem" }}>
                            🖼️ {fac.images ? fac.images.length : 0} Photos
                          </span>
                        </td>
                        <td>
                          <button className="btn-action-edit" onClick={() => handleOpenEdit(fac)}>Edit</button>
                          <button className="btn-action-delete" onClick={() => handleDelete(fac._id)}>Delete</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 12. ADMISSION, CONTACT & FOOTER DEDICATED EDITORS */}
        {activeTab === "contact" && (
          <div className="admin-card">
            {/* MAIN HUB SCREEN (SHOWS ONLY 3 OPTION CARDS WHEN contactSubTab IS null) */}
            {contactSubTab === null && (
              <div>
                <div className="admin-card-header">
                  <h2 className="admin-card-title">📞 Contact, Admission & Footer Management Hub</h2>
                </div>
                <p style={{ color: "#64748b", marginBottom: "20px" }}>
                  Select an option below to manage its specific content, forms, helpline numbers, and social links:
                </p>

                <div className="contact-hub-grid">
                  {/* CARD 1: ADMISSION PAGE */}
                  <div className="contact-hub-card" onClick={() => setContactSubTab("admission")}>
                    <div>
                      <div className="contact-hub-icon admission">🎓</div>
                      <h3 className="contact-hub-title">Admission Page Editor</h3>
                      <p className="contact-hub-desc">
                        Edit admission hero titles, current session (2026-27), 4-step admission guide, downloadable prospectus PDF, and admission helpline numbers.
                      </p>
                    </div>
                    <button type="button" className="contact-hub-btn admission">
                      Open Admission Editor →
                    </button>
                  </div>

                  {/* CARD 2: CONTACT PAGE */}
                  <div className="contact-hub-card" onClick={() => setContactSubTab("contact")}>
                    <div>
                      <div className="contact-hub-icon contact">📞</div>
                      <h3 className="contact-hub-title">Contact Page Details</h3>
                      <p className="contact-hub-desc">
                        Edit campus location/address, primary & secondary phone numbers, official email address, office working hours, and Google Maps link.
                      </p>
                    </div>
                    <button type="button" className="contact-hub-btn contact">
                      Open Contact Editor →
                    </button>
                  </div>

                  {/* CARD 3: FOOTER & SOCIAL LINKS */}
                  <div className="contact-hub-card" onClick={() => setContactSubTab("footer")}>
                    <div>
                      <div className="contact-hub-icon footer">🦶</div>
                      <h3 className="contact-hub-title">Footer & Social Links</h3>
                      <p className="contact-hub-desc">
                        Edit footer about school paragraph, social media links (Instagram, Facebook, YouTube, Twitter), WhatsApp number, and copyright notice.
                      </p>
                    </div>
                    <button type="button" className="contact-hub-btn footer">
                      Open Footer Editor →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* BACK BUTTON WHEN AN EDITOR IS ACTIVE */}
            {contactSubTab !== null && (
              <button
                type="button"
                className="contact-back-btn"
                onClick={() => setContactSubTab(null)}
              >
                ← Back to Options Hub
              </button>
            )}

            {/* SUB-TAB 1: ADMISSION PAGE EDIT */}
            {contactSubTab === "admission" && (
              <div>
                <div className="admin-card-header">
                  <h2 className="admin-card-title">🎓 Admission Page Content & Helpline Editor</h2>
                </div>
                <p style={{ color: "#64748b", marginBottom: "20px" }}>
                  Edit all text, session titles, admission process steps, eligibility requirements, and helpline numbers displayed on the Admission page.
                </p>

                <form onSubmit={handleSaveSchoolInfo}>
                  {/* HERO & GENERAL INFO */}
                  <div style={{ background: "#f0f9ff", padding: "18px", borderRadius: "12px", border: "1px solid #bae6fd", marginBottom: "24px" }}>
                    <h3 style={{ fontSize: "1.05rem", color: "#0369a1", fontWeight: "700", marginBottom: "14px", borderBottom: "2px solid #bae6fd", paddingBottom: "6px" }}>
                      📢 Admission Hero Banner & General Info
                    </h3>

                    <div className="admin-form-group">
                      <label style={{ fontWeight: "600", color: "#0369a1" }}>Admission Page Main Title</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        placeholder="e.g. School Admissions Open for Academic Session 2026-27"
                        value={schoolInfo.admissionTitle || "School Admissions Open for Academic Session 2026-27"}
                        onChange={(e) => setSchoolInfo({ ...schoolInfo, admissionTitle: e.target.value })}
                      />
                    </div>

                    <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div className="admin-form-group">
                        <label style={{ fontWeight: "600", color: "#0369a1" }}>Admission Subtitle / Tagline</label>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="e.g. Empowering Young Minds With Excellence & Values"
                          value={schoolInfo.admissionSubtitle || "Empowering Young Minds With Excellence & Values"}
                          onChange={(e) => setSchoolInfo({ ...schoolInfo, admissionSubtitle: e.target.value })}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label style={{ fontWeight: "600", color: "#0369a1" }}>Current Session Year</label>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="e.g. 2026-2027"
                          value={schoolInfo.admissionSession || "2026-2027"}
                          onChange={(e) => setSchoolInfo({ ...schoolInfo, admissionSession: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="admin-form-group">
                      <label style={{ fontWeight: "600", color: "#0369a1" }}>Admission Prospectus / PDF Download Link</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        placeholder="https://example.com/prospectus.pdf"
                        value={schoolInfo.admissionPdfUrl || ""}
                        onChange={(e) => setSchoolInfo({ ...schoolInfo, admissionPdfUrl: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* DYNAMIC ADMISSION PROCESS STEPS MANAGER */}
                  <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "14px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "2px solid #cbd5e1", paddingBottom: "10px" }}>
                      <h3 style={{ fontSize: "1.05rem", color: "#0f172a", fontWeight: "700", margin: 0 }}>
                        📝 Admission Process Steps ({getActiveAdmissionSteps().length} Steps)
                      </h3>
                      <button
                        type="button"
                        className="btn-primary-add"
                        style={{ padding: "8px 16px", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "6px" }}
                        onClick={handleAddAdmissionStep}
                      >
                        ➕ Add New Admission Step
                      </button>
                    </div>

                    <p style={{ fontSize: "0.88rem", color: "#64748b", marginBottom: "16px" }}>
                      Add unlimited admission process steps. Edit titles, descriptions, or delete any step anytime.
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      {getActiveAdmissionSteps().map((step, idx) => (
                        <div key={idx} style={{ background: "#ffffff", padding: "16px", borderRadius: "12px", border: "1.5px solid #cbd5e1", boxShadow: "0 2px 6px rgba(0,0,0,0.03)" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                            <span style={{ fontWeight: "700", color: "#1e40af", fontSize: "0.95rem" }}>
                              📍 Step #{idx + 1}
                            </span>
                            {getActiveAdmissionSteps().length > 1 && (
                              <button
                                type="button"
                                className="btn-action-delete"
                                style={{ padding: "5px 12px", fontSize: "0.8rem" }}
                                onClick={() => handleDeleteAdmissionStep(idx)}
                              >
                                🗑️ Delete Step
                              </button>
                            )}
                          </div>

                          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                            <div className="admin-form-group" style={{ marginBottom: 0 }}>
                              <label style={{ fontWeight: "600", color: "#334155", fontSize: "0.85rem" }}>Step Title</label>
                              <input
                                type="text"
                                className="admin-form-control"
                                placeholder={`Step ${idx + 1}: Registration Form Submission`}
                                value={step.title || ""}
                                onChange={(e) => handleUpdateAdmissionStep(idx, "title", e.target.value)}
                              />
                            </div>

                            <div className="admin-form-group" style={{ marginBottom: 0 }}>
                              <label style={{ fontWeight: "600", color: "#334155", fontSize: "0.85rem" }}>Step Description / Detail</label>
                              <input
                                type="text"
                                className="admin-form-control"
                                placeholder="Detailed guidelines or instructions..."
                                value={step.desc || ""}
                                onChange={(e) => handleUpdateAdmissionStep(idx, "desc", e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ADMISSION HELPLINE NUMBERS */}
                  <div style={{ background: "#fefce8", padding: "18px", borderRadius: "12px", border: "1px solid #fef08a", marginBottom: "24px" }}>
                    <h3 style={{ fontSize: "1.05rem", color: "#854d0e", fontWeight: "700", marginBottom: "14px", borderBottom: "2px solid #fef08a", paddingBottom: "6px" }}>
                      📞 Admission Helpline Numbers & Office Desk
                    </h3>

                    <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div className="admin-form-group">
                        <label style={{ fontWeight: "600", color: "#854d0e" }}>Admission Helpline Number 1</label>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="Enter helpline phone number 1..."
                          value={schoolInfo.admissionPhone1 || ""}
                          onChange={(e) => setSchoolInfo({ ...schoolInfo, admissionPhone1: e.target.value })}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label style={{ fontWeight: "600", color: "#854d0e" }}>Admission Helpline Number 2</label>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="Enter helpline phone number 2..."
                          value={schoolInfo.admissionPhone2 || ""}
                          onChange={(e) => setSchoolInfo({ ...schoolInfo, admissionPhone2: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div className="admin-form-group">
                        <label style={{ fontWeight: "600", color: "#854d0e" }}>WhatsApp Inquiry Number</label>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="Enter WhatsApp inquiry number..."
                          value={schoolInfo.whatsappPhone || ""}
                          onChange={(e) => setSchoolInfo({ ...schoolInfo, whatsappPhone: e.target.value })}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label style={{ fontWeight: "600", color: "#854d0e" }}>Admission Desk Email</label>
                        <input
                          type="email"
                          className="admin-form-control"
                          placeholder="Enter admission desk email address..."
                          value={schoolInfo.admissionEmail || ""}
                          onChange={(e) => setSchoolInfo({ ...schoolInfo, admissionEmail: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary-add" style={{ padding: "12px 28px", fontSize: "1rem", fontWeight: "700" }}>
                    💾 Save Admission Page Settings
                  </button>
                </form>
              </div>
            )}

            {/* SUB-TAB 2: CONTACT PAGE EDIT */}
            {contactSubTab === "contact" && (
              <div>
                <div className="admin-card-header">
                  <h2 className="admin-card-title">📞 Contact Page Location, Phone, Email & Maps Editor</h2>
                </div>
                <p style={{ color: "#64748b", marginBottom: "20px" }}>
                  Edit campus address, primary/secondary contact numbers, email address, Google Maps link, and office hours displayed on the Contact page.
                </p>

                <form onSubmit={handleSaveSchoolInfo}>
                  <div style={{ background: "#f8fafc", padding: "18px", borderRadius: "12px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
                    <div className="admin-form-group">
                      <label style={{ fontWeight: "600", color: "#334155" }}>Full Campus Address / Location</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        placeholder="Enter full campus address / location..."
                        value={schoolInfo.address || ""}
                        onChange={(e) => setSchoolInfo({ ...schoolInfo, address: e.target.value })}
                      />
                    </div>

                    <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div className="admin-form-group">
                        <label style={{ fontWeight: "600", color: "#334155" }}>Primary Contact Phone Number</label>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="Enter primary contact phone number..."
                          value={schoolInfo.phone || ""}
                          onChange={(e) => setSchoolInfo({ ...schoolInfo, phone: e.target.value })}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label style={{ fontWeight: "600", color: "#334155" }}>Secondary Contact Phone Number</label>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="Enter secondary contact phone number..."
                          value={schoolInfo.admissionPhone2 || ""}
                          onChange={(e) => setSchoolInfo({ ...schoolInfo, admissionPhone2: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div className="admin-form-group">
                        <label style={{ fontWeight: "600", color: "#334155" }}>Official Contact Email Address</label>
                        <input
                          type="email"
                          className="admin-form-control"
                          placeholder="Enter official contact email address..."
                          value={schoolInfo.email || ""}
                          onChange={(e) => setSchoolInfo({ ...schoolInfo, email: e.target.value })}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label style={{ fontWeight: "600", color: "#334155" }}>Office Working Hours</label>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="Enter office working hours..."
                          value={schoolInfo.officeHours || ""}
                          onChange={(e) => setSchoolInfo({ ...schoolInfo, officeHours: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="admin-form-group">
                      <label style={{ fontWeight: "600", color: "#334155" }}>Google Maps Live Location Embed URL</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        placeholder="Enter Google Maps live location embed URL..."
                        value={schoolInfo.googleMapsUrl || ""}
                        onChange={(e) => setSchoolInfo({ ...schoolInfo, googleMapsUrl: e.target.value })}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-primary-add" style={{ padding: "12px 28px", fontSize: "1rem", fontWeight: "700" }}>
                    💾 Save Contact Page Details
                  </button>
                </form>
              </div>
            )}

            {/* SUB-TAB 3: FOOTER EDIT */}
            {contactSubTab === "footer" && (
              <div>
                <div className="admin-card-header">
                  <h2 className="admin-card-title">🦶 Footer Content, Social Media Links & Info Editor</h2>
                </div>
                <p style={{ color: "#64748b", marginBottom: "20px" }}>
                  Edit footer about paragraph, social media links (Instagram, Facebook, YouTube), WhatsApp number, contact numbers, email, location, and copyright notice.
                </p>

                <form onSubmit={handleSaveSchoolInfo}>
                  <div style={{ background: "#fefce8", padding: "18px", borderRadius: "12px", border: "1px solid #fef08a", marginBottom: "24px" }}>
                    <h3 style={{ fontSize: "1.05rem", color: "#854d0e", fontWeight: "700", marginBottom: "14px", borderBottom: "2px solid #fef08a", paddingBottom: "6px" }}>
                      📝 Footer Description & Copyright Notice
                    </h3>

                    <div className="admin-form-group">
                      <label style={{ fontWeight: "600", color: "#854d0e" }}>Footer About School Description</label>
                      <textarea
                        rows="3"
                        className="admin-form-control"
                        placeholder="Enter footer about school description..."
                        value={schoolInfo.footerText || ""}
                        onChange={(e) => setSchoolInfo({ ...schoolInfo, footerText: e.target.value })}
                      ></textarea>
                    </div>

                    <div className="admin-form-group">
                      <label style={{ fontWeight: "600", color: "#854d0e" }}>Footer Copyright Line</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        placeholder="Enter copyright notice..."
                        value={schoolInfo.copyrightText ?? ""}
                        onChange={(e) => setSchoolInfo({ ...schoolInfo, copyrightText: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ background: "#f0fdf4", padding: "18px", borderRadius: "12px", border: "1px solid #bbf7d0", marginBottom: "24px" }}>
                    <h3 style={{ fontSize: "1.05rem", color: "#166534", fontWeight: "700", marginBottom: "14px", borderBottom: "2px solid #bbf7d0", paddingBottom: "6px" }}>
                      📞 Footer Contact Details (Phone, WhatsApp, Email & Address)
                    </h3>

                    <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div className="admin-form-group">
                        <label style={{ fontWeight: "600", color: "#166534" }}>Footer Primary Contact Phone</label>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="Enter primary contact phone..."
                          value={schoolInfo.phone || ""}
                          onChange={(e) => setSchoolInfo({ ...schoolInfo, phone: e.target.value })}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label style={{ fontWeight: "600", color: "#166534" }}>Footer WhatsApp Helpline Number</label>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="Enter WhatsApp helpline number..."
                          value={schoolInfo.whatsappPhone || ""}
                          onChange={(e) => setSchoolInfo({ ...schoolInfo, whatsappPhone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div className="admin-form-group">
                        <label style={{ fontWeight: "600", color: "#166534" }}>Footer Email Address</label>
                        <input
                          type="email"
                          className="admin-form-control"
                          placeholder="Enter footer email address..."
                          value={schoolInfo.email || ""}
                          onChange={(e) => setSchoolInfo({ ...schoolInfo, email: e.target.value })}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label style={{ fontWeight: "600", color: "#166534" }}>Footer Short Address / Location</label>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="Enter short address / location..."
                          value={schoolInfo.address || ""}
                          onChange={(e) => setSchoolInfo({ ...schoolInfo, address: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ background: "#fef2f2", padding: "18px", borderRadius: "12px", border: "1px solid #fecaca", marginBottom: "24px" }}>
                    <h3 style={{ fontSize: "1.05rem", color: "#991b1b", fontWeight: "700", marginBottom: "14px", borderBottom: "2px solid #fecaca", paddingBottom: "6px" }}>
                      🌐 Social Media Profile Links
                    </h3>

                    <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div className="admin-form-group">
                        <label style={{ fontWeight: "600", color: "#991b1b" }}>Instagram Profile Link</label>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="https://instagram.com/..."
                          value={schoolInfo.instagramUrl || ""}
                          onChange={(e) => setSchoolInfo({ ...schoolInfo, instagramUrl: e.target.value })}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label style={{ fontWeight: "600", color: "#991b1b" }}>Facebook Page Link</label>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="https://facebook.com/..."
                          value={schoolInfo.facebookUrl || ""}
                          onChange={(e) => setSchoolInfo({ ...schoolInfo, facebookUrl: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div className="admin-form-group">
                        <label style={{ fontWeight: "600", color: "#991b1b" }}>YouTube Channel Link</label>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="https://youtube.com/..."
                          value={schoolInfo.youtubeUrl || ""}
                          onChange={(e) => setSchoolInfo({ ...schoolInfo, youtubeUrl: e.target.value })}
                        />
                      </div>

                      <div className="admin-form-group">
                        <label style={{ fontWeight: "600", color: "#991b1b" }}>Twitter / X Link</label>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="https://twitter.com/..."
                          value={schoolInfo.twitterUrl || ""}
                          onChange={(e) => setSchoolInfo({ ...schoolInfo, twitterUrl: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary-add" style={{ padding: "12px 28px", fontSize: "1rem", fontWeight: "700" }}>
                    💾 Save Footer & Social Media Settings
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* 13. NAVBAR LINKS BUILDER TAB */}
        {activeTab === "navbar" && (
          <div className="admin-card">
            <div className="admin-card-header">
              <h2 className="admin-card-title">🌐 Navbar Navigation Links & Menu Builder</h2>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <button
                  className="btn-action-edit"
                  style={{ background: "#e2e8f0", color: "#334155" }}
                  onClick={handleResetNavbarDefaults}
                >
                  🔄 Reset to Default Navbar
                </button>
                <button className="btn-primary-add" onClick={handleOpenAdd}>
                  + Add Nav Link
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Nav Title</th>
                    <th>Path / URL</th>
                    <th>Parent Menu</th>
                    <th>Visibility</th>
                    <th>Reorder</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {navItems.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: "center", color: "#64748b" }}>
                        No navbar items found. Click '+ Add Nav Link' or 'Reset to Default Navbar'.
                      </td>
                    </tr>
                  ) : (
                    navItems.map((item, index) => {
                      const parent = navItems.find((p) => p._id === item.parentId);
                      return (
                        <tr key={item._id} className={item.parentId ? "nav-child-row" : ""}>
                          <td>
                            <strong>#{item.order || index + 1}</strong>
                          </td>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              {item.parentId && <span className="nav-indent-arrow">↳</span>}
                              <strong>{item.title}</strong>
                              {item.isButton && <span className="badge-btn-highlight">Button CTA</span>}
                              {item.isExternal && <span className="badge-external">External ↗</span>}
                            </div>
                          </td>
                          <td>
                            <code style={{ background: "#f1f5f9", padding: "2px 6px", borderRadius: "4px", fontSize: "0.85rem" }}>
                              {item.path}
                            </code>
                          </td>
                          <td>
                            {parent ? (
                              <span className="badge-parent-link">Sub-item of: {parent.title}</span>
                            ) : (
                              <span style={{ color: "#64748b", fontSize: "0.85rem" }}>Top Level</span>
                            )}
                          </td>
                          <td>
                            <button
                              className={`status-badge-btn ${item.isActive ? "badge-active" : "badge-inactive"}`}
                              onClick={() => handleToggleNavActive(item)}
                              title="Click to toggle visibility"
                            >
                              {item.isActive ? "👁️ Visible" : "🙈 Hidden"}
                            </button>
                          </td>
                          <td>
                            <div style={{ display: "flex", gap: "2px" }}>
                              <button
                                className="btn-order"
                                disabled={index === 0}
                                onClick={() => handleMoveNavItem(index, "up")}
                                title="Move Up"
                              >
                                ▲
                              </button>
                              <button
                                className="btn-order"
                                disabled={index === navItems.length - 1}
                                onClick={() => handleMoveNavItem(index, "down")}
                                title="Move Down"
                              >
                                ▼
                              </button>
                            </div>
                          </td>
                          <td>
                            <button className="btn-action-edit" onClick={() => handleOpenEdit(item)}>
                              Edit
                            </button>
                            <button className="btn-action-delete" onClick={() => handleDelete(item._id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* MODAL DIALOG FOR ADD / EDIT */}
      {modalOpen && currentItem && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>
                {modalMode === "add" ? "Add New Record" : "Edit Record"} (
                {(
                  currentItem._type === "home"
                    ? "NOTICES & ANNOUNCEMENT"
                    : currentItem._type === "sliders"
                      ? "HERO SLIDER"
                      : activeTab
                ).toUpperCase()}
                )
              </h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}>
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmitModal}>
              {/* HOME NOTICE FORM */}
              {(currentItem._type === "home" || activeTab === "home" || (currentItem.content !== undefined && currentItem.subtitle === undefined)) && (
                <>
                  <div className="admin-form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      required
                      value={currentItem.title || ""}
                      onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Content</label>
                    <textarea
                      rows="3"
                      className="admin-form-control"
                      required
                      value={currentItem.content || ""}
                      onChange={(e) => setCurrentItem({ ...currentItem, content: e.target.value })}
                    ></textarea>
                  </div>
                </>
              )}

              {/* GALLERY FORM */}
              {activeTab === "gallery" && (
                <>
                  <div className="admin-form-group">
                    <label>Card / Photo Title</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      required
                      placeholder="Enter photo or video card title..."
                      value={currentItem.title || ""}
                      onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Media Type</label>
                    <select
                      className="admin-form-control"
                      value={currentItem.mediaType || "photo"}
                      onChange={(e) => setCurrentItem({ ...currentItem, mediaType: e.target.value })}
                    >
                      <option value="photo">Photo (Picture Card)</option>
                      <option value="video">Video Card</option>
                    </select>
                  </div>
                  <div className="admin-form-group" style={{ background: "#f8fafc", padding: "10px", borderRadius: "8px", border: "1px dashed #cbd5e1" }}>
                    <label style={{ fontWeight: "600", color: "#1e293b" }}>📁 Option 1: Choose File from PC / Mobile</label>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      className="admin-form-control"
                      onChange={handleGalleryFileUpload}
                    />
                    <small style={{ color: "#64748b", fontSize: "0.75rem" }}>Select an image file or video file from your computer.</small>
                  </div>

                  <div className="admin-form-group">
                    <label style={{ fontWeight: "600", color: "#1e293b" }}>🔗 Option 2: Or Paste Photo / YouTube Video Link</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="https://images.unsplash.com/... or https://www.youtube.com/watch?v=..."
                      value={currentItem.url || ""}
                      onChange={(e) => setCurrentItem({ ...currentItem, url: e.target.value })}
                    />
                  </div>

                  {currentItem.mediaType === "video" && (
                    <div className="admin-form-group">
                      <label>Video Poster Cover Image URL (Optional)</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        placeholder="https://..."
                        value={currentItem.posterUrl || ""}
                        onChange={(e) => setCurrentItem({ ...currentItem, posterUrl: e.target.value })}
                      />
                    </div>
                  )}

                  {currentItem.url && (
                    <div className="admin-form-group">
                      <label style={{ fontWeight: "600", color: "#1e293b" }}>Live Media Preview</label>
                      <div style={{ marginTop: "6px", textAlign: "center", background: "#0f172a", padding: "10px", borderRadius: "8px" }}>
                        {currentItem.mediaType === "video" || isEmbedVideoUrl(currentItem.url) ? (
                          isEmbedVideoUrl(currentItem.url) ? (
                            <iframe
                              src={getEmbedVideoUrl(currentItem.url)}
                              title="Preview"
                              width="100%"
                              height="200px"
                              style={{ border: "none", borderRadius: "6px" }}
                              allowFullScreen
                            />
                          ) : (
                            <video src={currentItem.url} controls style={{ maxHeight: "180px", maxWidth: "100%" }} />
                          )
                        ) : (
                          <img
                            src={currentItem.url}
                            alt="Preview"
                            style={{ maxHeight: "160px", maxWidth: "100%", borderRadius: "6px", objectFit: "contain" }}
                            onError={(e) => { e.target.style.display = "none"; }}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* FACILITIES FORM */}
              {activeTab === "facilities" && (
                <>
                  <div className="admin-form-group">
                    <label>Facility Title</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      required
                      placeholder="Enter facility title..."
                      value={currentItem.title || ""}
                      onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Short Description</label>
                    <textarea
                      rows="2"
                      className="admin-form-control"
                      required
                      placeholder="Enter facility description..."
                      value={currentItem.desc || ""}
                      onChange={(e) => setCurrentItem({ ...currentItem, desc: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="admin-form-group">
                    <label>Icon Type / Category</label>
                    <select
                      className="admin-form-control"
                      value={currentItem.iconType || "leaf"}
                      onChange={(e) => setCurrentItem({ ...currentItem, iconType: e.target.value })}
                    >
                      <option value="leaf">🌿 Biology / Leaf Icon</option>
                      <option value="atom">⚛️ Physics / Atom Icon</option>
                      <option value="flask">🧪 Chemistry / Flask Icon</option>
                      <option value="palette">🎨 Arts / Palette Icon</option>
                      <option value="home">🏠 Hostel / Home Icon</option>
                      <option value="bus">🚌 Transport / Bus Icon</option>
                      <option value="running">🏃 Sports / Running Icon</option>
                      <option value="teacher">👨‍🏫 Teachers / Mentor Icon</option>
                    </select>
                  </div>

                  {/* LOCAL FILE UPLOAD SECTION */}
                  <div className="admin-form-group" style={{ background: "#f8fafc", padding: "12px", borderRadius: "8px", border: "1px dashed #cbd5e1" }}>
                    <label style={{ fontWeight: "600", color: "#1e293b", display: "block", marginBottom: "6px" }}>
                      📁 Upload Photo Files (From PC / Mobile)
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="admin-form-control"
                      onChange={handleFacilityFileUpload}
                    />
                    <small style={{ color: "#64748b", fontSize: "0.78rem", display: "block", marginTop: "4px" }}>
                      Select one or multiple photo files to upload directly into gallery preview.
                    </small>
                  </div>

                  {/* DYNAMIC IMAGE WEB URL INPUT BOXES */}
                  <div className="admin-form-group" style={{ marginTop: "1rem" }}>
                    <label style={{ fontWeight: "600", color: "#1e293b", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span>🔗 Add Photo Web Links (Auto-creates next box)</span>
                      <button
                        type="button"
                        onClick={() => {
                          const urls = [...(currentItem.webImageUrls || []), ""];
                          setCurrentItem({ ...currentItem, webImageUrls: urls });
                        }}
                        style={{ background: "#e0f2fe", color: "#0284c7", border: "none", borderRadius: "6px", padding: "4px 10px", fontSize: "0.78rem", fontWeight: "600", cursor: "pointer" }}
                      >
                        + Add Photo Link Box
                      </button>
                    </label>

                    {(currentItem.webImageUrls || [""]).map((url, idx) => (
                      <div key={idx} style={{ display: "flex", gap: "8px", marginTop: "8px", alignItems: "center" }}>
                        <span style={{ fontSize: "0.8rem", color: "#64748b", minWidth: "24px" }}>#{idx + 1}</span>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder={`Photo Link #${idx + 1} (e.g. https://images.unsplash.com/...)`}
                          value={url}
                          onChange={(e) => {
                            const val = e.target.value;
                            const updated = [...(currentItem.webImageUrls || [""])];
                            updated[idx] = val;
                            if (idx === updated.length - 1 && val.trim() !== "") {
                              updated.push("");
                            }
                            const validWeb = updated.filter(u => u.trim() !== "");
                            const existingNonWeb = (currentItem.images || []).filter(img => img.startsWith("data:"));
                            setCurrentItem({
                              ...currentItem,
                              webImageUrls: updated,
                              images: Array.from(new Set([...existingNonWeb, ...validWeb]))
                            });
                          }}
                        />
                        {((currentItem.webImageUrls || []).length > 1 || url !== "") && (
                          <button
                            type="button"
                            onClick={() => {
                              const removedUrl = currentItem.webImageUrls[idx];
                              const updated = currentItem.webImageUrls.filter((_, i) => i !== idx);
                              if (updated.length === 0) updated.push("");
                              const newImgs = (currentItem.images || []).filter(img => img !== removedUrl);
                              setCurrentItem({
                                ...currentItem,
                                webImageUrls: updated,
                                images: newImgs
                              });
                            }}
                            style={{ background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "6px", padding: "8px 12px", cursor: "pointer", fontWeight: "bold" }}
                            title="Remove Link Box"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* DYNAMIC VIDEO URL & FILE UPLOAD INPUT BOXES */}
                  <div className="admin-form-group" style={{ marginTop: "1rem" }}>
                    <label style={{ fontWeight: "600", color: "#1e293b", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span>🎥 Add Tour Videos (YouTube Link, MP4 Link, or Pick Video File)</span>
                      <button
                        type="button"
                        onClick={() => {
                          const vids = [...(currentItem.videos || []), { title: "", url: "" }];
                          setCurrentItem({ ...currentItem, videos: vids });
                        }}
                        style={{ background: "#fef3c7", color: "#d97706", border: "none", borderRadius: "6px", padding: "4px 10px", fontSize: "0.78rem", fontWeight: "600", cursor: "pointer" }}
                      >
                        + Add Video Box
                      </button>
                    </label>

                    {(currentItem.videos || [{ title: "", url: "" }]).map((vid, idx) => (
                      <div key={idx} style={{ background: "#fafafa", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", marginTop: "8px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                          <span style={{ fontSize: "0.82rem", fontWeight: "600", color: "#334155" }}>📹 Video #{idx + 1}</span>
                          {((currentItem.videos || []).length > 1 || vid.url !== "" || vid.title !== "") && (
                            <button
                              type="button"
                              onClick={() => {
                                const updated = currentItem.videos.filter((_, i) => i !== idx);
                                if (updated.length === 0) updated.push({ title: "", url: "" });
                                setCurrentItem({ ...currentItem, videos: updated });
                              }}
                              style={{ background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "4px", padding: "4px 10px", fontSize: "0.75rem", cursor: "pointer", fontWeight: "600" }}
                            >
                              Delete Video
                            </button>
                          )}
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "8px", marginBottom: "8px" }}>
                          <div>
                            <label style={{ fontSize: "0.75rem", color: "#64748b", display: "block", marginBottom: "2px" }}>Video Title</label>
                            <input
                              type="text"
                              className="admin-form-control"
                              placeholder="e.g. Lab Tour Video"
                              value={vid.title || ""}
                              onChange={(e) => {
                                const val = e.target.value;
                                setCurrentItem((prev) => {
                                  const updated = [...(prev.videos || [{ title: "", url: "" }])];
                                  updated[idx] = { ...updated[idx], title: val };
                                  return {
                                    ...prev,
                                    videos: updated,
                                    videoUrl: updated[0]?.url || "",
                                    videoTitle: updated[0]?.title || ""
                                  };
                                });
                              }}
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: "0.75rem", color: "#64748b", display: "block", marginBottom: "2px" }}>YouTube or Direct Video URL</label>
                            <input
                              type="text"
                              className="admin-form-control"
                              placeholder="https://www.youtube.com/watch?v=... or https://..."
                              value={vid.url || ""}
                              onChange={(e) => {
                                const val = e.target.value;
                                setCurrentItem((prev) => {
                                  const updated = [...(prev.videos || [{ title: "", url: "" }])];
                                  updated[idx] = { ...updated[idx], url: val };
                                  if (idx === updated.length - 1 && val.trim() !== "") {
                                    updated.push({ title: "", url: "" });
                                  }
                                  return {
                                    ...prev,
                                    videos: updated,
                                    videoUrl: updated[0]?.url || "",
                                    videoTitle: updated[0]?.title || ""
                                  };
                                });
                              }}
                            />
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "0.75rem", color: "#64748b" }}>📁 Or Upload Video File from PC:</span>
                          <input
                            type="file"
                            accept="video/*"
                            style={{ fontSize: "0.75rem" }}
                            onChange={(e) => handleVideoFileUpload(e, idx)}
                          />
                        </div>

                        {/* LIVE VIDEO PREVIEW */}
                        {vid.url && (
                          <div style={{ marginTop: "10px", background: "#0f172a", padding: "8px", borderRadius: "6px" }}>
                            {isEmbedVideoUrl(vid.url) ? (
                              <iframe
                                src={getEmbedVideoUrl(vid.url)}
                                title={`Video Preview ${idx + 1}`}
                                width="100%"
                                height="180px"
                                style={{ border: "none", borderRadius: "4px" }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            ) : (
                              <video
                                src={vid.url}
                                controls
                                style={{ width: "100%", maxHeight: "160px", borderRadius: "4px" }}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* LIVE IMAGES PREVIEW THUMBNAILS GRID */}
                  {(() => {
                    const displayImgs = Array.from(
                      new Set((currentItem.images || []).filter((img) => typeof img === "string" && img.trim() !== ""))
                    );
                    if (displayImgs.length === 0) return null;
                    return (
                      <div className="admin-form-group" style={{ marginTop: "1rem" }}>
                        <label style={{ fontWeight: "600", color: "#1e293b" }}>
                          🖼️ Photos Gallery Preview ({displayImgs.length} Photos)
                        </label>
                        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "6px", background: "#f8fafc", padding: "14px", borderRadius: "10px", border: "1px dashed #cbd5e1" }}>
                          {displayImgs.map((img, idx) => (
                            <div key={idx} style={{ position: "relative", display: "inline-block", margin: "4px" }}>
                              <img
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 2px 4px rgba(0,0,0,0.06)", display: "block" }}
                                onError={(e) => {
                                  if (e.target.parentElement) e.target.parentElement.style.display = "none";
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newImgs = (currentItem.images || []).filter(imgStr => imgStr !== img);
                                  const newUploaded = (currentItem.uploadedImages || []).filter(imgStr => imgStr !== img);
                                  const newWeb = (currentItem.webImageUrls || []).filter(imgStr => imgStr !== img);
                                  if (newWeb.length === 0) newWeb.push("");
                                  setCurrentItem({
                                    ...currentItem,
                                    images: newImgs,
                                    uploadedImages: newUploaded,
                                    webImageUrls: newWeb
                                  });
                                }}
                                style={{
                                  position: "absolute",
                                  top: "-8px",
                                  right: "-8px",
                                  background: "#ef4444",
                                  color: "#ffffff",
                                  border: "2px solid #ffffff",
                                  borderRadius: "50%",
                                  width: "22px",
                                  height: "22px",
                                  cursor: "pointer",
                                  fontSize: "11px",
                                  fontWeight: "bold",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  boxShadow: "0 2px 4px rgba(239,68,68,0.3)",
                                  zIndex: 10
                                }}
                                title="Delete Photo"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </>
              )}

              {/* TEACHER FORM */}
              {activeTab === "teachers" && (
                <>
                  <div className="admin-form-group">
                    <label>Teacher Full Name</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      required
                      placeholder="e.g. Sitaram Jetiwal"
                      value={currentItem.name || ""}
                      onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                    />
                  </div>
                  <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="admin-form-group">
                      <label>Subject Taught</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        required
                        placeholder="e.g. Physics"
                        value={currentItem.subject || ""}
                        onChange={(e) => setCurrentItem({ ...currentItem, subject: e.target.value })}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Qualification</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        required
                        placeholder="e.g. M.Sc Physics, B.Ed"
                        value={currentItem.qualification || ""}
                        onChange={(e) => setCurrentItem({ ...currentItem, qualification: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                    <div className="admin-form-group">
                      <label>Experience</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        required
                        placeholder="e.g. 18 yrs"
                        value={currentItem.experience || "5 yrs"}
                        onChange={(e) => setCurrentItem({ ...currentItem, experience: e.target.value })}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        placeholder="e.g. +91 9829739603"
                        value={currentItem.phone || ""}
                        onChange={(e) => setCurrentItem({ ...currentItem, phone: e.target.value })}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Gender</label>
                      <select
                        className="admin-form-control"
                        value={currentItem.gender || "male"}
                        onChange={(e) => setCurrentItem({ ...currentItem, gender: e.target.value })}
                      >
                        <option value="male">👨 Male Teacher</option>
                        <option value="female">👩 Female Teacher</option>
                      </select>
                    </div>
                  </div>

                  <div className="admin-form-group" style={{ background: "#f8fafc", padding: "10px", borderRadius: "8px", border: "1px dashed #cbd5e1" }}>
                    <label style={{ fontWeight: "600", color: "#1e293b" }}>📁 Option 1: Choose Teacher Photo File (From PC / Mobile)</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="admin-form-control"
                      onChange={handleTeacherFileUpload}
                    />
                    <small style={{ color: "#64748b", fontSize: "0.75rem" }}>Select a photo file of the teacher from your device.</small>
                  </div>

                  <div className="admin-form-group">
                    <label style={{ fontWeight: "600", color: "#1e293b" }}>🔗 Option 2: Or Enter Teacher Photo Web Link</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2..."
                      value={currentItem.image || ""}
                      onChange={(e) => setCurrentItem({ ...currentItem, image: e.target.value })}
                    />
                  </div>

                  {currentItem.image && (
                    <div className="admin-form-group">
                      <label style={{ fontWeight: "600", color: "#1e293b" }}>Teacher Photo Live Preview</label>
                      <div style={{ marginTop: "6px", textAlign: "center", background: "#f8fafc", padding: "10px", borderRadius: "8px", border: "1px dashed #cbd5e1" }}>
                        <img
                          src={currentItem.image}
                          alt="Teacher Preview"
                          style={{ maxHeight: "150px", maxWidth: "100%", borderRadius: "50%", objectFit: "cover" }}
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* BUS ROUTE FORM */}
              {activeTab === "buses" && (
                <>
                  <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="admin-form-group">
                      <label>Bus Number</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        required
                        placeholder="e.g. RJ-14-PA-1201"
                        value={currentItem.busNo || ""}
                        onChange={(e) => setCurrentItem({ ...currentItem, busNo: e.target.value })}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Route Name / Header</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        required
                        placeholder="e.g. Route A: Mansarovar — VT Road — Shipra Path"
                        value={currentItem.routeName || ""}
                        onChange={(e) => setCurrentItem({ ...currentItem, routeName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                    <div className="admin-form-group">
                      <label>Driver Name</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        required
                        placeholder="e.g. Rajendra Prasad"
                        value={currentItem.driverName || ""}
                        onChange={(e) => setCurrentItem({ ...currentItem, driverName: e.target.value })}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Driver Phone Number</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        required
                        placeholder="e.g. +91 98290-12345"
                        value={currentItem.driverPhone || ""}
                        onChange={(e) => setCurrentItem({ ...currentItem, driverPhone: e.target.value })}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Seating Capacity</label>
                      <input
                        type="number"
                        className="admin-form-control"
                        required
                        placeholder="e.g. 40"
                        value={currentItem.capacity || 40}
                        onChange={(e) => setCurrentItem({ ...currentItem, capacity: Number(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>Operational Status</label>
                    <select
                      className="admin-form-control"
                      value={currentItem.status || "Active"}
                      onChange={(e) => setCurrentItem({ ...currentItem, status: e.target.value })}
                    >
                      <option value="Active">🟢 Active (Running on Route)</option>
                      <option value="Maintenance">🔴 Maintenance (Under Repair)</option>
                    </select>
                  </div>

                  <div className="admin-form-group" style={{ background: "#f8fafc", padding: "10px", borderRadius: "8px", border: "1px dashed #cbd5e1" }}>
                    <label style={{ fontWeight: "600", color: "#1e293b" }}>📁 Option 1: Choose Bus Photo File (From PC / Mobile)</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="admin-form-control"
                      onChange={handleBusFileUpload}
                    />
                    <small style={{ color: "#64748b", fontSize: "0.75rem" }}>Select a bus image file from your device.</small>
                  </div>

                  <div className="admin-form-group">
                    <label style={{ fontWeight: "600", color: "#1e293b" }}>🔗 Option 2: Or Enter Bus Photo Web Link</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957..."
                      value={currentItem.image || ""}
                      onChange={(e) => setCurrentItem({ ...currentItem, image: e.target.value })}
                    />
                  </div>

                  {currentItem.image && (
                    <div className="admin-form-group">
                      <label style={{ fontWeight: "600", color: "#1e293b" }}>Bus Photo Live Preview</label>
                      <div style={{ marginTop: "6px", textAlign: "center", background: "#f8fafc", padding: "10px", borderRadius: "8px", border: "1px dashed #cbd5e1" }}>
                        <img
                          src={currentItem.image}
                          alt="Bus Preview"
                          style={{ maxHeight: "160px", maxWidth: "100%", borderRadius: "6px", objectFit: "cover" }}
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="admin-form-group">
                    <label style={{ fontWeight: "600", color: "#1e293b" }}>📍 Bus Stops Sequence (Comma Separated)</label>
                    <textarea
                      rows="2"
                      className="admin-form-control"
                      placeholder="Mansarovar, VT Road, Shipra Path, Kalyan Path, School"
                      value={currentItem.stops || ""}
                      onChange={(e) => setCurrentItem({ ...currentItem, stops: e.target.value })}
                    />
                    <small style={{ color: "#64748b", fontSize: "0.75rem" }}>Separate each stop with a comma (e.g. Stop 1, Stop 2, Stop 3, School)</small>
                  </div>
                </>
              )}

              {/* FEE STRUCTURE FORM */}
              {activeTab === "fees" && (
                <>
                  <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="admin-form-group">
                      <label>Class Grade Level / Name</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        required
                        placeholder="e.g. Class 10 or Class 11 (Science)"
                        value={currentItem.className || ""}
                        onChange={(e) => setCurrentItem({ ...currentItem, className: e.target.value })}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Payment Frequency / Term</label>
                      <select
                        className="admin-form-control"
                        value={currentItem.frequency || "Yearly"}
                        onChange={(e) => setCurrentItem({ ...currentItem, frequency: e.target.value })}
                      >
                        <option value="Yearly">📅 Yearly (Annual Fee)</option>
                        <option value="Quarterly">🗓️ Quarterly (Every 3 Months)</option>
                        <option value="Monthly">📆 Monthly</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                    <div className="admin-form-group">
                      <label>📘 Tuition Fee Only (₹)</label>
                      <input
                        type="number"
                        className="admin-form-control"
                        required
                        value={currentItem.tuitionFee || 0}
                        onChange={(e) => {
                          const tuition = Number(e.target.value);
                          const busNum = parseFeeNumber(currentItem.busFee);
                          const act = Number(currentItem.activityFee || 0);
                          setCurrentItem({ ...currentItem, tuitionFee: tuition, totalFee: tuition + busNum + act });
                        }}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>🚌 Bus & Transport Fee (₹ or Text)</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        placeholder="e.g. 1500 or According to your route"
                        value={currentItem.busFee ?? ""}
                        onChange={(e) => {
                          const busVal = e.target.value;
                          const busNum = parseFeeNumber(busVal);
                          const tuition = Number(currentItem.tuitionFee || 0);
                          const act = Number(currentItem.activityFee || 0);
                          setCurrentItem({ ...currentItem, busFee: busVal, totalFee: tuition + busNum + act });
                        }}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>🎨 Activity & Lab Fee (₹)</label>
                      <input
                        type="number"
                        className="admin-form-control"
                        value={currentItem.activityFee || 0}
                        onChange={(e) => {
                          const act = Number(e.target.value);
                          const tuition = Number(currentItem.tuitionFee || 0);
                          const busNum = parseFeeNumber(currentItem.busFee);
                          setCurrentItem({ ...currentItem, activityFee: act, totalFee: tuition + busNum + act });
                        }}
                      />
                    </div>
                  </div>

                  {/* Realtime Breakdown Box inside Modal */}
                  <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "8px", border: "1px dashed #cbd5e1", marginBottom: "15px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "4px" }}>
                      <span>📘 Tuition Fee Only:</span>
                      <strong style={{ color: "#2563eb" }}>₹{(Number(currentItem.tuitionFee) || 0).toLocaleString()}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "4px" }}>
                      <span>🚌 Bus & Transport Fee:</span>
                      <strong style={{ color: "#d97706" }}>{renderBusFee(currentItem.busFee)}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "4px" }}>
                      <span>🎨 Activity & Lab Fee:</span>
                      <strong style={{ color: "#059669" }}>₹{(Number(currentItem.activityFee) || 0).toLocaleString()}</strong>
                    </div>
                    <div style={{ borderTop: "1px dashed #cbd5e1", paddingTop: "4px", display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                      <strong>💰 Grand Total:</strong>
                      <strong style={{ color: "#16a34a" }}>₹{(Number(currentItem.totalFee) || ((Number(currentItem.tuitionFee) || 0) + parseFeeNumber(currentItem.busFee) + (Number(currentItem.activityFee) || 0))).toLocaleString()}</strong>
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>Description / Grade Level Details</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="e.g. Primary Section Grade 1 or Includes Science Lab Charges"
                      value={currentItem.description || ""}
                      onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                    />
                  </div>
                </>
              )}

              {/* ACADEMICS FORM */}
              {activeTab === "academics" && (
                <>
                  <div className="admin-form-group">
                    <label>Stream Unique Key / ID (e.g. science, arts, commerce, practical, discipline, competitive)</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      required
                      placeholder="e.g. science or robotics"
                      value={currentItem.streamId || ""}
                      onChange={(e) => setCurrentItem({ ...currentItem, streamId: e.target.value.toLowerCase().replace(/\s+/g, "_") })}
                    />
                  </div>

                  <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem" }}>
                    <div className="admin-form-group">
                      <label>Program / Stream Title</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        required
                        placeholder="e.g. Science Stream (Grade 11 & 12)"
                        value={currentItem.title || ""}
                        onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Display Order</label>
                      <input
                        type="number"
                        className="admin-form-control"
                        value={currentItem.order || 1}
                        onChange={(e) => setCurrentItem({ ...currentItem, order: Number(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>Program Subtitle / Tagline</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="e.g. Inquiry, Experimentation & Analytical Thinking"
                      value={currentItem.subtitle || ""}
                      onChange={(e) => setCurrentItem({ ...currentItem, subtitle: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Hero Banner Image URL</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="e.g. https://images.unsplash.com/photo-1532187643603-ba119ca4109e..."
                      value={currentItem.image || ""}
                      onChange={(e) => setCurrentItem({ ...currentItem, image: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Overview & Detailed Description</label>
                    <textarea
                      className="admin-form-control"
                      rows={4}
                      placeholder="Full overview text for this academic program..."
                      value={currentItem.overview || ""}
                      onChange={(e) => setCurrentItem({ ...currentItem, overview: e.target.value })}
                    />
                  </div>

                  {/* SUBJECTS LIST EDITOR */}
                  <div className="admin-form-group" style={{ background: "#f8fafc", padding: "14px", borderRadius: "10px", border: "1px solid #cbd5e1" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <strong style={{ fontSize: "0.95rem", color: "#1e293b" }}>📘 Curriculum & Subjects List</strong>
                      <button
                        type="button"
                        style={{ background: "#0284c7", color: "#fff", border: "none", padding: "4px 10px", borderRadius: "6px", fontSize: "0.8rem", cursor: "pointer" }}
                        onClick={() => {
                          const subs = [...(currentItem.subjects || []), { name: "", details: "" }];
                          setCurrentItem({ ...currentItem, subjects: subs });
                        }}
                      >
                        + Add Subject
                      </button>
                    </div>

                    {(currentItem.subjects || []).map((sub, sIdx) => (
                      <div key={sIdx} style={{ display: "grid", gridTemplateColumns: "1fr 2fr auto", gap: "8px", marginBottom: "8px", alignItems: "center" }}>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="Subject Name (e.g. Physics)"
                          value={sub.name || ""}
                          onChange={(e) => {
                            const newSubs = [...currentItem.subjects];
                            newSubs[sIdx].name = e.target.value;
                            setCurrentItem({ ...currentItem, subjects: newSubs });
                          }}
                        />
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="Details (e.g. Theoretical and experimental physics...)"
                          value={sub.details || ""}
                          onChange={(e) => {
                            const newSubs = [...currentItem.subjects];
                            newSubs[sIdx].details = e.target.value;
                            setCurrentItem({ ...currentItem, subjects: newSubs });
                          }}
                        />
                        <button
                          type="button"
                          style={{ background: "#ef4444", color: "#fff", border: "none", padding: "6px 10px", borderRadius: "6px", fontSize: "0.8rem", cursor: "pointer" }}
                          onClick={() => {
                            const newSubs = currentItem.subjects.filter((_, i) => i !== sIdx);
                            setCurrentItem({ ...currentItem, subjects: newSubs });
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* HIGHLIGHTS LIST EDITOR */}
                  <div className="admin-form-group" style={{ background: "#f8fafc", padding: "14px", borderRadius: "10px", border: "1px solid #cbd5e1", marginTop: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <strong style={{ fontSize: "0.95rem", color: "#1e293b" }}>⭐ Program Key Highlights</strong>
                      <button
                        type="button"
                        style={{ background: "#d97706", color: "#fff", border: "none", padding: "4px 10px", borderRadius: "6px", fontSize: "0.8rem", cursor: "pointer" }}
                        onClick={() => {
                          const highs = [...(currentItem.highlights || []), ""];
                          setCurrentItem({ ...currentItem, highlights: highs });
                        }}
                      >
                        + Add Highlight Line
                      </button>
                    </div>

                    {(currentItem.highlights || []).map((high, hIdx) => (
                      <div key={hIdx} style={{ display: "flex", gap: "8px", marginBottom: "8px", alignItems: "center" }}>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="Highlight line (e.g. Dedicated Physics, Chemistry & Biology Labs)"
                          value={high}
                          onChange={(e) => {
                            const newHighs = [...currentItem.highlights];
                            newHighs[hIdx] = e.target.value;
                            setCurrentItem({ ...currentItem, highlights: newHighs });
                          }}
                        />
                        <button
                          type="button"
                          style={{ background: "#ef4444", color: "#fff", border: "none", padding: "6px 10px", borderRadius: "6px", fontSize: "0.8rem", cursor: "pointer" }}
                          onClick={() => {
                            const newHighs = currentItem.highlights.filter((_, i) => i !== hIdx);
                            setCurrentItem({ ...currentItem, highlights: newHighs });
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* HERO SLIDERS FORM */}
              {(currentItem._type === "sliders" || (activeTab === "sliders" && currentItem.content === undefined && currentItem.streamId === undefined)) && (
                <>
                  <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem" }}>
                    <div className="admin-form-group">
                      <label>Slide Heading Title</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        required
                        placeholder="e.g. Welcome To Swami Vivekanand Sen. Sec. School"
                        value={currentItem.title || ""}
                        onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Display Order</label>
                      <input
                        type="number"
                        className="admin-form-control"
                        value={currentItem.order || 1}
                        onChange={(e) => setCurrentItem({ ...currentItem, order: Number(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>Slide Subtitle / Tagline</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="e.g. Quality Education For Bright Future"
                      value={currentItem.subtitle || ""}
                      onChange={(e) => setCurrentItem({ ...currentItem, subtitle: e.target.value })}
                    />
                  </div>

                  <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem" }}>
                    <div className="admin-form-group">
                      <label>Hero Banner Image URL</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        placeholder="e.g. https://images.unsplash.com/photo-1580582932707..."
                        value={currentItem.image || ""}
                        onChange={(e) => setCurrentItem({ ...currentItem, image: e.target.value })}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Upload Photo</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="admin-form-control"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              setCurrentItem({ ...currentItem, image: event.target.result });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>
                  </div>

                  {currentItem.image && (
                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ fontSize: "0.85rem", color: "#64748b" }}>Banner Image Preview:</label>
                      <br />
                      <img
                        src={currentItem.image}
                        alt="Hero Banner Preview"
                        style={{ width: "100%", maxHeight: "180px", objectFit: "cover", borderRadius: "8px", border: "1px solid #cbd5e1", marginTop: "4px" }}
                      />
                    </div>
                  )}

                  <div className="admin-form-group" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <input
                      type="checkbox"
                      id="heroActive"
                      checked={currentItem.isActive !== false}
                      onChange={(e) => setCurrentItem({ ...currentItem, isActive: e.target.checked })}
                    />
                    <label htmlFor="heroActive" style={{ cursor: "pointer", fontWeight: "600", color: "#1e293b" }}>
                      Active (Show this slide on Homepage Hero Banner)
                    </label>
                  </div>
                </>
              )}

              {/* CALENDAR FORM */}
              {activeTab === "calendar" && (
                <>
                  <div className="admin-form-group">
                    <label>Event / Holiday Title</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      required
                      placeholder="e.g. Independence Day Celebration"
                      value={currentItem.title || ""}
                      onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                    />
                  </div>
                  <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="admin-form-group">
                      <label>Event Date</label>
                      <input
                        type="date"
                        className="admin-form-control"
                        required
                        value={currentItem.date || ""}
                        onChange={(e) => setCurrentItem({ ...currentItem, date: e.target.value })}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Category Type</label>
                      <select
                        className="admin-form-control"
                        value={(currentItem.category || "event").toLowerCase()}
                        onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })}
                      >
                        <option value="event">📅 Academic Session / General Event</option>
                        <option value="holiday">🏖️ Holiday / Vacation</option>
                        <option value="exam">📝 Examination / Test</option>
                        <option value="celebration">🎉 Celebration / Festival</option>
                        <option value="activity">🏆 Activity / Exhibition / Sports</option>
                      </select>
                    </div>
                  </div>
                  <div className="admin-form-group">
                    <label>Description</label>
                    <textarea
                      className="admin-form-control"
                      rows="3"
                      placeholder="Brief details about the scheduled event or holiday..."
                      value={currentItem.description || ""}
                      onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                    />
                  </div>
                </>
              )}

              {/* TIMETABLE FORM */}
              {activeTab === "timetable" && (
                <>
                  <div className="admin-form-group">
                    <label>Schedule Category Tab</label>
                    <select
                      className="admin-form-control"
                      value={currentItem.category || "hours"}
                      onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })}
                    >
                      <option value="hours">⏳ School Operating Hours (Arrival, Assembly, Lunch, Dismissal)</option>
                      <option value="lectures">📖 Student Lecture Schedule (1st Lecture, 2nd Lecture...)</option>
                    </select>
                  </div>

                  <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="admin-form-group">
                      <label>{currentItem.category === "hours" ? "Event / Activity Title" : "Lecture Period Block"}</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        required
                        placeholder={currentItem.category === "hours" ? "e.g. Morning Assembly & Prayer" : "e.g. 1st Lecture"}
                        value={currentItem.periodOrTitle || ""}
                        onChange={(e) => setCurrentItem({ ...currentItem, periodOrTitle: e.target.value })}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Time Slot</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        required
                        placeholder="e.g. 08:00 AM - 08:30 AM"
                        value={currentItem.time || ""}
                        onChange={(e) => setCurrentItem({ ...currentItem, time: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>{currentItem.category === "hours" ? "Activity Description" : "Core Subject Example"}</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder={currentItem.category === "hours" ? "e.g. Physical drills, morning prayer, and daily news" : "e.g. Mathematics / Physics"}
                      value={currentItem.subjectOrDesc || ""}
                      onChange={(e) => setCurrentItem({ ...currentItem, subjectOrDesc: e.target.value })}
                    />
                  </div>

                  {currentItem.category === "lectures" && (
                    <div className="admin-form-group">
                      <label>Room / Location</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        placeholder="e.g. Standard Room, Science Lab, Language Lab"
                        value={currentItem.room || ""}
                        onChange={(e) => setCurrentItem({ ...currentItem, room: e.target.value })}
                      />
                    </div>
                  )}

                  <div className="admin-form-group">
                    <label>Display Sort Order Position</label>
                    <input
                      type="number"
                      className="admin-form-control"
                      required
                      value={currentItem.order || 1}
                      onChange={(e) => setCurrentItem({ ...currentItem, order: Number(e.target.value) })}
                    />
                  </div>
                </>
              )}

              {/* CLASSROOM FORM */}
              {activeTab === "classrooms" && (
                <>
                  <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="admin-form-group">
                      <label>Room Number / Title</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        required
                        placeholder="e.g. Room 101 or Science Lab 1"
                        value={currentItem.roomNo || ""}
                        onChange={(e) => setCurrentItem({ ...currentItem, roomNo: e.target.value })}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Assigned To / Class Section</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        required
                        placeholder="e.g. Class 10-A (Science Stream)"
                        value={currentItem.assignedTo || ""}
                        onChange={(e) => setCurrentItem({ ...currentItem, assignedTo: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="admin-form-group">
                      <label>Room Category Type</label>
                      <select
                        className="admin-form-control"
                        value={currentItem.type || "Regular"}
                        onChange={(e) => setCurrentItem({ ...currentItem, type: e.target.value })}
                      >
                        <option value="Regular">🏫 Regular Classroom</option>
                        <option value="Lab">🔬 Laboratory (Physics/Chemistry/Bio/Computer)</option>
                        <option value="Practical">🎨 Practical / Activity Room (Art/Music/Sports)</option>
                      </select>
                    </div>
                    <div className="admin-form-group">
                      <label>Student Seating Capacity</label>
                      <input
                        type="number"
                        className="admin-form-control"
                        required
                        placeholder="e.g. 40"
                        value={currentItem.capacity || 40}
                        onChange={(e) => setCurrentItem({ ...currentItem, capacity: Number(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div className="admin-form-group" style={{ background: "#f8fafc", padding: "10px", borderRadius: "8px", border: "1px dashed #cbd5e1" }}>
                    <label style={{ fontWeight: "600", color: "#1e293b" }}>📁 Option 1: Choose Room Photo File (From PC / Mobile)</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="admin-form-control"
                      onChange={handleClassroomFileUpload}
                    />
                    <small style={{ color: "#64748b", fontSize: "0.75rem" }}>Select a classroom/lab photo from your device.</small>
                  </div>

                  <div className="admin-form-group">
                    <label style={{ fontWeight: "600", color: "#1e293b" }}>🔗 Option 2: Or Enter Room Photo Web Link</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="https://images.unsplash.com/photo-1580582932707-520aed937b7b..."
                      value={currentItem.image || ""}
                      onChange={(e) => setCurrentItem({ ...currentItem, image: e.target.value })}
                    />
                  </div>

                  {currentItem.image && (
                    <div className="admin-form-group">
                      <label style={{ fontWeight: "600", color: "#1e293b" }}>Room Photo Live Preview</label>
                      <div style={{ marginTop: "6px", textAlign: "center", background: "#f8fafc", padding: "10px", borderRadius: "8px", border: "1px dashed #cbd5e1" }}>
                        <img
                          src={currentItem.image}
                          alt="Classroom Preview"
                          style={{ maxHeight: "160px", maxWidth: "100%", borderRadius: "6px", objectFit: "cover" }}
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="admin-form-group">
                    <label style={{ fontWeight: "600", color: "#1e293b" }}>💡 Room Features & Equipment (Comma Separated)</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      placeholder="Smart Board, Projector, AC, Microphones"
                      value={currentItem.features || ""}
                      onChange={(e) => setCurrentItem({ ...currentItem, features: e.target.value })}
                    />
                    <small style={{ color: "#64748b", fontSize: "0.75rem" }}>Separate each feature with a comma (e.g. Smart Board, Projector, Fan Cooling)</small>
                  </div>
                </>
              )}

              {/* NAVBAR FORM */}
              {activeTab === "navbar" && (
                <>
                  <div className="grid-2">
                    <div className="admin-form-group">
                      <label>Nav Title (Link Text)</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        required
                        placeholder="e.g. Alumni, Sports, Fees"
                        value={currentItem.title || ""}
                        onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Path / URL / Section Hash</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        required
                        placeholder="e.g. /fees or /#about or https://..."
                        value={currentItem.path || ""}
                        onChange={(e) => setCurrentItem({ ...currentItem, path: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid-2">
                    <div className="admin-form-group">
                      <label>Parent Dropdown Menu (Optional)</label>
                      <select
                        className="admin-form-control"
                        value={currentItem.parentId || ""}
                        onChange={(e) =>
                          setCurrentItem({
                            ...currentItem,
                            parentId: e.target.value ? e.target.value : null
                          })
                        }
                      >
                        <option value="">-- None (Top Level Menu) --</option>
                        {navItems
                          .filter((n) => !n.parentId && n._id !== currentItem._id)
                          .map((parent) => (
                            <option key={parent._id} value={parent._id}>
                              📁 {parent.title}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="admin-form-group">
                      <label>Sort Order Position</label>
                      <input
                        type="number"
                        className="admin-form-control"
                        required
                        value={currentItem.order || 1}
                        onChange={(e) => setCurrentItem({ ...currentItem, order: Number(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.5rem" }}>
                    <label className="checkbox-label" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <input
                        type="checkbox"
                        checked={currentItem.isActive !== false}
                        onChange={(e) => setCurrentItem({ ...currentItem, isActive: e.target.checked })}
                      />
                      Visible on Website Navbar (`isActive`)
                    </label>

                    <label className="checkbox-label" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <input
                        type="checkbox"
                        checked={currentItem.isButton || false}
                        onChange={(e) => setCurrentItem({ ...currentItem, isButton: e.target.checked })}
                      />
                      Highlight as Call-To-Action Button (e.g. Login Portal style)
                    </label>

                    <label className="checkbox-label" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <input
                        type="checkbox"
                        checked={currentItem.isExternal || false}
                        onChange={(e) => setCurrentItem({ ...currentItem, isExternal: e.target.checked })}
                      />
                      Open in New Tab (`isExternal`)
                    </label>
                  </div>
                </>
              )}

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary-add">
                  {modalMode === "add" ? "Save Item" : "Update Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CIRCULAR LOGO CROPPER MODAL (Instagram DP Style) */}
      {cropModalOpen && (
        <div className="cropper-modal-overlay" onClick={() => setCropModalOpen(false)}>
          <div className="cropper-modal-box" onClick={(e) => e.stopPropagation()}>
            <h3 className="cropper-header-title">✂️ Crop School Logo (Instagram DP Style)</h3>
            <p className="cropper-subtitle">Drag & zoom to adjust your logo inside the circle</p>

            <div
              className="cropper-viewport-wrapper"
              onMouseDown={handlePanStart}
              onMouseMove={handlePanMove}
              onMouseUp={handlePanEnd}
              onMouseLeave={handlePanEnd}
              onTouchStart={handlePanStart}
              onTouchMove={handlePanMove}
              onTouchEnd={handlePanEnd}
            >
              <canvas
                ref={cropperCanvasRef}
                width={280}
                height={280}
                className="cropper-canvas"
              />
              <div className="cropper-circle-overlay" />
            </div>

            <div className="cropper-controls-bar">
              <div className="cropper-control-row">
                <span>🔍 Zoom:</span>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="cropper-slider"
                />
                <span>{Math.round(zoom * 100)}%</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button
                  type="button"
                  className="cropper-btn-rotate"
                  onClick={() => setRotation((r) => (r + 90) % 360)}
                >
                  🔄 Rotate 90°
                </button>
                <button
                  type="button"
                  className="cropper-btn-rotate"
                  onClick={() => {
                    setZoom(1);
                    setRotation(0);
                    setPanPos({ x: 0, y: 0 });
                  }}
                >
                  ↩️ Reset Position
                </button>
              </div>
            </div>

            <div className="cropper-actions-bar">
              <button type="button" className="cropper-btn-cancel" onClick={() => setCropModalOpen(false)}>
                Cancel
              </button>
              <button type="button" className="cropper-btn-apply" onClick={handleApplyCrop}>
                ✂️ Crop & Set Logo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUICK EDIT HEADER MODAL / PROFILE EDIT STYLE DP MODAL */}
      {headerQuickEdit.open && (
        <div className="admin-quick-edit-modal-overlay" onClick={() => setHeaderQuickEdit({ open: false, field: "", title: "", value: "", extraValue: "" })}>
          {headerQuickEdit.field === "logo" ? (
            /* INSTAGRAM / WHATSAPP EDIT PROFILE STYLE MODAL MATCHING SCREENSHOT 1 & 2 */
            <div className="profile-edit-modal-box" onClick={(e) => e.stopPropagation()}>
              <div className="profile-edit-header">
                <h3 className="profile-edit-title">Edit profile</h3>
                <button
                  type="button"
                  className="profile-edit-close-btn"
                  onClick={() => setHeaderQuickEdit({ open: false, field: "", title: "", value: "", extraValue: "" })}
                >
                  ✕
                </button>
              </div>

              {/* Circular DP with Camera Badge (Matching Screenshot 1) */}
              <div
                className="profile-edit-dp-wrapper"
                onClick={() => setViewPhotoFullscreen(true)}
                title="Click to view photo full size"
              >
                <img
                  src={headerQuickEdit.value || schoolInfo.logoUrl || logo}
                  alt="Profile Logo"
                  className="profile-edit-dp-img"
                  onError={(e) => { e.target.src = logo; }}
                />
                <div className="profile-edit-camera-overlay">
                  <span className="profile-edit-camera-badge">📷⁺</span>
                </div>
              </div>

              {/* Options Card List (Matching Screenshot 2) */}
              <div className="profile-edit-options-card">
                {/* 1. View Photo */}
                <button
                  type="button"
                  className="profile-edit-option-item"
                  onClick={() => setViewPhotoFullscreen(true)}
                >
                  <span className="profile-edit-option-icon">👁️</span>
                  <span>View photo</span>
                </button>

                {/* 2. Crop / Adjust Photo */}
                <button
                  type="button"
                  className="profile-edit-option-item"
                  onClick={() => {
                    setRawImageSrc(headerQuickEdit.value || schoolInfo.logoUrl || logo);
                    setCropModalOpen(true);
                  }}
                >
                  <span className="profile-edit-option-icon">✂️</span>
                  <span>Crop / Adjust photo</span>
                </button>

                {/* 3. Upload Photo */}
                <button
                  type="button"
                  className="profile-edit-option-item"
                  onClick={() => headerLogoInputRef.current.click()}
                >
                  <span className="profile-edit-option-icon">📁</span>
                  <span>Upload photo</span>
                </button>

                {/* 4. Remove Photo */}
                <button
                  type="button"
                  className="profile-edit-option-item profile-edit-option-danger"
                  onClick={async () => {
                    if (window.confirm("Remove profile photo and reset to default?")) {
                      setHeaderQuickEdit({ ...headerQuickEdit, value: "" });
                      const updated = { ...schoolInfo, logoUrl: "" };
                      setSchoolInfo(updated);
                      try {
                        await axios.put(`${API_BASE}/admin/info`, updated);
                        showToast("Profile photo removed!");
                      } catch (err) {
                        showToast("Reset to default profile photo");
                      }
                    }
                  }}
                >
                  <span className="profile-edit-option-icon">🗑️</span>
                  <span>Remove photo</span>
                </button>
              </div>
            </div>
          ) : (
            /* STANDARD QUICK EDIT MODAL FOR NAME, LOCATION, EMAIL, PHONE */
            <div className="admin-quick-edit-modal-box" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1px solid #e2e8f0", paddingBottom: "12px" }}>
                <h3 style={{ margin: 0, fontSize: "1.15rem", color: "#0f172a", fontWeight: "800" }}>{headerQuickEdit.title}</h3>
                <button
                  type="button"
                  onClick={() => setHeaderQuickEdit({ open: false, field: "", title: "", value: "", extraValue: "" })}
                  style={{ background: "transparent", border: "none", fontSize: "20px", cursor: "pointer", color: "#64748b" }}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveHeaderQuickEdit}>
                {headerQuickEdit.field === "name" && (
                  <div>
                    <div className="admin-form-group" style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>School Name</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        required
                        value={headerQuickEdit.value}
                        onChange={(e) => setHeaderQuickEdit({ ...headerQuickEdit, value: e.target.value })}
                      />
                    </div>
                    <div className="admin-form-group" style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Tagline / Subtitle</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        value={headerQuickEdit.extraValue}
                        onChange={(e) => setHeaderQuickEdit({ ...headerQuickEdit, extraValue: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {headerQuickEdit.field === "location" && (
                  <div>
                    <div className="admin-form-group" style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Address / Location (Displayed in Header)</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        required
                        value={headerQuickEdit.value}
                        onChange={(e) => setHeaderQuickEdit({ ...headerQuickEdit, value: e.target.value })}
                      />
                    </div>
                    <div className="admin-form-group" style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Google Maps URL</label>
                      <input
                        type="text"
                        className="admin-form-control"
                        value={headerQuickEdit.extraValue}
                        onChange={(e) => setHeaderQuickEdit({ ...headerQuickEdit, extraValue: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {headerQuickEdit.field === "email" && (
                  <div className="admin-form-group" style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Contact Email Address</label>
                    <input
                      type="email"
                      className="admin-form-control"
                      required
                      value={headerQuickEdit.value}
                      onChange={(e) => setHeaderQuickEdit({ ...headerQuickEdit, value: e.target.value })}
                    />
                  </div>
                )}

                {headerQuickEdit.field === "phone" && (
                  <div className="admin-form-group" style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Contact Phone Number</label>
                    <input
                      type="text"
                      className="admin-form-control"
                      required
                      value={headerQuickEdit.value}
                      onChange={(e) => setHeaderQuickEdit({ ...headerQuickEdit, value: e.target.value })}
                    />
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "16px" }}>
                  <button
                    type="button"
                    onClick={() => setHeaderQuickEdit({ open: false, field: "", title: "", value: "", extraValue: "" })}
                    style={{ background: "#f1f5f9", color: "#475569", border: "none", padding: "9px 18px", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ background: "linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)", color: "#ffffff", border: "none", padding: "9px 22px", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* USER SCREENSHOT MATCHING LOGO PREVIEW & EDIT MODAL */}
      {viewPhotoFullscreen && (
        <div
          className="screenshot-logo-modal-overlay"
          onClick={() => { setViewPhotoFullscreen(false); setShowLogoEditMenu(false); }}
        >
          <div className="screenshot-logo-card-wrapper" onClick={(e) => e.stopPropagation()}>
            {/* Close Button (✕) on Top-Right Corner */}
            <button
              type="button"
              className="screenshot-logo-close-btn"
              onClick={() => { setViewPhotoFullscreen(false); setShowLogoEditMenu(false); }}
              title="Close"
            >
              ✕
            </button>

            {/* White Card Container */}
            <div className="screenshot-logo-card">
              {/* Circular Photo */}
              <img
                src={schoolInfo.logoUrl || logo}
                alt="School Logo"
                className="screenshot-logo-circle"
                onError={(e) => { e.target.src = logo; }}
              />

              {/* Bottom Edit Bar inside the Card */}
              <div className="screenshot-logo-bottom-bar">
                {!showLogoEditMenu ? (
                  <button
                    type="button"
                    className="screenshot-logo-edit-btn"
                    onClick={() => setShowLogoEditMenu(true)}
                  >
                    <span>✏️</span> Edit Logo
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="screenshot-logo-cancel-btn"
                      onClick={() => setShowLogoEditMenu(false)}
                    >
                      <span>✕</span> Cancel
                    </button>

                    {/* Action Menu */}
                    <div className="screenshot-logo-action-menu">
                      <button
                        type="button"
                        className="screenshot-logo-menu-item"
                        onClick={() => {
                          setShowLogoEditMenu(false);
                          headerLogoInputRef.current.click();
                        }}
                      >
                        <span>📷</span> Change Logo (Upload File)
                      </button>

                      <button
                        type="button"
                        className="screenshot-logo-menu-item danger"
                        onClick={async () => {
                          setShowLogoEditMenu(false);
                          if (window.confirm("Remove custom logo and reset to default logo?")) {
                            const updated = { ...schoolInfo, logoUrl: "" };
                            setSchoolInfo(updated);
                            setViewPhotoFullscreen(false);
                            try {
                              await axios.put(`${API_BASE}/admin/info`, updated);
                              showToast("Logo removed & reset to default!");
                            } catch (err) {
                              showToast("Reset to default logo");
                            }
                          }
                        }}
                      >
                        <span>🗑️</span> Remove Logo
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
