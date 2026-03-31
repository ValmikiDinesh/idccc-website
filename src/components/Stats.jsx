import React from "react";
import CountUp from "react-countup";
import { FaUsers, FaNewspaper, FaGlobeAsia, FaGavel } from "react-icons/fa";
import "../components/stats.css";

export default function Stats() {
  const statData = [
    { icon: <FaUsers />, count: 12000, label: "Creators Network", suffix: "+" },
    { icon: <FaNewspaper />, count: 800, label: "Journalists Support", suffix: "+" },
    { icon: <FaGlobeAsia />, count: 28, label: "States Covered", suffix: "" },
    { icon: <FaGavel />, count: 150, label: "Legal Advisors", suffix: "+" },
  ];

  return (
    <section className="indigo-stats-section">
      <div className="container stats-grid-responsive">
        {statData.map((item, index) => (
          <div className="indigo-stat-card" key={index}>
            <div className="indigo-stat-icon-wrapper">
              {item.icon}
            </div>
            <div className="indigo-stat-content">
              <h2>
                <CountUp end={item.count} duration={2.5} enableScrollSpy scrollSpyOnce />
                {item.suffix}
              </h2>
              <p>{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}