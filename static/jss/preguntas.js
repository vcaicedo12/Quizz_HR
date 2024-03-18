fetch('static/json/questions.json')
  .then(response => response.json())
  .then(todasLasPreguntas => {
    // Seleccionar 10 preguntas aleatorias
    todasLasPreguntas = shuffleArray(todasLasPreguntas).slice(0, 10);
    let preguntaActual = 0;
    let tiempoRestante = 30; // Tiempo inicial en segundos
    let puntuacionTotal = 0; // Variable para almacenar la puntuación total.
    let respuestasCorrectas = 0; // Contador de respuestas correctas
    let respuestasIncorrectas = 0; // Contador de respuestas incorrectas
    function mostrarPregunta() {
      document.getElementById('quiz').innerHTML = '';
      if (preguntaActual >= todasLasPreguntas.length) {
        console.log('Puntuación Total:', puntuacionTotal);
        console.log('Respuestas Correctas:', respuestasCorrectas);
        console.log('Respuestas Incorrectas:', respuestasIncorrectas);
        localStorage.setItem('puntuacionTotal', puntuacionTotal); // Guardar la puntuación total en localStorage
        localStorage.setItem('respuestasCorrectas', respuestasCorrectas); // Guardar el contador de respuestas correctas en localStorage
        localStorage.setItem('respuestasIncorrectas', respuestasIncorrectas); // Guardar el contador de respuestas incorrectas en localStorage
        window.location.href = '/resultado';
        return; // Termina la ejecución de la función si ya no hay más preguntas
      }
      const pregunta = todasLasPreguntas[preguntaActual];
      const preguntaDiv = document.createElement('div');
      preguntaDiv.className = 'pregunta';
      const preguntaTexto = document.createElement('h2');
      preguntaTexto.textContent = pregunta.pregunta;
      preguntaDiv.appendChild(preguntaTexto);
      const respuestasForm = document.createElement('form');

      pregunta.respuestas.forEach((respuesta, j) => {
        const respuestaInput = document.createElement('input');
        respuestaInput.type = 'radio';
        respuestaInput.name = `pregunta${preguntaActual}`;
        respuestaInput.id = `pregunta${preguntaActual}respuesta${j}`;
        const respuestaLabel = document.createElement('label');
        respuestaLabel.htmlFor = respuestaInput.id;
        respuestaLabel.textContent = respuesta;
        respuestasForm.appendChild(respuestaInput);
        respuestasForm.appendChild(respuestaLabel);
      });

      preguntaDiv.appendChild(respuestasForm);

      const contadorDiv = document.createElement('div');
      contadorDiv.className = 'contador-container';

      const contadorNumero = document.createElement('div');
      contadorNumero.className = 'contador-numero';
      contadorNumero.textContent = tiempoRestante;
      contadorDiv.appendChild(contadorNumero);

      preguntaDiv.appendChild(contadorDiv);

      const temporizador = setInterval(() => {
        tiempoRestante--;
        contadorNumero.textContent = tiempoRestante;
        if (tiempoRestante === 0) {
          clearInterval(temporizador);
          // Pasar automáticamente a la siguiente pregunta después de 3 segundos
          setTimeout(() => {
            preguntaActual++;
            tiempoRestante = 30;
            mostrarPregunta();
          }, 3000);
        }
      }, 1000);
      const opciones = respuestasForm.querySelectorAll('input[type="radio"]');
      opciones.forEach(opcion => {
        opcion.addEventListener('change', () => {
          const respuestaSeleccionada = opcion.nextSibling.textContent;
          if (respuestaSeleccionada === pregunta.respuesta_correcta) {
            opcion.nextSibling.style.color = 'green';
            // Sumar puntos por respuesta correcta
            puntuacionTotal += tiempoRestante;
            respuestasCorrectas++; // Incrementar el contador de respuestas correctas
          } else {
            opcion.nextSibling.style.color = 'red';
            // Mostrar la respuesta correcta
            pregunta.respuestas.forEach((respuesta, index) => {
              if (respuesta === pregunta.respuesta_correcta) {
                respuestasForm.children[index * 2 + 1].style.color = 'green';
              }
            });
            respuestasIncorrectas++; // Incrementar el contador de respuestas incorrectas
          }
          // Desactivar todas las opciones después de seleccionar una
          opciones.forEach(op => {
            op.disabled = true;
          });
          // Si hay tiempo restante, detener el temporizador y pasar a la siguiente pregunta después de 3 segundos
          if (tiempoRestante > 0) {
            clearInterval(temporizador);
            setTimeout(() => {
              preguntaActual++;
              tiempoRestante = 30;
              mostrarPregunta();
            }, 3000);
          }
        });
      });

      document.getElementById('quiz').appendChild(preguntaDiv);
    }
    mostrarPregunta();
  });

// Función para mezclar aleatoriamente un array (Algoritmo de Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}





