import * as React from 'react';
import { useAppDispatch } from '../hooks/redux-hooks'
import { useHistory } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setUser } from '../store/slices/userSlice';
import { Form, formType } from './Form';

export interface ISignUpProps {
}

export function SignUp(props: ISignUpProps) {
  const dispatch = useAppDispatch();
  const { push } = useHistory()

  const handleLogin = (formFields: {
    email: string,
    password: string,
    confirmPassword:
    string,
    name: string
  }): void => {
    let auth = getAuth();
    createUserWithEmailAndPassword(auth, formFields.email, formFields.password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: formFields.name, photoURL: ""
        })
      })
      .then(() => {
        auth = getAuth();
        auth.currentUser.getIdToken().then((token) => {
          dispatch(setUser({
            email: auth.currentUser.email,
            id: auth.currentUser.uid,
            token,
            name: auth.currentUser.displayName,
            photoURL: auth.currentUser.photoURL
          }));
          push('/');
        })
      })
      .catch(console.error)
  }
  return (
    <Form title='register' handleClick={handleLogin} type={formType.register} />
  );
}
