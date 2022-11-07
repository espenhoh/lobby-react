import React, { useEffect, useContext, useReducer, useRef } from "react";
import AuthContext from "../../context/auth-context";
import Button from "../UI/Button";
import Input from "../UI/Input";

//import styles from "./LoginContent.module.css";
const usernameIsValid = (username) => {
  const trimmedUsername = username.trim();
  const reUsername = /^[a-z0-9\s]*$/;
  return trimmedUsername.length > 6 && reUsername.test(trimmedUsername);
};

const usernameReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return { value: action.val.trim(), isValid: usernameIsValid(action.val) };
    case "INPUT_BLUR":
      return { value: state.value, isValid: usernameIsValid(action.val) };
    default:
      return { value: "", isValid: false };
  }
};

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
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
    value: "",
    isValid: null,
  });

  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const { isValid: usernameIsValid } = usernameState;
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  //const ctx = useContext(AuthContext);

  const usernameChangeHandler = (event) => {
    dispatchUsername({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
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
    /*ctx.onLogin(
      usernameRef.current.value.trim(),
      passwordRef.current.value.trim()
    );*/
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
              id="regkallenavn"
              label="Kallenavn"
              type="text"
              value={usernameState.value}
              isValid={usernameState.isValid}
              onChange={usernameChangeHandler}
              onBlur={validateUsernameHandler}
            />
            {/* <Input
              ref={emailInputRef}
              id="regepost"
              label="E-post"
              type="email"
              value={emailState.value}
              isValid={emailState.isValid}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
            />
            <Input
              ref={passwordInputRef}
              id="regpassord"
              label="Passord"
              type="password"
              isValid={passwordState.isValid}
              value={passwordState.value}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
            <Input
              ref={passwordInputRef}
              id="regpassord2"
              label="Gjenta passord"
              type="password"
              isValid={passwordState.isValid}
              value={passwordState.value}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            /> */}
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
