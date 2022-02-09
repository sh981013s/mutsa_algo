import { useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useAuthContext } from '../../hooks/useAuthContext';
import { find } from 'lodash';
import styled from 'styled-components';
import { TableLink } from '../Problems/Problems';

const Container = styled.div`
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
                isCorrect: single.isCorrect.stringValue,
                id: doc.id,
              },
            ],
            cnt: single.isCorrect.stringValue === 'true' ? 1 : 0,
          });
        } else {
          res = res.filter((fil) => fil.name !== tmp.name);
          res.push({
            ...tmp,
            title: [
              ...tmp.title,
              {
                title: single.title.stringValue,
                isCorrect: single.isCorrect.stringValue,
                id: doc.id,
              },
            ],
            cnt:
              single.isCorrect.stringValue === 'true' ? tmp.cnt + 1 : tmp.cnt,
          });
        }
      });

      setUserList(res);
    });
    return () => unsub();
  }, []);

  return (
    <Container>
      {userList.length > 0 &&
        userList.map((person) => {
          const total = person.title.length;
          return (
            <FlexCell key={person.name}>
              <h2>👩‍🌾 {person.name}</h2>
              <h4>
                {person.cnt} / {total} (정답 / 총합)
              </h4>
              {person.title.map((title) => {
                if (title.isCorrect === 'true') {
                  return (
                    <ConsoleLink
                      key={title.title}
                      to={`/SubmittedDetail/${person.name}/${title.title}/${title.id}`}
                    >
                      <p>📄 {title.title} ✅</p>
                    </ConsoleLink>
                  );
                } else if (title.isCorrect === 'false') {
                  return (
                    <ConsoleLink
                      key={title.title}
                      to={`/SubmittedDetail/${person.name}/${title.title}/${title.id}`}
                    >
                      <p>📄 {title.title} ❌</p>
                    </ConsoleLink>
                  );
                } else {
                  return (
                    <ConsoleLink
                      key={title.title}
                      to={`/SubmittedDetail/${person.name}/${title.title}/${title.id}`}
                    >
                      <p>📄 {title.title}</p>
                    </ConsoleLink>
                  );
                }
              })}
            </FlexCell>
          );
        })}
    </Container>
  );
};

export default Console;
