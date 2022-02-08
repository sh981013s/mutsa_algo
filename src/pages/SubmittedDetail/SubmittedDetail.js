import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const SubmittedDetail = () => {
  const [sourceCode, setSourceCode] = useState('');

  useEffect(() => {
    let ref = collection(db, 'submitted');
    ref = query(ref);

    const unsub = onSnapshot(ref, (snapshot) => {
      console.log(
        snapshot.docs[0]._document.data.value.mapValue.fields.sourceCode,
        'snap'
      );
      setSourceCode(
        snapshot.docs[0]._document.data.value.mapValue.fields.sourceCode
      );
      snapshot.docs.forEach((doc) => {
        console.log(doc[0], 'doc');
      });
    });
    return () => unsub();
  }, []);

  const tmp = 'a = 12\nb = 2\n\nconsole.log(12+2)';

  return (
    <Container>
      <SyntaxHighlighter language="javascript" style={docco}>
        {tmp}
      </SyntaxHighlighter>
    </Container>
  );
};

export default SubmittedDetail;
