import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CreateLessonPlan from "../components/CreateLessonPlan";
import { vi } from "vitest";

test("creates lesson plan with valid details", () => {
  const onSave = vi.fn();
  const onBack = vi.fn();

  render(
    <CreateLessonPlan
      onBack={onBack}
      onSave={onSave}
    />
  );

  fireEvent.change(screen.getByLabelText(/class \/ section/i), {
    target: {
      value: "Class 8 - A",
    },
  });

  fireEvent.change(screen.getByLabelText(/subject/i), {
    target: {
      value: "Mathematics",
    },
  });

  fireEvent.change(screen.getByLabelText(/date/i), {
    target: {
      value: "2026-09-25",
    },
  });

  fireEvent.change(screen.getByLabelText(/period \/ time/i), {
    target: {
      value: "09:00 AM - 09:45 AM",
    },
  });

  fireEvent.change(screen.getByLabelText(/topic/i), {
    target: {
      value: "Algebra",
    },
  });

  fireEvent.change(screen.getByLabelText(/learning objective/i), {
    target: {
      value: "Students will understand basic algebraic expressions.",
    },
  });

  fireEvent.change(screen.getByLabelText(/prerequisites/i), {
    target: {
      value: "Basic knowledge of numbers.",
    },
  });

  fireEvent.change(screen.getByLabelText(/teaching method/i), {
    target: {
      value: "Explanation and Discussion",
    },
  });

  fireEvent.change(screen.getByLabelText(/teaching resources/i), {
    target: {
      value: "Textbook and PPT",
    },
  });

  fireEvent.change(screen.getByLabelText(/homework/i), {
    target: {
      value: "Complete algebra exercises.",
    },
  });

  fireEvent.click(
    screen.getByRole("button", {
      name: /save lesson plan/i,
    })
  );

  expect(onSave).toHaveBeenCalledTimes(1);

  expect(onSave).toHaveBeenCalledWith({
    className: "Class 8 - A",
    subject: "Mathematics",
    date: "2026-09-25",
    time: "09:00 AM - 09:45 AM",
    day: "",
    periodId: "",
    topic: "Algebra",
    objective: "Students will understand basic algebraic expressions.",
    prerequisites: "Basic knowledge of numbers.",
    teachingMethod: "Explanation and Discussion",
    resources: "Textbook and PPT",
    homework: "Complete algebra exercises.",
  });
});