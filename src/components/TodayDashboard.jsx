
import React from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import BarChartIcon from "@mui/icons-material/BarChart";

import "./TodayDashboard.css";

function TodayDashboard({
  onBack,
  lessonPlans,
  onCompleteLesson,
}) {
  const today = new Date();

  const formatLocalDate = (date) => {
    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const todayDate = formatLocalDate(today);

  const formattedToday =
    new Intl.DateTimeFormat("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(today);

  /*
   * Get today's lessons.
   *
   * HOD approval information is preserved because
   * we keep the complete lesson object.
   */
  const lessons =
    (lessonPlans || []).filter(
      (lesson) =>
        lesson.date === todayDate
    );

  const completedLessons =
    lessons.filter(
      (lesson) =>
        lesson.status === "Completed"
    );

  const plannedLessons =
    lessons.filter(
      (lesson) =>
        lesson.status === "Planned"
    );

  const pendingLessons =
    lessons.filter(
      (lesson) =>
        lesson.status === "Not Done" ||
        lesson.status === "Partly Done"
    );

  const completionPercentage =
    lessons.length > 0
      ? Math.round(
          (completedLessons.length /
            lessons.length) *
            100
        )
      : 0;

  return (
    <div className="today-dashboard">

      {/* ================================
          TOP BAR
      ================================= */}

      <header className="today-top-bar">

        <div className="today-brand">

          <button
            type="button"
            className="today-back-button"
            onClick={onBack}
          >
            <ArrowBackIcon />
          </button>

          <div>
            <span className="today-brand-name">
              Qshikshak
            </span>

            <span className="today-brand-subtitle">
              Lesson Planner
            </span>
          </div>

        </div>

        <div className="today-top-info">

          <div className="today-school-info">
            <span>School</span>
            <strong>
              Qshikshak Demo School
            </strong>
          </div>

          <div className="today-year-info">
            <span>Academic Year</span>
            <strong>2026-27</strong>
          </div>

          <div className="today-board-info">
            <span>Board</span>
            <strong>CBSE</strong>
          </div>

          <div className="today-avatar">
            AS
          </div>

        </div>

      </header>

      {/* ================================
          MAIN CONTENT
      ================================= */}

      <main className="today-dashboard-content">

        {/* PAGE HEADER */}

        <section className="today-page-header">

          <div>

            <span className="today-page-label">
              TEACHER WORKSPACE
            </span>

            <h1>
              Today's Lessons
            </h1>

            <p>
              Manage and track your lessons
              scheduled for today.
            </p>

          </div>

          <div className="today-date-card">

            <span>TODAY</span>

            <strong>
              {formattedToday}
            </strong>

          </div>

        </section>

        {/* ================================
            SUMMARY CARDS
        ================================= */}

        <section className="today-summary-grid">

          {/* TOTAL LESSONS */}

          <div className="today-summary-card">

            <div className="today-summary-icon total-icon">
              <MenuBookIcon />
            </div>

            <div>

              <span>
                Total Lessons
              </span>

              <strong>
                {lessons.length}
              </strong>

              <small>
                Scheduled today
              </small>

            </div>

          </div>

          {/* COMPLETED */}

          <div className="today-summary-card">

            <div className="today-summary-icon completed-icon">
              <CheckCircleIcon />
            </div>

            <div>

              <span>
                Completed
              </span>

              <strong>
                {completedLessons.length}
              </strong>

              <small>
                Lessons completed
              </small>

            </div>

          </div>

          {/* PLANNED */}

          <div className="today-summary-card">

            <div className="today-summary-icon planned-icon">
              <ScheduleIcon />
            </div>

            <div>

              <span>
                Planned
              </span>

              <strong>
                {plannedLessons.length}
              </strong>

              <small>
                Awaiting completion
              </small>

            </div>

          </div>

          {/* PENDING */}

          <div className="today-summary-card">

            <div className="today-summary-icon pending-icon">
              <WarningAmberIcon />
            </div>

            <div>

              <span>
                Pending
              </span>

              <strong>
                {pendingLessons.length}
              </strong>

              <small>
                Needs attention
              </small>

            </div>

          </div>

        </section>

        {/* ================================
            TODAY'S PROGRESS
        ================================= */}

        <section className="today-progress-card">

          <div className="today-progress-header">

            <div>

              <h2>
                Today's Progress
              </h2>

              <p>
                Lesson completion for today
              </p>

            </div>

            <strong>
              {completionPercentage}%
            </strong>

          </div>

          <div className="today-progress-bar">

            <div
              className="today-progress-fill"
              style={{
                width:
                  `${completionPercentage}%`,
              }}
            ></div>

          </div>

          <div className="today-progress-footer">

            <span>
              {completedLessons.length} of{" "}
              {lessons.length} lessons completed
            </span>

            <span>
              {lessons.length -
                completedLessons.length}{" "}
              remaining
            </span>

          </div>

        </section>

        {/* ================================
            TODAY'S SCHEDULE
        ================================= */}

        <section className="today-lessons-card">

          <div className="today-section-header">

            <div>

              <h2>
                Today's Schedule
              </h2>

              <p>
                Your planned lessons for today
              </p>

            </div>

            <span className="today-lesson-count">

              {lessons.length}{" "}

              {lessons.length === 1
                ? "Lesson"
                : "Lessons"}

            </span>

          </div>

          <div className="today-lesson-list">

            {lessons.length === 0 ? (

              <div className="today-empty-state">

                <div className="today-empty-icon">
                  <CalendarMonthIcon />
                </div>

                <h3>
                  No lessons scheduled today
                </h3>

                <p>
                  There are no lesson plans
                  scheduled for {formattedToday}.
                </p>

              </div>

            ) : (

              lessons.map(
                (lesson, index) => (

                  <div
                    className="today-lesson-row"
                    key={lesson.id}
                  >

                    <div className="today-period">

                      <span>
                        PERIOD
                      </span>

                      <strong>
                        {index + 1}
                      </strong>

                    </div>

                    <div className="today-time">

                      <strong>
                        {lesson.time}
                      </strong>

                    </div>

                    <div className="today-lesson-info">

                      <h3>
                        {lesson.topic ||
                          "Untitled Lesson"}
                      </h3>

                      <p>
                        {lesson.subject}
                        {" • "}
                        {lesson.className}
                      </p>

                      {/* ==========================
                          HOD APPROVAL STATUS
                      =========================== */}

                      {lesson.approvalStatus && (
                        <span
                          className={`today-approval-status ${
                            lesson.approvalStatus
                              .toLowerCase()
                              .replace(
                                /\s+/g,
                                "-"
                              )
                          }`}
                        >
                          HOD: {lesson.approvalStatus}
                        </span>
                      )}

                      {lesson.objective && (
                        <span className="today-objective">
                          {lesson.objective}
                        </span>
                      )}

                    </div>

                    <div className="today-lesson-actions">

                      <span
                        className={`today-status status-${(
                          lesson.status ||
                          "Planned"
                        )
                          .toLowerCase()
                          .replace(
                            /\s+/g,
                            "-"
                          )}`}
                      >

                        <span className="today-status-dot"></span>

                        {lesson.status ||
                          "Planned"}

                      </span>

                      {lesson.status !==
                        "Completed" && (

                        <button
                          type="button"
                          className="today-complete-button"
                          onClick={() =>
                            onCompleteLesson(
                              lesson
                            )
                          }
                        >
                          Mark Completed
                        </button>

                      )}

                      {lesson.status ===
                        "Completed" && (

                        <span className="completed-label">

                          <CheckCircleIcon />

                          Done

                        </span>

                      )}

                    </div>

                  </div>

                )
              )

            )}

          </div>

        </section>

        {/* ================================
            BOTTOM INFORMATION
        ================================= */}

        <section className="today-bottom-grid">

          <div className="today-info-card">

            <div className="today-info-icon">
              <LightbulbOutlinedIcon />
            </div>

            <div>

              <h3>
                Lesson Planning Tip
              </h3>

              <p>
                Complete your lesson details
                and record what was covered
                after every class.
              </p>

            </div>

          </div>

          <div className="today-info-card">

            <div className="today-info-icon">
              <BarChartIcon />
            </div>

            <div>

              <h3>
                Daily Completion
              </h3>

              <p>
                Keep your lesson completion
                updated to maintain accurate
                syllabus progress.
              </p>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default TodayDashboard;




