import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";

import RoleSelector from "../RoleSelector";

import "./DashboardHeader.css";

function DashboardHeader({
  currentRole,
  onRoleChange,
}) {
  const [school, setSchool] = useState(
    "Qshikshak Demo School"
  );

  const [academicYear, setAcademicYear] =
    useState("2026-27");

  const [board, setBoard] =
    useState("CBSE");

  const schools = [
    "Qshikshak Demo School",
    "Qshikshak Public School",
    "Qshikshak International School",
  ];

  const academicYears = [
    "2026-27",
    "2027-28",
    "2028-29",
    "2029-30",
  ];

  const boards = [
    "CBSE",
    "SSC",
    "ICSE",
    "CISCE",
    "State Board",
    "IB",
    "IGCSE",
  ];

  return (
    <header className="dashboard-header">

      {/* =========================================
          LEFT SIDE
      ========================================= */}

      <div className="dashboard-header-left">

        {/* SCHOOL */}

        <div className="header-select-wrapper">
          <select
            value={school}
            onChange={(event) =>
              setSchool(event.target.value)
            }
            className="header-select school-select"
          >
            {schools.map((schoolName) => (
              <option
                key={schoolName}
                value={schoolName}
              >
                {schoolName}
              </option>
            ))}
          </select>

          <span className="header-select-arrow">
            ▼
          </span>
        </div>

        {/* ACADEMIC YEAR */}

        <div className="header-select-wrapper year-wrapper">
          <select
            value={academicYear}
            onChange={(event) =>
              setAcademicYear(event.target.value)
            }
            className="header-select year-select"
          >
            {academicYears.map((year) => (
              <option
                key={year}
                value={year}
              >
                {year}
              </option>
            ))}
          </select>

          <span className="header-select-arrow">
            ▼
          </span>
        </div>

        {/* BOARD */}

        <div className="header-select-wrapper board-wrapper">
          <select
            value={board}
            onChange={(event) =>
              setBoard(event.target.value)
            }
            className="header-select board-select"
          >
            {boards.map((boardName) => (
              <option
                key={boardName}
                value={boardName}
              >
                {boardName}
              </option>
            ))}
          </select>

          <span className="header-select-arrow">
            ▼
          </span>
        </div>

      </div>

      {/* =========================================
          RIGHT SIDE
      ========================================= */}

      <div className="dashboard-header-right">

        {/* SEARCH */}

        <div className="dashboard-search">

          <SearchIcon />

          <input
            type="text"
            placeholder="Search lessons..."
          />

        </div>

        {/* NOTIFICATIONS */}

        <button
          type="button"
          className="dashboard-notification-button"
          aria-label="Notifications"
        >
          <NotificationsNoneIcon />

          <span className="notification-badge">
            3
          </span>
        </button>

        {/* ROLE */}

        <RoleSelector
          role={currentRole}
          onRoleChange={onRoleChange}
        />

        {/* PROFILE */}

        <button
          type="button"
          className="dashboard-profile-button"
          aria-label="Profile"
        >
          <AccountCircleIcon />
        </button>

      </div>

    </header>
  );
}

export default DashboardHeader;