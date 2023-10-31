/// <reference types="jquery"/>
/* eslint-env jquery */

export function createPokemonModal() {
  $('.col').after(`    <!-- Modal -->
<div class="modal fade" id="Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
          <img class="front-default" src="" alt=""><img class="back-default" src="" alt=""><img class="shiny-front" src="" alt=""><img class="shiny-back" src="" alt="">
          <div class="types">
              <span class="type1"></span>
              <span class="type2"></span>
          </div>
          <div class="abilities">
              Health: <span class="health"></span>
              Attack: <span class="attack"></span>
              Defense: <span class="defense"></span>
              Special Attack: <span class="special-attack"></span>
              Special Defense: <span class="special-defense"></span>
              Speed: <span class="speed"></span>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<!--End modal-->`);

  const idsModal = document.querySelectorAll('#Modal');

  for (let i = 0; i < idsModal.length; i++) {
    idsModal[i].setAttribute('id', `modal${i + 1}`);
  }
}

export function showPokemonList(dataPokemons, i) {
  $($('.card-img-top')[i]).attr('src', dataPokemons.sprites.front_default);
  $($('.modal-title')[i]).text(dataPokemons.name);
  $($('.front-default')[i]).attr('src', dataPokemons.sprites.front_default);
  $($('.back-default')[i]).attr('src', dataPokemons.sprites.back_default);
  $($('.shiny-front')[i]).attr('src', dataPokemons.sprites.front_shiny);
  $($('.shiny-back')[i]).attr('src', dataPokemons.sprites.back_shiny);

  if (dataPokemons.types.length === 1) {
    $($('.type1')[i]).text(dataPokemons.types[0].type.name);
  } else {
    $($('.type1')[i]).text(dataPokemons.types[0].type.name);
    $($('.type2')[i]).text(dataPokemons.types[1].type.name);
  }

  $($('.health')[i]).text(dataPokemons.stats[0].base_stat);
  $($('.attack')[i]).text(dataPokemons.stats[1].base_stat);
  $($('.defense')[i]).text(dataPokemons.stats[2].base_stat);
  $($('.special-attack')[i]).text(dataPokemons.stats[3].base_stat);
  $($('.special-defense')[i]).text(dataPokemons.stats[4].base_stat);
  $($('.speed')[i]).text(dataPokemons.stats[5].base_stat);

}


export function processData(data, showPokemonListCallback) {
  for (let i = 0; i < data.results.length; i++) {
    $($('.card-title')[i]).text(data.results[i].name);
    showPokemonListCallback(data.responses[i], i);
  }
}