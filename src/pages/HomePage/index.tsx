import * as React from 'react';
import { Redirect } from "react-router-dom";
import { useAppDispatch } from '../../hooks/redux-hooks'
import { useAuth } from '../../hooks/use-auth';
import { removeUser } from '../../store/slices/userSlice';
import { Header } from '../../components/Header';


export interface IHomePageProps {
}

export function HomePage(props: IHomePageProps) {
  const dispatch = useAppDispatch();
  const { isAuth, id, email, name, avatar } = useAuth();

  return isAuth ? (
    <div>
      <Header user={{ id, email, name, avatar }} />
      <h1>Welcome</h1>

      <button onClick={() => dispatch(removeUser())}>Log out</button>
    </div>
  ) : (
    <Redirect to='/login' />
  );
}
