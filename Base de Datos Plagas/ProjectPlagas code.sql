#CREACIÓN BASE DE DATOS
create database ProjectoPlagas;
use ProjectoPlagas;
#CREACIÓN TABLA USUARIO
CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(75),
    correo VARCHAR(100),
    telefono VARCHAR(20),
    rol VARCHAR(50)
);
#CREACIÓN TABLA REGISTRO SIEMBRA
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
#CREACIÓN TABLA GESTION LOTE
CREATE TABLE GestionLote (
    id_gestion INT AUTO_INCREMENT PRIMARY KEY,
    fecha_gestion DATE,
    estado_lote VARCHAR(50)
);
#CREACIÓN TABLA MONITOREO PLAGAS
CREATE TABLE MonitoreoPlagas (
    id_monitoreo INT AUTO_INCREMENT PRIMARY KEY,
    fecha_monitoreo DATE,
    reporte VARCHAR(100),
    observacionAnomalia VARCHAR(200),
    registro_id INT,
    FOREIGN KEY (registro_id) REFERENCES RegistroSiembra(id_registro)
);
#CREACIÓN TABLA REPORTE FOTOS
CREATE TABLE ReporteFotos (
    id_reporteFotos INT AUTO_INCREMENT PRIMARY KEY,
    foto varchar(100),
    monitoreo_id INT,
    FOREIGN KEY (monitoreo_id) REFERENCES MonitoreoPlagas(id_monitoreo)
);
#CREACIÓN TABLA API PLAGAS
CREATE TABLE ApiPlagas (
    id_api INT AUTO_INCREMENT PRIMARY KEY,
    nombrePlanta varchar(100) not null,
    nombreCientificoPlanta varchar(100) not null,
    enfermedadPlanta varchar(100) not null,
    nombreCientificioEnfermedad varchar(100) not null,
    reporteFotos_id int,
    FOREIGN KEY (ReporteFotos_id) REFERENCES ReporteFotos(id_reporteFotos)
);
#CREACIÓN TABLA PLANIFACIÓN TRATAMIENTO

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
# DESCRIBIR TABLA PLANIFICACIÓN TRATAMIENTO
DESCRIBE PlanificacionTratamiento;
#CONSULTAR TABLA USUARIO
SELECT * FROM Usuario;
#CONSULTAR TABLA REGISRO SIEMBRA
SELECT * FROM RegistroSiembra;
#CONSULTAR TABLA GESTION LOTE
SELECT * FROM GestionLote;
#CONSULTAR TABLA MONITOREO PLAGA
SELECT * FROM MonitoreoPlagas;
#CONSULTAR TABLA REPORTE FOTOS
SELECT * FROM ReporteFotos;
#CONSULTAR TABLA API PLAGAS
SELECT * FROM ApiPlagas;
#CONSULTAR TABLA PLANIFICACIÓN TRATAMIENTO
SELECT * FROM PlanificacionTratamiento;
#INSERTAR DATOS A LA TABLA USUARIO
INSERT INTO Usuario (nombre, apellido, correo, telefono, rol) VALUES
('Juan', 'Pérez', 'juan.perez@example.com', '555-1234', 'Agrónomo'),
('María', 'Gómez', 'maria.gomez@example.com', '555-5678', 'Técnico'),
('Carlos', 'López', 'carlos.lopez@example.com', '555-8765', 'Investigador'),
('Ana', 'Martínez', 'ana.martinez@example.com', '555-4321', 'Productor'),
('Lucía', 'Hernández', 'lucia.hernandez@example.com', '555-3456', 'Estudiante');
#INSERTAR DATOS A LA TABLA USUARIO
INSERT INTO GestionLote (fecha_gestion, estado_lote) VALUES
('2024-01-15', 'Activo'),
('2024-02-20', 'En revisión'),
('2024-03-10', 'Cerrado'),
('2024-04-05', 'Activo'),
('2024-05-30', 'En espera');
#INSERTAR DATOS A LA TABLA REGISTRO SIEMBRA
INSERT INTO RegistroSiembra (fecha_siembra, cantidad_plantas, tipo_planta, ubicacion, numeroLote, gestion_id, usuario_id) VALUES
('2024-01-10', 100, 'Tomate', 'Invernadero A', 'Lote 01', 1, 1),
('2024-02-15', 150, 'Lechuga', 'Invernadero B', 'Lote 02', 2, 2),
('2024-03-20', 200, 'Pepino', 'Campo abierto', 'Lote 03', 3, 3),
('2024-04-25', 250, 'Pimiento', 'Invernadero C', 'Lote 04', 4, 4),
('2024-05-30', 300, 'Zanahoria', 'Campo abierto', 'Lote 05', 5, 5);
#INSERTAR DATOS A LA TABLA MONITOREO PLAGAS
INSERT INTO MonitoreoPlagas (fecha_monitoreo, reporte, observacionAnomalia, registro_id) VALUES
('2024-01-12', 'Sin plagas', 'Ninguna anomalía', 1),
('2024-02-18', 'Plagas detectadas', 'Presencia de pulgones', 2),
('2024-03-22', 'Sin plagas', 'Ninguna anomalía', 3),
('2024-04-28', 'Plagas detectadas', 'Presencia de orugas', 4),
('2024-06-01', 'Sin plagas', 'Ninguna anomalía', 5);
#INSERTAR DATOS A LA TABLA REPORTE FOTOS
INSERT INTO ReporteFotos (foto, monitoreo_id) VALUES
('foto1.jpg', 1),
('foto2.jpg', 2),
('foto3.jpg', 3),
('foto4.jpg', 4),
('foto5.jpg', 5);
#INSERTAR DATOS A LA TABLA API PLAGAS
INSERT INTO ApiPlagas (nombrePlanta, nombreCientificoPlanta, enfermedadPlanta, nombreCientificioEnfermedad, reporteFotos_id) VALUES
('Tomate', 'Solanum lycopersicum', 'Pulgones', 'Aphidoidea', 2),
('Lechuga', 'Lactuca sativa', 'Bacteriosis', 'Erwinia', 5),
('Pepino', 'Cucumis sativus', 'Oídio', 'Erysiphaceae', 3),
('Pimiento', 'Capsicum annuum', 'Oruga', 'Noctuidae', 4),
('Zanahoria', 'Daucus carota', 'Moho gris', 'Botrytis', 1);
#INSERTAR DATOS A LA TABLA PLANIFICACIÓN TRATAMIENTO
INSERT INTO PlanificacionTratamiento (fecha_inicio, fecha_fin, informetratamiento, api_id, usuario_id) VALUES
('2024-01-15', '2024-01-20', 'Tratamiento con insecticida', 1, 1),
('2024-02-25', '2024-03-02', 'Aplicación de fungicida', 2, 2),
('2024-03-25', '2024-03-30', 'Control biológico', 3, 3),
('2024-04-15', '2024-04-20', 'Insecticida natural', 4, 4),
('2024-05-15', '2024-05-20', 'Control cultural', 5, 5);
# CONSULTA PARA RECOGER INFORMACIÓN SOBRE TIPOS DE PLANTAS Y LA CANTIDAD DE ELLAS
SELECT tipo_planta, SUM(cantidad_plantas) AS total_plantas 
FROM RegistroSiembra 
GROUP BY tipo_planta;

