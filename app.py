from flask import Flask, render_template, request, redirect, url_for, flash
import json

app = Flask(__name__)

# Ruta inicial
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/game')
def game():

    return render_template('game.html')
    

# Ruta para el ranking
@app.route('/resultado')
def res():
    return render_template('resultados.html')

if __name__ == '__main__':
    app.run(debug=True)
