export const estado = {
  //Escalonador 
  escalonador:0,

  // Filas
  filaPronto: [],
  filaDisco: [],

  // Processos em execução
  processoAtual: null,
  processoDiscoAtual: null,

  // Quantum
  contadorQuantum: 0,
  quantum: 4,

  // Processos
  contadorProcessos: 0,

  // Tempos totais
  tempoTotalCPU: 0,
  tempoTotalDisco: 0,

  // Timelines
  timelineCPU: [],
  timelineDisco: [],

  // Clock
  clock: 0,

  // Históricos
  historicoCPU: {},
  historicoDisco: {}
};
export const escalonadores = [
  "RR",
  "FCFS",
  "SJF",
  "SP"
];