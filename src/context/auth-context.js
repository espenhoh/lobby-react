import React, {useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  logoutVisible: false,
  setLogoutVisible: () => {},
  onLogin: () => {},
  onLogout: (username, password) => {},
});

export const AuthContexProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);

  const loginHandler = (username, password) => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.setItem("isLoggedIn", "0");
    setIsLoggedIn(false);
    setLogoutVisible(true);
  };

  
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        logoutVisible: logoutVisible,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        setLogoutVisible: setLogoutVisible
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
