import { BrowserRouter, Route } from 'react-router-dom';
import {
  Home,
  Solve,
  Result,
  Problems,
  NewQuestion,
  Login,
  Submitted,
} from './pages/index';
import GlobalStyle from './GlobalStyle';
import { Navbar } from 'responsive-navbar-react';
import 'responsive-navbar-react/dist/index.css';
import styled from 'styled-components';
import { useAuthContext } from './hooks/useAuthContext';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #2a2b2d;
`;

function App() {
  const { user, authIsReady } = useAuthContext();

  const props = {
    items: [
      {
        text: 'Home 🏠',
        link: '/',
      },
      {
        text: '문제 📄',
        link: '/Problems',
      },
      {
        text: '제출내역 🙋🏻‍♂️',
        link: '/Submitted',
      },
    ],
    logo: {
      text: '🦁 멋쟁이 사자처럼 at 국민대 사전과제',
    },
    style: {
      barStyles: {
        background: '#212325',
      },
      sidebarStyles: {
        background: '#222',
        buttonColor: 'white',
      },
    },
  };

  return (
    <>
      <GlobalStyle />
      <Navbar {...props} />
      <Container>
        {authIsReady && (
          <BrowserRouter>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/problems">
              <Problems />
            </Route>
            <Route exact path="/solve">
              <Solve />
            </Route>
            <Route exact path="/result">
              <Result />
            </Route>
            <Route exact path="/newQuestion">
              <NewQuestion />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/Submitted">
              <Submitted />
            </Route>
          </BrowserRouter>
        )}
      </Container>
    </>
  );
}

export default App;
