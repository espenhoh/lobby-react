import React from "react";

import styles from "./Sidenav.module.css";


const Sidenav = (props) => {
  if (props.isLoggedIn) {
    return (
      <div className={styles.sidenav}>
        <p>
          <span>Innlogget som:</span>
          <br />
          request.user
        </p>
        <a href="/lobby">Hjem</a>
        <a href="/lobby/lag_spill">Lag spill</a>
        <a href="/gomuku">Gomuku</a>
        <a href="/frontend">react test</a>
        <a href="/lobby/logged_out">Logg ut</a>
      </div>
    );
  } else {
    return (
      <div className={styles.sidenav}>
        <a href="/lobby/login">Logg inn</a>
        <a href="/lobby/register">Registrer</a>
      </div>
    );
  }
};

export default Sidenav;
