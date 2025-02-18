// model.js
class Siembra {
    constructor(fechaSiembra, ubicacion, capacidad, numeroLote, estadoLote, tipoPlanta, numeroPlantas) {
        this.fechaSiembra = fechaSiembra;
        this.ubicacion = ubicacion;
        this.capacidad = capacidad;
        this.numeroLote = numeroLote;
        this.estadoLote = estadoLote;
        this.tipoPlanta = tipoPlanta;
        this.numeroPlantas = numeroPlantas;
    }
}

// view.js
class SiembraView {
    constructor() {
        this.siembraForm = document.getElementById('siembraForm');
        this.fechaSiembraInput = document.getElementById('fechaSiembra');
        this.ubicacionInput = document.getElementById('ubicacion');
        this.capacidadInput = document.getElementById('capacidad');
        this.numeroLoteInput = document.getElementById('numeroLote');
        this.estadoLoteInput = document.getElementById('estadoLote');
        this.tipoPlantaInput = document.getElementById('tipoPlanta');
        this.numeroPlantasInput = document.getElementById('numeroPlantas');
        this.siembraTableBody = document.getElementById('siembraTableBody');
        this.messageElement = document.getElementById('message');
    }

    renderSiembraList(siembras) {
        // Limpiar el cuerpo de la tabla antes de renderizar nuevamente
        siembras.forEach(siembra => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${siembra.fechaSiembra}</td>
                <td>${siembra.ubicacion}</td>
                <td>${siembra.capacidad}</td>
                <td>${siembra.numeroLote}</td>
                <td>${siembra.estadoLote}</td>
                <td>${siembra.tipoPlanta}</td>
                <td>${siembra.numeroPlantas}</td>
            `;
        });
    }

    renderMessage(message, isSuccess) {
        this.messageElement.textContent = message;
        this.messageElement.style.color = isSuccess ? 'green' : 'red';
    }

    clearForm() {
        this.fechaSiembraInput.value = '';
        this.ubicacionInput.value = '';
        this.capacidadInput.value = '';
        this.numeroLoteInput.value = '';
        this.estadoLoteInput.value = '';
        this.tipoPlantaInput.value = '';
        this.numeroPlantasInput.value = '';
    }
}

// controller.js
class SiembraController {
    constructor() {
        this.siembras = [];
        this.view = new SiembraView();
        this.view.siembraForm.addEventListener('submit', this.handleFormSubmit.bind(this));
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const fechaSiembra = this.view.fechaSiembraInput.value;
        const ubicacion = this.view.ubicacionInput.value;
        const capacidad = this.view.capacidadInput.value;
        const numeroLote = this.view.numeroLoteInput.value;
        const estadoLote = this.view.estadoLoteInput.value;
        const tipoPlanta = this.view.tipoPlantaInput.value;
        const numeroPlantas = this.view.numeroPlantasInput.value;

        // Validaciones simples
        if (!this.isValidDate(fechaSiembra) || !ubicacion || !capacidad || !numeroLote || !estadoLote || !tipoPlanta || !numeroPlantas) {
            this.view.renderMessage('Por favor, complete todos los campos correctamente.', false);
            return;
        }

        const siembra = new Siembra(fechaSiembra, ubicacion, capacidad, numeroLote, estadoLote, tipoPlanta, numeroPlantas);
        this.siembras.push(siembra);
        this.view.renderSiembraList(this.siembras);
        this.view.renderMessage('¡Registro exitoso!', true);
        this.view.clearForm();
    }

    isValidDate(dateString) {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return dateString.match(regex) !== null;
    }
}

// Inicializar el controlador
const siembraController = new SiembraController();
