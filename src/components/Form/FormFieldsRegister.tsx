import React, { useState, ChangeEvent, FocusEvent } from 'react';
import { TextField } from '@mui/material';
import { validateRegistrationForm, IFormValid } from "./validation";

export interface IFormFieldsLoginProps {
  formValid: IFormValid;
  setFormValid: (formValid: IFormValid) => void;
  setFormFields: (
    formFields: {
      email: string,
      password: string,
      confirmPassword:
      string,
      name: string
    }) => void;
}

export function FormFieldsRegister({ formValid, setFormValid, setFormFields }: IFormFieldsLoginProps) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [name, setName] = useState('');



  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setFormFields({
      email: e.target.value,
      password: pass,
      confirmPassword: confirmPass,
      name
    })
  }

  const handlePassChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
    setFormFields({
      email,
      password: e.target.value,
      confirmPassword: confirmPass,
      name
    })
  }

  const handleConfirmPassChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPass(e.target.value);
    setFormFields({
      email,
      password: pass,
      confirmPassword: e.target.value,
      name
    })
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setFormFields({
      email,
      password: pass,
      confirmPassword: confirmPass,
      name: e.target.value
    })
  }

  const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    const formValid: IFormValid = validateRegistrationForm({
      email: email,
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
        type="email"
        name="email"
        label="email"
        value={email}
        onChange={handleEmailChange}
        onBlur={handleInputBlur}
        placeholder="email"
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
    </>
  );
}
