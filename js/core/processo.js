export class Processo {
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