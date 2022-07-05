import React, { useContext } from "react";
import { LoginContext } from "../login/LoginManager";
import { Redirect } from "react-router-dom";
import { LoginForm } from "./LoginForm";

export const Login: React.FunctionComponent = () => {
  const loginContext = useContext(LoginContext);

  if (loginContext.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <h1>Login Form</h1>
      <LoginForm />
    </>
  );
};
