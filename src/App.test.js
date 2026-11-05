import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AhnrosApp from "./AhnrosApp";
import { BuildPage, LeadPage } from "./AhnrosPages";

beforeAll(() => {
  if (!window.matchMedia) {
    window.matchMedia = (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    });
  }
  window.scrollTo = jest.fn();
});

test("renders Hannah hero and Ahnros brand", () => {
  render(<AhnrosApp />);
  expect(screen.getByRole("heading", { name: "HANNAH" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Ahnros/i })).toBeInTheDocument();
});

test("opens portfolio sharing dialog with the correct public URL", () => {
  render(<AhnrosApp />);
  fireEvent.click(screen.getAllByRole("button", { name: /Share Portfolio/i })[0]);
  expect(screen.getByRole("dialog", { name: /Share My Portfolio/i })).toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: /Portfolio link/i })).toHaveValue(
    "https://hontiveros-hannah-portfolio.vercel.app/"
  );
});

test("Build and Lead home cards point to separate pages", () => {
  render(<AhnrosApp />);
  expect(screen.getAllByRole("link", { name: /Build with Me/i })[0]).toHaveAttribute("href", "/build");
  expect(screen.getAllByRole("link", { name: /Lead with Me/i })[0]).toHaveAttribute("href", "/lead");
});

test("Build page includes projects and fellowships", () => {
  render(<MemoryRouter><BuildPage /></MemoryRouter>);
  expect(screen.getByRole("heading", { name: "ReceiptoChain" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Fellowships, Delegations/i })).toBeInTheDocument();
  expect(screen.getByText(/Hardware Education Ideathon/)).toBeInTheDocument();
});

test("Lead page includes leadership and quantum experiences", () => {
  render(<MemoryRouter><LeadPage /></MemoryRouter>);
  expect(screen.getByRole("heading", { name: "Tesseract MSU-IIT" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Quantum Computing Experience/i })).toBeInTheDocument();
});
