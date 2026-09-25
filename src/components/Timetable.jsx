
import React, { useEffect, useMemo, useState } from "react";
import "./Timetable.css";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const DEFAULT_PERIODS = [
  {
    id: 1,
    name: "Period 1",
    start: "09:00",
    end: "09:45",
  },
  {
    id: 2,
    name: "Period 2",
    start: "09:45",
    end: "10:30",
  },
  {
    id: 3,
    name: "Period 3",
    start: "10:45",
    end: "11:30",
  },
  {
    id: 4,
    name: "Period 4",
    start: "11:30",
    end: "12:15",
  },
  {
    id: 5,
    name: "Period 5",
    start: "12:15",
    end: "01:00",
  },
  {
    id: 6,
    name: "Period 6",
    start: "02:00",
    end: "02:45",
  },
  {
    id: 7,
    name: "Period 7",
    start: "02:45",
    end: "03:30",
  },
  {
    id: 8,
    name: "Period 8",
    start: "03:30",
    end: "04:15",
  },
];

function Timetable() {
  const [classes, setClasses] = useState([]);

  const [selectedClass, setSelectedClass] =
    useState("");

  const [selectedSection, setSelectedSection] =
    useState("");

  const [timetable, setTimetable] = useState(() => {
    try {
      const saved =
        localStorage.getItem("schoolTimetable");

      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error(
        "Error loading timetable:",
        error
      );

      return {};
    }
  });

  const [periods] = useState(() => {
    try {
      const saved =
        localStorage.getItem("timetablePeriods");

      return saved
        ? JSON.parse(saved)
        : DEFAULT_PERIODS;
    } catch (error) {
      console.error(
        "Error loading timetable periods:",
        error
      );

      return DEFAULT_PERIODS;
    }
  });

  /*
   * Load classes created by Admin.
   */
  useEffect(() => {
    try {
      const savedClasses =
        localStorage.getItem("adminClasses");

      const parsedClasses = savedClasses
        ? JSON.parse(savedClasses)
        : [];

      setClasses(
        Array.isArray(parsedClasses)
          ? parsedClasses
          : []
      );
    } catch (error) {
      console.error(
        "Error loading admin classes:",
        error
      );

      setClasses([]);
    }
  }, []);

  /*
   * Save timetable automatically.
   */
  useEffect(() => {
    localStorage.setItem(
      "schoolTimetable",
      JSON.stringify(timetable)
    );
  }, [timetable]);

  /*
   * Find selected class.
   */
  const selectedClassData = useMemo(() => {
    return classes.find((item) => {
      return (
        String(item.id) ===
          String(selectedClass) ||
        item.className === selectedClass ||
        item.name === selectedClass
      );
    });
  }, [classes, selectedClass]);

  /*
   * Get sections belonging to selected class.
   */
  const sections = useMemo(() => {
    if (!selectedClassData) {
      return [];
    }

    if (
      Array.isArray(
        selectedClassData.sections
      )
    ) {
      return selectedClassData.sections;
    }

    if (selectedClassData.section) {
      return [selectedClassData.section];
    }

    return ["A"];
  }, [selectedClassData]);

  /*
   * Get subjects assigned to selected class.
   */
  const subjects = useMemo(() => {
    if (!selectedClassData) {
      return [];
    }

    if (
      Array.isArray(
        selectedClassData.subjects
      )
    ) {
      return selectedClassData.subjects;
    }

    return [];
  }, [selectedClassData]);

  /*
   * Automatically select first available section.
   */
  useEffect(() => {
    if (!selectedClassData) {
      setSelectedSection("");
      return;
    }

    if (sections.length === 0) {
      setSelectedSection("");
      return;
    }

    const firstSection = sections[0];

    const sectionValue =
      typeof firstSection === "object"
        ? firstSection.name ||
          firstSection.section ||
          ""
        : firstSection;

    setSelectedSection(sectionValue);
  }, [selectedClassData, sections]);

  /*
   * Unique key for class + section timetable.
   */
  const timetableKey =
    String(selectedClass) +
    "|" +
    String(selectedSection);

  /*
   * Get lesson from a timetable cell.
   */
  const getLesson = (
    day,
    periodId
  ) => {
    return (
      timetable[timetableKey]?.[day]?.[
        periodId
      ] || null
    );
  };

  /*
   * Convert subject object/string to display name.
   */
  const getSubjectName = (subject) => {
    if (typeof subject === "string") {
      return subject;
    }

    return (
      subject?.name ||
      subject?.subjectName ||
      subject?.subject ||
      ""
    );
  };

  /*
   * Calculate the next date for a weekday.
   *
   * This uses today's date only to provide a
   * useful date when creating a lesson from
   * the timetable.
   */
  const getDateForDay = (day) => {
    const today = new Date();

    const dayIndex = DAYS.indexOf(day);

    if (dayIndex === -1) {
      return "";
    }

    const currentDay =
      today.getDay();

    /*
     * JavaScript:
     * Sunday = 0
     * Monday = 1
     * ...
     * Friday = 5
     */
    const targetDay =
      dayIndex + 1;

    let difference =
      targetDay - currentDay;

    /*
     * If the target day has already passed,
     * move to the next occurrence.
     */
    if (difference < 0) {
      difference += 7;
    }

    const result = new Date(today);

    result.setDate(
      today.getDate() + difference
    );

    const year =
      result.getFullYear();

    const month =
      String(
        result.getMonth() + 1
      ).padStart(2, "0");

    const date =
      String(
        result.getDate()
      ).padStart(2, "0");

    return (
      year +
      "-" +
      month +
      "-" +
      date
    );
  };

  /*
   * Add or edit timetable lesson.
   */
  const handleAddLesson = (
    day,
    period
  ) => {
    if (
      !selectedClass ||
      !selectedSection
    ) {
      alert(
        "Please select Class and Section first."
      );

      return;
    }

    if (subjects.length === 0) {
      alert(
        "No subjects are assigned to this class. Please add subjects from Admin → Classes & Subjects."
      );

      return;
    }

    const subjectNames =
      subjects
        .map(getSubjectName)
        .filter(Boolean);

    const existingLesson =
      getLesson(
        day,
        period.id
      );

    const enteredSubject =
      window.prompt(
        "Enter subject for " +
          day +
          " - " +
          period.name +
          "\n\nAvailable subjects:\n" +
          subjectNames.join("\n"),
        existingLesson?.subject ||
          subjectNames[0] ||
          ""
      );

    if (!enteredSubject) {
      return;
    }

    const cleanSubject =
      enteredSubject.trim();

    if (
      !subjectNames.includes(
        cleanSubject
      )
    ) {
      alert(
        "Please enter a subject assigned to the selected class."
      );

      return;
    }

    setTimetable(
      (previous) => ({
        ...previous,

        [timetableKey]: {
          ...(previous[
            timetableKey
          ] || {}),

          [day]: {
            ...(previous[
              timetableKey
            ]?.[day] || {}),

            [period.id]: {
              subject:
                cleanSubject,

              teacher:
                existingLesson?.teacher ||
                "",
            },
          },
        },
      })
    );
  };

  /*
   * Remove timetable lesson.
   */
  const handleRemoveLesson = (
    day,
    periodId
  ) => {
    setTimetable(
      (previous) => {
        const currentClassTimetable =
          previous[
            timetableKey
          ] || {};

        const currentDayTimetable =
          currentClassTimetable[
            day
          ] || {};

        const updatedDay = {
          ...currentDayTimetable,
        };

        delete updatedDay[
          periodId
        ];

        return {
          ...previous,

          [timetableKey]: {
            ...currentClassTimetable,
            [day]: updatedDay,
          },
        };
      }
    );
  };

  /*
   * START LESSON PLANNING
   *
   * This is the important connection between
   * Timetable and Lesson Planner.
   */
  const handlePlanLesson = (
    day,
    period,
    lesson
  ) => {
    if (!lesson) {
      return;
    }

    const lessonDate =
      getDateForDay(day);

    const prefilledLesson = {
      className:
        selectedClassData?.className ||
        selectedClassData?.name ||
        selectedClass,

      section:
        selectedSection,

      subject:
        getSubjectName(
          lesson.subject
        ),

      date:
        lessonDate,

      day:
        day,

      periodId:
        period.id,

      periodName:
        period.name,

      startTime:
        period.start,

      endTime:
        period.end,

      topic:
        "",

      objective:
        "",

      prerequisite:
        "",

      teachingMethod:
        "",

      resources:
        "",

      homework:
        "",

      status:
        "Planned",

      approvalStatus:
        "Draft",

      source:
        "Timetable",
    };

    /*
     * Save the information so the Lesson Planner
     * can use it as prefilled data.
     */
    localStorage.setItem(
      "lessonPlannerPrefill",
      JSON.stringify(
        prefilledLesson
      )
    );

    /*
     * Notify the application that the user
     * wants to open the Lesson Planner.
     */
    window.dispatchEvent(
      new CustomEvent(
        "openLessonPlanner",
        {
          detail:
            prefilledLesson,
        }
      )
    );
  };

  return (
    <div className="timetable-page">

      {/* HEADER */}

      <div className="timetable-header">
        <div>
          <h2>
            Timetable
          </h2>

          <p>
            Create and manage the weekly
            timetable for each class and
            section.
          </p>
        </div>

        {/* FILTERS */}

        <div className="timetable-filters">

          <select
            value={selectedClass}
            onChange={(event) => {
              setSelectedClass(
                event.target.value
              );

              setSelectedSection("");
            }}
          >
            <option value="">
              Select Class
            </option>

            {classes.map(
              (item) => {
                const value =
                  item.id ||
                  item.className ||
                  item.name;

                const label =
                  item.className ||
                  item.name ||
                  "Class";

                return (
                  <option
                    key={value}
                    value={value}
                  >
                    {label}
                  </option>
                );
              }
            )}
          </select>

          <select
            value={selectedSection}
            onChange={(event) =>
              setSelectedSection(
                event.target.value
              )
            }
            disabled={
              !selectedClass
            }
          >
            <option value="">
              Select Section
            </option>

            {sections.map(
              (
                section,
                index
              ) => {
                const value =
                  typeof section ===
                  "object"
                    ? section.name ||
                      section.section ||
                      "Section " +
                        (index + 1)
                    : section;

                return (
                  <option
                    key={value}
                    value={value}
                  >
                    {value}
                  </option>
                );
              }
            )}
          </select>
        </div>
      </div>

      {/* CLASS INFORMATION */}

      {selectedClass &&
        selectedSection && (
          <div className="timetable-info">

            <strong>
              {selectedClassData?.className ||
                selectedClassData?.name ||
                selectedClass}
            </strong>

            <span>
              Section{" "}
              {selectedSection}
            </span>

            <span>
              {subjects.length} subject
              {subjects.length === 1
                ? ""
                : "s"} assigned
            </span>

          </div>
        )}

      {/* EMPTY STATE */}

      {!selectedClass ||
      !selectedSection ? (
        <div className="timetable-empty-state">

          <h3>
            Select Class and Section
          </h3>

          <p>
            Select a class and section
            above to view and create
            its timetable.
          </p>

        </div>
      ) : (

        /* TIMETABLE */

        <div className="timetable-card">

          <div className="timetable-scroll">

            <table className="timetable-table">

              <thead>
                <tr>

                  <th className="period-column">
                    Period
                  </th>

                  {DAYS.map(
                    (day) => (
                      <th key={day}>
                        {day}
                      </th>
                    )
                  )}

                </tr>
              </thead>

              <tbody>

                {periods.map(
                  (period) => (

                    <tr
                      key={
                        period.id
                      }
                    >

                      {/* PERIOD */}

                      <td className="period-cell">

                        <strong>
                          {period.name}
                        </strong>

                        <span>
                          {period.start}
                          {" - "}
                          {period.end}
                        </span>

                      </td>

                      {/* DAYS */}

                      {DAYS.map(
                        (day) => {

                          const lesson =
                            getLesson(
                              day,
                              period.id
                            );

                          return (

                            <td
                              key={
                                day +
                                "-" +
                                period.id
                              }
                              className={
                                lesson
                                  ? "timetable-filled-cell"
                                  : "timetable-free-cell"
                              }
                            >

                              {lesson ? (

                                <div className="timetable-lesson">

                                  <div className="timetable-subject">
                                    {getSubjectName(
                                      lesson.subject
                                    )}
                                  </div>

                                  {lesson.teacher && (
                                    <div className="timetable-teacher">
                                      {lesson.teacher}
                                    </div>
                                  )}

                                  {/* LESSON ACTIONS */}

                                  <div className="timetable-actions">

                                    <button
                                      type="button"
                                      onClick={() =>
                                        handlePlanLesson(
                                          day,
                                          period,
                                          lesson
                                        )
                                      }
                                      className="timetable-plan-button"
                                    >
                                      Plan Lesson
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleAddLesson(
                                          day,
                                          period
                                        )
                                      }
                                    >
                                      Edit
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleRemoveLesson(
                                          day,
                                          period.id
                                        )
                                      }
                                    >
                                      Remove
                                    </button>

                                  </div>

                                </div>

                              ) : (

                                <button
                                  type="button"
                                  className="timetable-add-button"
                                  onClick={() =>
                                    handleAddLesson(
                                      day,
                                      period
                                    )
                                  }
                                >
                                  + Add
                                </button>

                              )}

                            </td>
                          );
                        }
                      )}

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>
      )}

      {/* ASSIGNED SUBJECTS */}

      {selectedClass &&
        selectedSection &&
        subjects.length > 0 && (

          <div className="timetable-subject-list">

            <h3>
              Assigned Subjects
            </h3>

            <div className="timetable-subjects">

              {subjects.map(
                (
                  subject,
                  index
                ) => (

                  <span
                    key={index}
                  >
                    {getSubjectName(
                      subject
                    )}
                  </span>

                )
              )}

            </div>

          </div>
        )}

    </div>
  );
}

export default Timetable;
