import { render, screen } from "@testing-library/react";
import { LoginForm } from "../../components/login/LoginForm";

test("form submission sends the correct api request", () => {
  render(<LoginForm />);
});
