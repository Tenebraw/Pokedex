/// <reference types="jquery"/>
/* eslint-env jquery */

import { makingRequest } from './manageRequest.js';
import { showPokemonDetails } from './displayManager.js';
import { nextPage, previousPage, searchPokemon } from './paginationManager.js';

const arrayRequests = [];
const i = 0;
const TOTAL_POKEMONES = 1260;
for (let j = 0; j <= TOTAL_POKEMONES; j += 20) {
  arrayRequests.push(`https://pokeapi.co/api/v2/pokemon/?offset=${j}&limit=20`);
}
const UrlPokemon = arrayRequests[i];

// Event Manager

function inicializarPokedex() {
  makingRequest(UrlPokemon);
  showPokemonDetails();
  nextPage(arrayRequests);
  previousPage(arrayRequests);
  searchPokemon(arrayRequests);
}

inicializarPokedex();
