import validator from "validator";

interface IFormLoginData {
  email: string;
  password: string;
}

interface ILoginErrors {
  email?: string;
  password?: string;
};

interface IFormRegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

interface IRegisterErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
}


interface IFormUserSettingsData {
  password: string;
  confirmPassword: string;
  name: string;
}
interface IUserSettingsErrors {
  password?: string;
  confirmPassword?: string;
  name?: string;
}

export interface IFormValid {
  success: boolean;
  message: string;
  errors: ILoginErrors;
}

export const validateLoginForm = (payload: IFormLoginData): IFormValid => {
  const errors: ILoginErrors = {};
  let message: string = "";
  let isFormValid: boolean = true;

  const { email, password } = payload;

  if (
    !payload ||
    typeof email !== "string" ||
    validator.isEmpty(email.trim())
  ) {
    isFormValid = false;
    errors.email = "Please provide your email.";
  } else if (
    !validator.isEmail(email)
  ) {
    isFormValid = false;
    errors.email = "Please provide a correct email address.";
  }

  if (
    !payload ||
    typeof password !== "string" ||
    validator.isEmpty(password.trim())
  ) {
    isFormValid = false;
    errors.password = "Please provide your password.";
  }


  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message,
    errors
  };
};


export const validateRegistrationForm = (payload: IFormRegisterData): IFormValid => {
  let { success, message, errors } = validateLoginForm({ email: payload.email, password: payload.password });

  const { password, confirmPassword, name } = payload;

  if (
    !payload ||
    typeof password !== "string" ||
    typeof confirmPassword !== "string" ||
    !validator.isEmpty(password.trim()) &&
    validator.isEmpty(confirmPassword.trim())
  ) {
    success = false;
    errors['confirmPassword'] = "Please provide confirm your password.";
  } else if (
    !validator.isEmpty(password.trim()) &&
    password !== confirmPassword
  ) {
    success = false;
    errors['password'] = "Passwords do not match.";
    errors['confirmPassword'] = "Passwords do not match.";
  }

  if (
    !payload ||
    typeof confirmPassword !== "string" ||
    validator.isEmpty(name.trim())
  ) {
    success = false;
    errors['name'] = "Please provide  your name.";
  }

  if (!success) {
    message = "Check the form for errors.";
  }

  return {
    success,
    message,
    errors
  };
}

export const validateUserSettingsForm = (payload: IFormUserSettingsData): IFormValid => {
  const errors: IUserSettingsErrors = {};
  let message: string = "";
  let isFormValid: boolean = true;

  const { confirmPassword, password, name } = payload;



  if (
    !payload ||
    typeof password !== "string" ||
    typeof confirmPassword !== "string" ||
    !validator.isEmpty(password.trim()) &&
    validator.isEmpty(confirmPassword.trim())
  ) {
    isFormValid = false;
    errors['confirmPassword'] = "Please provide confirm your password.";
  } else if (password && password !== confirmPassword) {
    isFormValid = false;
    errors['password'] = "Passwords do not match.";
    errors['confirmPassword'] = "Passwords do not match.";
  }

  if (
    !payload ||
    typeof password !== "string" ||
    validator.isEmpty(password.trim())
    && !validator.isEmpty(confirmPassword.trim())
  ) {
    isFormValid = false;
    errors.password = "Please provide your password.";
  }

  if (
    !payload ||
    typeof password !== "string" ||
    validator.isEmpty(name.trim())
  ) {
    isFormValid = false;
    errors.name = "Please provide your name.";
  }



  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message,
    errors
  };
};
