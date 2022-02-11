import * as React from 'react';
import { styled as Styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import isProved from '../../utils/provedEmails';
import { useAuthContext } from '../../hooks/useAuthContext';
import { motion } from 'framer-motion';

const StyledTableCell = Styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#212325',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = Styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTable = Styled(TableContainer)(({ theme }) => ({
  '&': {
    boxShadow: '6px 5px 15px 1px #898989',
  },
}));

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: end;
  div {
    color: white;
    h1 {
      font-size: 2rem;
      margin-bottom: 2rem;
      text-align: center;
    }
    p {
      font-size: 1rem;
      margin-bottom: 2rem;
      text-align: end;
    }
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export const NewBtn = styled(motion.button)`
  width: 8rem;
  height: 2.3rem;
  margin-top: 1rem;
  background: rgba(0, 0, 0, 0.49);
  color: white;
  border-radius: 2rem;
  &:hover {
    cursor: pointer;
  }
`;

export const TableLink = styled(StyledLink)`
  color: black;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export default function Problems() {
  const { user } = useAuthContext();
  const [problems, setProblems] = useState([]);
  const [solvedProbs, setSolvedProbs] = useState([]);

  // 전체문제 가져오기
  useEffect(() => {
    const tmp = [];
    let ref = collection(db, 'probs');
    ref = query(ref);
    const unsub = onSnapshot(ref, (snapshot) => {
      // eslint-disable-next-line array-callback-return
      snapshot.docs.map((doc) => {
        let single = doc._document.data.value.mapValue.fields;
        tmp.push({
          title: single.title.stringValue,
          writer: single.writer.stringValue,
          instruction: single.instruction.stringValue,
          id: doc.id,
        });
      });
      setProblems(tmp);
    });
    return () => unsub();
  }, []);

  // 유저가 푼 문제들
  useEffect(() => {
    if (user) {
      let ref = collection(db, 'submitted');
      ref = query(ref, where('writer', '==', user.displayName));
      const unsub = onSnapshot(ref, (snapshot) => {
        const solvedArr = [];
        snapshot.docs.map((single) => {
          const singleTmpObj = {};
          singleTmpObj.title =
            single._document.data.value.mapValue.fields.title.stringValue;
          singleTmpObj.id = single.id;
          solvedArr.push(singleTmpObj);
        });
        setSolvedProbs(solvedArr);
      });
      return () => unsub();
    }
  }, []);

  return (
    <Container>
      <motion.div
        initial={{
          x: -5000,
          transition: { type: 'spring', duration: 0.6, delay: 0.1 },
        }}
        animate={{
          x: 0,
          transition: { type: 'spring', duration: 0.6, delay: 0.1 },
        }}
      >
        <h1>📄 전체 문제</h1>
        <p>✅ = '통과'</p>
        <StyledTable sx={{ width: '100%' }} component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">문제</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {problems.length > 0 &&
                problems.map((single) => {
                  if (
                    solvedProbs.filter((e) => e.title === single.title).length >
                    0
                  ) {
                    const tmp = solvedProbs.filter(
                      (e) => e.title === single.title
                    );
                    return (
                      <StyledTableRow key={single.title}>
                        <StyledTableCell align="center">
                          <TableLink
                            to={`/SubmittedSourceCode/${user.displayName}/${single.title}/${tmp[0].id}`}
                          >
                            <span>{single.title} ✅</span>
                          </TableLink>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  } else {
                    return (
                      <StyledTableRow key={single.title}>
                        <StyledTableCell align="center">
                          <TableLink to={`/solve/${single.title}`}>
                            {single.title}
                          </TableLink>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  }
                })}
            </TableBody>
          </Table>
        </StyledTable>
        {isProved(user?.email) && (
          <StyledLink to="/new-question">
            <NewBtn whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              문제 등록
            </NewBtn>
          </StyledLink>
        )}
      </motion.div>
    </Container>
  );
}
