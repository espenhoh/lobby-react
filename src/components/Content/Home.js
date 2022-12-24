import React, { useEffect, useContext, useState, useCallback } from "react";
import AuthContext from "../../context/auth-context";

//import styles from "./Home.module.css";

const Home = (props) => {
  const [spillListe, setSpillListe] = useState([]);

  const ctx = useContext(AuthContext);

  const testFetch = useCallback(() => {
    fetch("http://127.0.0.1:8000/lobby/spill")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.count > 0) {
          setSpillListe(data.results);
        }
      });
  }, []);

  useEffect(() => {
    document.title = "Lobby";
    testFetch();
  }, [testFetch]);

  return (
    <React.Fragment>
      <h1>Velkommen til brettspill!</h1>
      <h2>Spilliste</h2>
      <table>
        <tr>
          <th>Navn</th>
          <th>Type</th>
          <th>Starttid</th>
          <th>Sluttid</th>
        </tr>
        {spillListe.map((spill) => (
          <tr>
            <td>{spill.spill_navn}</td>
            <td>{spill.spill_type}</td>
            <td>{spill.start_tid}</td>
            <td>{spill.slutt_tid}</td>
          </tr>
          ))}
      </table>
      <button onClick={ctx.onLogout}>Logg ut</button>
    </React.Fragment>
  );
};

export default Home;
