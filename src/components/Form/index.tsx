
import React, { ChangeEvent, useState, useMemo, FormEvent } from 'react';
import { validateLoginForm } from "./validation";

import './form.css';

export interface IFormProps {
  title: string;
  handleClick: (email: string, pass: string) => void;
}

export function Form({ title, handleClick }: IFormProps) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [formValid, setFormValid] = useState(null);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setFormValid(
      validateLoginForm({
        email: e.target.value,
        password: pass
      })
    );
  }

  const handlePassChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
    setFormValid(
      validateLoginForm({
        email,
        password: e.target.value
      })
    );
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleClick(email, pass)
  }

  return (<div>
    <form onSubmit={handleSubmit}>
      <div className={`row ${formValid && formValid.errors['email'] ? 'fail' : ''}`}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
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
          placeholder="password"
        />
        <div className='errorBox'>{formValid && formValid.errors['password']}</div>
      </div>
      {
        formValid && !formValid.success && formValid.message
      }
      <button
        type="submit"
        disabled={formValid && !formValid.success}
      >
        {title}
      </button>
    </form>
  </div>

  );
}
