import {
  pegarProximoDaFila,
  mudarStatus
} from "../core/scheUtils.js";
export function escalonarRR(estado) {
  
  if (!estado.processoAtual) {
    estado.processoAtual = pegarProximoDaFila();
    estado.contadorQuantum = 0;

    if (estado.processoAtual) {
      mudarStatus(estado.processoAtual, "RUNNING");
    }
  }
  

   if(estado.processoAtual){
    estado.contadorQuantum++;

    if (estado.processoAtual && estado.contadorQuantum >= estado.quantum) {

      estado.processoAtual.status = "READY";
      estado.filaPronto.push(estado.processoAtual);
      estado.processoAtual = null;
      estado.contadorQuantum = 0;
    }
  }
}
