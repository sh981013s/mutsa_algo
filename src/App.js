import { BrowserRouter, Route, Router } from 'react-router-dom';
import { Home, Solve } from './pages/index';
import GlobalStyle from './GlobalStyle';

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/solve">
          <Solve />
        </Route>
      </BrowserRouter>
    </>
  );
}

export default App;
