import { estado,escalonadores } from "./estado.js";
import { escalonarRR } from "../algorithms/RoundRobin.js"
import { escalonarFCFS } from "../algorithms/FCFS.js"
import { escalonarSJF } from "../algorithms/SJF.js"
import { escalonarPrioridade } from "../algorithms/SPriority.js"
import {
  pegarProximoDaFila,
  mudarStatus
} from "../core/scheUtils.js";

function registrarCPU(processo) {
  estado.timelineCPU.push({
    id: processo.id,
    cor: processo.linha ? processo.linha.cells[0].style.backgroundColor : "transparent"
  });
}

function registrarDisco(processo) {
  estado.timelineDisco.push({
    id: processo.id,
    cor: processo.linha ? processo.linha.cells[0].style.backgroundColor : "transparent"
  });
}

function executarCPU(processo) {
  registrarCPU(processo);

  if (processo.etapa === "CPU1") {
    processo.cpu1Restante--;

    if (processo.cpu1Restante === 0) {
      processo.etapa = "DISCO1";
      processo.status = "WAITING";
    }
  } else if (processo.etapa === "CPU2") {
    processo.cpu2Restante--;

    if (processo.cpu2Restante === 0) {
      processo.etapa = "DISCO2";
      processo.status = "WAITING";
    }
  }
}

function executarDisco(processo) {
  registrarDisco(processo);

  if (processo.etapa === "DISCO1") {
    processo.disco1Restante--;

    if (processo.disco1Restante === 0) {
      processo.etapa = "CPU2";
      processo.status = "READY";
    }
  } else if (processo.etapa === "DISCO2") {
    processo.disco2Restante--;

    if (processo.disco2Restante === -1) {
      processo.etapa = "FIM";
      processo.status = "TERMINATED";
    }
  }
  console.log(
  processo.id,
  processo.etapa,
  processo.disco2Restante,
  escalonadores[estado.escalonador],
  "Escalonador:",
  estado.escalonador
);
}

function executarDiscoPipeline() {
  if (!estado.processoDiscoAtual && estado.filaDisco.length > 0) {
    estado.processoDiscoAtual = estado.filaDisco.shift();
  }

  if (estado.processoDiscoAtual) {
    executarDisco(estado.processoDiscoAtual);

    if (estado.processoDiscoAtual.status === "READY") {
      estado.filaPronto.push(estado.processoDiscoAtual);
      estado.processoDiscoAtual = null;
    } else if (estado.processoDiscoAtual.status === "TERMINATED") {
      estado.processoDiscoAtual = null;
    }
  }
}

export function tickSO() {
  estado.clock++;
  
  executarDiscoPipeline();

  switch (estado.escalonador) {

    case 0:
      escalonarRR(estado);
      break;

    case 1:
      escalonarFCFS(estado);
      break;

    case 2:
      escalonarSJF(estado);
      break;

    case 3:
      escalonarPrioridade(estado);
      break;
  }

  // executar CPU
  if (estado.processoAtual) {
    executarCPU(estado.processoAtual);

    if (estado.processoAtual.status === "WAITING") {
      if (!estado.processoDiscoAtual) {
        estado.processoDiscoAtual = estado.processoAtual;
      } else {
        estado.filaDisco.push(estado.processoAtual);
      }

      estado.processoAtual = null;
      estado.contadorQuantum = 0;
    } else if (estado.processoAtual.status === "TERMINATED") {
      estado.processoAtual = null;
      estado.contadorQuantum = 0;
    }
  }
}
