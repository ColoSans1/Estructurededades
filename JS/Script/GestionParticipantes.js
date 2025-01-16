import Participante from '../Model/Participante.js';

class GestionParticipantes {
    constructor() {
        this.participantes = [];
    }

    crearParticipante(nombre, vehiculo) {
        if (this.buscarParticipante(nombre)) {
            console.log(`El participante con el nombre "${nombre}" ya existe.`);
            return null;
        }
        const nuevoParticipante = new Participante(nombre, vehiculo);
        this.participantes.push(nuevoParticipante);
        console.log(`Participante "${nombre}" creado con éxito.`);
        return nuevoParticipante;
    }

    buscarParticipante(nombre) {
        return this.participantes.find((p) => p.nombre === nombre);
    }

    modificarParticipante(nombre, nuevoVehiculo) {
        const participante = this.buscarParticipante(nombre);
        if (!participante) {
            console.log(`No se encontró un participante con el nombre "${nombre}".`);
            return false;
        }
        participante.vehiculo = nuevoVehiculo;
        console.log(`Participante "${nombre}" modificado con éxito.`);
        return true;
    }

    listarParticipantes() {
        if (this.participantes.length === 0) {
            console.log("No hay participantes registrados.");
            return;
        }
        console.log("Lista de participantes:");
        this.participantes.forEach((p) => console.log(p.toString()));
    }

    verEstadisticas(nombre) {
        const participante = this.buscarParticipante(nombre);
        if (!participante) {
            console.log(`No se encontró un participante con el nombre "${nombre}".`);
            return;
        }
        console.log(`Estadísticas de "${nombre}":`, participante.estadisticas);
    }
}

export default GestionParticipantes;
