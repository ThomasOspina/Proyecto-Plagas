let lotes = [];
      let siembras = [];

      function mostrarSeccion(section) {
        const sections = [
          "ver-lotes-section",
          "ver-siembras-section",
          "tratamiento-section",
          "informes-section",
          "configuraciones-section",
        ];

        sections.forEach((sec) => {
          document.querySelector(`.${sec}`).style.display =
            sec === section ? "block" : "none";
        });
        if (section === "ver-lotes-section") {
          verLotes();
        } else if (section === "ver-siembras-section") {
          verSiembras();
        }
      }

      function registrarLoteDesdeVer() {
        const numeroLote = document.getElementById("numeroLoteInputVer").value;
        const descripcion = document.getElementById(
          "descripcionInputVer"
        ).value;
        const fechaCreacion = document.getElementById(
          "fechaCreacionInputVer"
        ).value;
        const ubicacion = document.getElementById(
          "ubicacionLoteInputVer"
        ).value;
        const estado = document.getElementById("estadoLoteInputVer").value;

        lotes.push({
          numeroLote,
          descripcion,
          fechaCreacion,
          ubicacion,
          estado,
        });
        alert("Lote registrado exitosamente desde la sección Ver Lotes.");
        document.getElementById("loteFormVer").reset();
        verLotes();
      }

      function verLotes() {
        const lotesTableBody = document.getElementById("lotesTableBody");
        lotesTableBody.innerHTML = "";

        lotes.forEach((lote) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                    <td>${lote.numeroLote}</td>
                    <td>${lote.descripcion}</td>
                    <td>${lote.fechaCreacion}</td>
                    <td>${lote.ubicacion}</td>
                    <td>${lote.estado}</td>
                `;
          lotesTableBody.appendChild(row);
        });
      }

      function registrarSiembraDesdeVer() {
        const fechaSiembra = document.getElementById(
          "fechaSiembraInputVer"
        ).value;
        const cantidad = document.getElementById(
          "cantidadPlantasInputVer"
        ).value;
        const tipo = document.getElementById("tipoPlantaInputVer").value;
        const ubicacion = document.getElementById("ubicacionInputVer").value;
        const numeroLote = document.getElementById(
          "numeroLoteSiembraInputVer"
        ).value;

        siembras.push({ fechaSiembra, cantidad, tipo, ubicacion, numeroLote });
        alert("Siembra registrada exitosamente desde la sección Ver Siembras.");
        document.getElementById("siembraFormVer").reset();
        verSiembras();
      }

      function verSiembras() {
        const siembrasTableBody = document.getElementById("siembrasTableBody");
        siembrasTableBody.innerHTML = "";

        siembras.forEach((siembra) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                    <td>${siembra.fechaSiembra}</td>
                    <td>${siembra.cantidad}</td>
                    <td>${siembra.tipo}</td>
                    <td>${siembra.ubicacion}</td>
                    <td>${siembra.numeroLote}</td>
                `;
          siembrasTableBody.appendChild(row);
        });
      }

      function planificarTratamiento() {
        alert("Tratamiento planificado exitosamente.");
        document.getElementById("tratamientoForm").reset();
      }

      function guardarConfiguracion() {
        const idioma = document.getElementById("idiomaInput").value;
        const notificaciones = document.getElementById(
          "notificacionesInput"
        ).checked;
        const visualizacion =
          document.getElementById("visualizacionInput").value;

        alert(
          `Configuraciones guardadas:\nIdioma: ${idioma}\nNotificaciones: ${
            notificaciones ? "Activadas" : "Desactivadas"
          }\nVisualización: ${visualizacion}`
        );
        document.getElementById("configuracionForm").reset();
      }

      function toggleSidebar() {
        const sidebar = document.getElementById("sidebar");
        sidebar.classList.toggle("active");
      }

      mostrarSeccion("ver-lotes-section");