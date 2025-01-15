class Participante {
    constructor(nombre) {
        this.nombre = nombre; 
        this.estadisticas = {
            primero: 0,
            segundo: 0,
            tercero: 0,
            otros: 0
        };
    }

    actualizarPosicion(posicion) {
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

    mostrarEstadisticas() {
        console.log(`Estadísticas de ${this.nombre}:`);
        console.log(`1º lugar: ${this.estadisticas.primero}`);
        console.log(`2º lugar: ${this.estadisticas.segundo}`);
        console.log(`3º lugar: ${this.estadisticas.tercero}`);
        console.log(`Otros: ${this.estadisticas.otros}`);
    }
}

export default Participante;
