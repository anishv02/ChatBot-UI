import React from "react";
import { render, screen } from "@testing-library/react";
import FeedbackSection from "./FeedbacTracker";

test("renders feedback section with title, subtitle, and rows", () => {
  render(<FeedbackSection />);

  // Check for title and subtitle
  expect(screen.getByText(/User Feedback/i)).toBeInTheDocument();
  expect(
    screen.getByText(/Hear what our users have to say/i)
  ).toBeInTheDocument();

  // Check for feedback rows
  expect(screen.getByText(/Alice Johnson/i)).toBeInTheDocument();
  expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
  expect(screen.getByText(/Bob Smith/i)).toBeInTheDocument();
  expect(screen.getByText(/Data Scientist/i)).toBeInTheDocument();
});
