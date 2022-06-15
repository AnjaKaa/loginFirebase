import * as React from 'react';
import { AppBar, Toolbar, Grid, Typography, FormControl, Select, Box } from "@mui/material";
import { User, IUser } from '../User';

export interface IHeaderProps {
  user: IUser;
}

export function Header({ user }: IHeaderProps) {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">

        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Box display="flex" alignItems="center">
            </Box>
          </Grid>
          <Grid item>
            <User user={user} />
          </Grid>
        </Grid>
      </Toolbar>

    </AppBar>
  );
}
