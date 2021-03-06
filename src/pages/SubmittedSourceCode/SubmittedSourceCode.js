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
import { plusYAnimation, buttonScale } from '../../utils/constants/constants';

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
        initial={plusYAnimation.initial}
        animate={plusYAnimation.animate}
      >
        <h1>???? ?????????: {title}</h1>
        <h2>????????????????? ?????????: {name}</h2>
        <h2>???? ?????? ????????? ??????</h2>
        <hr />
        <SyntaxHighlighter language="python" style={a11yDark}>
          {sourceCode}
        </SyntaxHighlighter>
        <div>
          <motion.button
            onClick={deleteBtnHandler}
            whileHover={buttonScale.whileHover}
            whileTap={buttonScale.whileTap}
          >
            {' '}
            ??? ?????? ????????????
          </motion.button>
        </div>
      </motion.div>
    </Container>
  );
};

export default SubmittedSourceCode;
