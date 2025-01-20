// Participante.js

export class Participante {
    constructor(nombre, vehiculo) {
        this.nombre = nombre; 
        this.vehiculo = vehiculo; 
        this.estadisticas = { 
            primeros: 0,
            segundos: 0,
            terceros: 0,
            fueraPodio: 0
        };
        this.tiempoEspera = 0;
    }

    actualizarEstadisticas(posicion) {
        if (posicion === 1) this.estadisticas.primeros++;
        else if (posicion === 2) this.estadisticas.segundos++;
        else if (posicion === 3) this.estadisticas.terceros++;
        else this.estadisticas.fueraPodio++;
    }

    obtenerEstadisticas() {
        return this.estadisticas;
    }
}
