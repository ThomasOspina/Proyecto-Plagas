let usuarios = [
    { id: 1, nombre: "Juan Pérez", email: "juan@example.com", cedula: "1234567890", password: "contraseña1", rol: "Admin" },
    { id: 2, nombre: "María López", email: "maria@example.com", cedula: "2345678901", password: "contraseña2", rol: "Técnico" }
];

const plagasData = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    datasets: [{
        label: "Plagas Reportadas",
        data: [10, 15, 5, 20, 25, 30, 10, 5, 15, 20],
        backgroundColor: "rgba(125, 180, 54, 0.2)",
        borderColor: "rgb(125, 180, 54)",
        borderWidth: 1
    }]
};

const config = {
    type: "line",
    data: plagasData,
    options: {
        responsive: true,
        scales: { y: { beginAtZero: true } }
    }
};

new Chart(document.getElementById("plagasChart"), config);

function cargarUsuarios() {
    const userTableBody = document.getElementById("userTableBody");
    userTableBody.innerHTML = "";
    usuarios.forEach(usuario => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.email}</td>
            <td>${usuario.cedula}</td>
            <td>
                <select class="role-select" onchange="cambiarRol(${usuario.id}, this.value)">
                    <option value="Admin" ${usuario.rol === "Admin" ? "selected" : ""}>Admin</option>
                    <option value="Técnico" ${usuario.rol === "Técnico" ? "selected" : ""}>Técnico</option>
                </select>
            </td>
            <td><button onclick="eliminarUsuario(${usuario.id})">Eliminar</button></td>
        `;
        userTableBody.appendChild(row);
    });
}

function agregarUsuario() {
    const nombre = document.getElementById("nombreInput").value;
    const email = document.getElementById("emailInput").value;
    const cedula = document.getElementById("cedulaInput").value;
    const password = document.getElementById("passwordInput").value;
    const rol = document.getElementById("rolInput").value;

    if (nombre && email && cedula && password && rol) {
        usuarios.push({ id: usuarios.length + 1, nombre, email, cedula, password, rol });
        cargarUsuarios();
        document.getElementById("userForm").reset();
    } else {
        alert("Por favor, completa todos los campos.");
    }
}

function cambiarRol(id, nuevoRol) {
    const usuario = usuarios.find(u => u.id === id);
    if (usuario) usuario.rol = nuevoRol;
}

function eliminarUsuario(id) {
    usuarios = usuarios.filter(u => u.id !== id);
    cargarUsuarios();
}

function mostrarSeccion(seccion) {
    document.querySelectorAll(".content > section").forEach(section => section.style.display = "none");
    document.querySelector(`.${seccion}`).style.display = "block";
}

function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
}

cargarUsuarios();
