import { useState } from "react";
import "./TeachingResources.css";

function TeachingResources({ onBack }) {
  const [resources, setResources] = useState([
    {
      id: 1,
      className: "Class 8 - A",
      subject: "Mathematics",
      name: "Algebra PPT",
      type: "Presentation",
      fileName: "Algebra_Presentation.pptx",
      description:
        "PowerPoint presentation explaining variables and linear equations.",
    },
    {
      id: 2,
      className: "Class 8 - A",
      subject: "Science",
      name: "Force and Pressure Video",
      type: "Video",
      fileName: "Force_and_Pressure.mp4",
      description:
        "Educational video explaining force and pressure with examples.",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    className: "",
    subject: "",
    name: "",
    type: "",
    description: "",
    file: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      return;
    }

    setFormData((previousData) => ({
      ...previousData,
      file: selectedFile,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newResource = {
      id: Date.now(),
      className: formData.className,
      subject: formData.subject,
      name: formData.name,
      type: formData.type,
      fileName: formData.file ? formData.file.name : "",
      description: formData.description,
    };

    setResources((previousResources) => [
      ...previousResources,
      newResource,
    ]);

    setFormData({
      className: "",
      subject: "",
      name: "",
      type: "",
      description: "",
      file: null,
    });

    event.target.reset();

    setShowForm(false);
  };

  return (
    <div className="teaching-resources-page">
      <div className="teaching-resources-header">
        <div>
          <button className="back-button" onClick={onBack}>
            ← Back
          </button>

          <h1>Teaching Resources</h1>

          <p>
            Manage teaching materials and resources for your lessons
          </p>
        </div>

        <button
          className="add-resource-button"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Resource
        </button>
      </div>

      {showForm && (
        <div className="resource-form-card">
          <h2>Add Teaching Resource</h2>

          <form onSubmit={handleSubmit}>
            <div className="resource-form-grid">
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
                <label htmlFor="name">
                  Resource Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Example: Algebra PPT"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="type">
                  Resource Type
                </label>

                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select resource type
                  </option>

                  <option value="Presentation">
                    Presentation
                  </option>

                  <option value="Video">
                    Video
                  </option>

                  <option value="Document">
                    Document
                  </option>

                  <option value="Worksheet">
                    Worksheet
                  </option>

                  <option value="Textbook">
                    Textbook
                  </option>

                  <option value="Image">
                    Image
                  </option>

                  <option value="Audio">
                    Audio
                  </option>

                  <option value="Link">
                    Online Link
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              <div className="form-group full-width">
                <label htmlFor="resourceFile">
                  Upload Resource
                </label>

                <input
                  id="resourceFile"
                  name="resourceFile"
                  type="file"
                  accept=".ppt,.pptx,.pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.jpg,.jpeg,.png,.gif,.mp4,.webm,.mp3,.wav"
                  onChange={handleFileChange}
                  required
                />

                {formData.file && (
                  <small className="selected-file">
                    Selected file: {formData.file.name}
                  </small>
                )}

                <small className="file-help-text">
                  Supported: PPT, PPTX, PDF, Word, Excel, images,
                  videos, audio and other common teaching files.
                </small>
              </div>

              <div className="form-group full-width">
                <label htmlFor="description">
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  placeholder="Describe how this resource will be used in the lesson"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="resource-form-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={() => {
                  setShowForm(false);

                  setFormData({
                    className: "",
                    subject: "",
                    name: "",
                    type: "",
                    description: "",
                    file: null,
                  });
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-resource-button"
              >
                Save Resource
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="resources-list">
        {resources.map((resource) => (
          <div
            className="resource-card"
            key={resource.id}
          >
            <div className="resource-card-header">
              <div>
                <h2>{resource.name}</h2>

                <p>
                  {resource.className} • {resource.subject}
                </p>
              </div>

              <span className="resource-type">
                {resource.type}
              </span>
            </div>

            <div className="resource-file">
              <span className="file-icon">
                📎
              </span>

              <div>
                <strong>Resource File</strong>

                <p>
                  {resource.fileName || "No file uploaded"}
                </p>
              </div>
            </div>

            <div className="resource-description">
              <h3>Description</h3>

              <p>{resource.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeachingResources;