import { estado } from "../core/estado.js";
import { corDoProcesso } from "../utils/cores.js";

export function desenharFila() {
  const fila = document.getElementById("filaPronto");
  if (!fila) return;

  fila.innerHTML = "";

  estado.filaPronto.forEach(p => {
    const bloco = document.createElement("div");
    bloco.className = "bloco-fila";
    bloco.innerText = "P" + p.id;
    bloco.style.backgroundColor = corDoProcesso(p);
    fila.appendChild(bloco);
  });
}

export function desenharDisco() {
  const fila = document.getElementById("filaDisco");
  if (!fila) return;

  fila.innerHTML = "";

  estado.filaDisco.forEach(p => {
    const bloco = document.createElement("div");
    bloco.className = "bloco-fila";
    bloco.innerText = "P" + p.id;
    bloco.style.backgroundColor = corDoProcesso(p);
    fila.appendChild(bloco);
  });
}