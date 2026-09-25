import React, { useMemo, useState } from "react";
import "./AdminDashboard.css";

import AdminClassManagement from "./AdminClassManagement";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ClassIcon from "@mui/icons-material/Class";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SchoolIcon from "@mui/icons-material/School";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";

import AdminSidebar from "./AdminSidebar";

function AdminDashboard({
  lessonPlans = [],
  examDates = [],
  holidays = [],
  onBack,
}) {
  const [activeSection, setActiveSection] =
    useState("dashboard");

  const [showSyllabusForm, setShowSyllabusForm] =
    useState(false);

  const [syllabusForm, setSyllabusForm] = useState({
    className: "",
    subject: "",
    chapter: "",
    topic: "",
    periods: "",
  });

  const [savedSyllabus, setSavedSyllabus] = useState(() => {
    try {
      const stored =
        localStorage.getItem("adminSyllabus");

      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const safeLessons = Array.isArray(lessonPlans)
    ? lessonPlans
    : [];

  const safeExamDates = Array.isArray(examDates)
    ? examDates
    : [];

  const safeHolidays = Array.isArray(holidays)
    ? holidays
    : [];

  /* ==============================
     SYLLABUS DATA
     ============================== */

  const syllabusData = useMemo(() => {
    const subjects = {};

    savedSyllabus.forEach((item) => {
      const subject =
        item?.subject || "Other";

      if (!subjects[subject]) {
        subjects[subject] = {
          total: 0,
          completed: 0,
        };
      }

      subjects[subject].total +=
        Number(item?.periods) || 1;
    });

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
        total: data.total,
        completed: data.completed,
        percentage:
          data.total > 0
            ? Math.min(
                100,
                Math.round(
                  (data.completed / data.total) * 100
                )
              )
            : 0,
      })
    );
  }, [savedSyllabus, safeLessons]);

  /* ==============================
     COUNTS
     ============================== */

  const totalLessons = safeLessons.length;

  const completedLessons = safeLessons.filter(
    (lesson) =>
      String(lesson?.status || "").toLowerCase() ===
      "completed"
  ).length;

  const totalSubjects = syllabusData.length;

  const completionPercentage =
    totalLessons > 0
      ? Math.round(
          (completedLessons / totalLessons) * 100
        )
      : 0;

  const totalSyllabusItems =
    savedSyllabus.length;

  /* ==============================
     OPEN SYLLABUS FORM
     ============================== */

  const openSyllabusForm = () => {
    setSyllabusForm({
      className: "",
      subject: "",
      chapter: "",
      topic: "",
      periods: "",
    });

    setShowSyllabusForm(true);
    setActiveSection("syllabus");
  };

  /* ==============================
     FORM CHANGE
     ============================== */

  const handleSyllabusChange = (event) => {
    const { name, value } = event.target;

    setSyllabusForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* ==============================
     SAVE SYLLABUS
     ============================== */

  const handleSaveSyllabus = (event) => {
    event.preventDefault();

    if (
      !syllabusForm.className.trim() ||
      !syllabusForm.subject.trim() ||
      !syllabusForm.chapter.trim() ||
      !syllabusForm.topic.trim()
    ) {
      alert(
        "Please fill Class, Subject, Chapter and Topic."
      );

      return;
    }

    const newSyllabus = {
      id: Date.now(),

      className:
        syllabusForm.className.trim(),

      subject:
        syllabusForm.subject.trim(),

      chapter:
        syllabusForm.chapter.trim(),

      topic:
        syllabusForm.topic.trim(),

      periods:
        Number(syllabusForm.periods) || 1,

      createdAt:
        new Date().toISOString(),
    };

    const updatedSyllabus = [
      ...savedSyllabus,
      newSyllabus,
    ];

    setSavedSyllabus(updatedSyllabus);

    localStorage.setItem(
      "adminSyllabus",
      JSON.stringify(updatedSyllabus)
    );

    setSyllabusForm({
      className: "",
      subject: "",
      chapter: "",
      topic: "",
      periods: "",
    });

    setShowSyllabusForm(false);

    setActiveSection("syllabus");
  };

  /* ==============================
     DELETE SYLLABUS
     ============================== */

  const handleDeleteSyllabus = (id) => {
    const updatedSyllabus =
      savedSyllabus.filter(
        (item) => item.id !== id
      );

    setSavedSyllabus(updatedSyllabus);

    localStorage.setItem(
      "adminSyllabus",
      JSON.stringify(updatedSyllabus)
    );
  };

  /* ==============================
     DASHBOARD
     ============================== */

  const renderDashboard = () => (
    <>
      <div className="admin-page-heading">

        <div>
          <h1>Admin Dashboard</h1>

          <p>
            Manage academic setup and lesson
            planner configuration.
          </p>
        </div>

        <button
          type="button"
          className="admin-primary-button"
          onClick={openSyllabusForm}
        >
          <AddIcon />
          Add Syllabus
        </button>

      </div>

      <div className="admin-stats-grid">

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            <ClassIcon />
          </div>

          <div>
            <span>Classes</span>

            <strong>
              {
                new Set(
                  [
                    ...safeLessons.map(
                      (lesson) =>
                        lesson?.className
                    ),
                    ...savedSyllabus.map(
                      (item) =>
                        item?.className
                    ),
                  ].filter(Boolean)
                ).size
              }
            </strong>
          </div>

        </div>

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            <MenuBookIcon />
          </div>

          <div>
            <span>Subjects</span>

            <strong>
              {totalSubjects}
            </strong>
          </div>

        </div>

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            <SchoolIcon />
          </div>

          <div>
            <span>Total Lessons</span>

            <strong>
              {totalLessons}
            </strong>
          </div>

        </div>

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            <CheckCircleIcon />
          </div>

          <div>
            <span>Completion</span>

            <strong>
              {completionPercentage}%
            </strong>
          </div>

        </div>

      </div>

      <div className="admin-dashboard-grid">

        <div className="admin-card admin-syllabus-card">

          <div className="admin-card-header">

            <div>
              <h2>
                Syllabus Overview
              </h2>

              <p>
                Current subject-wise lesson
                progress.
              </p>
            </div>

            <MenuBookIcon />

          </div>

          {syllabusData.length === 0 ? (

            <div className="admin-empty-state">

              <MenuBookIcon />

              <h3>
                No syllabus data yet
              </h3>

              <p>
                Add syllabus information to
                start monitoring academic
                progress.
              </p>

              <button
                type="button"
                onClick={openSyllabusForm}
              >
                Add Syllabus
              </button>

            </div>

          ) : (

            <div className="admin-progress-list">

              {syllabusData.map(
                (item) => (

                  <div
                    className="admin-progress-row"
                    key={item.subject}
                  >

                    <div className="admin-progress-name">

                      <span>
                        {item.subject}
                      </span>

                      <strong>
                        {item.percentage}%
                      </strong>

                    </div>

                    <div className="admin-progress-track">

                      <div
                        className="admin-progress-fill"
                        style={{
                          width:
                            `${item.percentage}%`,
                        }}
                      />

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

        <div className="admin-card">

          <div className="admin-card-header">

            <div>

              <h2>
                Academic Calendar
              </h2>

              <p>
                Manage important academic
                dates.
              </p>

            </div>

            <CalendarMonthIcon />

          </div>

          <div className="admin-calendar-summary">

            <div className="admin-calendar-item">

              <div className="admin-calendar-icon exam">
                <SchoolIcon />
              </div>

              <div>

                <span>
                  Examination Dates
                </span>

                <strong>
                  {safeExamDates.length}
                </strong>

              </div>

            </div>

            <div className="admin-calendar-item">

              <div className="admin-calendar-icon holiday">
                <CalendarMonthIcon />
              </div>

              <div>

                <span>
                  Holidays
                </span>

                <strong>
                  {safeHolidays.length}
                </strong>

              </div>

            </div>

          </div>

          <button
            type="button"
            className="admin-secondary-button"
            onClick={() =>
              setActiveSection("calendar")
            }
          >
            Manage Calendar
          </button>

        </div>

      </div>

      <div className="admin-card admin-quick-card">

        <div className="admin-card-header">

          <div>

            <h2>
              Quick Actions
            </h2>

            <p>
              Common academic administration
              tasks.
            </p>

          </div>

        </div>

        <div className="admin-quick-actions">

          <button
            type="button"
            onClick={openSyllabusForm}
          >

            <MenuBookIcon />

            <span>

              <strong>
                Manage Syllabus
              </strong>

              <small>
                Add and update syllabus
              </small>

            </span>

          </button>

          <button
            type="button"
            onClick={() =>
              setActiveSection("classes")
            }
          >

            <ClassIcon />

            <span>

              <strong>
                Classes & Subjects
              </strong>

              <small>
                Manage academic structure
              </small>

            </span>

          </button>

          <button
            type="button"
            onClick={() =>
              setActiveSection("calendar")
            }
          >

            <CalendarMonthIcon />

            <span>

              <strong>
                Academic Calendar
              </strong>

              <small>
                Manage exams and holidays
              </small>

            </span>

          </button>

          <button
            type="button"
            onClick={() =>
              setActiveSection("reports")
            }
          >

            <AssessmentIcon />

            <span>

              <strong>
                Reports
              </strong>

              <small>
                View academic reports
              </small>

            </span>

          </button>

        </div>

      </div>
    </>
  );

  /* ==============================
     SYLLABUS PAGE
     ============================== */

  const renderSyllabus = () => (
    <>
      <div className="admin-page-heading">

        <div>

          <h1>
            Syllabus Management
          </h1>

          <p>
            Add and manage syllabus information
            for the academic year.
          </p>

        </div>

        <button
          type="button"
          className="admin-primary-button"
          onClick={openSyllabusForm}
        >
          <AddIcon />
          Add Syllabus
        </button>

      </div>

      {showSyllabusForm && (

        <div className="admin-card admin-form-card">

          <div className="admin-card-header">

            <div>

              <h2>
                Add Syllabus
              </h2>

              <p>
                Enter the syllabus structure
                that teachers will use while
                planning lessons.
              </p>

            </div>

            <MenuBookIcon />

          </div>

          <form
            className="admin-syllabus-form"
            onSubmit={handleSaveSyllabus}
          >

            <div className="admin-form-grid">

              <div className="admin-form-group">

                <label>
                  Class *
                </label>

                <input
                  type="text"
                  name="className"
                  value={
                    syllabusForm.className
                  }
                  onChange={
                    handleSyllabusChange
                  }
                  placeholder="Example: Class 8"
                />

              </div>

              <div className="admin-form-group">

                <label>
                  Subject *
                </label>

                <input
                  type="text"
                  name="subject"
                  value={
                    syllabusForm.subject
                  }
                  onChange={
                    handleSyllabusChange
                  }
                  placeholder="Example: Mathematics"
                />

              </div>

              <div className="admin-form-group">

                <label>
                  Chapter *
                </label>

                <input
                  type="text"
                  name="chapter"
                  value={
                    syllabusForm.chapter
                  }
                  onChange={
                    handleSyllabusChange
                  }
                  placeholder="Example: Algebra"
                />

              </div>

              <div className="admin-form-group">

                <label>
                  Topic *
                </label>

                <input
                  type="text"
                  name="topic"
                  value={
                    syllabusForm.topic
                  }
                  onChange={
                    handleSyllabusChange
                  }
                  placeholder="Example: Linear Equations"
                />

              </div>

              <div className="admin-form-group">

                <label>
                  Number of Periods
                </label>

                <input
                  type="number"
                  name="periods"
                  min="1"
                  value={
                    syllabusForm.periods
                  }
                  onChange={
                    handleSyllabusChange
                  }
                  placeholder="Example: 5"
                />

              </div>

            </div>

            <div className="admin-form-actions">

              <button
                type="button"
                className="admin-secondary-button"
                onClick={() =>
                  setShowSyllabusForm(false)
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="admin-primary-button"
              >
                <CheckCircleIcon />
                Save Syllabus
              </button>

            </div>

          </form>

        </div>

      )}

      <div className="admin-card">

        <div className="admin-card-header">

          <div>

            <h2>
              Added Syllabus
            </h2>

            <p>
              Syllabus entries created by the
              administrator.
            </p>

          </div>

          <MenuBookIcon />

        </div>

        {savedSyllabus.length === 0 ? (

          <div className="admin-empty-state">

            <MenuBookIcon />

            <h3>
              No syllabus added
            </h3>

            <p>
              Click "Add Syllabus" to create
              the first syllabus entry.
            </p>

            <button
              type="button"
              onClick={openSyllabusForm}
            >
              Add Syllabus
            </button>

          </div>

        ) : (

          <div className="admin-syllabus-table">

            {savedSyllabus.map(
              (item) => (

                <div
                  className="admin-syllabus-row"
                  key={item.id}
                >

                  <div>

                    <strong>
                      {item.subject}
                    </strong>

                    <span>
                      {item.className} •{" "}
                      {item.chapter} •{" "}
                      {item.topic}
                    </span>

                    <small>
                      {item.periods} period
                      {item.periods !== 1
                        ? "s"
                        : ""}
                    </small>

                  </div>

                  <button
                    type="button"
                    className="admin-delete-button"
                    onClick={() =>
                      handleDeleteSyllabus(
                        item.id
                      )
                    }
                    title="Delete syllabus"
                  >
                    <DeleteIcon />
                  </button>

                </div>

              )
            )}

          </div>

        )}

      </div>
    </>
  );

  /* ==============================
     CLASSES
     ============================== */

  const renderClasses = () => (
  <AdminClassManagement />
);
  /* ==============================
     CALENDAR
     ============================== */

  const renderCalendar = () => (
    <>
      <div className="admin-page-heading">

        <div>

          <h1>
            Academic Calendar
          </h1>

          <p>
            Manage examinations and holidays.
          </p>

        </div>

      </div>

      <div className="admin-calendar-page-grid">

        <div className="admin-card">

          <div className="admin-card-header">

            <div>

              <h2>
                Examination Dates
              </h2>

              <p>
                Configured examination dates.
              </p>

            </div>

            <SchoolIcon />

          </div>

          <div className="admin-big-number">
            {safeExamDates.length}
          </div>

        </div>

        <div className="admin-card">

          <div className="admin-card-header">

            <div>

              <h2>
                Holidays
              </h2>

              <p>
                Configured holidays.
              </p>

            </div>

            <CalendarMonthIcon />

          </div>

          <div className="admin-big-number">
            {safeHolidays.length}
          </div>

        </div>

      </div>
    </>
  );

  /* ==============================
     REPORTS
     ============================== */

  const renderReports = () => (
    <>
      <div className="admin-page-heading">

        <div>

          <h1>
            Reports
          </h1>

          <p>
            Academic setup and lesson planner
            reports.
          </p>

        </div>

      </div>

      <div className="admin-report-grid">

        <div className="admin-report-card">

          <MenuBookIcon />

          <span>
            Total Lessons
          </span>

          <strong>
            {totalLessons}
          </strong>

        </div>

        <div className="admin-report-card">

          <CheckCircleIcon />

          <span>
            Completed
          </span>

          <strong>
            {completedLessons}
          </strong>

        </div>

        <div className="admin-report-card">

          <AssessmentIcon />

          <span>
            Completion
          </span>

          <strong>
            {completionPercentage}%
          </strong>

        </div>

        <div className="admin-report-card">

          <MenuBookIcon />

          <span>
            Syllabus Entries
          </span>

          <strong>
            {totalSyllabusItems}
          </strong>

        </div>

      </div>
    </>
  );

  /* ==============================
     SETTINGS
     ============================== */

  const renderSettings = () => (
    <>
      <div className="admin-page-heading">

        <div>

          <h1>
            Settings
          </h1>

          <p>
            Admin workspace settings.
          </p>

        </div>

      </div>

      <div className="admin-card">

        <div className="admin-setting-row">

          <div>

            <strong>
              Workspace
            </strong>

            <span>
              Admin Dashboard
            </span>

          </div>

          <b>
            Active
          </b>

        </div>

        <div className="admin-setting-row">

          <div>

            <strong>
              Role
            </strong>

            <span>
              Administrator
            </span>

          </div>

          <b>
            School Setup
          </b>

        </div>

      </div>
    </>
  );

  /* ==============================
     CONTENT
     ============================== */

  const renderContent = () => {

    switch (activeSection) {

      case "syllabus":
        return renderSyllabus();

      case "classes":
        return renderClasses();

      case "calendar":
        return renderCalendar();

      case "reports":
        return renderReports();

      case "settings":
        return renderSettings();

      case "dashboard":
      default:
        return renderDashboard();
    }
  };

  /* ==============================
     MAIN
     ============================== */

  return (
    <div className="admin-dashboard">

      <AdminSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onBack={onBack}
      />

      <main className="admin-main">

        <header className="admin-header">

          <div className="admin-header-left">

            <h2>
              Admin Workspace
            </h2>

            <span>
              Academic Management
            </span>

          </div>

          <div className="admin-header-right">

            <button
              type="button"
              className="admin-notification"
            >
              <NotificationsNoneIcon />
            </button>

            <div className="admin-user">

              <AccountCircleIcon />

              <div>

                <strong>
                  Admin
                </strong>

                <span>
                  Administrator
                </span>

              </div>

            </div>

          </div>

        </header>

        <section className="admin-content">
          {renderContent()}
        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;