/// <reference types="jquery"/>

modalStructure();

const containerCol = document.querySelector('#containercol');
const columnsAp = document.querySelectorAll('.card-title');
const imageAp = document.querySelectorAll('.card-img-top');

const modalTitle = document.querySelectorAll('.modal-title');
const frontDefault = document.querySelectorAll('.front-default');
const backDefault= document.querySelectorAll('.back-default');
const shinyFront = document.querySelectorAll('.shiny-front');
const shinyBack = document.querySelectorAll('.shiny-back');

const typeFirst = document.querySelectorAll('.tipo1');
const typeSecond = document.querySelectorAll('.tipo2');

const healthPokemon= document.querySelectorAll('.health');
const attackPokemon= document.querySelectorAll('.attack');
const defensePokemon= document.querySelectorAll('.defense');
const specialAttackPokemon= document.querySelectorAll('.specialattack');
const specialDefensePokemon= document.querySelectorAll('.specialdefense');
const SpeedPokemon= document.querySelectorAll('.speed');

let actualPage = document.querySelector('#actualpage');
let arrayDirecciones=[];
let i=0;
let main;

for(let i=0;i<=1260; i=i+20){
    arrayDirecciones.push(`https://pokeapi.co/api/v2/pokemon/?offset=${i}&limit=20`);
}
arrayDirecciones.push('https://pokeapi.co/api/v2/pokemon/?offset=1280&limit=12');

main= arrayDirecciones[i];
const UrlPokemon = `${main}` 

makingRequest(UrlPokemon);

function makingRequest(UrlPokemon){
    fetch(UrlPokemon)
.then(respuesta=>respuesta.json())
.then(respuesta=>{
       for(let i=0;i<columnsAp.length;i++){
        columnsAp[i].textContent=((respuesta.results[i].name));
        let url = respuesta.results[i].url;

        fetch(url)
        .then(respuesta2=>respuesta2.json())
        .then(respuesta2=>{

            imageAp[i].src=`${respuesta2.sprites.front_default}`;
            modalTitle[i].textContent = `${respuesta2.name}`;

            frontDefault[i].src = `${respuesta2.sprites.front_default}`;
            backDefault[i].src =  `${respuesta2.sprites.back_default}`;
            shinyFront[i].src =  `${respuesta2.sprites.front_shiny}`;
            shinyBack[i].src =  `${respuesta2.sprites.back_shiny}`;

            if(respuesta2.types.length==1){
                typeFirst[i].textContent = `${respuesta2.types[0].type.name}`;
            }else{
                typeFirst[i].textContent = `${respuesta2.types[0].type.name}`;
                typeSecond[i].textContent = `${respuesta2.types[1].type.name}`;
            }

            healthPokemon[i].textContent =`${respuesta2.stats[0].base_stat}`;
            attackPokemon[i].textContent =`${respuesta2.stats[1].base_stat}`;
            defensePokemon[i].textContent =`${respuesta2.stats[2].base_stat}`;
            specialAttackPokemon[i].textContent =`${respuesta2.stats[3].base_stat}`;
            specialDefensePokemon[i].textContent =`${respuesta2.stats[4].base_stat}`;
            SpeedPokemon[i].textContent =`${respuesta2.stats[5].base_stat}`;
        })
        .catch(error=>console.log('Error!',error))
       }
})
.catch(error=>{console.log('Error!',error)})
}

function nextPokemonList() {
    i++;
    makingRequest(`${arrayDirecciones[i]}`);
   actualPage.value=`${i+1}`;
}

function previousPokemonList(){
    i--;
    if(i<0){
        makingRequest(`${arrayDirecciones[0]}`)
        actualPage.value=`${0}`;
    }
    else{
        makingRequest(`${arrayDirecciones[i]}`)
        actualPage.value=`${i+1}`;
    }
}

function search(ele) {
    if(event.key === 'Enter') { 
        actualPage.value=`${ele.value}`;
        i=(ele.value)-1; 
        let newId= parseInt(ele.value)-1;
        let newRequest= arrayDirecciones[newId];
        makingRequest(newRequest);      
    }
}


function modalStructure(){
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

let idsModal = document.querySelectorAll('#Modal');

for(let i=0;i<idsModal.length;i++){
    idsModal[i].setAttribute('id', `modal${i+1}`);
}

}


