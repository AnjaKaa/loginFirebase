import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/redux-hooks'
import { useHistory } from "react-router-dom";
import { beginLoading, endLoading, setUser } from '../store/slices/userSlice';
import { Form, formType } from './Form';
import { loginUser } from '../../firebase';
import { Alert } from '@mui/material';

export interface ILoginProps {
}

export function Login(props: ILoginProps) {
  const dispatch = useAppDispatch();
  const { push } = useHistory();

  const [error, setError] = useState(null);

  const handleLogin = (formFields: { email: string, password: string }): void => {
    dispatch(beginLoading());
    loginUser(formFields)
      .then((user) => {

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
      <Form title='sing in' handleClick={handleLogin} type={formType.login} />
      {error && <Alert severity="error" sx={{ width: '100%' }}>{error?.message}</Alert>}
    </>
  );
}
