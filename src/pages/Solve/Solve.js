import { useEffect, useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import styled from 'styled-components';
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
import { encode } from '../../utils/codeTranslator';
import { motion } from 'framer-motion';
import { useAlert } from 'react-alert';
import MDEditor from '@uiw/react-md-editor';
import {
  buttonScale,
  minusXAnimation,
  plusXAnimation,
  plusYAnimation,
} from '../../utils/constants/constants';

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

const Instruction = styled(motion.div)`
  width: 60%;
  height: 84%;
  background: #212325;
  -webkit-box-shadow: 6px 5px 15px 1px #898989;
  box-shadow: 6px 5px 15px 1px #898989;
  .wmde-markdown {
    box-sizing: border-box;
    padding: 1rem;
    font-size: inherit;
    line-height: inherit;
    font-family: inherit;
    &::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 7px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: #898989;
      box-shadow: #000;
    }
  }
  .dJRmu {
    padding: 0;
  }
  code {
    color: black;
  }
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

const Solution = styled(motion.div)`
  width: 100%;
  height: 80%;
  -webkit-box-shadow: 6px 5px 15px 1px #898989;
  box-shadow: 6px 5px 15px 1px #898989;
`;

export const Code = styled(CodeEditor)`
  width: 100%;
  height: 95%;
`;

const SubmitContainer = styled.div`
  width: 100%;
  height: 12%;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 2rem;
  }
`;

const SubmitBtn = styled(motion.div)`
  width: 13rem;
  height: 3rem;
  background: #898989;
  color: black;
  font-weight: 700;
  font-size: 1.3rem;
  border-radius: 0.4rem;
  display: ${(props) => (props.isLoading ? 'none' : 'inline-flex')};
  justify-content: center;
  align-items: center;
  -webkit-box-shadow: 6px 5px 15px 1px #898989;
  box-shadow: 6px 5px 15px 1px #1f1818;

  &:hover {
    cursor: pointer;
  }
`;

const MarkDown = styled(MDEditor.Markdown)`
  width: 100%;
  height: 90%;
  overflow-y: scroll;
`;

const Solve = () => {
  const alert = useAlert();
  const { title } = useParams();
  const { user } = useAuthContext();
  const history = useHistory();
  const [code, setCode] = useState(
    `print('안녕하세요! 멋사에 지원해주셔서 감사드립니다.')`
  );
  const [instruc, setInstruc] = useState('');
  const [testValues, setTestValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [testText, setTestText] = useState('');

  const success = async () => {
    await addDoc(collection(db, 'submitted'), {
      writer: user.displayName,
      title: title,
      sourceCode: code,
    });
    const successAlert = await alert.success('🦁 정답입니다!!!!!!!!', {
      timeout: 8000,
    });
    history.push('/problems');
  };

  // 초기 데이터 추출
  useEffect(() => {
    if (user) {
      let ref = collection(db, 'probs');
      ref = query(ref, where('title', '==', title));
      const unsub = onSnapshot(ref, (snapshot) => {
        const testObj = {};
        const fields = snapshot.docs[0]._document.data.value.mapValue.fields;
        setInstruc(
          snapshot.docs[0]._document.data.value.mapValue.fields.instruction
            .stringValue
        );
        if (fields.test1Input?.integerValue) {
          testObj.test1Input = +fields.test1Input?.integerValue;
        } else {
          testObj.test1Input = fields.test1Input?.stringValue;
        }
        if (fields.test2Input?.integerValue) {
          testObj.test2Input = +fields.test2Input?.integerValue;
        } else {
          testObj.test2Input = fields.test2Input?.stringValue;
        }
        if (fields.test1Output?.integerValue) {
          testObj.test1Output = +fields.test1Output?.integerValue;
        } else {
          testObj.test1Output = fields.test1Output?.stringValue;
        }
        if (fields.test2Output?.integerValue) {
          testObj.test2Output = +fields.test2Output?.integerValue;
        } else {
          testObj.test2Output = fields.test2Output?.stringValue;
        }
        setTestValues(testObj);
      });
      return () => unsub();
    }
  }, []);

  const testHandler = async () => {
    await setIsLoading(true);
    const firstTestRes = await getResOfTest(
      testValues['test1Input'],
      testValues['test1Output']
    );
    const secondTestRes = await getResOfTest(
      testValues['test2Input'],
      testValues['test2Output']
    );
    setTestText(
      `🤖first test case Result! </br> 🧮 memory: ${firstTestRes.memory}kb </br> ⏰ time: ${firstTestRes.time}s </br> 🖥 result: ${firstTestRes.status.description} </br> </br> 🤖second test case Result! </br> 🧮 memory: ${secondTestRes.memory} </br> ⏰ time: ${secondTestRes.time}s </br> 🖥 result: ${secondTestRes.status.description} </br>`
    );
    setTimeout(async () => {
      if (
        firstTestRes.status.description === 'Accepted' &&
        secondTestRes.status.description === 'Accepted'
      ) {
        await success();
      } else {
        const successAlert = await alert.error('😭 오답입니다!', {
          timeout: 8000,
        });
        setIsLoading(false);
        setTestText('');
      }
    }, 3000);
  };

  const getResOfTest = async (input, output) => {
    const response = await fetch(
      'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true',
      {
        method: 'POST',
        headers: {
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_JUDGE_KEY,
          'content-type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          language_id: 71,
          source_code: encode(code),
          stdin: encode(input),
          redirect_stderr_to_stdout: true,
          expected_output: encode(output),
        }),
      }
    );
    const responseJson = await response.json();
    if (responseJson.token) {
      let url = `https://judge0-ce.p.rapidapi.com/submissions/${responseJson.token}?base64_encoded=true`;
      const getSolution = await fetch(url, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_JUDGE_KEY,
          'content-type': 'application/json',
        },
      });
      const final = await getSolution.json();
      return { ...final };
    }
  };

  return (
    <Container>
      <CodeContainer>
        <Instruction
          initial={minusXAnimation.initial}
          animate={minusXAnimation.animate}
        >
          <BoxHead>Instructions</BoxHead>
          {isLoading ? (
            <MarkDown source={testText} />
          ) : (
            <MarkDown source={instruc} />
          )}
        </Instruction>
        <Editor>
          <Solution
            initial={plusXAnimation.initial}
            animate={plusXAnimation.animate}
          >
            <BoxHead>Solution</BoxHead>
            <Code
              value={code}
              language="python"
              placeholder="파이썬 코드를 입력해주세요."
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
            {isLoading && <p>🤖 코드 테스트중 . . .</p>}
            <SubmitBtn
              onClick={testHandler}
              initial={plusYAnimation.initial}
              animate={plusYAnimation.animate}
              whileHover={buttonScale.whileHover}
              whileTap={buttonScale.whileTap}
              isLoading={isLoading}
            >
              소스코드 제출
            </SubmitBtn>
          </SubmitContainer>
        </Editor>
      </CodeContainer>
    </Container>
  );
};

export default Solve;
