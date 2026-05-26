import { estado } from "./estado.js";

export function pegarProximoDaFila() {
  if (estado.filaPronto.length === 0) return null;
  return estado.filaPronto.shift();
}

export function mudarStatus(processo, novoStatus) {
  if (!processo) return;
  processo.status = novoStatus;
}