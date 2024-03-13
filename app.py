from flask import Flask, render_template, request, redirect, url_for, flash
import json

app = Flask(__name__)

# Carga las preguntas del archivo JSON
with open('static\json\questions.json', 'r') as f:
    questions = json.load(f)

# Ruta inicial
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/game')
def game():
    global current_question  # Variable global para almacenar la pregunta actual
    global score  # Variable global para almacenar la puntuación

    # Reiniciar variables si es un nuevo juego
    if not current_question:
        current_question = 0
        score = 0

    # Verificar si se han acabado las preguntas
    if current_question == len(questions):
        return redirect(url_for('final_screen'))  # Redirigir a la pantalla final

    # Obtener la pregunta actual del arreglo de preguntas
    question = questions[current_question]


    return render_template('game.html', question=question)
    

# Ruta para procesar la respuesta
@app.route('/answer', methods=['POST'])
def answer():
    render_template ("index.html")

# Ruta para el ranking
@app.route('/ranking')
def ranking():
    render_template()

if __name__ == '__main__':
    app.run(debug=True)
