import styled from 'styled-components';
import GoogleIcon from '@mui/icons-material/Google';
import { useLogin } from '../../hooks/useLogin';
import { motion } from 'framer-motion';
import { minusXAnimation, buttonScale } from '../../utils/constants/constants';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

export const Main = styled(motion.div)`
  width: 50%;
  height: 50%;
  background: #131414;
  padding: 3rem;
  border-radius: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  -webkit-box-shadow: 6px 5px 15px 1px #898989;
  box-shadow: 6px 5px 15px 1px #898989;

  h1 {
    font-style: italic;
    font-size: 3rem;
    margin-bottom: 5rem;
  }

  div {
    border: 1px solid #ffff;
    width: 40%;
    height: 15%;
    background: #898989;
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
  color: #343333;
`;

const Login = () => {
  const { login } = useLogin();

  return (
    <Container>
      <Main initial={minusXAnimation.initial} animate={minusXAnimation.animate}>
        <h1>Login</h1>
        <motion.div
          onClick={login}
          whileHover={buttonScale.whileHover}
          whileTap={buttonScale.whileTap}
        >
          Login via Google
          <Icon />
        </motion.div>
      </Main>
    </Container>
  );
};

export default Login;
