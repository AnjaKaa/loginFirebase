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


  const handleUpdateUser = (params: { password: string | null, name: string }): void => {
    let auth = getAuth();

    Promise.all(
      [
        (params?.name && auth.currentUser.displayName !== params?.name)
          ? updateProfile(auth.currentUser, {
            displayName: String(params?.name), photoURL: ""
          })
          : null,
        params?.password ? updatePassword(auth.currentUser, params.password) : null
      ]
    )
      .then(() => {
        auth = getAuth();
        auth.currentUser.getIdToken().then((token) => {
          dispatch(setUser({
            email: auth.currentUser.email,
            id: auth.currentUser.uid,
            token,
            name: auth.currentUser.displayName
          }));
          push('/')
        })
      })
      .catch((e) => alert('Invalid Update User'))

  }
  return (
    <Form title='update' handleClick={handleUpdateUser} type={formType.info} />
  );
}
