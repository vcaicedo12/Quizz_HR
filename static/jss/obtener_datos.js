document.addEventListener('DOMContentLoaded', function() {
  // Obtener la puntuación total del Local Storage
  const puntuacionTotal = parseInt(localStorage.getItem('puntuacionTotal'));

  // Mostrar la puntuación total en el elemento con el id "puntuacion-total"
  const puntuacionTotalElement = document.getElementById('puntuacion-total');
  if (puntuacionTotalElement && !isNaN(puntuacionTotal)) {
    puntuacionTotalElement.textContent = puntuacionTotal;
  } else {
    puntuacionTotalElement.textContent = 'No se encontró puntuación';
  }

  // Obtener el contador de respuestas correctas del Local Storage
  const respuestasCorrectas = localStorage.getItem('respuestasCorrectas');

  // Mostrar el contador de respuestas correctas en la sección con el id "respuestas-correctas"
  const respuestasCorrectasElement = document.getElementById('respuestas-correctas');
  if (respuestasCorrectasElement && respuestasCorrectas !== null) {
    respuestasCorrectasElement.textContent = respuestasCorrectas;
  } else {
    respuestasCorrectasElement.textContent = 'No se encontraron respuestas correctas';
  }

  // Obtener el contador de respuestas incorrectas del Local Storage
  const respuestasIncorrectas = localStorage.getItem('respuestasIncorrectas');

  // Mostrar el contador de respuestas incorrectas en la sección con el id "respuestas-incorrectas"
  const respuestasIncorrectasElement = document.getElementById('respuestas-incorrectas');
  if (respuestasIncorrectasElement && respuestasIncorrectas !== null) {
    respuestasIncorrectasElement.textContent = respuestasIncorrectas;
  } else {
    respuestasIncorrectasElement.textContent = 'No se encontraron respuestas incorrectas';
  }

  // Función para enviar datos al servidor
  function enviarDatosServidor(puntuacionTotal, nombre) {
    // Enviar la puntuación total y el nombre al servidor
    fetch('/guardar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ puntuacion_total: puntuacionTotal, nombre: nombre })
    })
    .then(response => {
      if (response.ok) {
        console.log('Datos enviados al servidor correctamente.');
      } else {
        console.error('Error al enviar los datos al servidor:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error al enviar los datos al servidor:', error);
    });
  }

  // Event listener para enviar el nombre a la ruta /guardar
  const form = document.getElementById('guardar-datos-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    const nombreInput = document.getElementById('nombre');
    const nombre = nombreInput.value.trim(); // Obtener el nombre del usuario y eliminar espacios en blanco

    if (nombre) {
      // Enviar el nombre y la puntuación total al servidor Flask
      enviarDatosServidor(puntuacionTotal, nombre);
    } else {
      console.error('Por favor, ingresa tu nombre antes de enviar el formulario.');
    }
  });
}); 

