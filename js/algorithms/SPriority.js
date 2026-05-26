import {
  mudarStatus
} from "../core/scheUtils.js";

export function escalonarPrioridade(estado){
    if (!estado.processoAtual) {
        estado.filaPronto.sort((a, b) => a.prioridade - b.prioridade );
        estado.processoAtual = estado.filaPronto.shift();
        if (estado.processoAtual) {
            mudarStatus(estado.processoAtual, "RUNNING");
        }
    }
}