import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '../shared';

import './App.css';
import { GamePage, MainPage } from '../pages';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path={'/'} element={<MainPage />} />
            <Route path={'/game'} element={<GamePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
