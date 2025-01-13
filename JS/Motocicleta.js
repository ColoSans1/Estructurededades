import Vehiculo from './Vehiculo.js';

class Motocicleta extends Vehiculo {
    constructor(modelo, traccion, avanceMinimo, avanceMaximo) {
        super(modelo, traccion, avanceMinimo, avanceMaximo);
        this.caida = false; // Indica si la motocicleta ha caído
        this.turnosSinAvanzar = 0; // Contador para los turnos sin poder avanzar
    }

    avanzar(terreno) {
        if (this.caida) {
            this.turnosSinAvanzar--; // Disminuye el contador de turnos sin avanzar
            if (this.turnosSinAvanzar <= 0) this.caida = false; // Se recupera después de 5 turnos
            console.log(`${this.modelo} ha caído y no avanzará durante ${this.turnosSinAvanzar} turnos.`);
            return 0; // No avanza
        }

        const baseMovimiento = Math.floor(
            Math.random() * (this.avanceMaximo - this.avanceMinimo + 1) + this.avanceMinimo
        );

        let modificador = 0;
        if (this.traccion === "dura") modificador = 5;
        else if (this.traccion === "mediana") modificador = 2;

        // Suma el modificador al avance base
        const movimientoTotal = baseMovimiento + modificador;

        // Verifica si la motocicleta cae
        if (this.verificarCaida(terreno)) {
            this.caida = true; // La motocicleta cae
            this.turnosSinAvanzar = 5; // Establece el tiempo de inactividad debido a la caída
            console.log(`${this.modelo} ha caído al suelo y no avanzará durante 5 turnos.`);
            return 0; // No avanza
        }

        return movimientoTotal; // Devuelve el avance total
    }

    // Método para verificar si la motocicleta cae basado en el terreno y tracción
    verificarCaida(terreno) {
        const probabilidadCaida = {
            mojado: { dura: 30, mediana: 20 },
            humedo: { dura: 20, mediana: 10 },
            default: 5, // Probabilidad base para otros terrenos
        };

        // Determina el porcentaje de caída según el terreno y la tracción
        const porcentaje = probabilidadCaida[terreno]?.[this.traccion] || probabilidadCaida.default;

        // Retorna verdadero si el número aleatorio es menor que la probabilidad de caída
        return Math.random() * 100 < porcentaje;
    }
}

export default Motocicleta;
