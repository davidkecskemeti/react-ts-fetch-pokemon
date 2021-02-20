import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { fetchPokemon, PokemonData } from "./PokemonService";
import { stringify } from "querystring";

function App() {
  const [pokemon, setPokemon] = useState<PokemonData | undefined>();

  useEffect(() => {
    fetchPokemon("pikachu").then((poke) => {
      setPokemon(poke);
    });
  }, []);

  return (
    <div className="App">
      <div>{JSON.stringify(pokemon)}</div>
    </div>
  );
}

export default App;
