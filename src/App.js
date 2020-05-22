import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Navbar from './Navbar';
import Home from './Pages/Home';
import Trending from './Pages/Trending';
import Discover from './Pages/Discover';
import Movie from './Pages/Movie';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/trending" component={Trending} />
          <Route exact path="/discover" component={Discover} />
          <Route exact path="/movie/:id" component={Movie} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
