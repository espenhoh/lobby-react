import React, { useState } from "react";
import Content from "./components/Content/Content";
import Sidenav from "./components/Sidenav/Sidenav";

import "./index.css";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (username, password) => {
    localStorage.setItem('isLoggedIn','1');
    setIsLoggedIn(true);
  }


  return (
    <React.Fragment>
      <Sidenav isLoggedIn={isLoggedIn}/>
      <Content />
    </React.Fragment>
  );
};

export default App;
