/// <reference types="jquery"/>
/* eslint-env jquery */

import { requestPokemonList } from './requestModule.js';
import { createPokemonModal, showPokemonList } from './displayModule.js';
import { nextPage, previousPage, searchPokemon } from './paginationModule.js';

const myOffset = 0;
const myLimit =20;
const nextPageButton = $('#next');
const previousPageButton = $('#previous');
const actualPage = $('#actual-page');
const urlPokemon = `https://pokeapi.co/api/v2/pokemon/?offset=${myOffset}&limit=${myLimit}`

// Event Manager
async function startPokedex() {
  createPokemonModal();
  await requestPokemonList(urlPokemon, showPokemonList);

  nextPageButton[0].addEventListener('click', () => {
      const currentPage = parseInt(actualPage.val(), 10);
      const forthcomingPage = currentPage + 1;
  nextPage(myLimit, forthcomingPage, actualPage);
});

  previousPageButton[0].addEventListener('click',()=> {
      const currentPage = parseInt(actualPage.val(), 10);
      const precedingPage = currentPage - 1;
  previousPage(myLimit, precedingPage, actualPage);
});

searchPokemon(actualPage);

}

startPokedex();

