import React from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef((props, myRef) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={myRef} {...props.input} />
    </div>
  );
});

export default Input;
