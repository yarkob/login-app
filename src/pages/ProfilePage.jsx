import s from './ProfilePage.module.scss';

export const ProfilePage = ({ user }) => {
  if (!user) {
    return <h1>You have to be logged in to view your profile</h1>;
  }

  return (
    <div className={s.container}>
      <div className={s.avatar}/>
      <h1 className={s.title}>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};
