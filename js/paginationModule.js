/// <reference types="jquery"/>
/* eslint-env jquery */

import { getPokemonList } from './requestModule.js';
import { validateSearchInput } from './validationModule.js';
import { showPokemonList } from './displayModule.js';

const TOTAL_POKEMONS = 1280; 
const POKEMONS_PER_PAGE = 20;
const totalPages = calculateNumberOfPages(TOTAL_POKEMONS, POKEMONS_PER_PAGE);

export function nextPage(myLimit, forthcomingPage, actualPage) {
  // Manage Next action.
    if (forthcomingPage <= totalPages) {
      actualPage.val(forthcomingPage);
      const newOffset = (forthcomingPage - 1) * myLimit;
      getPokemonList(`https://pokeapi.co/api/v2/pokemon/?offset=${newOffset}&limit=${myLimit}`, showPokemonList);
      $('#previous').removeClass('disabled');
    }

    if (forthcomingPage === totalPages) {
      $('#next').addClass('disabled');
    }

}

export function previousPage(myLimit, precedingPage, actualPage) {
  // Manage Previous action.
    if (precedingPage >= 1) {
      actualPage.val(precedingPage);
      const newOffset = (precedingPage - 1) * myLimit;
      getPokemonList(`https://pokeapi.co/api/v2/pokemon/?offset=${newOffset}&limit=${myLimit}`, showPokemonList);
      $('#next').removeClass('disabled');
    }

    if (precedingPage === 1) {
      $('#previous').addClass('disabled');
    }

}

function calculateNumberOfPages(TOTAL_POKEMONS, POKEMONS_PER_PAGE) {
  return Math.ceil(TOTAL_POKEMONS / POKEMONS_PER_PAGE);
}


export function searchPokemon(actualPage) {
  // Manage search input
  $('#page-go').on('keydown', (e) => {
    if (e.key === 'Enter') {
      const inputPage = parseInt($('#page-go').val(), 10);
      if (validateSearchInput(inputPage,totalPages)) {
        actualPage.val(inputPage);

        if (inputPage === 1) {
          $('#previous').addClass('disabled');
        } else {
          $('#previous').removeClass('disabled');
        }

        if (inputPage === totalPages) {

          $('#next').addClass('disabled');
        } else {
          $('#next').removeClass('disabled');
        }

        const newUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${(inputPage - 1) * 20}&limit=${20}`;
        getPokemonList(newUrl, showPokemonList);
      }
    }
  });
}
