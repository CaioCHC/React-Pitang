import React from 'react';
import Routes from './routes';
import PagesContextProvider from './pagesContextProvider';

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
