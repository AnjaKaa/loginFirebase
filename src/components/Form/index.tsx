
import React, { ChangeEvent, useState, useMemo, FormEvent } from 'react';
import { FormFieldsLogin } from './FormFieldsLogin';
import { FormFieldsRegister } from './FormFieldsRegister';
import { FormFieldsUserSettings } from './FormFieldsUserSettings';

import './form.css';

export enum formType {
  login = 'login',
  register = 'register',
  info = 'info'
}
export interface IFormProps {
  title: string;
  handleClick: (formFields: { email?: string, pass?: string, name?: string, avatar?: string }) => void;
  type: formType
}

export function Form({ title, handleClick, type }: IFormProps) {
  const [formFields, setFormFields] = useState(null)
  const [formValid, setFormValid] = useState(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleClick(formFields);
  }

  return (<div>
    <form onSubmit={handleSubmit}>

      {
        type === formType.login &&
        <FormFieldsLogin
          formValid={formValid}
          setFormFields={setFormFields}
          setFormValid={setFormValid}
        />
      }
      {
        type === formType.register &&
        <FormFieldsRegister
          formValid={formValid}
          setFormFields={setFormFields}
          setFormValid={setFormValid}
        />
      }
      {
        type === formType.info &&
        <FormFieldsUserSettings
          formValid={formValid}
          setFormFields={setFormFields}
          setFormValid={setFormValid}
        />
      }
      {
        formValid && !formValid.success && formValid.message
      }
      <button
        type="submit"
        disabled={!formValid || !formValid.success}
      >
        {title}
      </button>
    </form>
  </div>

  );
}
