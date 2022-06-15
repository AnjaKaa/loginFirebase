import * as React from 'react';
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { SignUp } from '../../components/SignUp';

export interface IRegisterPageProps {
}

export function RegisterPage(props: IRegisterPageProps) {
  return (
    <Box
      sx={{
        width: 300,
        mx: 'auto'
      }}>
      <>
        <h1>Register</h1>
        <SignUp />
        <p>Already have an account? <Link to="/login">log in</Link></p>
      </>
    </Box>
  );
}
