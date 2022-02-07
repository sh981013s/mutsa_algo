import styled from 'styled-components';
import logo from '../../assets/imgs/logo.png';

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

  img {
    width: 20%;
    height: 20%;
    display: block;
    margin-bottom: 2rem;
  }
`;

const Home = () => {
  return (
    <Container>
      <div>
        <img src={logo} alt="" />
        <p>
          안녕하세요 멋쟁이사자처럼 at 국민대학교에 지원해주셔서 감사합니다!
          <br /> 로그인 후 문제 섹션에 가셔서 기제된 문제들을 푸시면 되겠습니다.
          🙇‍♂️
        </p>
      </div>
    </Container>
  );
};

export default Home;
