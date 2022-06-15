import * as React from 'react';
import { Redirect } from "react-router-dom";
import { useAuth } from '../../hooks/use-auth';
import { Header } from '../../components/Header';

export interface IHomePageProps { }

export function HomePage(props: IHomePageProps) {
  const { isAuth, id, email, name, avatar } = useAuth();

  return isAuth ? (
    <div>
      <Header user={{ id, email, name, avatar }} />
      <h1>Welcome</h1>


    </div>
  ) : (
    <Redirect to='/login' />
  );
}
