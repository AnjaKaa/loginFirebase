import * as React from 'react';
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { Login } from '../../components/Login';

export interface ILoginPageProps {
}

export function LoginPage(props: ILoginPageProps) {
  return (
    <Box
      sx={{
        width: 300,
        mx: 'auto'
      }}>
      <>
        <h1>Login</h1>
        <Login />
        <p>
          Or <Link to="/register">register</Link>
        </p>
      </>
    </Box>
  );
}
