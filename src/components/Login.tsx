import * as React from 'react';
import { useAppDispatch } from '../hooks/redux-hooks'
import { useHistory } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from '../store/slices/userSlice';
import { Form } from './Form';

export interface ILoginProps {
}

export function Login(props: ILoginProps) {
  const dispatch = useAppDispatch();
  const { push } = useHistory()

  const handleLogin = (email: string, password: string): void => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log('user', user);
        dispatch(setUser({
          email: user.email,
          id: user.uid,
          token: user.refreshToken
        }));
        push('/');
      })
      .catch(() => alert('Invalid User'))
  }
  return (
    <Form title='sing in' handleClick={handleLogin} />
  );
}
