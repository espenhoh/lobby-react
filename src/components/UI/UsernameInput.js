import React, { forwardRef, useReducer } from "react";

import Input from "./Input";


const usernameIsValid = (username) => {
  const trimmedUsername = username.trim();
  const reUsername = /^[a-z0-9\u00E6\u00F8\u00E5]*$/;
  return trimmedUsername.length > 6 && reUsername.test(trimmedUsername);
};

export const usernameReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      const isValid = usernameIsValid(action.value)
      return {
        value: action.value.trim(),
        isValid: isValid,
        error: isValid ? "" : "Kallenavn må være bokstaver eller tall og lenger enn 6 tegn",
      };
    default:
      return { value: "", isValid: false, error: "" };
  }
};

const UsernameInput = forwardRef((props, ref) => {
  const [usernameState, dispatchUsername] = useReducer(usernameReducer, {
    value: "",
    isValid: null,
    error: "",
  });

  const blurHandler = () => {
    props.onChange({
      username: usernameState.value,
      usernameIsValid: usernameState.isValid,
    });
  };

  return (
    <Input
      ref={ref}
      id={props.id}
      label="Kallenavn"
      type="text"
      onChange={(event) => {
        dispatchUsername({
          type: "USER_INPUT",
          value: event.target.value,
        });
      }}
      onBlur={blurHandler}
      isValid={usernameState.isValid}
      value={usernameState.value}
      error={props.error + " " + usernameState.error}
    />
  );
});

export default UsernameInput;
