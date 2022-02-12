import { useEffect, useRef, useState } from 'react';
import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
  getDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const useGetProbs = (c, _q) => {
  const [entireProbs, setEntireProbs] = useState([]);
  const [userSolvedProbs, setUserSolvedProbs] = useState([]);

  const q = useRef(_q).current;
  const userDisplayName = _q[2];

  // 전체문제 가져오기
  useEffect(() => {
    let ref = collection(db, 'probs');
    ref = query(ref);
    const allProbs = [];

    const unsub = onSnapshot(ref, (snapshot) => {
      // eslint-disable-next-line array-callback-return
      snapshot.docs.map((doc) => {
        let single = doc._document.data.value.mapValue.fields;
        allProbs.push({
          title: single.title.stringValue,
          writer: single.writer.stringValue,
          instruction: single.instruction.stringValue,
          id: doc.id,
        });
      });
      setEntireProbs(allProbs);
    });
    return () => unsub();
  }, []);

  // 유저가 푼 문제 가져오기
  useEffect(() => {
    let ref = collection(db, c);
    if (q && userDisplayName) {
      ref = query(ref, where(...q));
    }

    const unsub = onSnapshot(ref, (snapshot) => {
      const solvedArr = [];
      snapshot.docs.map((single) => {
        const singleTmpObj = {};
        singleTmpObj.title =
          single._document.data.value.mapValue.fields.title.stringValue;
        singleTmpObj.id = single.id;
        solvedArr.push(singleTmpObj);
      });
      setUserSolvedProbs(solvedArr);
    });
    return () => unsub();
  }, [c, q]);

  return { entireProbs, userSolvedProbs };
};

export default useGetProbs;
