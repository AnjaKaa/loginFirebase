import * as React from 'react';
import { Button, ButtonProps } from "@mui/material";
import { styled } from '@mui/material/styles';
import { removeUser } from '../../store/slices/userSlice';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { lightBlue } from '@mui/material/colors';

export interface ILogOutButtonProps {
  color?: string;
}

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(lightBlue[500]),
  backgroundColor: lightBlue[500],
  '&:hover': {
    backgroundColor: lightBlue[700],
    borderColor: lightBlue[700]
  },
}));

export function LogOutButton(props: ILogOutButtonProps) {
  const dispatch = useAppDispatch();
  return (
    <ColorButton
      variant="outlined"
      color="secondary"
      onClick={() => dispatch(removeUser())}
    >
      Log out
    </ColorButton>
  );
}
