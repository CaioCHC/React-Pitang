import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Agendamento from './pages/Agendamento';
import Consulta from './pages/Consulta';

const routes = [{
  path: '/',
  component: Agendamento,
  name: 'Agendamento',
}, {
  path: '/Consulta',
  component: Consulta,
  name: 'Consulta',
}];

const Routes = () => (
  <BrowserRouter>
    <Navbar title="Sistema de agendamento" routes={routes} />
    <Switch>
      {routes.map(({ path, component }) => (
        <Route exact key={path} path={path} component={component} />
      ))}
    </Switch>
  </BrowserRouter>
);

export default Routes;
