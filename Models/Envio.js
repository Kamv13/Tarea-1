import CG from "console-grid";

export class Envio {
  costoBase = 50;
  peso;
  distanciaBase = 50;
  distancia;
  fechaProcesada;

  constructor(peso, distancia) {
    this.peso = peso;
    this.distancia = distancia;
    this.fechaProcesada = new Date();
  }

  calcularRecargoPeso() {
    return this.peso > 5 ? (this.peso - 5) * 20 : 0;
  }

  calcularRecargoDistancia() {
    return this.distancia > this.distanciaBase
      ? Math.ceil(this.distancia - this.distanciaBase) * 10
      : 0;
  }

  calcularFechaEstimadaEntrega() {
    let fechaEntrega = new Date(this.fechaProcesada);
    let diasBase = 2;
    let diferencia = this.distancia - this.distanciaBase;
    let extraDias = diferencia > 0 ? Math.floor(diferencia / 100) : 0;
    let diasTotales = diasBase + extraDias;
    fechaEntrega.setDate(fechaEntrega.getDate() + diasTotales);
    return fechaEntrega.toISOString().split("T")[0];
  }

  calcularTotalEnvio() {
    const recargoPeso = this.calcularRecargoPeso();
    const recargoDistancia = this.calcularRecargoDistancia();
    const subtotal = this.costoBase + recargoPeso + recargoDistancia;
    const extraPorDia = Math.floor((subtotal - this.costoBase) / 100);
    const total = subtotal + extraPorDia;
    const fechaEntrega = this.calcularFechaEstimadaEntrega();

    CG({
      columns: ["Concepto", "Valor"],
      rows: [
        ["Costo base", `L${this.costoBase.toFixed(2)}`],
        ["Recargo por peso", `L${recargoPeso.toFixed(2)}`],
        ["Recargo por distancia", `L${recargoDistancia.toFixed(2)}`],
        ["Dias extra por distancia (+1 cada 100km)", `${extraPorDia.toFixed(2)}`],
        ["Costo total", `L${total.toFixed(2)}`],
        ["Fecha estimada de entrega", fechaEntrega]
      ]
    });
  }
}