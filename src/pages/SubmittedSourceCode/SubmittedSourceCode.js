import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useHistory, useParams } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  div {
    h2 {
      margin-bottom: 1rem;
    }
    div {
      margin-top: 1em;
      text-align: center;
      button {
        margin: 0.5rem;
        background: none;
        border: none;
        color: white;
        width: 4rem;
        font-size: 1rem;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
`;

const SubmittedSourceCode = () => {
  const { name, title, id } = useParams();
  const { user } = useAuthContext();
  const [sourceCode, setSourceCode] = useState('');

  useEffect(() => {
    if (user) {
      let ref = collection(db, 'submitted');
      ref = query(
        ref,
        where('writer', '==', name),
        where('title', '==', title)
      );

      const unsub = onSnapshot(ref, (snapshot) => {
        setSourceCode(
          snapshot.docs[0]._document.data.value.mapValue.fields.sourceCode
            .stringValue
        );
      });
      return () => unsub();
    }
  }, []);

  return (
    <Container>
      <div>
        <h1>📄 문제명: {title}</h1>
        <h2>🙋🏻‍♀️ 제출자: {user.displayName}</h2>
        <h2>🧮 제출코드</h2>
        <hr />
        <SyntaxHighlighter language="python" style={a11yDark}>
          {sourceCode}
        </SyntaxHighlighter>
      </div>
    </Container>
  );
};

export default SubmittedSourceCode;
