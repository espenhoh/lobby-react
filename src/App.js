import React, { useContext } from "react";
//import Login from "./components/Content/Login";
import Home from "./components/Content/Home";
import Sidenav from "./components/Sidenav/Sidenav";
import AuthContext from "./context/auth-context";

import "./index.css";
import Register from "./components/Content/Register";
import Logout from "./components/Content/Logout";

const App = () => {
  const ctx = useContext(AuthContext);

  return (
    <React.Fragment>
      {ctx.logoutVisible && <Logout setLogoutVisible={ctx.setLogoutVisible}/>}
      <Sidenav />
      <main>
        {ctx.isLoggedIn && <Home/>}
        {!ctx.isLoggedIn && <Register />}
      </main>
    </React.Fragment>
  );
};

export default App;
