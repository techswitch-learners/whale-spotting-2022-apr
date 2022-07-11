import { render, screen } from "@testing-library/react";
import { LoginPage } from "../../components/login/LoginPage";

test("input fields of the form can be found", () => {
  render(<LoginPage />);
  const usernameField = screen.getByPlaceholderText(/username/i);
  const passwordField = screen.getByPlaceholderText(/password/i);
  const loginButton = screen.getByRole("button", { name: /log in/i });
  expect(usernameField).toBeInTheDocument();
  expect(passwordField).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});
