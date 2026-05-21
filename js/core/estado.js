export const estado = {
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
  clockSO: null,

  // Históricos
  historicoCPU: {},
  historicoDisco: {}
};