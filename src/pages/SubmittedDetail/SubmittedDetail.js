import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useHistory, useParams } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
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
      <SyntaxHighlighter language="javascript" style={docco}>
        {sourceCode}
      </SyntaxHighlighter>
      <button onClick={correctHandler}>✅ 정답</button>
      <button onClick={incorrectHandler}>❌ 오답</button>
    </Container>
  );
};

export default SubmittedDetail;
