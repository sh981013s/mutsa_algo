import { useEffect, useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import styled from 'styled-components';
import MDEditor from '@uiw/react-md-editor';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const CodeContainer = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
`;

const Instruction = styled.div`
  width: 30%;
  height: 84%;
  background: #212325;
`;

const BoxHead = styled.div`
  width: 100%;
  height: 5%;
  background: #16181a;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Editor = styled.div`
  padding: 0 5%;
  width: 70%;
  height: 100%;
`;

const Solution = styled.div`
  width: 100%;
  height: 80%;
`;

const Code = styled(CodeEditor)`
  width: 100%;
  height: 100%;
`;

const SubmitContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubmitBtn = styled.div`
  width: 5rem;
  height: 2rem;
  background: #5d88d6;
  margin-top: 3rem;
  color: black;
  border-radius: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MarkDown = styled(MDEditor.Markdown)`
  width: 90%;
  height: 95%;
  padding: 1rem;
`;

const Solve = () => {
  const [code, setCode] = useState(
    `print('안녕하세요! 멋사에 지원해주셔서 감사드립니다.')`
  );

  const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`;

  return (
    <Container>
      <CodeContainer>
        <Instruction>
          <BoxHead>Instructions</BoxHead>
          <MarkDown source={markdown} />
        </Instruction>
        <Editor>
          <Solution>
            <BoxHead>Solution</BoxHead>
            <Code
              value={code}
              language="python"
              placeholder="Please enter JS code."
              onChange={(e) => setCode(e.target.value)}
              padding={15}
              style={{
                fontSize: 12,
                backgroundColor: '#131414',
                fontFamily:
                  'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
              }}
            />
          </Solution>
          <SubmitContainer>
            <SubmitBtn>Submit</SubmitBtn>
          </SubmitContainer>
        </Editor>
      </CodeContainer>
    </Container>
  );
};

export default Solve;
