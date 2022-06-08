import * as React from 'react';
import { Redirect } from "react-router-dom";
import { useAppDispatch } from '../../hooks/redux-hooks'
import { useAuth } from '../../hooks/use-auth';
import { removeUser } from '../../store/slices/userSlice';

export interface IHomePageProps {
}

export function HomePage(props: IHomePageProps) {
  const dispatch = useAppDispatch();
  const { isAuth, email } = useAuth();

  return isAuth ? (
    <div>
      <h1>Welcome</h1>

      <button onClick={() => dispatch(removeUser())}>Log out</button>
    </div>
  ) : (
    <Redirect to='/login' />
  );
}
