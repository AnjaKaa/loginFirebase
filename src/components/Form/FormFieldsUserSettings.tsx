import React, { useState, ChangeEvent, FocusEvent, SetStateAction } from 'react';
import { TextField, Button, Avatar, Stack, FormHelperText } from '@mui/material';
import { validateUserSettingsForm, IFormValid } from "./validation";
import { useAuth } from '../../hooks/use-auth';


export interface IFormFieldsUserSettingsProps {
  formValid: IFormValid;
  setFormValid: (formValid: IFormValid) => void;
  setFormFields: (formFields: { name: string, password: string, confirmPassword: string, file?: any }) => void;
}

export function FormFieldsUserSettings({ formValid, setFormValid, setFormFields }: IFormFieldsUserSettingsProps) {
  const user = useAuth();

  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [name, setName] = useState(user.name);
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(user?.avatar);

  const handlePassChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);

    setFormFields({
      name,
      password: e.target.value,
      confirmPassword: confirmPass,
      file
    })
  }
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setFormFields({
      password: pass,
      confirmPassword: confirmPass,
      name: e.target.value,
      file
    })
  }
  const handleConfirmPassChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPass(e.target.value);
    setFormFields({
      password: pass,
      confirmPassword: e.target.value,
      name,
      file
    })
  }

  const handleInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    const formValid: IFormValid = validateUserSettingsForm({
      password: pass,
      confirmPassword: confirmPass,
      name,
      file,
      [e.target.name]: e.target.value
    })
    setFormValid(
      formValid
    );
  }

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    const formValid: IFormValid = validateUserSettingsForm({
      password: pass,
      confirmPassword: confirmPass,
      name,
      file
    });
    setFormValid(
      formValid
    );
    console.log('formValid', formValid, Boolean(formValid.errors['file']));

    reader.onloadend = () => {

      if (!Boolean(formValid.errors['file'])) {
        setFile(file);
        setImagePreviewUrl(String(reader.result));
        setFormFields({
          password: pass,
          confirmPassword: confirmPass,
          name,
          file
        });
      }
    }
    reader.readAsDataURL(file);

  }

  const cancelUpdateAvatar = () => {
    setFile(null);
    setImagePreviewUrl(user?.avatar);
    const formValid: IFormValid = validateUserSettingsForm({
      password: pass,
      confirmPassword: confirmPass,
      name,
      file: null
    });
    setFormValid(
      formValid
    );
  }


  return (
    <>
      <Stack direction="row" spacing={2} mt={2}>
        <Avatar src={imagePreviewUrl} alt='New avatar' sx={{ width: 70, height: 70 }} />
        <Button component="label" color="primary">
          Upload avatar
          <input type="file" hidden onChange={handleChangeFile} accept="image/*" />
        </Button>
        {imagePreviewUrl && imagePreviewUrl !== user?.avatar &&
          <Button
            component="label"
            color="primary"
            onClick={cancelUpdateAvatar}
          >
            cancel
          </Button>
        }
      </Stack>
      {
        formValid?.errors['file'] && (
          <FormHelperText error>
            {formValid?.errors['file']}
          </FormHelperText>
        )
      }
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
