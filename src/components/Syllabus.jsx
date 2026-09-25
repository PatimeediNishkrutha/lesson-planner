import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./Syllabus.css";

const STORAGE_KEY = "qshikshak_syllabus";

const classOptions = [
  "Nursery",
  "LKG",
  "UKG",
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
];

const sectionOptions = [
  "A",
  "B",
  "C",
  "D",
];

const subjectOptions = [
  "Mathematics",
  "Science",
  "English",
  "Social Science",
  "Computer Science",
  "Hindi",
  "Telugu",
  "Physics",
  "Chemistry",
  "Biology",
  "Economics",
  "Accountancy",
  "Business Studies",
];

const boardOptions = [
  "CBSE",
  "SSC",
  "ICSE",
  "CISCE",
  "State Board",
  "IB",
  "IGCSE",
];

const academicYearOptions = [
  "2026-27",
  "2027-28",
  "2028-29",
  "2029-30",
];

function Syllabus() {
  /*
   * ----------------------------------------------------
   * BASIC FILTER STATE
   * ----------------------------------------------------
   */

  const [selectedClass, setSelectedClass] =
    useState("Class 10");

  const [selectedSection, setSelectedSection] =
    useState("A");

  const [selectedSubject, setSelectedSubject] =
    useState("Mathematics");

  const [academicYear, setAcademicYear] =
    useState("2026-27");

  const [board, setBoard] =
    useState("CBSE");

  /*
   * ----------------------------------------------------
   * ALL SYLLABUS DATA
   *
   * Data is stored separately according to:
   *
   * Board
   * Class
   * Section
   * Subject
   * Academic Year
   * ----------------------------------------------------
   */

  const [allSyllabus, setAllSyllabus] =
    useState(() => {
      try {
        const savedData =
          localStorage.getItem(STORAGE_KEY);

        if (!savedData) {
          return {};
        }

        return JSON.parse(savedData);
      } catch (error) {
        console.error(
          "Unable to load syllabus:",
          error
        );

        return {};
      }
    });

  /*
   * Current selected syllabus chapters
   */

  const [chapters, setChapters] =
    useState([]);

  /*
   * Expanded chapter
   */

  const [expandedChapter, setExpandedChapter] =
    useState(null);

  /*
   * Add chapter form
   */

  const [showAddChapter, setShowAddChapter] =
    useState(false);

  const [newChapter, setNewChapter] =
    useState("");

  const [newChapterTerm, setNewChapterTerm] =
    useState("Term 1");

  /*
   * Add topic form
   */

  const [showAddTopic, setShowAddTopic] =
    useState(null);

  const [newTopic, setNewTopic] =
    useState("");

  const [newSubtopics, setNewSubtopics] =
    useState("");

  const [newPeriods, setNewPeriods] =
    useState(1);

  /*
   * ----------------------------------------------------
   * CREATE UNIQUE SYLLABUS KEY
   * ----------------------------------------------------
   *
   * Example:
   *
   * CBSE___Class 10___A___Mathematics___2026-27
   *
   * SSC___Class 10___A___Mathematics___2026-27
   *
   * These are completely separate.
   */

  const getSyllabusKey = () => {
    return [
      board,
      selectedClass,
      selectedSection,
      selectedSubject,
      academicYear,
    ].join("___");
  };

  /*
   * ----------------------------------------------------
   * LOAD SELECTED SYLLABUS
   * ----------------------------------------------------
   */

  useEffect(() => {
    const key = getSyllabusKey();

    const savedChapters =
      allSyllabus[key] || [];

    setChapters(savedChapters);

    setExpandedChapter(null);
    setShowAddChapter(false);
    setShowAddTopic(null);

    setNewChapter("");
    setNewTopic("");
    setNewSubtopics("");
    setNewPeriods(1);
  }, [
    board,
    selectedClass,
    selectedSection,
    selectedSubject,
    academicYear,
  ]);

  /*
   * ----------------------------------------------------
   * SAVE SYLLABUS
   * ----------------------------------------------------
   */

  const saveSyllabus = (updatedChapters) => {
    const key = getSyllabusKey();

    setChapters(updatedChapters);

    setAllSyllabus((previousData) => {
      const updatedData = {
        ...previousData,
        [key]: updatedChapters,
      };

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedData)
      );

      return updatedData;
    });
  };

  /*
   * ----------------------------------------------------
   * FILTER HANDLERS
   * ----------------------------------------------------
   */

  const handleBoardChange = (event) => {
    setBoard(event.target.value);
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleAcademicYearChange = (event) => {
    setAcademicYear(event.target.value);
  };

  /*
   * ----------------------------------------------------
   * CHAPTER EXPAND / COLLAPSE
   * ----------------------------------------------------
   */

  const toggleChapter = (chapterId) => {
    setExpandedChapter((current) =>
      current === chapterId
        ? null
        : chapterId
    );
  };

  /*
   * ----------------------------------------------------
   * ADD CHAPTER
   * ----------------------------------------------------
   */

  const handleAddChapter = () => {
    const chapterName =
      newChapter.trim();

    if (!chapterName) {
      return;
    }

    const chapter = {
      id: Date.now(),
      name: chapterName,
      term: newChapterTerm,
      topics: [],
    };

    const updatedChapters = [
      ...chapters,
      chapter,
    ];

    saveSyllabus(updatedChapters);

    setNewChapter("");
    setNewChapterTerm("Term 1");
    setShowAddChapter(false);

    setExpandedChapter(chapter.id);
  };

  /*
   * ----------------------------------------------------
   * EDIT CHAPTER NAME
   * ----------------------------------------------------
   */

  const updateChapterName = (
    chapterId,
    value
  ) => {
    const updatedChapters =
      chapters.map((chapter) =>
        chapter.id === chapterId
          ? {
              ...chapter,
              name: value,
            }
          : chapter
      );

    saveSyllabus(updatedChapters);
  };

  /*
   * ----------------------------------------------------
   * EDIT CHAPTER TERM
   * ----------------------------------------------------
   */

  const updateChapterTerm = (
    chapterId,
    value
  ) => {
    const updatedChapters =
      chapters.map((chapter) =>
        chapter.id === chapterId
          ? {
              ...chapter,
              term: value,
            }
          : chapter
      );

    saveSyllabus(updatedChapters);
  };

  /*
   * ----------------------------------------------------
   * DELETE CHAPTER
   * ----------------------------------------------------
   */

  const deleteChapter = (chapterId) => {
    const updatedChapters =
      chapters.filter(
        (chapter) =>
          chapter.id !== chapterId
      );

    saveSyllabus(updatedChapters);

    if (expandedChapter === chapterId) {
      setExpandedChapter(null);
    }
  };

  /*
   * ----------------------------------------------------
   * OPEN ADD TOPIC
   * ----------------------------------------------------
   */

  const openAddTopic = (chapterId) => {
    setShowAddTopic(chapterId);

    setNewTopic("");
    setNewSubtopics("");
    setNewPeriods(1);
  };

  /*
   * ----------------------------------------------------
   * ADD TOPIC
   * ----------------------------------------------------
   */

  const handleAddTopic = (chapterId) => {
    const topicName =
      newTopic.trim();

    if (!topicName) {
      return;
    }

    const periods =
      Number(newPeriods);

    const topic = {
      id: Date.now(),
      name: topicName,
      subtopics:
        newSubtopics.trim(),
      periods:
        Number.isFinite(periods) &&
        periods > 0
          ? periods
          : 1,
    };

    const updatedChapters =
      chapters.map((chapter) => {
        if (chapter.id !== chapterId) {
          return chapter;
        }

        return {
          ...chapter,
          topics: [
            ...chapter.topics,
            topic,
          ],
        };
      });

    saveSyllabus(updatedChapters);

    setNewTopic("");
    setNewSubtopics("");
    setNewPeriods(1);
    setShowAddTopic(null);
  };

  /*
   * ----------------------------------------------------
   * EDIT TOPIC NAME
   * ----------------------------------------------------
   */

  const updateTopicName = (
    chapterId,
    topicId,
    value
  ) => {
    const updatedChapters =
      chapters.map((chapter) => {
        if (chapter.id !== chapterId) {
          return chapter;
        }

        return {
          ...chapter,
          topics: chapter.topics.map(
            (topic) =>
              topic.id === topicId
                ? {
                    ...topic,
                    name: value,
                  }
                : topic
          ),
        };
      });

    saveSyllabus(updatedChapters);
  };

  /*
   * ----------------------------------------------------
   * EDIT SUBTOPICS
   * ----------------------------------------------------
   */

  const updateTopicSubtopics = (
    chapterId,
    topicId,
    value
  ) => {
    const updatedChapters =
      chapters.map((chapter) => {
        if (chapter.id !== chapterId) {
          return chapter;
        }

        return {
          ...chapter,
          topics: chapter.topics.map(
            (topic) =>
              topic.id === topicId
                ? {
                    ...topic,
                    subtopics: value,
                  }
                : topic
          ),
        };
      });

    saveSyllabus(updatedChapters);
  };

  /*
   * ----------------------------------------------------
   * EDIT PERIODS
   * ----------------------------------------------------
   */

  const updateTopicPeriods = (
    chapterId,
    topicId,
    value
  ) => {
    const periods = Math.max(
      1,
      Number(value) || 1
    );

    const updatedChapters =
      chapters.map((chapter) => {
        if (chapter.id !== chapterId) {
          return chapter;
        }

        return {
          ...chapter,
          topics: chapter.topics.map(
            (topic) =>
              topic.id === topicId
                ? {
                    ...topic,
                    periods,
                  }
                : topic
          ),
        };
      });

    saveSyllabus(updatedChapters);
  };

  /*
   * ----------------------------------------------------
   * DELETE TOPIC
   * ----------------------------------------------------
   */

  const deleteTopic = (
    chapterId,
    topicId
  ) => {
    const updatedChapters =
      chapters.map((chapter) => {
        if (chapter.id !== chapterId) {
          return chapter;
        }

        return {
          ...chapter,
          topics: chapter.topics.filter(
            (topic) =>
              topic.id !== topicId
          ),
        };
      });

    saveSyllabus(updatedChapters);
  };

  /*
   * ----------------------------------------------------
   * DYNAMIC SUMMARY
   * ----------------------------------------------------
   */

  const totalTopics =
    chapters.reduce(
      (total, chapter) =>
        total + chapter.topics.length,
      0
    );

  const totalPeriods =
    chapters.reduce(
      (total, chapter) =>
        total +
        chapter.topics.reduce(
          (sum, topic) =>
            sum +
            Number(topic.periods || 0),
          0
        ),
      0
    );

  /*
   * ----------------------------------------------------
   * RENDER
   * ----------------------------------------------------
   */

  return (
    <div className="syllabus-page">

      {/* ==========================================
          TOP HEADER
      ========================================== */}

      <div className="syllabus-topbar">

        <div>
          <h1>Syllabus</h1>

          <p>
            Manage chapters, topics and
            periods
          </p>
        </div>

        <button
          type="button"
          className="add-chapter-button"
          onClick={() =>
            setShowAddChapter(true)
          }
        >
          <AddIcon />
          Add chapter
        </button>

      </div>

      {/* ==========================================
          FILTER BAR
      ========================================== */}

      <div className="syllabus-filters">

        {/* BOARD */}

        <div className="syllabus-filter-group">

          <label>
            Board
          </label>

          <select
            value={board}
            onChange={handleBoardChange}
          >
            {boardOptions.map(
              (boardName) => (
                <option
                  key={boardName}
                  value={boardName}
                >
                  {boardName}
                </option>
              )
            )}
          </select>

        </div>

        {/* CLASS */}

        <div className="syllabus-filter-group">

          <label>
            Class
          </label>

          <select
            value={selectedClass}
            onChange={handleClassChange}
          >
            {classOptions.map(
              (className) => (
                <option
                  key={className}
                  value={className}
                >
                  {className}
                </option>
              )
            )}
          </select>

        </div>

        {/* SECTION */}

        <div className="syllabus-filter-group">

          <label>
            Section
          </label>

          <select
            value={selectedSection}
            onChange={handleSectionChange}
          >
            {sectionOptions.map(
              (section) => (
                <option
                  key={section}
                  value={section}
                >
                  {section}
                </option>
              )
            )}
          </select>

        </div>

        {/* SUBJECT */}

        <div className="syllabus-filter-group">

          <label>
            Subject
          </label>

          <select
            value={selectedSubject}
            onChange={handleSubjectChange}
          >
            {subjectOptions.map(
              (subject) => (
                <option
                  key={subject}
                  value={subject}
                >
                  {subject}
                </option>
              )
            )}
          </select>

        </div>

        {/* ACADEMIC YEAR */}

        <div className="syllabus-filter-group">

          <label>
            Academic Year
          </label>

          <select
            value={academicYear}
            onChange={
              handleAcademicYearChange
            }
          >
            {academicYearOptions.map(
              (year) => (
                <option
                  key={year}
                  value={year}
                >
                  {year}
                </option>
              )
            )}
          </select>

        </div>

      </div>

      {/* ==========================================
          SUMMARY
      ========================================== */}

      <div className="syllabus-summary">

        <div>
          <strong>
            {chapters.length}
          </strong>

          <span>
            Chapters
          </span>
        </div>

        <div>
          <strong>
            {totalTopics}
          </strong>

          <span>
            Topics
          </span>
        </div>

        <div>
          <strong>
            {totalPeriods}
          </strong>

          <span>
            Periods
          </span>
        </div>

        <div>
          <strong>
            {selectedClass}
          </strong>

          <span>
            Section {selectedSection}
          </span>
        </div>

      </div>

      {/* ==========================================
          SYLLABUS MAIN CARD
      ========================================== */}

      <div className="syllabus-card">

        {/* CARD HEADER */}

        <div className="syllabus-card-header">

          <div>

            <h2>
              {selectedSubject}
            </h2>

            <span>
              {board}
              {" • "}
              {selectedClass}
              {" • "}
              Section {selectedSection}
              {" • "}
              {academicYear}
            </span>

          </div>

          <span className="curriculum-badge">
            {board}
          </span>

        </div>

        {/* ========================================
            COLUMN HEADERS
        ======================================== */}

        <div className="chapter-column-header">

          <span>
            Chapter
          </span>

          <span>
            Term
          </span>

          <span>
            Topics
          </span>

          <span></span>

        </div>

        {/* ========================================
            EMPTY STATE
        ======================================== */}

        {chapters.length === 0 && (
          <div className="syllabus-empty">

            <div className="syllabus-empty-icon">
              <AddIcon />
            </div>

            <h3>
              No chapters added yet
            </h3>

            <p>
              Add chapters and topics
              for this syllabus.
            </p>

            <button
              type="button"
              className="empty-add-button"
              onClick={() =>
                setShowAddChapter(true)
              }
            >
              <AddIcon />
              Add chapter
            </button>

          </div>
        )}

        {/* ========================================
            CHAPTER LIST
        ======================================== */}

        <div className="chapter-list">

          {chapters.map(
            (chapter, index) => {

              const isExpanded =
                expandedChapter ===
                chapter.id;

              return (
                <div
                  className={`chapter-block ${
                    isExpanded
                      ? "expanded"
                      : ""
                  }`}
                  key={chapter.id}
                >

                  {/* =================================
                      CHAPTER ROW
                  ================================= */}

                  <div className="chapter-row">

                    {/* EXPAND BUTTON */}

                    <button
                      type="button"
                      className="chapter-expand-button"
                      onClick={() =>
                        toggleChapter(
                          chapter.id
                        )
                      }
                      aria-label={
                        isExpanded
                          ? "Collapse chapter"
                          : "Expand chapter"
                      }
                    >
                      {isExpanded ? (
                        <ExpandMoreIcon />
                      ) : (
                        <ChevronRightIcon />
                      )}
                    </button>

                    {/* CHAPTER NUMBER */}

                    <div className="chapter-number">
                      {index + 1}
                    </div>

                    {/* CHAPTER NAME */}

                    <input
                      className="chapter-name-input"
                      value={chapter.name}
                      onChange={(event) =>
                        updateChapterName(
                          chapter.id,
                          event.target.value
                        )
                      }
                    />

                    {/* TERM */}

                    <select
                      className="chapter-term-select"
                      value={chapter.term}
                      onChange={(event) =>
                        updateChapterTerm(
                          chapter.id,
                          event.target.value
                        )
                      }
                    >
                      <option value="Term 1">
                        Term 1
                      </option>

                      <option value="Term 2">
                        Term 2
                      </option>
                    </select>

                    {/* TOPIC COUNT */}

                    <span className="topic-count">
                      {chapter.topics.length}{" "}
                      {chapter.topics.length === 1
                        ? "topic"
                        : "topics"}
                    </span>

                    {/* DELETE */}

                    <button
                      type="button"
                      className="delete-chapter-button"
                      onClick={() =>
                        deleteChapter(
                          chapter.id
                        )
                      }
                      aria-label="Delete chapter"
                    >
                      <DeleteIcon />
                    </button>

                  </div>

                  {/* =================================
                      EXPANDED CHAPTER
                  ================================= */}

                  {isExpanded && (
                    <div className="chapter-topics">

                      {/* TOPIC HEADER */}

                      <div className="topic-header">

                        <span>
                          Topic
                        </span>

                        <span>
                          Subtopics
                        </span>

                        <span>
                          Periods
                        </span>

                        <span></span>

                      </div>

                      {/* =================================
                          EXISTING TOPICS
                      ================================= */}

                      {chapter.topics.map(
                        (topic) => (
                          <div
                            className="topic-row"
                            key={topic.id}
                          >

                            {/* TOPIC */}

                            <input
                              className="topic-name-input"
                              value={topic.name}
                              onChange={(
                                event
                              ) =>
                                updateTopicName(
                                  chapter.id,
                                  topic.id,
                                  event.target
                                    .value
                                )
                              }
                            />

                            {/* SUBTOPICS */}

                            <input
                              className="topic-subtopic-input"
                              value={
                                topic.subtopics
                              }
                              placeholder="Add subtopics"
                              onChange={(
                                event
                              ) =>
                                updateTopicSubtopics(
                                  chapter.id,
                                  topic.id,
                                  event.target
                                    .value
                                )
                              }
                            />

                            {/* PERIODS */}

                            <input
                              type="number"
                              min="1"
                              className="topic-period-input"
                              value={
                                topic.periods
                              }
                              onChange={(
                                event
                              ) =>
                                updateTopicPeriods(
                                  chapter.id,
                                  topic.id,
                                  event.target
                                    .value
                                )
                              }
                            />

                            {/* DELETE */}

                            <button
                              type="button"
                              className="delete-topic-button"
                              onClick={() =>
                                deleteTopic(
                                  chapter.id,
                                  topic.id
                                )
                              }
                              aria-label="Delete topic"
                            >
                              <DeleteIcon />
                            </button>

                          </div>
                        )
                      )}

                      {/* =================================
                          ADD TOPIC FORM
                      ================================= */}

                      {showAddTopic ===
                      chapter.id ? (
                        <div className="add-topic-form">

                          <input
                            autoFocus
                            value={newTopic}
                            onChange={(event) =>
                              setNewTopic(
                                event.target.value
                              )
                            }
                            placeholder="Topic name"
                          />

                          <input
                            value={newSubtopics}
                            onChange={(event) =>
                              setNewSubtopics(
                                event.target.value
                              )
                            }
                            placeholder="Subtopics"
                          />

                          <input
                            type="number"
                            min="1"
                            value={newPeriods}
                            onChange={(event) =>
                              setNewPeriods(
                                event.target.value
                              )
                            }
                            placeholder="Periods"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              handleAddTopic(
                                chapter.id
                              )
                            }
                          >
                            Add
                          </button>

                          <button
                            type="button"
                            className="cancel-topic-button"
                            onClick={() => {
                              setShowAddTopic(
                                null
                              );

                              setNewTopic("");

                              setNewSubtopics("");

                              setNewPeriods(1);
                            }}
                          >
                            Cancel
                          </button>

                        </div>
                      ) : (
                        <button
                          type="button"
                          className="add-topic-button"
                          onClick={() =>
                            openAddTopic(
                              chapter.id
                            )
                          }
                        >
                          <AddIcon />
                          Add topic
                        </button>
                      )}

                    </div>
                  )}

                </div>
              );
            }
          )}

        </div>

        {/* ==========================================
            ADD CHAPTER FORM
        ========================================== */}

        {showAddChapter && (
          <div className="add-chapter-form">

            <input
              autoFocus
              value={newChapter}
              onChange={(event) =>
                setNewChapter(
                  event.target.value
                )
              }
              placeholder="Enter chapter name"
            />

            <select
              value={newChapterTerm}
              onChange={(event) =>
                setNewChapterTerm(
                  event.target.value
                )
              }
            >
              <option value="Term 1">
                Term 1
              </option>

              <option value="Term 2">
                Term 2
              </option>
            </select>

            <button
              type="button"
              onClick={handleAddChapter}
            >
              Add chapter
            </button>

            <button
              type="button"
              className="cancel-chapter-button"
              onClick={() => {
                setNewChapter("");
                setNewChapterTerm("Term 1");
                setShowAddChapter(false);
              }}
            >
              Cancel
            </button>

          </div>
        )}

      </div>

    </div>
  );
}

export default Syllabus;