create database ProjectPlagas;
use ProjectPlagas;

CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(75),
    correo VARCHAR(100),
    telefono VARCHAR(20),
    rol VARCHAR(50)
);

CREATE TABLE RegistroSiembra (
    id_registro INT AUTO_INCREMENT PRIMARY KEY,
    fecha_siembra DATE,
    cantidad_plantas INT,
    tipo_planta VARCHAR(50),
    ubicacion VARCHAR(100),
    numeroLote VARCHAR(20),
    gestion_id INT,
    FOREIGN KEY (gestion_id) REFERENCES GestionLote(id_gestion),
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id_usuario)
);

CREATE TABLE GestionLote (
    id_gestion INT AUTO_INCREMENT PRIMARY KEY,
    fecha_gestion DATE,
    estado_lote VARCHAR(50)
);

CREATE TABLE MonitoreoPlagas (
    id_monitoreo INT AUTO_INCREMENT PRIMARY KEY,
    fecha_monitoreo DATE,
    reporte VARCHAR(100),
    observacionAnomalia VARCHAR(200),
    registro_id INT,
    FOREIGN KEY (registro_id) REFERENCES RegistroSiembra(id_registro)
);

CREATE TABLE ReporteFotos (
    id_reporteFotos INT AUTO_INCREMENT PRIMARY KEY,
    foto varchar(100),
    monitoreo_id INT,
    FOREIGN KEY (monitoreo_id) REFERENCES MonitoreoPlagas(id_monitoreo)
);

CREATE TABLE ApiPlagas (
    id_api INT AUTO_INCREMENT PRIMARY KEY,
    nombrePlanta varchar(100) not null,
    nombreCientificoPlanta varchar(100) not null,
    enfermedadPlanta varchar(100) not null,
    nombreCientificioEnfermedad varchar(100) not null,
    reporteFotos_id int,
    FOREIGN KEY (ReporteFotos_id) REFERENCES ReporteFotos(id_reporteFotos)
);

CREATE TABLE PlanificacionTratamiento (
    id_planificacion INT AUTO_INCREMENT PRIMARY KEY,
    fecha_inicio DATE,
    fecha_fin DATE,
    informetratamiento VARCHAR(100),
    api_id INT,
    FOREIGN KEY (api_id) REFERENCES ApiPlagas(id_api),
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id_usuario)
);

SELECT * FROM Usuario;
SELECT * FROM RegistroSiembra;
SELECT * FROM GestionLote;
SELECT * FROM MonitoreoPlagas;
SELECT * FROM ReporteFotos;
SELECT * FROM ApiPlagas;
SELECT * FROM PlanificacionTratamiento;

INSERT INTO Usuario (nombre, apellido, correo, telefono, rol) VALUES
('Juan', 'Pérez', 'juan.perez@example.com', '555-1234', 'Agrónomo'),
('María', 'Gómez', 'maria.gomez@example.com', '555-5678', 'Técnico'),
('Carlos', 'López', 'carlos.lopez@example.com', '555-8765', 'Investigador'),
('Ana', 'Martínez', 'ana.martinez@example.com', '555-4321', 'Productor'),
('Lucía', 'Hernández', 'lucia.hernandez@example.com', '555-3456', 'Estudiante');

INSERT INTO GestionLote (fecha_gestion, estado_lote) VALUES
('2024-01-15', 'Activo'),
('2024-02-20', 'En revisión'),
('2024-03-10', 'Cerrado'),
('2024-04-05', 'Activo'),
('2024-05-30', 'En espera');

INSERT INTO RegistroSiembra (fecha_siembra, cantidad_plantas, tipo_planta, ubicacion, numeroLote, gestion_id, usuario_id) VALUES
('2024-01-10', 100, 'Tomate', 'Invernadero A', 'Lote 01', 1, 1),
('2024-02-15', 150, 'Lechuga', 'Invernadero B', 'Lote 02', 2, 2),
('2024-03-20', 200, 'Pepino', 'Campo abierto', 'Lote 03', 3, 3),
('2024-04-25', 250, 'Pimiento', 'Invernadero C', 'Lote 04', 4, 4),
('2024-05-30', 300, 'Zanahoria', 'Campo abierto', 'Lote 05', 5, 5);

