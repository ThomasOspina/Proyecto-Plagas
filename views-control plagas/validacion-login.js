// Obtenemos los elementos del formulario
const cedulaInput = document.querySelector('.cedula');
const contraseñaInput = document.querySelector('.contraseña');
const errorCedula = document.querySelector('.error-cedula');
const errorContraseña = document.querySelector('.error-contraseña');
const formulario = document.querySelector('.formulario-login');

// Ocultar mensajes de error al cargar
errorCedula.style.display = 'none';
errorContraseña.style.display = 'none';

// Expresiones regulares para validación
const cedulaRegex = /^\d{8,10}$/; // Cédula de 10 dígitos
const contraseñaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Contraseña: mínimo 8 caracteres, al menos una letra y un número

// Evento de submit del formulario
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    // Valida que ambos campos estén completos
    if (cedulaInput.value === '' || contraseñaInput.value === '') {
        if (cedulaInput.value === '') {
            errorCedula.textContent = 'Por favor, complete el número de cédula.';
            errorCedula.style.display = 'block';
            errorContraseña.textContent = '';
            errorContraseña.style.display = 'none';
        } else {
            errorContraseña.textContent = 'Por favor, complete la contraseña.';
            errorContraseña.style.display = 'block';
            errorCedula.textContent = '';
            errorCedula.style.display = 'none';
        }
        return;
    }

    // Valida que la cédula cumpla con el formato
    if (!cedulaRegex.test(cedulaInput.value)) {
        errorCedula.textContent = 'Número de cédula inválido. Debe tener 10 dígitos.';
        errorCedula.style.display = 'block';
        errorContraseña.textContent = '';
        errorContraseña.style.display = 'none';
        cedulaInput.focus();
        return;
    }

    // Valida que la contraseña cumpla con el formato
    if (!contraseñaRegex.test(contraseñaInput.value)) {
        errorContraseña.textContent = 'Contraseña inválida.';
        errorContraseña.style.display = 'block';
        errorCedula.textContent = '';
        errorCedula.style.display = 'none';
        contraseñaInput.focus();
        return;
    }

    // Envía el formulario (si llegaste aquí, los campos son válidos)
    formulario.submit();
});
