import { useState } from "react";
import "./CompletionForm.css";

function CompletionForm({ lesson, onBack, onComplete }) {
  const [status, setStatus] = useState("Completed");
  const [coverage, setCoverage] = useState("");
  const [homework, setHomework] = useState(
    lesson?.homework || ""
  );
  const [remarks, setRemarks] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const completionData = {
      ...lesson,
      status,
      coverage,
      homework,
      remarks,
      completedAt:
        status === "Completed"
          ? new Date().toISOString()
          : null,
    };

    onComplete(completionData);
  };

  return (
    <div className="completion-page">

      {/* Header */}

      <header className="completion-header">
        <button
          type="button"
          className="completion-back-button"
          onClick={onBack}
        >
          ← Back
        </button>

        <div>
          <h1>Lesson Completion</h1>

          <p>
            Record what happened during the lesson
          </p>
        </div>
      </header>


      {/* Lesson Information */}

      <main className="completion-content">

        <section className="lesson-summary-card">
          <div>
            <span className="summary-label">
              Class
            </span>

            <strong>
              {lesson?.className || "Not available"}
            </strong>
          </div>

          <div>
            <span className="summary-label">
              Subject
            </span>

            <strong>
              {lesson?.subject || "Not available"}
            </strong>
          </div>

          <div>
            <span className="summary-label">
              Date
            </span>

            <strong>
              {lesson?.date || "Not available"}
            </strong>
          </div>

          <div>
            <span className="summary-label">
              Time
            </span>

            <strong>
              {lesson?.time || "Not available"}
            </strong>
          </div>
        </section>


        {/* Topic */}

        <section className="completion-card">

          <h2>Lesson Details</h2>

          <div className="lesson-topic-box">
            <span>Topic</span>

            <strong>
              {lesson?.topic || "No topic added"}
            </strong>
          </div>

          {lesson?.objective && (
            <div className="lesson-detail-row">
              <span>Learning Objective</span>

              <p>{lesson.objective}</p>
            </div>
          )}

          {lesson?.teachingMethod && (
            <div className="lesson-detail-row">
              <span>Teaching Method</span>

              <p>{lesson.teachingMethod}</p>
            </div>
          )}

          {lesson?.resources && (
            <div className="lesson-detail-row">
              <span>Resources</span>

              <p>{lesson.resources}</p>
            </div>
          )}

        </section>


        {/* Completion Form */}

        <form
          className="completion-card"
          onSubmit={handleSubmit}
        >

          <h2>Completion Details</h2>


          {/* Status */}

          <div className="form-group">

            <label htmlFor="lesson-status">
              Lesson Status
            </label>

            <select
              id="lesson-status"
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
            >
              <option value="Completed">
                Completed
              </option>

              <option value="Partly Done">
                Partly Done
              </option>

              <option value="Not Done">
                Not Done
              </option>
            </select>

          </div>


          {/* Coverage */}

          <div className="form-group">

            <label htmlFor="lesson-coverage">
              What was covered?
            </label>

            <textarea
              id="lesson-coverage"
              value={coverage}
              onChange={(event) =>
                setCoverage(event.target.value)
              }
              placeholder="Describe the topics or concepts covered during the lesson..."
              rows="4"
            />

          </div>


          {/* Homework */}

          <div className="form-group">

            <label htmlFor="lesson-homework">
              Homework
            </label>

            <textarea
              id="lesson-homework"
              value={homework}
              onChange={(event) =>
                setHomework(event.target.value)
              }
              placeholder="Enter homework given to students..."
              rows="4"
            />

          </div>


          {/* Remarks */}

          <div className="form-group">

            <label htmlFor="lesson-remarks">
              Remarks
            </label>

            <textarea
              id="lesson-remarks"
              value={remarks}
              onChange={(event) =>
                setRemarks(event.target.value)
              }
              placeholder="Add any additional remarks..."
              rows="4"
            />

          </div>


          {/* Actions */}

          <div className="completion-actions">

            <button
              type="button"
              className="completion-cancel-button"
              onClick={onBack}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="completion-save-button"
            >
              Save Completion
            </button>

          </div>

        </form>

      </main>
    </div>
  );
}

export default CompletionForm;