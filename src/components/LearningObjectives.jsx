import { useState } from "react";
import "./LearningObjectives.css";

function LearningObjectives({ onBack }) {
  const [objectives, setObjectives] = useState([
    {
      id: 1,
      className: "Class 8 - A",
      subject: "Mathematics",
      topic: "Linear Equations",
      objective:
        "Students will be able to solve simple linear equations.",
      outcome:
        "Students can solve and verify linear equations independently.",
    },
    {
      id: 2,
      className: "Class 8 - A",
      subject: "Science",
      topic: "Force and Pressure",
      objective:
        "Students will understand the effects of force on objects.",
      outcome:
        "Students can explain force and pressure using examples.",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    className: "",
    subject: "",
    topic: "",
    objective: "",
    outcome: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newObjective = {
      id: Date.now(),
      ...formData,
    };

    setObjectives((previousObjectives) => [
      ...previousObjectives,
      newObjective,
    ]);

    setFormData({
      className: "",
      subject: "",
      topic: "",
      objective: "",
      outcome: "",
    });

    setShowForm(false);
  };

  return (
    <div className="learning-objectives-page">
      <div className="learning-objectives-header">
        <div>
          <button className="back-button" onClick={onBack}>
            ← Back
          </button>

          <h1>Learning Objectives</h1>

          <p>
            Define what students should learn from each lesson
          </p>
        </div>

        <button
          className="add-objective-button"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Objective
        </button>
      </div>

      {showForm && (
        <div className="objective-form-card">
          <h2>Add Learning Objective</h2>

          <form onSubmit={handleSubmit}>
            <div className="objective-form-grid">
              <div className="form-group">
                <label htmlFor="className">
                  Class / Section
                </label>

                <input
                  id="className"
                  name="className"
                  type="text"
                  placeholder="Example: Class 8 - A"
                  value={formData.className}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Example: Mathematics"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="topic">
                  Lesson Topic
                </label>

                <input
                  id="topic"
                  name="topic"
                  type="text"
                  placeholder="Example: Linear Equations"
                  value={formData.topic}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="objective">
                  Learning Objective
                </label>

                <textarea
                  id="objective"
                  name="objective"
                  rows="4"
                  placeholder="What should students learn from this lesson?"
                  value={formData.objective}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="outcome">
                  Expected Outcome
                </label>

                <textarea
                  id="outcome"
                  name="outcome"
                  rows="4"
                  placeholder="What should students be able to do after the lesson?"
                  value={formData.outcome}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="objective-form-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-objective-button"
              >
                Save Objective
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="objectives-list">
        {objectives.map((item) => (
          <div
            className="objective-card"
            key={item.id}
          >
            <div className="objective-card-header">
              <div>
                <h2>{item.topic}</h2>

                <p>
                  {item.className} • {item.subject}
                </p>
              </div>
            </div>

            <div className="objective-section">
              <h3>Learning Objective</h3>

              <p>{item.objective}</p>
            </div>

            <div className="objective-section">
              <h3>Expected Outcome</h3>

              <p>{item.outcome}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LearningObjectives;