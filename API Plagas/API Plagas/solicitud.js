document.getElementById('imageInput').addEventListener('change', function(event) {
    // Obtiene el archivo seleccionado del input
    const file = event.target.files[0];
    // Obtiene los elementos de la imagen de vista previa y el contenedor de la vista previa
    const previewImage = document.getElementById('previewImage');
    const imagePreview = document.getElementById('imagePreview');

    
    if (file) {
        // Crea un nuevo FileReader para leer el archivo
        const reader = new FileReader();
        reader.onload = function(e) {
            // Establece la fuente de la imagen de vista previa y muestra el contenedor
            previewImage.src = e.target.result;
            imagePreview.style.display = 'block';
        };
        // Lee el archivo como una URL de datos
        reader.readAsDataURL(file);
    } else {
        // Si no hay archivo, limpia la imagen de vista previa y oculta el contenedor
        previewImage.src = '';
        imagePreview.style.display = 'none';
    }
});


document.getElementById('botonIdent').addEventListener('click', async () => {
    const apiUrl = 'https://crop.kindwise.com/api/v1/identification'; 
    const apiKey = 'nVUzdlSkfEaOKrnaauI7yEvbpijiZT1cm48tThRRHg9C2w1uht'; 
    // Obtiene el archivo seleccionado del input
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];
    
    // Si no hay archivo, sale de la función
    if (!file) {
        return;
    }

    // Crea un nuevo FileReader para leer el archivo
    const reader = new FileReader();
    reader.readAsDataURL(file);

    // Cuando la lectura del archivo está completa
    reader.onloadend = async () => {
        // Extrae la parte base64 de la imagen
        const imagenbase64 = reader.result.split(',')[1];
        // Preparar los datos para enviar a la API
        const requestData = {
            images: [imagenbase64],
        };

        try {
            // Envíar la solicitud POST a la API
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Api-Key': apiKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            // Si la respuesta no es exitosa, lanza un error
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}. Response: ${errorText}`);
            }

           
            const data = await response.json();
            console.log(data);

            // Verifica si la respuesta contiene una planta identificada
            const isPlant = data.result.is_plant.binary;
            if (!isPlant) {
                alert('La imagen no se ha identificado como una planta.');
                // Limpia los resultados
                document.getElementById('cropName').textContent = 'N/A';
                document.getElementById('scientificName').textContent = 'N/A';
                document.getElementById('diseaseName').textContent = 'N/A';
                document.getElementById('scientificNameDisease').textContent = 'N/A';
                return;
            }

            // Extrae la información sobre la planta y la enfermedad de la respuesta
            const crop = data.result.crop.suggestions[0] || {};
            const disease = data.result.disease.suggestions[0] || {}; // Maneja el caso en que no haya enfermedad

            // Actualiza los elementos de la página con la información recibida
            document.getElementById('cropName').textContent = crop.name || 'N/A';
            document.getElementById('scientificName').textContent = crop.scientific_name || 'N/A';
            document.getElementById('diseaseName').textContent = disease.name || 'N/A';
            document.getElementById('scientificNameDisease').textContent = disease.scientific_name || 'N/A';

        } catch (error) {
            // Muestra el error en el elemento de respuesta
            document.getElementById('response').textContent = `Error: ${error.message}`;
        }
    };

    // Maneja errores al leer el archivo
    reader.onerror = (error) => {
        document.getElementById('response').textContent = `Error reading file: ${error.message}`;
    };
});



