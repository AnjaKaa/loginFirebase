import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserSettingsPage } from '.';
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


describe('test UserSettingsPage', () => {
  it('render UserSettingsPage', () => {
    render(
      <MemoryRouter>
        <UserSettingsPage />
      </MemoryRouter>
    );
    expect(screen.getByText('User Settings')).toBeInTheDocument();
  })
})

afterAll(jest.clearAllMocks);