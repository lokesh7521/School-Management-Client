export const classData = [
  { class: "Class 1", students: 52, section: "A, B", stream: "Primary" },
  { class: "Class 2", students: 48, section: "A, B", stream: "Primary" },
  { class: "Class 3", students: 55, section: "A, B", stream: "Primary" },
  { class: "Class 4", students: 61, section: "A, B", stream: "Primary" },
  { class: "Class 5", students: 58, section: "A, B", stream: "Primary" },
  { class: "Class 6", students: 67, section: "A, B", stream: "Middle" },
  { class: "Class 7", students: 72, section: "A, B", stream: "Middle" },
  { class: "Class 8", students: 65, section: "A, B", stream: "Middle" },
  { class: "Class 9", students: 78, section: "A, B", stream: "Secondary" },
  { class: "Class 10", students: 83, section: "A, B", stream: "Secondary" },
  { class: "Class 11", students: 45, section: "A", stream: "Senior" },
  { class: "Class 12", students: 42, section: "A", stream: "Senior" },
];

export const streamColors = {
  Primary: { bg: "#e8f5e9", color: "#2e7d32", bar: "#43a047" },
  Middle: { bg: "#e3f2fd", color: "#1565c0", bar: "#1e88e5" },
  Secondary: { bg: "#fff3e0", color: "#e65100", bar: "#fb8c00" },
  Senior: { bg: "#f3e5f5", color: "#6a1b9a", bar: "#8e24aa" },
};

export const teachers = [
  { id: 1, name: "Sitaram Jetiwal", subject: "Physics", qualification: "M.Sc Physics, B.Ed", experience: "18 yrs", phone: "+91 9829739603", gender: "male" },
  { id: 2, name: "Ramesh Kumar", subject: "Mathematics", qualification: "M.Sc Maths, B.Ed", experience: "14 yrs", phone: "+91 9800000002", gender: "male" },
  { id: 3, name: "Sita Devi", subject: "Hindi", qualification: "M.A Hindi, B.Ed", experience: "12 yrs", phone: "+91 9800000003", gender: "female" },
  { id: 4, name: "Priya Sharma", subject: "English", qualification: "M.A English, B.Ed", experience: "10 yrs", phone: "+91 9800000004", gender: "female" },
  { id: 5, name: "Suresh Yadav", subject: "Physics", qualification: "M.Sc Physics", experience: "9 yrs", phone: "+91 9800000005", gender: "male" },
  { id: 6, name: "Anjali Gupta", subject: "Biology", qualification: "M.Sc Biology, B.Ed", experience: "11 yrs", phone: "+91 9800000006", gender: "female" },
  { id: 7, name: "Mahesh Meena", subject: "Chemistry", qualification: "M.Sc Chemistry", experience: "8 yrs", phone: "+91 9800000007", gender: "male" },
  { id: 8, name: "Kavita Saini", subject: "Social Studies", qualification: "M.A History, B.Ed", experience: "13 yrs", phone: "+91 9800000008", gender: "female" },
  { id: 9, name: "Vikram Singh", subject: "Physical Education", qualification: "B.P.Ed, M.P.Ed", experience: "7 yrs", phone: "+91 9800000009", gender: "male" },
  { id: 10, name: "Rekha Joshi", subject: "Arts", qualification: "M.F.A", experience: "9 yrs", phone: "+91 9800000010", gender: "female" },
  { id: 11, name: "Narendra Sharma", subject: "Commerce", qualification: "M.Com, B.Ed", experience: "15 yrs", phone: "+91 9800000011", gender: "male" },
  { id: 12, name: "Deepa Kumari", subject: "Computer Science", qualification: "MCA, B.Ed", experience: "6 yrs", phone: "+91 9800000012", gender: "female" },
  { id: 13, name: "Alok Verma", subject: "Geography", qualification: "M.A Geography, B.Ed", experience: "10 yrs", phone: "+91 9800000013", gender: "male" },
  { id: 14, name: "Sunita Rathore", subject: "Sanskrit", qualification: "M.A Sanskrit, B.Ed", experience: "16 yrs", phone: "+91 9800000014", gender: "female" },
  { id: 15, name: "Rahul Chauhan", subject: "Economics", qualification: "M.A Economics, B.Ed", experience: "8 yrs", phone: "+91 9800000015", gender: "male" },
  { id: 16, name: "Meena Bairwa", subject: "Political Science", qualification: "M.A Pol. Sci., B.Ed", experience: "7 yrs", phone: "+91 9800000016", gender: "female" },
  { id: 17, name: "Kishan Lal", subject: "Mathematics (Sr.)", qualification: "M.Sc Maths, M.Ed", experience: "20 yrs", phone: "+91 9800000017", gender: "male" },
  { id: 18, name: "Pushpa Rani", subject: "Home Science", qualification: "M.Sc Home Sci., B.Ed", experience: "11 yrs", phone: "+91 9800000018", gender: "female" },
  { id: 19, name: "Govind Das", subject: "Principal (Admin)", qualification: "M.A, M.Ed, Ph.D", experience: "25 yrs", phone: "+91 9800000019", gender: "male" },
  { id: 20, name: "Anita Koli", subject: "Hindi (Sr.)", qualification: "M.A Hindi, B.Ed", experience: "9 yrs", phone: "+91 9800000020", gender: "female" },
];

