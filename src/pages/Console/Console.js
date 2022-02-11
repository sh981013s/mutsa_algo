import { useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { find } from 'lodash';
import styled from 'styled-components';
import { TableLink } from '../Problems/Problems';
import { motion } from 'framer-motion';

const Container = styled(motion.div)`
  width: 98vw;
  min-height: 100vh;
  color: white;
  display: flex;
  flex-wrap: wrap;
  padding: 1vw 0 0 1vw;
`;

const FlexCell = styled.div`
  padding: 1vw;
  width: 30%;
  height: 30vh;
  border-bottom: 1px solid #ffff;
  h2 {
    margin-bottom: 2rem;
  }
  h4 {
    margin-bottom: 1.3rem;
  }
  p {
    margin-bottom: 0.5rem;
  }
`;

export const ConsoleLink = styled(TableLink)`
  color: white;
`;

const Console = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    let res = [];
    let ref = collection(db, 'submitted');
    ref = query(ref);

    const unsub = onSnapshot(ref, (snapshot) => {
      snapshot.docs.map((doc) => {
        let single = doc._document.data.value.mapValue.fields;
        const tmp = find(res, { name: single.writer.stringValue });
        if (!tmp) {
          res.push({
            name: single.writer.stringValue,
            title: [
              {
                title: single.title.stringValue,
                id: doc.id,
              },
            ],
          });
        } else {
          res = res.filter((fil) => fil.name !== tmp.name);
          res.push({
            ...tmp,
            title: [
              ...tmp.title,
              {
                title: single.title.stringValue,
                id: doc.id,
              },
            ],
          });
        }
      });

      setUserList(res);
    });
    return () => unsub();
  }, []);

  return (
    <Container
      initial={{
        x: -5000,
        transition: { type: 'spring', duration: 0.6, delay: 0.1 },
      }}
      animate={{
        x: 0,
        transition: { type: 'spring', duration: 0.6, delay: 0.1 },
      }}
    >
      {userList.length > 0 &&
        userList.map((person) => {
          const total = person.title.length;
          return (
            <FlexCell key={person.name}>
              <h2>👩‍🌾 {person.name} 👩‍🌾</h2>
              <h4>{total} (정답 갯수)</h4>
              {person.title.map((title) => {
                return (
                  <ConsoleLink
                    key={title.title}
                    to={`/SubmittedSourceCode/${person.name}/${title.title}/${title.id}`}
                  >
                    <motion.p
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      📄 {title.title} ✅
                    </motion.p>
                  </ConsoleLink>
                );
              })}
            </FlexCell>
          );
        })}
    </Container>
  );
};

export default Console;
