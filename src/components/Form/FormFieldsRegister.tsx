import React, { useState, ChangeEvent } from 'react';
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

  const handleInputBlur = (e: ChangeEvent<HTMLInputElement>) => {
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
      <div className={`row ${formValid && formValid.errors['email'] ? 'fail' : ''}`}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleInputBlur}
          placeholder="email"
        />
        <div className='errorBox'>{formValid && formValid.errors['email']}</div>
      </div>
      <div className={`row ${formValid && formValid.errors['password'] && 'fail'}`}>
        <input
          type="password"
          name="password"
          value={pass}
          onChange={handlePassChange}
          onBlur={handleInputBlur}
          placeholder="password"
        />
        <div className='errorBox'>{formValid && formValid.errors['password']}</div>
      </div>
      <div className={`row ${formValid && formValid.errors['confirmPassword'] && 'fail'}`}>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPass}
          onChange={handleConfirmPassChange}
          onBlur={handleInputBlur}
          placeholder="confirm password"
        />
        <div className='errorBox'>{formValid && formValid.errors['confirmPassword']}</div>
      </div>
      <div className={`row ${formValid && formValid.errors['name'] && 'fail'}`}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          onBlur={handleInputBlur}
          placeholder="name"
        />
        <div className='errorBox'>{formValid && formValid.errors['name']}</div>
      </div>
    </>
  );
}
