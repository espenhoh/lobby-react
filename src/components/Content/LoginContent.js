import React, { useState, useEffect, useRef } from "react";

import styles from "./LoginContent.module.css";

const LoginContent = (props) => {
  const kallenavnRef = useRef();

  useEffect(() => {
    document.title = "Logg inn";
  });

  return (
    <React.Fragment>
      <form method="post" className="">
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="kallenavn">Kallenavn</label>
              </td>
              <td>
                <input id="kallenavn" type="text" ref={kallenavnRef} />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="passord">Passord</label>
              </td>
              <td>
                <input type="password" />
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          Ikke registrert enda? Lag en spillkonto <a href="/register">her</a>.
        </p>
        <button type="submit" className="btn btn-success">
          Login
        </button>
      </form>
    </React.Fragment>
  );
};

export default LoginContent;