INSERT INTO MonitoreoPlagas (fecha_monitoreo, reporte, observacionAnomalia, registro_id) VALUES
('2024-01-12', 'Sin plagas', 'Ninguna anomalía', 1),
('2024-02-18', 'Plagas detectadas', 'Presencia de pulgones', 2),
('2024-03-22', 'Sin plagas', 'Ninguna anomalía', 3),
('2024-04-28', 'Plagas detectadas', 'Presencia de orugas', 4),
('2024-06-01', 'Sin plagas', 'Ninguna anomalía', 5);

INSERT INTO ReporteFotos (foto, monitoreo_id) VALUES
('foto1.jpg', 1),
('foto2.jpg', 2),
('foto3.jpg', 3),
('foto4.jpg', 4),
('foto5.jpg', 5);

INSERT INTO ApiPlagas (nombrePlanta, nombreCientificoPlanta, enfermedadPlanta, nombreCientificioEnfermedad, reporteFotos_id) VALUES
('Tomate', 'Solanum lycopersicum', 'Pulgones', 'Aphidoidea', 2),
('Lechuga', 'Lactuca sativa', 'Bacteriosis', 'Erwinia', 5),
('Pepino', 'Cucumis sativus', 'Oídio', 'Erysiphaceae', 3),
('Pimiento', 'Capsicum annuum', 'Oruga', 'Noctuidae', 4),
('Zanahoria', 'Daucus carota', 'Moho gris', 'Botrytis', 1);

INSERT INTO PlanificacionTratamiento (fecha_inicio, fecha_fin, informetratamiento, api_id, usuario_id) VALUES
('2024-01-15', '2024-01-20', 'Tratamiento con insecticida', 1, 1),
('2024-02-25', '2024-03-02', 'Aplicación de fungicida', 2, 2),
('2024-03-25', '2024-03-30', 'Control biológico', 3, 3),
('2024-04-15', '2024-04-20', 'Insecticida natural', 4, 4),
('2024-05-15', '2024-05-20', 'Control cultural', 5, 5);

SELECT tipo_planta, SUM(cantidad_plantas) AS total_plantas 
FROM RegistroSiembra 
GROUP BY tipo_planta;

SELECT nombrePlanta, enfermedadPlanta 
FROM ApiPlagas;

SELECT 
pt.fecha_inicio, 
pt.fecha_fin, 
rs.numeroLote, 
pt.informetratamiento 
FROM PlanificacionTratamiento pt 
JOIN RegistroSiembra rs ON pt.api_id IN (SELECT id_api FROM ApiPlagas WHERE id_api = rs.usuario_id);

SELECT tipo_planta, fecha_siembra, SUM(cantidad_plantas) AS total_plantas 
FROM RegistroSiembra 
GROUP BY tipo_planta, fecha_siembra;

SELECT 
u.nombre, 
u.apellido, 
m.fecha_monitoreo, 
m.reporte, 
rs.numeroLote 
FROM MonitoreoPlagas m 
JOIN RegistroSiembra rs ON m.registro_id = rs.id_registro 
JOIN Usuario u ON rs.usuario_id = u.id_usuario;

SELECT 
rf.foto, 
ap.nombrePlanta, 
ap.enfermedadPlanta 
FROM ReporteFotos rf 
JOIN MonitoreoPlagas m ON rf.monitoreo_id = m.id_monitoreo 
JOIN ApiPlagas ap ON ap.reporteFotos_id = rf.id_reporteFotos;

SELECT 
rs.fecha_siembra, 
rs.tipo_planta, 
gl.estado_lote 
FROM RegistroSiembra rs 
JOIN GestionLote gl ON rs.gestion_id = gl.id_gestion 
ORDER BY rs.fecha_siembra;

SELECT 
rf.foto, 
ap.enfermedadPlanta, 
pt.informetratamiento 
FROM ReporteFotos rf 
JOIN MonitoreoPlagas m ON rf.monitoreo_id = m.id_monitoreo 
JOIN ApiPlagas ap ON ap.reporteFotos_id = rf.id_reporteFotos 
JOIN PlanificacionTratamiento pt ON pt.api_id = ap.id_api 














