import axios from "axios";
import React, { useEffect, useContext, useReducer, useRef } from "react";
import AuthContext from "../../context/auth-context";
import Button from "../UI/Button";
import Input from "../UI/Input";

const INPUT_IDS = {
  USERNAME: "regkallenavn",
  EMAIL: "regepost",
  PASS1: "pass1",
  PASS2: "pass2",
};

//import styles from "./LoginContent.module.css";
 const usernameIsValid = (username) => {
  const trimmedUsername = username.trim();
  const reUsername = /^[a-z0-9]*$/;
  return trimmedUsername.length > 6 && reUsername.test(trimmedUsername);
};

export const usernameReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return { value: action.value.trim(), isValid: usernameIsValid(action.value) };
    case "INPUT_BLUR":
      return { value: state.value, isValid: usernameIsValid(state.value) };
    default:
      return { value: "", isValid: false };
  }
};

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const validPass = (pass1, pass2) => {
  return pass1 === pass2 && pass1.length >7;
};

const passwordReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      switch (action.id) {
        case INPUT_IDS.PASS1:
          return {pass1: action.value, pass2: state.pass2, isValid: validPass(action.value, state.pass2)};
        case INPUT_IDS.PASS2:
          return {pass1: state.pass1, pass2: action.value, isValid: validPass(action.value, state.pass1)};
        default:
          throw `${action.id} should not exist`;
      }
    case "INPUT_BLUR":
      return {...state, isValid: validPass(state.pass1, state.pass2)};
    default:
      return {
      pass1: "",
      pass2: "",
      isValid: null,
    };
  }
};

const Register = (props) => {
  const [usernameState, dispatchUsername] = useReducer(usernameReducer, {
    value: "",
    isValid: null,
  });
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    pass1: "",
    pass2: "",
    isValid: null,
  });

  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  //const ctx = useContext(AuthContext);

  const usernameChangeHandler = (event) => {
    dispatchUsername({ type: "USER_INPUT", value: event.target.value });
  };

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", value: event.target.value, id: event.target.id});
  };

  const validateUsernameHandler = () => {
    dispatchUsername({ type: "INPUT_BLUR" });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    axios
    .post('http://localhost:8000/lobby/register/',
      {
        username: usernameState.value,
        password: passwordState.pass1,
        password2: passwordState.pass2,
        email: emailState.value
      }
    )
    .then((response) => {
      document.title = response.data;
    });
  };

  useEffect(() => {
    document.title = "Registrer deg nå";
  }, []);


  return (
    <React.Fragment>
      <h1>Lag en brettspillkonto</h1>
      <form onSubmit={submitHandler} method="POST" className="form-group">
        <table>
          <tbody>
            <Input
              ref={usernameInputRef}
              id={INPUT_IDS.USERNAME}
              label="Kallenavn"
              type="text"
              value={usernameState.value}
              isValid={usernameState.isValid}
              onChange={usernameChangeHandler}
              onBlur={validateUsernameHandler}
            />
            <Input
              ref={emailInputRef}
              id={INPUT_IDS.EMAIL}
              label="E-post"
              type="email"
              value={emailState.value}
              isValid={emailState.isValid}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
            />
            <Input
              ref={passwordInputRef}
              id={INPUT_IDS.PASS1}
              label="Passord"
              type="password"
              isValid={passwordState.isValid}
              value={passwordState[INPUT_IDS.PASS1]}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
            <Input
              ref={passwordInputRef}
              id={INPUT_IDS.PASS2}
              label="Gjenta passord"
              type="password"
              isValid={passwordState.isValid}
              value={passwordState[INPUT_IDS.PASS2]}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
          </tbody>
        </table>

        <Button type="submit" className="reg-button" disabled={false}>
          Registrer
        </Button>
      </form>
    </React.Fragment>
  );
};

export default Register;
