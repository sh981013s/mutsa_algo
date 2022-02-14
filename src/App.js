import { Redirect, Route, Switch } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import { Navbar } from 'responsive-navbar-react';
import 'responsive-navbar-react/dist/index.css';
import styled from 'styled-components';
import { useAuthContext } from './hooks/useAuthContext';
import isProved from './utils/provedEmails';
import { menuProps } from './utils/constants/constants';
import { WaveLoading } from 'react-loadingg';
import { lazy, Suspense } from 'react';

// components
const Home = lazy(() => import('./pages/Home/Home'));
const Solve = lazy(() => import('./pages/Solve/Solve'));
const Problems = lazy(() => import('./pages/Problems/Problems'));
const NewQuestion = lazy(() => import('./pages/NewQuestion/NewQuestion'));
const Login = lazy(() => import('./pages/Login/Login'));
const Submitted = lazy(() => import('./pages/Submitted/Submitted'));
const Console = lazy(() => import('./pages/Console/Console'));
const SetDisplayName = lazy(() =>
  import('./pages/SetDisplayName/SetDisplayName')
);
const SubmittedSourceCode = lazy(() =>
  import('./pages/SubmittedSourceCode/SubmittedSourceCode')
);

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #2a2b2d;
`;

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <>
      <GlobalStyle />
      <Navbar {...menuProps} />
      <Container>
        <Suspense fallback={<WaveLoading />}>
          {authIsReady && (
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/problems">
                {!user ? (
                  <Redirect to="/login" />
                ) : !user?.displayName.includes('20') ? (
                  <Redirect to="/setdisplayname" />
                ) : (
                  <Problems />
                )}
              </Route>
              <Route exact path="/solve/:title">
                {!user ? (
                  <Redirect to="/login" />
                ) : !user?.displayName.includes('20') ? (
                  <Redirect to="/setdisplayname" />
                ) : (
                  <Solve />
                )}
              </Route>
              <Route path="/new-question/:id?">
                {!user ? (
                  <Redirect to="/login" />
                ) : !user?.displayName.includes('20') ? (
                  <Redirect to="/setdisplayname" />
                ) : !isProved(user?.email) ? (
                  <Redirect to="/" />
                ) : (
                  <NewQuestion />
                )}
              </Route>
              <Route exact path="/login">
                {!user && <Login />}
                {user && !user?.displayName.includes('20') && (
                  <SetDisplayName />
                )}
                <Problems />
              </Route>
              <Route exact path="/submitted">
                {!user ? (
                  <Redirect to="/login" />
                ) : user && !user?.displayName.includes('20') ? (
                  <Redirect to="/setdisplayname" />
                ) : (
                  <Submitted />
                )}
              </Route>
              <Route exact path="/submitted-sourcecode/:name/:title/:id">
                {!user ? (
                  <Redirect to="/login" />
                ) : !user?.displayName.includes('20') ? (
                  <Redirect to="/setdisplayname" />
                ) : (
                  <SubmittedSourceCode />
                )}
              </Route>
              <Route exact path="/admin">
                {!user ? (
                  <Redirect to="/login" />
                ) : !user?.displayName.includes('20') ? (
                  <Redirect to="/setdisplayname" />
                ) : (
                  <Console />
                )}
              </Route>
              <Route exact path="/setdisplayname">
                {!user ? <Redirect to="/login" /> : <SetDisplayName />}
              </Route>
            </Switch>
          )}
        </Suspense>
      </Container>
    </>
  );
}

export default App;
