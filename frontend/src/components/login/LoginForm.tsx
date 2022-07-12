import React, { FormEvent, useState, useContext } from "react";
import { LoginContext } from "../login/LoginManager";

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
    <div>
      {error && <p>{error}</p>}
      <h1>Log In</h1>
      <form onSubmit={tryLogin}>
        <label className="field">
          Username
          <input
            type={"text"}
            value={username}
            placeholder="Username"
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label className="field">
          Password
          <input
            type={"password"}
            value={password}
            placeholder="Password"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <button type="submit">Log In</button>
      </form>
    </div>
  );
};
