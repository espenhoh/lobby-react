import React, { useEffect, useContext } from "react";
import AuthContext from "../../context/auth-context";

//import styles from "./Home.module.css";

const Home = (props) => {
  const ctx = useContext(AuthContext);
  useEffect(() => {
    document.title = "Lobby";
  }, []);

  return (
    <React.Fragment>
      <h1>Velkommen til brettspill!</h1>
      <button onClick={ctx.onLogout}>Logg ut</button>
    </React.Fragment>
  );
};

export default Home;
