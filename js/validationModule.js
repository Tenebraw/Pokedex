/// <reference types="jquery"/>
/* eslint-env jquery */

// Validate Input Search.

export function validateSearchInput(inputPage, totalPages) {
  $('#page-go').removeClass('error');
  $('#error-legend').css('display', 'none');

  if (isNaN(inputPage) || inputPage > totalPages || inputPage < 1) {
    $('#page-go').addClass('error');
    $('#error-legend').css('display', 'block');
    return false;
  }
  return true;
}
