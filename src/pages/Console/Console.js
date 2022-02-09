import { useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useAuthContext } from '../../hooks/useAuthContext';
import { find } from 'lodash';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  color: white;
  display: flex;
  flex-wrap: wrap;
  /*  justify-content: center;
  align-items: center;*/
  padding: 2rem;
`;

const FlexCell = styled.div`
  width: 33%;
  height: 30vh;
  border-bottom: 1px solid #ffff;
  h2 {
    margin-bottom: 2rem;
  }
  p {
    margin-bottom: 0.5rem;
  }
`;

const Console = () => {
  const { user } = useAuthContext();
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
              },
            ],
            cnt: 0,
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
              },
            ],
            cnt: tmp.cnt + 1,
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
              <p>
                {person.cnt} / {total} (정답 / 총합)
              </p>
              {person.title.map((title) => {
                if (title.isCorrect === 'true') {
                  return <p key={title.title}>📄 {title.title} ✅</p>;
                } else if (title.isCorrect === 'false') {
                  return <p key={title.title}>📄 {title.title} ❌</p>;
                } else {
                  return <p key={title.title}>📄 {title.title}</p>;
                }
              })}
            </FlexCell>
          );
        })}
    </Container>
  );
};

export default Console;
