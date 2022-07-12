import React, { createContext, useState } from "react";
import {
  authenticateLogin,
  AuthenticateLoginResponse,
} from "../../clients/internalApiClient";

type LoginContextType = {
  isLoggedIn: boolean;
  isAdmin: boolean;
  username: string;
  password: string;
  logIn: (
    username: string,
    password: string
  ) => Promise<AuthenticateLoginResponse>;
  logOut: () => void;
};

export const LoginContext = createContext<LoginContextType>({
  isLoggedIn: false,
  isAdmin: false,
  username: "",
  password: "",
  logIn: async (): Promise<AuthenticateLoginResponse> => {
    return { isResponseOk: false, message: "" };
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

  async function logIn(
    username: string,
    password: string
  ): Promise<AuthenticateLoginResponse> {
    const loginResponse = await authenticateLogin(username, password);
    if (loginResponse.isResponseOk) {
      setUsername(username);
      setPassword(password);
      setLoggedIn(true);
      setAdmin(true);
      return {
        isResponseOk: true,
        message: loginResponse.message,
      };
    } else {
      return {
        isResponseOk: false,
        message: loginResponse.message,
      };
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
