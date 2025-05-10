import {profileClient} from "../http/profileClient";

const changeName = (user) => {
  return profileClient.post('/profile/name', {name: user.name, email: user.email});
}

const changeEmail = (user) => {
  return profileClient.post('/profile/email', {newEmail: user.newEmail, oldEmail: user.oldEmail, password: user.password});
}

const changePassword = (user) => {
  return profileClient.post('/profile/password', { newPassword: user.newPassword, oldPassword: user.oldPassword, confirmation: user.confirmation, email: user.email });
}

export const profileService = { changeName, changeEmail, changePassword };
