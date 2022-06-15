
import React, { useState, FormEvent } from 'react';
import { Link } from "react-router-dom";
import { Stack, Button, Typography } from "@mui/material";
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

  return (

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
        formValid && !formValid.success &&
        <Typography variant='h6' align="center" mt={1}>
          {formValid.message}
        </Typography>
      }
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ m: 2 }}
      >

        {
          type === formType.info &&
          <Link to="/">
            <Button
              type="button"
            >
              cancel
            </Button>
          </Link>
        }
        <Button
          type="submit"
          color="primary"
          variant="contained"

          disabled={!formValid || !formValid.success}
        >
          {title}
        </Button>

      </Stack>
    </form>


  );
}
