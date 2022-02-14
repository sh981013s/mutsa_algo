import { useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { find } from 'lodash';
import styled from 'styled-components';
import { TableLink } from '../Problems/Problems';
import { motion } from 'framer-motion';
import isProved from '../../utils/provedEmails';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { buttonScale, minusXAnimation } from '../../utils/constants/constants';

const Container = styled(motion.div)`
  width: 98vw;
  color: white;
  display: flex;
  flex-wrap: wrap;
  padding: 1vw 0 0 1vw;
`;

const FlexCell = styled.div`
  padding: 1vw;
  width: 30%;
  min-height: 30vh;
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
  const { user } = useAuthContext();
  const history = useHistory();
  const alert = useAlert();
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

  useEffect(() => {
    if (!isProved(user.email)) {
      const blockAlert = alert.error('😭 운영진만 접근이 허가됩니다.', {
        timeout: 8000,
      });
      history.push('/');
    }
  }, []);

  return (
    <Container
      initial={minusXAnimation.initial}
      animate={minusXAnimation.animate}
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
                    to={`/submitted-sourcecode/${person.name}/${title.title}/${title.id}`}
                  >
                    <motion.p
                      whileHover={buttonScale.whileHover}
                      whileTap={buttonScale.whileTap}
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
