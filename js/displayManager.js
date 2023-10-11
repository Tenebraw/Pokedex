/// <reference types="jquery"/>
/* eslint-env jquery */

export function showPokemonDetails() {
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
              <span class="tipo1"></span>
              <span class="tipo2"></span>
          </div>
          <div class="abilities">
              Health: <span class="health"></span>
              Attack: <span class="attack"></span>
              Defense: <span class="defense"></span>
              Special Attack: <span class="specialattack"></span>
              Special Defense: <span class="specialdefense"></span>
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

export function showPokemonList(secondresp, l) {
  $($('.card-img-top')[l]).attr('src', secondresp.sprites.front_default);
  $($('.modal-title')[l]).text(secondresp.name);
  $($('.front-default')[l]).attr('src', secondresp.sprites.front_default);
  $($('.back-default')[l]).attr('src', secondresp.sprites.back_default);
  $($('.shiny-front')[l]).attr('src', secondresp.sprites.front_shiny);
  $($('.shiny-back')[l]).attr('src', secondresp.sprites.back_shiny);

  if (secondresp.types.length === 1) {
    $($('.tipo1')[l]).text(secondresp.types[0].type.name);
  } else {
    $($('.tipo1')[l]).text(secondresp.types[0].type.name);
    $($('.tipo2')[l]).text(secondresp.types[1].type.name);
  }
  $($('.health')[l]).text(secondresp.stats[0].base_stat);
  $($('.attack')[l]).text(secondresp.stats[1].base_stat);
  $($('.defense')[l]).text(secondresp.stats[2].base_stat);
  $($('.specialattack')[l]).text(secondresp.stats[3].base_stat);
  $($('.specialdefense')[l]).text(secondresp.stats[4].base_stat);
  $($('.speed')[l]).text(secondresp.stats[5].base_stat);
}
