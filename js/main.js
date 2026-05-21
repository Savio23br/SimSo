import { iniciarTimer, pararTimer, resetarTimer } from "./utils/timer.js";
import { tickSO } from "./core/scheduler.js";
import { adicionar, remover } from "./ui/tabela.js";
import { trocaTema, irParaProcessos } from "./ui/navigation.js";
import { atualizarInterface } from "./ui/interface.js";

function atualizarRelogio(tempoFormatado) {
  const relogio = document.getElementById("relogio");
  if (relogio) {
    relogio.innerText = tempoFormatado;
  }
}

window.adicionar = adicionar;
window.remover = remover;
window.trocaTema = trocaTema;
window.irParaProcessos = irParaProcessos;
window.iniciarTimer = () => iniciarTimer(() => {
  tickSO();
  atualizarInterface();
}, atualizarRelogio);
window.pararTimer = pararTimer;
window.resetarTimer = () => resetarTimer(atualizarRelogio);

document.addEventListener("DOMContentLoaded", () => {
  const ano = document.getElementById('ano');
  if (ano) {
    ano.textContent = new Date().getFullYear();
  }

  atualizarInterface();
});


