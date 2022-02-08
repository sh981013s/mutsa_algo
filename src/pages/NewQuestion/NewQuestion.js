import { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import styled from 'styled-components';
import { NewBtn, StyledLink } from '../Problems/Problems';
import { useAuthContext } from '../../hooks/useAuthContext';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

const Instruction = styled.p`
  font-size: 1.3rem;
  color: white;
  text-align: center;
  margin-bottom: 3rem;
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const Main = styled.div`
  margin-top: 3rem;
  width: 80%;
`;

const Title = styled.input`
  margin-bottom: 1rem;
  width: 30%;
  height: 5%;
`;

const NewQuestion = () => {
  const [value, setValue] = useState(`**문제 출제 화이팅이요 ㅎㅎ**`);
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    console.log(user);
  }, [value]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const submitProb = () => {
    addDoc(collection(db, 'probs'), {
      writer: user.displayName,
      title: title,
      instruction: value,
    });
  };

  return (
    <Container>
      <Main>
        <Instruction>마크다운 형식으로 기입해주세요 😃</Instruction>
        <Title
          type="text"
          placeholder="문제 이름"
          onChange={handleTitleChange}
        />
        <MDEditor value={value} onChange={setValue} width={500} height={500} />
        <StyledLink to="/newQuestion">
          <NewBtn onClick={submitProb}>문제 등록</NewBtn>
        </StyledLink>
      </Main>
    </Container>
  );
};

export default NewQuestion;
