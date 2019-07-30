import React from 'react';
import heroes from './assets/heroes'
import Hero from './components/Hero'
import Battle from './components/Battle'


let showHeroes = () => {
  return heroes.map(hero => {
    return <Hero hero={hero} />;
  });
};

function App() {
  return (
    <div className="App">
      {showHeroes()}
      <Battle />
    </div>
  );
}

export default App;
