import { BrowserRouter, Route } from 'react-router-dom';
import { Home, Solve, Result, Problems } from './pages/index';
import GlobalStyle from './GlobalStyle';
import { Navbar } from 'responsive-navbar-react';
import 'responsive-navbar-react/dist/index.css';

function App() {
  const props = {
    items: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: '문제',
        link: '/Problems',
      },
      {
        text: '제출내역',
        link: '#docs',
      },
    ],
    logo: {
      text: '멋쟁이 사자처럼 at 국민대 사전과제',
    },
    style: {
      barStyles: {
        background: '#444',
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
      </BrowserRouter>
    </>
  );
}

export default App;
