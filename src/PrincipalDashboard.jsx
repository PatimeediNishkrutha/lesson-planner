import React, { useMemo, useState } from "react";
import "./PrincipalDashboard.css";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ScheduleIcon from "@mui/icons-material/Schedule";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";

import PrincipalSidebar from "./PrincipalSidebar";

function PrincipalDashboard({
  lessonPlans = [],
  examDates = [],
  holidays = [],
  onBack,
}) {
  const [activeSection, setActiveSection] = useState("dashboard");

  const safeLessons = Array.isArray(lessonPlans) ? lessonPlans : [];

  const completedLessons = safeLessons.filter(
    (lesson) =>
      String(lesson?.status || "").toLowerCase() === "completed"
  ).length;

  const plannedLessons = safeLessons.filter(
    (lesson) =>
      String(lesson?.status || "").toLowerCase() === "planned"
  ).length;

  const partlyDoneLessons = safeLessons.filter(
    (lesson) =>
      String(lesson?.status || "").toLowerCase() === "partly done"
  ).length;

  const notDoneLessons = safeLessons.filter(
    (lesson) =>
      String(lesson?.status || "").toLowerCase() === "not done"
  ).length;

  const rescheduledLessons = safeLessons.filter(
    (lesson) =>
      String(lesson?.status || "").toLowerCase() === "rescheduled"
  ).length;

  const completionPercentage =
    safeLessons.length > 0
      ? Math.round((completedLessons / safeLessons.length) * 100)
      : 0;

  const subjectProgress = useMemo(() => {
    const subjects = {};

    safeLessons.forEach((lesson) => {
      const subject =
        lesson?.subject ||
        lesson?.subjectName ||
        "Other";

      if (!subjects[subject]) {
        subjects[subject] = {
          total: 0,
          completed: 0,
        };
      }

      subjects[subject].total += 1;

      if (
        String(lesson?.status || "").toLowerCase() ===
        "completed"
      ) {
        subjects[subject].completed += 1;
      }
    });

    return Object.entries(subjects).map(
      ([subject, data]) => ({
        subject,
        percentage:
          data.total > 0
            ? Math.round(
                (data.completed / data.total) * 100
              )
            : 0,
      })
    );
  }, [safeLessons]);

  const renderDashboard = () => (
    <>
      {/* PAGE TITLE */}

      <div className="principal-page-heading">
        <div>
          <h1>School Overview</h1>

          <p>
            Monitor lesson completion and syllabus progress
            across the school.
          </p>
        </div>
      </div>

      {/* STAT CARDS */}

      <div className="principal-stats-grid">

        <div className="principal-stat-card">
          <div className="principal-stat-top">
            <div>
              <p className="principal-stat-label">
                Total Lessons
              </p>

              <h2 className="principal-stat-value">
                {safeLessons.length}
              </h2>
            </div>

            <div className="principal-stat-icon">
              <MenuBookIcon />
            </div>
          </div>
        </div>


        <div className="principal-stat-card">
          <div className="principal-stat-top">
            <div>
              <p className="principal-stat-label">
                Completed
              </p>

              <h2 className="principal-stat-value">
                {completedLessons}
              </h2>
            </div>

            <div className="principal-stat-icon">
              <AssignmentTurnedInIcon />
            </div>
          </div>
        </div>


        <div className="principal-stat-card">
          <div className="principal-stat-top">
            <div>
              <p className="principal-stat-label">
                Planned
              </p>

              <h2 className="principal-stat-value">
                {plannedLessons}
              </h2>
            </div>

            <div className="principal-stat-icon">
              <ScheduleIcon />
            </div>
          </div>
        </div>


        <div className="principal-stat-card">
          <div className="principal-stat-top">
            <div>
              <p className="principal-stat-label">
                Completion
              </p>

              <h2 className="principal-stat-value">
                {completionPercentage}%
              </h2>
            </div>

            <div className="principal-stat-icon">
              <TrendingUpIcon />
            </div>
          </div>
        </div>

      </div>


      {/* MAIN DASHBOARD GRID */}

      <div className="principal-dashboard-grid">

        {/* SYLLABUS */}

        <div className="principal-card principal-syllabus-card">

          <div className="principal-card-header">

            <div>
              <h2>
                Overall Syllabus Progress
              </h2>

              <p>
                School-wide lesson completion.
              </p>
            </div>

            <MenuBookIcon className="principal-card-header-icon" />

          </div>


          <div className="principal-syllabus-content">

            <div
              className="principal-progress-ring"
              style={{
                "--progress": `${completionPercentage}%`,
              }}
            >
              <div className="principal-progress-inner">

                <strong>
                  {completionPercentage}%
                </strong>

                <span>
                  Completed
                </span>

              </div>
            </div>


            <div className="principal-progress-info">

              <div className="principal-progress-number">
                {completedLessons}
                <span>
                  Completed
                </span>
              </div>

              <div className="principal-progress-number">
                {safeLessons.length}
                <span>
                  Total Lessons
                </span>
              </div>

            </div>

          </div>

        </div>


        {/* LESSON STATUS */}

        <div className="principal-card">

          <div className="principal-card-header">

            <div>
              <h2>
                Lesson Status
              </h2>

              <p>
                Current school-wide lesson status.
              </p>
            </div>

            <AssignmentTurnedInIcon className="principal-card-header-icon" />

          </div>


          <div className="principal-status-list">

            <div className="principal-status-item">
              <div>
                <span className="status-dot planned"></span>
                Planned
              </div>

              <strong>
                {plannedLessons}
              </strong>
            </div>


            <div className="principal-status-item">
              <div>
                <span className="status-dot completed"></span>
                Completed
              </div>

              <strong>
                {completedLessons}
              </strong>
            </div>


            <div className="principal-status-item">
              <div>
                <span className="status-dot partly"></span>
                Partly Done
              </div>

              <strong>
                {partlyDoneLessons}
              </strong>
            </div>


            <div className="principal-status-item">
              <div>
                <span className="status-dot not-done"></span>
                Not Done
              </div>

              <strong>
                {notDoneLessons}
              </strong>
            </div>


            <div className="principal-status-item">
              <div>
                <span className="status-dot rescheduled"></span>
                Rescheduled
              </div>

              <strong>
                {rescheduledLessons}
              </strong>
            </div>

          </div>

        </div>

      </div>


      {/* ACADEMIC CALENDAR */}

      <div className="principal-card principal-calendar-card">

        <div className="principal-card-header">

          <div>
            <h2>
              Academic Calendar
            </h2>

            <p>
              Important planning dates.
            </p>
          </div>

          <EventIcon className="principal-card-header-icon" />

        </div>


        <div className="principal-calendar-grid">

          <div className="principal-calendar-box">

            <div className="principal-calendar-box-icon exam">
              <SchoolIcon />
            </div>

            <div>
              <span>
                Examination Dates
              </span>

              <strong>
                {examDates.length}
              </strong>
            </div>

          </div>


          <div className="principal-calendar-box">

            <div className="principal-calendar-box-icon holiday">
              <EventIcon />
            </div>

            <div>
              <span>
                Holidays
              </span>

              <strong>
                {holidays.length}
              </strong>
            </div>

          </div>

        </div>

      </div>


      {/* SUBJECT PROGRESS */}

      {subjectProgress.length > 0 && (
        <div className="principal-card principal-subject-card">

          <div className="principal-card-header">

            <div>
              <h2>
                Subject-wise Progress
              </h2>

              <p>
                Lesson completion by subject.
              </p>
            </div>

            <TrendingUpIcon className="principal-card-header-icon" />

          </div>


          <div className="principal-subject-list">

            {subjectProgress.map((item) => (
              <div
                className="principal-subject-row"
                key={item.subject}
              >

                <div className="principal-subject-name">
                  {item.subject}
                </div>

                <div className="principal-subject-bar">
                  <div
                    className="principal-subject-fill"
                    style={{
                      width: `${item.percentage}%`,
                    }}
                  ></div>
                </div>

                <strong>
                  {item.percentage}%
                </strong>

              </div>
            ))}

          </div>

        </div>
      )}

    </>
  );


  const renderSyllabus = () => (
    <>
      <div className="principal-page-heading">
        <div>
          <h1>Syllabus Progress</h1>

          <p>
            Monitor syllabus completion across subjects.
          </p>
        </div>
      </div>

      <div className="principal-card">

        <div className="principal-card-header">
          <div>
            <h2>
              Subject-wise Syllabus Progress
            </h2>

            <p>
              Current lesson completion status.
            </p>
          </div>
        </div>

        {subjectProgress.length === 0 ? (
          <div className="principal-empty">
            No syllabus data available.
          </div>
        ) : (
          <div className="principal-subject-list">

            {subjectProgress.map((item) => (
              <div
                className="principal-subject-row"
                key={item.subject}
              >

                <div className="principal-subject-name">
                  {item.subject}
                </div>

                <div className="principal-subject-bar">
                  <div
                    className="principal-subject-fill"
                    style={{
                      width: `${item.percentage}%`,
                    }}
                  ></div>
                </div>

                <strong>
                  {item.percentage}%
                </strong>

              </div>
            ))}

          </div>
        )}

      </div>
    </>
  );


  const renderReports = () => (
    <>
      <div className="principal-page-heading">
        <div>
          <h1>Reports</h1>

          <p>
            School-level lesson and syllabus reports.
          </p>
        </div>
      </div>

      <div className="principal-report-grid">

        <div className="principal-report-card">
          <MenuBookIcon />

          <h3>
            Total Lessons
          </h3>

          <strong>
            {safeLessons.length}
          </strong>
        </div>


        <div className="principal-report-card">
          <AssignmentTurnedInIcon />

          <h3>
            Completed Lessons
          </h3>

          <strong>
            {completedLessons}
          </strong>
        </div>


        <div className="principal-report-card">
          <TrendingUpIcon />

          <h3>
            Overall Completion
          </h3>

          <strong>
            {completionPercentage}%
          </strong>
        </div>

      </div>
    </>
  );


  const renderCalendar = () => (
    <>
      <div className="principal-page-heading">
        <div>
          <h1>Academic Calendar</h1>

          <p>
            Examination and holiday information.
          </p>
        </div>
      </div>

      <div className="principal-calendar-page-grid">

        <div className="principal-card">

          <div className="principal-card-header">
            <div>
              <h2>
                Examination Dates
              </h2>
            </div>

            <SchoolIcon />
          </div>

          <div className="principal-big-number">
            {examDates.length}
          </div>

          <p className="principal-muted">
            Examination dates configured.
          </p>

        </div>


        <div className="principal-card">

          <div className="principal-card-header">
            <div>
              <h2>
                Holidays
              </h2>
            </div>

            <EventIcon />
          </div>

          <div className="principal-big-number">
            {holidays.length}
          </div>

          <p className="principal-muted">
            Holidays configured.
          </p>

        </div>

      </div>
    </>
  );


  const renderSettings = () => (
    <>
      <div className="principal-page-heading">
        <div>
          <h1>Settings</h1>

          <p>
            Principal workspace settings.
          </p>
        </div>
      </div>

      <div className="principal-card">

        <div className="principal-setting-row">
          <div>
            <strong>
              Workspace
            </strong>

            <span>
              Principal Dashboard
            </span>
          </div>

          <b>
            Active
          </b>
        </div>


        <div className="principal-setting-row">
          <div>
            <strong>
              Role
            </strong>

            <span>
              Principal
            </span>
          </div>

          <b>
            School Level
          </b>
        </div>

      </div>
    </>
  );


  const renderContent = () => {
    switch (activeSection) {
      case "syllabus":
        return renderSyllabus();

      case "reports":
        return renderReports();

      case "calendar":
        return renderCalendar();

      case "settings":
        return renderSettings();

      default:
        return renderDashboard();
    }
  };


  return (
    <div className="principal-dashboard">

      <PrincipalSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onBack={onBack}
      />


      <main className="principal-main">

        {/* TOP HEADER */}

        <header className="principal-header">

          <div className="principal-header-left">

            <h2>
              Principal Workspace
            </h2>

            <span>
              School Management
            </span>

          </div>


          <div className="principal-header-right">

            <button className="principal-notification">
              <NotificationsNoneIcon />
            </button>

            <div className="principal-user">

              <AccountCircleIcon />

              <div>
                <strong>
                  Principal
                </strong>

                <span>
                  School Administrator
                </span>
              </div>

            </div>

          </div>

        </header>


        {/* PAGE CONTENT */}

        <section className="principal-content">

          {renderContent()}

        </section>

      </main>

    </div>
  );
}

export default PrincipalDashboard;