
import { useState } from "react";
import "./ActivitiesAssessments.css";

function ActivitiesAssessments({ onBack, lessonPlans = [] }) {
  const [activities, setActivities] = useState([
    {
      id: 1,
      className: "Class 8 - A",
      subject: "Mathematics",
      topic: "Linear Equations",
      activityName: "Equation Practice",
      activityType: "Class Activity",
      instructions:
        "Students solve a set of linear equations individually and compare answers.",
      assessmentMethod: "Worksheet",
      marks: "10",
      dueDate: "22 September 2026",
    },
    {
      id: 2,
      className: "Class 8 - A",
      subject: "Science",
      topic: "Force and Pressure",
      activityName: "Force Demonstration",
      activityType: "Practical Activity",
      instructions:
        "Students demonstrate the effect of force using simple classroom objects.",
      assessmentMethod: "Observation",
      marks: "10",
      dueDate: "24 September 2026",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    className: "",
    subject: "",
    topic: "",
    activityName: "",
    activityType: "",
    instructions: "",
    assessmentMethod: "",
    marks: "",
    dueDate: "",
  });

  /*
   * ============================================
   * FORM CHANGE
   * ============================================
   */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };


  /*
   * ============================================
   * SAVE ACTIVITY
   * ============================================
   */

  const handleSubmit = (event) => {
    event.preventDefault();

    const newActivity = {
      id: Date.now(),
      ...formData,
    };

    setActivities((previousActivities) => [
      ...previousActivities,
      newActivity,
    ]);

    setFormData({
      className: "",
      subject: "",
      topic: "",
      activityName: "",
      activityType: "",
      instructions: "",
      assessmentMethod: "",
      marks: "",
      dueDate: "",
    });

    setShowForm(false);
  };


  /*
   * ============================================
   * HOMEWORK FROM COMPLETED LESSONS
   * ============================================
   *
   * CompletionForm saves homework into:
   *
   * lessonPlans[].homework
   *
   * We display only lessons that actually
   * contain homework.
   * ============================================
   */

  const homeworkLessons = lessonPlans.filter((lesson) => {

    if (!lesson) {
      return false;
    }

    if (
      lesson.homework === null ||
      lesson.homework === undefined
    ) {
      return false;
    }

    if (
      typeof lesson.homework === "string"
    ) {
      return lesson.homework.trim() !== "";
    }

    return true;

  });


  /*
   * ============================================
   * FORMAT DATE
   * ============================================
   */

  const formatHomeworkDate = (dateString) => {

    if (!dateString) {
      return "Not available";
    }

    const date = new Date(
      dateString + "T00:00:00"
    );

    if (Number.isNaN(date.getTime())) {
      return dateString;
    }

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  };


  /*
   * ============================================
   * DISPLAY HOMEWORK VALUE
   * ============================================
   */

  const getHomeworkText = (homework) => {

    if (
      homework === null ||
      homework === undefined
    ) {
      return "";
    }

    if (
      typeof homework === "string"
    ) {
      return homework;
    }

    if (
      typeof homework === "object"
    ) {

      return (
        homework.text ||
        homework.description ||
        homework.instructions ||
        JSON.stringify(homework)
      );

    }

    return String(homework);

  };


  return (
    <div className="activities-page">

      {/* ============================================
          HEADER
          ============================================ */}

      <div className="activities-header">

        <div>

          <button
            className="back-button"
            onClick={onBack}
          >
            ← Back
          </button>

          <h1>
            Activities & Assessments
          </h1>

          <p>
            Plan classroom activities, homework
            and assess student learning
          </p>

        </div>


        <button
          className="add-activity-button"
          onClick={() =>
            setShowForm(!showForm)
          }
        >
          + Add Activity
        </button>

      </div>


      {/* ============================================
          HOMEWORK FROM COMPLETION FORM
          ============================================ */}

      <section className="homework-section">

        <div className="homework-section-header">

          <div>

            <h2>
              Homework
            </h2>

            <p>
              Homework entered while completing
              lessons appears here automatically.
            </p>

          </div>

          <span className="homework-count">

            {homeworkLessons.length}

            {" "}

            {homeworkLessons.length === 1
              ? "Lesson"
              : "Lessons"}

          </span>

        </div>


        {homeworkLessons.length === 0 ? (

          <div className="homework-empty-state">

            <h3>
              No homework added yet
            </h3>

            <p>
              Complete a lesson and enter homework
              in the Completion Form. The homework
              will appear here automatically.
            </p>

          </div>

        ) : (

          <div className="homework-list">

            {homeworkLessons.map((lesson) => (

              <div
                className="homework-card"
                key={
                  lesson.id ||
                  `${lesson.date}-${lesson.topic}`
                }
              >

                <div className="homework-card-header">

                  <div>

                    <h3>
                      {lesson.topic ||
                        lesson.lessonTopic ||
                        "Lesson Homework"}
                    </h3>

                    <p>

                      {lesson.className ||
                        lesson.classSection ||
                        "Class not specified"}

                      {" • "}

                      {lesson.subject ||
                        "Subject not specified"}

                    </p>

                  </div>


                  <span className="homework-status">

                    {lesson.status ||
                      "Completed"}

                  </span>

                </div>


                <div className="homework-details">

                  <div className="homework-detail">

                    <strong>
                      Lesson Date
                    </strong>

                    <span>
                      {formatHomeworkDate(
                        lesson.date
                      )}
                    </span>

                  </div>


                  <div className="homework-detail">

                    <strong>
                      Completion Date
                    </strong>

                    <span>

                      {lesson.completedAt
                        ? formatHomeworkDate(
                            lesson.completedAt.split("T")[0]
                          )
                        : "Not available"}

                    </span>

                  </div>

                </div>


                <div className="homework-content">

                  <h4>
                    Homework
                  </h4>

                  <p>
                    {getHomeworkText(
                      lesson.homework
                    )}
                  </p>

                </div>


                {lesson.remarks && (

                  <div className="homework-remarks">

                    <strong>
                      Teacher Remarks
                    </strong>

                    <p>
                      {lesson.remarks}
                    </p>

                  </div>

                )}

              </div>

            ))}

          </div>

        )}

      </section>


      {/* ============================================
          ADD ACTIVITY FORM
          ============================================ */}

      {showForm && (

        <div className="activity-form-card">

          <h2>
            Add Activity / Assessment
          </h2>


          <form onSubmit={handleSubmit}>

            <div className="activity-form-grid">

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


              <div className="form-group">

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


              <div className="form-group">

                <label htmlFor="activityName">
                  Activity Name
                </label>

                <input
                  id="activityName"
                  name="activityName"
                  type="text"
                  placeholder="Example: Equation Practice"
                  value={formData.activityName}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label htmlFor="activityType">
                  Activity Type
                </label>

                <select
                  id="activityType"
                  name="activityType"
                  value={formData.activityType}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select activity type
                  </option>

                  <option value="Class Activity">
                    Class Activity
                  </option>

                  <option value="Group Activity">
                    Group Activity
                  </option>

                  <option value="Practical Activity">
                    Practical Activity
                  </option>

                  <option value="Project">
                    Project
                  </option>

                  <option value="Discussion">
                    Discussion
                  </option>

                  <option value="Quiz">
                    Quiz
                  </option>

                  <option value="Assignment">
                    Assignment
                  </option>

                  <option value="Homework">
                    Homework
                  </option>

                </select>

              </div>


              <div className="form-group">

                <label htmlFor="assessmentMethod">
                  Assessment Method
                </label>

                <select
                  id="assessmentMethod"
                  name="assessmentMethod"
                  value={formData.assessmentMethod}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select assessment method
                  </option>

                  <option value="Worksheet">
                    Worksheet
                  </option>

                  <option value="Observation">
                    Observation
                  </option>

                  <option value="Quiz">
                    Quiz
                  </option>

                  <option value="Oral Assessment">
                    Oral Assessment
                  </option>

                  <option value="Practical">
                    Practical
                  </option>

                  <option value="Project">
                    Project
                  </option>

                  <option value="Assignment">
                    Assignment
                  </option>

                </select>

              </div>


              <div className="form-group">

                <label htmlFor="marks">
                  Maximum Marks
                </label>

                <input
                  id="marks"
                  name="marks"
                  type="number"
                  min="0"
                  placeholder="Example: 10"
                  value={formData.marks}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label htmlFor="dueDate">
                  Due Date
                </label>

                <input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group full-width">

                <label htmlFor="instructions">
                  Instructions
                </label>

                <textarea
                  id="instructions"
                  name="instructions"
                  rows="4"
                  placeholder="Enter instructions for students"
                  value={formData.instructions}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            <div className="activity-form-actions">

              <button
                type="button"
                className="cancel-button"
                onClick={() =>
                  setShowForm(false)
                }
              >
                Cancel
              </button>


              <button
                type="submit"
                className="save-activity-button"
              >
                Save Activity
              </button>

            </div>

          </form>

        </div>

      )}


      {/* ============================================
          ACTIVITIES & ASSESSMENTS
          ============================================ */}

      <section className="activities-section">

        <div className="activities-section-header">

          <div>

            <h2>
              Activities & Assessments
            </h2>

            <p>
              Classroom activities and assessment
              records
            </p>

          </div>

        </div>


        <div className="activities-list">

          {activities.map((activity) => (

            <div
              className="activity-card"
              key={activity.id}
            >

              <div className="activity-card-header">

                <div>

                  <h2>
                    {activity.activityName}
                  </h2>

                  <p>
                    {activity.className}
                    {" • "}
                    {activity.subject}
                  </p>

                  <span className="activity-topic">
                    Topic: {activity.topic}
                  </span>

                </div>


                <span className="activity-type">
                  {activity.activityType}
                </span>

              </div>


              <div className="activity-details">

                <div className="activity-detail">

                  <strong>
                    Assessment
                  </strong>

                  <span>
                    {activity.assessmentMethod}
                  </span>

                </div>


                <div className="activity-detail">

                  <strong>
                    Marks
                  </strong>

                  <span>
                    {activity.marks}
                  </span>

                </div>


                <div className="activity-detail">

                  <strong>
                    Due Date
                  </strong>

                  <span>
                    {activity.dueDate}
                  </span>

                </div>

              </div>


              <div className="activity-instructions">

                <h3>
                  Instructions
                </h3>

                <p>
                  {activity.instructions}
                </p>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default ActivitiesAssessments;

