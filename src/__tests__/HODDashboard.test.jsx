import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HODDashboard from "../HODDashboard";
import { vi } from "vitest";

test("HOD can see the lesson plan created by the teacher", () => {
  const lessonPlans = [
    {
      id: 1,
      className: "Class 8 - A",
      subject: "Mathematics",
      date: "2026-09-25",
      time: "09:00 AM - 09:45 AM",
      topic: "Algebra",
      objective: "Understand basic algebraic expressions",
      status: "Planned",
      approvalStatus: "Draft",
    },
  ];

  render(
    <HODDashboard
      lessonPlans={lessonPlans}
      examDates={[]}
      holidays={[]}
      onAddHoliday={vi.fn()}
      onAddExam={vi.fn()}
      onBack={vi.fn()}
      onReviewLesson={vi.fn()}
    />
  );

  fireEvent.click(
    screen.getByRole("button", {
      name: /lesson plans/i,
    })
  );

  expect(
    screen.getByText("Algebra")
  ).toBeInTheDocument();

  expect(
    screen.getByText("Mathematics")
  ).toBeInTheDocument();

  expect(
    screen.getByText("Class 8 - A")
  ).toBeInTheDocument();

  expect(
    screen.getByText("Draft")
  ).toBeInTheDocument();
});