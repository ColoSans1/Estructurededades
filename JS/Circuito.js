class Circuito {
    constructor(nombre, tiempo, longitud) {
        this.nombre = nombre;
        this.tiempo = tiempo; // "lluvioso", "húmedo", "seco"
        this.longitud = longitud; // longitud del circuito en km
        this.participantes = [];
        this.resultados = [];
    }

    asignarParticipante(participante) {
        if (this.buscarParticipante(participante.nombre)) {
            console.log(`El participante "${participante.nombre}" ya está asignado al circuito.`);
            return false;
        }
        this.participantes.push(participante);
        console.log(`Participante "${participante.nombre}" asignado al circuito "${this.nombre}".`);
        return true;
    }

    iniciarCarrera() {
        console.log(`Iniciando la carrera en el circuito "${this.nombre}"...`);

        const interval = setInterval(() => {
            let todosFinalizados = true;

            this.participantes.forEach(participante => {
                if (participante.distanciaRecorrida < this.longitud) {
                    todosFinalizados = false;

                    const avance = participante.vehiculo.calcularAvance(this.tiempo);
                    participante.distanciaRecorrida += avance;
                    console.log(`${participante.nombre} avanza ${avance.toFixed(2)} km. Total recorrido: ${participante.distanciaRecorrida.toFixed(2)} km.`);

                    if (participante.vehiculo instanceof Motocicleta) {
                        if (participante.vehiculo.controlarCaida(this.tiempo)) {
                            console.log(`${participante.nombre} ha caído al suelo y se detiene por 5 segundos.`);
                            participante.distanciaRecorrida -= avance; 
                        }
                    }
                }
            });

            if (todosFinalizados) {
                clearInterval(interval);
                console.log("La carrera ha terminado!");
                this.mostrarResultados();
            }
        }, 500); 
    }

    mostrarResultados() {
        console.log("Resultados finales:");
        this.participantes
            .sort((a, b) => b.distanciaRecorrida - a.distanciaRecorrida) // Ordenar por distancia recorrida
            .forEach((participante, index) => {
                console.log(`${index + 1}. ${participante.nombre} - ${participante.distanciaRecorrida.toFixed(2)} km`);
                this.resultados.push({ nombre: participante.nombre, distanciaRecorrida: participante.distanciaRecorrida });
            });
    }

    buscarParticipante(nombre) {
        return this.participantes.find((p) => p.nombre === nombre);
    }

    quitarParticipante(nombreParticipante) {
        const index = this.participantes.findIndex(p => p.nombre === nombreParticipante);
        if (index === -1) {
            console.log(`No se encontró el participante "${nombreParticipante}" en el circuito.`);
            return false;
        }
        this.participantes.splice(index, 1);
        console.log(`Participante "${nombreParticipante}" eliminado del circuito "${this.nombre}".`);
        return true;
    }

    listarParticipantes() {
        if (this.participantes.length === 0) {
            console.log(`No hay participantes asignados al circuito "${this.nombre}".`);
            return;
        }
        console.log(`Lista de participantes en el circuito "${this.nombre}":`);
        this.participantes.forEach((p) => {
            console.log(`- ${p.nombre} (Vehículo: ${p.vehiculo.modelo})`);
        });
    }
}

export default Circuito;
