



// VARIABLES Y ESTRUCTURAS


// Buscamos el contenedor principal del HTML
const app = document.getElementById("app");

// Array para guardar las operaciones realizadas
let historial = [];




// BARRA DE NAVEGACIÓN

// Array con las opciones de navegación
const opciones = ["Calculadora", "Historial", "Información"];

// Creamos la barra
const nav = document.createElement("nav");
nav.className = "navegacion";

// Usamos FOR para crear los botones sin repetir código
for (let i = 0; i < opciones.length; i++) {

    const boton = document.createElement("button");

    boton.textContent = opciones[i];
    boton.className = "boton-nav";

    // Cada botón llama a cambiarSeccion()
    boton.onclick = function () {
        cambiarSeccion(opciones[i]);
    };

    nav.appendChild(boton);
}

// Agregamos la barra a la página
app.appendChild(nav);






// CONTENEDOR DEL CONTENIDO

const contenido = document.createElement("div");
contenido.id = "contenido";

app.appendChild(contenido);





// CAMBIAR DE SECCIÓN

function cambiarSeccion(seccion) {

    // SWITCH para decidir qué sección mostrar
    switch (seccion) {

        case "Calculadora":
            mostrarCalculadora();
            break;

        case "Historial":
            mostrarHistorial();
            break;

        case "Información":
            mostrarInformacion();
            break;
    }
}






// CALCULADORA

function mostrarCalculadora() {

    // Limpiamos el contenido anterior
    contenido.innerHTML = "";
   
    const titulo = document.createElement("h1");
titulo.textContent = "Calculadora";



contenido.appendChild(titulo);

    // Creamos la calculadora
    const calculadora = document.createElement("div");
    calculadora.className = "calculadora";

    // Creamos la pantalla
    const pantalla = document.createElement("input");
    pantalla.type = "text";
    pantalla.id = "pantalla";
    pantalla.readOnly = true;

    calculadora.appendChild(pantalla);




    // BOTONES

    const botones = document.createElement("div");
    botones.className = "botones";

    // Array con los operadores
    const operadores = ["+", "-", "x", "/"];

    // FOR para crear los operadores
    for (let i = 0; i < operadores.length; i++) {

        const boton = document.createElement("button");

        boton.textContent = operadores[i];
        boton.className = "botonoperador";

        boton.onclick = function () {
            agregar(operadores[i]);
        };

        botones.appendChild(boton);
    }


    // Array con los números
    const numeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    // FOR para crear los botones numéricos
    for (let i = 0; i < numeros.length; i++) {

        const boton = document.createElement("button");

        boton.textContent = numeros[i];

        if (numeros[i] === "0") {
            boton.className = "botoncero";
        } else {
            boton.className = "botonnormal";
        }

        boton.onclick = function () {
            agregar(numeros[i]);
        };

        botones.appendChild(boton);
    }


    // BOTON C
    const borrar = document.createElement("button");

    borrar.textContent = "C";
    borrar.className = "borrartodo";

    borrar.onclick = function () {
        limpiar();
    };

    botones.appendChild(borrar);




    // BOTON DECIMAL
    const decimal = document.createElement("button");

    decimal.textContent = ".";
    decimal.className = "botonnormal";

    decimal.onclick = function () {
        agregar(".");
    };

    botones.appendChild(decimal);





    // BOTON IGUAL
    const igual = document.createElement("button");

    igual.textContent = "=";
    igual.className = "botonigual";

    igual.onclick = function () {
        calcular();
    };

    botones.appendChild(igual);


    // Agregamos los botones a la calculadora
    calculadora.appendChild(botones);

    // Agregamos la calculadora a la página
    contenido.appendChild(calculadora);
}





// AGREGAR NÚMEROS Y OPERADORES


function agregar(valor) {

    const pantalla = document.getElementById("pantalla");

    pantalla.value = pantalla.value + valor;
}






// LIMPIAR

function limpiar() {

    const pantalla = document.getElementById("pantalla");

    pantalla.value = "";
}





// CALCULAR

