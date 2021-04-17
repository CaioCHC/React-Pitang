import React from 'react';
import Routes from './routes';
import PagesContextProvider from './pagesContextProvider';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default () => (
  <PagesContextProvider>
    <App />
  </PagesContextProvider>
);
