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

    return render_template('game.html')
    

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
