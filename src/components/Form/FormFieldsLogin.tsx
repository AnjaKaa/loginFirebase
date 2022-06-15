import React, { useState, ChangeEvent } from 'react';
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

  const handleInputBlur = (e: ChangeEvent<HTMLInputElement>) => {
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
    </>
  );
}
