import * as React from 'react';
import { AppBar, Toolbar, Grid, Box, Stack } from "@mui/material";
import { User, IUser } from '../User';
import { LogOutButton } from '../LogOutButton';

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
            <Stack direction="row" spacing={2}>
              <LogOutButton />
              <User user={user} />
            </Stack>
          </Grid>

        </Grid>
      </Toolbar>

    </AppBar>
  );
}
