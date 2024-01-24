import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import AsteroidInfo from "../AsteroidInfo";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockNav = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNav,
}));

describe("Asteroid Info testing", () => {
  beforeEach(() => {
    mockedAxios.get.mockReset;
  });
  test("fetches asteroid information and displays it", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        id: "123",
        name: "asteroid",
        nasas_jpl_url: "nasa.com",
        is_potentially_hazardous_asteroid: true,
      },
    });

    render(
      <MemoryRouter>
        <AsteroidInfo />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("name")).toBeInTheDocument;
      expect(screen.getByTestId("id")).toBeInTheDocument;
      expect(screen.getByTestId("url")).toBeInTheDocument;
    });
  });

  test("fetches asteroid information and displays it", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        id: "123",
        name: "asteroid",
        nasas_jpl_url: "nasa.com",
        is_potentially_hazardous_asteroid: false,
      },
    });

    render(
      <MemoryRouter>
        <AsteroidInfo />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("name")).toBeInTheDocument;
      expect(screen.getByTestId("id")).toBeInTheDocument;
      expect(screen.getByTestId("url")).toBeInTheDocument;
    });
  });

  test("failed result", async () => {
    mockedAxios.get.mockRejectedValue({
      error: "fail",
    });

    const mockAlert = jest.spyOn(window, "alert");
    mockAlert.mockImplementation(() => {});

    render(
      <MemoryRouter>
        <AsteroidInfo />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalled();
      mockAlert.mockRestore();
    });
  });

  test("handle home button", async () => {
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          id: "123",
          name: "asteroid",
          nasas_jpl_url: "nasa.com",
          is_potentially_haardous_asteroid: false,
        },
      ],
    });

    render(
      <MemoryRouter>
        <AsteroidInfo />
      </MemoryRouter>
    );
    await waitFor(() => {
      fireEvent.click(screen.getByTestId("home"));

      expect(mockNav).toHaveBeenCalled;
    });
  });
});
