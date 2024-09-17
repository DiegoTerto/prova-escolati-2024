/* eslint-disable @typescript-eslint/no-explicit-any */
export class Viagem {
  nome: string;
  dataSaida: string;
  dataChegada: string;
  valor: number;

  constructor(obj: any = {}) {
    this.nome = obj.nome || '';
    this.dataSaida = obj.dataSaida || '';
    this.dataChegada = obj.dataChegada || '';
    this.valor = obj.valor;
  }
}