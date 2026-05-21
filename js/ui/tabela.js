import { estado } from "../core/estado.js";
import { Processo } from "../core/processo.js";
import { gerarIntervalo } from "../utils/helpers.js";
import { gerarCor } from "../utils/cores.js";
import { atualizarInterface } from "./interface.js";

function recalcularTemposTotais() {
  estado.tempoTotalCPU = 0;
  estado.tempoTotalDisco = 0;

  const todos = [
    estado.processoAtual,
    estado.processoDiscoAtual,
    ...estado.filaPronto,
    ...estado.filaDisco
  ].filter(Boolean);

  todos.forEach(p => {
    estado.tempoTotalCPU += p.cpu1Restante + p.cpu2Restante;
    estado.tempoTotalDisco += p.disco1Restante + p.disco2Restante;
  });
}

function atualizarProcessoDaLinha(celula) {
  const linha = celula.parentElement;
  const id = Number(linha.cells[0].innerText);

  const todos = [
    estado.processoAtual,
    estado.processoDiscoAtual,
    ...estado.filaPronto,
    ...estado.filaDisco
  ].filter(Boolean);

  const processo = todos.find(p => p && p.id === id);
  if (!processo) return;

  const cpu1 = Number(linha.cells[1].innerText);
  const disco1 = Number(linha.cells[2].innerText);
  const cpu2 = Number(linha.cells[3].innerText);
  const disco2 = Number(linha.cells[4].innerText);

  processo.cpu1Total = cpu1;
  processo.disco1Total = disco1;
  processo.cpu2Total = cpu2;
  processo.disco2Total = disco2;

  processo.cpu1Restante = cpu1;
  processo.disco1Restante = disco1;
  processo.cpu2Restante = cpu2;
  processo.disco2Restante = disco2;

  recalcularTemposTotais();
}

function removerProcessoDoSistema(id) {
  const todos = [
    ...estado.filaPronto,
    ...estado.filaDisco,
    estado.processoAtual,
    estado.processoDiscoAtual
  ].filter(p => p && p.id === id);

  if (todos.length > 0) {
    const p = todos[0];
    estado.tempoTotalCPU -= (p.cpu1Total + p.cpu2Total);
    estado.tempoTotalDisco -= (p.disco1Total + p.disco2Total);
  }

  estado.filaPronto = estado.filaPronto.filter(p => p.id !== id);
  estado.filaDisco = estado.filaDisco.filter(p => p.id !== id);

  if (estado.processoAtual && estado.processoAtual.id === id) {
    estado.processoAtual = null;
  }

  if (estado.processoDiscoAtual && estado.processoDiscoAtual.id === id) {
    estado.processoDiscoAtual = null;
  }

  delete estado.historicoCPU[id];
  delete estado.historicoDisco[id];
}

export function adicionar() {
  if (estado.contadorProcessos >= 4) return;

  estado.contadorProcessos++;

  const tbody = document.querySelector(".corpo-tabela");
  if (!tbody) return;

  const linha = tbody.insertRow();
  const celulaId = linha.insertCell(0);
  celulaId.innerText = estado.contadorProcessos;

  const cor = gerarCor();
  celulaId.style.backgroundColor = cor;
  celulaId.style.color = "#fff";

  function criarCelulaEditavel(valor, coluna) {
    const celula = linha.insertCell(coluna);
    celula.innerText = valor;
    celula.contentEditable = true;

    celula.addEventListener("input", () => {
      celula.innerText = celula.innerText.replace(/\D/g, "");
    });

    celula.addEventListener("blur", () => {
      atualizarProcessoDaLinha(celula);
    });

    return celula;
  }

  const cpu1 = criarCelulaEditavel(gerarIntervalo(1, 9), 1);
  const disco1 = criarCelulaEditavel(gerarIntervalo(8, 15), 2);
  const cpu2 = criarCelulaEditavel(gerarIntervalo(1, 9), 3);
  const disco2 = criarCelulaEditavel(gerarIntervalo(8, 15), 4);

  const p = new Processo(
    estado.contadorProcessos,
    Number(cpu1.innerText),
    Number(disco1.innerText),
    Number(cpu2.innerText),
    Number(disco2.innerText)
  );

  p.linha = linha;
  estado.filaPronto.push(p);
  recalcularTemposTotais();
  atualizarInterface();
}

export function remover() {
  const tbody = document.querySelector(".corpo-tabela");
  if (!tbody || tbody.rows.length === 0) return;

  const ultimaLinha = tbody.rows[tbody.rows.length - 1];
  const id = Number(ultimaLinha.cells[0].innerText);

  removerProcessoDoSistema(id);
  tbody.deleteRow(tbody.rows.length - 1);
  estado.contadorProcessos--;
  atualizarInterface();
}



