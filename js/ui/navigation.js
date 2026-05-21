export function irParaProcessos() {
  const hero = document.querySelector(".hero");
  const processo = document.querySelector(".processo");
  const mais = document.querySelector(".mais");

  if (hero) hero.classList.add("sumir");
  if (processo) processo.classList.add("ativo");
  if (mais) mais.classList.add("ativo");

  const processos = document.getElementById("processos");
  if (processos) {
    processos.scrollIntoView({ behavior: "smooth" });
  }
}

export function trocaTema() {
  const html = document.documentElement;
  const escolha = html.getAttribute('tema');
  html.setAttribute('tema', escolha === 'dark' ? 'light' : 'dark');
}
