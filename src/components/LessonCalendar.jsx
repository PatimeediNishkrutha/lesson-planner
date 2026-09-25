
import { useMemo, useState } from "react";
import "./LessonCalendar.css";

function LessonCalendar({
  onBack,
  lessonPlans = [],
  holidays = [],
  examDates = [],
}) {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
  );

  const [view, setView] = useState("month");
  const [selectedLesson, setSelectedLesson] = useState(null);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  /* ============================================
     FORMAT DATE
  ============================================ */

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  /* ============================================
     DISPLAY DATE
  ============================================ */

  const formatDisplayDate = (dateString) => {
    if (!dateString) {
      return "";
    }

    const parts = dateString.split("-");

    if (parts.length !== 3) {
      return dateString;
    }

    return `${parts[2]} ${monthNames[Number(parts[1]) - 1]} ${parts[0]}`;
  };

  /* ============================================
     GET LESSONS FOR DATE
  ============================================ */

  const getLessonsForDate = (date) => {
    const dateString = formatDate(date);

    return lessonPlans.filter(
      (lesson) => lesson && lesson.date === dateString
    );
  };

  /* ============================================
     GET HOLIDAY FOR DATE
  ============================================ */

  const getHolidayForDate = (date) => {
    const dateString = formatDate(date);

    return holidays.find((holiday) => {
      if (typeof holiday === "string") {
        return holiday === dateString;
      }

      return holiday && holiday.date === dateString;
    });
  };

  /* ============================================
     GET EXAM FOR DATE
  ============================================ */

  const getExamForDate = (date) => {
    const dateString = formatDate(date);

    return examDates.find((exam) => {
      if (typeof exam === "string") {
        return exam === dateString;
      }

      return exam && exam.date === dateString;
    });
  };

  /* ============================================
     TODAY CHECK
  ============================================ */

  const isToday = (date) => {
    return formatDate(date) === formatDate(today);
  };

  /* ============================================
     CURRENT YEAR / MONTH
  ============================================ */

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  /* ============================================
     MONTH CALENDAR DAYS
  ============================================ */

  const calendarDays = useMemo(() => {
    const firstDay = new Date(
      currentYear,
      currentMonth,
      1
    );

    const startDay = firstDay.getDay();

    const daysInMonth = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();

    const days = [];

    /* Previous month */

    for (let i = startDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(
          currentYear,
          currentMonth,
          -i
        ),
        currentMonth: false,
      });
    }

    /* Current month */

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: new Date(
          currentYear,
          currentMonth,
          day
        ),
        currentMonth: true,
      });
    }

    /* Next month */

    let nextDay = 1;

    while (days.length < 42) {
      days.push({
        date: new Date(
          currentYear,
          currentMonth + 1,
          nextDay
        ),
        currentMonth: false,
      });

      nextDay++;
    }

    return days;
  }, [currentYear, currentMonth]);

  /* ============================================
     WEEK START DATE
  ============================================ */

  const weekStartDate = useMemo(() => {
    const date = new Date(currentDate);

    date.setHours(0, 0, 0, 0);

    const day = date.getDay();

    date.setDate(date.getDate() - day);

    return date;
  }, [currentDate]);

  /* ============================================
     ACTUAL WEEK DAYS
  ============================================ */

  const weekDaysData = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(weekStartDate);

      date.setDate(
        weekStartDate.getDate() + index
      );

      return date;
    });
  }, [weekStartDate]);

  /* ============================================
     DAY DATE
  ============================================ */

  const selectedDay = currentDate;

  /* ============================================
     PREVIOUS
  ============================================ */

  const goToPrevious = () => {
    const newDate = new Date(currentDate);

    if (view === "week") {
      newDate.setDate(
        newDate.getDate() - 7
      );
    } else if (view === "day") {
      newDate.setDate(
        newDate.getDate() - 1
      );
    } else {
      newDate.setMonth(
        newDate.getMonth() - 1
      );
      newDate.setDate(1);
    }

    setCurrentDate(newDate);
  };

  /* ============================================
     NEXT
  ============================================ */

  const goToNext = () => {
    const newDate = new Date(currentDate);

    if (view === "week") {
      newDate.setDate(
        newDate.getDate() + 7
      );
    } else if (view === "day") {
      newDate.setDate(
        newDate.getDate() + 1
      );
    } else {
      newDate.setMonth(
        newDate.getMonth() + 1
      );
      newDate.setDate(1);
    }

    setCurrentDate(newDate);
  };

  /* ============================================
     TODAY
  ============================================ */

  const goToToday = () => {
    setCurrentDate(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      )
    );
  };

  /* ============================================
     CHANGE VIEW
  ============================================ */

  const changeView = (newView) => {
    setView(newView);

    if (newView === "month") {
      setCurrentDate(
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        )
      );
    }
  };

  /* ============================================
     WEEK TITLE
  ============================================ */

  const weekTitle = useMemo(() => {
    const start = weekDaysData[0];
    const end = weekDaysData[6];

    if (
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear()
    ) {
      return `${start.getDate()} - ${end.getDate()} ${
        monthNames[start.getMonth()]
      } ${start.getFullYear()}`;
    }

    return `${start.getDate()} ${
      monthNames[start.getMonth()]
    } ${start.getFullYear()} - ${end.getDate()} ${
      monthNames[end.getMonth()]
    } ${end.getFullYear()}`;
  }, [weekDaysData]);

  return (
    <div className="lesson-calendar-page">

      {/* ========================================
          TOP SECTION
      ======================================== */}

      <div className="lesson-calendar-top">

        <div className="lesson-calendar-title">

          <button
            type="button"
            className="calendar-back-button"
            onClick={onBack}
          >
            ← Back
          </button>

          <div>
            <h1>Lesson Calendar</h1>

            <p>
              View and track your classroom lessons,
              holidays and examinations.
            </p>
          </div>

        </div>

        {/* SUMMARY */}

        <div className="calendar-summary">

          <div className="calendar-summary-item">
            <strong>
              {lessonPlans.length}
            </strong>

            <span>
              Lessons
            </span>
          </div>

          <div className="calendar-summary-item">
            <strong>
              {holidays.length}
            </strong>

            <span>
              Holidays
            </span>
          </div>

          <div className="calendar-summary-item">
            <strong>
              {examDates.length}
            </strong>

            <span>
              Exam Days
            </span>
          </div>

        </div>

      </div>

      {/* ========================================
          CALENDAR CARD
      ======================================== */}

      <div className="lesson-calendar-card">

        {/* ======================================
            CALENDAR HEADER
        ====================================== */}

        <div className="calendar-main-header">

          <div className="calendar-month-section">

            {view === "month" && (
              <>
                <h2>
                  {monthNames[currentMonth]}
                </h2>

                <span>
                  {currentYear}
                </span>
              </>
            )}

            {view === "week" && (
              <>
                <h2>
                  Week
                </h2>

                <span>
                  {weekTitle}
                </span>
              </>
            )}

            {view === "day" && (
              <>
                <h2>
                  {selectedDay.getDate()}{" "}
                  {monthNames[selectedDay.getMonth()]}
                </h2>

                <span>
                  {selectedDay.getFullYear()}
                </span>
              </>
            )}

          </div>

          {/* CONTROLS */}

          <div className="calendar-controls">

            <button
              type="button"
              onClick={goToPrevious}
              className="calendar-arrow"
              aria-label="Previous"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={goToToday}
              className="calendar-today"
            >
              Today
            </button>

            <button
              type="button"
              onClick={goToNext}
              className="calendar-arrow"
              aria-label="Next"
            >
              ›
            </button>

          </div>

          {/* VIEW SWITCH */}

          <div className="calendar-view-switch">

            <button
              type="button"
              className={
                view === "day" ? "active" : ""
              }
              onClick={() => changeView("day")}
            >
              Day
            </button>

            <button
              type="button"
              className={
                view === "week" ? "active" : ""
              }
              onClick={() => changeView("week")}
            >
              Week
            </button>

            <button
              type="button"
              className={
                view === "month" ? "active" : ""
              }
              onClick={() => changeView("month")}
            >
              Month
            </button>

          </div>

        </div>

        {/* ======================================
            MONTH VIEW
        ====================================== */}

        {view === "month" && (
          <>

            <div className="calendar-week-header">

              {weekDays.map((day) => (
                <div
                  key={day}
                  className="calendar-week-day"
                >
                  {day}
                </div>
              ))}

            </div>

            <div className="calendar-month-grid">

              {calendarDays.map(
                ({
                  date,
                  currentMonth: isCurrentMonth,
                }) => {

                  const lessons =
                    getLessonsForDate(date);

                  const holiday =
                    getHolidayForDate(date);

                  const exam =
                    getExamForDate(date);

                  const todayDate =
                    isToday(date);

                  return (
                    <div
                      key={formatDate(date)}
                      className={
                        "calendar-date-cell" +
                        (!isCurrentMonth
                          ? " muted"
                          : "") +
                        (todayDate
                          ? " today"
                          : "") +
                        (holiday
                          ? " holiday"
                          : "") +
                        (exam
                          ? " exam"
                          : "")
                      }
                    >

                      <div className="calendar-date-header">

                        <span className="calendar-date-number">
                          {date.getDate()}
                        </span>

                        {todayDate && (
                          <span className="calendar-today-label">
                            TODAY
                          </span>
                        )}

                      </div>

                      {/* HOLIDAY */}

                      {holiday && (
                        <div className="calendar-holiday-card">

                          <span className="holiday-dot">
                            ●
                          </span>

                          <span>
                            {typeof holiday === "string"
                              ? "Holiday"
                              : holiday.name ||
                                "Holiday"}
                          </span>

                        </div>
                      )}

                      {/* EXAM */}

                      {exam && (
                        <div className="calendar-exam-card">

                          <span className="exam-dot">
                            ●
                          </span>

                          <span>
                            {typeof exam === "string"
                              ? "Exam"
                              : exam.name || "Exam"}
                          </span>

                        </div>
                      )}

                      {/* LESSONS */}

                      <div className="calendar-lessons">

                        {lessons.map((lesson) => (
                          <button
                            type="button"
                            key={lesson.id}
                            className={
                              "calendar-lesson-card" +
                              (lesson.rescheduledAutomatically
                                ? " auto-rescheduled"
                                : "")
                            }
                            onClick={() =>
                              setSelectedLesson(
                                lesson
                              )
                            }
                          >

                            <div className="lesson-card-top">

                              <span>
                                {lesson.time ||
                                  "Period"}
                              </span>

                              {lesson.rescheduledAutomatically && (
                                <span className="lesson-rescheduled-icon">
                                  ↻
                                </span>
                              )}

                            </div>

                            <strong>
                              {lesson.subject ||
                                "Subject"}
                            </strong>

                            <span className="lesson-card-topic">
                              {lesson.topic ||
                                "Lesson topic"}
                            </span>

                            <span className="lesson-card-class">
                              {lesson.className ||
                                "Class"}
                            </span>

                            {lesson.rescheduledAutomatically && (
                              <span className="lesson-rescheduled-text">
                                Rescheduled
                              </span>
                            )}

                          </button>
                        ))}

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          </>
        )}

        {/* ======================================
            WEEK VIEW
        ====================================== */}

        {view === "week" && (

          <div className="calendar-week-view">

            <div className="calendar-week-view-title">
              Weekly Lesson Schedule
            </div>

            <div className="calendar-week-range">
              {weekTitle}
            </div>

            <div className="calendar-week-list">

              {weekDaysData.map((date) => {

                const lessons =
                  getLessonsForDate(date);

                const holiday =
                  getHolidayForDate(date);

                const exam =
                  getExamForDate(date);

                return (
                  <div
                    key={formatDate(date)}
                    className={
                      "week-schedule-row" +
                      (isToday(date)
                        ? " current-week-day"
                        : "")
                    }
                  >

                    <div className="week-date">

                      <strong>
                        {date.getDate()}
                      </strong>

                      <span>
                        {weekDays[date.getDay()]}
                      </span>

                      {isToday(date) && (
                        <small>
                          TODAY
                        </small>
                      )}

                    </div>

                    <div className="week-schedule-content">

                      {/* HOLIDAY */}

                      {holiday && (
                        <div className="week-holiday">
                          🏖{" "}
                          {typeof holiday === "string"
                            ? "Holiday"
                            : holiday.name ||
                              "Holiday"}
                        </div>
                      )}

                      {/* EXAM */}

                      {exam && (
                        <div className="week-exam">
                          📝{" "}
                          {typeof exam === "string"
                            ? "Exam"
                            : exam.name || "Exam"}
                        </div>
                      )}

                      {/* EMPTY */}

                      {lessons.length === 0 &&
                        !holiday &&
                        !exam && (
                          <span className="no-week-lesson">
                            No lessons planned
                          </span>
                        )}

                      {/* LESSONS */}

                      {lessons.map((lesson) => (
                        <button
                          type="button"
                          key={lesson.id}
                          className={
                            "week-lesson" +
                            (lesson.rescheduledAutomatically
                              ? " auto-rescheduled"
                              : "")
                          }
                          onClick={() =>
                            setSelectedLesson(
                              lesson
                            )
                          }
                        >

                          <strong>
                            {lesson.subject ||
                              "Subject"}
                          </strong>

                          <span>
                            {lesson.topic ||
                              "Lesson topic"}
                          </span>

                          <small>
                            {lesson.className ||
                              "Class"}
                            {" • "}
                            {lesson.time ||
                              "Period"}
                          </small>

                          {lesson.rescheduledAutomatically && (
                            <small className="week-rescheduled">
                              ↻ Rescheduled
                            </small>
                          )}

                        </button>
                      ))}

                    </div>

                  </div>
                );
              })}

            </div>

          </div>
        )}

        {/* ======================================
            DAY VIEW
        ====================================== */}

        {view === "day" && (

          <div className="calendar-day-view">

            <div className="day-view-date">

              <span>
                {weekDays[selectedDay.getDay()]}
              </span>

              <strong>
                {selectedDay.getDate()}
              </strong>

              <span>
                {monthNames[selectedDay.getMonth()]}{" "}
                {selectedDay.getFullYear()}
              </span>

            </div>

            {/* HOLIDAY */}

            {getHolidayForDate(selectedDay) && (
              <div className="day-holiday">

                🏖{" "}

                {(() => {
                  const holiday =
                    getHolidayForDate(
                      selectedDay
                    );

                  return typeof holiday === "string"
                    ? "Holiday"
                    : holiday.name || "Holiday";
                })()}

              </div>
            )}

            {/* EXAM */}

            {getExamForDate(selectedDay) && (
              <div className="day-exam">

                📝{" "}

                {(() => {
                  const exam =
                    getExamForDate(
                      selectedDay
                    );

                  return typeof exam === "string"
                    ? "Exam"
                    : exam.name || "Exam";
                })()}

              </div>
            )}

            <div className="day-view-lessons">

              {getLessonsForDate(selectedDay).length ===
              0 ? (

                <div className="day-empty">

                  <div>
                    📚
                  </div>

                  <h3>
                    No lessons planned
                  </h3>

                  <p>
                    There are no lessons scheduled
                    for this day.
                  </p>

                </div>

              ) : (

                getLessonsForDate(selectedDay).map(
                  (lesson) => (

                    <button
                      type="button"
                      key={lesson.id}
                      className="day-lesson-card"
                      onClick={() =>
                        setSelectedLesson(
                          lesson
                        )
                      }
                    >

                      <span className="day-lesson-time">
                        {lesson.time ||
                          "Period"}
                      </span>

                      <div>

                        <strong>
                          {lesson.subject ||
                            "Subject"}
                        </strong>

                        <h3>
                          {lesson.topic ||
                            "Lesson topic"}
                        </h3>

                        <p>
                          {lesson.className ||
                            "Class"}
                        </p>

                      </div>

                    </button>

                  )
                )

              )}

            </div>

          </div>
        )}

      </div>

      {/* ========================================
          LEGEND
      ======================================== */}

      <div className="calendar-bottom">

        <div className="calendar-legend">

          <span>
            <i className="legend-today"></i>
            Today
          </span>

          <span>
            <i className="legend-lesson"></i>
            Planned Lesson
          </span>

          <span>
            <i className="legend-holiday"></i>
            Holiday
          </span>

          <span>
            <i className="legend-exam"></i>
            Exam
          </span>

          <span>
            <i className="legend-rescheduled"></i>
            Automatically Rescheduled
          </span>

        </div>

      </div>

      {/* ========================================
          LESSON DETAILS MODAL
      ======================================== */}

      {selectedLesson && (

        <div className="calendar-modal-overlay">

          <div className="calendar-lesson-modal">

            <button
              type="button"
              className="calendar-modal-close"
              onClick={() =>
                setSelectedLesson(null)
              }
            >
              ×
            </button>

            <span className="modal-label">
              LESSON DETAILS
            </span>

            <h2>
              {selectedLesson.topic ||
                "Lesson"}
            </h2>

            <p className="modal-subject">
              {selectedLesson.subject ||
                "Subject"}
            </p>

            <div className="modal-information-grid">

              <div>
                <span>
                  Class
                </span>

                <strong>
                  {selectedLesson.className ||
                    "Not specified"}
                </strong>
              </div>

              <div>
                <span>
                  Date
                </span>

                <strong>
                  {formatDisplayDate(
                    selectedLesson.date
                  )}
                </strong>
              </div>

              <div>
                <span>
                  Time
                </span>

                <strong>
                  {selectedLesson.time ||
                    "Not specified"}
                </strong>
              </div>

              <div>
                <span>
                  Status
                </span>

                <strong>
                  {selectedLesson.status ||
                    "Planned"}
                </strong>
              </div>

            </div>

            {/* AUTOMATIC RESCHEDULE */}

            {selectedLesson.rescheduledAutomatically && (

              <div className="automatic-reschedule-box">

                <div className="reschedule-heading">

                  <span>
                    ↻
                  </span>

                  Automatically Rescheduled

                </div>

                <p>
                  This lesson was moved to the
                  next working day because the
                  original date was a{" "}
                  {selectedLesson.rescheduleReason ||
                    "non-working day"}.
                </p>

                {selectedLesson.rescheduledFrom && (
                  <small>
                    Originally planned for:{" "}
                    {formatDisplayDate(
                      selectedLesson.rescheduledFrom
                    )}
                  </small>
                )}

              </div>
            )}

            {/* LEARNING OBJECTIVE */}

            {selectedLesson.objective && (
              <div className="modal-section">

                <h3>
                  Learning Objective
                </h3>

                <p>
                  {selectedLesson.objective}
                </p>

              </div>
            )}

            {/* TEACHING METHOD */}

            {selectedLesson.teachingMethod && (
              <div className="modal-section">

                <h3>
                  Teaching Method
                </h3>

                <p>
                  {selectedLesson.teachingMethod}
                </p>

              </div>
            )}

            {/* HOMEWORK */}

            {selectedLesson.homework && (
              <div className="modal-section">

                <h3>
                  Homework
                </h3>

                <p>
                  {selectedLesson.homework}
                </p>

              </div>
            )}

          </div>

        </div>

      )}

    </div>
  );
}

export default LessonCalendar;
