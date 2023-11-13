/// <reference types="jquery"/>
/* eslint-env jquery */

import { processData } from "./displayModule.js";
import { Pokemon } from "./pokemonClass.js";

export async function getPokemon(pokemonId) {
  const response = await fetch(pokemonId);
  return await response.json();
}

export async function getPokemonList(Url, showPokemonListCallback) {
  const localStorageKey = `pokemonData_${Url}`; 
  const cachedData = getCachedData(localStorageKey);

  if (cachedData) {
    console.log('Datos en cache');
    processData(cachedData, showPokemonListCallback);
  } else {
    const pokemonListJsonData = await fetchPokemonList(Url);
    const promisesResponses = await Promise.all(pokemonListJsonData.results.map(result => getPokemon(result.url)));
    
    const combinedData ={
  results: pokemonListJsonData.results,
  responses: promisesResponses.map(response=>new Pokemon(response.name, response.sprites, response.types, response.stats)),
};

    saveDataToLocalStorage(localStorageKey, combinedData);
    processData(combinedData, showPokemonListCallback);
  }
}

function getCachedData(key) {
  const cachedData = localStorage.getItem(key);
  return cachedData ? JSON.parse(cachedData) : null;
}

export async function fetchPokemonList(url) {
  const response = await fetch(url);
  return await response.json();
}

export function saveDataToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}



