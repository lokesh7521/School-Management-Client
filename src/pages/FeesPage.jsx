import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FaReceipt,
  FaMoneyCheckAlt,
  FaInfoCircle,
  FaCalendarAlt,
  FaArrowLeft,
  FaGraduationCap,
  FaMoneyBillWave,
  FaBus,
  FaCoins,
  FaSearch,
  FaTimes
} from "react-icons/fa";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { feesData as defaultFeesData } from "../data/schoolData";
import "./FeesPage.css";

const defaultFees = defaultFeesData.map((item) => {
  const amountNum = parseFloat(item.amount.replace(/[^0-9.]/g, "")) || 10000;
  const tuition = Math.round(amountNum * 0.7);
  const bus = Math.round(amountNum * 0.2);
  const activity = Math.round(amountNum * 0.1);
  return {
    className: item.class,
    totalFee: amountNum,
    tuitionFee: tuition,
    busFee: `₹${bus.toLocaleString()}`,
    activityFee: activity,
    frequency: item.frequency || "Yearly",
    description: item.details || "Includes Tuition, Library, and Activity Fees."
  };
});

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

function FeesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const [feeList, setFeeList] = useState(defaultFees);
  const [schoolInfo, setSchoolInfo] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/public/fees")
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
          setFeeList(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error fetching fees list, using fallback default list", err);
      });

    axios
      .get("http://localhost:5000/api/public/info")
      .then((res) => {
        if (res.data.success && res.data.data) {
          setSchoolInfo(res.data.data);
        }
      })
      .catch((err) => {
        console.log("Error fetching school info", err);
      });
  }, []);

  const handleBack = () => {
    if (from === "whychoose") {
      navigate("/#whychoose");
    } else {
      navigate("/#academics");
    }
  };

  const handleReset = () => {
    setSearch("");
    setCategory("all");
  };

  const filteredFees = feeList.filter((fee) => {
    const query = search.toLowerCase().trim();
    const className = (fee.className || "").toLowerCase();
    const desc = (fee.description || "").toLowerCase();
    const matchesSearch = !query || className.includes(query) || desc.includes(query);

    if (!matchesSearch) return false;

    if (category === "all") return true;

    const matchDigit = className.match(/\d+/);
    const classNum = matchDigit ? parseInt(matchDigit[0], 10) : 0;

    if (category === "primary") return classNum >= 1 && classNum <= 5;
    if (category === "middle") return classNum >= 6 && classNum <= 8;
    if (category === "secondary") return classNum >= 9 && classNum <= 10;
    if (category === "sr-secondary")
      return (
        classNum >= 11 ||
        className.includes("11") ||
        className.includes("12") ||
        className.includes("science") ||
        className.includes("arts") ||
        className.includes("commerce")
      );

    return true;
  });

  const guidelines = schoolInfo?.feeGuidelines || [
    "Fees are payable in designated installments as per the installment schedule.",
    "A late payment fine of ₹50 per week is applicable after the respective deadlines.",
    "Modes of payment accepted include Demand Draft, Net Banking, UPI, and Card Payments at the main school desk.",
    "Transport charges are computed separately based on stops and bus routes."
  ];

  const installments = schoolInfo?.feeInstallments || [
    { badge: "1st Kist (50%)", session: "July Session", desc: "Payable at the beginning of the academic session." },
    { badge: "2nd Kist (30%)", session: "November Session", desc: "Payable by the 10th of November." },
    { badge: "3rd Kist (20%)", session: "February Session", desc: "Payable by the 10th of February." }
  ];

  return (
    <div className="fees-page">
      <Navbar />

      <div className="fees-content">

        {/* SEARCH & FILTER CONTROLS */}
        <div className="fees-controls">
          <div className="fees-search-box">
            <FaSearch className="fees-search-icon" />
            <input
              type="text"
              placeholder="Search class or stream (e.g. Class 1, Class 10, Science)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="fees-search-clear" onClick={() => setSearch("")} title="Clear search">
                <FaTimes />
              </button>
            )}
          </div>

          <div className="fees-filter-chips">
            <button
              className={`fees-chip ${category === "all" ? "active" : ""}`}
              onClick={() => setCategory("all")}
            >
              All Classes
            </button>
            <button
              className={`fees-chip ${category === "primary" ? "active" : ""}`}
              onClick={() => setCategory("primary")}
            >
              Primary (1-5)
            </button>
            <button
              className={`fees-chip ${category === "middle" ? "active" : ""}`}
              onClick={() => setCategory("middle")}
            >
              Middle (6-8)
            </button>
            <button
              className={`fees-chip ${category === "secondary" ? "active" : ""}`}
              onClick={() => setCategory("secondary")}
            >
              Secondary (9-10)
            </button>
            <button
              className={`fees-chip ${category === "sr-secondary" ? "active" : ""}`}
              onClick={() => setCategory("sr-secondary")}
            >
              Sr. Secondary (11-12)
            </button>
          </div>
        </div>

        {/* SHOWING RESULT COUNT */}
        {(search || category !== "all") && (
          <div className="fees-showing-bar">
            <span>
              Found <strong>{filteredFees.length}</strong> fee result(s){" "}
              {search && <>for "<strong>{search}</strong>"</>}
            </span>
            <button className="fees-clear-all-link" onClick={handleReset}>
              Clear All Filters
            </button>
          </div>
        )}

        {/* FEES GRID */}
        <div className="fees-grid">
          {filteredFees.length > 0 ? (
            filteredFees.map((fee, idx) => {
              const tuition = Number(fee.tuitionFee || 0);
              const busNum = parseFeeNumber(fee.busFee);
              const activity = Number(fee.activityFee || 0);
              const grandTotal = fee.totalFee || (tuition + busNum + activity);

              return (
                <div key={idx} className="fee-card">
                  <div className="fee-card-header">
                    <span className="fee-class-badge">{fee.className}</span>
                    <FaReceipt className="fee-receipt-icon" />
                  </div>

                  <div className="fee-amount-hero">
                    <span className="fee-amount">₹{grandTotal.toLocaleString()}</span>
                    <span className="fee-frequency">/ {fee.frequency || "Yearly"}</span>
                  </div>

                  <p className="fee-amount-sub">Total Fee (With Tuition)</p>

                  <div className="fee-breakdown-list">
                    <div className="fee-row">
                      <span className="fee-row-label">
                        <span className="fee-bullet blue"></span> Tuition Fee:
                      </span>
                      <strong className="fee-row-val blue">₹{tuition.toLocaleString()}</strong>
                    </div>

                    <div className="fee-row">
                      <span className="fee-row-label">
                        <span className="fee-bullet orange"></span> Bus & Transport:
                      </span>
                      <strong className="fee-row-val orange">{renderBusFee(fee.busFee)}</strong>
                    </div>

                    <div className="fee-row">
                      <span className="fee-row-label">
                        <span className="fee-bullet green"></span> Activity & Lab:
                      </span>
                      <strong className="fee-row-val green">₹{activity.toLocaleString()}</strong>
                    </div>

                    <div className="fee-row total-row">
                      <span className="fee-row-label">Grand Total:</span>
                      <strong className="fee-row-val total">₹{grandTotal.toLocaleString()}</strong>
                    </div>
                  </div>

                  {fee.description && (
                    <p className="fee-card-desc">{fee.description}</p>
                  )}
                </div>
              );
            })
          ) : (
            <div className="fees-empty">
              <FaSearch className="fees-empty-icon" />
              <p>No fee structure found matching your search criteria.</p>
              <button className="fees-reset-btn" onClick={handleReset}>
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

        {/* POLICIES & INSTALLMENTS */}
        <section className="fees-policies">
          <div className="policy-grid">
            <div className="policy-card">
              <div className="policy-header">
                <FaInfoCircle className="policy-icon" />
                <h3>Payment Guidelines</h3>
              </div>
              <ul className="policy-list">
                {guidelines.map((g, gIdx) => (
                  <li key={gIdx}>{g}</li>
                ))}
              </ul>
            </div>

            <div className="policy-card installment-card">
              <div className="policy-header">
                <FaCalendarAlt className="policy-icon installment-icon" />
                <h3>Installment Schedule (किस्त विवरण)</h3>
              </div>
              <div className="installment-steps">
                {installments.map((inst, iIdx) => (
                  <div key={iIdx} className="inst-step">
                    <div className="inst-badge">{inst.badge}</div>
                    <div className="inst-details">
                      <span className="inst-month">{inst.session}</span>
                      <span className="inst-desc">{inst.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default FeesPage;
