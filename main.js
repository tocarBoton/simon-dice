"use strict";

let arrayInputUsuario = [];
let arrayInputMaquina = [];

function cuadroRandom($cuadros) {
	let indice = Math.floor(Math.random() * $cuadros.length);
	return $cuadros[indice];
}
function marcarCuadro(id) {
	document.getElementById(id).className += " cuadroClikeado ";

	setTimeout(function () {
		document.getElementById(id).classList.remove("cuadroClikeado");
	}, 500);
}
function cuadroRandomInputMaquina() {
	let boton1 = document.querySelector("#cuadro-1");
	let boton2 = document.querySelector("#cuadro-2");
	let boton3 = document.querySelector("#cuadro-3");
	let boton4 = document.querySelector("#cuadro-4");
	let arrayDecuadros = [boton1.id, boton2.id, boton3.id, boton4.id];
	let variableCuadroRandom = cuadroRandom(arrayDecuadros);

	return variableCuadroRandom;
}
function jugarRondaMaquina() {
	bloquearInputUsuario();
	let jugador = document.querySelector("#jugador");
	jugador.textContent = "Juega Maquina";
	arrayInputUsuario = [];
	let turno = document.querySelector("#turno");
	turno.textContent = `Turno Nº${1 + arrayInputMaquina.length}`;
	let inputMaquina = cuadroRandomInputMaquina();
	arrayInputMaquina.push(inputMaquina);
	for (let i = 0; i < arrayInputMaquina.length; i++) {
		setTimeout(function () {
			marcarCuadro(arrayInputMaquina[i]);
		}, 1000 * i);
	}
	setTimeout(function () {
		inputUsuario();
		jugador.textContent = "Juega un gordo teton";
	}, 1250 * arrayInputMaquina.length);
	console.log(arrayInputMaquina);
}

function inputUsuario() {
	let cuadros = document.querySelectorAll(".cuadro");
	for (let i = 0; i < cuadros.length; i++) {
		cuadros[i].onclick = function () {
			marcarCuadro(cuadros[i].id);
			arrayInputUsuario.push(cuadros[i].id);
			if (arrayInputUsuario.length === arrayInputMaquina.length) {
				if (compararInputs(arrayInputUsuario, arrayInputMaquina)) {
					setTimeout(function () {
						jugarRondaMaquina();
					}, 1500);
				} else {
					pierdeUsuario();
				}
			}
		};
	}
}

function bloquearInputUsuario() {
	document.querySelectorAll(".cuadro").forEach(function ($cuadro) {
		$cuadro.onclick = function () {};
	});
}

function compararInputs(arrayInputUsuario, arrayInputMaquina) {
	let esValido = false;
	const botonEmpezarDeNuevo = document.querySelector(
		"#boton-empezar-de-nuevo"
	);
	const estadoDelJuego = document.querySelector("#estado-del-juego");

	if (arrayInputUsuario.length === arrayInputMaquina.length) {
		for (let i = 0; i < arrayInputUsuario.length; i++) {
			if (arrayInputUsuario[i] === arrayInputMaquina[i]) {
				esValido = true;
			} else {
				esValido = false;
				return esValido;
			}
		}
	}
	return esValido;
}

function pierdeUsuario() {
	const estadoDelJuego = document.querySelector("#estado-del-juego");
	const botonEmpezarDeNuevo = document.querySelector(
		"#boton-empezar-de-nuevo"
	);
	botonEmpezarDeNuevo.classList.remove("oculto");
	botonEmpezarDeNuevo.classList.add("btn");
	botonEmpezarDeNuevo.classList.add("btn-primary");
	botonEmpezarDeNuevo.classList.add("btn-lg");
	alert("perdiste manco de mierda!!");
	estadoDelJuego.classList.remove("jugando");
	estadoDelJuego.classList.add("perdiste");
	estadoDelJuego.textContent = "Perdiste gordo puto!!! A tu casa pete!!!";
	let imagen = document.querySelector("#imagen");
	imagen.classList.remove("oculto");
	bloquearInputUsuario();
}

document.querySelector("#boton-empezar").onclick = function () {
	const estadoDelJuego = document.querySelector("#estado-del-juego");
	estadoDelJuego.classList.add("jugando");
	estadoDelJuego.textContent = "Jugando con eña!";
	const botonEmpezar = document.querySelector("#boton-empezar");
	botonEmpezar.classList.remove("btn");
	botonEmpezar.classList.remove("btn-primary");
	botonEmpezar.classList.add("oculto");
	arrayInputMaquina = [];
	arrayInputUsuario = [];
	setTimeout(function () {
		jugarRondaMaquina();
	}, 1000);
};
