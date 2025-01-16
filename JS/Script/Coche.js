import Vehiculo from '../Model/Vehiculo.js';

class Coche extends Vehiculo {
    constructor(modelo, traccion, avanceMinimo, avanceMaximo) {
        super(modelo, traccion, avanceMinimo, avanceMaximo);
    }

    avanzar(terreno) {
        const baseMovimiento = Math.floor(
            Math.random() * (this.avanceMaximo - this.avanceMinimo + 1) + this.avanceMinimo
        );

        const modificadores = {
            blanda: { lluvioso: 4, humedo: 2, seco: 0 },
            mediana: { lluvioso: 2, humedo: 2, seco: 2 },
            dura: { lluvioso: 0, humedo: 2, seco: 4 },
        };

        const modificador = modificadores[this.traccion]?.[terreno] || 0;

        return baseMovimiento + modificador;
    }
}

export default Coche;
