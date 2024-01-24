import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import AsteroidSearch from "../AsteroidSearch";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockNav = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNav,
}));

describe("AsteroidSearch component", () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
  });

  test("Renders the component", () => {
    render(
      <MemoryRouter>
        <AsteroidSearch />
      </MemoryRouter>
    );

    expect(screen.getByText("Search Asteroids")).toBeInTheDocument;
    expect(screen.getByLabelText("Enter an asteroid Id")).toBeInTheDocument;
    expect(screen.getByText("Search")).toBeInTheDocument;
    expect(screen.getByText("Random Button")).toBeInTheDocument;
  });

  test("Handles asteroid search on right input", async () => {
    mockedAxios.get.mockResolvedValue({
      data: { near_earth_objects: [1, 2, 3] },
    });
    render(
      <MemoryRouter>
        <AsteroidSearch />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Enter an asteroid Id"), {
      target: { value: "2000433" },
    });
    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(mockNav).toHaveBeenCalledWith("/asteroid/2000433");
    });
  });

  test("handles asteroid search on wrong input", async () => {
    mockedAxios.get.mockRejectedValue({});

    const mockAlert = jest.spyOn(window, "alert");
    mockAlert.mockImplementation(() => {});

    render(
      <MemoryRouter>
        <AsteroidSearch />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Enter an asteroid Id"), {
      target: { value: "2000433" },
    });
    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalled();
      mockAlert.mockRestore();
    });
  });

  test("Handles random asteroid button", async () => {
    mockedAxios.get.mockResolvedValue({
      data: { near_earth_objects: [1, 2, 3] },
    });

    render(
      <MemoryRouter>
        <AsteroidSearch />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("random-btn"));
    await waitFor(() => {
      expect(mockNav).toHaveBeenCalled();
    });
  });

  test("Rejects the request when clicked random asteroid button", async () => {
    mockedAxios.get.mockRejectedValue({
      error: "error while getting random astroid",
    });

    render(
      <MemoryRouter>
        <AsteroidSearch />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("random-btn"));
  });
});
