/// <reference types="jquery"/>

modalStructure();

let actualPage = $("#actualpage");
let arrayRequests = [];
let i = 0;
let page = 1;

for (let i = 0; i <= 1260; i = i + 20) {
  arrayRequests.push(`https://pokeapi.co/api/v2/pokemon/?offset=${i}&limit=20`);
}

const UrlPokemon = arrayRequests[i];
makingRequest(UrlPokemon);

function makingRequest(Url) {
  fetch(Url)
    .then((response) => response.json())
    .then((response) => {
      for (let i = 0; i < $(".card-title").length; i++) {
        $($(".card-title")[i]).text(response.results[i].name);

        let secondFetch = response.results[i].url;
        fetch(secondFetch)
          .then((secondresp) => secondresp.json())
          .then((secondresp) => {
            $($(".card-img-top")[i]).attr(
              "src",
              secondresp.sprites.front_default
            );
            $($(".modal-title")[i]).text(secondresp.name);
            $($(".front-default")[i]).attr(
              "src",
              secondresp.sprites.front_default
            );
            $($(".back-default")[i]).attr(
              "src",
              secondresp.sprites.back_default
            );
            $($(".shiny-front")[i]).attr("src", secondresp.sprites.front_shiny);
            $($(".shiny-back")[i]).attr("src", secondresp.sprites.back_shiny);

            if (secondresp.types.length == 1) {
              $($(".tipo1")[i]).text(secondresp.types[0].type.name);
            } else {
              $($(".tipo1")[i]).text(secondresp.types[0].type.name);
              $($(".tipo2")[i]).text(secondresp.types[1].type.name);
            }
            $($(".health")[i]).text(secondresp.stats[0].base_stat);
            $($(".attack")[i]).text(secondresp.stats[1].base_stat);
            $($(".defense")[i]).text(secondresp.stats[2].base_stat);
            $($(".specialattack")[i]).text(secondresp.stats[3].base_stat);
            $($(".specialdefense")[i]).text(secondresp.stats[4].base_stat);
            $($(".speed")[i]).text(secondresp.stats[5].base_stat);
          })
          .catch((error) => console.log("Error!", error));
      }
    })
    .catch((error) => {
      console.log("Error!", error);
    });
}

function nextPokemonList() {
  if (page == 63) {
    $("#next").addClass("disabled");
  }

  page++;
  actualPage.val(page);
  if (page == 2) {
    $("#previous").removeClass("disabled");
  }
  makingRequest(`${arrayRequests[page]}`);
}

function previousPokemonList() {
  page--;
  actualPage.val(page);
  $("#next").removeClass("disabled");
  if (page == 1) {
    $("#previous").addClass("disabled");
  }
  makingRequest(arrayRequests[page - 1]);
}

function search(ele) {
  if (event.key === "Enter") {
    if (validarInput(ele) == true) {
      actualPage.val(ele.value);
      let newId = parseInt(ele.value) - 1;
      makingRequest(arrayRequests[newId]);
      page = ele.value;
      $("#previous").removeClass("disabled");
      if (page == 64) {
        $("#next").addClass("disabled");
      }
    }
  }
}

function validarInput(ele) {
  $("#pagego").removeClass("error");
  $("#error").css("display", "none");

  if (!$("#pagego").val().match(/^\d+$/) || ele.value > 64 || ele.value < 1) {
    $("#pagego").addClass("error");
    $("#error").css("display", "block");
    return false;
  }
  return true;
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
