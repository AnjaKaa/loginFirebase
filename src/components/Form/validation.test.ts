import { validateLoginForm } from "./validation";

describe('validateLoginForm', () => {
  it('check empty value', () => {

    const formData = {
      email: '',
      password: ''
    }

    const formValid = {
      success: false,
      message: "Check the form for errors.",
      errors: {
        email: "Please provide your email.",
        password: "Please provide your password."
      }
    }

    expect(validateLoginForm(formData)).toEqual(formValid);

  })
  it('check valid value', () => {
    const formData = {
      email: 'abc@mail.com',
      password: '123'
    }

    const formValid = {
      success: true,
      message: "",
      errors: {}
    }

    expect(validateLoginForm(formData)).toEqual(formValid);

  })
  it('check empty email value', () => {
    const formData = {
      email: '',
      password: '123'
    }

    const formValid = {
      success: false,
      message: "Check the form for errors.",
      errors: {
        email: "Please provide your email.",
      }
    }

    expect(validateLoginForm(formData)).toEqual(formValid);

  })
  it('check invalid email value', () => {
    const formData = {
      email: 'abc',
      password: '123'
    }

    const formValid = {
      success: false,
      message: "Check the form for errors.",
      errors: {
        email: "Please provide a correct email address."
      }
    }

    expect(validateLoginForm(formData)).toEqual(formValid);

  })
  it('check empty password value', () => {
    const formData = {
      email: 'abc@mail.com',
      password: ''
    }

    const formValid = {
      success: false,
      message: "Check the form for errors.",
      errors: {
        password: "Please provide your password."
      }
    }

    expect(validateLoginForm(formData)).toEqual(formValid);

  })
})