export const subjectColors = {
  "Physics": "#e3f2fd",
  "Mathematics": "#e8f5e9",
  "Hindi": "#fce4ec",
  "English": "#f3e5f5",
  "Biology": "#e8f5e9",
  "Chemistry": "#fff3e0",
  "Social Studies": "#e0f7fa",
  "Physical Education": "#f1f8e9",
  "Arts": "#fce4ec",
  "Commerce": "#fff8e1",
  "Computer Science": "#e8eaf6",
  "Geography": "#e0f2f1",
  "Sanskrit": "#fbe9e7",
  "Economics": "#f9fbe7",
  "Political Science": "#ede7f6",
  "Mathematics (Sr.)": "#e8f5e9",
  "Home Science": "#fce4ec",
  "Principal (Admin)": "#ffd54f22",
  "Hindi (Sr.)": "#fce4ec",
};

export const classrooms = [
  { id: 1, room: "Room 101", assignedTo: "Class 1 - Section A", capacity: 45, type: "Regular", features: ["Blackboard", "Fans", "Benches", "Natural Light"], icon: "classroom", color: "#e8f5e9", iconColor: "#2e7d32", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=500&q=80" },
  { id: 2, room: "Room 102", assignedTo: "Class 1 - Section B", capacity: 45, type: "Regular", features: ["Blackboard", "Fans", "Benches", "Natural Light"], icon: "classroom", color: "#e8f5e9", iconColor: "#2e7d32", image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=500&q=80" },
  { id: 3, room: "Room 103", assignedTo: "Class 2 - Section A", capacity: 45, type: "Regular", features: ["Whiteboard", "Fans", "Benches", "Windows"], icon: "classroom", color: "#e8f5e9", iconColor: "#2e7d32", image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=500&q=80" },
  { id: 4, room: "Room 104", assignedTo: "Class 2 - Section B", capacity: 45, type: "Regular", features: ["Blackboard", "Fans", "Benches", "Natural Light"], icon: "classroom", color: "#e8f5e9", iconColor: "#2e7d32", image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=500&q=80" },
  { id: 5, room: "Room 105", assignedTo: "Class 3 - Section A", capacity: 50, type: "Regular", features: ["Whiteboard", "Ceiling Fan", "Benches", "Display Board"], icon: "classroom", color: "#e8f5e9", iconColor: "#2e7d32", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=500&q=80" },
  { id: 6, room: "Room 106", assignedTo: "Class 3 - Section B", capacity: 50, type: "Regular", features: ["Blackboard", "Fans", "Benches"], icon: "classroom", color: "#e8f5e9", iconColor: "#2e7d32", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=500&q=80" },
  { id: 7, room: "Room 201", assignedTo: "Class 4 - Section A", capacity: 50, type: "Regular", features: ["Whiteboard", "Fans", "Desks", "Map Boards"], icon: "classroom", color: "#e3f2fd", iconColor: "#1565c0", image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=500&q=80" },
  { id: 8, room: "Room 202", assignedTo: "Class 4 - Section B", capacity: 50, type: "Regular", features: ["Blackboard", "Fans", "Benches", "Bulletin Board"], icon: "classroom", color: "#e3f2fd", iconColor: "#1565c0", image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=500&q=80" },
  { id: 9, room: "Room 203", assignedTo: "Class 5 - Section A", capacity: 50, type: "Regular", features: ["Whiteboard", "Fans", "Desks", "Display Board"], icon: "classroom", color: "#e3f2fd", iconColor: "#1565c0", image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=500&q=80" },
  { id: 10, room: "Room 204", assignedTo: "Class 5 - Section B", capacity: 50, type: "Regular", features: ["Blackboard", "Fans", "Benches"], icon: "classroom", color: "#e3f2fd", iconColor: "#1565c0", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=500&q=80" },
  { id: 11, room: "Room 205", assignedTo: "Class 6 - Section A", capacity: 55, type: "Regular", features: ["Whiteboard", "Ceiling Fan", "Desks", "Map Boards"], icon: "classroom", color: "#e3f2fd", iconColor: "#1565c0", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=500&q=80" },
  { id: 12, room: "Room 206", assignedTo: "Class 6 - Section B", capacity: 55, type: "Regular", features: ["Blackboard", "Fans", "Benches", "Display Board"], icon: "classroom", color: "#e3f2fd", iconColor: "#1565c0", image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=500&q=80" },
  { id: 13, room: "Room 301", assignedTo: "Class 7 - Section A", capacity: 55, type: "Regular", features: ["Whiteboard", "Fans", "Desks", "Bulletin Board"], icon: "classroom", color: "#fff3e0", iconColor: "#e65100", image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=500&q=80" },
  { id: 14, room: "Room 302", assignedTo: "Class 7 - Section B", capacity: 55, type: "Regular", features: ["Blackboard", "Fans", "Benches", "Map Display"], icon: "classroom", color: "#fff3e0", iconColor: "#e65100", image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=500&q=80" },
  { id: 15, room: "Room 303", assignedTo: "Class 8 - Section A", capacity: 55, type: "Regular", features: ["Whiteboard", "Ceiling Fan", "Desks", "Display Board"], icon: "classroom", color: "#fff3e0", iconColor: "#e65100", image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=500&q=80" },
  { id: 16, room: "Room 304", assignedTo: "Class 8 - Section B", capacity: 55, type: "Regular", features: ["Blackboard", "Fans", "Benches"], icon: "classroom", color: "#fff3e0", iconColor: "#e65100", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=500&q=80" },
  { id: 17, room: "Room 401", assignedTo: "Class 9 - Section A", capacity: 60, type: "Regular", features: ["Whiteboard", "Fans", "Desks", "Projector Ready"], icon: "classroom", color: "#f3e5f5", iconColor: "#6a1b9a", image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=500&q=80" },
  { id: 18, room: "Room 402", assignedTo: "Class 9 - Section B", capacity: 60, type: "Regular", features: ["Blackboard", "Fans", "Benches", "Display Board"], icon: "classroom", color: "#f3e5f5", iconColor: "#6a1b9a", image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=500&q=80" },
  { id: 19, room: "Room 403", assignedTo: "Class 10 - Section A", capacity: 60, type: "Regular", features: ["Whiteboard", "Ceiling Fan", "Desks", "Science Charts"], icon: "classroom", color: "#f3e5f5", iconColor: "#6a1b9a", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=500&q=80" },
  { id: 20, room: "Room 404", assignedTo: "Class 10 - Section B", capacity: 60, type: "Regular", features: ["Blackboard", "Fans", "Benches", "Projector Ready"], icon: "classroom", color: "#f3e5f5", iconColor: "#6a1b9a", image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=500&q=80" },
  { id: 21, room: "Room 501", assignedTo: "Class 11 - Section A", capacity: 50, type: "Regular", features: ["Whiteboard", "AC", "Desks", "Smart Board Ready"], icon: "classroom", color: "#e8eaf6", iconColor: "#283593", image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=500&q=80" },
  { id: 22, room: "Room 502", assignedTo: "Class 12 - Section A", capacity: 50, type: "Regular", features: ["Whiteboard", "AC", "Desks", "Smart Board Ready"], icon: "classroom", color: "#e8eaf6", iconColor: "#283593", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=500&q=80" },
  { id: 23, room: "Bio Lab", assignedTo: "Biology Practical", capacity: 35, type: "Lab", features: ["Microscopes", "Specimens", "Dissection Tables", "Charts"], icon: "lab", color: "#e8f5e9", iconColor: "#1b5e20", image: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=500&q=80" },
  { id: 24, room: "Phy Lab", assignedTo: "Physics Practical", capacity: 35, type: "Lab", features: ["Instruments", "Experiment Tables", "Charts", "Meters"], icon: "lab", color: "#e3f2fd", iconColor: "#0d47a1", image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=500&q=80" },
  { id: 25, room: "Chem Lab", assignedTo: "Chemistry Practical", capacity: 35, type: "Lab", features: ["Chemical Racks", "Burners", "Safety Kit", "Glassware"], icon: "lab", color: "#fff3e0", iconColor: "#e65100", image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=500&q=80" },
  { id: 26, room: "Arts Room", assignedTo: "Arts Practical", capacity: 30, type: "Practical", features: ["Drawing Boards", "Canvas", "Color Kits", "Model Stand"], icon: "arts", color: "#fce4ec", iconColor: "#880e4f", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=500&q=80" },
];

export const typeColors = {
  "Regular": { bg: "#e8f5e9", color: "#2e7d32" },
  "Lab": { bg: "#e3f2fd", color: "#1565c0" },
  "Practical": { bg: "#fce4ec", color: "#880e4f" },
};

export const buses = [
  { id: 1, busNo: "RJ-14-PA-1201", driver: "Rajendra Prasad", phone: "+91 9829011111", capacity: 40, status: "Active", route: "Route A: Mansarovar — VT Road — Shipra Path", stops: ["Mansarovar", "VT Road", "Shipra Path", "Kalyan Path", "School"], color: "#e8f5e9", iconColor: "#2e7d32", image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=500&q=80" },
  { id: 2, busNo: "RJ-14-PA-1202", driver: "Satpal Singh", phone: "+91 9829022222", capacity: 45, status: "Active", route: "Route B: Vaishali Nagar — Amrapali Marg — Hanuman Nagar", stops: ["Vaishali Nagar", "Amrapali Marg", "Hanuman Nagar", "Chitrakoot", "School"], color: "#e3f2fd", iconColor: "#1565c0", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=500&q=80" },
  { id: 3, busNo: "RJ-14-PA-1203", driver: "Ramesh Yadav", phone: "+91 9829033333", capacity: 40, status: "Maintenance", route: "Route C: Malviya Nagar — Apex Circle — GT Road", stops: ["Malviya Nagar", "Apex Circle", "GT Road", "Calgiri Road", "School"], color: "#fff3e0", iconColor: "#e65100", image: "https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=500&q=80" },
  { id: 4, busNo: "RJ-14-PA-1204", driver: "Mahendra Singh", phone: "+91 9829044444", capacity: 42, status: "Active", route: "Route D: Tonk Road — Gopalpura Bypass — Durgapura", stops: ["Tonk Road", "Gopalpura Bypass", "Durgapura", "Mahaveer Nagar", "School"], color: "#f3e5f5", iconColor: "#6a1b9a", image: "https://images.unsplash.com/photo-1464851707681-f9d5fdacccd8?auto=format&fit=crop&w=500&q=80" },
  { id: 5, busNo: "RJ-14-PA-1205", driver: "Sanjay Sharma", phone: "+91 9829055555", capacity: 35, status: "Active", route: "Route E: Jagatpura — NRI Colony — Pratap Nagar", stops: ["Jagatpura", "NRI Colony", "Pratap Nagar", "Sanganer", "School"], color: "#e8eaf6", iconColor: "#283593", image: "https://images.unsplash.com/photo-1562620669-98203c940608?auto=format&fit=crop&w=500&q=80" },
];

export const feesData = [
  { class: "Class 1", amount: "₹ 8,500", frequency: "Quarterly", details: "Includes Tuition, Activity, and Basic IT Fees." },
  { class: "Class 2", amount: "₹ 10,000", frequency: "Quarterly", details: "Includes Tuition, Activity, and Basic IT Fees." },
  { class: "Class 3", amount: "₹ 12,000", frequency: "Quarterly", details: "Includes Tuition, Activity, and Basic IT Fees." },
  { class: "Class 4", amount: "₹ 14,000", frequency: "Quarterly", details: "Includes Tuition, Library, and Activity Fees." },
  { class: "Class 5", amount: "₹ 16,000", frequency: "Quarterly", details: "Includes Tuition, Library, and Activity Fees." },
  { class: "Class 6", amount: "₹ 18,000", frequency: "Quarterly", details: "Includes Lab charges, Tuition, and Library Fees." },
  { class: "Class 7", amount: "₹ 20,000", frequency: "Quarterly", details: "Includes Lab charges, Tuition, and Library Fees." },
  { class: "Class 8", amount: "₹ 22,000", frequency: "Quarterly", details: "Includes Lab charges, Tuition, and Sports Fees." },
  { class: "Class 9", amount: "₹ 25,000", frequency: "Quarterly", details: "Includes Board Registration support, Tuition, and Lab Fees." },
  { class: "Class 10", amount: "₹ 28,000", frequency: "Quarterly", details: "Includes Board Exam preparation and high-tier Lab Fees." },
  { class: "Class 11 (Arts)", amount: "₹ 28,000", frequency: "Quarterly", details: "Includes Humanities/Geography practical charges, Tuition, and IT library access fees." },
  { class: "Class 11 (Commerce)", amount: "₹ 30,000", frequency: "Quarterly", details: "Includes Accountancy, Business Studies material, and specialized computer lab training." },
  { class: "Class 11 (Science)", amount: "₹ 34,000", frequency: "Quarterly", details: "Includes Chemistry, Physics, Biology/Maths lab fees, equipment charges, and practical guidance." },
  { class: "Class 12 (Arts)", amount: "₹ 32,000", frequency: "Quarterly", details: "Includes Board Examination Prep, Geography practicals, and Humanities project support." },
  { class: "Class 12 (Commerce)", amount: "₹ 34,000", frequency: "Quarterly", details: "Includes Advanced Commerce Board Prep, IT lab work, and project guidance." },
  { class: "Class 12 (Science)", amount: "₹ 38,000", frequency: "Quarterly", details: "Includes Comprehensive Board Prep, practical lab equipment, and exam coaching support." }
];

export const calendarEvents = [
  { date: "2026-07-01", title: "New Academic Session Begins", type: "event", description: "Classes kickstart for the academic term 2026-27." },
  { date: "2026-08-15", title: "Independence Day Celebration", type: "celebration", description: "Flag hoisting ceremony, patriotic speeches, and cultural events starting at 8:00 AM." },
  { date: "2026-09-05", title: "Teacher's Day Ceremony", type: "celebration", description: "Special assembly organized by senior students to honor the teaching staff." },
  { date: "2026-09-18", title: "Unit Test - I Exams", type: "exam", description: "First round of quarterly tests covering initial curriculum blocks." },
  { date: "2026-10-22", title: "Diwali Vacations Break", type: "holiday", description: "School remains closed for Diwali holidays from Oct 22 to Oct 27." },
  { date: "2026-11-14", title: "Annual Sports Meet", type: "activity", description: "Track, field, and indoor sporting events across all grade levels." },
  { date: "2026-12-15", title: "Half-Yearly Exams", type: "exam", description: "Mid-term examinations for all classes." },
  { date: "2026-12-25", title: "Christmas & Winter Holidays", type: "holiday", description: "Winter break starts from Dec 25 to Jan 03." },
  { date: "2027-01-26", title: "Republic Day Parade", type: "celebration", description: "March-past parade and cultural exhibitions." },
  { date: "2027-02-10", title: "Pre-Board Examinations (Class 10 & 12)", type: "exam", description: "Practice exams mimicking board pattern rules." },
  { date: "2027-03-05", title: "Annual Science Exhibition", type: "activity", description: "Students showcase practical science experiments and innovations." },
  { date: "2027-03-20", title: "Final Term Examinations", type: "exam", description: "Promotional end-of-year exams for all standard levels." }
];

export const timetableData = {
  schoolHours: [
    { title: "School Gate Opens", time: "07:30 AM", description: "Students start arriving at campus." },
    { title: "Morning Assembly & Prayer", time: "08:00 AM - 08:30 AM", description: "Physical drills, morning prayer, and daily news briefings." },
    { title: "Morning Lectures (1 - 4)", time: "08:30 AM - 11:30 AM", description: "Standard classroom instruction block." },
    { title: "Lunch Recess Break", time: "11:30 AM - 12:00 PM", description: "Students eat and interact in the lunch grounds." },
    { title: "Afternoon Lectures (5 - 8)", time: "12:00 PM - 02:00 PM", description: "Post-lunch academic work and practical classes." },
    { title: "Dismissal Bell", time: "02:00 PM", description: "Class closure. School buses leave at 02:15 PM." }
  ],
  lectureTimetable: [
    { period: "1st Lecture", time: "09:00 AM - 10:00 AM", subject: "Mathematics / Physics", room: "Standard Room" },
    { period: "2nd Lecture", time: "10:00 AM - 11:00 AM", subject: "English Literature", room: "Language Lab" },
    { period: "3rd Lecture", time: "11:00 AM - 11:30 AM", subject: "Social Science", room: "Standard Room" },
    { period: "Recess Break", time: "11:30 AM - 12:00 PM", subject: "Lunch & Social Time", room: "Playgrounds" },
    { period: "4th Lecture", time: "12:00 PM - 01:00 PM", subject: "Chemistry / Accountancy", room: "Science Lab" },
    { period: "5th Lecture", time: "01:00 PM - 02:00 PM", subject: "Computer Science / Arts", room: "Computer Lab" }
  ]
};


