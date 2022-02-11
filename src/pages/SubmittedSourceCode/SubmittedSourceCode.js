import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useHistory, useParams } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { doc, deleteDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';

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
        background: #2c2525;
        border: none;
        color: white;
        width: 10rem;
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

  const deleteAns = async () => {
    await deleteDoc(doc(db, 'submitted', id));
  };

  const deleteBtnHandler = async () => {
    await deleteAns();
    history.push('/submitted');
  };

  return (
    <Container>
      <motion.div
        initial={{
          y: 1500,
          transition: { type: 'spring', duration: 1.5, delay: 1 },
        }}
        animate={{
          y: 0,
          transition: { type: 'spring', duration: 1.5, delay: 1 },
        }}
      >
        <h1>📄 문제명: {title}</h1>
        <h2>🙋🏻‍♀️ 제출자: {user.displayName}</h2>
        <h2>🧮 내가 제출한 코드</h2>
        <hr />
        <SyntaxHighlighter language="python" style={a11yDark}>
          {sourceCode}
        </SyntaxHighlighter>
        <div>
          <motion.button
            onClick={deleteBtnHandler}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {' '}
            ❌ 답안 삭제하기
          </motion.button>
        </div>
      </motion.div>
    </Container>
  );
};

export default SubmittedSourceCode;
