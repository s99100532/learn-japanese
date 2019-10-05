import React, { useState } from 'react';
import './styles/App.scss';
import CharacterImage from './components/CharacterImage';

import Test from './pages/Test';
import { Characters, Tabs } from './util/constants';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Navbar from './components/Navbar';
import Gallery from './pages/Gallery';



const App: React.FC = () => {

  const [filter, setFilter] = useState("");




  return (
    <Router>
      <div className="App">
        <div className="section">
          <Navbar />
          <Switch>
            <Route path={`/${Tabs.Search}`}>
              <div className="container">
                <div className="field">
                  <div className="control">
                    <input className="input" onChange={e => setFilter(e.currentTarget.value)} value={filter}></input>
                  </div>
                </div>
                <div className="box">
                  <div className="columns is-mobile is-multiline">
                    {
                      Characters.filter(char => char.indexOf(filter.trim().toLowerCase()) === 0).map(char => <div key={char} className="column is-3 is-4-mobile">
                        <CharacterImage char={char} />
                      </div>)
                    }
                  </div>
                </div>
              </div>

            </Route>
            <Route path={`/${Tabs.Test}`}>
              <Test />
            </Route>
            <Route path={`/${Tabs.Gallery}`}>
              <Gallery />
            </Route>
            <Redirect to={`/${Tabs.Search}`}/>>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