# CONSULTA NOMBRE DE PLANTA Y QUE ENFERMEDAD TIENE 
SELECT nombrePlanta, enfermedadPlanta 
FROM ApiPlagas;
# CONSULTA PARA RECOGER INFORMACIÓN DE FECHA DE INICIO, FECHA QUE FINALIZA, NUMERO DE LOTE Y QUE PLANIFICACIÓN DE TRTAMIENTO SE LE DA
SELECT 
pt.fecha_inicio, 
pt.fecha_fin, 
rs.numeroLote, 
pt.informetratamiento 
FROM PlanificacionTratamiento pt 
JOIN RegistroSiembra rs ON pt.api_id IN (SELECT id_api FROM ApiPlagas WHERE id_api = rs.usuario_id);
# CONSULTA PARA SABER EL TIPO DE PLANTA, EN QUE FECHA SE SEMBRÓ Y EL,TOTAL DE PLANTAS
SELECT tipo_planta, fecha_siembra, SUM(cantidad_plantas) AS total_plantas 
FROM RegistroSiembra 
GROUP BY tipo_planta, fecha_siembra;
# CONSULTA PARFA SABER QUE USUARIO HA HEHCHO REPORTES, EN QUE FECHA Y  NUMERO DE LOTE
SELECT 
u.nombre, 
u.apellido, 
m.fecha_monitoreo, 
m.reporte, 
rs.numeroLote 
FROM MonitoreoPlagas m 
JOIN RegistroSiembra rs ON m.registro_id = rs.id_registro 
JOIN Usuario u ON rs.usuario_id = u.id_usuario;
# CONSULTA PARA SABER DE ACUERDO A LA FOTO DEL REPORTE EL NOMBRE DE LA PLANTA Y QUE ENFERMDAD CONTIENE
SELECT 
rf.foto, 
ap.nombrePlanta, 
ap.enfermedadPlanta 
FROM ReporteFotos rf 
JOIN MonitoreoPlagas m ON rf.monitoreo_id = m.id_monitoreo 
JOIN ApiPlagas ap ON ap.reporteFotos_id = rf.id_reporteFotos;
# CONSULTA PARA SABER EN QUE ESTADO ESTA EL LOTE, QUE TIPO DE PLANTA SE SEMBRÓ Y LA FECHA DE LA SIEMBRA
SELECT 
rs.fecha_siembra, 
rs.tipo_planta, 
gl.estado_lote 
FROM RegistroSiembra rs 
JOIN GestionLote gl ON rs.gestion_id = gl.id_gestion 
ORDER BY rs.fecha_siembra;
# CONSULTA PARA DE RECOGER INFORMACIÓN DE ACUERDOA A LA FOTO SABER QUE ENFERMEDAD TIENE Y QUE TRATAMIENTO DE LE PLANIFICA
SELECT 
rf.foto, 
ap.enfermedadPlanta, 
pt.informetratamiento 
FROM ReporteFotos rf 
JOIN MonitoreoPlagas m ON rf.monitoreo_id = m.id_monitoreo 
JOIN ApiPlagas ap ON ap.reporteFotos_id = rf.id_reporteFotos 
JOIN PlanificacionTratamiento pt ON pt.api_id = ap.id_api;
# CREACIÓN DE VISTA PARA SABER NOMBRE DE PLANTA Y ENFERMEDAD QUE CONTIENE 
create view plantaEnfermedad as
select nombrePlanta,enfermedadPlanta
from ApiPlagas;
# CONSULTAR VISTA PLANTA ENFERMEDAD
select*from plantaEnfermedad;
# CREACIÓN VISTA MONITOREO CAMPESINO
create view monitoreoCampeche as
select Usuario.nombre as campesino,MonitoreoPlagas.Fecha_monitoreo as Fecha, MonitoreoPlagas.reporte as Reporte, RegistroSiembra.numeroLote as Lote
from MonitoreoPlagas
inner join RegistroSiembra on MonitoreoPlagas.registro_id = RegistroSiembra.id_registro
inner join Usuario ON RegistroSiembra.usuario_id = Usuario.id_usuario;
# CONSULTAR VISTA MONITOREO CAMPESINO
select * from monitoreoCampeche;
# CONSULTAR MONITOREO CAMPESINO EL CUAL SU REPORTE SEA SIN PLAGAS
select * from monitoreoCampeche
where Reporte = 'Sin plagas';
# CONSULTAR VISTA PLANTA ENFERMEDAD DONDE LA ENFERMEDAD EMPIEZA CON 'O'
select * from plantaEnfermedad
where enfermedadPlanta like 'o%';
#MODIFICACIÓN DE VISTA MONITOREO CAMPESINO
alter view monitoreoCampeche as
select Usuario.nombre as nombre,Usuario.apellido as Apellido,MonitoreoPlagas.Fecha_monitoreo as Fecha, MonitoreoPlagas.reporte as Reporte, RegistroSiembra.numeroLote as Lote
from MonitoreoPlagas
inner join RegistroSiembra on MonitoreoPlagas.registro_id = RegistroSiembra.id_registro
inner join Usuario ON RegistroSiembra.usuario_id = Usuario.id_usuario;

