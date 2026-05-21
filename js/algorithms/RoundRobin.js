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
