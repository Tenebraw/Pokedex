/// <reference types="jquery"/>
/* eslint-env jquery */

import { makingRequest } from './requestModule.js';
import { showPokemonDetails, showPokemonList } from './displayModule.js';
import { nextPage, previousPage, searchPokemon } from './paginationModule.js';

const arrayRequests = [];
const i = 0;
const TOTAL_POKEMONS = 1260;
for (let j = 0; j <= TOTAL_POKEMONS; j += 20) {
  arrayRequests.push(`https://pokeapi.co/api/v2/pokemon/?offset=${j}&limit=20`);
}
const urlPokemon = arrayRequests[i];

// Event Manager

async function startPokedex() {
  showPokemonDetails();
  await makingRequest(urlPokemon, showPokemonList);
  nextPage(arrayRequests);
  previousPage(arrayRequests);
  searchPokemon(arrayRequests);
}

startPokedex();
