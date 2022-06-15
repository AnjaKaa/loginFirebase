import React, { useState, ChangeEvent } from 'react';
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

  const handleInputBlur = (e: ChangeEvent<HTMLInputElement>) => {
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
    </>
  );
}
