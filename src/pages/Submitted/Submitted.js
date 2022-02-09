import { useLogout } from '../../hooks/useLogout';
import styled from 'styled-components';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useHistory } from 'react-router-dom';
import { ConsoleLink } from '../Console/Console';
import { find } from 'lodash';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  width: 80%;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #31302c;
  color: white;
  border-radius: 3rem;
  -webkit-box-shadow: 6px 5px 15px 1px rgba(255, 217, 84, 0.72);
  box-shadow: 6px 5px 15px 1px rgba(255, 217, 84, 0.72);
`;

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
`;

const InnerBox = styled.div`
  width: 50vw;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #31302c;
  color: white;
  border-radius: 3rem;
  text-align: center;
  hr {
    margin-bottom: 3rem;
  }
`;

const LogoutBtn = styled.button`
  color: white;
  background: #9ac060;
  width: 5rem;
  height: 3rem;
  border: 1px solid #ffff;
  border-radius: 3rem;
  &:hover {
    cursor: pointer;
  }
`;

const Submitted = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const history = useHistory();
  const [submittedProbs, setSubmittedProbs] = useState([]);

  useEffect(() => {
    let res = [];
    let ref = collection(db, 'submitted');
    ref = query(ref, where('writer', '==', user?.displayName));

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
          });
        }
      });

      setSubmittedProbs(res);
    });
    return () => unsub();
  }, []);

  const logoutFunc = async () => {
    await logout();
    history.push('/');
  };

  return (
    <Container>
      <Card>
        <div>
          <Title>
            안녕하세요! {user && user?.displayName}님 😆{' '}
            <LogoutBtn onClick={logoutFunc}>로그아웃</LogoutBtn>
          </Title>
          <InnerBox>
            <div>
              <p>📜 제출완료 문제</p>
              <hr />
              {submittedProbs[0] &&
                submittedProbs[0].title.map((item) => {
                  return (
                    <ConsoleLink
                      key={item.id}
                      to={`/SubmittedSourceCode/${user.displayName}/${item.title}/${item.id}`}
                    >
                      <p>👍 {item.title}</p>
                    </ConsoleLink>
                  );
                })}
            </div>
          </InnerBox>
        </div>
      </Card>
    </Container>
  );
};

export default Submitted;
