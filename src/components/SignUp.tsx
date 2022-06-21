import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/redux-hooks'
import { useHistory } from "react-router-dom";
import { beginLoading, endLoading, setUser } from '../store/slices/userSlice';
import { Form, formType } from './Form';
import { signUpUser } from '../../firebase';
import { Alert } from '@mui/material';


export interface ISignUpProps {
}

export function SignUp(props: ISignUpProps) {
  const dispatch = useAppDispatch();
  const { push } = useHistory();

  const [error, setError] = useState(null);

  const handleLogin = (formFields: {
    email: string,
    password: string,
    confirmPassword:
    string,
    name: string
  }): void => {
    dispatch(beginLoading());
    signUpUser(formFields).
      then((user) => {
        dispatch(setUser(user));
        push('/');
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        dispatch(endLoading())
      });

  }
  return (
    <>
      <Form title='register' handleClick={handleLogin} type={formType.register} />
      {error && <Alert severity="error" sx={{ width: '100%' }}>{error?.message}</Alert>}
    </>
  );
}
