// Circuito.js

export class Circuito {
    constructor(nombre, tiempo, longitud) {
        this.nombre = nombre; 
        this.tiempo = tiempo; 
        this.longitud = longitud; 
        this.participantes = []; 
    }

    asignarParticipante(participante) {
        this.participantes.push(participante);
    }

    quitarParticipante(participante) {
        this.participantes = this.participantes.filter(p => p.nombre !== participante.nombre);
    }

    obtenerParticipantes() {
        return this.participantes;
    }
}
