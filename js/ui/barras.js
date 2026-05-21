import { estado } from "../core/estado.js";

export function desenharBarraCPU() {
  const barra = document.getElementById("cpuBarra");
  if (!barra) return;

  barra.innerHTML = "";
  if (!estado.timelineCPU.length) return;

  const largura = estado.tempoTotalCPU > 0 ? 100 / estado.tempoTotalCPU : 0;

  estado.timelineCPU.forEach(p => {
    const parte = document.createElement("div");
    parte.style.width = largura + "%";
    parte.style.backgroundColor = p.cor;
    barra.appendChild(parte);
  });
}

export function desenharBarraDisco() {
  const barra = document.getElementById("discoBarra");
  if (!barra) return;

  barra.innerHTML = "";
  if (!estado.timelineDisco.length) return;

  const largura = estado.tempoTotalDisco > 0 ? 100 / estado.tempoTotalDisco : 0;

  estado.timelineDisco.forEach(p => {
    const parte = document.createElement("div");
    parte.style.width = largura + "%";
    parte.style.backgroundColor = p.cor;
    barra.appendChild(parte);
  });
}

