import {profileClient} from "../http/profileClient";

export const changeName = (user) => {
  return profileClient.post('/profile/name', {name: user.name, email: user.email});
}

export const changeEmail = (user) => {
  return profileClient.post('/profile/email', {newEmail: user.newEmail, oldEmail: user.oldEmail, password: user.password});
}

export const profileService = { changeName, changeEmail };
