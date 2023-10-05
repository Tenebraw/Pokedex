/// <reference types="jquery"/>
/* eslint-env jquery */

import { showPokemonList } from './displayManager.js';

async function secondCall(secondFetch, i) {
  const respo = await fetch(secondFetch);
  const resp = await respo.json();
  return showPokemonList(resp, i);
}

export async function makingRequest(Url) {
  const response = await fetch(Url);
  const respuesta = await response.json();
  for (let i = 0; i < $('.card-title').length; i++) {
    $($('.card-title')[i]).text(respuesta.results[i].name);

    const secondFetch = respuesta.results[i].url;

    secondCall(secondFetch, i);
  }
}
