import "./LessonReports.css";

function LessonReports({ onBack, lessonPlans }) {
  const lessons = lessonPlans || [];

  const totalLessons = lessons.length;

  const completedLessons = lessons.filter(
    (lesson) => lesson.status === "Completed"
  ).length;

  const plannedLessons = lessons.filter(
    (lesson) => lesson.status === "Planned"
  ).length;

  const pendingLessons = lessons.filter(
    (lesson) =>
      lesson.status === "Not Done" ||
      lesson.status === "Partly Done"
  ).length;

  const completionPercentage =
    totalLessons === 0
      ? 0
      : Math.round((completedLessons / totalLessons) * 100);

  const subjectData = lessons.reduce((result, lesson) => {
    const subject = lesson.subject || "Unknown";

    if (!result[subject]) {
      result[subject] = {
        total: 0,
        completed: 0,
      };
    }

    result[subject].total += 1;

    if (lesson.status === "Completed") {
      result[subject].completed += 1;
    }

    return result;
  }, {});

  const classData = lessons.reduce((result, lesson) => {
    const className = lesson.className || "Unknown";

    if (!result[className]) {
      result[className] = {
        total: 0,
        completed: 0,
      };
    }

    result[className].total += 1;

    if (lesson.status === "Completed") {
      result[className].completed += 1;
    }

    return result;
  }, {});

  return (
    <div className="lesson-reports-page">
      <div className="lesson-reports-header">
        <div>
          <button className="back-button" onClick={onBack}>
            ← Back
          </button>

          <h1>Lesson Reports</h1>

          <p>
            Track lesson completion and syllabus progress
          </p>
        </div>
      </div>

      <div className="report-summary">
        <div className="report-summary-card">
          <span>Total Lessons</span>
          <strong>{totalLessons}</strong>
        </div>

        <div className="report-summary-card">
          <span>Completed</span>
          <strong>{completedLessons}</strong>
        </div>

        <div className="report-summary-card">
          <span>Planned</span>
          <strong>{plannedLessons}</strong>
        </div>

        <div className="report-summary-card">
          <span>Pending</span>
          <strong>{pendingLessons}</strong>
        </div>
      </div>

      <div className="completion-card">
        <div className="completion-header">
          <div>
            <h2>Overall Lesson Completion</h2>

            <p>
              Progress based on your planned and completed lessons
            </p>
          </div>

          <strong>{completionPercentage}%</strong>
        </div>

        <div className="progress-background">
          <div
            className="progress-fill"
            style={{
              width: `${completionPercentage}%`,
            }}
          ></div>
        </div>
      </div>

      <div className="report-sections">
        <div className="report-section-card">
          <div className="report-section-header">
            <div>
              <h2>Subject-wise Progress</h2>

              <p>
                Lesson completion by subject
              </p>
            </div>
          </div>

          {Object.keys(subjectData).length === 0 ? (
            <div className="report-empty">
              <h3>No subject data</h3>

              <p>
                Create lesson plans to see subject progress.
              </p>
            </div>
          ) : (
            <div className="progress-list">
              {Object.entries(subjectData).map(
                ([subject, data]) => {
                  const percentage =
                    data.total === 0
                      ? 0
                      : Math.round(
                          (data.completed / data.total) * 100
                        );

                  return (
                    <div
                      className="progress-item"
                      key={subject}
                    >
                      <div className="progress-item-header">
                        <strong>{subject}</strong>

                        <span>
                          {data.completed} / {data.total}
                        </span>
                      </div>

                      <div className="progress-background">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${percentage}%`,
                          }}
                        ></div>
                      </div>

                      <small>
                        {percentage}% completed
                      </small>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>

        <div className="report-section-card">
          <div className="report-section-header">
            <div>
              <h2>Class-wise Progress</h2>

              <p>
                Lesson completion by class
              </p>
            </div>
          </div>

          {Object.keys(classData).length === 0 ? (
            <div className="report-empty">
              <h3>No class data</h3>

              <p>
                Create lesson plans to see class progress.
              </p>
            </div>
          ) : (
            <div className="progress-list">
              {Object.entries(classData).map(
                ([className, data]) => {
                  const percentage =
                    data.total === 0
                      ? 0
                      : Math.round(
                          (data.completed / data.total) * 100
                        );

                  return (
                    <div
                      className="progress-item"
                      key={className}
                    >
                      <div className="progress-item-header">
                        <strong>{className}</strong>

                        <span>
                          {data.completed} / {data.total}
                        </span>
                      </div>

                      <div className="progress-background">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${percentage}%`,
                          }}
                        ></div>
                      </div>

                      <small>
                        {percentage}% completed
                      </small>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LessonReports;