import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/redux-hooks'
import { useHistory } from "react-router-dom";
import { setUser } from '../store/slices/userSlice';
import { updateUser } from '../../firebase';
import { Form, formType } from './Form';
import { Alert } from '@mui/material';

export interface IUserSettingsProps {
}

export function UserSettings(props: IUserSettingsProps) {
  const dispatch = useAppDispatch();
  const { push } = useHistory();


  const [error, setError] = useState(null);

  const handleUpdateUser = (params: { password: string | null, name: string, file?: any }): void => {
    updateUser(params).then((userInfo) => {
      dispatch(setUser(userInfo));
      push('/')
    })
      .catch((error) => {
        setError(error)
      });
  }
  return (
    <>
      <Form title='update' handleClick={handleUpdateUser} type={formType.info} />
      {error && <Alert severity="error" sx={{ width: '100%' }}>{error?.message}</Alert>}
    </>
  );
}
