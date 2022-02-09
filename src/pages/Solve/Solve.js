import { useEffect, useMemo, useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import styled from 'styled-components';
import MarkDownRenderer from '../../components/NewQuestion/MarkDownRenderer';
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useHistory, useParams } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Left, Right, TitleContainer } from '../NewQuestion/NewQuestion';

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
  width: 50%;
  height: 84%;
  background: #212325;
  -webkit-box-shadow: 6px 5px 15px 1px rgba(255, 217, 84, 0.72);
  box-shadow: 6px 5px 15px 1px rgba(255, 217, 84, 0.72);
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
  -webkit-box-shadow: 6px 5px 15px 1px rgba(255, 217, 84, 0.72);
  box-shadow: 6px 5px 15px 1px rgba(255, 217, 84, 0.72);
`;

const Code = styled(CodeEditor)`
  width: 100%;
  height: 95%;
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

  &:hover {
    cursor: pointer;
  }
`;

const MarkDown = styled(MarkDownRenderer)`
  width: 90%;
  height: 90%;
  padding: 5rem;
  overflow-y: scroll;
`;

const Solve = ({ match }) => {
  const { title } = useParams();
  const { user } = useAuthContext();
  const history = useHistory();
  const [code, setCode] = useState(
    `print('안녕하세요! 멋사에 지원해주셔서 감사드립니다.')`
  );
  const [instruc, setInstruc] = useState('');

  const submitProb = async () => {
    await addDoc(collection(db, 'submitted'), {
      writer: user.displayName,
      title: title,
      sourceCode: code,
      isCorrect: false,
    });
    history.push('/problems');
  };

  useEffect(() => {
    if (user) {
      let ref = collection(db, 'probs');
      ref = query(ref, where('title', '==', title));

      const unsub = onSnapshot(ref, (snapshot) => {
        setInstruc(
          snapshot.docs[0]._document.data.value.mapValue.fields.instruction
            .stringValue
        );
      });
      return () => unsub();
    }
  }, []);

  return (
    <Container>
      <CodeContainer>
        <Instruction>
          <BoxHead>Instructions</BoxHead>
          <MarkDown body={instruc} />
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
            <SubmitBtn onClick={submitProb}>Submit</SubmitBtn>
          </SubmitContainer>
        </Editor>
      </CodeContainer>
    </Container>
  );
};

export default Solve;
