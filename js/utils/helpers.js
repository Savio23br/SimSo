export function gerarIntervalo(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function formatarTempo(segundosTotais) {
  const horas = Math.floor(segundosTotais / 3600);
  const minutos = Math.floor((segundosTotais % 3600) / 60);
  const segundos = segundosTotais % 60;

  return `${horas.toString().padStart(2,'0')}:` + `${minutos.toString().padStart(2,'0')}:` + `${segundos.toString().padStart(2,'0')}`;
}

