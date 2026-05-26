export function escalonarFCFS(estado){
  if (!estado.processoAtual) {

    estado.processoAtual =
      estado.filaPronto.shift();

    if (estado.processoAtual) {
      estado.processoAtual.status =
        "RUNNING";
    }
  } 
}