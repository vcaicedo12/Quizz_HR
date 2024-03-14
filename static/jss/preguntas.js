// Primero, debes cargar tu archivo JSON. Puedes hacerlo con fetch si estás en un entorno que lo soporte.
fetch('static/json/questions.json')
  .then(response => response.json())
  .then(todasLasPreguntas => {
    // Ahora, todasLasPreguntas es tu archivo JSON como un objeto de JavaScript.

    // Seleccionar 10 preguntas aleatorias.
    const preguntas = [];
    for (let i = 0; i < 10; i++) {
      const indiceAleatorio = Math.floor(Math.random() * todasLasPreguntas.length);
      const preguntaAleatoria = todasLasPreguntas.splice(indiceAleatorio, 1)[0];
      preguntas.push(preguntaAleatoria);
    }


    // Variable para controlar la pregunta actual.
    let preguntaActual = 0;

    // Función para mostrar la pregunta actual.
    function mostrarPregunta() {
      // Borrar el contenido del div #quiz.
      document.getElementById('quiz').innerHTML = '';

      // Obtener la pregunta actual del array.
      const pregunta = preguntas[preguntaActual];

      // Crear un div para la pregunta.
      const preguntaDiv = document.createElement('div');
      preguntaDiv.className = 'pregunta';

      // Agregar el texto de la pregunta.
      const preguntaTexto = document.createElement('h2');
      preguntaTexto.textContent = pregunta.pregunta;
      preguntaDiv.appendChild(preguntaTexto);

      // Crear un formulario para las respuestas.
      const respuestasForm = document.createElement('form');
      pregunta.respuestas.forEach((respuesta, j) => {
        // Crear un input de radio para la respuesta.
        const respuestaInput = document.createElement('input');
        respuestaInput.type = 'radio';
        respuestaInput.name = `pregunta${preguntaActual}`;
        respuestaInput.id = `pregunta${preguntaActual}respuesta${j}`;

        // Crear una etiqueta para la respuesta.
        const respuestaLabel = document.createElement('label');
        respuestaLabel.htmlFor = respuestaInput.id;
        respuestaLabel.textContent = respuesta;

        // Agregar el input y la etiqueta al formulario.
        respuestasForm.appendChild(respuestaInput);
        respuestasForm.appendChild(respuestaLabel);
      });
      preguntaDiv.appendChild(respuestasForm);

      // Crear un botón para ir a la siguiente pregunta.
      const siguienteBoton = document.createElement('button');
      siguienteBoton.textContent = 'Siguiente';
      siguienteBoton.addEventListener('click', () => {
        // Obtener todas las opciones de respuesta.
        const opciones = respuestasForm.querySelectorAll('input[type="radio"]');

        // Verificar si se ha seleccionado alguna opción.
        let seleccionado = false;
        opciones.forEach(opcion => {
          if (opcion.checked) {
            seleccionado = true;
          }
        });

        // Si no se ha seleccionado ninguna opción, mostrar un mensaje de error y detener la ejecución.
        if (!seleccionado) {
              // Crear un elemento para el mensaje de error.
            const mensajeError = document.createElement('div');
            mensajeError.className = 'error-respuesta';
            mensajeError.textContent = 'Por favor, selecciona una respuesta antes de continuar.';

    // Agregar el mensaje de error al formulario.
            respuestasForm.appendChild(mensajeError);

    // Mostrar el mensaje de error por un tiempo.
           setTimeout(() => mensajeError.remove(), 3000);
           return ;
        }

        // Si no es la última pregunta, mostrar la siguiente.
        if (preguntaActual < preguntas.length - 1) {
          preguntaActual++;
          mostrarPregunta();
        } else {
            
        }
      });
      preguntaDiv.appendChild(siguienteBoton);

      // Finalmente, agregar la pregunta al cuerpo del documento.
      document.getElementById('quiz').appendChild(preguntaDiv);
    }

    // Mostrar la primera pregunta.
    mostrarPregunta();
    
  });
