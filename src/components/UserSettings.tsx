import * as React from 'react';
import { useAppDispatch } from '../hooks/redux-hooks'
import { useHistory } from "react-router-dom";
import { getAuth, updateProfile, updatePassword } from "firebase/auth";
import { setUser } from '../store/slices/userSlice';
import { Form, formType } from './Form';

export interface IUserSettingsProps {
}

export function UserSettings(props: IUserSettingsProps) {
  const dispatch = useAppDispatch();
  const { push } = useHistory();


  const handleUpdateUser = ({ password, name }: { password: string, name: string }): void => {
    let auth = getAuth();

    Promise.all(
      [
        updateProfile(auth.currentUser, {
          displayName: String(name), photoURL: ""
        }),
        password ? updatePassword(auth.currentUser, password) : null
      ]
    )
      .then(() => {
        auth = getAuth();
        dispatch(setUser({
          email: auth.currentUser.email,
          id: auth.currentUser.uid,
          token: auth.currentUser.getIdToken(),
          name: auth.currentUser.displayName
        }));
        push('/')
      })
      .catch((e) => alert('Invalid Update User'))

  }
  return (
    <Form title='update' handleClick={handleUpdateUser} type={formType.info} />
  );
}
