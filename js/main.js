/// <reference types="jquery"/>
/* eslint-env jquery */

const actualPage = $('#actualpage');
const arrayRequests = [];
const i = 0;
let page = 1;

for (let j = 0; j <= 1260; j += 20) {
  arrayRequests.push(`https://pokeapi.co/api/v2/pokemon/?offset=${j}&limit=20`);
}
const UrlPokemon = arrayRequests[i];

function makingRequest(Url) {
  fetch(Url)
    .then((response) => response.json())
    .then((response) => {
      for (let k = 0; k < $('.card-title').length; k++) {
        $($('.card-title')[k]).text(response.results[k].name);

        const secondFetch = response.results[k].url;
        fetch(secondFetch)
          .then((secondresp) => secondresp.json())
          .then((secondresp) => {
            $($('.card-img-top')[k]).attr('src', secondresp.sprites.front_default);
            $($('.modal-title')[k]).text(secondresp.name);
            $($('.front-default')[k]).attr('src', secondresp.sprites.front_default);
            $($('.back-default')[k]).attr('src', secondresp.sprites.back_default);
            $($('.shiny-front')[k]).attr('src', secondresp.sprites.front_shiny);
            $($('.shiny-back')[k]).attr('src', secondresp.sprites.back_shiny);

            if (secondresp.types.length === 1) {
              $($('.tipo1')[k]).text(secondresp.types[0].type.name);
            } else {
              $($('.tipo1')[k]).text(secondresp.types[0].type.name);
              $($('.tipo2')[k]).text(secondresp.types[1].type.name);
            }
            $($('.health')[k]).text(secondresp.stats[0].base_stat);
            $($('.attack')[k]).text(secondresp.stats[1].base_stat);
            $($('.defense')[k]).text(secondresp.stats[2].base_stat);
            $($('.specialattack')[k]).text(secondresp.stats[3].base_stat);
            $($('.specialdefense')[k]).text(secondresp.stats[4].base_stat);
            $($('.speed')[k]).text(secondresp.stats[5].base_stat);
          })
          .catch((error) => console.log('Error!', error));
      }
    })
    .catch((error) => {
      console.log('Error!', error);
    });
}

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
  makingRequest(`${arrayRequests[page - 1]}`);
});

// Manage Previous action.

$('#previous').on('click', () => {
  page--;
  actualPage.val(page);
  $('#next').removeClass('disabled');
  if (page === 1) {
    $('#previous').addClass('disabled');
  }
  makingRequest(arrayRequests[page - 1]);
});

// Validate Input Search.

function validarInput() {
  $('#pagego').removeClass('error');
  $('#error').css('display', 'none');

  if (!$('#pagego').val().match(/^\d+$/) || $('#pagego').val() > 64 || $('#pagego').val() < 1) {
    $('#pagego').addClass('error');
    $('#error').css('display', 'block');
    return false;
  }
  return true;
}

// Manage search input
$('#pagego').on('keydown', (e) => {
  if (e.key === 'Enter') {
    if (validarInput() === (true)) {
      actualPage.val($('#pagego').val());
      const newId = parseInt($('#pagego').val(), 10) - 1;
      makingRequest(arrayRequests[newId]);
      page = $('#pagego').val();
      $('#previous').removeClass('disabled');
      if (parseInt(page, 10) === 64) {
        $('#next').addClass('disabled');
      }
    }
  }
});

function modalStructure() {
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

  for (let l = 0; l < idsModal.length; l++) {
    idsModal[l].setAttribute('id', `modal${l + 1}`);
  }
}

modalStructure();
makingRequest(UrlPokemon);
