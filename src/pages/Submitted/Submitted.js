import { useLogout } from '../../hooks/useLogout';

const Submitted = () => {
  const { logout } = useLogout();

  return <div onClick={logout}>Logout</div>;
};

export default Submitted;
