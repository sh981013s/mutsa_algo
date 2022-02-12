import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NewBtn, StyledLink } from '../Problems/Problems';
import { useAuthContext } from '../../hooks/useAuthContext';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import MarkdownEditor from '../../components/NewQuestion/MarkdownEditor';
import MarkdownPreview from '../../components/NewQuestion/MarkdownPreview';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

const Panel = styled.div`
  display: flex;
  position: relative;
`;

export const Left = styled(Panel)`
  width: 50%;
  background-color: rgb(38, 50, 56);
  flex-direction: column;
  height: 92vh;
`;

export const Right = styled(Panel)`
  width: 50%;
  background-color: #fff;
  height: 92vh;
`;

export const TitleContainer = styled.div`
  position: relative;
  z-index: 15;
  height: 8vh;
  display: flex;
  color: #fff;
  background-color: rgb(52, 58, 64);
  width: 100%;
  input {
    background-color: rgba(0, 0, 0, 0);
    color: #fff;
    border-style: none;
    outline: none;
    font-size: 1.25rem;
    width: 100%;
  }
`;

const TestContainer = styled.div`
  position: relative;
  z-index: 15;
  height: 35vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  color: #fff;
  background-color: rgb(52, 58, 64);
  width: 100%;
  div {
    display: flex;
    //margin: 1rem;
    width: 100%;
    span {
      font-size: 1rem;
      margin-right: 0.5rem;
    }
    div {
      display: flex;
      width: 50%;
      align-items: center;
    }
  }
`;

const MdEditor = styled(MarkdownEditor)`
  height: 45vh;
`;

const NewQuestion = () => {
  const history = useHistory();
  const { user } = useAuthContext();
  const [value, setValue] = useState(
    `List 형태나 Object 형태는 테스트케이스로 불가능합니다. </br> 
    ex) 1 or 멋사 </br>
    테스트값의 default type 은 string 입니다.</br>
    만약 number 를 넣고싶다면 꼭 체크해주세요!</br>
    문제 등록 전 꼭 제목, 본문, 인풋들과 아웃풋이 채워져있는지 확인해주세용</br>
    체크박스는 number 일때만 '선택'입니다.
    `
  );
  const [title, setTitle] = useState('제목을 입력해주세요');
  const [testInputOne, setTestInputOne] = useState('');
  const [testInputTwo, setTestInputTwo] = useState('');

  const [testOutputOne, setTestOutputOne] = useState('');
  const [testOutputTwo, setTestOutputTwo] = useState('');

  const [testInputOneCheck, setTestInputOneCheck] = useState(false);
  const [testInputTwoCheck, setTestInputTwoCheck] = useState(false);

  const [testOutputOneCheck, setTestOutputOneCheck] = useState(false);
  const [testOutputTwoCheck, setTestOutputTwoCheck] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const submitProb = async () => {
    await addDoc(collection(db, 'probs/'), {
      writer: user.displayName,
      title: title,
      instruction: value,
      test1Input: testInputOneCheck
        ? Number(testInputOne)
        : testInputOne.toString(),
      test2Input: testInputTwoCheck
        ? Number(testInputTwo)
        : testInputTwo.toString(),
      test1Output: testOutputOneCheck
        ? Number(testOutputOne)
        : testOutputOne.toString(),
      test2Output: testOutputTwoCheck
        ? Number(testOutputTwo)
        : testOutputTwo.toString(),
    });
    history.push('/problems');
  };

  return (
    <Container>
      <Left>
        <TitleContainer>
          <input type="text" placeholder={title} onChange={handleTitleChange} />
          <StyledLink to="/new-question">
            <NewBtn
              onClick={submitProb}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              문제 등록
            </NewBtn>
          </StyledLink>
        </TitleContainer>
        <MdEditor body={value} edit={setValue} />
        <TestContainer>
          <div>
            <div>
              <span>📄Input 1 :</span>
              <motion.input
                onChange={(e) => setTestInputOne(e.target.value)}
                type="text"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            </div>
            <div>
              <span>🔢 number :</span>
              <motion.input
                type="checkbox"
                onChange={() => {
                  setTestInputOneCheck(!testInputOneCheck);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            </div>
          </div>
          <div>
            <div>
              <span>✅Output 1 :</span>
              <motion.input
                onChange={(e) => setTestOutputOne(e.target.value)}
                type="text"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            </div>
            <div>
              <span>🔢 number :</span>
              <motion.input
                type="checkbox"
                onChange={() => {
                  setTestOutputOneCheck(!testOutputOneCheck);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            </div>
          </div>
          <div>
            <div>
              <span>📄Input 2 :</span>
              <motion.input
                onChange={(e) => setTestInputTwo(e.target.value)}
                type="text"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            </div>
            <div>
              <span>🔢 number :</span>
              <motion.input
                type="checkbox"
                onChange={() => {
                  setTestInputTwoCheck(!testInputTwoCheck);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            </div>
          </div>
          <div>
            <div>
              <span>✅Output 2 :</span>
              <motion.input
                onChange={(e) => setTestOutputTwo(e.target.value)}
                type="text"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            </div>
            <div>
              <span>🔢 number :</span>
              <motion.input
                type="checkbox"
                onChange={() => {
                  setTestOutputTwoCheck(!testOutputTwoCheck);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            </div>
          </div>
        </TestContainer>
      </Left>
      <Right>
        <MarkdownPreview title={title} body={value} />
      </Right>
    </Container>
  );
};

export default NewQuestion;
