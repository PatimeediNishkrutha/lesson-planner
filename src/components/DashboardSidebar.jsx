
import React from "react";
import "./DashboardSidebar.css";

import TodayIcon from "@mui/icons-material/Today";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DescriptionIcon from "@mui/icons-material/Description";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HistoryIcon from "@mui/icons-material/History";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

function DashboardSidebar({
  activeItem = "Today",
  onItemClick,
  collapsed = false,
  onToggle,
}) {
  const menuItems = [
    {
      label: "Today",
      icon: <TodayIcon />,
    },
    {
      label: "Calendar",
      icon: <CalendarMonthIcon />,
    },
    {
      label: "Timetable",
      icon: <CalendarViewWeekIcon />,
    },
    {
      label: "My Plans",
      icon: <DescriptionIcon />,
    },
    {
      label: "Syllabus",
      icon: <MenuBookIcon />,
    },
    {
      label: "Delivery",
      icon: <CheckCircleIcon />,
    },
    {
      label: "History",
      icon: <HistoryIcon />,
    },
    {
      label: "Reports",
      icon: <AssessmentIcon />,
    },
    {
      label: "Homework",
      icon: <AssignmentIcon />,
    },
    {
      label: "Lesson Library",
      icon: <CollectionsBookmarkIcon />,
    },
  ];

  return (
    <aside
      className={`dashboard-sidebar ${
        collapsed ? "dashboard-sidebar-collapsed" : ""
      }`}
    >
      {/* BRAND */}

      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">
          Q
        </div>

        {!collapsed && (
          <div className="sidebar-brand-text">
            <h2>Qshikshak</h2>
            <span>Lesson Planner</span>
          </div>
        )}
      </div>

      {/* COLLAPSE BUTTON */}

      <button
        type="button"
        className="sidebar-collapse-button"
        onClick={onToggle}
        aria-label={
          collapsed
            ? "Expand sidebar"
            : "Collapse sidebar"
        }
      >
        <ChevronLeftIcon
          className={
            collapsed
              ? "sidebar-chevron-rotated"
              : ""
          }
        />
      </button>

      {/* MODULE TITLE */}

      {!collapsed && (
        <div className="sidebar-module-title">
          LESSON PLANNER
        </div>
      )}

      {/* MENU */}

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`sidebar-menu-item ${
              activeItem === item.label
                ? "sidebar-menu-item-active"
                : ""
            }`}
            onClick={() => {
              if (onItemClick) {
                onItemClick(item.label);
              }
            }}
            title={
              collapsed
                ? item.label
                : undefined
            }
          >
            <span className="sidebar-menu-icon">
              {item.icon}
            </span>

            {!collapsed && (
              <span className="sidebar-menu-label">
                {item.label}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* BOTTOM PROFILE */}

      <div className="sidebar-profile">
        <div className="sidebar-profile-avatar">
          Q
        </div>

        {!collapsed && (
          <div className="sidebar-profile-info">
            <strong>
              Teacher
            </strong>

            <span>
              Lesson Planner
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}

export default DashboardSidebar;

