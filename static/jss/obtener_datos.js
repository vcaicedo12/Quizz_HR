document.addEventListener('DOMContentLoaded', function() {
  // Obtener la puntuación total del Local Storage
  const puntuacionTotal = localStorage.getItem('puntuacionTotal');

  // Mostrar la puntuación total en el elemento con el id "puntuacion-total"
  const puntuacionTotalElement = document.getElementById('puntuacion-total');
  if (puntuacionTotalElement && puntuacionTotal !== null) {
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
});


