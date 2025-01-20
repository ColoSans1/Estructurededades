import { Vehiculo } from './Vehiculo';  
import { Participante } from './Participante';  
import { Circuito } from './Circuito';  

document.addEventListener('DOMContentLoaded', function() {
    console.log("Documento cargado"); // Para verificar si el DOM se ha cargado correctamente.

    function agregarVehiculoAlSelect(vehiculo) {
        const selectVehiculo = document.getElementById('participant-vehicle');
        const option = document.createElement('option');
        option.value = vehiculo.modelo;  
        option.textContent = vehiculo.modelo;  
        selectVehiculo.appendChild(option);  
        console.log("Vehículo agregado al select", vehiculo.modelo);
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

    // Agregar evento para crear un nuevo circuito
    document.querySelector('.btn-primary.mt-3').addEventListener('click', function () {
        console.log("Botón 'Nueva Carrera' clickeado");

        const nombre = document.getElementById('circuit-name').value;
        const longitud = document.getElementById('circuit-length').value;
        const tiempo = document.getElementById('circuit-time').value;

        if (nombre && longitud && tiempo) {
            const circuito = new Circuito(nombre, tiempo, longitud);
            console.log('Circuito creado correctamente:', circuito);
        } else {
            alert("Por favor, complete todos los campos del circuito.");
        }
    });
});
