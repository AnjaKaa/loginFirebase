import React, { useState, ChangeEvent, FocusEvent } from 'react';
import { TextField } from '@mui/material';
import { validateLoginForm, IFormValid } from "./validation";

export interface IFormFieldsLoginProps {
  formValid: IFormValid;
  setFormValid: (formValid: IFormValid) => void;
  setFormFields: (formFields: { email: string, password: string }) => void;
}

export function FormFieldsLogin({ formValid, setFormValid, setFormFields }: IFormFieldsLoginProps) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    setFormFields({
      email: e.target.value,
      password: pass
    })
  }

  const handlePassChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);

    setFormFields({
      email,
      password: e.target.value
    })
  }

  const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    const formValid: IFormValid = validateLoginForm({
      email: email,
      password: pass,
      [e.target.name]: e.target.value
    })
    setFormValid(
      formValid
    );
  }

  return (
    <>

      <TextField
        type="email"
        name="email"
        value={email}
        onChange={handleEmailChange}
        onBlur={handleInputBlur}
        placeholder="email"
        label="email"
        error={formValid && Boolean(formValid.errors['email'])}
        helperText={formValid?.errors['email']}
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
    </>
  );
}
