class Participante {
    constructor(nombre, vehiculo) {
        this.nombre = nombre;
        this.vehiculo = vehiculo;
        this.estadisticas = {
            primero: 0,
            segundo: 0,
            tercero: 0,
            otros: 0,
        };
    }

    actualizarEstadisticas(posicion) {
        switch (posicion) {
            case 1:
                this.estadisticas.primero++;
                break;
            case 2:
                this.estadisticas.segundo++;
                break;
            case 3:
                this.estadisticas.tercero++;
                break;
            default:
                this.estadisticas.otros++;
                break;
        }
    }

    toString() {
        return `Nombre: ${this.nombre}, Vehículo: ${this.vehiculo.modelo}, Estadísticas: ${JSON.stringify(this.estadisticas)}`;
    }
}

export default Participante;
