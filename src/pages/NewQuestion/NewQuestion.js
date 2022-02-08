import { useEffect, useRef, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import styled from 'styled-components';
import { NewBtn, StyledLink } from '../Problems/Problems';
import { useAuthContext } from '../../hooks/useAuthContext';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import MarkdownEditor from '../../components/MarkdownEditor';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  //justify-content: center;
`;

const Pannel = styled.div`
  display: flex;
  position: relative;
  flex: 0.5 1 0;
`;

const Left = styled(Pannel)`
  background-color: rgb(38, 50, 56);
  flex-direction: column;
`;

const Right = styled(Pannel)`
  background-color: #fff;
`;

const TitleContainer = styled.div`
  position: relative;
  z-index: 15;
  height: 4rem;
  display: flex;
  color: #fff;
  background-color: rgb(52, 58, 64);
  width: 100%;
  input {
    background-color: rgba(0, 0, 0, 0);
    color: #fff;
    border-style: none;
    outline: none;
    font-size: 1.25rem;
    width: 100%;
  }
`;

const NewQuestion = () => {
  const [value, setValue] = useState(`**문제 출제 화이팅이요 ㅎㅎ**`);
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const submitProb = () => {
    addDoc(collection(db, 'probs'), {
      writer: user.displayName,
      title: title,
      instruction: title,
    });
  };

  return (
    <Container>
      <Left>
        <TitleContainer>
          <input
            type="text"
            placeholder="문제 이름"
            onChange={handleTitleChange}
          />
        </TitleContainer>
        <MarkdownEditor body={value} edit={setValue} />
      </Left>
      <Right></Right>
      {/*      <StyledLink to="/newQuestion">
        <NewBtn onClick={submitProb}>문제 등록</NewBtn>
      </StyledLink>*/}
    </Container>
  );
};

export default NewQuestion;
