import * as React from 'react';
import { Redirect } from "react-router-dom";
import { useAuth } from '../../hooks/use-auth';
import { Header } from '../../components/Header';

export interface IHomePageProps { }

export function HomePage(props: IHomePageProps) {
  const { id, email, name, avatar } = useAuth();

  return (
    <div>
      <Header user={{ id, email, name, avatar }} />
      <h1>Welcome</h1>
    </div>
  )
}
