import * as React from 'react';
import { useAppDispatch } from '../hooks/redux-hooks'
import { useHistory } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, User } from "firebase/auth";
import { setUser } from '../store/slices/userSlice';
import { Form } from './Form';

export interface ISignUpProps {
}

export function SignUp(props: ISignUpProps) {
  const dispatch = useAppDispatch();
  const { push } = useHistory()

  const handleLogin = (email: string, password: string): void => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log('user', user);
        dispatch(setUser({
          email: user.email,
          id: user.uid,
          token: user.refreshToken
        }));
        push('/');
      })
      .catch(console.error)
  }
  return (
    <Form title='register' handleClick={handleLogin} />
  );
}
