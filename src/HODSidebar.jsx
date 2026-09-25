
import React from "react";
import "./HODSidebar.css";

import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ApprovalIcon from "@mui/icons-material/Approval";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

function HODSidebar({
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
      id: "lessons",
      icon: <MenuBookIcon />,
      label: "Lesson Plans",
    },
    {
      id: "approvals",
      icon: <ApprovalIcon />,
      label: "Approvals",
    },
    {
      id: "examination",
      icon: <AssignmentIcon />,
      label: "Examination",
    },
    {
      id: "reports",
      icon: <AssessmentIcon />,
      label: "Reports",
    },
  ];

  return (
    <aside className="hod-sidebar">

      <div className="hod-sidebar-brand">
        <div className="hod-brand-logo">
          Q
        </div>

        <div className="hod-brand-text">
          <h2>Qshikshak</h2>
          <span>HOD Workspace</span>
        </div>
      </div>

      <nav className="hod-sidebar-nav">

        <p className="hod-sidebar-title">
          MAIN MENU
        </p>

        {menuItems.map((item) => (
          <button
            type="button"
            key={item.id}
            className={
              activeSection === item.id
                ? "hod-sidebar-item active"
                : "hod-sidebar-item"
            }
            onClick={() =>
              onSectionChange(item.id)
            }
          >
            <span className="hod-sidebar-icon">
              {item.icon}
            </span>

            <span className="hod-sidebar-label">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="hod-sidebar-bottom">

        <button
          type="button"
          className="hod-sidebar-item"
        >
          <span className="hod-sidebar-icon">
            <SettingsIcon />
          </span>

          <span className="hod-sidebar-label">
            Settings
          </span>
        </button>

        <button
          type="button"
          className="hod-sidebar-item hod-logout"
          onClick={onBack}
        >
          <span className="hod-sidebar-icon">
            <LogoutIcon />
          </span>

          <span className="hod-sidebar-label">
            Back to Roles
          </span>
        </button>

      </div>

    </aside>
  );
}

export default HODSidebar;