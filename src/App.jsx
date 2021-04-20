import React from 'react';
import { ToastContainer } from 'react-toastify';
import Routes from './routes';
import PagesContextProvider from './pagesContextProvider';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default () => (
  <>
    <ToastContainer />
    <PagesContextProvider>
      <App />
    </PagesContextProvider>
  </>
);
