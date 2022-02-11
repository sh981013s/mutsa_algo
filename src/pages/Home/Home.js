import styled from 'styled-components';
import logo from '../../assets/imgs/logo.png';
import { motion } from 'framer-motion';

const Container = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  letter-spacing: 0.1rem;
  line-height: 2rem;
  color: white;

  div {
    margin-top: 20rem;
    p {
      font-size: 1.5rem;
      margin-bottom: 2rem;
    }
  }

  img {
    width: 20%;
    height: 20%;
    display: block;
    margin-bottom: 2rem;
  }
`;

const Last = styled(motion.p)`
  margin-top: 3rem;
`;

const Link = styled(motion.a)`
  margin-top: 3rem;
  color: yellow;
  text-decoration: none;
  border: 1px solid #fff;
  border-radius: 2rem;
  padding: 0 1rem;
`;

const Home = () => {
  return (
    <Container>
      <motion.div
        initial={{
          x: -500,
          transition: { type: 'spring', duration: 1.5, delay: 1 },
        }}
        animate={{
          x: 0,
          transition: { type: 'spring', duration: 1.5, delay: 1 },
        }}
      >
        <motion.img src={logo} alt="main-logo" />
        <motion.p
          initial={{
            x: -1000,
            transition: { type: 'spring', duration: 1.5, delay: 1 },
          }}
          animate={{
            x: 0,
            transition: { type: 'spring', duration: 1.5, delay: 1 },
          }}
        >
          안녕하세요 멋쟁이사자처럼 at 국민대학교에 지원해주셔서 감사합니다!
          <br /> '📄문제' 섹션에 가셔서 기제된 문제들을 푸시면 되겠습니다. 🙇‍♂
          <br />
        </motion.p>
        <motion.p
          initial={{
            x: -1000,
            transition: { type: 'spring', duration: 1.5, delay: 1 },
          }}
          animate={{
            x: 0,
            transition: { type: 'spring', duration: 1.5, delay: 1 },
          }}
        >
          한번 제출한 코드는 '✅전체 제출내역' 에서 '제출한 코드 확인' 후 <br />
          '❌삭제' 이후에 '😲재시도'가 가능합니다
        </motion.p>
        <Last
          initial={{
            x: -1000,
            transition: { type: 'spring', duration: 1.5, delay: 1 },
          }}
          animate={{
            x: 0,
            transition: { type: 'spring', duration: 1.5, delay: 1 },
          }}
        >
          문의: 010-9302-1013 이승환 <br />
        </Last>
        <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link href="https://open.kakao.com/o/sVpSIOYd/" target="blank">
            1:1 오픈챗 문의 👍
          </Link>
        </motion.span>
      </motion.div>
    </Container>
  );
};

export default Home;
