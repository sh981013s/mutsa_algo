import { useEffect, useMemo, useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import styled from 'styled-components';
import MDEditor from '@uiw/react-md-editor';

import marked from 'marked';
import Prism from 'prismjs';

import MarkDownRenderer from '../../components/MarkDownRenderer';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

/*import Markdown from 'marked-react';
import Lowlight from 'react-lowlight';
import markdown from 'highlight.js/lib/languages/markdown';*/

// import ReactMarkdown from 'react-markdown';

// import '@/style/prism.css';

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

const MarkDown = styled(MarkDownRenderer)`
  width: 90%;
  height: 90%;
  padding: 3rem;
  overflow-y: scroll;
`;

const Solve = () => {
  const [code, setCode] = useState(
    `print('안녕하세요! 멋사에 지원해주셔서 감사드립니다.')`
  );

  useEffect(() => {
    console.log(code, 'ccc');
  }, [code]);

  const submitProb = () => {
    addDoc(collection(db, 'submitted'), {
      // writer: user.displayName,
      // title: title,
      sourceCode: code,
    });
  };

  const body = `# 안녕\n\n## 안뇽뇽\n\n### 안냥냥\n\n---\n\n- ㅋ\n- ㄴ\n- ㄷ`;

  return (
    <Container>
      <CodeContainer>
        <Instruction>
          <BoxHead>Instructions</BoxHead>
          {/*<ReactMarkdown children={tmp} remarkPlugins={[remarkGfm]} />,*/}
          {/*<MarkDown source={tmp} enableScroll="true" />*/}
          {/*<div className="markdown-render" dangerouslySetInnerHTML={markup} />*/}
          {/*<div className="markdown-render" dangerouslySetInnerHTML={markup} />*/}
          <MarkDown body={body} />
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
