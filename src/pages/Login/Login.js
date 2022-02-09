import styled from 'styled-components';
import GoogleIcon from '@mui/icons-material/Google';
import { useLogin } from '../../hooks/useLogin';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

export const Main = styled.div`
  width: 50%;
  height: 50%;
  background: #484640;
  padding: 3rem;
  border-radius: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  -webkit-box-shadow: 6px 5px 15px 1px rgba(255, 217, 84, 0.72);
  box-shadow: 6px 5px 15px 1px rgba(255, 217, 84, 0.72);

  h1 {
    font-style: italic;
    font-size: 3rem;
    margin-bottom: 5rem;
  }

  div {
    border: 1px solid #ffff;
    width: 40%;
    height: 15%;
    background: #60542f;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3rem;
    &:hover {
      cursor: pointer;
    }
  }
`;

const Icon = styled(GoogleIcon)`
  margin-left: 1rem;
  color: yellow;
`;

const Login = () => {
  const { login } = useLogin();

  return (
    <Container>
      <Main>
        <h1>Login</h1>
        <div onClick={login}>
          Login via Google
          <Icon />
        </div>
      </Main>
    </Container>
  );
};

export default Login;
