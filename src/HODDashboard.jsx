
import { useMemo, useState } from "react";
import "./HODDashboard.css";

import HODSidebar from "./HODSidebar";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import ApprovalIcon from "@mui/icons-material/Approval";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssessmentIcon from "@mui/icons-material/Assessment";
import EventIcon from "@mui/icons-material/Event";
import AddIcon from "@mui/icons-material/Add";

function HODDashboard({
  lessonPlans = [],
  examDates = [],
  holidays = [],
  onBack,
  onReviewLesson,
  onAddHoliday,
  onAddExam,
}) {
  const [activeSection, setActiveSection] =
    useState("dashboard");

  const [reviewFilter, setReviewFilter] =
    useState("Pending");

  const [selectedLesson, setSelectedLesson] =
    useState(null);

  const [showHolidayForm, setShowHolidayForm] =
    useState(false);

  const [showExamForm, setShowExamForm] =
    useState(false);

  const [holidayForm, setHolidayForm] =
    useState({
      startDate: "",
      endDate: "",
      name: "",
    });

  const [examForm, setExamForm] =
    useState({
      startDate: "",
      endDate: "",
      name: "",
    });

  /*
   * ============================================
   * SAFE LESSON DATA
   * ============================================
   */

  const lessons = Array.isArray(lessonPlans)
    ? lessonPlans
    : [];

  /*
   * ============================================
   * STATUS HELPERS
   * ============================================
   */

  const getLessonStatus = (lesson) => {
    return lesson?.status || "Planned";
  };

  const getApprovalStatus = (lesson) => {
    return lesson?.approvalStatus || "Draft";
  };

  /*
   * ============================================
   * DATE RANGE HELPER
   * ============================================
   */

  const generateDateRange = (
    startDate,
    endDate
  ) => {
    if (!startDate || !endDate) {
      return [];
    }

    const start = new Date(
      `${startDate}T00:00:00`
    );

    const end = new Date(
      `${endDate}T00:00:00`
    );

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime())
    ) {
      return [];
    }

    if (start > end) {
      return [];
    }

    const dates = [];
    const current = new Date(start);

    while (current <= end) {
      const year = current.getFullYear();

      const month = String(
        current.getMonth() + 1
      ).padStart(2, "0");

      const day = String(
        current.getDate()
      ).padStart(2, "0");

      dates.push(
        `${year}-${month}-${day}`
      );

      current.setDate(
        current.getDate() + 1
      );
    }

    return dates;
  };

  /*
   * ============================================
   * DASHBOARD COUNTS
   * ============================================
   */

  const dashboardStats = useMemo(() => {
    const total = lessons.length;

    const planned = lessons.filter(
      (lesson) =>
        getLessonStatus(lesson) === "Planned"
    ).length;

    const completed = lessons.filter(
      (lesson) =>
        getLessonStatus(lesson) === "Completed"
    ).length;

    const partlyDone = lessons.filter(
      (lesson) =>
        getLessonStatus(lesson) ===
        "Partly done"
    ).length;

    const notDone = lessons.filter(
      (lesson) =>
        getLessonStatus(lesson) === "Not done"
    ).length;

    const approved = lessons.filter(
      (lesson) =>
        getApprovalStatus(lesson) ===
        "Approved"
    ).length;

    const rejected = lessons.filter(
      (lesson) =>
        getApprovalStatus(lesson) ===
        "Rejected"
    ).length;

    const pending = lessons.filter((lesson) => {
      const approval =
        getApprovalStatus(lesson);

      return (
        approval === "Draft" ||
        approval === "Submitted" ||
        approval === "Pending Review"
      );
    }).length;

    return {
      total,
      planned,
      completed,
      partlyDone,
      notDone,
      approved,
      rejected,
      pending,
    };
  }, [lessons]);

  /*
   * ============================================
   * PERCENTAGES
   * ============================================
   */

  const completionPercentage =
    dashboardStats.total > 0
      ? Math.round(
          (dashboardStats.completed /
            dashboardStats.total) *
            100
        )
      : 0;

  const approvalPercentage =
    dashboardStats.total > 0
      ? Math.round(
          (dashboardStats.approved /
            dashboardStats.total) *
            100
        )
      : 0;

  /*
   * ============================================
   * PENDING APPROVALS
   * ============================================
   */

  const pendingLessons =
    lessons.filter((lesson) => {
      const approval =
        getApprovalStatus(lesson);

      return (
        approval === "Draft" ||
        approval === "Submitted" ||
        approval === "Pending Review"
      );
    });

  /*
   * ============================================
   * FILTERED APPROVAL LESSONS
   * ============================================
   */

  const filteredReviewLessons =
    reviewFilter === "Pending"
      ? pendingLessons
      : reviewFilter === "Approved"
      ? lessons.filter(
          (lesson) =>
            getApprovalStatus(lesson) ===
            "Approved"
        )
      : lessons.filter(
          (lesson) =>
            getApprovalStatus(lesson) ===
            "Rejected"
        );

  /*
   * ============================================
   * SUBJECT REPORT
   * ============================================
   */

  const subjectReport = useMemo(() => {
    const subjects = {};

    lessons.forEach((lesson) => {
      const subject =
        lesson?.subject ||
        "Unknown Subject";

      if (!subjects[subject]) {
        subjects[subject] = {
          subject,
          total: 0,
          completed: 0,
          partlyDone: 0,
          notDone: 0,
          planned: 0,
        };
      }

      subjects[subject].total += 1;

      const status =
        getLessonStatus(lesson);

      if (status === "Completed") {
        subjects[subject].completed += 1;
      }

      if (status === "Partly done") {
        subjects[subject].partlyDone += 1;
      }

      if (status === "Not done") {
        subjects[subject].notDone += 1;
      }

      if (status === "Planned") {
        subjects[subject].planned += 1;
      }
    });

    return Object.values(subjects);
  }, [lessons]);

  /*
   * ============================================
   * EXAM DATA
   * ============================================
   */

  const exams = Array.isArray(examDates)
    ? examDates
    : [];

  /*
   * ============================================
   * HOLIDAY DATA
   * ============================================
   */

  const holidayList =
    Array.isArray(holidays)
      ? holidays
      : [];

  /*
   * ============================================
   * ADD HOLIDAY RANGE
   * ============================================
   */

  const handleHolidaySubmit = (event) => {
    event.preventDefault();

    if (!holidayForm.startDate) {
      alert(
        "Please select the holiday start date."
      );
      return;
    }

    if (!holidayForm.endDate) {
      alert(
        "Please select the holiday end date."
      );
      return;
    }

    if (!holidayForm.name.trim()) {
      alert("Please enter holiday name.");
      return;
    }

    if (
      holidayForm.startDate >
      holidayForm.endDate
    ) {
      alert(
        "Holiday end date cannot be before the start date."
      );
      return;
    }

    if (typeof onAddHoliday !== "function") {
      alert(
        "Holiday management is not connected."
      );
      return;
    }

    const holidayDates =
      generateDateRange(
        holidayForm.startDate,
        holidayForm.endDate
      );

    if (holidayDates.length === 0) {
      alert(
        "Unable to generate holiday dates."
      );
      return;
    }

    holidayDates.forEach(
      (date, index) => {
        onAddHoliday({
          id:
            Date.now() +
            index,
          date,
          name:
            holidayForm.name.trim(),
          startDate:
            holidayForm.startDate,
          endDate:
            holidayForm.endDate,
          addedBy: "HOD",
          createdAt:
            new Date().toISOString(),
        });
      }
    );

    setHolidayForm({
      startDate: "",
      endDate: "",
      name: "",
    });

    setShowHolidayForm(false);

    alert(
      `${holidayDates.length} holiday day(s) added successfully. Teacher lessons on these dates will be rescheduled.`
    );
  };

  /*
   * ============================================
   * ADD EXAM RANGE
   * ============================================
   */

  const handleExamSubmit = (event) => {
    event.preventDefault();

    if (!examForm.startDate) {
      alert(
        "Please select the examination start date."
      );
      return;
    }

    if (!examForm.endDate) {
      alert(
        "Please select the examination end date."
      );
      return;
    }

    if (!examForm.name.trim()) {
      alert(
        "Please enter examination name."
      );
      return;
    }

    if (
      examForm.startDate >
      examForm.endDate
    ) {
      alert(
        "Examination end date cannot be before the start date."
      );
      return;
    }

    if (typeof onAddExam !== "function") {
      alert(
        "Examination management is not connected."
      );
      return;
    }

    const examDatesList =
      generateDateRange(
        examForm.startDate,
        examForm.endDate
      );

    if (examDatesList.length === 0) {
      alert(
        "Unable to generate examination dates."
      );
      return;
    }

    examDatesList.forEach(
      (date, index) => {
        onAddExam({
          id:
            Date.now() +
            index,
          date,
          name:
            examForm.name.trim(),
          startDate:
            examForm.startDate,
          endDate:
            examForm.endDate,
          addedBy: "HOD",
          createdAt:
            new Date().toISOString(),
        });
      }
    );

    setExamForm({
      startDate: "",
      endDate: "",
      name: "",
    });

    setShowExamForm(false);

    alert(
      `${examDatesList.length} examination day(s) added successfully. Teacher lessons on these dates will be rescheduled.`
    );
  };

  /*
   * ============================================
   * DASHBOARD
   * ============================================
   */

  const renderDashboard = () => {
    return (
      <div className="hod-page">

        <div className="hod-page-header">
          <div>
            <p className="hod-label">
              HOD WORKSPACE
            </p>

            <h1>
              Department Dashboard
            </h1>

            <p className="hod-subtitle">
              Monitor lesson planning,
              completion and approvals.
            </p>
          </div>
        </div>

        <div className="hod-stat-grid">

          <div className="hod-stat-card">
            <div className="hod-stat-icon blue">
              <MenuBookIcon />
            </div>

            <div>
              <span>Total Lessons</span>
              <strong>
                {dashboardStats.total}
              </strong>
            </div>
          </div>

          <div className="hod-stat-card">
            <div className="hod-stat-icon green">
              <AssignmentIcon />
            </div>

            <div>
              <span>Completed</span>
              <strong>
                {dashboardStats.completed}
              </strong>
            </div>
          </div>

          <div className="hod-stat-card">
            <div className="hod-stat-icon orange">
              <ApprovalIcon />
            </div>

            <div>
              <span>Pending Approval</span>
              <strong>
                {dashboardStats.pending}
              </strong>
            </div>
          </div>

          <div className="hod-stat-card">
            <div className="hod-stat-icon purple">
              <AssessmentIcon />
            </div>

            <div>
              <span>Approved</span>
              <strong>
                {dashboardStats.approved}
              </strong>
            </div>
          </div>

        </div>

        <div className="hod-dashboard-grid">

          <div className="hod-panel">

            <div className="hod-panel-header">

              <div>
                <h2>
                  Lesson Completion
                </h2>

                <p>
                  Overall department progress
                </p>
              </div>

              <strong className="hod-percentage">
                {completionPercentage}%
              </strong>

            </div>

            <div className="hod-progress-track">
              <div
                className="hod-progress-fill"
                style={{
                  width:
                    `${completionPercentage}%`,
                }}
              />
            </div>

            <div className="hod-progress-details">

              <span>
                Completed:{" "}
                {dashboardStats.completed}
              </span>

              <span>
                Total:{" "}
                {dashboardStats.total}
              </span>

            </div>

          </div>

          <div className="hod-panel">

            <div className="hod-panel-header">

              <div>
                <h2>
                  Approval Progress
                </h2>

                <p>
                  HOD review progress
                </p>
              </div>

              <strong className="hod-percentage">
                {approvalPercentage}%
              </strong>

            </div>

            <div className="hod-progress-track">

              <div
                className="hod-progress-fill approval"
                style={{
                  width:
                    `${approvalPercentage}%`,
                }}
              />

            </div>

            <div className="hod-progress-details">

              <span>
                Approved:{" "}
                {dashboardStats.approved}
              </span>

              <span>
                Pending:{" "}
                {dashboardStats.pending}
              </span>

            </div>

          </div>

        </div>

        <div className="hod-panel">

          <div className="hod-panel-header">

            <div>
              <h2>
                Subject Overview
              </h2>

              <p>
                Lesson completion by subject
              </p>
            </div>

          </div>

          {subjectReport.length === 0 ? (
            <div className="hod-empty-state">
              <MenuBookIcon />

              <p>
                No lesson data available.
              </p>
            </div>
          ) : (
            <div className="hod-table-wrapper">

              <table className="hod-table">

                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Total</th>
                    <th>Planned</th>
                    <th>Completed</th>
                    <th>Partly Done</th>
                    <th>Not Done</th>
                  </tr>
                </thead>

                <tbody>

                  {subjectReport.map(
                    (item) => (
                      <tr
                        key={
                          item.subject
                        }
                      >

                        <td>
                          <strong>
                            {item.subject}
                          </strong>
                        </td>

                        <td>
                          {item.total}
                        </td>

                        <td>
                          {item.planned}
                        </td>

                        <td>
                          {item.completed}
                        </td>

                        <td>
                          {item.partlyDone}
                        </td>

                        <td>
                          {item.notDone}
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    );
  };

  /*
   * ============================================
   * LESSON PLANS
   * ============================================
   */

  const renderLessonPlans = () => {
    return (
      <div className="hod-page">

        <div className="hod-page-header">

          <div>
            <p className="hod-label">
              LESSON MANAGEMENT
            </p>

            <h1>
              Lesson Plans
            </h1>

            <p className="hod-subtitle">
              View lessons planned by teachers.
            </p>
          </div>

        </div>

        <div className="hod-summary-row">

          <div className="hod-mini-card">
            <span>Total</span>
            <strong>
              {dashboardStats.total}
            </strong>
          </div>

          <div className="hod-mini-card">
            <span>Planned</span>
            <strong>
              {dashboardStats.planned}
            </strong>
          </div>

          <div className="hod-mini-card">
            <span>Completed</span>
            <strong>
              {dashboardStats.completed}
            </strong>
          </div>

          <div className="hod-mini-card">
            <span>Not Done</span>
            <strong>
              {dashboardStats.notDone}
            </strong>
          </div>

        </div>

        <div className="hod-panel">

          {lessons.length === 0 ? (

            <div className="hod-empty-state">

              <MenuBookIcon />

              <h3>
                No Lesson Plans
              </h3>

              <p>
                No lesson plans have been
                created yet.
              </p>

            </div>

          ) : (

            <div className="hod-table-wrapper">

              <table className="hod-table">

                <thead>
                  <tr>
                    <th>Topic</th>
                    <th>Subject</th>
                    <th>Class</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Approval</th>
                  </tr>
                </thead>

                <tbody>

                  {lessons.map(
                    (lesson) => (

                      <tr
                        key={
                          lesson.id
                        }
                      >

                        <td>
                          <strong>
                            {
                              lesson.topic ||
                              "Untitled Lesson"
                            }
                          </strong>
                        </td>

                        <td>
                          {
                            lesson.subject ||
                            "—"
                          }
                        </td>

                        <td>
                          {
                            lesson.className ||
                            "—"
                          }
                        </td>

                        <td>
                          {
                            lesson.date ||
                            "—"
                          }
                        </td>

                        <td>

                          <span
                            className={
                              `hod-status ${String(
                                getLessonStatus(
                                  lesson
                                )
                              )
                                .toLowerCase()
                                .replace(
                                  /\s+/g,
                                  "-"
                                )}`
                            }
                          >
                            {
                              getLessonStatus(
                                lesson
                              )
                            }
                          </span>

                        </td>

                        <td>

                          <span
                            className={
                              `hod-status ${String(
                                getApprovalStatus(
                                  lesson
                                )
                              )
                                .toLowerCase()
                                .replace(
                                  /\s+/g,
                                  "-"
                                )}`
                            }
                          >
                            {
                              getApprovalStatus(
                                lesson
                              )
                            }
                          </span>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    );
  };

  /*
   * ============================================
   * APPROVALS
   * ============================================
   */

  const renderApprovals = () => {
    return (
      <div className="hod-page">

        <div className="hod-page-header">

          <div>
            <p className="hod-label">
              REVIEW WORKFLOW
            </p>

            <h1>
              Lesson Approvals
            </h1>

            <p className="hod-subtitle">
              Review teacher lesson plans and
              approve or send them back.
            </p>
          </div>

        </div>

        <div className="hod-filter-row">

          <button
            type="button"
            className={
              reviewFilter === "Pending"
                ? "hod-filter active"
                : "hod-filter"
            }
            onClick={() =>
              setReviewFilter(
                "Pending"
              )
            }
          >
            Pending
          </button>

          <button
            type="button"
            className={
              reviewFilter === "Approved"
                ? "hod-filter active"
                : "hod-filter"
            }
            onClick={() =>
              setReviewFilter(
                "Approved"
              )
            }
          >
            Approved
          </button>

          <button
            type="button"
            className={
              reviewFilter === "Rejected"
                ? "hod-filter active"
                : "hod-filter"
            }
            onClick={() =>
              setReviewFilter(
                "Rejected"
              )
            }
          >
            Sent Back
          </button>

        </div>

        <div className="hod-panel">

          {filteredReviewLessons.length === 0 ? (

            <div className="hod-empty-state">

              <ApprovalIcon />

              <h3>
                No Lessons Found
              </h3>

              <p>
                There are no lessons in this
                approval category.
              </p>

            </div>

          ) : (

            <div className="hod-approval-list">

              {filteredReviewLessons.map(
                (lesson) => (

                  <div
                    className="hod-approval-card"
                    key={
                      lesson.id
                    }
                  >

                    <div>

                      <h3>
                        {
                          lesson.topic ||
                          "Untitled Lesson"
                        }
                      </h3>

                      <p>
                        {
                          lesson.subject ||
                          "Subject not available"
                        }

                        {" • "}

                        {
                          lesson.className ||
                          "Class not available"
                        }
                      </p>

                      <span>
                        Date:{" "}
                        {
                          lesson.date ||
                          "—"
                        }
                      </span>

                    </div>

                    <button
                      type="button"
                      className="hod-review-button"
                      onClick={() =>
                        setSelectedLesson(
                          lesson
                        )
                      }
                    >
                      Review Lesson
                    </button>

                  </div>
                )
              )}

            </div>
          )}

        </div>

      </div>
    );
  };

  /*
   * ============================================
   * EXAMINATION + HOLIDAY MANAGEMENT
   * ============================================
   */

  const renderExamination = () => {
    return (
      <div className="hod-page">

        <div className="hod-page-header">

          <div>

            <p className="hod-label">
              ACADEMIC CALENDAR
            </p>

            <h1>
              Examination & Holidays
            </h1>

            <p className="hod-subtitle">
              Manage examination periods and
              school holiday periods for lesson
              planning.
            </p>

          </div>

        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >

          <button
            type="button"
            className="hod-review-button"
            onClick={() =>
              setShowHolidayForm(
                (previous) =>
                  !previous
              )
            }
          >

            <AddIcon
              style={{
                verticalAlign: "middle",
                marginRight: "6px",
              }}
            />

            Add Holiday Period

          </button>

          <button
            type="button"
            className="hod-review-button"
            onClick={() =>
              setShowExamForm(
                (previous) =>
                  !previous
              )
            }
          >

            <AddIcon
              style={{
                verticalAlign: "middle",
                marginRight: "6px",
              }}
            />

            Add Exam Period

          </button>

        </div>

        {showHolidayForm && (

          <div className="hod-panel">

            <div className="hod-panel-header">

              <div>

                <h2>
                  Add Holiday Period
                </h2>

                <p>
                  You can select multiple
                  consecutive holiday days.
                  Every date will be stored
                  separately.
                </p>

              </div>

              <EventIcon />

            </div>

            <form
              onSubmit={
                handleHolidaySubmit
              }
              style={{
                display: "grid",
                gap: "16px",
                marginTop: "20px",
              }}
            >

              <div>

                <label>
                  Holiday Name
                </label>

                <input
                  type="text"
                  value={
                    holidayForm.name
                  }
                  onChange={(event) =>
                    setHolidayForm(
                      (previous) => ({
                        ...previous,
                        name:
                          event.target.value,
                      })
                    )
                  }
                  placeholder="Example: Dasara Holidays"
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginTop: "6px",
                    boxSizing:
                      "border-box",
                  }}
                />

              </div>

              <div>

                <label>
                  Holiday Start Date
                </label>

                <input
                  type="date"
                  value={
                    holidayForm.startDate
                  }
                  onChange={(event) =>
                    setHolidayForm(
                      (previous) => ({
                        ...previous,
                        startDate:
                          event.target.value,
                      })
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginTop: "6px",
                    boxSizing:
                      "border-box",
                  }}
                />

              </div>

              <div>

                <label>
                  Holiday End Date
                </label>

                <input
                  type="date"
                  value={
                    holidayForm.endDate
                  }
                  min={
                    holidayForm.startDate ||
                    undefined
                  }
                  onChange={(event) =>
                    setHolidayForm(
                      (previous) => ({
                        ...previous,
                        endDate:
                          event.target.value,
                      })
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginTop: "6px",
                    boxSizing:
                      "border-box",
                  }}
                />

              </div>

              {holidayForm.startDate &&
                holidayForm.endDate &&
                holidayForm.startDate <=
                  holidayForm.endDate && (
                  <div
                    style={{
                      padding: "12px",
                      borderRadius: "8px",
                      background:
                        "#f3f6fa",
                    }}
                  >
                    <strong>
                      Holiday Days:{" "}
                      {
                        generateDateRange(
                          holidayForm.startDate,
                          holidayForm.endDate
                        ).length
                      }
                    </strong>

                    <div
                      style={{
                        marginTop: "6px",
                        fontSize:
                          "14px",
                      }}
                    >
                      {
                        generateDateRange(
                          holidayForm.startDate,
                          holidayForm.endDate
                        ).join(", ")
                      }
                    </div>
                  </div>
                )}

              <button
                type="submit"
                className="hod-review-button"
              >
                Save Holiday Period
              </button>

            </form>

          </div>
        )}

        {showExamForm && (

          <div className="hod-panel">

            <div className="hod-panel-header">

              <div>

                <h2>
                  Add Examination Period
                </h2>

                <p>
                  Enter the complete
                  examination period.
                  Every examination date
                  will be stored separately.
                </p>

              </div>

              <AssignmentIcon />

            </div>

            <form
              onSubmit={
                handleExamSubmit
              }
              style={{
                display: "grid",
                gap: "16px",
                marginTop: "20px",
              }}
            >

              <div>

                <label>
                  Examination Name
                </label>

                <input
                  type="text"
                  value={
                    examForm.name
                  }
                  onChange={(event) =>
                    setExamForm(
                      (previous) => ({
                        ...previous,
                        name:
                          event.target.value,
                      })
                    )
                  }
                  placeholder="Example: SA-1 Examinations"
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginTop: "6px",
                    boxSizing:
                      "border-box",
                  }}
                />

              </div>

              <div>

                <label>
                  Examination Start Date
                </label>

                <input
                  type="date"
                  value={
                    examForm.startDate
                  }
                  onChange={(event) =>
                    setExamForm(
                      (previous) => ({
                        ...previous,
                        startDate:
                          event.target.value,
                      })
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginTop: "6px",
                    boxSizing:
                      "border-box",
                  }}
                />

              </div>

              <div>

                <label>
                  Examination End Date
                </label>

                <input
                  type="date"
                  value={
                    examForm.endDate
                  }
                  min={
                    examForm.startDate ||
                    undefined
                  }
                  onChange={(event) =>
                    setExamForm(
                      (previous) => ({
                        ...previous,
                        endDate:
                          event.target.value,
                      })
                    )
                  }
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginTop: "6px",
                    boxSizing:
                      "border-box",
                  }}
                />

              </div>

              {examForm.startDate &&
                examForm.endDate &&
                examForm.startDate <=
                  examForm.endDate && (
                  <div
                    style={{
                      padding: "12px",
                      borderRadius: "8px",
                      background:
                        "#f3f6fa",
                    }}
                  >

                    <strong>
                      Examination Days:{" "}
                      {
                        generateDateRange(
                          examForm.startDate,
                          examForm.endDate
                        ).length
                      }
                    </strong>

                    <div
                      style={{
                        marginTop: "6px",
                        fontSize:
                          "14px",
                      }}
                    >
                      {
                        generateDateRange(
                          examForm.startDate,
                          examForm.endDate
                        ).join(", ")
                      }
                    </div>

                  </div>
                )}

              <button
                type="submit"
                className="hod-review-button"
              >
                Save Examination Period
              </button>

            </form>

          </div>
        )}

        <div className="hod-summary-row">

          <div className="hod-mini-card">

            <span>
              Exam Days
            </span>

            <strong>
              {exams.length}
            </strong>

          </div>

          <div className="hod-mini-card">

            <span>
              Holiday Days
            </span>

            <strong>
              {holidayList.length}
            </strong>

          </div>

        </div>

        <div className="hod-panel">

          <div className="hod-panel-header">

            <div>

              <h2>
                Examination Dates
              </h2>

              <p>
                Every date in an examination
                period is listed separately.
              </p>

            </div>

          </div>

          {exams.length === 0 ? (

            <div className="hod-empty-state">

              <AssignmentIcon />

              <h3>
                No Examination Dates
              </h3>

              <p>
                Click "Add Exam Period" to
                configure an examination
                period.
              </p>

            </div>

          ) : (

            <div className="hod-exam-list">

              {exams.map(
                (exam, index) => {

                  const examDate =
                    typeof exam === "string"
                      ? exam
                      : exam?.date;

                  const examName =
                    typeof exam === "string"
                      ? "Examination"
                      : exam?.name ||
                        "Examination";

                  return (

                    <div
                      className="hod-exam-card"
                      key={
                        exam?.id ||
                        `${examDate}-${index}`
                      }
                    >

                      <div className="hod-exam-icon">
                        <AssignmentIcon />
                      </div>

                      <div>

                        <h3>
                          {examName}
                        </h3>

                        <p>
                          {examDate || "—"}
                        </p>

                      </div>

                    </div>
                  );
                }
              )}

            </div>
          )}

        </div>

        <div className="hod-panel">

          <div className="hod-panel-header">

            <div>

              <h2>
                School Holidays
              </h2>

              <p>
                Every date in a holiday
                period is listed separately.
              </p>

            </div>

            <EventIcon />

          </div>

          {holidayList.length === 0 ? (

            <div className="hod-empty-state">

              <EventIcon />

              <h3>
                No Holidays
              </h3>

              <p>
                Click "Add Holiday Period"
                to configure school
                holidays.
              </p>

            </div>

          ) : (

            <div className="hod-exam-list">

              {holidayList.map(
                (holiday, index) => {

                  const holidayDate =
                    typeof holiday === "string"
                      ? holiday
                      : holiday?.date;

                  const holidayName =
                    typeof holiday === "string"
                      ? "School Holiday"
                      : holiday?.name ||
                        "School Holiday";

                  return (

                    <div
                      className="hod-exam-card"
                      key={
                        holiday?.id ||
                        `${holidayDate}-${index}`
                      }
                    >

                      <div className="hod-exam-icon">
                        <EventIcon />
                      </div>

                      <div>

                        <h3>
                          {holidayName}
                        </h3>

                        <p>
                          {holidayDate || "—"}
                        </p>

                      </div>

                    </div>
                  );
                }
              )}

            </div>
          )}

        </div>

      </div>
    );
  };

  /*
   * ============================================
   * REPORTS
   * ============================================
   */

  const renderReports = () => {
    return (
      <div className="hod-page">

        <div className="hod-page-header">

          <div>

            <p className="hod-label">
              DEPARTMENT REPORTS
            </p>

            <h1>
              Lesson Planner Reports
            </h1>

            <p className="hod-subtitle">
              Track lesson completion,
              approval progress and
              subject-wise academic activity.
            </p>

          </div>

        </div>

        <div className="hod-report-grid">

          <div className="hod-report-card">

            <div className="hod-report-icon blue">
              <MenuBookIcon />
            </div>

            <div>
              <span>Total Lessons</span>

              <strong>
                {dashboardStats.total}
              </strong>
            </div>

          </div>

          <div className="hod-report-card">

            <div className="hod-report-icon green">
              <AssignmentIcon />
            </div>

            <div>
              <span>Completed</span>

              <strong>
                {dashboardStats.completed}
              </strong>
            </div>

          </div>

          <div className="hod-report-card">

            <div className="hod-report-icon orange">
              <AssessmentIcon />
            </div>

            <div>
              <span>Partly Done</span>

              <strong>
                {dashboardStats.partlyDone}
              </strong>
            </div>

          </div>

          <div className="hod-report-card">

            <div className="hod-report-icon red">
              <AssignmentIcon />
            </div>

            <div>
              <span>Not Done</span>

              <strong>
                {dashboardStats.notDone}
              </strong>
            </div>

          </div>

        </div>

        <div className="hod-report-section">

          <div className="hod-panel">

            <div className="hod-panel-header">

              <div>

                <h2>
                  Completion Report
                </h2>

                <p>
                  Overall lesson completion
                  percentage.
                </p>

              </div>

              <strong className="hod-large-percentage">
                {completionPercentage}%
              </strong>

            </div>

            <div className="hod-report-progress">

              <div
                className="hod-report-progress-fill"
                style={{
                  width:
                    `${completionPercentage}%`,
                }}
              />

            </div>

            <div className="hod-report-breakdown">

              <div>
                <span>Planned</span>

                <strong>
                  {dashboardStats.planned}
                </strong>
              </div>

              <div>
                <span>Completed</span>

                <strong>
                  {dashboardStats.completed}
                </strong>
              </div>

              <div>
                <span>Partly Done</span>

                <strong>
                  {dashboardStats.partlyDone}
                </strong>
              </div>

              <div>
                <span>Not Done</span>

                <strong>
                  {dashboardStats.notDone}
                </strong>
              </div>

            </div>

          </div>

          <div className="hod-panel">

            <div className="hod-panel-header">

              <div>

                <h2>
                  Approval Report
                </h2>

                <p>
                  Lesson plan approval status.
                </p>

              </div>

              <strong className="hod-large-percentage">
                {approvalPercentage}%
              </strong>

            </div>

            <div className="hod-report-progress">

              <div
                className="hod-report-progress-fill approval"
                style={{
                  width:
                    `${approvalPercentage}%`,
                }}
              />

            </div>

            <div className="hod-report-breakdown">

              <div>
                <span>Pending</span>

                <strong>
                  {dashboardStats.pending}
                </strong>
              </div>

              <div>
                <span>Approved</span>

                <strong>
                  {dashboardStats.approved}
                </strong>
              </div>

              <div>
                <span>Sent Back</span>

                <strong>
                  {dashboardStats.rejected}
                </strong>
              </div>

            </div>

          </div>

        </div>

        <div className="hod-panel">

          <div className="hod-panel-header">

            <div>

              <h2>
                Subject-wise Report
              </h2>

              <p>
                Lesson planning and completion
                across subjects.
              </p>

            </div>

          </div>

          {subjectReport.length === 0 ? (

            <div className="hod-empty-state">

              <AssessmentIcon />

              <h3>
                No Report Data
              </h3>

              <p>
                Create lesson plans to generate
                reports.
              </p>

            </div>

          ) : (

            <div className="hod-table-wrapper">

              <table className="hod-table">

                <thead>

                  <tr>
                    <th>Subject</th>
                    <th>Total</th>
                    <th>Planned</th>
                    <th>Completed</th>
                    <th>Partly Done</th>
                    <th>Not Done</th>
                    <th>Completion %</th>
                  </tr>

                </thead>

                <tbody>

                  {subjectReport.map(
                    (item) => {

                      const percentage =
                        item.total > 0
                          ? Math.round(
                              (item.completed /
                                item.total) *
                                100
                            )
                          : 0;

                      return (

                        <tr
                          key={
                            item.subject
                          }
                        >

                          <td>
                            <strong>
                              {item.subject}
                            </strong>
                          </td>

                          <td>
                            {item.total}
                          </td>

                          <td>
                            {item.planned}
                          </td>

                          <td>
                            {item.completed}
                          </td>

                          <td>
                            {item.partlyDone}
                          </td>

                          <td>
                            {item.notDone}
                          </td>

                          <td>

                            <div className="hod-inline-progress">

                              <div className="hod-inline-progress-track">

                                <div
                                  className="hod-inline-progress-fill"
                                  style={{
                                    width:
                                      `${percentage}%`,
                                  }}
                                />

                              </div>

                              <span>
                                {percentage}%
                              </span>

                            </div>

                          </td>

                        </tr>
                      );
                    }
                  )}

                </tbody>

              </table>

            </div>
          )}

        </div>

        <div className="hod-panel">

          <div className="hod-panel-header">

            <div>

              <h2>
                Academic Calendar
              </h2>

              <p>
                Examination and holiday
                information used for planning.
              </p>

            </div>

          </div>

          <div className="hod-calendar-report">

            <div>
              <span>
                Examination Days
              </span>

              <strong>
                {exams.length}
              </strong>
            </div>

            <div>
              <span>
                Holiday Days
              </span>

              <strong>
                {holidayList.length}
              </strong>
            </div>

          </div>

        </div>

      </div>
    );
  };

  /*
   * ============================================
   * REVIEW MODAL
   * ============================================
   */

  const renderReviewModal = () => {

    if (!selectedLesson) {
      return null;
    }

    return (

      <div className="hod-review-overlay">

        <div className="hod-review-modal">

          <div className="hod-review-header">

            <div>

              <p className="hod-label">
                LESSON REVIEW
              </p>

              <h2>
                {
                  selectedLesson.topic ||
                  "Untitled Lesson"
                }
              </h2>

            </div>

            <button
              type="button"
              className="hod-review-close"
              onClick={() =>
                setSelectedLesson(null)
              }
            >
              ×
            </button>

          </div>

          <div className="hod-review-details">

            <div>
              <strong>Class</strong>

              <span>
                {
                  selectedLesson.className ||
                  "Not available"
                }
              </span>
            </div>

            <div>
              <strong>Subject</strong>

              <span>
                {
                  selectedLesson.subject ||
                  "Not available"
                }
              </span>
            </div>

            <div>
              <strong>Date</strong>

              <span>
                {
                  selectedLesson.date ||
                  "Not available"
                }
              </span>
            </div>

            <div>
              <strong>Time</strong>

              <span>
                {
                  selectedLesson.time ||
                  "Not available"
                }
              </span>
            </div>

          </div>

          {selectedLesson.objective && (

            <div className="hod-review-block">

              <h3>
                Learning Objective
              </h3>

              <p>
                {
                  selectedLesson.objective
                }
              </p>

            </div>
          )}

          {selectedLesson.description && (

            <div className="hod-review-block">

              <h3>
                Lesson Details
              </h3>

              <p>
                {
                  selectedLesson.description
                }
              </p>

            </div>
          )}

          <div className="hod-review-actions">

            {/* APPROVE */}

            <button
              type="button"
              className="hod-approve-button"
              onClick={() => {

                onReviewLesson({
                  ...selectedLesson,
                  approvalStatus:
                    "Approved",
                });

                setSelectedLesson(null);

              }}
            >
              Approve
            </button>

            {/* SEND BACK */}

            <button
              type="button"
              className="hod-reject-button"
              onClick={() => {

                onReviewLesson({
                  ...selectedLesson,
                  approvalStatus:
                    "Rejected",
                });

                setSelectedLesson(null);

              }}
            >
              Send Back
            </button>

          </div>

        </div>

      </div>
    );
  };

  /*
   * ============================================
   * SECTION RENDER
   * ============================================
   */

  const renderSection = () => {

    switch (activeSection) {

      case "lessons":
        return renderLessonPlans();

      case "approvals":
        return renderApprovals();

      case "examination":
        return renderExamination();

      case "reports":
        return renderReports();

      case "dashboard":
      default:
        return renderDashboard();
    }
  };

  /*
   * ============================================
   * MAIN HOD LAYOUT
   * ============================================
   */

  return (

    <div className="hod-dashboard-layout">

      <HODSidebar
        activeSection={
          activeSection
        }
        onSectionChange={
          setActiveSection
        }
        onBack={
          onBack
        }
      />

      <main className="hod-dashboard-main">

        {renderSection()}

      </main>

      {renderReviewModal()}

    </div>
  );
}

export default HODDashboard;

