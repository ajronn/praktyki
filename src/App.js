import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Header, Home, AddForm } from './components'

import './index.css'

function App() {
  return (
    <Router>
      <div className='container'>
        <Header />
        <Switch>
          <Router path='/form'><AddForm /></Router>
          <Route path='/'><Home /></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
