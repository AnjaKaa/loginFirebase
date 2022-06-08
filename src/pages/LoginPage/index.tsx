import * as React from 'react';
import { Link } from "react-router-dom";
import { Login } from '../../components/Login';

export interface ILoginPageProps {
}

export function LoginPage(props: ILoginPageProps) {
  return (
    <div>
      <h1>Login</h1>
      <Login />
      <p>
        Or <Link to="/register">register</Link>
      </p>
    </div>
  );
}
