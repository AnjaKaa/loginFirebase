import { validateLoginForm, validateRegistrationForm, validateUserSettingsForm } from "./validation";

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

describe('validateRegistrationForm', () => {
  it('check empty value', () => {

    const formData = {
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    }

    const formValid = {
      success: false,
      message: "Check the form for errors.",
      errors: {
        email: "Please provide your email.",
        password: "Please provide your password.",
        name: "Please provide  your name."
      }
    }

    expect(validateRegistrationForm(formData)).toEqual(formValid);

  })
  it('check valid value', () => {
    const formData = {
      email: 'abc@mail.com',
      password: '123',
      confirmPassword: '123',
      name: 'name'
    }

    const formValid = {
      success: true,
      message: "",
      errors: {}
    }

    expect(validateRegistrationForm(formData)).toEqual(formValid);

  })
  it('check empty email value', () => {
    const formData = {
      email: '',
      password: '123',
      confirmPassword: '123',
      name: 'name'
    }

    const formValid = {
      success: false,
      message: "Check the form for errors.",
      errors: {
        email: "Please provide your email.",
      }
    }

    expect(validateRegistrationForm(formData)).toEqual(formValid);

  })
  it('check invalid email value', () => {
    const formData = {
      email: 'abc',
      password: '123',
      confirmPassword: '123',
      name: 'name'
    }

    const formValid = {
      success: false,
      message: "Check the form for errors.",
      errors: {
        email: "Please provide a correct email address."
      }
    }

    expect(validateRegistrationForm(formData)).toEqual(formValid);

  })
  it('check empty password value', () => {
    const formData = {
      email: 'abc@mail.com',
      password: '',
      confirmPassword: '123',
      name: 'name'
    }

    const formValid = {
      success: false,
      message: "Check the form for errors.",
      errors: {
        password: "Please provide your password."
      }
    }

    expect(validateRegistrationForm(formData)).toEqual(formValid);
  })
  it('check empty confirm password value', () => {
    const formData = {
      email: 'abc@mail.com',
      password: '123',
      confirmPassword: '',
      name: 'name'
    }

    const formValid = {
      success: false,
      message: "Check the form for errors.",
      errors: {
        confirmPassword: "Please provide confirm your password."
      }
    }

    expect(validateRegistrationForm(formData)).toEqual(formValid);

  })

  it('check don\'t equal password value and confirm password value', () => {
    const formData = {
      email: 'abc@mail.com',
      password: '123',
      confirmPassword: '321',
      name: 'name'
    }

    const formValid = {
      success: false,
      message: "Check the form for errors.",
      errors: {
        password: "Passwords do not match.",
        confirmPassword: "Passwords do not match."
      }
    }

    expect(validateRegistrationForm(formData)).toEqual(formValid);

  })

  it('check empty name value', () => {
    const formData = {
      email: 'abc@mail.com',
      password: '123',
      confirmPassword: '123',
      name: ''
    }

    const formValid = {
      success: false,
      message: "Check the form for errors.",
      errors: {
        name: "Please provide  your name."
      }
    }

    expect(validateRegistrationForm(formData)).toEqual(formValid);

  })

})

describe('validateUserSettingsForm', () => {
  it('check empty value', () => {

    const formData = {
      password: '',
      confirmPassword: '',
      name: ''
    }

    const formValid = {
      success: false,
      message: "Check the form for errors.",
      errors: {
        name: "Please provide your name."
      }
    }

    expect(validateUserSettingsForm(formData)).toEqual(formValid);

  })
  it('check valid name value', () => {
    const formData = {
      password: '',
      confirmPassword: '',
      name: 'name'
    }

    const formValid = {
      success: true,
      message: "",
      errors: {}
    }

    expect(validateUserSettingsForm(formData)).toEqual(formValid);
  })
  it('check empty password value ', () => {
    const formData = {

      password: '',
      confirmPassword: '123',
      name: 'name'
    }

    const formValid = {
      success: false,
      message: "Check the form for errors.",
      errors: {
        password: "Please provide your password."
      }
    }

    expect(validateUserSettingsForm(formData)).toEqual(formValid);
  })
  it('check empty confirm password value', () => {
    const formData = {
      password: '123',
      confirmPassword: '',
      name: 'name'
    }

    const formValid = {
      success: false,
      message: "Check the form for errors.",
      errors: {
        confirmPassword: "Please provide confirm your password."
      }
    }

    expect(validateUserSettingsForm(formData)).toEqual(formValid);

  })

  it('check don\'t equal password value and confirm password value', () => {
    const formData = {
      password: '123',
      confirmPassword: '321',
      name: 'name'
    }

    const formValid = {
      success: false,
      message: "Check the form for errors.",
      errors: {
        password: "Passwords do not match.",
        confirmPassword: "Passwords do not match."
      }
    }

    expect(validateUserSettingsForm(formData)).toEqual(formValid);

  })

})

