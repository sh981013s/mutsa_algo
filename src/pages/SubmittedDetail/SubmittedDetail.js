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

const SubmittedDetail = () => {
  const { name, title, id } = useParams();
  const { user } = useAuthContext();
  const history = useHistory();
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

  const correct = async () => {
    const submitted = doc(db, 'submitted', id);
    await updateDoc(submitted, {
      isCorrect: 'true',
    });
  };
  const incorrect = async () => {
    const submitted = doc(db, 'submitted', id);
    await updateDoc(submitted, {
      isCorrect: 'false',
    });
  };

  const correctHandler = async () => {
    await correct();
    history.push('/console');
  };

  const incorrectHandler = async () => {
    await incorrect();
    history.push('/console');
  };

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
        <div>
          <button onClick={correctHandler}>✅ 정답</button>
          <button onClick={incorrectHandler}>❌ 오답</button>
        </div>
      </div>
    </Container>
  );
};

export default SubmittedDetail;
