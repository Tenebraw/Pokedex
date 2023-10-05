/// <reference types="jquery"/>
/* eslint-env jquery */

// Validate Input Search.

export function validarInput() {
  $('#pagego').removeClass('error');
  $('#error').css('display', 'none');

  if (!$('#pagego').val().match(/^\d+$/) || $('#pagego').val() > 64 || $('#pagego').val() < 1) {
    $('#pagego').addClass('error');
    $('#error').css('display', 'block');
    return false;
  }
  return true;
}
