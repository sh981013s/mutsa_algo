import { signInWithGoogle } from '../firebase/firebaseConfig';
import { useState } from 'react';
import { useAuthContext } from '../../../mutsa_algo/src/hooks/useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = () => {
    setError(null);
    signInWithGoogle()
      .then((res) => {
        dispatch({ type: 'LOGIN', payload: res.user });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return { error, login };
};
