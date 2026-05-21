import { formatarTempo } from "./helpers.js";

let tempoDecorrido = 0;
let intervalo = null;

export function iniciarTimer(onTick, onUpdate) {
  if (intervalo !== null) return;

  intervalo = setInterval(() => {
    tempoDecorrido++;
    if (typeof onTick === "function") {
      onTick(tempoDecorrido);
    }
    if (typeof onUpdate === "function") {
      onUpdate(formatarTempo(tempoDecorrido));
    }
  }, 1000);
}

export function pararTimer() {
  if (intervalo !== null) {
    clearInterval(intervalo);
    intervalo = null;
  }
}

export function resetarTimer(onUpdate) {
  pararTimer();
  tempoDecorrido = 0;
  if (typeof onUpdate === "function") {
    onUpdate(formatarTempo(tempoDecorrido));
  }
}

