import React, { useEffect, useRef, useContext } from "react";
import AuthContext from "../../context/auth-context";
import Input from "../UI/Input";

//import styles from "./LoginContent.module.css";

const Login = (props) => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const ctx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(usernameRef.current.value.trim(), passwordRef.current.value.trim());
  };

  useEffect(() => {
    document.title = "Logg inn";
  }, []);

  return (
    <React.Fragment>
      <h1>Lag en brettspillkonto</h1>
      <form onSubmit={submitHandler} >
        <table>
          <tbody>
            <Input id="kallenavn" label="Kallenavn" type="text" ref={usernameRef} />
            <Input id="passord" label="Passord" type="password" ref={passwordRef}  />
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

export default Login;
