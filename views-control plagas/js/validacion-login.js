// Obtenemos los elementos del formulario
const cedulaInput = document.querySelector('.cedula');
const contraseñaInput = document.querySelector('.contraseña');
const errorCedula = document.querySelector('.error-cedula');
const errorContraseña = document.querySelector('.error-contraseña');
const formulario = document.querySelector('.formulario-login');

// Ocultar mensajes de error al inicio
errorCedula.style.display = 'none';
errorContraseña.style.display = 'none';

// Expresiones regulares para validación
const cedulaRegex = /^\d{8,10}$/;
const contraseñaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// Función para validar la cédula
const validarCedula = () => {
    if (cedulaInput.value.trim() === '') {
        mostrarError(errorCedula, cedulaInput, 'Por favor, ingrese su número de cédula.');
        return false;
    } else if (!cedulaRegex.test(cedulaInput.value)) {
        mostrarError(errorCedula, cedulaInput, 'Número de cédula inválido. Debe tener entre 8 y 10 dígitos.');
        return false;
    }
    ocultarError(errorCedula, cedulaInput);
    return true;
};

// Función para validar la contraseña
const validarContraseña = () => {
    if (contraseñaInput.value.trim() === '') {
        mostrarError(errorContraseña, contraseñaInput, 'Por favor, ingrese su contraseña.');
        return false;
    } else if (!contraseñaRegex.test(contraseñaInput.value)) {
        mostrarError(errorContraseña, contraseñaInput, 'Debe tener al menos 8 caracteres, una letra y un número.');
        return false;
    }
    ocultarError(errorContraseña, contraseñaInput);
    return true;
};

// Muestra el mensaje de error y resalta el campo
const mostrarError = (errorElemento, inputElemento, mensaje) => {
    errorElemento.textContent = mensaje;
    errorElemento.style.display = 'block';
    inputElemento.classList.add('input-error');
};

// Oculta el mensaje de error y quita el resaltado
const ocultarError = (errorElemento, inputElemento) => {
    errorElemento.style.display = 'none';
    inputElemento.classList.remove('input-error');
};

// Validación en tiempo real
cedulaInput.addEventListener('input', validarCedula);
contraseñaInput.addEventListener('input', validarContraseña);

// Evento submit del formulario
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const cedulaValida = validarCedula();
    const contraseñaValida = validarContraseña();

    if (cedulaValida && contraseñaValida) {
        formulario.submit();
    }
});
