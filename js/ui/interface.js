import { estado } from "../core/estado.js";
import { desenharFila, desenharDisco } from "./filas.js";
import { desenharBarraCPU, desenharBarraDisco } from "./barras.js";

export function atualizarInterface() {
  const todosProcessos = [
    estado.processoAtual,
    ...estado.filaPronto,
    estado.processoDiscoAtual,
    ...estado.filaDisco
  ].filter(Boolean);

  todosProcessos.forEach(p => {
    const linha = p.linha;
    if (!linha) return;

    linha.cells[1].innerText = p.cpu1Restante;
    linha.cells[2].innerText = p.disco1Restante;
    linha.cells[3].innerText = p.cpu2Restante;
    linha.cells[4].innerText = p.disco2Restante;

    linha.style.opacity = p.status === "TERMINATED" ? "0.4" : "1";
  });

  desenharFila();
  desenharDisco();
  desenharBarraCPU();
  desenharBarraDisco();
}

