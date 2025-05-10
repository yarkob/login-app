import s from "./ProfilePage.module.scss";
import React, {useState} from "react";
import {authService} from "../services/authService";
import {Link} from "react-router-dom";

export const ChangePasswordPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  }

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const confirmPasswordChangeHandler = (event) => {
    setConfirmPassword(event.target.value);
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    authService.changePassword({ password, confirmPassword, email }).then(() => setIsSuccessful(true)).catch((error) => {
      setError(error.response?.data?.message);
    })
  }

  return (
    <div>
      <form className={s.form} style={{maxWidth: '420px'}} onSubmit={submitHandler}>
        <label htmlFor="email" style={{marginRight: '16px'}}>
          Email:{' '}
          <input className={s.input} name="email" onChange={emailChangeHandler} value={email}/>
        </label>
        <label htmlFor="password">
          Password:{' '}
          <input type="password" className={s.input} name="password" onChange={passwordChangeHandler} value={password}/>
        </label>
        <label htmlFor="confirmPassword">
          Confirm Password:{' '}
          <input type="password" className={s.input} name="confirmPassword" onChange={confirmPasswordChangeHandler}
                 value={confirmPassword}/>
        </label>
        <button type="submit">Submit</button>
      </form>
      {isSuccessful && <p>Password changed successfully. <Link to="../login">Login</Link></p>}
      {error && <p className="notification is-danger is-light">{error}</p>}
    </div>
  )
};
