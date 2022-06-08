import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RegisterPage } from './';
import { MemoryRouter } from 'react-router-dom'


jest.mock('../../hooks/redux-hooks', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: {}
}));

jest.mock('../../hooks/use-auth', () => ({
  useAuth: () => ({
    isAuth: false,
    email: '',
    token: '',
    id: null
  })
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn,
  signInWithEmailAndPassword: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  })
}));


describe('test RegisterPage', () => {
  it('render RegisterPage', () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByText('register')).toBeInTheDocument();
    expect(screen.getByText('register').tagName).toBe('BUTTON');
    expect(screen.getByText(/log in/i)).toBeInTheDocument();
    expect(screen.getByText(/log in/i).tagName).toBe('A');
  })
})

afterAll(jest.clearAllMocks);