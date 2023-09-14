
let diccionario = ["ABEJA", "ABRIL", "CINCO","CIRCO","ACTOR", "GRITO"];
let indice = Math.floor(Math.random() * diccionario.length-1) + 1;
console.log(indice);
//let palabra = diccionario [indice];
let palabra;

fetch('https://random-word-api.herokuapp.com/word?length=5&&number=1&&lang=es')
    .then(response => response.json())
    .then(response => {
        console.log(response)
        palabra = response[0].toUpperCase()
    })
    .catch(err => console.error(err));

//console.log(palabra);
let intentos = 6;

window.addEventListener('load', init);

function init(){
    console.log('Esto se ejecuta solo cuando se carga la pagina web')
}

const button = document.getElementById("guess-button");

button.addEventListener("click", intentar);

function intentar(){
    console.log(palabra);
   const INTENTO = leerIntento();
   const GRID = document.getElementById("grid");
   const ROW = document.createElement('div');
   ROW.className = 'row';

   if(INTENTO.length !=5){
    alert('debe ingresar una palabra de 5 letras');
    return
   }
   
   if (INTENTO === palabra){
    terminar("<h1>GANASTE!😀</h1>")
    //console.log("GANASTE!");
    return
   }
   for (let i in palabra){
    console.log(INTENTO[i])
    const SPAN = document.createElement('span');
    SPAN.className = 'letter';
    if (INTENTO[i] === palabra[i]){
        SPAN.innerHTML = INTENTO[i];
        SPAN.style.backgroundColor = '#79b851';
        //console.log(INTENTO[i], "VERDE")
    } else if(palabra.includes(INTENTO[i]) ){
        SPAN.innerHTML = INTENTO [i];
        SPAN.style.backgroundColor = '#f3c237';
        //console.log(INTENTO[i], "AMARILLO")
    } else {
        SPAN.innerHTML = INTENTO[i];
        SPAN.style.backgroundColor = '#a4aec4';
        //console.log(INTENTO[i], "GRIS")
    }
    ROW.appendChild(SPAN)

   }  
   GRID.appendChild(ROW)

    intentos--
    if(intentos==0){
        terminar("<h1>PERDISTE!😖</h1>")
        //console.log("PERDISTE!")
    }
}   

function leerIntento(){
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase();
    return intento;
}

function terminar(mensaje){
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    button.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}

//const input = document.getElementById("guess-input");
//const valor = input.value;
