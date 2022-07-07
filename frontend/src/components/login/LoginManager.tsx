import React, { createContext, useState } from "react";
import { authenticateLogin } from "../../clients/internalApiClient";

type LoginContextType = {
  isLoggedIn: boolean;
  isAdmin: boolean;
  username: string;
  password: string;
  logIn: (username: string, password: string) => Promise<boolean>;
  logOut: () => void;
};

export const LoginContext = createContext<LoginContextType>({
  isLoggedIn: false,
  isAdmin: false,
  username: "",
  password: "",
  logIn: async () => false,
  logOut: () => {
    console.log();
  },
});

export const LoginManager: React.FunctionComponent = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [contextusername, setUsername] = useState("");
  const [contextPassword, setPassword] = useState("");
  const [Admin, setAdmin] = useState(false);

  async function logIn(username: string, password: string): Promise<boolean> {
    const didLogin = await authenticateLogin(username, password);
    if (didLogin) {
      setUsername(username);
      setPassword(password);
      setLoggedIn(true);
      setAdmin(true);
      return true;
    } else {
      return false;
    }
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
