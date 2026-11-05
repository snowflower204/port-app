import { render, screen } from "@testing-library/react";
import AhnrosApp from "./AhnrosApp";

test("renders Hannah hero and Ahnros brand", () => {
  render(<AhnrosApp />);
  expect(screen.getByRole("heading", { name: "HANNAH" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Ahnros/i })).toBeInTheDocument();
});

test("opens portfolio sharing dialog", () => {
  render(<AhnrosApp />);
  screen.getAllByRole("button", { name: /Share Portfolio/i })[0].click();
  expect(screen.getByRole("dialog", { name: /Share My Portfolio/i })).toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: /Portfolio link/i })).toHaveValue("https://hontiveros-hannah-portfolio.vercel.app/");
});
