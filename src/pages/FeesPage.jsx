import { FaReceipt, FaMoneyCheckAlt, FaInfoCircle, FaCalendarAlt } from "react-icons/fa";
import { feesData } from "../data/schoolData";
import Navbar from "../components/Navbar/Navbar";
import "./FeesPage.css";

function FeesPage() {
  return (
    <div className="fees-page">
      {/* Main Navbar */}
      <Navbar />

      <main className="fees-container">
        {/* Intro Section */}
        <section className="fees-intro">
          <div className="fees-intro-icon">
            <FaMoneyCheckAlt />
          </div>
          <h2>Tuition Fees Breakdown</h2>
          <p>
            Standardized annual fees structure by grade levels from Class 1 to Class 12. 
            All values listed are on a quarterly basis.
          </p>
        </section>

        {/* Classes 1-12 Fees Grid */}
        <section className="fees-grid">
          {feesData.map((fee, idx) => (
            <div key={idx} className="fee-card">
              <div className="fee-card-badge">
                <FaReceipt />
              </div>
              <h3 className="fee-class-title">{fee.class}</h3>
              <div className="fee-amount-wrapper">
                <span className="fee-amount">{fee.amount}</span>
                <span className="fee-frequency">/ {fee.frequency}</span>
              </div>
              <p className="fee-details">{fee.details}</p>
            </div>
          ))}
        </section>

        {/* Guidelines / Policies Section */}
        <section className="fees-policies">
          <div className="policy-grid">
            <div className="policy-card">
              <div className="policy-header">
                <FaInfoCircle className="policy-icon" />
                <h3>Payment Guidelines</h3>
              </div>
              <ul className="policy-list">
                <li>Fees are payable in designated installments as per the installment schedule.</li>
                <li>A late payment fine of ₹50 per week is applicable after the respective deadlines.</li>
                <li>Modes of payment accepted include Demand Draft, Net Banking, UPI, and Card Payments at the main school desk.</li>
                <li>Transport charges are computed separately based on stops and bus routes.</li>
              </ul>
            </div>

            <div className="policy-card installment-card">
              <div className="policy-header">
                <FaCalendarAlt className="policy-icon installment-icon" />
                <h3>Installment Schedule (किस्त विवरण)</h3>
              </div>
              <div className="installment-steps">
                <div className="inst-step">
                  <div className="inst-badge">1st Kist (50%)</div>
                  <div className="inst-details">
                    <span className="inst-month">July Session</span>
                    <span className="inst-desc">Payable at the beginning of the academic session.</span>
                  </div>
                </div>
                <div className="inst-step">
                  <div className="inst-badge">2nd Kist (30%)</div>
                  <div className="inst-details">
                    <span className="inst-month">November Session</span>
                    <span className="inst-desc">Payable by the 10th of November.</span>
                  </div>
                </div>
                <div className="inst-step">
                  <div className="inst-badge">3rd Kist (20%)</div>
                  <div className="inst-details">
                    <span className="inst-month">February Session</span>
                    <span className="inst-desc">Payable by the 10th of February.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default FeesPage;
