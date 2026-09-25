
import { useEffect, useState } from "react";

import TodayDashboard from "./components/TodayDashboard";
import DashboardSidebar from "./components/DashboardSidebar";
import DashboardHeader from "./components/DashboardHeader";
import DashboardOverview from "./components/DashboardOverview";

import CreateLessonPlan from "./components/CreateLessonPlan";
import MyClasses from "./components/MyClasses";
import LessonCalendar from "./components/LessonCalendar";
import Syllabus from "./components/Syllabus";
import LearningObjectives from "./components/LearningObjectives";
import TeachingResources from "./components/TeachingResources";
import ActivitiesAssessments from "./components/ActivitiesAssessments";
import LessonReports from "./components/LessonReports";
import PlannerGrid from "./components/PlannerGrid";
import LessonHistory from "./components/LessonHistory";
import CompletionForm from "./components/CompletionForm";
import Timetable from "./components/Timetable";

import HODDashboard from "./HODDashboard";
import PrincipalDashboard from "./PrincipalDashboard";
import AdminDashboard from "./AdminDashboard";
import RoleSelector from "./RoleSelector";

import "./App.css";


/*
 * ============================================
 * ROLE PLACEHOLDER
 * ============================================
 */

function RolePlaceholder({ role, onBack }) {
  return (
    <div className="lesson-planner">

      <header className="planner-header">

        <div className="planner-header-content">

          <div>

            <h1>
              {role} Dashboard
            </h1>

            <p>
              {role} workspace will be available here.
            </p>

          </div>

        </div>

      </header>


      <main className="planner-content">

        <section className="today-section">

          <div className="today-card">

            <div className="today-content">

              <h2>
                {role} Dashboard
              </h2>

              <p>
                The {role} dashboard will contain
                role-specific features and reports.
              </p>

              <button
                type="button"
                className="today-link"
                onClick={onBack}
              >
                ← Back to Teacher Dashboard
              </button>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}


/*
 * ============================================
 * APP
 * ============================================
 */

function App() {

  /*
   * ============================================
   * CURRENT ROLE
   * ============================================
   */

  const [currentRole, setCurrentRole] =
    useState("Teacher");


  /*
   * ============================================
   * TEACHER SCREEN STATES
   * ============================================
   */

  const [showTodayDashboard, setShowTodayDashboard] =
    useState(false);

  const [showPlannerGrid, setShowPlannerGrid] =
    useState(false);

  const [showTimetable, setShowTimetable] =
    useState(false);

  const [showCreateLessonPlan, setShowCreateLessonPlan] =
    useState(false);

  const [showCompletionForm, setShowCompletionForm] =
    useState(false);

  const [selectedLessonData, setSelectedLessonData] =
    useState(null);

  const [plannerSelection, setPlannerSelection] =
    useState(null);

  const [showMyClasses, setShowMyClasses] =
    useState(false);

  const [showLessonCalendar, setShowLessonCalendar] =
    useState(false);

  const [showSyllabus, setShowSyllabus] =
    useState(false);

  const [showLearningObjectives, setShowLearningObjectives] =
    useState(false);

  const [showTeachingResources, setShowTeachingResources] =
    useState(false);

  const [showActivitiesAssessments, setShowActivitiesAssessments] =
    useState(false);

  const [showLessonReports, setShowLessonReports] =
    useState(false);

  const [showLessonHistory, setShowLessonHistory] =
    useState(false);


  /*
   * ============================================
   * TEACHER SIDEBAR
   * ============================================
   */

  const [activeSidebarItem, setActiveSidebarItem] =
    useState("Today");

  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);


  /*
   * ============================================
   * LESSON PLANS
   * ============================================
   */

  const [lessonPlans, setLessonPlans] = useState(() => {

    try {

      const savedLessonPlans =
        localStorage.getItem("lessonPlans");

      return savedLessonPlans
        ? JSON.parse(savedLessonPlans)
        : [];

    } catch (error) {

      console.error(
        "Error loading lesson plans:",
        error
      );

      return [];

    }

  });


  /*
   * ============================================
   * HOLIDAYS
   * ============================================
   */

  const [holidays, setHolidays] = useState(() => {

    try {

      const savedHolidays =
        localStorage.getItem(
          "lessonPlannerHolidays"
        );

      return savedHolidays
        ? JSON.parse(savedHolidays)
        : [];

    } catch (error) {

      console.error(
        "Error loading holidays:",
        error
      );

      return [];

    }

  });


  /*
   * ============================================
   * EXAM DATES
   * ============================================
   */

  const [examDates, setExamDates] = useState(() => {

    try {

      const savedExamDates =
        localStorage.getItem(
          "lessonPlannerExamDates"
        );

      return savedExamDates
        ? JSON.parse(savedExamDates)
        : [];

    } catch (error) {

      console.error(
        "Error loading exam dates:",
        error
      );

      return [];

    }

  });


  /*
   * ============================================
   * SAVE LESSON PLANS
   * ============================================
   */

  useEffect(() => {

    localStorage.setItem(
      "lessonPlans",
      JSON.stringify(lessonPlans)
    );

  }, [lessonPlans]);


  /*
   * ============================================
   * SAVE HOLIDAYS
   * ============================================
   */

  useEffect(() => {

    localStorage.setItem(
      "lessonPlannerHolidays",
      JSON.stringify(holidays)
    );

  }, [holidays]);


  /*
   * ============================================
   * SAVE EXAM DATES
   * ============================================
   */

  useEffect(() => {

    localStorage.setItem(
      "lessonPlannerExamDates",
      JSON.stringify(examDates)
    );

  }, [examDates]);


  /*
   * ============================================
   * DATE FORMATTER
   * ============================================
   */

  const formatLocalDate = (date) => {

    const year =
      date.getFullYear();

    const month =
      String(
        date.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        date.getDate()
      ).padStart(2, "0");

    return (
      year +
      "-" +
      month +
      "-" +
      day
    );

  };


  /*
   * ============================================
   * CHECK WEEKEND
   * ============================================
   */

  const isWeekend = (dateString) => {

    if (!dateString) {
      return false;
    }

    const date =
      new Date(
        dateString + "T00:00:00"
      );

    const day =
      date.getDay();

    return (
      day === 0 ||
      day === 6
    );

  };


  /*
   * ============================================
   * CHECK HOLIDAY
   * ============================================
   */

  const isHoliday = (dateString) => {

    if (!dateString) {
      return false;
    }

    return holidays.some((holiday) => {

      if (
        typeof holiday === "string"
      ) {

        return holiday === dateString;

      }

      if (
        holiday &&
        holiday.date
      ) {

        return holiday.date === dateString;

      }

      return false;

    });

  };


  /*
   * ============================================
   * CHECK EXAM DATE
   * ============================================
   */

  const isExamDate = (dateString) => {

    if (!dateString) {
      return false;
    }

    return examDates.some((exam) => {

      if (
        typeof exam === "string"
      ) {

        return exam === dateString;

      }

      if (
        exam &&
        exam.date
      ) {

        return exam.date === dateString;

      }

      return false;

    });

  };


  /*
   * ============================================
   * CHECK NON-WORKING DAY
   * ============================================
   */

  const isNonWorkingDay = (dateString) => {

    return (
      isWeekend(dateString) ||
      isHoliday(dateString) ||
      isExamDate(dateString)
    );

  };


  /*
   * ============================================
   * FIND NEXT WORKING DAY
   * ============================================
   */

  const getNextWorkingDay = (dateString) => {

    if (!dateString) {
      return dateString;
    }

    const nextDate =
      new Date(
        dateString + "T00:00:00"
      );

    while (true) {

      nextDate.setDate(
        nextDate.getDate() + 1
      );

      const nextDateString =
        formatLocalDate(
          nextDate
        );

      if (
        isWeekend(
          nextDateString
        )
      ) {
        continue;
      }

      if (
        isHoliday(
          nextDateString
        )
      ) {
        continue;
      }

      if (
        isExamDate(
          nextDateString
        )
      ) {
        continue;
      }

      return nextDateString;

    }

  };


  /*
   * ============================================
   * AUTOMATIC LESSON RESCHEDULING
   * ============================================
   */

  useEffect(() => {

    if (
      !lessonPlans ||
      lessonPlans.length === 0
    ) {
      return;
    }

    let lessonsChanged = false;

    const updatedLessons =
      lessonPlans.map((lesson) => {

        if (
          !lesson ||
          !lesson.date
        ) {
          return lesson;
        }

        if (
          lesson.status &&
          lesson.status !== "Planned"
        ) {
          return lesson;
        }

        if (
          !isNonWorkingDay(
            lesson.date
          )
        ) {
          return lesson;
        }

        const oldDate =
          lesson.date;

        const newDate =
          getNextWorkingDay(
            oldDate
          );

        if (
          !newDate ||
          newDate === oldDate
        ) {
          return lesson;
        }

        lessonsChanged = true;

        let rescheduleReason =
          "Weekend";

        if (
          isExamDate(
            oldDate
          )
        ) {

          rescheduleReason =
            "Exam";

        } else if (
          isHoliday(
            oldDate
          )
        ) {

          rescheduleReason =
            "Holiday";

        } else if (
          isWeekend(
            oldDate
          )
        ) {

          rescheduleReason =
            "Weekend";

        }

        return {

          ...lesson,

          date:
            newDate,

          rescheduledFrom:
            oldDate,

          rescheduledAutomatically:
            true,

          rescheduleReason:
            rescheduleReason,

          status:
            "Rescheduled",

        };

      });


    if (
      lessonsChanged
    ) {

      setLessonPlans(
        updatedLessons
      );

    }

  }, [
    holidays,
    examDates
  ]);


  /*
   * ============================================
   * ADD HOLIDAY
   * ============================================
   */

  const handleAddHoliday = (
    holidayData
  ) => {

    if (
      !holidayData ||
      !holidayData.date
    ) {

      console.error(
        "Holiday date is missing."
      );

      return;

    }

    setHolidays(
      (previousHolidays) => {

        const alreadyExists =
          previousHolidays.some(
            (holiday) => {

              if (
                typeof holiday === "string"
              ) {

                return (
                  holiday ===
                  holidayData.date
                );

              }

              return (
                holiday &&
                holiday.date ===
                holidayData.date
              );

            }
          );


        if (
          alreadyExists
        ) {

          return previousHolidays;

        }


        return [

          ...previousHolidays,

          holidayData,

        ];

      }
    );

  };


  /*
   * ============================================
   * ADD EXAM
   * ============================================
   */

  const handleAddExam = (
    examData
  ) => {

    if (
      !examData ||
      !examData.date
    ) {

      console.error(
        "Exam date is missing."
      );

      return;

    }


    setExamDates(
      (previousExamDates) => {

        const alreadyExists =
          previousExamDates.some(
            (exam) => {

              if (
                typeof exam === "string"
              ) {

                return (
                  exam ===
                  examData.date
                );

              }

              return (
                exam &&
                exam.date ===
                examData.date
              );

            }
          );


        if (
          alreadyExists
        ) {

          return previousExamDates;

        }


        return [

          ...previousExamDates,

          examData,

        ];

      }
    );

  };


  /*
   * ============================================
   * RESET SCREENS
   * ============================================
   */

  const resetScreens = () => {

    setShowTodayDashboard(false);

    setShowPlannerGrid(false);

    setShowTimetable(false);

    setShowCreateLessonPlan(false);

    setShowCompletionForm(false);

    setShowMyClasses(false);

    setShowLessonCalendar(false);

    setShowSyllabus(false);

    setShowLearningObjectives(false);

    setShowTeachingResources(false);

    setShowActivitiesAssessments(false);

    setShowLessonReports(false);

    setShowLessonHistory(false);

  };


  /*
   * ============================================
   * ROLE CHANGE
   * ============================================
   */

  const handleRoleChange = (
    role
  ) => {

    resetScreens();

    setSelectedLessonData(null);

    setActiveSidebarItem("Today");

    setCurrentRole(role);

  };


  /*
   * ============================================
   * DASHBOARD HOME
   * ============================================
   */

  const handleOpenDashboard = () => {

    resetScreens();

    setSelectedLessonData(null);

    setActiveSidebarItem("Today");

  };


  /*
   * ============================================
   * TODAY
   * ============================================
   */

  const handleOpenToday = () => {

    resetScreens();

    setSelectedLessonData(null);

    setActiveSidebarItem("Today");

    setShowTodayDashboard(true);

  };


  /*
   * ============================================
   * PLANNER
   * ============================================
   */

  const handleOpenPlanner = () => {

    resetScreens();

    setActiveSidebarItem("My Plans");

    setShowPlannerGrid(true);

  };


  /*
   * ============================================
   * TIMETABLE
   * ============================================
   */

  const handleOpenTimetable = () => {

    resetScreens();

    setSelectedLessonData(null);

    setActiveSidebarItem("Timetable");

    setShowTimetable(true);

  };


  /*
   * ============================================
   * CREATE LESSON
   * ============================================
   */

  const handleOpenCreateLesson = () => {

    resetScreens();

    setSelectedLessonData(null);

    setActiveSidebarItem("My Plans");

    setShowCreateLessonPlan(true);

  };


  /*
   * ============================================
   * CREATE LESSON FROM PLANNER
   * ============================================
   */

  const handleCreateLessonFromPlanner = (
    lessonData
  ) => {

    resetScreens();

    setSelectedLessonData(
      lessonData
    );

    setActiveSidebarItem("My Plans");

    setShowCreateLessonPlan(true);

  };


  /*
   * ============================================
   * SAVE LESSON
   * ============================================
   */

  const handleSaveLesson = (
    lessonData
  ) => {

    const newLesson = {

      ...lessonData,

      id: Date.now(),

      status: "Planned",

      approvalStatus: "Draft",

    };


    setLessonPlans(
      (previousLessons) => [

        ...previousLessons,

        newLesson,

      ]
    );


    setShowCreateLessonPlan(false);

    setSelectedLessonData(null);

    setActiveSidebarItem("My Plans");

    setShowPlannerGrid(true);

  };


  /*
   * ============================================
   * COMPLETE LESSON
   * ============================================
   */

  const handleCompleteLesson = (
    lesson
  ) => {

    resetScreens();

    setSelectedLessonData(
      lesson
    );

    setActiveSidebarItem(
      "Delivery"
    );

    setShowCompletionForm(
      true
    );

  };


  /*
   * ============================================
   * SAVE COMPLETION
   * ============================================
   */

  const handleSaveCompletion = (
    completionData
  ) => {

    if (
      !completionData?.id
    ) {

      console.error(
        "Cannot save completion: lesson ID is missing."
      );

      return;

    }


    setLessonPlans(
      (previousLessons) => {

        return previousLessons.map(
          (lesson) => {

            if (
              String(lesson.id) !==
              String(completionData.id)
            ) {

              return lesson;

            }


            return {

              ...lesson,

              status:
                completionData.status,

              coverage:
                completionData.coverage,

              homework:
                completionData.homework,

              remarks:
                completionData.remarks,

              completedAt:
                completionData.completedAt,

            };

          }
        );

      }
    );


    setShowCompletionForm(false);

    setSelectedLessonData(null);

    setActiveSidebarItem("Today");

    setShowTodayDashboard(true);

  };


  /*
   * ============================================
   * HISTORY
   * ============================================
   */

  const handleOpenHistory = () => {

    resetScreens();

    setActiveSidebarItem("History");

    setShowLessonHistory(true);

  };


  /*
   * ============================================
   * CALENDAR
   * ============================================
   */

  const handleOpenCalendar = () => {

    resetScreens();

    setActiveSidebarItem("Calendar");

    setShowLessonCalendar(true);

  };


  /*
   * ============================================
   * SYLLABUS
   * ============================================
   */

  const handleOpenSyllabus = () => {

    resetScreens();

    setActiveSidebarItem("Syllabus");

    setShowSyllabus(true);

  };


  /*
   * ============================================
   * SIDEBAR NAVIGATION
   * ============================================
   */

  const handleSidebarItemClick = (
    item
  ) => {

    switch (item) {

      case "Today":

        resetScreens();

        setSelectedLessonData(null);

        setActiveSidebarItem("Today");

        setShowTodayDashboard(true);

        break;


      case "Calendar":

        handleOpenCalendar();

        break;


      case "Timetable":

        handleOpenTimetable();

        break;


      case "My Plans":

        handleOpenPlanner();

        break;


      case "Syllabus":

        handleOpenSyllabus();

        break;


      case "Delivery":

        resetScreens();

        setActiveSidebarItem("Delivery");

        setShowTodayDashboard(true);

        break;


      case "History":

        handleOpenHistory();

        break;


      case "Reports":

        resetScreens();

        setActiveSidebarItem("Reports");

        setShowLessonReports(true);

        break;


      case "Homework":

        resetScreens();

        setActiveSidebarItem("Homework");

        setShowActivitiesAssessments(true);

        break;


      case "Lesson Library":

        resetScreens();

        setActiveSidebarItem("Lesson Library");

        setShowTeachingResources(true);

        break;


      default:

        handleOpenDashboard();

        break;

    }

  };


  /*
   * ============================================
   * HOD REVIEW LESSON
   * ============================================
   */

  const handleReviewLesson = (
    reviewData
  ) => {

    if (
      !reviewData ||
      !reviewData.id
    ) {

      console.error(
        "Cannot review lesson: lesson ID is missing."
      );

      return;

    }


    /*
     * IMPORTANT:
     *
     * HODDashboard sends:
     *
     * approvalStatus: "Approved"
     *
     * or
     *
     * approvalStatus: "Rejected"
     */

    const reviewStatus =
      reviewData.approvalStatus === "Approved"
        ? "Approved"
        : "Rejected";


    setLessonPlans(
      (previousLessons) => {

        return previousLessons.map(
          (lesson) => {

            if (
              String(lesson.id) !==
              String(reviewData.id)
            ) {

              return lesson;

            }


            return {

              ...lesson,

              approvalStatus:
                reviewStatus,

              reviewedAt:
                new Date().toISOString(),

              hodComment:
                reviewData.hodComment ||
                lesson.hodComment ||
                "",

            };

          }
        );

      }
    );


    console.log(
      "HOD lesson review saved:",
      {
        lessonId: reviewData.id,
        approvalStatus: reviewStatus,
      }
    );

  };


  /*
   * ============================================
   * HOD DASHBOARD
   * ============================================
   */

  if (
    currentRole === "HOD"
  ) {

    return (

      <HODDashboard

        lessonPlans={
          lessonPlans
        }

        examDates={
          examDates
        }

        holidays={
          holidays
        }

        onAddHoliday={
          handleAddHoliday
        }

        onAddExam={
          handleAddExam
        }

        onBack={() =>
          setCurrentRole(
            "Teacher"
          )
        }

        onReviewLesson={
          handleReviewLesson
        }

      />

    );

  }


  /*
   * ============================================
   * PRINCIPAL DASHBOARD
   * ============================================
   */

  if (
    currentRole === "Principal"
  ) {

    return (

      <PrincipalDashboard

        lessonPlans={
          lessonPlans
        }

        examDates={
          examDates
        }

        holidays={
          holidays
        }

        onAddHoliday={
          handleAddHoliday
        }

        onAddExam={
          handleAddExam
        }

        onBack={() =>
          setCurrentRole(
            "Teacher"
          )
        }

      />

    );

  }


  /*
   * ============================================
   * ADMIN DASHBOARD
   * ============================================
   */

  if (
    currentRole === "Admin"
  ) {

    return (

      <AdminDashboard

        lessonPlans={
          lessonPlans
        }

        examDates={
          examDates
        }

        holidays={
          holidays
        }

        onBack={() =>
          setCurrentRole(
            "Teacher"
          )
        }

      />

    );

  }


  /*
   * ============================================
   * TEACHER CONTENT
   * ============================================
   */

  const renderTeacherContent = () => {


    /*
     * COMPLETION FORM
     */

    if (
      showCompletionForm
    ) {

      return (

        <CompletionForm

          lesson={
            selectedLessonData
          }

          onBack={() => {

            setShowCompletionForm(false);

            setSelectedLessonData(null);

            setActiveSidebarItem("Today");

            setShowTodayDashboard(true);

          }}

          onComplete={
            handleSaveCompletion
          }

        />

      );

    }


    /*
     * CREATE LESSON PLAN
     */

    if (
      showCreateLessonPlan
    ) {

      return (

        <CreateLessonPlan

          initialData={
            selectedLessonData
          }

          onBack={() => {

            setShowCreateLessonPlan(false);

            setSelectedLessonData(null);

            setActiveSidebarItem("My Plans");

            setShowPlannerGrid(true);

          }}

          onSave={
            handleSaveLesson
          }

        />

      );

    }


    /*
     * TIMETABLE
     */

    if (
      showTimetable
    ) {

      return (

        <Timetable />

      );

    }


    /*
     * PLANNER GRID
     */

    if (
      showPlannerGrid
    ) {

      return (

        <PlannerGrid

          onBack={
            handleOpenDashboard
          }

          lessonPlans={
            lessonPlans
          }

          onCreateLesson={
            handleCreateLessonFromPlanner
          }

          initialSelection={
            plannerSelection
          }

          onSelectionChange={
            setPlannerSelection
          }

        />

      );

    }


    /*
     * TODAY DASHBOARD
     */

    if (
      showTodayDashboard
    ) {

      return (

        <TodayDashboard

          lessonPlans={
            lessonPlans
          }

          onBack={
            handleOpenDashboard
          }

          onCompleteLesson={
            handleCompleteLesson
          }

        />

      );

    }


    /*
     * LESSON HISTORY
     */

    if (
      showLessonHistory
    ) {

      return (

        <LessonHistory

          lessonPlans={
            lessonPlans
          }

          onBack={
            handleOpenDashboard
          }

          onCompleteLesson={
            handleCompleteLesson
          }

        />

      );

    }


    /*
     * MY CLASSES
     */

    if (
      showMyClasses
    ) {

      return (

        <MyClasses

          onBack={
            handleOpenDashboard
          }

        />

      );

    }


    /*
     * LESSON CALENDAR
     */

    if (
      showLessonCalendar
    ) {

      return (

        <LessonCalendar

          lessonPlans={
            lessonPlans
          }

          holidays={
            holidays
          }

          examDates={
            examDates
          }

          onBack={
            handleOpenDashboard
          }

        />

      );

    }


    /*
     * SYLLABUS
     */

    if (
      showSyllabus
    ) {

      return (

        <Syllabus

          onBack={
            handleOpenDashboard
          }

        />

      );

    }


    /*
     * LEARNING OBJECTIVES
     */

    if (
      showLearningObjectives
    ) {

      return (

        <LearningObjectives

          onBack={
            handleOpenDashboard
          }

        />

      );

    }


    /*
     * TEACHING RESOURCES
     */

    if (
      showTeachingResources
    ) {

      return (

        <TeachingResources

          onBack={
            handleOpenDashboard
          }

        />

      );

    }


    /*
     * ACTIVITIES & ASSESSMENTS
     */

    if (
      showActivitiesAssessments
    ) {

      return (

        <ActivitiesAssessments

          onBack={
            handleOpenDashboard
          }

          lessonPlans={
            lessonPlans
          }

        />

      );

    }


    /*
     * LESSON REPORTS
     */

    if (
      showLessonReports
    ) {

      return (

        <LessonReports

          lessonPlans={
            lessonPlans
          }

          onBack={
            handleOpenDashboard
          }

        />

      );

    }


    /*
     * DEFAULT DASHBOARD
     */

    return (

      <DashboardOverview

        lessonPlans={
          lessonPlans
        }

        onToday={
          handleOpenToday
        }

        onCreateLesson={
          handleOpenCreateLesson
        }

        onCalendar={
          handleOpenCalendar
        }

        onPlanner={
          handleOpenPlanner
        }

      />

    );

  };


  /*
   * ============================================
   * TEACHER DASHBOARD LAYOUT
   * ============================================
   */

  return (

    <div
      className={
        "teacher-dashboard-layout " +
        (
          sidebarCollapsed
            ? "sidebar-collapsed"
            : ""
        )
      }
    >

      {/* SIDEBAR */}

      <DashboardSidebar

        activeItem={
          activeSidebarItem
        }

        onItemClick={
          handleSidebarItemClick
        }

        collapsed={
          sidebarCollapsed
        }

        onToggle={() =>
          setSidebarCollapsed(
            (previous) =>
              !previous
          )
        }

      />


      {/* MAIN AREA */}

      <div className="teacher-dashboard-main">

        {/* HEADER */}

        <DashboardHeader

          currentRole={
            currentRole
          }

          onRoleChange={
            handleRoleChange
          }

        />


        {/* CONTENT */}

        <main className="teacher-dashboard-content">

          {
            renderTeacherContent()
          }

        </main>

      </div>

    </div>

  );

}


export default App;

