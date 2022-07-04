import React, { createContext, useState } from "react";
import { authenticateLogin } from "../../clients/internalApiClient";

type LoginContextType = {
  isLoggedIn: boolean;
  isAdmin: boolean;
  username: string;
  password: string;
  logIn: (username: string, password: string) => void;
  logOut: () => void;
};

export const LoginContext = createContext<LoginContextType>({
  isLoggedIn: false,
  isAdmin: false,
  username: "",
  password: "",
  logIn: () => {
    console.log();
  },
  logOut: () => {
    console.log();
  },
});

export const LoginManager: React.FunctionComponent = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [contextusername, setUsername] = useState("");
  const [contextPassword, setPassword] = useState("");
  const [Admin, setAdmin] = useState(false);

  function logIn(username: string, password: string) {
    authenticateLogin(username, password).then((didLogin) => {
      if (didLogin) {
        setUsername(username);
        setPassword(password);
        setLoggedIn(true);
        setAdmin(true);
      } else {
        console.log("User could not be authenticated.");
      }
    });
  }

  function logOut() {
    setLoggedIn(false);
    setUsername("");
    setPassword("");
    setAdmin(false);
  }

  const context = {
    isLoggedIn: loggedIn,
    isAdmin: Admin,
    username: contextusername,
    password: contextPassword,
    logIn: logIn,
    logOut: logOut,
  };

  return (
    <LoginContext.Provider value={context}>{children}</LoginContext.Provider>
  );
};
