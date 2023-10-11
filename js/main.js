/// <reference types="jquery"/>
/* eslint-env jquery */

import { makingRequest } from './requestModule.js';
import { createPokemonModal, showPokemonList } from './displayModule.js';
import { nextPage, previousPage, searchPokemon } from './paginationModule.js';

function buildUrlArray(TOTAL_POKEMONS, POKEMONS_PER_PAGE) {
  const arrayRequests = [];
  for (let j = 0; j <= TOTAL_POKEMONS; j += POKEMONS_PER_PAGE) {
    arrayRequests.push(`https://pokeapi.co/api/v2/pokemon/?offset=${j}&limit=20`);
  }
  return arrayRequests;
}

const TOTAL_POKEMONS = 1260;
const POKEMONS_PER_PAGE = 20;
const arrayRequests = buildUrlArray(TOTAL_POKEMONS, POKEMONS_PER_PAGE);
const urlPokemon = arrayRequests[0];

// Event Manager
async function startPokedex() {
  createPokemonModal();
  await makingRequest(urlPokemon, showPokemonList);
  nextPage(arrayRequests);
  previousPage(arrayRequests);
  searchPokemon(arrayRequests);
}

startPokedex();
