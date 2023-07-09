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
import ErrorPage from './pages/ErrorPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='marvel' element={<Home />}></Route>
        <Route path='comics' element={<Comics />}></Route>
        <Route path='characters' element={<Characters />}></Route>
        <Route path='search' element={<SearchPage />}></Route>
        <Route path='characters/:id' element={<ItemPageCharacters />}></Route>
        <Route path='comics/:id' element={<ItemPageComics />}></Route>
        <Route path='*' element={<ErrorPage text='404 page not found' />}></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
