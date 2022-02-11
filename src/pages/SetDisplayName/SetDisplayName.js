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
    width: 4rem;
    height: 2rem;
    background: #262604;
    border: none;
    border-radius: 3rem;
    color: white;
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
          x: -1500,
          transition: { type: 'spring', duration: 1.5, delay: 1 },
        }}
        animate={{
          x: 0,
          transition: { type: 'spring', duration: 1.5, delay: 1 },
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
          변경
        </motion.button>
      </DisMain>
    </Container>
  );
};

export default SetDisplayName;
