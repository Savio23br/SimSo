export function escalonarSJF(estado){
    if (!estado.processoAtual) {
        
        estado.filaPronto.sort((a, b) => {

        let tempoA =a.etapa === "CPU1" ? a.cpu1Restante : a.cpu2Restante;

        let tempoB = b.etapa === "CPU1" ? b.cpu1Restante : b.cpu2Restante;

        return tempoA - tempoB;
    });

    estado.processoAtual = estado.filaPronto.shift();

    if (estado.processoAtual) {
      estado.processoAtual.status = "RUNNING";
    }
  }
}