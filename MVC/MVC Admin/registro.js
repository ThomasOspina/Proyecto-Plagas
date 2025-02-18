// model.js
class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}

// view.js
class UserView {
    constructor() {
        this.userForm = document.getElementById('userForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.messageElement = document.getElementById('message');
    }

    renderMessage(message, isSuccess) {
        this.messageElement.textContent = message;
        this.messageElement.style.color = isSuccess ? 'green' : 'red';
    }

    clearForm() {
        this.emailInput.value = '';
        this.passwordInput.value = '';
    }
}

// controller.js
class UserController {
    constructor() {
        this.users = [];
        this.view = new UserView();
        this.view.userForm.addEventListener('submit', this.handleFormSubmit.bind(this));
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const email = this.view.emailInput.value;
        const password = this.view.passwordInput.value;

        const user = new User(email, password);
        this.users.push(user);
        this.view.renderMessage('¡Registro exitoso!', true);
        this.view.clearForm();
    }

    isValidEmail(email) {
        const re = /^[\w-.]+@[\w-_]+(\.[a-zA-Z]{2,4}){1,2}$/;
        return re.test(email);
    }

    isValidPassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
        return passwordRegex.test(password);
    }
}

// Inicializar el controlador
const userController = new UserController();
