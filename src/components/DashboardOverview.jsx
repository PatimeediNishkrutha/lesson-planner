import React from "react";

import TodayIcon from "@mui/icons-material/Today";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import "./DashboardOverview.css";

function DashboardOverview({
  lessonPlans = [],
  onToday,
  onCreateLesson,
  onCalendar,
  onPlanner,
}) {
  const today = new Date();

  const todayDate = today.toISOString().split("T")[0];

  const todayLessons = lessonPlans.filter(
    (lesson) => lesson.date === todayDate
  );

  const completedLessons = lessonPlans.filter(
    (lesson) => lesson.status === "Completed"
  );

  const pendingLessons = lessonPlans.filter(
    (lesson) =>
      lesson.status === "Planned" ||
      lesson.status === "Pending Review" ||
      lesson.status === "Submitted"
  );

  const completionPercentage =
    lessonPlans.length > 0
      ? Math.round(
          (completedLessons.length / lessonPlans.length) * 100
        )
      : 0;

  const formattedDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="dashboard-overview">

      {/* ================================
          WELCOME
      ================================= */}

      <section className="overview-welcome">
        <div>
          <p className="overview-label">
            LESSON PLANNER
          </p>

          <h1>
            Good afternoon, Teacher
          </h1>

          <p className="overview-date">
            {formattedDate}
          </p>

          <p className="overview-description">
            Manage your lessons, track delivery and
            monitor your teaching progress.
          </p>
        </div>

        <div className="overview-welcome-icon">
          <TodayIcon />
        </div>
      </section>

      {/* ================================
          SUMMARY CARDS
      ================================= */}

      <section className="overview-summary-grid">

        <div className="overview-stat-card">
          <div className="overview-stat-icon blue">
            <TodayIcon />
          </div>

          <div>
            <span>
              Today's Lessons
            </span>

            <strong>
              {todayLessons.length}
            </strong>
          </div>
        </div>

        <div className="overview-stat-card">
          <div className="overview-stat-icon green">
            <CheckCircleIcon />
          </div>

          <div>
            <span>
              Completed
            </span>

            <strong>
              {completedLessons.length}
            </strong>
          </div>
        </div>

        <div className="overview-stat-card">
          <div className="overview-stat-icon orange">
            <PendingActionsIcon />
          </div>

          <div>
            <span>
              Pending
            </span>

            <strong>
              {pendingLessons.length}
            </strong>
          </div>
        </div>

        <div className="overview-stat-card">
          <div className="overview-stat-icon purple">
            <MenuBookIcon />
          </div>

          <div>
            <span>
              Lesson Plans
            </span>

            <strong>
              {lessonPlans.length}
            </strong>
          </div>
        </div>

      </section>

      {/* ================================
          MAIN CONTENT
      ================================= */}

      <section className="overview-content-grid">

        {/* TODAY'S SCHEDULE */}

        <div className="overview-panel">

          <div className="overview-panel-header">
            <div>
              <h2>
                Today's Schedule
              </h2>

              <p>
                Your lessons for today
              </p>
            </div>

            <button
              type="button"
              onClick={onToday}
            >
              View all
            </button>
          </div>

          <div className="schedule-list">

            {todayLessons.length === 0 ? (

              <div className="overview-empty">

                <TodayIcon />

                <h3>
                  No lessons planned today
                </h3>

                <p>
                  Create a lesson plan to see it
                  in today's schedule.
                </p>

                <button
                  type="button"
                  onClick={onCreateLesson}
                >
                  Create Lesson
                </button>

              </div>

            ) : (

              todayLessons
                .slice(0, 5)
                .map((lesson) => (

                  <div
                    className="schedule-item"
                    key={lesson.id}
                  >

                    <div className="schedule-time">
                      {lesson.time || "Time not set"}
                    </div>

                    <div className="schedule-details">

                      <h3>
                        {lesson.topic || "Untitled Lesson"}
                      </h3>

                      <p>
                        {lesson.subject || "Subject not set"}
                        {" · "}
                        {lesson.className || "Class not set"}
                      </p>

                    </div>

                    <span
                      className={`schedule-status ${String(
                        lesson.status || ""
                      )
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {lesson.status || "Planned"}
                    </span>

                  </div>

                ))

            )}

          </div>

        </div>

        {/* SYLLABUS PROGRESS */}

        <div className="overview-panel">

          <div className="overview-panel-header">

            <div>
              <h2>
                Syllabus Progress
              </h2>

              <p>
                Track your lesson planning progress
              </p>
            </div>

            <MenuBookIcon />

          </div>

          <div className="syllabus-progress">

            <div className="progress-row">

              <div className="progress-label">

                <span>
                  Class 8 - A
                </span>

                <strong>
                  {completionPercentage}%
                </strong>

              </div>

              <div className="progress-track">

                <div
                  className="progress-fill"
                  style={{
                    width: `${completionPercentage}%`,
                  }}
                />

              </div>

            </div>

            <div className="progress-row">

              <div className="progress-label">

                <span>
                  Class 8 - B
                </span>

                <strong>
                  0%
                </strong>

              </div>

              <div className="progress-track">

                <div
                  className="progress-fill"
                  style={{
                    width: "0%",
                  }}
                />

              </div>

            </div>

            <div className="progress-row">

              <div className="progress-label">

                <span>
                  Class 7 - A
                </span>

                <strong>
                  0%
                </strong>

              </div>

              <div className="progress-track">

                <div
                  className="progress-fill"
                  style={{
                    width: "0%",
                  }}
                />

              </div>

            </div>

            <button
              type="button"
              className="progress-button"
              onClick={onPlanner}
            >
              View Lesson Plans
            </button>

          </div>

        </div>

      </section>

      {/* ================================
          QUICK ACTIONS
      ================================= */}

      <section className="overview-section">

        <div className="overview-section-heading">

          <div>
            <h2>
              Quick Actions
            </h2>

            <p>
              Frequently used lesson planner actions
            </p>
          </div>

        </div>

        <div className="quick-actions-grid">

          <button
            type="button"
            className="quick-action-card"
            onClick={onCreateLesson}
          >

            <div className="quick-action-icon">
              <AddCircleIcon />
            </div>

            <div>
              <h3>
                Create Lesson Plan
              </h3>

              <p>
                Plan a new lesson
              </p>
            </div>

          </button>

          <button
            type="button"
            className="quick-action-card"
            onClick={onPlanner}
          >

            <div className="quick-action-icon">
              <AssignmentTurnedInIcon />
            </div>

            <div>
              <h3>
                My Lesson Plans
              </h3>

              <p>
                View and manage plans
              </p>
            </div>

          </button>

          <button
            type="button"
            className="quick-action-card"
            onClick={onCalendar}
          >

            <div className="quick-action-icon">
              <CalendarMonthIcon />
            </div>

            <div>
              <h3>
                Lesson Calendar
              </h3>

              <p>
                View lessons by date
              </p>
            </div>

          </button>

          <button
            type="button"
            className="quick-action-card"
            onClick={onToday}
          >

            <div className="quick-action-icon">
              <CheckCircleIcon />
            </div>

            <div>
              <h3>
                Lesson Completion
              </h3>

              <p>
                Mark today's lessons
              </p>
            </div>

          </button>

        </div>

      </section>

      {/* ================================
          RECENT LESSON PLANS
      ================================= */}

      <section className="overview-panel recent-plans-panel">

        <div className="overview-panel-header">

          <div>
            <h2>
              Recent Lesson Plans
            </h2>

            <p>
              Your latest lesson planning activity
            </p>
          </div>

          <button
            type="button"
            onClick={onPlanner}
          >
            View all
          </button>

        </div>

        {lessonPlans.length === 0 ? (

          <div className="overview-empty compact">

            <MenuBookIcon />

            <h3>
              No lesson plans yet
            </h3>

            <p>
              Your recent lesson plans will
              appear here.
            </p>

          </div>

        ) : (

          <div className="recent-plans-list">

            {lessonPlans
              .slice(-5)
              .reverse()
              .map((lesson) => (

                <div
                  className="recent-plan-row"
                  key={lesson.id}
                >

                  <div className="recent-plan-icon">
                    <MenuBookIcon />
                  </div>

                  <div className="recent-plan-info">

                    <h3>
                      {lesson.topic || "Untitled Lesson"}
                    </h3>

                    <p>
                      {lesson.subject || "Subject not set"}
                      {" · "}
                      {lesson.className || "Class not set"}
                    </p>

                  </div>

                  <div className="recent-plan-date">

                    <span>
                      {lesson.date || "Date not set"}
                    </span>

                    <strong
                      className={`recent-plan-status ${String(
                        lesson.status || ""
                      )
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {lesson.status || "Planned"}
                    </strong>

                  </div>

                </div>

              ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default DashboardOverview;