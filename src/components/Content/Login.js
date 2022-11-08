import React, { useEffect, useRef, useReducer, useContext } from "react";
import AuthContext from "../../context/auth-context";
import Input from "../UI/Input";

import { usernameReducer } from "./Register";

//import styles from "./LoginContent.module.css";

const passwordReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
          return {value: action.value, isValid: action.value.length>7};
    case "INPUT_BLUR":
      return {...state, isValid: state.value.length > 7};
    default:
      return {
        value: "",
        isValid: null,
      };
  }
};

const Login = (props) => {
  const [usernameState, dispatchUsername] = useReducer(usernameReducer, {
    value: "",
    isValid: null,
  });
  
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });


  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const ctx = useContext(AuthContext);

  const usernameChangeHandler = (event) => {
    dispatchUsername({ type: "USER_INPUT", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", value: event.target.value, id: event.target.id});
  };

  const validateUsernameHandler = () => {
    dispatchUsername({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(usernameState.value.trim(), passwordState.value.trim());
  };

  useEffect(() => {
    document.title = "Logg inn";
  }, []);

  return (
    <React.Fragment>
      <h1>Logg deg inn!</h1>
      <form onSubmit={submitHandler} >
        <table>
          <tbody>
          <Input
              ref={usernameInputRef}
              id="kallenavn"
              label="Kallenavn"
              type="text"
              value={usernameState.value}
              isValid={usernameState.isValid}
              onChange={usernameChangeHandler}
              onBlur={validateUsernameHandler}
            />
            <Input
              ref={passwordInputRef}
              id="passord"
              label="Passord"
              type="password"
              isValid={passwordState.isValid}
              value={passwordState.value}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
            {/* <Input id="passord" label="Passord" type="password" ref={passwordRef}  /> */}
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
