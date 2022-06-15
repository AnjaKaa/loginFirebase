import * as React from 'react';
import { Link } from "react-router-dom";
import { Avatar, Box } from "@mui/material";

export interface IUser {
  email: string;
  id: number;
  name: string;
  avatar: string;
}

export interface IUserProps {
  user: IUser;
}

export function User({ user }: IUserProps) {
  return (
    <Link to="/userinfo">
      <Box display="flex" alignItems="center">
        <Avatar src={user?.avatar} alt={user?.name || user.email} />
        <span style={{ padding: 5, minWidth: 100 }}>{user?.name || user.email}</span>
      </Box>
    </Link>

  );
}
