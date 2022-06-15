import * as React from 'react';
import { UserSettings } from '../../components/UserSettings';

export interface IUserSettingsPageProps {
}

export function UserSettingsPage(props: IUserSettingsPageProps) {
  return (
    <div>
      <h1>User  Settings</h1>
      <UserSettings />

    </div>
  );
}
