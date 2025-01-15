import Vehiculo from './Vehiculo.js';

class Motocicleta extends Vehiculo {
    constructor(modelo, traccion, avanceMinimo, avanceMaximo) {
        super(modelo, traccion, avanceMinimo, avanceMaximo);
        this.caida = false; 
        this.turnosSinAvanzar = 0; 
    }

    avanzar(terreno) {
        if (this.caida) {
            this.turnosSinAvanzar--; 
            if (this.turnosSinAvanzar <= 0) this.caida = false; 
            console.log(`${this.modelo} ha caído y no avanzará durante ${this.turnosSinAvanzar} turnos.`);
            return 0; // No avanza
        }

        const baseMovimiento = Math.floor(
            Math.random() * (this.avanceMaximo - this.avanceMinimo + 1) + this.avanceMinimo
        );

        let modificador = 0;
        if (this.traccion === "dura") modificador = 5;
        else if (this.traccion === "mediana") modificador = 2;

        const movimientoTotal = baseMovimiento + modificador;

        if (this.verificarCaida(terreno)) {
            this.caida = true; 
            this.turnosSinAvanzar = 5; 
            console.log(`${this.modelo} ha caído al suelo y no avanzará durante 5 turnos.`);
            return 0; // No avanza
        }

        return movimientoTotal;
    }

    verificarCaida(terreno) {
        const probabilidadCaida = {
            mojado: { dura: 30, mediana: 20 },
            humedo: { dura: 20, mediana: 10 },
            default: 5,
        };

        const porcentaje = probabilidadCaida[terreno]?.[this.traccion] || probabilidadCaida.default;

        return Math.random() * 100 < porcentaje;
    }
}

export default Motocicleta;
