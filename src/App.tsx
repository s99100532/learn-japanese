import React, { useState } from 'react';
import './styles/App.scss';
import CharacterImage from './components/CharacterImage';
import classNames from "classnames";
import Test from './pages/Test';
import { Characters } from './util/constants';


const Tabs = {
  Search: "Search",
  Test: "Test",
}


const App: React.FC = () => {

  const [filter, setFilter] = useState("");
  const [activeTab, setActiveTab] = useState(Tabs.Test);
  
  


  return (
    <div className="App">
      <div className="section">
        <div className="tabs">
          <ul>
            {
              Object.keys(Tabs).map(tab => <li className={classNames({
                "is-active": tab === activeTab
              })} onClick={() => setActiveTab(tab)}><a>{tab}</a></li>)
            }
          </ul>
        </div>
        {
          ((tab) => {
            switch (tab) {
              case Tabs.Search:
                return (
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
                )

              case Tabs.Test:
                return (
                  <Test />
                );
              default:
                return <div>XXX</div>;
            }
          })(activeTab)
        }
      </div>
    </div>
  );
}

export default App;
