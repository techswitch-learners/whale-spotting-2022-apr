import React, { FormEvent, useState, useContext } from "react";
import { LoginContext } from "../login/LoginManager";

export const LoginForm: React.FunctionComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();
  const loginContext = useContext(LoginContext);

  function tryLogin(event: FormEvent) {
    event.preventDefault();
    loginContext.logIn(username, password).then((didLogin) => {
      if (didLogin) {
        setError(undefined);
      } else {
        setError("Login failed.");
      }
    });
  }

  return (
    <div>
      {error && <p>{error}</p>}
      <h1>Log In</h1>
      <form onSubmit={tryLogin}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit" className="btn btn-primary d-block w-100">
          Log In
        </button>
      </form>
    </div>
  );
};
