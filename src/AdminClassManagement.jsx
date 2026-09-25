import React, { useEffect, useState } from "react";

import ClassIcon from "@mui/icons-material/Class";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EditIcon from "@mui/icons-material/Edit";

function AdminClassManagement() {
  /* =========================
     CLASS STATE
     ========================= */

  const [showClassForm, setShowClassForm] = useState(false);

  const [classForm, setClassForm] = useState({
    className: "",
    section: "",
  });

  const [classes, setClasses] = useState(() => {
    try {
      const stored = localStorage.getItem("adminClasses");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  /* =========================
     SUBJECT STATE
     ========================= */

  const [subjects, setSubjects] = useState(() => {
    try {
      const stored = localStorage.getItem("adminSubjects");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [showSubjectForm, setShowSubjectForm] = useState(false);

  const [subjectName, setSubjectName] = useState("");

  /* =========================
     ASSIGN SUBJECT STATE
     ========================= */

  const [selectedClassId, setSelectedClassId] = useState(null);

  const [selectedSubjects, setSelectedSubjects] = useState([]);

  /* =========================
     SAVE CLASSES
     ========================= */

  useEffect(() => {
    localStorage.setItem("adminClasses", JSON.stringify(classes));
  }, [classes]);

  /* =========================
     SAVE SUBJECTS
     ========================= */

  useEffect(() => {
    localStorage.setItem("adminSubjects", JSON.stringify(subjects));
  }, [subjects]);

  /* =========================
     CLASS HANDLERS
     ========================= */

  const handleClassChange = (event) => {
    const { name, value } = event.target;

    setClassForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSaveClass = (event) => {
    event.preventDefault();

    if (!classForm.className.trim()) {
      alert("Please enter Class Name.");
      return;
    }

    const newClass = {
      id: Date.now(),
      className: classForm.className.trim(),
      section: classForm.section.trim(),
      subjects: [],
    };

    setClasses((previous) => [...previous, newClass]);

    setClassForm({
      className: "",
      section: "",
    });

    setShowClassForm(false);
  };

  const handleDeleteClass = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this class?"
    );

    if (!confirmed) return;

    setClasses((previous) =>
      previous.filter((item) => item.id !== id)
    );

    if (selectedClassId === id) {
      setSelectedClassId(null);
      setSelectedSubjects([]);
    }
  };

  /* =========================
     SUBJECT HANDLERS
     ========================= */

  const handleSaveSubject = (event) => {
    event.preventDefault();

    const trimmedSubject = subjectName.trim();

    if (!trimmedSubject) {
      alert("Please enter Subject Name.");
      return;
    }

    const alreadyExists = subjects.some(
      (subject) =>
        subject.name.toLowerCase() === trimmedSubject.toLowerCase()
    );

    if (alreadyExists) {
      alert("This subject already exists.");
      return;
    }

    const newSubject = {
      id: Date.now(),
      name: trimmedSubject,
    };

    setSubjects((previous) => [...previous, newSubject]);

    setSubjectName("");
    setShowSubjectForm(false);
  };

  const handleDeleteSubject = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this subject?"
    );

    if (!confirmed) return;

    setSubjects((previous) =>
      previous.filter((subject) => subject.id !== id)
    );

    setClasses((previous) =>
      previous.map((item) => ({
        ...item,
        subjects: (item.subjects || []).filter(
          (subject) => subject.id !== id
        ),
      }))
    );

    setSelectedSubjects((previous) =>
      previous.filter((subjectId) => subjectId !== id)
    );
  };

  /* =========================
     ASSIGN SUBJECTS
     ========================= */

  const handleOpenAssignment = (classItem) => {
    setSelectedClassId(classItem.id);

    const assignedSubjectIds = (classItem.subjects || []).map(
      (subject) => subject.id
    );

    setSelectedSubjects(assignedSubjectIds);
  };

  const handleSubjectCheckbox = (subjectId) => {
    setSelectedSubjects((previous) => {
      if (previous.includes(subjectId)) {
        return previous.filter((id) => id !== subjectId);
      }

      return [...previous, subjectId];
    });
  };

  const handleSaveAssignments = () => {
    const selectedClass = classes.find(
      (item) => item.id === selectedClassId
    );

    if (!selectedClass) return;

    const assignedSubjects = subjects.filter((subject) =>
      selectedSubjects.includes(subject.id)
    );

    setClasses((previous) =>
      previous.map((item) =>
        item.id === selectedClassId
          ? {
              ...item,
              subjects: assignedSubjects,
            }
          : item
      )
    );

    setSelectedClassId(null);
    setSelectedSubjects([]);

    alert("Subjects assigned successfully.");
  };

  const selectedClass = classes.find(
    (item) => item.id === selectedClassId
  );

  return (
    <div className="admin-class-management">

      {/* =========================
          PAGE HEADER
          ========================= */}

      <div className="admin-page-heading">
        <div>
          <h1>Classes & Subjects</h1>
          <p>
            Manage classes and assign subjects for the lesson planner.
          </p>
        </div>

        <button
          type="button"
          className="admin-primary-button"
          onClick={() => setShowClassForm(true)}
        >
          <AddIcon />
          Add Class
        </button>
      </div>

      {/* =========================
          ADD CLASS FORM
          ========================= */}

      {showClassForm && (
        <div className="admin-card admin-form-card">
          <div className="admin-card-header">
            <div>
              <h2>Add Class</h2>
              <p>
                Create a class that will be used by the lesson planner.
              </p>
            </div>

            <ClassIcon />
          </div>

          <form
            className="admin-syllabus-form"
            onSubmit={handleSaveClass}
          >
            <div className="admin-form-grid">

              <div className="admin-form-group">
                <label>Class Name *</label>

                <input
                  type="text"
                  name="className"
                  value={classForm.className}
                  onChange={handleClassChange}
                  placeholder="Example: Class 8"
                />
              </div>

              <div className="admin-form-group">
                <label>Section</label>

                <input
                  type="text"
                  name="section"
                  value={classForm.section}
                  onChange={handleClassChange}
                  placeholder="Example: A"
                />
              </div>

            </div>

            <div className="admin-form-actions">

              <button
                type="button"
                className="admin-secondary-button"
                onClick={() => setShowClassForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="admin-primary-button"
              >
                <CheckCircleIcon />
                Save Class
              </button>

            </div>
          </form>
        </div>
      )}

      {/* =========================
          SUBJECT MANAGEMENT
          ========================= */}

      <div className="admin-card">

        <div className="admin-card-header">

          <div>
            <h2>Subjects</h2>

            <p>
              Create subjects that can be assigned to classes.
            </p>
          </div>

          <MenuBookIcon />

        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
          }}
        >
          <button
            type="button"
            className="admin-primary-button"
            onClick={() => setShowSubjectForm(true)}
          >
            <AddIcon />
            Add Subject
          </button>
        </div>

        {showSubjectForm && (
          <form
            className="admin-syllabus-form"
            onSubmit={handleSaveSubject}
          >
            <div className="admin-form-grid">

              <div className="admin-form-group">
                <label>Subject Name *</label>

                <input
                  type="text"
                  value={subjectName}
                  onChange={(event) =>
                    setSubjectName(event.target.value)
                  }
                  placeholder="Example: Mathematics"
                />
              </div>

            </div>

            <div className="admin-form-actions">

              <button
                type="button"
                className="admin-secondary-button"
                onClick={() => {
                  setShowSubjectForm(false);
                  setSubjectName("");
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="admin-primary-button"
              >
                <CheckCircleIcon />
                Save Subject
              </button>

            </div>
          </form>
        )}

        {subjects.length === 0 ? (
          <div className="admin-empty-state">

            <MenuBookIcon />

            <h3>No subjects added</h3>

            <p>
              Click "Add Subject" to create your first subject.
            </p>

          </div>
        ) : (
          <div className="admin-syllabus-table">

            {subjects.map((subject) => (
              <div
                className="admin-syllabus-row"
                key={subject.id}
              >
                <div>
                  <strong>{subject.name}</strong>

                  <span>
                    Available for class assignment
                  </span>
                </div>

                <button
                  type="button"
                  className="admin-delete-button"
                  onClick={() =>
                    handleDeleteSubject(subject.id)
                  }
                  title="Delete subject"
                >
                  <DeleteIcon />
                </button>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* =========================
          CLASSES
          ========================= */}

      <div className="admin-card">

        <div className="admin-card-header">

          <div>
            <h2>Classes</h2>

            <p>
              Assign subjects to each class.
            </p>
          </div>

          <ClassIcon />

        </div>

        {classes.length === 0 ? (
          <div className="admin-empty-state">

            <ClassIcon />

            <h3>No classes added</h3>

            <p>
              Click "Add Class" to create your first class.
            </p>

            <button
              type="button"
              onClick={() => setShowClassForm(true)}
            >
              Add Class
            </button>

          </div>
        ) : (
          <div className="admin-syllabus-table">

            {classes.map((item) => (
              <div
                className="admin-syllabus-row"
                key={item.id}
              >

                <div>

                  <strong>
                    {item.className}

                    {item.section
                      ? ` - Section ${item.section}`
                      : ""}
                  </strong>

                  <span>
                    {item.subjects?.length || 0} subjects assigned
                  </span>

                  {item.subjects?.length > 0 && (
                    <small>
                      {item.subjects
                        .map((subject) => subject.name)
                        .join(", ")}
                    </small>
                  )}

                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >

                  <button
                    type="button"
                    className="admin-secondary-button"
                    onClick={() =>
                      handleOpenAssignment(item)
                    }
                  >
                    <EditIcon />
                    Assign Subjects
                  </button>

                  <button
                    type="button"
                    className="admin-delete-button"
                    onClick={() =>
                      handleDeleteClass(item.id)
                    }
                    title="Delete class"
                  >
                    <DeleteIcon />
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* =========================
          SUBJECT ASSIGNMENT
          ========================= */}

      {selectedClass && (
        <div className="admin-card">

          <div className="admin-card-header">

            <div>

              <h2>
                Assign Subjects
              </h2>

              <p>
                Select subjects for{" "}
                <strong>
                  {selectedClass.className}

                  {selectedClass.section
                    ? ` - Section ${selectedClass.section}`
                    : ""}
                </strong>
              </p>

            </div>

            <MenuBookIcon />

          </div>

          {subjects.length === 0 ? (
            <div className="admin-empty-state">

              <MenuBookIcon />

              <h3>No subjects available</h3>

              <p>
                Add subjects first, then assign them to this class.
              </p>

            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "12px",
                marginTop: "20px",
              }}
            >

              {subjects.map((subject) => (
                <label
                  key={subject.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "14px",
                    border: "1px solid #e4e7ec",
                    borderRadius: "10px",
                    cursor: "pointer",
                    background: selectedSubjects.includes(
                      subject.id
                    )
                      ? "#f0fdf4"
                      : "#ffffff",
                  }}
                >

                  <input
                    type="checkbox"
                    checked={selectedSubjects.includes(
                      subject.id
                    )}
                    onChange={() =>
                      handleSubjectCheckbox(subject.id)
                    }
                  />

                  <span>
                    {subject.name}
                  </span>

                </label>
              ))}

            </div>
          )}

          {subjects.length > 0 && (
            <div className="admin-form-actions">

              <button
                type="button"
                className="admin-secondary-button"
                onClick={() => {
                  setSelectedClassId(null);
                  setSelectedSubjects([]);
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                className="admin-primary-button"
                onClick={handleSaveAssignments}
              >
                <CheckCircleIcon />
                Save Subjects
              </button>

            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default AdminClassManagement;