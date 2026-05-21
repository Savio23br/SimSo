export function gerarCor() {
  const r = Math.floor(Math.random() * 156); // 0–155 (evita claro demais)
  const g = Math.floor(Math.random() * 156);
  const b = Math.floor(Math.random() * 156);

  return `rgb(${r}, ${g}, ${b})`;
}

export function corDoProcesso(p) {
  return p && p.linha && p.linha.cells[0]
    ? p.linha.cells[0].style.backgroundColor
    : "transparent";
}

