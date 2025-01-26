import Vehiculo, { Motocicleta, Coche } from './Vehiculo.js';
import Participante from './Participante.js';
import Circuito from './Circuito.js';

document.addEventListener('DOMContentLoaded', function () {
    console.log("Documento cargado");

    const circuitos = [];
    const participantes = [];
    const asignaciones = new Map(); // Mapa para asociar circuitos con sus participantes

    function agregarVehiculoAlSelect(vehiculo) {
        const selectVehiculo = document.getElementById('participant-vehicle');
        const option = document.createElement('option');
        option.value = vehiculo.modelo;
        option.textContent = vehiculo.modelo;
        selectVehiculo.appendChild(option);
        console.log("Vehículo agregado al select", vehiculo.modelo);
    }

    function agregarCircuitoAlSelect(circuito) {
        const selects = ['circuit-select', 'circuit-remove'];
        selects.forEach(selectId => {
            const select = document.getElementById(selectId);
            const option = document.createElement('option');
            option.value = circuito.nombre;
            option.textContent = `${circuito.nombre} (${circuito.tiempo})`;
            select.appendChild(option);
        });
        console.log("Circuito agregado al select:", circuito.nombre);
    }

    function actualizarParticipantesSelect() {
        const selects = ['participant-select', 'participant-remove'];
        selects.forEach(selectId => {
            const select = document.getElementById(selectId);
            select.innerHTML = '<option selected>Selecciona un participante</option>';
            participantes.forEach(participante => {
                const option = document.createElement('option');
                option.value = participante.nombre;
                option.textContent = participante.nombre;
                select.appendChild(option);
            });
        });
    }

    document.querySelectorAll('.btn-primary')[1].addEventListener('click', function () {
        console.log("Botón 'Nuevo Vehículo' clickeado");

        const modelo = document.getElementById('vehicle-model').value;
        const velocidadMin = document.getElementById('min-speed').value;
        const velocidadMax = document.getElementById('max-speed').value;
        const traccion = document.getElementById('vehicle-traction').value;

        if (modelo && velocidadMin && velocidadMax) {
            const vehiculo = new Vehiculo(modelo, traccion, parseInt(velocidadMin), parseInt(velocidadMax));
            agregarVehiculoAlSelect(vehiculo);

            document.getElementById('vehicle-model').value = '';
            document.getElementById('min-speed').value = '';
            document.getElementById('max-speed').value = '';
            document.getElementById('vehicle-traction').value = 'dura';

            console.log('Vehículo creado correctamente:', vehiculo);
        } else {
            alert("Por favor, complete todos los campos.");
        }
    });

    document.querySelector('.btn-primary').addEventListener('click', function () {
        console.log("Botón 'Guardar Participante' clickeado");

        const nombre = document.getElementById('participant-name').value;
        const vehiculoSeleccionado = document.getElementById('participant-vehicle').value;

        if (nombre && vehiculoSeleccionado !== 'Selecciona un vehículo') {
            const participante = new Participante(nombre, vehiculoSeleccionado);
            participantes.push(participante);
            actualizarParticipantesSelect();
            console.log('Participante creado correctamente:', participante);
        } else {
            alert("Por favor, complete todos los campos.");
        }
    });

    document.querySelector('.btn-primary.mt-3').addEventListener('click', function () {
        console.log("Botón 'Nueva Carrera' clickeado");

        const nombre = document.getElementById('circuit-name').value.trim();
        const longitud = parseFloat(document.getElementById('circuit-length').value.trim());
        const tiempo = document.getElementById('circuit-time').value.trim();

        if (nombre && !isNaN(longitud) && longitud > 0 && ["lluvioso", "húmedo", "seco"].includes(tiempo)) {
            const nuevoCircuito = new Circuito(nombre, tiempo, longitud);
            circuitos.push(nuevoCircuito);
            agregarCircuitoAlSelect(nuevoCircuito);

            document.getElementById('circuit-name').value = '';
            document.getElementById('circuit-length').value = '';
            document.getElementById('circuit-time').value = '';

            console.log('Circuito creado correctamente:', nuevoCircuito);
        } else {
            alert("Por favor, complete todos los campos correctamente.");
        }
    });

    document.querySelector('.btn-success').addEventListener('click', function () {
        const circuitoNombre = document.getElementById('circuit-select').value;
        const participanteNombre = document.getElementById('participant-select').value;

        if (circuitoNombre !== 'Selecciona un circuito' && participanteNombre !== 'Selecciona un participante') {
            if (!asignaciones.has(circuitoNombre)) {
                asignaciones.set(circuitoNombre, []);
            }
            const participantesAsignados = asignaciones.get(circuitoNombre);
            if (!participantesAsignados.includes(participanteNombre)) {
                participantesAsignados.push(participanteNombre);
                console.log(`Participante ${participanteNombre} asignado a ${circuitoNombre}`);
                alert(`Participante ${participanteNombre} asignado al circuito ${circuitoNombre}.`);
            } else {
                alert(`El participante ${participanteNombre} ya está asignado a ${circuitoNombre}.`);
            }
        } else {
            alert("Por favor, selecciona un circuito y un participante.");
        }
    });

    document.querySelector('.btn-danger').addEventListener('click', function () {
        const circuitoNombre = document.getElementById('circuit-remove').value;
        const participanteNombre = document.getElementById('participant-remove').value;

        if (circuitoNombre !== 'Selecciona un circuito' && participanteNombre !== 'Selecciona un participante') {
            if (asignaciones.has(circuitoNombre)) {
                const participantesAsignados = asignaciones.get(circuitoNombre);
                const index = participantesAsignados.indexOf(participanteNombre);
                if (index !== -1) {
                    participantesAsignados.splice(index, 1);
                    console.log(`Participante ${participanteNombre} removido de ${circuitoNombre}`);
                    alert(`Participante ${participanteNombre} eliminado del circuito ${circuitoNombre}.`);
                } else {
                    alert(`El participante ${participanteNombre} no está asignado a ${circuitoNombre}.`);
                }
            } else {
                alert(`No hay participantes asignados al circuito ${circuitoNombre}.`);
            }
        } else {
            alert("Por favor, selecciona un circuito y un participante.");
        }
    });


    
    document.getElementById('start-race').addEventListener('click', function () {
        console.log("Botón 'START!' clickeado");
    
        const circuitoNombre = document.getElementById('circuit-select').value;
        const circuitoSeleccionado = circuitos.find(c => c.nombre === circuitoNombre);
    
        if (!circuitoSeleccionado) {
            alert("Por favor, selecciona un circuito válido.");
            return;
        }
    
        if (!asignaciones.has(circuitoNombre) || asignaciones.get(circuitoNombre).length === 0) {
            alert("No hay participantes asignados a este circuito.");
            return;
        }
    
        const participantesCircuito = asignaciones.get(circuitoNombre);
        const resultados = [];
    
        // Simulación: calcular el tiempo total de cada participante
        participantesCircuito.forEach(participanteNombre => {
            const participante = participantes.find(p => p.nombre === participanteNombre);
    
            if (participante) {
                const tiempoPorKm = Math.random() * (2 - 1) + 1; // Tiempo aleatorio entre 1 y 2 minutos por km
                const tiempoTotal = circuitoSeleccionado.longitud * tiempoPorKm;
                resultados.push({ nombre: participante.nombre, tiempo: tiempoTotal });
            }
        });
    
        // Ordenar los resultados por el tiempo (de menor a mayor)
        resultados.sort((a, b) => a.tiempo - b.tiempo);
    
        // Mostrar los resultados en la tabla
        const tbody = document.querySelector('#race-results tbody');
        tbody.innerHTML = ''; // Limpiar la tabla antes de agregar los nuevos resultados
    
        resultados.forEach((resultado, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${resultado.nombre}</td>
                <td>${resultado.tiempo.toFixed(2)}</td>
            `;
            tbody.appendChild(row);
        });
    
        console.log("Resultados de la carrera:", resultados);
        alert(`Resultados de la carrera en "${circuitoNombre}" cargados exitosamente.`);
    });
    

});

