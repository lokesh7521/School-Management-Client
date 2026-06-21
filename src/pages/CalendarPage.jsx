import { useState } from "react";
import { FaCalendarAlt, FaChevronLeft, FaChevronRight, FaInfoCircle } from "react-icons/fa";
import { calendarEvents } from "../data/schoolData";
import Navbar from "../components/Navbar/Navbar";
import "./CalendarPage.css";

function CalendarPage() {
  const [currentYear, setCurrentYear] = useState(2026);
  // Default to July (index 6) since the academic session begins July 2026 in data
  const [currentMonth, setCurrentMonth] = useState(6); 
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const [filterType, setFilterType] = useState("all");

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Helper to get number of days in the current month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Helper to get the start day of the week (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayIndex = getFirstDayOfMonth(currentYear, currentMonth);

  // Generate calendar days grid array
  const calendarDays = [];
  // Add empty placeholders for days before the 1st of the month
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push(null);
  }
  // Add the actual day numbers
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  // Handle month navigation
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDayEvents([]);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDayEvents([]);
  };

  // Match calendar day with events
  const getEventsForDay = (day) => {
    if (!day) return [];
    // Date format: YYYY-MM-DD
    const monthStr = String(currentMonth + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    const dateQuery = `${currentYear}-${monthStr}-${dayStr}`;
    return calendarEvents.filter(event => event.date === dateQuery);
  };

  // Check if a day has events of a specific type (filtered)
  const getFilteredEventsForDay = (day) => {
    const events = getEventsForDay(day);
    if (filterType === "all") return events;
    return events.filter(event => event.type === filterType);
  };

  const handleDayClick = (day) => {
    const events = getEventsForDay(day);
    if (events.length > 0) {
      setSelectedDayEvents(events);
    } else {
      setSelectedDayEvents([]);
    }
  };

  // Get all events of the current month (for side panel list)
  const getEventsForCurrentMonth = () => {
    return calendarEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
    });
  };

  const currentMonthEvents = getEventsForCurrentMonth();
  const displayedMonthEvents = filterType === "all" 
    ? currentMonthEvents 
    : currentMonthEvents.filter(e => e.type === filterType);

  return (
    <div className="calendar-page">
      {/* Main Navbar */}
      <Navbar />

      <main className="calendar-container">
        {/* Intro */}
        <section className="calendar-intro">
          <div className="calendar-intro-icon">
            <FaCalendarAlt />
          </div>
          <h2>School Calendar & Timeline</h2>
          <p>
            Browse schedules, celebrations, unit test dates, and holidays month-by-month. 
            Click on highlighted days to view details.
          </p>
        </section>

        {/* Calendar Category Filters */}
        <div className="calendar-filters">
          <button className={`filter-chip ${filterType === "all" ? "active" : ""}`} onClick={() => setFilterType("all")}>All Events</button>
          <button className={`filter-chip holiday ${filterType === "holiday" ? "active" : ""}`} onClick={() => setFilterType("holiday")}>Holidays</button>
          <button className={`filter-chip exam ${filterType === "exam" ? "active" : ""}`} onClick={() => setFilterType("exam")}>Exams</button>
          <button className={`filter-chip celebration ${filterType === "celebration" ? "active" : ""}`} onClick={() => setFilterType("celebration")}>Celebrations</button>
          <button className={`filter-chip activity ${filterType === "activity" ? "active" : ""}`} onClick={() => setFilterType("activity")}>Activities</button>
        </div>

        {/* Split Calendar Interface */}
        <div className="calendar-interface">
          {/* Dynamic Grid Column */}
          <div className="calendar-grid-wrapper">
            <div className="calendar-grid-header">
              <button className="nav-arrow-btn" onClick={prevMonth}>
                <FaChevronLeft />
              </button>
              <h3>{monthNames[currentMonth]} {currentYear}</h3>
              <button className="nav-arrow-btn" onClick={nextMonth}>
                <FaChevronRight />
              </button>
            </div>

            {/* Weekdays Labels */}
            <div className="weekdays-grid">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Days Grid */}
            <div className="days-grid">
              {calendarDays.map((day, idx) => {
                const dayEvents = getFilteredEventsForDay(day);
                const hasEvents = dayEvents.length > 0;
                
                // Styles for day cells
                let cellClass = "day-cell";
                if (!day) cellClass += " empty-cell";
                else if (hasEvents) cellClass += " has-events-cell";

                return (
                  <div 
                    key={idx} 
                    className={cellClass}
                    onClick={() => day && handleDayClick(day)}
                  >
                    {day && <span className="day-number">{day}</span>}
                    {day && hasEvents && (
                      <div className="dots-container">
                        {dayEvents.map((e, index) => (
                          <span key={index} className={`dot ${e.type}`}></span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details & List Panel */}
          <div className="calendar-list-wrapper">
            <div className="panel-header">
              <h3>Month Events</h3>
              <span className="events-count">{displayedMonthEvents.length} Scheduled</span>
            </div>

            {/* If a specific day is clicked, show its events at the top */}
            {selectedDayEvents.length > 0 && (
              <div className="selected-day-details">
                <div className="selected-header">
                  <FaInfoCircle className="details-info-icon" />
                  <h4>Selected Date Details</h4>
                </div>
                {selectedDayEvents.map((ev, index) => (
                  <div key={index} className={`detail-card ${ev.type}`}>
                    <span className={`event-type-badge ${ev.type}`}>{ev.type}</span>
                    <h5>{ev.title}</h5>
                    <p>{ev.description}</p>
                  </div>
                ))}
                <button className="clear-selected-btn" onClick={() => setSelectedDayEvents([])}>Show All Month Events</button>
              </div>
            )}

            {/* List of all events for this month */}
            <div className="month-events-list">
              {displayedMonthEvents.length === 0 ? (
                <div className="no-events-prompt">
                  <p>No events scheduled for this month matching the filter criteria.</p>
                </div>
              ) : (
                displayedMonthEvents.map((ev, index) => {
                  const evDate = new Date(ev.date);
                  return (
                    <div key={index} className={`event-list-item ${ev.type}`}>
                      <div className="item-date-block">
                        <span className="date-number">{evDate.getDate()}</span>
                        <span className="date-month">{monthNames[evDate.getMonth()].substring(0, 3)}</span>
                      </div>
                      <div className="item-info-block">
                        <h4>{ev.title}</h4>
                        <p>{ev.description}</p>
                        <span className={`item-badge ${ev.type}`}>{ev.type}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CalendarPage;
