import { useSelector, } from 'react-redux';
import { IRootState } from '../store';

export function useAuth() {
  const { email, token, id, name, avatar, loading } = useSelector((state: IRootState) => state.user);

  return {
    isAuth: !!email,
    email,
    token,
    id,
    name,
    avatar,
    loading
  }
}