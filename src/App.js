import React, { useContext } from "react";
import Login from "./components/Content/Login";
import Home from "./components/Content/Home";
import Sidenav from "./components/Sidenav/Sidenav";
import AuthContext from "./context/auth-context";

import "./index.css";
import Register from "./components/Content/Register";

const App = () => {
  const ctx = useContext(AuthContext);

  return (
    <React.Fragment>
      <Sidenav />
      <main>
        <Register /> 
         
        {ctx.isLoggedIn && <Home/>}
        {!ctx.isLoggedIn && <Login/>}
      </main>
    </React.Fragment>
  );
};

export default App;
