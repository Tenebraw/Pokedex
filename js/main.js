/// <reference types="jquery"/>

modalStructure();

let actualPage = $("#actualpage");
let arrayDirecciones = [];
let i = 0;

for (let i = 0; i <= 1260; i = i + 20) {
  arrayDirecciones.push(
    `https://pokeapi.co/api/v2/pokemon/?offset=${i}&limit=20`
  );
}
arrayDirecciones.push(
  `https://pokeapi.co/api/v2/pokemon/?offset=1280&limit=12`
);

const UrlPokemon = arrayDirecciones[i];
makingRequest(UrlPokemon);

function makingRequest(Url) {
  fetch(Url)
    .then((respuesta) => respuesta.json())
    .then((respuesta) => {
      for (let i = 0; i < $(".card-title").length; i++) {
        $($(".card-title")[i]).text(respuesta.results[i].name);
        let secondFetch = respuesta.results[i].url;

        fetch(secondFetch)
          .then((respuesta2) => respuesta2.json())
          .then((respuesta2) => {
            $($(".card-img-top")[i]).attr(
              "src",
              respuesta2.sprites.front_default
            );
            $($(".modal-title")[i]).text(respuesta2.name);
            $($(".front-default")[i]).attr(
              "src",
              respuesta2.sprites.front_default
            );
            $($(".back-default")[i]).attr(
              "src",
              respuesta2.sprites.back_default
            );
            $($(".shiny-front")[i]).attr("src", respuesta2.sprites.front_shiny);
            $($(".shiny-back")[i]).attr("src", respuesta2.sprites.back_shiny);

            if (respuesta2.types.length == 1) {
              $($(".tipo1")[i]).text(respuesta2.types[0].type.name);
            } else {
              $($(".tipo1")[i]).text(respuesta2.types[0].type.name);
              $($(".tipo2")[i]).text(respuesta2.types[1].type.name);
            }
            $($(".health")[i]).text(respuesta2.stats[0].base_stat);
            $($(".attack")[i]).text(respuesta2.stats[1].base_stat);
            $($(".defense")[i]).text(respuesta2.stats[2].base_stat);
            $($(".specialattack")[i]).text(respuesta2.stats[3].base_stat);
            $($(".specialdefense")[i]).text(respuesta2.stats[4].base_stat);
            $($(".speed")[i]).text(respuesta2.stats[5].base_stat);
          })
          .catch((error) => console.log("Error!", error));
      }
    })
    .catch((error) => {
      console.log("Error!", error);
    });
}

function nextPokemonList() {
  i++;
  makingRequest(`${arrayDirecciones[i]}`);
  actualPage.val(`${i + 1}`);
}

function previousPokemonList() {
  i--;
  if (i < 0) {
    makingRequest(`${arrayDirecciones[0]}`);
    actualPage.val(0);
  } else {
    makingRequest(`${arrayDirecciones[i]}`);
    actualPage.val(`${i + 1}`);
  }
}

function search(ele) {
  if (event.key === "Enter") {
    //actualPage.value = `${ele.value}`;
    actualPage.val(`${ele.value}`);
    i = ele.value - 1;
    let newId = parseInt(ele.value) - 1;
    let newRequest = arrayDirecciones[newId];
    makingRequest(newRequest);
  }
}

function modalStructure() {
  $(".col").after(`    <!-- Modal -->
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

  let idsModal = document.querySelectorAll("#Modal");

  for (let i = 0; i < idsModal.length; i++) {
    idsModal[i].setAttribute("id", `modal${i + 1}`);
  }
}
