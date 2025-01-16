import Motocicleta from './Motocicleta.js';
import Coche from '../Script/Coche.js';

class GestionVehiculos {
    constructor() {
        this.vehiculos = [];
    }

    crearVehiculo(tipo, modelo, traccion, avanceMin, avanceMax) {
        if (this.buscarVehiculo(modelo)) {
            console.log(`El vehículo con el modelo "${modelo}" ya existe.`);
            return null;
        }

        let nuevoVehiculo;
        switch (tipo.toLowerCase()) {
            case 'motocicleta':
                nuevoVehiculo = new Motocicleta(modelo, traccion, avanceMin, avanceMax);
                break;
            case 'coche':
                nuevoVehiculo = new Coche(modelo, traccion, avanceMin, avanceMax);
                break;
            default:
                console.log(`Tipo de vehículo "${tipo}" no reconocido.`);
                return null;
        }

        this.vehiculos.push(nuevoVehiculo);
        console.log(`Vehículo "${modelo}" creado con éxito.`);
        return nuevoVehiculo;
    }

    buscarVehiculo(modelo) {
        return this.vehiculos.find((v) => v.modelo === modelo);
    }

    listarVehiculos() {
        if (this.vehiculos.length === 0) {
            console.log("No hay vehículos registrados.");
            return;
        }

        console.log("Lista de vehículos:");
        this.vehiculos.forEach((v) => {
            console.log(`Modelo: ${v.modelo}, Tracción: ${v.traccion}, Avance Min: ${v.avanceMin}, Avance Max: ${v.avanceMax}`);
        });
    }
}

export default GestionVehiculos;
