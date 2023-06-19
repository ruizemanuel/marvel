import './App.css';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Comics from './pages/Comics';
import Characters from './pages/Characters';
import NavBar from './components/NavBar';
import ItemPageCharacters from './pages/ItemPageCharacters';
import ItemPageComics from './pages/ItemPageComics';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='comics' element={<Comics />}></Route>
        <Route path='characters' element={<Characters />}></Route>
        <Route path='characters/:id' element={<ItemPageCharacters />}></Route>
        <Route path='comics/:id' element={<ItemPageComics />}></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
