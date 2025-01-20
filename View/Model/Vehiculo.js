export default class Vehiculo {
    constructor(modelo, traccion, velocidadMin, velocidadMax) {
        this.modelo = modelo;
        this.traccion = traccion;
        this.velocidadMin = velocidadMin;
        this.velocidadMax = velocidadMax;
    }

    calcularAvance() {
        return Math.random() * (this.velocidadMax - this.velocidadMin) + this.velocidadMin;
    }
}

class Motocicleta extends Vehiculo {
    calcularAvance() {
        let avance = super.calcularAvance();
        if (this.traccion === 'dura') avance += 5;
        else if (this.traccion === 'mediana') avance += 2;
        return avance;
    }
}

class Coche extends Vehiculo {
    calcularAvance() {
        return super.calcularAvance();
    }
}

export { Motocicleta, Coche };
