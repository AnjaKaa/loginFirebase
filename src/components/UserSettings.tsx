import * as React from 'react';
import { useAppDispatch } from '../hooks/redux-hooks'
import { useHistory } from "react-router-dom";
import { setUser } from '../store/slices/userSlice';
import { updateUser } from '../../firebase';
import { Form, formType } from './Form';



export interface IUserSettingsProps {
}

export function UserSettings(props: IUserSettingsProps) {
  const dispatch = useAppDispatch();
  const { push } = useHistory();

  const handleUpdateUser = (params: { password: string | null, name: string, file?: any }): void => {
    updateUser(params).then((userInfo) => {
      dispatch(setUser(userInfo));
      push('/')
    })
  }
  return (
    <Form title='update' handleClick={handleUpdateUser} type={formType.info} />
  );
}
