import styled from 'styled-components';
import { Container, Main } from '../Login/Login';
import { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

const DisMain = styled(Main)`
  h1 {
    font-style: normal;
  }

  input {
    margin: 2rem 0;
    width: 23rem;
    height: 2rem;
  }

  button {
    width: 6rem;
    height: 3rem;
    background: #898989;
    border: none;
    border-radius: 3rem;
    font-size: 1.3rem;
    color: white;
    font-weight: 600;
    &:hover {
      cursor: pointer;
    }
  }
`;

const SetDisplayName = () => {
  const history = useHistory();
  const auth = getAuth();
  const [nickName, setNickName] = useState('');

  const changeDisplayName = () => {
    updateProfile(auth.currentUser, {
      displayName: nickName,
    });
  };

  const displaySubmit = async () => {
    await changeDisplayName();
    history.push('/');
  };

  return (
    <Container>
      <DisMain
        initial={{
          x: -5000,
          transition: { type: 'spring', duration: 0.6, delay: 0.1 },
        }}
        animate={{
          x: 0,
          transition: { type: 'spring', duration: 0.6, delay: 0.1 },
        }}
      >
        <h1>🦁 이름 설정</h1>
        <p>'학번', '_'(언더스코어), '이름' 순으로</p>
        <p>꼭 '20170109_이승환' 과 같이 닉네임을 설정해주세요.</p>
        <motion.input
          type="text"
          placeholder="20170109_이승환"
          onChange={(e) => setNickName(e.target.value)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />
        <motion.button
          onClick={displaySubmit}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          설정
        </motion.button>
      </DisMain>
    </Container>
  );
};

export default SetDisplayName;
