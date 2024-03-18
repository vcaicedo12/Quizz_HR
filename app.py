from flask import Flask, render_template, request, redirect, url_for, flash
import sqlite3
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
# Configurar la clave secreta
app.secret_key = 'asdasdas12313243545342'

# Configurar la base de datos SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///rn.db'  # Ruta a la base de datos SQLite
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Desactivar el seguimiento de modificaciones
db = SQLAlchemy(app)

# Definir el modelo de datos para los jugadores
class Rn(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    score = db.Column(db.Integer, nullable=False)

# Crear la base de datos y las tablas asociadas
with app.app_context():
    db.create_all()

# Ruta inicial
@app.route('/')
def index():
    return render_template('index.html')

# Ruta para el juego
@app.route('/game')
def game():
    return render_template('game.html')

# Ruta para el resultado del juego
@app.route('/resultado')
def res():
    return render_template('resultados.html')

@app.route('/guardar', methods=['POST'])
def guardar():
  if request.method == 'POST':
    data = request.get_json()
    puntuacion_total = data.get('puntuacion_total')
    nombre = data.get('nombre')

    # Verificar si la puntuación total y el nombre son válidos
    if puntuacion_total is not None and nombre is not None:
      # Guardar la puntuación total y el nombre en la base de datos
      nuevo_jugador = Rn(name=nombre, score=puntuacion_total)
      db.session.add(nuevo_jugador)
      db.session.commit()
      return 'Datos guardados correctamente en la base de datos.', 200
    else:
      return 'Error: No se recibió una puntuación total o un nombre válido.', 400
  else:
    return 'Error: Método de solicitud no permitido.', 405



# Ruta para el ranking
@app.route('/ranking')
def rank():
    # Obtener la lista de jugadores ordenados por puntuación (en orden descendente)
    players = Rn.query.order_by(Rn.score.desc()).all()
    return render_template('ranking.html', players=players)

if __name__ == '__main__':
    app.run(debug=True)
