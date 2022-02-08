import { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import styled from 'styled-components';
import * as React from 'react';
import { NewBtn, StyledLink } from '../Problems/Problems';

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

const NewQuestion = () => {
  const [value, setValue] = useState('**문제 출제 화이팅이요 ㅎㅎ**');
  useEffect(() => {
    console.log(value);
  }, [value]);

  const data = `**Hello world!!!**

----

asdasdasdasda

## asdasdasdads`;

  return (
    <Container>
      <Main>
        <Instruction>마크다운 형식으로 기입해주세요 😃</Instruction>
        <MDEditor value={value} onChange={setValue} width={500} height={500} />
        <StyledLink to="/newQuestion">
          <NewBtn>문제 등록</NewBtn>
        </StyledLink>
      </Main>
    </Container>
  );
};

export default NewQuestion;
