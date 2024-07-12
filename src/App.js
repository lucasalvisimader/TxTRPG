// styles
import './App.css';
import './assets/custom/Color.css';

// react
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { ChapterOne } from './pages/chapterOne/ChapterOne';
import { Home } from './pages/home/Home';

function App() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Home />}/>
        <Route index path='/chapter-one-welcome-to-home' element={<ChapterOne />}/>
      </Routes>
    </BrowserRouter>
  </>);
}

export default App;
