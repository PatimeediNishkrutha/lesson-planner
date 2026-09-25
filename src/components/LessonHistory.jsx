import { useMemo, useState } from "react";

function LessonHistory({ onBack, lessonPlans }) {
  const lessons = lessonPlans || [];

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [classFilter, setClassFilter] = useState("All");

  const subjects = [
    ...new Set(
      lessons
        .map((lesson) => lesson.subject)
        .filter(Boolean)
    ),
  ];

  const classes = [
    ...new Set(
      lessons
        .map((lesson) => lesson.className)
        .filter(Boolean)
    ),
  ];

  const statuses = [
    ...new Set(
      lessons
        .map((lesson) => lesson.status)
        .filter(Boolean)
    ),
  ];

  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        !searchText ||
        lesson.topic?.toLowerCase().includes(searchText) ||
        lesson.subject?.toLowerCase().includes(searchText) ||
        lesson.className?.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        lesson.status === statusFilter;

      const matchesSubject =
        subjectFilter === "All" ||
        lesson.subject === subjectFilter;

      const matchesClass =
        classFilter === "All" ||
        lesson.className === classFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesSubject &&
        matchesClass
      );
    });
  }, [
    lessons,
    search,
    statusFilter,
    subjectFilter,
    classFilter,
  ]);

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setSubjectFilter("All");
    setClassFilter("All");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "#f7f6fc",
        color: "#20205c",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1150px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Header */}
        <button
          onClick={onBack}
          style={{
            border: "none",
            background: "transparent",
            color: "#5145cd",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            marginBottom: "15px",
            padding: "5px 0",
          }}
        >
          ← Back
        </button>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            marginBottom: "30px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "32px",
              }}
            >
              Lesson History
            </h1>

            <p
              style={{
                color: "#77749a",
                marginTop: "8px",
              }}
            >
              View and filter your previous lesson plans
            </p>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: "14px",
              padding: "18px 25px",
              boxShadow:
                "0 5px 18px rgba(40, 35, 100, 0.08)",
              textAlign: "center",
            }}
          >
            <span
              style={{
                display: "block",
                color: "#77749a",
                fontSize: "14px",
              }}
            >
              Total Lessons
            </span>

            <strong
              style={{
                display: "block",
                fontSize: "25px",
                marginTop: "5px",
              }}
            >
              {lessons.length}
            </strong>
          </div>
        </div>

        {/* Filters */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "22px",
            marginBottom: "25px",
            boxShadow:
              "0 5px 18px rgba(40, 35, 100, 0.08)",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              marginBottom: "18px",
              fontSize: "19px",
            }}
          >
            Filters
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "minmax(180px, 2fr) repeat(3, minmax(130px, 1fr)) auto",
              gap: "12px",
              alignItems: "center",
            }}
          >
            {/* Search */}
            <input
              type="text"
              placeholder="Search topic, subject or class..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px 14px",
                border: "1px solid #ddd9ee",
                borderRadius: "9px",
                fontSize: "14px",
                outline: "none",
                background: "#ffffff",
              }}
            />

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px",
                border: "1px solid #ddd9ee",
                borderRadius: "9px",
                fontSize: "14px",
                background: "#ffffff",
                cursor: "pointer",
              }}
            >
              <option value="All">All Status</option>

              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            {/* Subject */}
            <select
              value={subjectFilter}
              onChange={(event) =>
                setSubjectFilter(event.target.value)
              }
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px",
                border: "1px solid #ddd9ee",
                borderRadius: "9px",
                fontSize: "14px",
                background: "#ffffff",
                cursor: "pointer",
              }}
            >
              <option value="All">All Subjects</option>

              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>

            {/* Class */}
            <select
              value={classFilter}
              onChange={(event) =>
                setClassFilter(event.target.value)
              }
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px",
                border: "1px solid #ddd9ee",
                borderRadius: "9px",
                fontSize: "14px",
                background: "#ffffff",
                cursor: "pointer",
              }}
            >
              <option value="All">All Classes</option>

              {classes.map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>

            {/* Clear */}
            <button
              onClick={clearFilters}
              style={{
                padding: "12px 16px",
                border: "none",
                borderRadius: "9px",
                background: "#5145cd",
                color: "#ffffff",
                fontWeight: "600",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Results */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow:
              "0 5px 18px rgba(40, 35, 100, 0.08)",
          }}
        >
          <div
            style={{
              padding: "20px 25px",
              borderBottom: "1px solid #eeeaf6",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "20px",
              }}
            >
              Lesson Records
            </h2>

            <span
              style={{
                color: "#77749a",
                fontSize: "14px",
              }}
            >
              {filteredLessons.length}{" "}
              {filteredLessons.length === 1
                ? "lesson"
                : "lessons"}
            </span>
          </div>

          {filteredLessons.length === 0 ? (
            <div
              style={{
                padding: "60px 20px",
                textAlign: "center",
                color: "#77749a",
              }}
            >
              <h3
                style={{
                  color: "#20205c",
                }}
              >
                No lessons found
              </h3>

              <p>
                Try changing your filters or create a new
                lesson plan.
              </p>
            </div>
          ) : (
            <div
              style={{
                overflowX: "auto",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "850px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "#f8f7fc",
                      textAlign: "left",
                    }}
                  >
                    <th style={tableHeaderStyle}>
                      Date
                    </th>

                    <th style={tableHeaderStyle}>
                      Time
                    </th>

                    <th style={tableHeaderStyle}>
                      Class
                    </th>

                    <th style={tableHeaderStyle}>
                      Subject
                    </th>

                    <th style={tableHeaderStyle}>
                      Topic
                    </th>

                    <th style={tableHeaderStyle}>
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredLessons.map((lesson) => (
                    <tr key={lesson.id}>
                      <td style={tableCellStyle}>
                        {lesson.date || "-"}
                      </td>

                      <td style={tableCellStyle}>
                        {lesson.time || "-"}
                      </td>

                      <td style={tableCellStyle}>
                        {lesson.className || "-"}
                      </td>

                      <td style={tableCellStyle}>
                        {lesson.subject || "-"}
                      </td>

                      <td
                        style={{
                          ...tableCellStyle,
                          fontWeight: "600",
                        }}
                      >
                        {lesson.topic || "-"}
                      </td>

                      <td style={tableCellStyle}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "6px 11px",
                            borderRadius: "20px",
                            background:
                              lesson.status ===
                              "Completed"
                                ? "#e1f6e9"
                                : "#eeeafd",
                            color:
                              lesson.status ===
                              "Completed"
                                ? "#168447"
                                : "#5145cd",
                            fontSize: "13px",
                            fontWeight: "600",
                          }}
                        >
                          {lesson.status || "Planned"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Responsive styles */}
      <style>
        {`
          @media (max-width: 1100px) {
            .lesson-history-filters {
              grid-template-columns: repeat(2, minmax(180px, 1fr));
            }
          }

          @media (max-width: 700px) {
            .lesson-history-filters {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
    </div>
  );
}

const tableHeaderStyle = {
  padding: "15px",
  color: "#6f6b91",
  fontSize: "13px",
  fontWeight: "600",
  borderBottom: "1px solid #eeeaf6",
};

const tableCellStyle = {
  padding: "16px 15px",
  borderBottom: "1px solid #f0eef7",
  fontSize: "14px",
  color: "#39365f",
};

export default LessonHistory;