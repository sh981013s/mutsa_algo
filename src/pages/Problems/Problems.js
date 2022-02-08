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

const StyledTableCell = Styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#212325',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  '&:hover': {
    cursor: 'pointer',
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

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: end;
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

export const NewBtn = styled.button`
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

function createData(num, name) {
  return { num, name };
}

const rows = [
  createData(1, '별찍기'),
  createData(2, '별찍기'),
  createData(3, '별찍기'),
  createData(4, '별찍기'),
];

export default function Problems() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const tmp = [];
    let ref = collection(db, 'probs');
    ref = query(ref);

    const unsub = onSnapshot(ref, (snapshot) => {
      console.log(snapshot.docs, 'snap');
      // eslint-disable-next-line array-callback-return
      snapshot.docs.map((doc) => {
        let single = doc._document.data.value.mapValue.fields;
        tmp.push({
          title: single.title.stringValue,
          writer: single.writer.stringValue,
          instruction: single.instruction.stringValue,
        });
      });
      setProblems(tmp);
    });
    return () => unsub();
  }, []);

  return (
    <Container>
      <div>
        <TableContainer sx={{ width: '100%' }} component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">문제</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {problems.length > 0 &&
                problems.map((single) => (
                  <StyledTableRow key={single.title}>
                    <StyledTableCell align="center">
                      {single.title}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <StyledLink to="/newQuestion">
          <NewBtn>문제 등록</NewBtn>
        </StyledLink>
      </div>
    </Container>
  );
}
