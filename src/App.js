import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import {
  Home,
  Solve,
  Result,
  Problems,
  NewQuestion,
  Login,
  Submitted,
  SubmittedDetail,
  Console,
  SetDisplayName,
} from './pages/index';
import GlobalStyle from './GlobalStyle';
import { Navbar } from 'responsive-navbar-react';
import 'responsive-navbar-react/dist/index.css';
import styled from 'styled-components';
import { useAuthContext } from './hooks/useAuthContext';
import isProved from './utils/provedEmails';
import { useEffect, useState } from 'react';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #2a2b2d;
`;

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
      link: '/submitted',
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

function App() {
  const { user, authIsReady } = useAuthContext();
  const [menu, setMenu] = useState(props);

  useEffect(() => {
    if (user) {
      if (isProved(user.email)) {
        setMenu({
          ...props,
          items: [
            ...props.items,
            { text: '✅ 전체 제출내역', link: '/Console' },
          ],
        });
      }
    }
  }, [user]);

  return (
    <>
      <GlobalStyle />
      <Navbar {...menu} />
      <Container>
        {authIsReady && (
          <BrowserRouter>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/problems">
              {!user && <Redirect to="/login" />}
              {!user?.displayName.includes('20') && (
                <Redirect to="/setdisplayname" />
              )}
              <Problems />
            </Route>
            <Route exact path="/solve/:title">
              {!user && <Redirect to="/login" />}
              {!user?.displayName.includes('20') && (
                <Redirect to="/setdisplayname" />
              )}
              <Solve />
            </Route>
            <Route exact path="/result">
              {!user && <Redirect to="/login" />}
              {!user?.displayName.includes('20') && (
                <Redirect to="/setdisplayname" />
              )}
              <Result />
            </Route>
            <Route exact path="/newQuestion">
              {!user && <Redirect to="/login" />}
              {!user?.displayName.includes('20') && (
                <Redirect to="/setdisplayname" />
              )}
              <NewQuestion />
            </Route>
            <Route exact path="/login">
              {user && <Redirect to="/" />}
              <Login />
            </Route>
            <Route exact path="/submitted">
              {!user && <Redirect to="/login" />}
              {!user?.displayName.includes('20') && (
                <Redirect to="/setdisplayname" />
              )}
              <Submitted />
            </Route>
            <Route exact path="/SubmittedDetail/:name/:title/:id">
              {!user && <Redirect to="/login" />}
              {!user?.displayName.includes('20') && (
                <Redirect to="/setdisplayname" />
              )}
              <SubmittedDetail />
            </Route>
            <Route exact path="/console">
              {!isProved(user?.email) && <Redirect to="/" />}
              {!user?.displayName.includes('20') && (
                <Redirect to="/setdisplayname" />
              )}
              <Console />
            </Route>
            <Route exact path="/setdisplayname">
              {!user && <Redirect to="/login" />}
              <SetDisplayName />
            </Route>
          </BrowserRouter>
        )}
      </Container>
    </>
  );
}

export default App;
