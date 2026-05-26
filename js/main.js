import { pararTimer, resetarTimer } from "./utils/timer.js";
import { tickSO } from "./core/scheduler.js";
import { adicionar, remover } from "./ui/tabela.js";
import { trocaTema, irParaProcessos } from "./ui/navigation.js";
import { atualizarInterface } from "./ui/interface.js";
import { estado } from "./core/estado.js";

const seletor = document.getElementById("Escalonador");

seletor.addEventListener("change", (e) => {

   estado.escalonador = Number(e.target.value);

});

window.adicionar = adicionar;
window.remover = remover;
window.trocaTema = trocaTema;
window.irParaProcessos = irParaProcessos;
window.resetarTimer = () => {
/*window.setEscalonador = (indice) = > {
  estado.escalonador = indice;
  atualizarInterface();
}  */
while (estado.contadorProcessos > 0) {
  remover();
}
estado.filaDisco.length=0;
estado.filaPronto.length=0;
estado.processoAtual=null;
estado.processoDiscoAtual=null;
estado.timelineCPU.length = 0;
estado.timelineDisco.length = 0;
estado.clock = 0;
estado.contadorQuantum = 0;
atualizarInterface();
};
window.proximo = () => { 
  tickSO();
  atualizarInterface();
};

document.addEventListener("DOMContentLoaded", () => {
  const ano = document.getElementById('ano');
  if (ano) {
    ano.textContent = new Date().getFullYear();
  }

  atualizarInterface();
});


