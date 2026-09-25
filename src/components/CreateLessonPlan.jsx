import { useEffect, useState } from "react";
import "./CreateLessonPlan.css";

function CreateLessonPlan({
  onBack,
  onSave,
  initialData,
}) {
  const [formData, setFormData] = useState({
    className: "",
    subject: "",
    date: "",
    time: "",
    day: "",
    periodId: "",
    topic: "",
    objective: "",
    prerequisites: "",
    teachingMethod: "",
    resources: "",
    homework: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData((previousData) => ({
        ...previousData,

        className:
          initialData.className || "",

        subject:
          initialData.subject || "",

        date:
          initialData.date || "",

        time:
          initialData.time || "",

        day:
          initialData.day || "",

        periodId:
          initialData.periodId || "",

        topic:
          initialData.topic || "",

        objective:
          initialData.objective || "",

        prerequisites:
          initialData.prerequisites || "",

        teachingMethod:
          initialData.teachingMethod || "",

        resources:
          initialData.resources || "",

        homework:
          initialData.homework || "",
      }));
    }
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSave(formData);
  };

  return (
    <div className="create-lesson-page">

      {/* HEADER */}
      <div className="create-lesson-header">
        <div>

          <button
            className="back-button"
            onClick={onBack}
          >
            ← Back
          </button>

          <h1>
            Create Lesson Plan
          </h1>

          <p>
            Create and plan a lesson for your class
          </p>

        </div>
      </div>

      {/* FORM */}
      <div className="lesson-form-card">

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            {/* CLASS */}
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

            {/* SUBJECT */}
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

            {/* DATE */}
            <div className="form-group">

              <label htmlFor="date">
                Date
              </label>

              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />

            </div>

            {/* TIME */}
            <div className="form-group">

              <label htmlFor="time">
                Period / Time
              </label>

              <input
                id="time"
                name="time"
                type="text"
                placeholder="Example: 09:00 AM - 09:45 AM"
                value={formData.time}
                onChange={handleChange}
                required
              />

            </div>

            {/* TOPIC */}
            <div className="form-group full-width">

              <label htmlFor="topic">
                Topic
              </label>

              <input
                id="topic"
                name="topic"
                type="text"
                placeholder="Enter lesson topic"
                value={formData.topic}
                onChange={handleChange}
                required
              />

            </div>

            {/* OBJECTIVE */}
            <div className="form-group full-width">

              <label htmlFor="objective">
                Learning Objective
              </label>

              <textarea
                id="objective"
                name="objective"
                placeholder="What should students learn from this lesson?"
                value={formData.objective}
                onChange={handleChange}
                rows="3"
              />

            </div>

            {/* PREREQUISITES */}
            <div className="form-group full-width">

              <label htmlFor="prerequisites">
                Prerequisites
              </label>

              <textarea
                id="prerequisites"
                name="prerequisites"
                placeholder="What should students already know?"
                value={formData.prerequisites}
                onChange={handleChange}
                rows="3"
              />

            </div>

            {/* TEACHING METHOD */}
            <div className="form-group">

              <label htmlFor="teachingMethod">
                Teaching Method
              </label>

              <input
                id="teachingMethod"
                name="teachingMethod"
                type="text"
                placeholder="Example: Explanation, Discussion"
                value={formData.teachingMethod}
                onChange={handleChange}
              />

            </div>

            {/* RESOURCES */}
            <div className="form-group">

              <label htmlFor="resources">
                Teaching Resources
              </label>

              <input
                id="resources"
                name="resources"
                type="text"
                placeholder="Example: Textbook, PPT, Video"
                value={formData.resources}
                onChange={handleChange}
              />

            </div>

            {/* HOMEWORK */}
            <div className="form-group full-width">

              <label htmlFor="homework">
                Homework
              </label>

              <textarea
                id="homework"
                name="homework"
                placeholder="Enter homework for students"
                value={formData.homework}
                onChange={handleChange}
                rows="3"
              />

            </div>

          </div>

          {/* BUTTONS */}
          <div className="form-actions">

            <button
              type="button"
              className="cancel-button"
              onClick={onBack}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-lesson-button"
            >
              Save Lesson Plan
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateLessonPlan;