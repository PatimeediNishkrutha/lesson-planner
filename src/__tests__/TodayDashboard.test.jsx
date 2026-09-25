import React from "react";
import { render, screen } from "@testing-library/react";
import TodayDashboard from "../components/TodayDashboard";
import { vi } from "vitest";

test("teacher can see HOD Approved status for an approved lesson", () => {
  const onBack = vi.fn();
  const onCompleteLesson = vi.fn();

  const today = new Date();

  const todayDate =
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const lessonPlans = [
    {
      id: 1,
      className: "Class 8 - A",
      subject: "Mathematics",
      date: todayDate,
      time: "09:00 AM - 09:45 AM",
      topic: "Algebra",
      objective: "Understand basic algebraic expressions",
      status: "Planned",
      approvalStatus: "Approved",
    },
  ];

  render(
    <TodayDashboard
      onBack={onBack}
      lessonPlans={lessonPlans}
      onCompleteLesson={onCompleteLesson}
    />
  );

  expect(
    screen.getByText("HOD: Approved")
  ).toBeInTheDocument();
});