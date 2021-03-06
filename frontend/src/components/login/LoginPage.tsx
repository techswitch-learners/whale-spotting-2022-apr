import React, { useContext } from "react";
import { LoginContext } from "./LoginManager";
import { Redirect } from "react-router-dom";
import { LoginForm } from "./LoginForm";

export const LoginPage: React.FunctionComponent = () => {
  const loginContext = useContext(LoginContext);

  if (loginContext.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <LoginForm />
    </div>
  );
};
