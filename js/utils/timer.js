import { estado } from "../core/estado.js";
import { formatarTempo } from "./helpers.js";

let tempoDecorrido = 0;
let intervalo = null;

export function pararTimer() {
  if (intervalo !== null) {
    clearInterval(intervalo);
    intervalo = null;
  }
}

export function resetarTimer() {
  estado.clock = 0;
}

