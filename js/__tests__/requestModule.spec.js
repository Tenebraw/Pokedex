/* eslint-env jest */
/// <reference types="Jest"/>

import 'jest-localstorage-mock'; 
import { getPokemon, getPokemonList} from '../requestModule.js';
import { showPokemonList } from '../displayModule.js';
import { fetchPokemonList, saveDataToLocalStorage } from '../requestModule.js';

// Importa jsdom para crear un entorno de navegador emulado
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// Crea una instancia de jsdom y asigna su "window" global
const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;
global.navigator = { userAgent: 'node.js' };
const $ = require('jquery');
global.$ = $;


beforeEach(() => {
  // Configura localStorage antes de cada prueba
  const localStorageData = {};
  global.localStorage = {
    getItem: (key) => localStorageData[key],
    setItem: (key, value) => (localStorageData[key] = value),
    removeItem: (key) => delete localStorageData[key],
  };
});

afterEach(() => {
  // Restaura localStorage después de cada prueba
  global.localStorage = undefined;
});

test('fetchPokemonList should fetch Pokemon list from the API', async () => {
  const mockResponse = { json: () => ({ results: [] }) };
  global.fetch = jest.fn().mockResolvedValue(mockResponse);

  await fetchPokemonList('https://example.com/some-url');

  expect(fetch).toHaveBeenCalledWith('https://example.com/some-url');
});

test('saveDataToLocalStorage should save data to localStorage', () => {
  const data = { some: 'data' };
  saveDataToLocalStorage('pokemonData_some-url', data);

  const storedData = localStorage.getItem('pokemonData_some-url');
  expect(JSON.parse(storedData)).toEqual(data);
});


test('secondCall fetches data from a URL', async () => {
  const mockData = { name: 'Pikachu' };
  const mockResponse = { json: () => mockData };
  global.fetch = jest.fn().mockResolvedValue(mockResponse);

  const data = await getPokemon('https://pokeapi.co/api/v2/pokemon/1/');

  expect(data).toEqual(mockData);
});


test('getPokemonList should fetch and process Pokemon list', async () => {
  const mockData = {
    results: [
      {
        name: 'bulbasaur',
        sprites: {
          front_default: 'url_to_front_default_image',
          back_default:'url',
          front_shiny:'url',
          back_shiny:'url'
        },
        types: [
          { type: { name: 'Electric' } },
        ],
        stats: [
          { base_stat: 55 },
        ],
      },
    ]
  };

  // Simula la respuesta de fetch
  const mockResponse = { json: () => mockData };
  global.fetch = jest.fn().mockResolvedValue(mockResponse);

  // Simula la función showPokemonList
  const showPokemonList = jest.fn();

  // Llama a getPokemonList
  await getPokemonList('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20', showPokemonList);

  // Define la estructura de datos esperada para showPokemonList
  const expectedData = {
    results: mockData.results,
    responses: mockData.results.map((pokemon) => ({
      name: pokemon.name,
       sprites: pokemon.sprites,
      types: pokemon.types,
      stats: pokemon.stats
    })),
  };

  // Verifica si showPokemonList se llamó con los datos esperados
  expect(showPokemonList).toHaveBeenCalledWith(expectedData);
});
    
