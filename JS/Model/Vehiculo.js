class Vehiculo {
    constructor(modelo, traccion, avanceMin, avanceMax) {
        this.modelo = modelo;
        this.traccion = traccion;
        this.avanceMin = avanceMin;
        this.avanceMax = avanceMax;
    }

    calcularAvance(tiempo) {
        const avanceBase = Math.random() * (this.avanceMax - this.avanceMin) + this.avanceMin;
        return avanceBase;
    }
    avanzar() {
        throw new Error('Método "avanzar" no implementado');
    }

}

export default Vehiculo;