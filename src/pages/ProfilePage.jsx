import s from './ProfilePage.module.scss';
import React, {useEffect, useRef, useState} from "react";
import {profileService} from "../services/profileService";
import {validateEmail} from "../utils/validateEmail";
import {validatePassword} from "../utils/validatePassword";

export const ProfilePage = ({ user }) => {
  const [isNameInput, setIsNameInput] = useState(false);
  const [isEmailInput, setIsEmailInput] = useState(false);
  const [name, setName] = useState(user.name);
  const [newEmail, setNewEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [isPasswordInput, setIsPasswordInput] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const emailRef = useRef(null);

  const nameHandler = () => {
    setIsNameInput(true);
    if (!isNameInput) {
      setError(null);
    }
  }

  const emailHandler = () => {
    setIsEmailInput(true);
    if (!isEmailInput) {
      setError(null);
    }
  }

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  }

  const nameSubmitHandler = (event) => {
    event.preventDefault();

    setName(event.target.name.value);
    setIsNameInput(false);
    profileService.changeName({name, email: user.email }).catch((error) => {
      setError(error.message);
    })
  }

  const emailChangeHandler = (event) => {
    setNewEmail(event.target.value);
  }

  const emailSubmitHandler = (event) => {
    event.preventDefault();

    setPassword(event.target.password.value);
    setNewEmail(event.target.newEmail.value);
    setIsEmailInput(false);
    console.log({ oldEmail: user.email, newEmail, password });
    profileService.changeEmail({ oldEmail: user.email, newEmail, password }).catch((error) => {
      setError(error.response?.data?.message);
    })
  }

  const passwordSubmitHandler = (event) => {
    event.preventDefault();

    setIsPasswordInput(false);
    profileService.changePassword({ oldPassword, newPassword, confirmation, email: user.email }).catch((error) => {
      setError(error.response?.data?.message);
    })
  }

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  }

  const oldPasswordChangeHandler = (event) => {
    setOldPassword(event.target.value);
  }

  const newPasswordChangeHandler = (event) => {
    setNewPassword(event.target.value);
  }

  const confirmationChangeHandler = (event) => {
    setConfirmation(event.target.value);
  }

  const changePasswordClickHandler = () => {
    setIsPasswordInput(true);
  }

  useEffect(() => {
    if (isNameInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isNameInput])

  useEffect(() => {
    if (isEmailInput && emailRef.current) {
      emailRef.current.focus();
    }
  }, [isEmailInput])

  return (
    <div className={s.container}>
      <div className={s.avatar}/>
      <div onDoubleClick={nameHandler}>
        {isNameInput ?
          <form onSubmit={nameSubmitHandler} className={s.form}>
            <input
              name="name"
              onChange={nameChangeHandler}
              ref={inputRef}
              value={name}
              className={s.input}
            />
            <button type='submit'>Submit</button>
          </form> : <h1 className={s.title}>{name}</h1>}
      </div>
      <div onDoubleClick={emailHandler}>
        {isEmailInput ?
          <form onSubmit={emailSubmitHandler} className={s.form}>
            <input className={s.input} name="newEmail" onChange={emailChangeHandler} ref={emailRef} value={newEmail}/>
            <input className={s.input} name="password" onChange={passwordChangeHandler} value={password}
                   type="password"/>
            <button type='submit'>Submit</button>
          </form> : <p className={s.email}>{newEmail}</p>}
      </div>
      <div>
        {
          isPasswordInput ?
            <form className={s.form} onSubmit={passwordSubmitHandler}>
              <input type="password" className={s.input} name="oldPassword" onChange={oldPasswordChangeHandler} ref={emailRef} value={oldPassword}/>
              <input type="password" className={s.input} name="newPassword" onChange={newPasswordChangeHandler} ref={emailRef} value={newPassword}/>
              <input type="password" className={s.input} name="confirmation" onChange={confirmationChangeHandler} ref={emailRef} value={confirmation}/>
              <button type='submit'>Submit</button>
            </form> : <button onClick={changePasswordClickHandler}>Change password</button>
        }
      </div>
      {error && <p className="notification is-danger is-light">{error}</p>}
    </div>
  );
};
