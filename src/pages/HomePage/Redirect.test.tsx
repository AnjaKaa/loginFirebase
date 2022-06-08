import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HomePage } from './';


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

jest.mock('react-router-dom', () => {
  return {
    Redirect: jest.fn(({ to }) => `Redirected to ${to}`),
  };
});

describe('test HomePage redirect', () => {
  it('render HomePage without auth', () => {
    render(<HomePage />);
    expect(screen.getByText('Redirected to /login')).toBeInTheDocument();
  })
})

afterAll(jest.clearAllMocks);