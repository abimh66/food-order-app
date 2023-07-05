import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isCharsFive = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [inputValidity, setInputValidity] = useState({
    name: true,
    street: true,
    postCode: true,
    city: true,
  });
  const nameRef = useRef();
  const streetRef = useRef();
  const postCodeRef = useRef();
  const cityRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredPostCode = postCodeRef.current.value;
    const enteredCity = cityRef.current.value;

    const enteredNameValid = !isEmpty(enteredName);
    const enteredStreetValid = !isEmpty(enteredStreet);
    const enteredCityValid = !isEmpty(enteredCity);
    const enteredPostCodeValid = isCharsFive(enteredPostCode);

    setInputValidity({
      name: enteredNameValid,
      street: enteredStreetValid,
      city: enteredCityValid,
      postCode: enteredPostCodeValid,
    });

    if (
      !enteredNameValid &&
      !enteredCityValid &&
      !enteredPostCodeValid &&
      !enteredStreetValid
    )
      return;

    // Submit
    props.onSubmitOrder({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostCode,
      city: enteredCity,
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div
        className={`${classes.control} ${
          !inputValidity.name ? classes.invalid : ''
        }`}>
        <label htmlFor="name">Name</label>
        <input ref={nameRef} id="name" type="text"></input>
        {!inputValidity.name && <p>Please enter name</p>}
      </div>
      <div
        className={`${classes.control} ${
          !inputValidity.street ? classes.invalid : ''
        }`}>
        <label htmlFor="street">Street</label>
        <input ref={streetRef} id="street" type="text"></input>
        {!inputValidity.street && <p>Please enter street</p>}
      </div>
      <div
        className={`${classes.control} ${
          !inputValidity.postCode ? classes.invalid : ''
        }`}>
        <label htmlFor="postal-code">Postal Code</label>
        <input ref={postCodeRef} id="postal-code" type="text"></input>
        {!inputValidity.postCode && <p>Please enter postal code</p>}
      </div>
      <div
        className={`${classes.control} ${
          !inputValidity.city ? classes.invalid : ''
        }`}>
        <label htmlFor="city">City</label>
        <input ref={cityRef} id="city" type="text"></input>
        {!inputValidity.city && <p>Please enter city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit" className={classes.submit}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default Checkout;
