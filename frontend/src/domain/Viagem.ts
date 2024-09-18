/* eslint-disable @typescript-eslint/no-explicit-any */
export class Viagem {
  id: number;
  nome: string;
  dataSaida: string;
  dataChegada: string;
  valor: number;
  destino: string;

  constructor(obj: any = {}) {
    this.id = obj.id;
    this.nome = obj.nome || '';
    this.dataSaida = obj.dataSaida || '';
    this.dataChegada = obj.dataChegada || '';
    this.destino = obj.destino || '';
    this.valor = obj.valor;
  }
}