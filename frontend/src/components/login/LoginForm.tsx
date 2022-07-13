import React, { FormEvent, useState, useContext } from "react";
import { LoginContext } from "../login/LoginManager";
import "./LoginForm.scss";

export const LoginForm: React.FunctionComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();
  const loginContext = useContext(LoginContext);

  function tryLogin(event: FormEvent) {
    event.preventDefault();
    loginContext.logIn(username, password).then((loginResponse) => {
      if (loginResponse.isResponseOk) {
        setError(undefined);
      } else {
        setError(loginResponse.message);
      }
    });
  }

  return (
    <div className="form-wrapper">
      <h1>Log In</h1>
      <form onSubmit={tryLogin}>
        <div className="form-floating mb-3">
          <input
            value={username}
            type="text"
            className="form-control"
            id="username"
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
            required
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="form-floating mb-3">
          <input
            value={password}
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit" className="btn btn-primary d-block w-100">
          Log In
        </button>
        {error && <p className="mt-2">{error}</p>}
      </form>
    </div>
  );
};
