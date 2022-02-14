import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NewBtn, StyledLink } from '../Problems/Problems';
import { useAuthContext } from '../../hooks/useAuthContext';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import MarkdownEditor from '../../components/NewQuestion/MarkdownEditor';
import { useHistory, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAlert } from 'react-alert';
import { buttonScale, butttonScale } from '../../utils/constants/constants';

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
  width: 100%;
  background-color: rgb(38, 50, 56);
  flex-direction: column;
  height: 92vh;
  .w-md-editor {
    height: 60vh !important;
  }
  .w-md-editor-content {
    height: 100% !important;
  }
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
  justify-content: start;
  padding-left: 3rem;
  color: #fff;
  background-color: rgb(52, 58, 64);
  width: 100%;
  div {
    display: flex;
    width: 60%;
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
  height: 60vh;
`;

const NewQuestion = () => {
  const history = useHistory();
  const alert = useAlert();
  const { user } = useAuthContext();
  const { id } = useParams();
  const [value, setValue] = useState(
    `### 문제등록 및 수정은 'Markdown' 형식으로 작성해주세요.

### List 형태나 Object 형태는 테스트케이스로 불가능합니다.  

     - ex) 1 or 멋사

     - 테스트값의 default type 은 string 입니다.

     - 만약 number 를 넣고싶다면 꼭 체크해주세요!

     - 문제 등록 전 꼭 제목, 본문, 인풋들과 아웃풋이 채워져있는지 확인해주세용

     - 체크박스는 number 일때만 '선택'입니다.
    `
  );

  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState('');
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

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
    }
  }, []);

  useEffect(() => {
    if (isEditMode) {
      const tmp = async () => {
        const docRef = doc(db, 'probs', id);
        const docSnap = await getDoc(docRef);
        const data = await docSnap.data();
        setTitle(data.title);
        setValue(data.instruction);
        setTestInputOne(data.test1Input);
        setTestInputOneCheck(typeof data.test1Input === 'number');
        setTestInputTwo(data.test2Input);
        setTestInputTwoCheck(typeof data.test2Input === 'number');
        setTestOutputOne(data.test1Output);
        setTestOutputOneCheck(typeof data.test1Output === 'number');
        setTestOutputTwo(data.test2Output);
        setTestOutputTwoCheck(typeof data.test2Output === 'number');
      };
      tmp();
    }
  }, [isEditMode]);

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
    const success = alert.success('문제 등록 완료!', {
      timeout: 8000,
    });
    history.push('/problems');
  };

  const editProb = async () => {
    const existingProb = doc(db, 'probs', id);
    await updateDoc(existingProb, {
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
    const success = alert.success('문제 수정 완료!', {
      timeout: 8000,
    });
    history.push('/problems');
  };

  return (
    <Container>
      <Left>
        <TitleContainer>
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            value={title ? title : null}
            onChange={handleTitleChange}
          />
          {isEditMode ? (
            <StyledLink to="/new-question">
              <NewBtn
                onClick={editProb}
                whileHover={buttonScale.whileHover}
                whileTap={buttonScale.whileTap}
              >
                문제 수정 완료
              </NewBtn>
            </StyledLink>
          ) : (
            <StyledLink to="/new-question">
              <NewBtn
                onClick={submitProb}
                whileHover={buttonScale.whileHover}
                whileTap={buttonScale.whileTap}
              >
                문제 등록
              </NewBtn>
            </StyledLink>
          )}
        </TitleContainer>
        <MdEditor body={value} edit={setValue} height={500} />
        <TestContainer>
          <div>
            <div>
              <span>📄Input 1 :</span>
              <motion.input
                onChange={(e) => setTestInputOne(e.target.value)}
                type="text"
                whileHover={buttonScale.whileHover}
                whileTap={buttonScale.whileTap}
                value={testInputOne}
              />
            </div>
            <div>
              <span>🔢 isNumber :</span>
              <motion.input
                type="checkbox"
                onChange={() => {
                  setTestInputOneCheck(!testInputOneCheck);
                }}
                whileHover={buttonScale.whileHover}
                whileTap={buttonScale.whileTap}
                checked={testInputOneCheck}
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
                value={testOutputOne}
              />
            </div>
            <div>
              <span>🔢 isNumber :</span>
              <motion.input
                type="checkbox"
                onChange={() => {
                  setTestOutputOneCheck(!testOutputOneCheck);
                }}
                whileHover={buttonScale.whileHover}
                whileTap={buttonScale.whileTap}
                checked={testOutputOneCheck}
              />
            </div>
          </div>
          <div>
            <div>
              <span>📄Input 2 :</span>
              <motion.input
                onChange={(e) => setTestInputTwo(e.target.value)}
                type="text"
                whileHover={buttonScale.whileHover}
                whileTap={buttonScale.whileTap}
                value={testInputTwo}
              />
            </div>
            <div>
              <span>🔢 isNumber :</span>
              <motion.input
                type="checkbox"
                onChange={() => {
                  setTestInputTwoCheck(!testInputTwoCheck);
                }}
                whileHover={buttonScale.whileHover}
                whileTap={buttonScale.whileTap}
                checked={testInputTwoCheck}
              />
            </div>
          </div>
          <div>
            <div>
              <span>✅Output 2 :</span>
              <motion.input
                onChange={(e) => setTestOutputTwo(e.target.value)}
                type="text"
                whileHover={buttonScale.whileHover}
                whileTap={buttonScale.whileTap}
                value={testOutputTwo}
              />
            </div>
            <div>
              <span>🔢 isNumber :</span>
              <motion.input
                type="checkbox"
                onChange={() => {
                  setTestOutputTwoCheck(!testOutputTwoCheck);
                }}
                whileHover={buttonScale.whileHover}
                whileTap={buttonScale.whileTap}
                checked={testOutputTwoCheck}
              />
            </div>
          </div>
        </TestContainer>
      </Left>
    </Container>
  );
};

export default NewQuestion;
