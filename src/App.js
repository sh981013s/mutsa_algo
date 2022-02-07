import { BrowserRouter, Route } from 'react-router-dom';
import { Home, Solve, Result } from './pages/index';
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
        <Route exact path="/result">
          <Result />
        </Route>
      </BrowserRouter>
    </>
  );
}

export default App;
