import * as React from 'react';
import { useAppDispatch } from '../hooks/redux-hooks'
import { useHistory } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from '../store/slices/userSlice';
import { Form, formType } from './Form';

export interface ILoginProps {
}

export function Login(props: ILoginProps) {
  const dispatch = useAppDispatch();
  const { push } = useHistory();

  const handleLogin = (formFields: { email: string, password: string }): void => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, formFields.email, formFields.password)
      .then(({ user }) => {
        user.getIdToken().then((token) => {

          dispatch(setUser({
            email: user.email,
            id: user.uid,
            token: token,
            name: user.displayName
          }));
          push('/');
        })
      })
      .catch(() => alert('Invalid User'))
  }
  return (
    <Form title='sing in' handleClick={handleLogin} type={formType.login} />
  );
}
