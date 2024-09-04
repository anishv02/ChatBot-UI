import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import axios from "axios";
import FancyTable from "./FancyTable";

// Mock axios
jest.mock("axios");

describe("FancyTable Component", () => {
  const mockData = [
    {
      source: "embedded_Details",
      type: "Type 1",
      status: "Active",
      subject: "Subject 1",
      content: "Content 1",
      content_type: "Text",
      insert_time: "2024-08-28 10:00",
      inserted_by: "User A",
      last_updated_time: "2024-08-28 11:00",
      last_updated_by: "User A",
    },
    {
      source: "Data Source 1",
      type: "Type 1",
      status: "Active",
      subject: "Subject 1",
      content: "Content 1",
      content_type: "Text",
      insert_time: "2024-08-28 10:00",
      inserted_by: "User A",
      last_updated_time: "2024-08-28 11:00",
      last_updated_by: "User A",
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should display loading state initially", () => {
    axios.get.mockImplementation(() => new Promise(() => {}));
    render(<FancyTable />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display error message if API call fails", async () => {
    axios.get.mockRejectedValue(new Error("Failed to fetch"));
    render(<FancyTable />);
    await waitFor(() => {
      expect(screen.getByText("Error: Failed to fetch")).toBeInTheDocument();
    });
  });

  it("should render table data after API call", async () => {
    axios.get.mockResolvedValue({ data: mockData });
    render(<FancyTable />);
    await waitFor(() => {
      expect(screen.getByText("Embedding Documents")).toBeInTheDocument();
    });
    expect(screen.getByText("embedded_Details")).toBeInTheDocument();
    expect(screen.getByText("Data Source 1")).toBeInTheDocument();
  });

  it("should truncate text longer than 20 characters", async () => {
    const longTextData = [
      {
        ...mockData[0],
        source: "This is a very long text that should be truncated",
      },
    ];
    axios.get.mockResolvedValue({ data: longTextData });
    render(<FancyTable />);
    await waitFor(() => {
      expect(screen.getByText("This is a very long...")).toBeInTheDocument();
    });
  });

  it("should expand and collapse row when clicked", async () => {
    axios.get.mockResolvedValue({ data: mockData });
    render(<FancyTable />);
    await waitFor(() => {
      expect(screen.getByText("embedded_Details")).toBeInTheDocument();
    });
    const expandButton = screen.getAllByText("▶")[0];
    fireEvent.click(expandButton);
    expect(screen.getByText("This is the additional content that appears when expanded.")).toBeInTheDocument();
    fireEvent.click(screen.getAllByText("▼")[0]);
    expect(screen.queryByText("This is the additional content that appears when expanded.")).toBeNull();
  });
});
