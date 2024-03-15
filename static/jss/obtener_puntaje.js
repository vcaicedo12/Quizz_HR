document.addEventListener('DOMContentLoaded', function() {
    // Obtener la puntuación total del localStorage
    const puntuacionTotal = localStorage.getItem('puntuacionTotal');
  
    // Mostrar la puntuación total en el elemento con el id "puntuacion-total"
    const puntuacionTotalElement = document.getElementById('puntuacion-total');
    if (puntuacionTotalElement && puntuacionTotal !== null) {
      puntuacionTotalElement.textContent =  puntuacionTotal;
    } else {
      puntuacionTotalElement.textContent = 'No se encontró puntuación';
    }
  });
  