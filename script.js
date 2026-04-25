let filaPronto = [];
let executando = false;
let quantum=4;
let processoAtual = null;
let contadorQuantum = 0;
let clockSO = null;
let filaDisco = [];
let processoDiscoAtual = null;
let historicoCPU = {};
let historicoDisco = {};
let tempoTotalCPU = 0;
let tempoTotalDisco = 0;
let timelineCPU = [];
let timelineDisco = [];
let TOTAL_CPU = 0;
let TOTAL_DISCO = 0;


class Processo {
  constructor(id, cpu1, disco1, cpu2, disco2) {
    this.id = id;

    this.cpu1Total = cpu1;
    this.disco1Total = disco1;
    this.cpu2Total = cpu2;
    this.disco2Total = disco2;

    this.cpu1Restante = cpu1;
    this.disco1Restante = disco1;
    this.cpu2Restante = cpu2;
    this.disco2Restante = disco2;

    this.etapa = "CPU1";

    this.status = "READY";
  }
}

function executarCPU(processo) {
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

function mudarStatus(processo, novoStatus) {
  processo.status = novoStatus;
  atualizarInterface();
}

document.addEventListener('DOMContentLoaded', () => {
    const ano = document.getElementById('ano');
    if (ano) {
        ano.textContent = new Date().getFullYear();
    }
});

function trocaTema() {
    const html = document.documentElement;
    const escolha = html.getAttribute('tema');
    html.setAttribute('tema', escolha === 'dark' ? 'light' : 'dark');
}

let tempoDecorrido = 0;

let intervalo = null;

function formatarTempo(segundosTotais) {
  const horas = Math.floor(segundosTotais / 3600);
  const minutos = Math.floor((segundosTotais % 3600) / 60);
  const segundos = segundosTotais % 60;

  return `${horas.toString().padStart(2,'0')}:`+`${minutos.toString().padStart(2,'0')}:`+`${segundos.toString().padStart(2,'0')}`;
}

function atualizarTimer() {
  tempoDecorrido++;
  document.getElementById("relogio").innerText =
    formatarTempo(tempoDecorrido);
}

function iniciarTimer() {
  if (intervalo !== null) return;

  intervalo = setInterval(atualizarTimer, 1000);
  clockSO = setInterval(tickSO, 1000);
}

function pararTimer() {
  clearInterval(intervalo);
  clearInterval(clockSO);
  intervalo = null;
  clockSO = null;
}

function resetarTimer() {
  pararTimer();
  tempoDecorrido = 0;
  document.getElementById("relogio").innerText = "00:00:00";
}
 
let contadorProcessos = 0;

function gerarIntervalo(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gerarCor() {
  const r = Math.floor(Math.random() * 156); // 0–155 (evita claro demais)
  const g = Math.floor(Math.random() * 156);
  const b = Math.floor(Math.random() * 156);

  return `rgb(${r}, ${g}, ${b})`;
}

function adicionar() {
  //Limitador de 4 processos maximos
  
  
  if(contadorProcessos<= 3){
  contadorProcessos++;

  const tbody = document.querySelector(".corpo-tabela");

  const linha = tbody.insertRow();

  // ID
  const celulaId = linha.insertCell(0);
  celulaId.innerText = contadorProcessos;

  const cor = gerarCor();
  celulaId.style.backgroundColor = cor;
  celulaId.style.color = "#fff";

  // CPU 1 (1 a 9)
  const cpu1 = linha.insertCell(1);
  cpu1.innerText = gerarIntervalo(1, 9);

  // Disco (8 a 15)
  const disco1 = linha.insertCell(2);
  disco1.innerText = gerarIntervalo(8, 15);

  // CPU 2 (1 a 9)
  const cpu2 = linha.insertCell(3);
  cpu2.innerText = gerarIntervalo(1, 9);

  // Disco 2 (8 a 15)
  const disco2 = linha.insertCell(4);
  disco2.innerText = gerarIntervalo(8, 15);
  
  const p = new Processo(contadorProcessos,parseInt(cpu1.innerText),parseInt(disco1.innerText),parseInt(cpu2.innerText),parseInt(disco2.innerText)
  );
  
  p.linha =linha;

  filaPronto.push(p);
  }
  desenharFila();
}

function pegarProximoDaFila() {
  if (filaPronto.length === 0) return null;
  return filaPronto.shift();
}

function tickSO() {

  // ===================== DISCO =====================

  // Se não tem processo no disco, pega da fila
  if (!processoDiscoAtual && filaDisco.length > 0) {
    processoDiscoAtual = filaDisco.shift();
  }

  // Executa o disco
  if (processoDiscoAtual) {
    executarDisco(processoDiscoAtual);
    registrarDisco(processoDiscoAtual);

    if (processoDiscoAtual.status === "READY") {
      filaPronto.push(processoDiscoAtual);
      processoDiscoAtual = null;
    }
    else if (processoDiscoAtual.status === "TERMINATED") {
      processoDiscoAtual = null;
    }
  }

  // ================= CPU =================

if (!processoAtual) {
  processoAtual = pegarProximoDaFila();
  contadorQuantum = 0;

  if (processoAtual) {
    mudarStatus(processoAtual, "RUNNING");
  }
}

if (processoAtual) {

  executarCPU(processoAtual);
  registrarCPU(processoAtual);
  contadorQuantum ++;

  // SE ACABOU CPU, NÃO REGISTRA TEMPO
  if (processoAtual.status === "WAITING") {

    if (!processoDiscoAtual) {
      processoDiscoAtual = processoAtual;
    } else {
      filaDisco.push(processoAtual);
    }

    processoAtual = null;
    contadorQuantum = 0;
  }

else if (contadorQuantum === quantum) {
  mudarStatus(processoAtual, "READY");
  filaPronto.push(processoAtual);
  processoAtual = null;
  contadorQuantum = 0;
}

  else if (processoAtual.status === "TERMINATED") {
      processoAtual = null;
      contadorQuantum = 0;

  }
}
atualizarInterface();
}


 

function remover() {
  const tbody = document.querySelector(".corpo-tabela");

  if (tbody.rows.length > 0) {
    tbody.deleteRow(tbody.rows.length - 1);
    contadorProcessos--;
  }

}

function irParaProcessos() {
  const hero = document.querySelector(".hero");
  const processo = document.querySelector(".processo");
  const mais = document.querySelector(".mais");
  // some hero
  hero.classList.add("sumir");
  // aparece processo
  processo.classList.add("ativo");
  mais.classList.add("ativo");
}

//novidades

let contBarra=0;

function desenharFila() {
  const fila = document.getElementById("filaPronto");
  fila.innerHTML = "";

  filaPronto.forEach(p => {
    const bloco = document.createElement("div");
    bloco.className = "bloco-fila";
    bloco.innerText = "P" + p.id;
    bloco.style.backgroundColor = corDoProcesso(p);
    fila.appendChild(bloco);
  });
}

function desenharDisco() {
  const fila = document.getElementById("filaDisco");
  fila.innerHTML = "";

  filaDisco.forEach(p => {
    const bloco = document.createElement("div");
    bloco.className = "bloco-fila";
    bloco.innerText = "P" + p.id;
    bloco.style.backgroundColor = corDoProcesso(p);
    fila.appendChild(bloco);
  });
}

function atualizarInterface() {

  const todosProcessos = [
    processoAtual,
    ...filaPronto,
    ...filaDisco
  ].filter(p => p);

  todosProcessos.forEach(p => {
    const linha = p.linha;

    linha.cells[1].innerText = p.cpu1Restante;
    linha.cells[2].innerText = p.disco1Restante;
    linha.cells[3].innerText = p.cpu2Restante;
    linha.cells[4].innerText = p.disco2Restante;

    linha.style.opacity = p.status === "TERMINATED" ? "0.4" : "1";
  });

  desenharFila();
  desenharDisco();
}

function corDoProcesso(p) {
  return p.linha.cells[0].style.backgroundColor;
}

function registrarCPU(processo){
    timelineCPU.push({
        id: processo.id,
        cor: corDoProcesso(processo)
    });

    tempoTotalCPU++;
    desenharBarraCPU();
}

function registrarDisco(processo){
    timelineDisco.push({
        id: processo.id,
        cor: corDoProcesso(processo)
    });

    tempoTotalDisco++;
    desenharBarraDisco();
}

function desenharBarraCPU(){
    const barra = document.getElementById("cpuBarra");
    barra.innerHTML = "";

    const largura = 100 / tempoTotalCPU;

    timelineCPU.forEach(p => {
        const parte = document.createElement("div");
        parte.style.width = largura + "%";
        parte.style.backgroundColor = p.cor;
        barra.appendChild(parte);
    });
}

function desenharBarraDisco(){
    const barra = document.getElementById("discoBarra");
    barra.innerHTML = "";

    const largura = 100 / tempoTotalDisco;

    timelineDisco.forEach(p => {
        const parte = document.createElement("div");
        parte.style.width = largura + "%";
        parte.style.backgroundColor = p.cor;
        barra.appendChild(parte);
    });
}