alter view numeroPlantas as
select count(RegistroSiembra.cantidad_plantas) as Plantas, RegistroSiembra.tipo_planta as Planta
from RegistroSiembra
group by RegistroSiembra.tipo_planta;

select * from numeroPlantas;

drop view numeroPlantas;

# CREACIÓN VARIABLE PARA REPORTES DONDE EL USUARIO SE LLAME JUAN
set @reporte = "Juan";
select @reporte;
# CONSULTAR VARIABLE REPORTE
select * from Usuario
where nombre = @reporte;

# CREACIÓN VARIABLE PLANTAS SEA IGUAL A 200
set @Plantas = 200;
#  CONSULTA VARIABLE PLANTAS QUE SEAN MENORES A 200 
select * from RegistroSiembra
where cantidad_plantas < @Plantas;

set @Total_Plantas = null;

select sum(cantidad_planta) into @Total_Plantas
from RegistroSiembra


#CREACIÓN DE PROCEDIMIENTO PARA OBTENER INFORMACIÓN SOBRE LOS LOTES
DELIMITER //

CREATE PROCEDURE sp_obtenerInformacionLote(
    IN p_numeroLote VARCHAR(20)
)
BEGIN
    SELECT 
        r.id_registro,
        r.fecha_siembra,
        r.cantidad_plantas,
        r.tipo_planta,
        r.ubicacion,
        m.id_monitoreo,
        m.fecha_monitoreo,
        m.reporte,
        pf.foto
    FROM 
        RegistroSiembra r
    LEFT JOIN MonitoreoPlagas m ON r.id_registro = m.registro_id
    LEFT JOIN ReporteFotos pf ON m.id_monitoreo = pf.monitoreo_id
    WHERE 
        r.numeroLote = p_numeroLote;
