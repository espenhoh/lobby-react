import React, { forwardRef, useRef, useImperativeHandle } from "react";

import classes from "./Input.module.css";

const Input = forwardRef((props, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });

  return (
    <tr
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <td>
        <label htmlFor={props.id}>{props.label}</label>
      </td>
      <td>
        <input
          ref={inputRef}
          id={props.id}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      </td>
      {props.hasError &&
        <td>
          <p>{props.error}</p>
        </td>
      }
    </tr>
  );
});

export default Input;
