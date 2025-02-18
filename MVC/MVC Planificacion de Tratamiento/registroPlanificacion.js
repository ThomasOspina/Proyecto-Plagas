// model.js
class PlanificacionTratamiento {
    constructor(fechaInicio, fechaFin, informeTratamiento) {
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.informeTratamiento = informeTratamiento;
    }
}

// view.js
class PlanificacionTratamientoView {
    constructor() {
        this.form = document.getElementById('planificacionForm');
        this.fechaInicioInput = document.getElementById('fechaInicio');
        this.fechaFinInput = document.getElementById('fechaFin');
        this.informeTratamientoInput = document.getElementById('informeTratamiento');
        this.messageElement = document.getElementById('message');
    }

    renderMessage(message, isSuccess) {
        this.messageElement.textContent = message;
        this.messageElement.style.color = isSuccess ? 'green' : 'red';
    }

    clearForm() {
        this.fechaInicioInput.value = '';
        this.fechaFinInput.value = '';
        this.informeTratamientoInput.value = '';
    }
}

// controller.js
class PlanificacionTratamientoController {
    constructor() {
        this.planificaciones = [];
        this.view = new PlanificacionTratamientoView();
        this.view.form.addEventListener('submit', this.handleFormSubmit.bind(this));
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const fechaInicio = this.view.fechaInicioInput.value;
        const fechaFin = this.view.fechaFinInput.value;
        const informeTratamiento = this.view.informeTratamientoInput.value;

        if (this.isValidDate(fechaInicio) && this.isValidDate(fechaFin) && informeTratamiento) {
            const planificacion = new PlanificacionTratamiento(fechaInicio, fechaFin, informeTratamiento);
            this.planificaciones.push(planificacion);
            this.view.renderMessage('¡Planificación registrada con éxito!', true);
            this.view.clearForm();
        } else {
            this.view.renderMessage('Por favor, complete todos los campos correctamente.', false);
        }
    }

    isValidDate(dateString) {
        // Comprobar si la fecha es válida
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateString.match(regex)) return false;
        const date = new Date(dateString);
        return date.toISOString().slice(0, 10) === dateString;
    }
}

// Inicializar el controlador
const planificacionController = new PlanificacionTratamientoController();
