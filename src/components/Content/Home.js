import React, { useEffect, useContext, useState, useCallback } from "react";
import AuthContext from "../../context/auth-context";

//import styles from "./Home.module.css";

const Home = (props) => {
  const [urler, setUrler] = useState({spillere: "", groups: ""});

  const ctx = useContext(AuthContext);

  const testFetch = useCallback(() => {
    fetch('http://127.0.0.1:8000/lobby/'
    ).then(response => {
      return response.json();
    }).then(data => {
      console.log(data);
      setUrler(data);
    });
  }, []);
  
  useEffect(() => {
    document.title = "Lobby";
    testFetch()
  }, [testFetch]);



  return (
    <React.Fragment>
      <h1>Velkommen til brettspill!</h1>
      <h2>Api</h2>
      Spillere: {urler.spillere}
      <br/>
      Grupper: {urler.groups}
      <button onClick={ctx.onLogout}>Logg ut</button>
    </React.Fragment>
  );
};

export default Home;
