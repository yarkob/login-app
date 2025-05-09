import s from './ProfilePage.module.scss';
import React, {useEffect, useRef, useState} from "react";
import {profileService} from "../services/profileService";

export const ProfilePage = ({ user }) => {
  const [isInput, setIsInput] = useState(false);
  const [name, setName] = useState(user.name);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const nameHandler = () => {
    setIsInput((prev) => !prev);
  }

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  }

  const submitHandler = (event) => {
    event.preventDefault();

    setName(event.target.name.value);
    setIsInput(false);
    profileService.changeName({name, email: user.email}).catch((error) => {
      setError(error.message);
    })
  }

  useEffect(() => {
    if (isInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInput])

  return (
    <div className={s.container}>
      <div className={s.avatar}/>
      <div onDoubleClick={nameHandler}>
        {isInput ? <form onSubmit={submitHandler}><input name="name" onChange={nameChangeHandler} ref={inputRef} value={name} /></form> : <h1 className={s.title}>{name}</h1>}
      </div>
      {error && <p className="notification is-danger is-light">{error}</p>}
    </div>
  );
};