END //
#CONSULTA PROCEDIMIENTO PARA OBTENER INFORMACIÓN SOBRE DICHO LOTE
DELIMITER ;
SET @numeroLote = 'Lote 01';
CALL sp_obtenerInformacionLote(@numeroLote);



# CREACIÓN DE PROCEDIMIENTO PARA PLANIFICAR TRATAMIENTOS DE LAS PLANTAS
DELIMITER //
CREATE PROCEDURE sp_planificarTratamiento(
    IN p_fecha_inicio DATE,
    IN p_fecha_fin DATE,
    IN p_informetratamiento VARCHAR(100),
    IN p_api_id INT,
    IN p_usuario_id INT
)
BEGIN
    INSERT INTO PlanificacionTratamiento (
        fecha_inicio,
        fecha_fin,
        informetratamiento,
        api_id,
        usuario_id
    ) VALUES (
        p_fecha_inicio,
        p_fecha_fin,
        p_informetratamiento,
        p_api_id,
        p_usuario_id
    );
END //

DELIMITER ;
# INSERTAR DATOS A PROECIDIEMITNO PARA PLANIFICAR TRATAMIENTO DETALLADO
CALL sp_planificarTratamiento(
    '2024-11-27',
    '2024-11-30',
    'Tratamiento químico para control de plagios',
    1,
    1
);
SET @informetratamiento = '2024-11-30';
CALL sp_planificarTratamiento(@informetratamiento);

#CREACION INDICE PARA USUARIO
CREATE INDEX idx_usuario_nombre_apellido ON Usuario (nombre, apellido);
# CREACION DE INDICE PARA REGISTRO SIEMBRA
CREATE INDEX idx_registro_fecha_siembra ON RegistroSiembra (fecha_siembra);
CREATE INDEX idx_registro_usuario_id ON RegistroSiembra (usuario_id);
CREATE INDEX idx_registro_numeroLote ON RegistroSiembra (numeroLote);
#CREACION INDICE PARA GESTION LOTE
CREATE INDEX idx_gestion_fecha_gestion ON GestionLote (fecha_gestion);
#CREACION INDICE PARA MONITOREO PLAGAS 
CREATE INDEX idx_monitoreo_fecha_monitoreo ON MonitoreoPlagas (fecha_monitoreo);
CREATE INDEX idx_monitoreo_registro_id ON MonitoreoPlagas (registro_id);
# CREACIÓN INDICE PARA REPORTE FOTOS
CREATE INDEX idx_reportefotos_monitoreo_id ON ReporteFotos (monitoreo_id);
# CREACIÓN INDICE PARA API PLAGAS 
CREATE INDEX idx_api_planta_cientifica_enfermedad ON ApiPlagas (
    nombreCientificoPlanta,
    enfermedadPlanta
);
# CREACIÓN INDICE PARA PLANIFICACIÓN TRATAMIENTO
CREATE INDEX idx_plan_tratamiento_fecha_inicio_usuario_id ON PlanificacionTratamiento (
    fecha_inicio,
    usuario_id
); 














