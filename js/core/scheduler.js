import { estado } from "./estado.js";

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

    if (processo.disco2Restante === 0) {
      processo.etapa = "FIM";
      processo.status = "TERMINATED";
    }
  }
}

function pegarProximoDaFila() {
  if (estado.filaPronto.length === 0) return null;
  return estado.filaPronto.shift();
}

function mudarStatus(processo, novoStatus) {
  if (!processo) return;
  processo.status = novoStatus;
}

export function tickSO() {
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

  if (!estado.processoAtual) {
    estado.processoAtual = pegarProximoDaFila();
    estado.contadorQuantum = 0;

    if (estado.processoAtual) {
      mudarStatus(estado.processoAtual, "RUNNING");
    }
  }

  if (estado.processoAtual) {
    executarCPU(estado.processoAtual);
    estado.contadorQuantum += 1;

    if (estado.processoAtual.status === "WAITING") {
      if (!estado.processoDiscoAtual) {
        estado.processoDiscoAtual = estado.processoAtual;
      } else {
        estado.filaDisco.push(estado.processoAtual);
      }

      estado.processoAtual = null;
      estado.contadorQuantum = 0;
    } else if (estado.contadorQuantum === estado.quantum) {
      mudarStatus(estado.processoAtual, "READY");
      estado.filaPronto.push(estado.processoAtual);
      estado.processoAtual = null;
      estado.contadorQuantum = 0;
    } else if (estado.processoAtual.status === "TERMINATED") {
      estado.processoAtual = null;
      estado.contadorQuantum = 0;
    }
  }
}
