import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MarvelProvider } from './MarvelContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MarvelProvider>
    <App />
    </MarvelProvider>
  </React.StrictMode>
);

reportWebVitals();
