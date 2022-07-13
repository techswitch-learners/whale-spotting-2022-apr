import { act, fireEvent, render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "../../components/login/LoginForm";
import { LoginContext } from "../../components/login/LoginManager";
import { Router } from "react-router-dom";
import { AuthenticateLoginResponse } from "../../clients/internalApiClient";

test("form submission sends the correct api request", async () => {
  const history = createMemoryHistory();
  const logIn = jest.fn(
    async (
      username: string,
      password: string
    ): Promise<AuthenticateLoginResponse> => {
      return { isResponseOk: true, message: "" };
    }
  );
  render(
    <LoginContext.Provider
      value={{
        isLoggedIn: false,
        isAdmin: false,
        username: "",
        password: "",
        logIn: logIn,
        logOut: () => {
          console.log();
        },
      }}
    >
      <Router history={history}>
        <LoginForm />
      </Router>
    </LoginContext.Provider>
  );

  const usernameField = screen.getByPlaceholderText(/username/i);
  const passwordField = screen.getByPlaceholderText(/password/i);
  userEvent.type(usernameField, "username");
  userEvent.type(passwordField, "password");

  act(() => {
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));
  });

  expect(logIn).toBeCalled();
  expect(logIn.mock.calls[0][0]).toBe("username");
  expect(logIn.mock.calls[0][1]).toBe("password");
});
