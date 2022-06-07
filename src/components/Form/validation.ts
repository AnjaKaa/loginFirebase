import validator from "validator";

interface IFormData {
  email: string;
  password: string;
}

interface IErrors {
  email?: string;
  password?: string;
};


interface IFormValid {
  success: boolean;
  message: string;
  errors: IErrors;
}

export const validateLoginForm: (payload: IFormData) => IFormValid = payload => {
  const errors: IErrors = {};
  let message: string = "";
  let isFormValid: boolean = true;

  if (
    !payload ||
    typeof payload.email !== "string" ||
    validator.isEmpty(payload.email.trim())
  ) {
    isFormValid = false;
    errors.email = "Please provide your email.";
  } else if (
    !validator.isEmail(payload.email)
  ) {
    isFormValid = false;
    errors.email = "Please provide a correct email address.";
  }

  if (
    !payload ||
    typeof payload.password !== "string" ||
    validator.isEmpty(payload.password.trim())
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
