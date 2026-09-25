import { useState } from "react";
import "./MyClasses.css";

function MyClasses({ onBack }) {
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "Class 8 - A",
      students: 30,
      subjects: 6,
      status: "Active",
    },
    {
      id: 2,
      name: "Class 8 - B",
      students: 28,
      subjects: 6,
      status: "Active",
    },
    {
      id: 3,
      name: "Class 7 - B",
      students: 32,
      subjects: 6,
      status: "Active",
    },
  ]);

  return (
    <div className="my-classes-page">

      <div className="my-classes-header">

        <div>
          <button
            className="back-button"
            onClick={onBack}
          >
            ← Back
          </button>

          <h1>My Classes</h1>

          <p>
            View your classes and sections
          </p>
          <button
  className="add-class-button"
  onClick={() => {
    const className = window.prompt(
      "Enter class and section:"
    );

    if (!className) {
      return;
    }

    const newClass = {
      id: Date.now(),
      name: className,
      students: 0,
      subjects: 0,
      status: "Active",
    };

    setClasses((previousClasses) => [
      ...previousClasses,
      newClass,
    ]);
  }}
>
  + Add Class
</button>
        </div>

      </div>

      <div className="classes-grid">

        {classes.map((classItem) => (

          <div
            className="class-card"
            key={classItem.id}
          >

            <div className="class-card-top">

              <h2>
                {classItem.name}
              </h2>

              <span>
                {classItem.status}
              </span>

            </div>

            <p>
              View students, subjects and lesson plans
            </p>

            <div className="class-info">

              <span>
                Students: {classItem.students}
              </span>

              <span>
                Subjects: {classItem.subjects}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MyClasses;