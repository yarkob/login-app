import s from "./ProfilePage.module.scss";
import React, {useState} from "react";
import {authService} from "../services/authService";

export const RequestChangePasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  }

  const submitHandler = (event) => {
    event.preventDefault();

    authService.requestChangePassword(event.target.email.value).then(() => setIsSuccessful(true)).catch((error) => {
      setError(error.response?.data?.message);
    });
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="email" style={{marginRight: '16px'}}>
          Email:{' '}
          <input className={s.input} name="email" onChange={emailChangeHandler} value={email}/>
        </label>
        <button type="submit">Submit</button>
      </form>
      {error && <p className="notification is-danger is-light">{error}</p>}
      {isSuccessful && <p>Check your email.</p>}
    </div>
  )
}
