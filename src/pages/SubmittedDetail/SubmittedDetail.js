import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useParams } from 'react-router-dom';
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
  const { name, title } = useParams();
  const { user } = useAuthContext();
  const [sourceCode, setSourceCode] = useState('');

  console.log(name, title);

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

  /*  const wow = doc(db, 'submitted', '4cgfztm6KRTW3OeYObk5');
  console.log(wow);*/

  const tmp = 'a = 12\nb = 2\n\nconsole.log(12+2)';

  return (
    <Container>
      <SyntaxHighlighter language="javascript" style={docco}>
        {sourceCode}
      </SyntaxHighlighter>
    </Container>
  );
};

export default SubmittedDetail;
