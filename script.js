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

function atualizarRelogio() {
  const agora = new Date();

  let horas = agora.getHours();
  let minutos = agora.getMinutes();
  let segundos = agora.getSeconds();

  minutos = minutos.toString().padStart(2, '0');
  segundos = segundos.toString().padStart(2, '0');

  const horario = `${horas}:${minutos}:${segundos}`;
  document.getElementById("relogio").innerText = horario;
}
// atualiza a cada 1 segundo
setInterval(atualizarRelogio, 1000);
// roda uma vez logo ao carregar
atualizarRelogio();

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

  // 🔥 cria barra baseada no primeiro CPU
  criarBarraProcesso(contadorProcessos, cor, cpu1);
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

function executarBarra(elemento, tempoCPU) {
  let progresso = 0;

  const intervalo = setInterval(() => {
    progresso++;

    const porcentagem = (progresso / tempoCPU) * 100;
    elemento.style.width = porcentagem + "%";

    if (progresso >= tempoCPU) {
      clearInterval(intervalo);
    }
  }, 500);
}

function criarBarraProcesso(id, cor, tempoCPU) {
  const fila = document.getElementById("fila");

  const container = document.createElement("div");
  container.className = "processo-bar";

  const fill = document.createElement("div");
  fill.className = "processo-fill";
  fill.style.backgroundColor = cor;

  container.appendChild(fill);
  fila.appendChild(container);

  executarBarra(fill, tempoCPU);
}