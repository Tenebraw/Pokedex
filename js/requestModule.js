/// <reference types="jquery"/>
/* eslint-env jquery */
/* eslint-disable no-await-in-loop */

async function secondCall(singlePokemonRequest) {
  const response = await fetch(singlePokemonRequest);
  const jsonData = await response.json();
  return jsonData;
}

export async function makingRequest(Url, showPokemonListCallback) {
  const response = await fetch(Url);
  const jsonData = await response.json();
  for (let i = 0; i < $('.card-title').length; i++) {
    $($('.card-title')[i]).text(jsonData.results[i].name);

    const singlePokemonRequest = jsonData.results[i].url;
    const secondResponseData = await secondCall(singlePokemonRequest);
    showPokemonListCallback(secondResponseData, i);
  }
}
