import React, { useContext } from "react";
import AuthContext from "../../context/auth-context";

import styles from "./Sidenav.module.css";

const Sidenav = () => {
  const ctx = useContext(AuthContext);

  return (
    <div className={styles.sidenav}>
      <ul>
        {ctx.isLoggedIn && (
          <React.Fragment>
            <li>
              <span>Innlogget som:</span>
              <br />
              request.user
            </li>
            <li>
              <a href="/lobby">Hjem</a>
            </li>
            <li>
              <a href="/lobby/lag_spill">Lag spill</a>
            </li>
            <li>
              <a href="/gomuku">Gomuku</a>
            </li>
            <li>
              <a href="/frontend">react test</a>
            </li>
            <li>
              <button onClick={ctx.onLogout}>Logg ut</button>
            </li>
          </React.Fragment>
        )}
        {!ctx.isLoggedIn && (
          <React.Fragment>
            <li>
              <a href="/lobby/register">Registrer deg</a>
            </li>
            <li>
              <a href="/lobby/register">Logg inn</a>
            </li>
          </React.Fragment>
        )}
      </ul>
    </div>
  );
};

export default Sidenav;
