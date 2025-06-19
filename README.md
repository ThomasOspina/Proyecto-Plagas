# 🐛 Sistema de Control de Riesgos y Plagas

Este es un sistema web desarrollado para la **gestión y control de plagas en cultivos agrícolas**, dirigido a administradores, técnicos y campesinos.
Permite monitorear plagas, generar diagnósticos, planificar tratamientos y administrar usuarios desde un panel centralizado.

---

## 📁 Estructura del Proyecto

📦 Sistema-Plagas
├── Backend_Plagas/ # Proyecto backend con Django
├── front_end/ # Proyecto frontend con React
├── Base de Datos Plagas/ # Script o modelo de la base de datos (MySQL Workbench)
└── Especificación de Requisitos Plagas/ # Documento de requisitos funcionales

yaml
Copiar
Editar

---

## ⚙️ Tecnologías Utilizadas

### 🖥️ Frontend
- React
- TypeScript
- React Router
- Chart.js
- CSS Modules / custom styles
- Axios

### ⚙️ Backend
- Django
- Django REST Framework (DRF)
- JWT Authentication (SimpleJWT)
- MySQL como motor de base de datos

---

## 🔐 Funcionalidades Clave

### Login Seguro
- Autenticación basada en tokens JWT
- Redirección según el rol (`admin`, `técnico`, `campesino`)
- Rutas protegidas usando `PrivateRoute`

### Panel del Administrador
- Crear, editar y eliminar usuarios
- Visualizar estadísticas de plagas (gráficos mensuales)
- Consultar informes: monitoreo, diagnósticos y tratamientos
- Configuración general del sistema
- Logout seguro

### Gestión Técnica
- Registro de monitoreo y plagas
- Diagnóstico automatizado
- Planificación de tratamientos fitosanitarios

---

## 🗃️ Base de Datos

- Modelada en **MySQL Workbench**
- Incluye relaciones entre usuarios, reportes, plagas, tratamientos, entre otros

---

## 📄 Documentación

En la carpeta **"Especificación de Requisitos Plagas"** se encuentra la documentación oficial del sistema, incluyendo:
- Casos de uso
- Requisitos funcionales y no funcionales
- Modelos de datos

---

## 🚀 Instrucciones para Desarrolladores

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu_usuario/tu_repositorio.git
cd tu_repositorio
2. Backend (Django)
bash
Copiar
Editar
cd Backend_Plagas
python -m venv venv
source venv/bin/activate  # o venv\Scripts\activate en Windows
pip install -r requirements.txt
python manage.py runserver
3. Frontend (React)
bash
Copiar
Editar
cd front_end
npm install
npm run dev  # o npm start
