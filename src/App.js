import './App.css';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Comics from './pages/Comics';
import Characters from './pages/Characters';
import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='comics' element={<Comics />}></Route>
        <Route path='characters' element={<Characters />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
