import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

export interface IPrivateRouterProps extends RouteProps { }

export function PrivateRoute({ ...rest }: IPrivateRouterProps) {

  const { isAuth } = useAuth();
  if (isAuth) {
    return (
      <Route {...rest} />
    )
  }

  return (
    <Redirect
      to={{
        pathname: "/login",
      }}
    />
  );
}
