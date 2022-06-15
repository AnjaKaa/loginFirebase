import React, { useState, ChangeEvent, FocusEvent } from 'react';
import { TextField } from '@mui/material';
import { validateUserSettingsForm, IFormValid } from "./validation";
import { useAuth } from '../../hooks/use-auth';

export interface IFormFieldsUserSettingsProps {
  formValid: IFormValid;
  setFormValid: (formValid: IFormValid) => void;
  setFormFields: (formFields: { name: string, password: string, confirmPassword: string }) => void;
}

export function FormFieldsUserSettings({ formValid, setFormValid, setFormFields }: IFormFieldsUserSettingsProps) {
  const user = useAuth();

  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [name, setName] = useState(user.name);

  const handlePassChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);

    setFormFields({
      name,
      password: e.target.value,
      confirmPassword: confirmPass
    })
  }
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setFormFields({

      password: pass,
      confirmPassword: confirmPass,
      name: e.target.value
    })
  }
  const handleConfirmPassChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPass(e.target.value);
    setFormFields({
      password: pass,
      confirmPassword: e.target.value,
      name
    })
  }

  const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    const formValid: IFormValid = validateUserSettingsForm({

      password: pass,
      confirmPassword: confirmPass,
      name,
      [e.target.name]: e.target.value
    })
    setFormValid(
      formValid
    );
  }


  return (
    <>
      <TextField
        type="text"
        name="name"
        label="name"
        value={name}
        onChange={handleNameChange}
        onBlur={handleInputBlur}
        placeholder="name"
        error={formValid && Boolean(formValid.errors['name'])}
        helperText={formValid?.errors['name']}
        variant="standard"
      />
      <TextField
        type="password"
        name="password"
        label="password"
        value={pass}
        onChange={handlePassChange}
        onBlur={handleInputBlur}
        placeholder="password"
        error={formValid && Boolean(formValid.errors['password'])}
        helperText={formValid?.errors['password']}
        variant="standard"
      />
      <TextField
        type="password"
        name="confirmPassword"
        label="confirm password"
        value={confirmPass}
        onChange={handleConfirmPassChange}
        onBlur={handleInputBlur}
        placeholder="confirm password"
        error={formValid && Boolean(formValid.errors['confirmPassword'])}
        helperText={formValid?.errors['confirmPassword']}
        variant="standard"
      />
    </>
  );
}
