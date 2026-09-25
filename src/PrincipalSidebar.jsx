import React from "react";
import "./PrincipalSidebar.css";

import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

function PrincipalSidebar({
  activeSection,
  onSectionChange,
  onBack,
}) {
  const menuItems = [
    {
      id: "dashboard",
      icon: <DashboardIcon />,
      label: "Dashboard",
    },
    {
      id: "syllabus",
      icon: <MenuBookIcon />,
      label: "Syllabus Progress",
    },
    {
      id: "reports",
      icon: <AssessmentIcon />,
      label: "Reports",
    },
    {
      id: "calendar",
      icon: <CalendarMonthIcon />,
      label: "Calendar",
    },
  ];

  return (
    <aside className="principal-sidebar">

      {/* BRAND */}

      <div className="principal-sidebar-brand">

        <div className="principal-brand-logo">
          Q
        </div>

        <div className="principal-brand-text">

          <h2>
            Qshikshak
          </h2>

          <span>
            Principal Workspace
          </span>

        </div>

      </div>


      {/* NAVIGATION */}

      <nav className="principal-sidebar-nav">

        <p className="principal-sidebar-title">
          MAIN MENU
        </p>

        {menuItems.map((item) => (

          <button
            key={item.id}
            type="button"
            className={
              activeSection === item.id
                ? "principal-sidebar-item active"
                : "principal-sidebar-item"
            }
            onClick={() =>
              onSectionChange(item.id)
            }
          >

            <span className="principal-sidebar-icon">
              {item.icon}
            </span>

            <span className="principal-sidebar-label">
              {item.label}
            </span>

          </button>

        ))}

      </nav>


      {/* BOTTOM MENU */}

      <div className="principal-sidebar-bottom">

        <button
          type="button"
          className="principal-sidebar-item"
          onClick={() =>
            onSectionChange("settings")
          }
        >

          <span className="principal-sidebar-icon">
            <SettingsIcon />
          </span>

          <span className="principal-sidebar-label">
            Settings
          </span>

        </button>


        <button
          type="button"
          className="principal-sidebar-item principal-logout"
          onClick={onBack}
        >

          <span className="principal-sidebar-icon">
            <LogoutIcon />
          </span>

          <span className="principal-sidebar-label">
            Back to Roles
          </span>

        </button>

      </div>

    </aside>
  );
}

export default PrincipalSidebar;