function calcular() {

    const pantalla = document.getElementById("pantalla");

    let texto = pantalla.value;

    // sii el texto tiene una x la cambiamos por * para poder calcular
    let textoMatematico = texto.replace("x", "*");

    let operador = "";

    // IF para encontrar el operador
    if (textoMatematico.includes("-")) {
        operador = "-";
    }
    else if (textoMatematico.includes("+")) {
        operador = "+";
    }
    else if (textoMatematico.includes("*")) {
        operador = "*";
    }
    else if (textoMatematico.includes("/")) {
        operador = "/";
    }

    // Si no hay operador, termina la función
    if (operador === "") {
        return;
    }

    // Separamos los números
    let partes = textoMatematico.split(operador);

    let num1 = Number(partes[0]);
    let num2 = Number(partes[1]);

    let resultado;


    // SWITCH para elegir la operación
    switch (operador) {

        case "+":
            resultado = num1 + num2;
            break;

        case "-":
            resultado = num1 - num2;
            break;

        case "*":
            resultado = num1 * num2;
            break;

        case "/":

            // IF para evitar dividir por cero
            if (num2 === 0) {
                pantalla.value = "ERROR";
                return;
            }

            resultado = num1 / num2;
            break;
    }


    // Mostramos el resultado
    pantalla.value = resultado;


    // Guardamos la operación en el array
    historial.push(texto + " = " + resultado);
   
   
   
    // Mantenemos como maximo 10 operaciones

    while (historial.length > 10) {
    historial.shift();
}
}



// HISTORIAL


function mostrarHistorial() {

    contenido.innerHTML = "";

    const titulo = document.createElement("h1");
    titulo.textContent = "Historial de operaciones";

    contenido.appendChild(titulo);


    // Si no hay operaciones
    if (historial.length === 0) {

        const mensaje = document.createElement("p");

        mensaje.textContent = "Todavía no hay operaciones.";

        contenido.appendChild(mensaje);

        return;
    }


    const lista = document.createElement("ul");

    // FOR para recorrer el array
    for (let i = 0; i < historial.length; i++) {

        const elemento = document.createElement("li");

        elemento.textContent = historial[i];

        lista.appendChild(elemento);
    }

    contenido.appendChild(lista);
}



// INFORMACIÓN


// COMO USAR LA CALCULADORA

function mostrarInformacion() {

    contenido.innerHTML = "";

    // TITULO
    const titulo = document.createElement("h1");
    titulo.textContent = "¿Cómo usar la calculadora?";
    contenido.appendChild(titulo);


    // INTRODUCCION
    const introduccion = document.createElement("p");

    introduccion.textContent =
        "Usar la calculadora es muy sencillo. Seguí estos pasos para realizar una operación.";

    contenido.appendChild(introduccion);


    // PASOS

    const pasos = [
        {
            titulo: "1 Número",
            texto: "Elegí el primer número de la operación"
        },

        {
            titulo: "2 Operación",
            texto: "Elegí qué operación querés realizar: suma, resta, multiplicación o división"
        },

        {
            titulo: "3 Segundo número",
            texto: "Elegí el segundo número de la operación"
        },

        {
            titulo: "4 Resultado",
            texto: "Presioná el botón = para obtener el resultado"
        }
    ];


    const contenedorPasos = document.createElement("div");

    contenedorPasos.className = "contenedor-pasos";


    // FOR para crear las tarjetas 
    for (let i = 0; i < pasos.length; i++) {

        const tarjeta = document.createElement("div");

        tarjeta.className = "tarjeta-paso";


        const subtitulo = document.createElement("h2");

        subtitulo.textContent = pasos[i].titulo;


        const texto = document.createElement("p");

        texto.textContent = pasos[i].texto;


        tarjeta.appendChild(subtitulo);

        tarjeta.appendChild(texto);

        contenedorPasos.appendChild(tarjeta);
    }


    contenido.appendChild(contenedorPasos);





    // EJEMPLO

    const ejemplo = document.createElement("div");

    ejemplo.className = "ejemplo";


    const tituloEjemplo = document.createElement("h2");

    tituloEjemplo.textContent = "Ejemplo";


    const operacion = document.createElement("p");

    operacion.textContent = "8 x 5 = 40";


    const explicacion = document.createElement("p");

    explicacion.textContent =
        "Para comenzar una nueva operación, presioná el botón C";


    ejemplo.appendChild(tituloEjemplo);

    ejemplo.appendChild(operacion);

    ejemplo.appendChild(explicacion);


    contenido.appendChild(ejemplo);
}







// INICIAR LA PÁGINA

// Mostramos la calculadora al entrar
mostrarCalculadora();