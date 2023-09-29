/// <reference types="jquery"/>

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


const arrayDirecciones =[
    'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=40&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=60&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=80&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=100&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=120&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=140&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=160&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=180&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=200&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=220&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=240&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=260&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=280&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=300&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=320&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=340&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=360&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=380&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=400&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=420&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=440&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=460&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=480&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=500&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=520&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=540&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=560&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=580&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=600&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=620&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=640&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=660&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=680&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=700&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=720&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=740&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=760&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=780&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=800&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=820&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=840&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=860&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=880&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=900&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=920&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=940&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=960&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=980&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=1000&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=1020&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=1040&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=1060&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=1080&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=1100&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=1120&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=1140&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=1160&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=1180&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=1200&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=1220&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=1240&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=1260&limit=20',
    'https://pokeapi.co/api/v2/pokemon/?offset=1280&limit=12'
]

let actualPage = document.querySelector('#actualpage');

let i =0;
main= arrayDirecciones[i];

const UrlPokemon = `${main}` 

makingRequest(UrlPokemon);

function makingRequest(UrlPokemon){
    fetch(UrlPokemon)
.then(respuesta=>respuesta.json())
.then(respuesta=>{
   // console.log(respuesta)
    //Object.keys(respuesta.results).forEach(pokemon=>{
        //console.log(respuesta.results[pokemon].name);
        //this.respuesta = respuesta;

        //const names = Object.keys(respuesta.results);



        //columnsAp.text(`${respuesta.results[pokemon].name}`);
       //let optionValues = [...columnsAp].map(o => o.html().text('hola'));
       for(let i=0;i<columnsAp.length;i++){
        columnsAp[i].textContent=((respuesta.results[i].name));
        let url = respuesta.results[i].url;

        fetch(url)
        .then(respuesta2=>respuesta2.json())
        .then(respuesta2=>{
            //console.log(respuesta2.sprites.front_default);

            imageAp[i].src=`${respuesta2.sprites.front_default}`;

            modalTitle[i].textContent = `${respuesta2.name}`;

            frontDefault[i].src = `${respuesta2.sprites.front_default}`;
            backDefault[i].src =  `${respuesta2.sprites.back_default}`;
            shinyFront[i].src =  `${respuesta2.sprites.front_shiny}`;
            shinyBack[i].src =  `${respuesta2.sprites.back_shiny}`;

           // console.log(respuesta2.types.length);
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
     

       }

})
.catch(error=>{console.log('Error!',error)})


}
function nextPokemonList() {
    i++;
    makingRequest(`${arrayDirecciones[i]}`);
   // actualPage.textContent=3;
   console.log(`pagina: ${i+1}`);
   actualPage.value=`${i+1}`;
}

function previousPokemonList(){
    i--;
    if(i<0){
        makingRequest(`${arrayDirecciones[0]}`)
        console.log(`pagina: ${0}`);
        actualPage.value=`${0}`;
    }
    else{
        makingRequest(`${arrayDirecciones[i]}`)
        console.log(`pagina ${i+1}`);
        actualPage.value=`${i+1}`;
    }
}

function search(ele) {
    if(event.key === 'Enter') {
        console.log(parseInt(ele.value));  
        let newId= parseInt(ele.value)-1;
        console.group(newId);
        let newRequest= arrayDirecciones[newId];
        console.log(newRequest);
        makingRequest(newRequest);      
    }
}





