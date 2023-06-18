import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='comics' element={<Comics/>}></Route>
        <Route path='characters' element={<Characters/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
