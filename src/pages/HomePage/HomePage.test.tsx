import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { HomePage } from './';



jest.mock('../../hooks/redux-hooks', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: {}
}));

jest.mock('../../hooks/use-auth', () => ({
  useAuth: () => ({
    isAuth: true,
    email: 'test',
    token: 'test',
    id: 'test'
  })
}));


describe('test HomePage', () => {
  it('render HomePage with auth', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/Log out/)).toBeInTheDocument();
    expect(screen.getByText('Log out').tagName).toBe('BUTTON');
  })
})

afterAll(jest.clearAllMocks);