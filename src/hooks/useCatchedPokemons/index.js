import { useState, useEffect } from 'react';

export const useCatchedPokemons = () => {
  const pokemons = JSON.parse(localStorage.getItem('pokemons')) || [];
  const [catchedPokemons, setCatchedPokemons] = useState(pokemons);

  useEffect(() => {
    localStorage.setItem('pokemons', JSON.stringify(catchedPokemons));
  }, [catchedPokemons])

  const catchPokemon = (pokemonUrl) => {
    setCatchedPokemons(prevState => [...prevState, pokemonUrl]);
  }
  
  const dropPokemon = (pokemonUrl) => {
    setCatchedPokemons(prevState => prevState.filter(url => url !== pokemonUrl))
  }

  const isCatchedPokemon = (url) => {
    return catchedPokemons.includes(url);
  }

  return {
    catchedPokemons,
    catchPokemon,
    dropPokemon,
    isCatchedPokemon,
  }
}