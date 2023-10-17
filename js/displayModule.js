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
              <span class="tipo1"></span>
              <span class="tipo2"></span>
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

export function showPokemonList(secondResponsedata, i) {
  $($('.card-img-top')[i]).attr('src', secondResponsedata.sprites.front_default);
  $($('.modal-title')[i]).text(secondResponsedata.name);
  $($('.front-default')[i]).attr('src', secondResponsedata.sprites.front_default);
  $($('.back-default')[i]).attr('src', secondResponsedata.sprites.back_default);
  $($('.shiny-front')[i]).attr('src', secondResponsedata.sprites.front_shiny);
  $($('.shiny-back')[i]).attr('src', secondResponsedata.sprites.back_shiny);

  if (secondResponsedata.types.length === 1) {
    $($('.tipo1')[i]).text(secondResponsedata.types[0].type.name);
  } else {
    $($('.tipo1')[i]).text(secondResponsedata.types[0].type.name);
    $($('.tipo2')[i]).text(secondResponsedata.types[1].type.name);
  }
  $($('.health')[i]).text(secondResponsedata.stats[0].base_stat);
  $($('.attack')[i]).text(secondResponsedata.stats[1].base_stat);
  $($('.defense')[i]).text(secondResponsedata.stats[2].base_stat);
  $($('.special-attack')[i]).text(secondResponsedata.stats[3].base_stat);
  $($('.special-defense')[i]).text(secondResponsedata.stats[4].base_stat);
  $($('.speed')[i]).text(secondResponsedata.stats[5].base_stat);
}
