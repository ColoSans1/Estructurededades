// Importa la clase Vehiculo como 'default', y las otras clases por nombre
import Vehiculo, { Motocicleta, Coche } from '../Model/Vehiculo.js';
import Participante from '../Model/Participante.js';
import Circuito from '../Model/Circuito.js'; // Asegúrate que este archivo esté correctamente exportado

export class Simulador {
    constructor() {
        this.circuitos = []; // Lista de circuitos disponibles
    }

    agregarCircuito(circuito) {
        this.circuitos.push(circuito);
    }

    iniciarCarrera(circuitoNombre) {
        const circuito = this.circuitos.find(c => c.nombre === circuitoNombre);
        if (!circuito) throw new Error(`Circuito '${circuitoNombre}' no encontrado.`);

        const participantes = circuito.obtenerParticipantes();
        if (participantes.length === 0) throw new Error("No hay participantes en el circuito.");

        const posiciones = participantes.map(p => ({
            participante: p,
            distancia: 0
        }));

        console.log(`Iniciando la carrera en el circuito '${circuito.nombre}'...`);

        let tiempo = 0;
        while (posiciones.some(pos => pos.distancia < circuito.longitud)) {
            tiempo += 0.5;
            posiciones.forEach(pos => {
                if (pos.participante.tiempoEspera > 0) {
                    pos.participante.tiempoEspera -= 1;
                } else {
                    const avance = pos.participante.vehiculo.calcularAvance(circuito.tiempo);
                    pos.distancia += avance;
                }
            });

            // Ordena los participantes por su distancia (mayor a menor)
            posiciones.sort((a, b) => b.distancia - a.distancia);
        }

        console.log("¡Carrera finalizada!");
        posiciones.forEach((pos, index) => {
            console.log(`#${index + 1}: ${pos.participante.nombre} - ${pos.distancia.toFixed(2)}m`);
            pos.participante.actualizarEstadisticas(index + 1);
        });

        return posiciones.map(p => p.participante);
    }
}
