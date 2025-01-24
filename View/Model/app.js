import Vehiculo, { Motocicleta, Coche } from './Vehiculo.js';
import Participante from './Participante.js';
import Circuito from './Circuito.js';

document.addEventListener('DOMContentLoaded', function () {
    console.log("Documento cargado");

    const circuitos = []; 

    function agregarVehiculoAlSelect(vehiculo) {
        const selectVehiculo = document.getElementById('participant-vehicle');
        const option = document.createElement('option');
        option.value = vehiculo.modelo;  
        option.textContent = vehiculo.modelo;  
        selectVehiculo.appendChild(option);  
        console.log("Vehículo agregado al select", vehiculo.modelo);
    }

    function agregarCircuitoAlSelect(circuito) {
        const selectCircuito = document.getElementById('circuit-select');
        const option = document.createElement('option');
        option.value = circuito.nombre;  
        option.textContent = `${circuito.nombre} (${circuito.tiempo})`;
        selectCircuito.appendChild(option);
        console.log("Circuito agregado al select:", circuito.nombre);
    }

    // Agregar evento para guardar el vehículo
    document.querySelectorAll('.btn-primary')[1].addEventListener('click', function () {
        console.log("Botón 'Nuevo Vehículo' clickeado");

        const modelo = document.getElementById('vehicle-model').value;
        const velocidadMin = document.getElementById('min-speed').value;
        const velocidadMax = document.getElementById('max-speed').value;
        const traccion = document.getElementById('vehicle-traction').value;

        if (modelo && velocidadMin && velocidadMax) {
            const vehiculo = new Vehiculo(modelo, traccion, parseInt(velocidadMin), parseInt(velocidadMax));
            agregarVehiculoAlSelect(vehiculo);

            // Limpiar los campos después de crear el vehículo
            document.getElementById('vehicle-model').value = '';
            document.getElementById('min-speed').value = '';
            document.getElementById('max-speed').value = '';
            document.getElementById('vehicle-traction').value = 'dura';
            
            console.log('Vehículo creado correctamente:', vehiculo);
        } else {
            alert("Por favor, complete todos los campos.");
        }
    });

    // Agregar evento para guardar el participante
    document.querySelector('.btn-primary').addEventListener('click', function () {
        console.log("Botón 'Guardar Participante' clickeado");

        const nombre = document.getElementById('participant-name').value;
        const vehiculoSeleccionado = document.getElementById('participant-vehicle').value;

        if (nombre && vehiculoSeleccionado !== 'Selecciona un vehículo') {
            const participante = new Participante(nombre, vehiculoSeleccionado);
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
    
        // Depurar valores
        console.log("Nombre del circuito:", nombre);
        console.log("Longitud del circuito:", longitud);
        console.log("Tiempo del circuito:", tiempo);
    
        // Validar los campos
        if (!nombre) {
            console.log("Nombre vacío");
        }
        if (isNaN(longitud) || longitud <= 0) {
            console.log("Longitud inválida");
        }
        if (!["lluvioso", "húmedo", "seco"].includes(tiempo)) {
            console.log("Tiempo inválido");
        }
    
        if (nombre && !isNaN(longitud) && longitud > 0 && ["lluvioso", "húmedo", "seco"].includes(tiempo)) {
            const nuevoCircuito = new Circuito(nombre, tiempo, longitud);
            circuitos.push(nuevoCircuito); // Agregar el circuito a la lista
            agregarCircuitoAlSelect(nuevoCircuito);
    
            // Limpiar campos después de crear el circuito
            document.getElementById('circuit-name').value = '';
            document.getElementById('circuit-length').value = '';
            document.getElementById('circuit-time').value = '';
    
            console.log('Circuito creado correctamente:', nuevoCircuito);
        } else {
            alert("Por favor, complete todos los campos correctamente.");
        }
    });

});
