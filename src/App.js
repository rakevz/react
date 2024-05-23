import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './Componentes/Navbar';

function App() {
  const [pokemones, setPokemones] = useState([]);

  useEffect(() => {
    const getPokemones = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
        const listaPokemones = await response.json();
        const { results } = listaPokemones;

        const newPokemones = results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const poke = await response.json();

          return {
            id: poke.id,
            name: poke.name,
            img: poke.sprites.other.dream_world.front_default || 'https://via.placeholder.com/150',
          };
        });

        setPokemones(await Promise.all(newPokemones));
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      }
    };

    getPokemones();
  }, []); // empty dependencies array to run only once

  return (
  <>
    <Navbar/>
    <div className="App">
      <h1>Pokédex</h1>
      
        {pokemones.map((pokemon) => {
          return (
            <div key={pokemon.id}>
              <img src={pokemon.img} alt={pokemon.name} />
              <p>{pokemon.name}</p>
              <span>{pokemon.id}</span>
            </div>
          );
        })}
    </div>
  </>
  );
}

export default App;