const diasEl = document.getElementById("dias");
const horasEl = document.getElementById("horas");
const minutosEl = document.getElementById("minutos");
const segundosEl = document.getElementById("segundos");

const nossodia = "2026-09-01T00:00:00";

function countdown(){

    const nossodiaDate = new Date(nossodia);
    const now = new Date();

    const diff = Math.abs(nossodiaDate - now);
    const totalSeconds = diff / 1000;

    const dias = Math.floor(totalSeconds / 3600 / 24);
    const horas = Math.floor(totalSeconds / 3600) % 24;
    const minutos = Math.floor(totalSeconds / 60) % 60;
    const segundos = Math.floor(totalSeconds) % 60;

     diasEl.innerHTML = dias;
     horasEl.innerHTML = formaTime(horas);
     minutosEl.innerHTML = formaTime(minutos);
     segundosEl.innerHTML = formaTime(segundos);

}

function formaTime(time){
    return time < 10 ? `0${time}` : time;

    }


countdown();
setInterval(countdown, 1000);