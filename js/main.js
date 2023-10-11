/// <reference types="jquery"/>
/* eslint-env jquery */

import { makingRequest } from './requestModule.js';
import { showPokemonDetails, showPokemonList } from './displayModule.js';
import { nextPage, previousPage, searchPokemon } from './paginationModule.js';

function buildUrlArray(TOTAL_POKEMONS, pageSize) {
  const arrayRequests = [];
  for (let j = 0; j <= TOTAL_POKEMONS; j += pageSize) {
    arrayRequests.push(`https://pokeapi.co/api/v2/pokemon/?offset=${j}&limit=20`);
  }
  return arrayRequests;
}

const TOTAL_POKEMONS = 1260;
const pageSize = 20;
const arrayRequests = buildUrlArray(TOTAL_POKEMONS, pageSize);
const urlPokemon = arrayRequests[0];
// Event Manager

async function startPokedex() {
  showPokemonDetails();
  await makingRequest(urlPokemon, showPokemonList);
  nextPage(arrayRequests);
  previousPage(arrayRequests);
  searchPokemon(arrayRequests);
}

startPokedex();
