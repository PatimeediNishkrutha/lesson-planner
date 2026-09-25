
import { useState, useMemo } from "react";
import "./PlannerGrid.css";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function PlannerGrid({
  onBack,
  lessonPlans,
  onCreateLesson,
  initialSelection,
  onSelectionChange,
}) {
  const [className, setClassName] = useState(
    initialSelection?.className || ""
  );

  const [section, setSection] = useState(
    initialSelection?.section || ""
  );

  const [subject, setSubject] = useState(
    initialSelection?.subject || ""
  );

  /*
   * Academic year
   */
  const academicYearStart = "2026-06-01";
  const academicYearEnd = "2027-05-31";

  /*
   * Convert Date to YYYY-MM-DD
   */
  const formatDate = (date) => {
    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  /*
   * Get Monday for a given date.
   */
  const getMonday = (date) => {
    const result = new Date(date);

    const day = result.getDay();

    const difference = day === 0 ? -6 : 1 - day;

    result.setDate(result.getDate() + difference);

    return result;
  };

  /*
   * Display date:
   * 22 September 2026
   */
  const formatWeekLabel = (date) => {
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  /*
   * Get initial week.
   *
   * Supports both:
   * YYYY-MM-DD
   * and old values such as:
   * 22 September 2026
   */
  const getDefaultWeek = () => {
    if (initialSelection?.week) {
      const oldWeek = new Date(initialSelection.week);

      if (!Number.isNaN(oldWeek.getTime())) {
        return formatDate(getMonday(oldWeek));
      }
    }

    const today = new Date();

    return formatDate(getMonday(today));
  };

  const [week, setWeek] = useState(getDefaultWeek());

  const [isGenerated, setIsGenerated] = useState(
    Boolean(
      initialSelection?.className &&
        initialSelection?.section &&
        initialSelection?.subject
    )
  );

  /*
   * Timetable periods.
   */
  const periods = [
    {
      id: 1,
      time: "09:00 - 09:45",
    },
    {
      id: 2,
      time: "09:45 - 10:30",
    },
    {
      id: 3,
      time: "10:30 - 11:15",
    },
    {
      id: 4,
      time: "11:30 - 12:15",
    },
    {
      id: 5,
      time: "12:15 - 01:00",
    },
    {
      id: 6,
      time: "02:00 - 02:45",
    },
    {
      id: 7,
      time: "02:45 - 03:30",
    },
  ];

  /*
   * Working days.
   */
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  /*
   * Update parent selection.
   */
  const updateSelection = (
    newClassName,
    newSection,
    newSubject,
    newWeek
  ) => {
    if (onSelectionChange) {
      onSelectionChange({
        className: newClassName,
        section: newSection,
        subject: newSubject,
        week: newWeek,
      });
    }
  };

  /*
   * Handle calendar date selection.
   *
   * User can select ANY date.
   * The system automatically changes it
   * to the Monday of that week.
   */
  const handleWeekDateChange = (newValue) => {
    if (!newValue || !newValue.isValid()) {
      return;
    }

    const selectedDate = newValue.toDate();

    const monday = getMonday(selectedDate);

    const mondayString = formatDate(monday);

    setWeek(mondayString);

    setIsGenerated(false);

    updateSelection(
      className,
      section,
      subject,
      mondayString
    );
  };

  /*
   * Get the actual date for a day
   * of the selected week.
   */
  const getDateForDay = (day) => {
    if (!week) {
      return "";
    }

    const monday = new Date(`${week}T00:00:00`);

    const dayIndexes = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4,
    };

    const offset = dayIndexes[day];

    if (offset === undefined) {
      return "";
    }

    const result = new Date(monday);

    result.setDate(result.getDate() + offset);

    return formatDate(result);
  };

  /*
   * Find lesson for:
   *
   * Class
   * Section
   * Subject
   * Date
   * Day
   * Period
   */
  const getLesson = (day, periodId) => {
    const lessonDate = getDateForDay(day);

    return (lessonPlans || []).find(
      (lesson) =>
        lesson.day === day &&
        Number(lesson.periodId) === periodId &&
        lesson.className === `${className} - ${section}` &&
        lesson.subject === subject &&
        lesson.date === lessonDate
    );
  };

  /*
   * Generate timetable.
   */
  const handleGenerate = () => {
    if (!className || !section || !subject) {
      window.alert(
        "Please select Class, Section and Subject."
      );

      return;
    }

    updateSelection(
      className,
      section,
      subject,
      week
    );

    setIsGenerated(true);
  };

  /*
   * Selected week label.
   */
  const selectedWeekLabel = useMemo(() => {
    if (!week) {
      return "";
    }

    const selectedMonday = new Date(
      `${week}T00:00:00`
    );

    if (Number.isNaN(selectedMonday.getTime())) {
      return week;
    }

    return formatWeekLabel(selectedMonday);
  }, [week]);

  /*
   * Calendar value.
   */
  const calendarValue = week
    ? dayjs(`${week}T00:00:00`)
    : null;

  /*
   * Academic year limits.
   */
  const minDate = dayjs(academicYearStart);
  const maxDate = dayjs(academicYearEnd);

  return (
    <div className="planner-grid-page">

      {/* HEADER */}
      <div className="planner-grid-header">
        <div>
          <button
            className="back-button"
            onClick={onBack}
          >
            ← Back
          </button>

          <h1>
            Lesson Planner
          </h1>

          <p>
            Plan one topic for each timetable
            period
          </p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="planner-filters-card">

        {/* CLASS */}
        <div className="planner-filter">
          <label htmlFor="planner-class">
            Class
          </label>

          <select
            id="planner-class"
            value={className}
            onChange={(event) => {
              const value = event.target.value;

              setClassName(value);
              setIsGenerated(false);

              updateSelection(
                value,
                section,
                subject,
                week
              );
            }}
          >
            <option value="">
              Select Class
            </option>

            <option value="Nursery">
              Nursery
            </option>

            <option value="LKG">
              LKG
            </option>

            <option value="UKG">
              UKG
            </option>

            <option value="Class 1">
              Class 1
            </option>

            <option value="Class 2">
              Class 2
            </option>

            <option value="Class 3">
              Class 3
            </option>

            <option value="Class 4">
              Class 4
            </option>

            <option value="Class 5">
              Class 5
            </option>

            <option value="Class 6">
              Class 6
            </option>

            <option value="Class 7">
              Class 7
            </option>

            <option value="Class 8">
              Class 8
            </option>

            <option value="Class 9">
              Class 9
            </option>

            <option value="Class 10">
              Class 10
            </option>

            <option value="Class 11">
              Class 11
            </option>

            <option value="Class 12">
              Class 12
            </option>
          </select>
        </div>

        {/* SECTION */}
        <div className="planner-filter">
          <label htmlFor="planner-section">
            Section
          </label>

          <select
            id="planner-section"
            value={section}
            onChange={(event) => {
              const value = event.target.value;

              setSection(value);
              setIsGenerated(false);

              updateSelection(
                className,
                value,
                subject,
                week
              );
            }}
          >
            <option value="">
              Select Section
            </option>

            <option value="A">
              A
            </option>

            <option value="B">
              B
            </option>

            <option value="C">
              C
            </option>
          </select>
        </div>

        {/* SUBJECT */}
        <div className="planner-filter">
          <label htmlFor="planner-subject">
            Subject
          </label>

          <select
            id="planner-subject"
            value={subject}
            onChange={(event) => {
              const value = event.target.value;

              setSubject(value);
              setIsGenerated(false);

              updateSelection(
                className,
                section,
                value,
                week
              );
            }}
          >
            <option value="">
              Select Subject
            </option>

            <option value="Mathematics">
              Mathematics
            </option>

            <option value="Science">
              Science
            </option>

            <option value="English">
              English
            </option>

            <option value="Social Science">
              Social Science
            </option>

            <option value="Computer Science">
              Computer Science
            </option>
          </select>
        </div>

        {/* WEEK CALENDAR */}
        <div className="planner-filter planner-week-picker">

          <label>
            Week Starting
          </label>

          <LocalizationProvider
            dateAdapter={AdapterDayjs}
          >
            <DatePicker
              value={calendarValue}
              onChange={handleWeekDateChange}
              minDate={minDate}
              maxDate={maxDate}
              format="DD MMM YYYY"
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                  placeholder: "Select date",
                },
              }}
            />
          </LocalizationProvider>

          <small className="week-picker-help">
            Select any date in the required week
          </small>

        </div>

        {/* GENERATE */}
        <button
          type="button"
          className="generate-planner-button"
          onClick={handleGenerate}
        >
          Generate
        </button>

      </div>

      {/* INFO */}
      <div className="planner-info">
        <div>
          <strong>
            {className && section
              ? `${className} - ${section}`
              : "Select Class and Section"}
          </strong>

          <span>
            {subject || "Select Subject"}
          </span>
        </div>

        <span className="week-label">
          Week of{" "}
          {selectedWeekLabel}
        </span>
      </div>

      {/* GRID */}
      {isGenerated ? (
        <>
          <div className="planner-grid-wrapper">

            <div className="planner-grid">

              {/* GRID HEADER */}
              <div className="grid-header time-header">
                Period
              </div>

              {days.map((day) => (
                <div
                  className="grid-header"
                  key={day}
                >
                  {day}
                </div>
              ))}

              {/* PERIOD ROWS */}
              {periods.map((period) => (
                <div
                  className="grid-row"
                  key={period.id}
                >

                  {/* PERIOD */}
                  <div className="period-cell">
                    <strong>
                      Period {period.id}
                    </strong>

                    <span>
                      {period.time}
                    </span>
                  </div>

                  {/* DAYS */}
                  {days.map((day) => {

                    const lesson =
                      getLesson(
                        day,
                        period.id
                      );

                    const lessonDate =
                      getDateForDay(day);

                    return (
                      <div
                        className={`planner-cell ${
                          lesson
                            ? "has-lesson"
                            : ""
                        }`}
                        key={`${day}-${period.id}`}
                        onClick={() =>
                          onCreateLesson({
                            day,
                            periodId:
                              period.id,
                            time:
                              period.time,
                            className:
                              `${className} - ${section}`,
                            subject:
                              subject,
                            date:
                              lessonDate,
                          })
                        }
                      >

                        {lesson ? (
                          <div className="planned-lesson">

                            <strong>
                              {lesson.topic}
                            </strong>

                            <span>
                              {lesson.status ||
                                "Planned"}
                            </span>

                          </div>
                        ) : (
                          <div className="empty-period">

                            <span>
                              +
                            </span>

                            <small>
                              Add Topic
                            </small>

                          </div>
                        )}

                      </div>
                    );
                  })}

                </div>
              ))}

            </div>

          </div>

          {/* LEGEND */}
          <div className="planner-legend">

            <div>
              <span className="legend-box empty"></span>
              Empty
            </div>

            <div>
              <span className="legend-box planned"></span>
              Planned
            </div>

            <div>
              <span className="legend-box completed"></span>
              Completed
            </div>

            <div>
              <span className="legend-box partly"></span>
              Partly Done
            </div>

            <div>
              <span className="legend-box rescheduled"></span>
              Rescheduled
            </div>

          </div>

        </>
      ) : (
        <div className="planner-empty-state">

          <h2>
            Select your class, section and subject
          </h2>

          <p>
            Choose the required details above
            and click{" "}
            <strong>
              Generate
            </strong>{" "}
            to open the timetable.
          </p>

        </div>
      )}

    </div>
  );
}

export default PlannerGrid;

