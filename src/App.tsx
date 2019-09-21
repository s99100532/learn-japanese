import React, { useState } from 'react';
import './App.scss';
import CharacterImage from './components/CharacterImage';

const characters = [
  "a", "hi", "ki", "mi", "ni", "o", "ru", "su", "tsu", "yu",
  "e", "ho", "ko", "mo", "no", "ra", "sa", "ta", "u",
  "fu", "i", "ku", "mu", "_n", "re", "se", "te", "_wa",
  "ha", "ka", "ma", "na", "nu", "ri", "si", "ti", "ya",
  "he", "ke", "me", "ne", "_o", "ro", "so", "to", "yo",
];


const App: React.FC = () => {

  const [filter, setFilter] = useState("");


  return (
    <div className="App">
      <div className="section">
        <div className="container">
          <div className="field">
            <div className="control">
              <input className="input" onChange={e => setFilter(e.currentTarget.value)} value={filter}></input>
            </div>
          </div>
          <div className="box">
            <div className="columns is-mobile is-multiline">
              {
                characters.filter(char => char.indexOf(filter.trim().toLowerCase()) === 0).map(char => <div key={char} className="column is-3 is-4-mobile">
                  <CharacterImage  char={char} />
                  </div>)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
