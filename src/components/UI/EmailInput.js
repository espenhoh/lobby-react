import React, { forwardRef, useReducer} from "react";

import Input from "../UI/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    const isValid = action.value.includes("@")
    return {
      value: action.value,
      isValid: isValid,
      error: isValid ? "" : 'inneholder ikke @',
    };
  }
  return { value: "", isValid: false, error: "",};
};


const EmailInput = forwardRef((props, ref) => {
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
    error: "",
  });

  const blurHandler = () => {
    props.onChange({
      email: emailState.value,
      emailIsValid: emailState.isValid,
    });
  }

  return (
    <Input
      ref={ref}
      id={props.id}
      label="E-post"
      type="email"
      onChange={(event) => {
          dispatchEmail({
            type: "USER_INPUT",
            value: event.target.value,
          });
      }}
      onBlur={blurHandler}
      isValid={emailState.isValid}
      value={emailState.value}
      error={props.error + " " + emailState.error}
    />
  );
});

export default EmailInput;
