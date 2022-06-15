import * as React from 'react';
import { Box } from "@mui/material";
import { UserSettings } from '../../components/UserSettings';
import { useAuth } from '../../hooks/use-auth';

export interface IUserSettingsPageProps {
}

export function UserSettingsPage(props: IUserSettingsPageProps) {
  const user = useAuth();
  return (
    <Box
      sx={{
        width: 300,
        mx: 'auto'
      }}>
      <>
        <h1>User "{user?.name || user?.email}" Settings</h1>
        <UserSettings />
      </>
    </Box>
  );
}
