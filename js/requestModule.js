/// <reference types="jquery"/>
/* eslint-env jquery */

export async function requestForEachPokemon(getPokemons) {
  const response = await fetch(getPokemons);
  const jsonData = await response.json();
  return jsonData;
}

export async function requestPokemonList(Url, showPokemonListCallback) {
  const localStorageKey = `pokemonData_${Url}`; 
  const cachedData = localStorage.getItem(localStorageKey);

  if (cachedData) {
    console.log('Datos en cache');
    const dataStorage = JSON.parse(cachedData);
    processData(dataStorage, showPokemonListCallback);
  } else {
    const response = await fetch(Url);
    const jsonData = await response.json();
    const promises = [];

    for (let i = 0; i < jsonData.results.length; i++) {
      const getPokemons = jsonData.results[i].url;
      promises.push(requestForEachPokemon(getPokemons));
    }

    const promisesResponses = await Promise.all(promises);
    const combinedData = {
        results: jsonData.results,
        responses: promisesResponses.map(response => ({
          name: response.name,
          sprites: response.sprites,
          types: response.types,
          stats: response.stats
        })),
};
    localStorage.setItem(localStorageKey, JSON.stringify(combinedData));
    processData(combinedData, showPokemonListCallback);
  }
}


function processData(data, showPokemonListCallback) {
  for (let i = 0; i < data.results.length; i++) {
    $($('.card-title')[i]).text(data.results[i].name);
    showPokemonListCallback(data.responses[i], i);
  }
}

