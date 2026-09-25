import React from "react";
import "./AdminSidebar.css";

import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ClassIcon from "@mui/icons-material/Class";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

function AdminSidebar({
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
      label: "Syllabus",
    },
    {
      id: "classes",
      icon: <ClassIcon />,
      label: "Classes & Subjects",
    },
    {
      id: "calendar",
      icon: <CalendarMonthIcon />,
      label: "Academic Calendar",
    },
    {
      id: "reports",
      icon: <AssessmentIcon />,
      label: "Reports",
    },
  ];

  return (
    <aside className="admin-sidebar">

      {/* BRAND */}

      <div className="admin-sidebar-brand">

        <div className="admin-brand-logo">
          Q
        </div>

        <div className="admin-brand-text">

          <h2>
            Qshikshak
          </h2>

          <span>
            Admin Workspace
          </span>

        </div>

      </div>


      {/* NAVIGATION */}

      <nav className="admin-sidebar-nav">

        <p className="admin-sidebar-title">
          MAIN MENU
        </p>

        {menuItems.map((item) => (

          <button
            key={item.id}
            type="button"
            className={
              activeSection === item.id
                ? "admin-sidebar-item active"
                : "admin-sidebar-item"
            }
            onClick={() =>
              onSectionChange(item.id)
            }
          >

            <span className="admin-sidebar-icon">
              {item.icon}
            </span>

            <span className="admin-sidebar-label">
              {item.label}
            </span>

          </button>

        ))}

      </nav>


      {/* BOTTOM MENU */}

      <div className="admin-sidebar-bottom">

        <button
          type="button"
          className="admin-sidebar-item"
          onClick={() =>
            onSectionChange("settings")
          }
        >

          <span className="admin-sidebar-icon">
            <SettingsIcon />
          </span>

          <span className="admin-sidebar-label">
            Settings
          </span>

        </button>


        <button
          type="button"
          className="admin-sidebar-item admin-logout"
          onClick={onBack}
        >

          <span className="admin-sidebar-icon">
            <LogoutIcon />
          </span>

          <span className="admin-sidebar-label">
            Back to Roles
          </span>

        </button>

      </div>

    </aside>
  );
}

export default AdminSidebar;