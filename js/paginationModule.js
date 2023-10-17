/// <reference types="jquery"/>
/* eslint-env jquery */

import { makingRequest } from './requestModule.js';
import { validateSearchInput } from './validationModule.js';
import { showPokemonList } from './displayModule.js';

const actualPage = $('#actual-page');
let page = 1;

export function nextPage(arrayRequests) {
  // Manage Next action.
  $('#next').on('click', () => {
    if (page === 63) {
      $('#next').addClass('disabled');
    }
    page++;
    actualPage.val(page);
    if (page === 2) {
      $('#previous').removeClass('disabled');
    }
    makingRequest(`${arrayRequests[page - 1]}`, showPokemonList);
  });
}

export function previousPage(arrayRequests) {
  // Manage Previous action.
  $('#previous').on('click', () => {
    page--;
    actualPage.val(page);
    $('#next').removeClass('disabled');
    if (page === 1) {
      $('#previous').addClass('disabled');
    }
    makingRequest(arrayRequests[page - 1], showPokemonList);
  });
}

export function searchPokemon(arrayRequests) {
  // Manage search input
  $('#page-go').on('keydown', (e) => {
    if (e.key === 'Enter') {
      if (validateSearchInput() === (true)) {
        actualPage.val($('#page-go').val());
        const newId = parseInt($('#page-go').val(), 10) - 1;
        makingRequest(arrayRequests[newId], showPokemonList);
        page = $('#page-go').val();
        $('#previous').removeClass('disabled');
        if (parseInt(page, 10) === 64) {
          $('#next').addClass('disabled');
        }
      }
    }
  });
}
