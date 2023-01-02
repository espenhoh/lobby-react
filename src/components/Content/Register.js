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

const initalFormState = {
  username: "",
  usernameError: "",
  usernameIsValid: true,
  email: "",
  emailError: "",
  emailIsValid: true,
  pass1: "",
  pass2: "",
  passError: "",
  passIsValid: true,
}

const Register = (props) => {
  const [formState, dispatchForm] = useReducer(
    (prevState, action) => ({...prevState, ...action}),
    initalFormState
  )

  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const ctx = useContext(AuthContext);


  const passwordChangeHandler = (event) => {
    const id = event.target.id;
    switch (id) {
      case INPUT_IDS.PASS1:
        dispatchForm({
          pass1: event.target.value,
          isValid: validPass(event.target.value, formState.pass2),
        });
        break;
      case INPUT_IDS.PASS2:
        dispatchForm({
          pass2: event.target.value,
          isValid: validPass(event.target.value, formState.pass1),
        });
        break;
      default:
        throw new Error(`${id} should not exist`);
    }
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
          password: formState.pass1,
          password2: formState.pass2,
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
        console.log(error);
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

        if (error.response.data.password) {
          dispatchForm({
            passError: error.response.data.password,
            passIsValid: false,
          })
          passwordInputRef.current.focus();
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
              isValid={formState.passIsValid}
              value={formState.pass1}
              onChange={passwordChangeHandler}
              onBlur={() => {}}
              error={formState.passError}
            />
            <Input
              ref={passwordInputRef}
              id={INPUT_IDS.PASS2}
              label="Gjenta passord"
              type="password"
              isValid={formState.isValid}
              value={formState.pass2}
              onChange={passwordChangeHandler}
              onBlur={() => {}}
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
