import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Pokeball from './Pages/Pokeball';
import Pokelist from './Pages/Pokelist';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Pokelist} />
        <Route path='/my-pokemons' component={Pokeball} />
      </Switch>
    </BrowserRouter>
  )
}