import axios from "axios";
import React, { useEffect, useContext, useReducer, useRef } from "react";
import AuthContext from "../../context/auth-context";
import Button from "../UI/Button";
import Input from "../UI/Input";
import EmailInput from "../UI/EmailInput";
import UsernameInput from "../UI/UsernameInput";

const INPUT_IDS = {
  USERNAME: "regkallenavn",
  EMAIL: "regepost",
  PASS1: "pass1",
  PASS2: "pass2",
};

//import styles from "./LoginContent.module.css";



const validPass = (pass1, pass2) => {
  return pass1 === pass2 && pass1.length > 7;
};

const passwordReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      switch (action.id) {
        case INPUT_IDS.PASS1:
          return {
            pass1: action.value,
            pass2: state.pass2,
            isValid: validPass(action.value, state.pass2),
          };
        case INPUT_IDS.PASS2:
          return {
            pass1: state.pass1,
            pass2: action.value,
            isValid: validPass(action.value, state.pass1),
          };
        default:
          throw new Error(`${action.id} should not exist`);
      }
    case "INPUT_BLUR":
      return { ...state, isValid: validPass(state.pass1, state.pass2) };
    default:
      return {
        pass1: "",
        pass2: "",
        isValid: null,
      };
  }
};

const initalFormState = {
  username: "",
  usernameError: "",
  usernameIsValid: true,
  email: "",
  emailError: "",
  emailIsValid: true,
  pass1: "",
  pass2: "",
  passIsValid: true,
}

const Register = (props) => {
  const [formState, dispatchForm] = useReducer(
    (prevState, action) => ({...prevState, ...action}),
    initalFormState
  )
  
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    pass1: "",
    pass2: "",
    isValid: null,
  });

  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const ctx = useContext(AuthContext);


  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: "USER_INPUT",
      value: event.target.value,
      id: event.target.id,
    });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formState);
    if (!(
      formState.usernameIsValid
      && formState.emailIsValid
      && formState.passIsValid)) {
        return;
    }
    axios
      .post(
        "http://localhost:8000/lobby/register/",
        {
          username: formState.username,
          password: passwordState.pass1,
          password2: passwordState.pass2,
          email: formState.email,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response.data.username) {
          dispatchForm({
            usernameError: error.response.data.username,
            usernameIsValid: false,
          });
          usernameInputRef.current.focus();
        }

        if (error.response.data.email) {
          dispatchForm({
            emailError: error.response.data.email,
            emailIsValid: false,
          })
          emailInputRef.current.focus();
        }
      });
  };

  useEffect(() => {
    document.title = "Registrer deg nå";
    usernameInputRef.current.focus();
  }, []);

  return (
    <React.Fragment>
      <h1>Lag en brettspillkonto</h1>
      <form onSubmit={submitHandler} method="POST" className="form-group">
        <table>
          <tbody>
            <UsernameInput
              ref={usernameInputRef}
              id={INPUT_IDS.USERNAME}
              onChange={dispatchForm}
              error={formState.usernameError}
            />
            <EmailInput
              ref={emailInputRef}
              id={INPUT_IDS.EMAIL}
              onChange={dispatchForm}
              error={formState.emailError}
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
