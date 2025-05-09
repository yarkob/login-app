import {profileClient} from "../http/profileClient";

export const changeName = (user) => {
  return profileClient.post('/profile', {name: user.name, email: user.email});
}

export const profileService = { changeName };
