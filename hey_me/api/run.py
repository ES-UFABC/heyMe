from flask import Flask, jsonify, render_template, request, redirect, url_for, session
from flask_mysqldb import MySQL
from datetime import datetime
import MySQLdb.cursors
import regex
import hashlib
import time

app = Flask(__name__)

app.secret_key = '7e0c336cc44b'

app.config['MYSQL_USER'] = 'ufabc_admin'
app.config['MYSQL_PASSWORD'] = 'bDVTFqCMZbaju5jH'
app.config['MYSQL_HOST'] = 'db-heyme.ckdrbbsyt0ye.us-east-1.rds.amazonaws.com'
app.config['MYSQL_DB'] = 'heyMe'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)

@app.route('/register', methods=['POST'])
def register():
    msg = ''
    if request.method == 'POST' and 'name' in request.form and 'password' in request.form and 'email' in request.form:
        name = request.form['name']
        password = request.form['password']
        email = request.form['email']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM heyMe.user WHERE email = %s', (email,))
        account = cursor.fetchone()
        if account:
            msg = 'Conta já existente!'
        elif not regex.match(r'[^@]+@[^@]+\.[^@]+', email):
            msg = 'Email inválido!'
        elif not regex.match(r'[\p{L}\s]+', name):
            msg = 'Nome só pode ter letras!'
        elif not name or not password or not email:
            msg = 'Complete os campos faltantes!'
        else:
            cursor.execute('INSERT INTO heyMe.user VALUES (null, %s, %s, %s, %s)', (email, hashlib.sha256(password.encode()).hexdigest(), name, datetime.now()))
            mysql.connection.commit()
            msg = 'Registrado com sucesso!'
    elif request.method == 'POST':
        msg = 'Complete os campos faltantes!'
    return {'msg': msg}

@app.route('/login', methods=['POST'])
def login():
    msg = ''
    if request.method == 'POST' and 'email' in request.form and 'password' in request.form:
        email = request.form['email']
        password = request.form['password']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM heyMe.user WHERE email = %s AND password = %s', (email, hashlib.sha256(password.encode()).hexdigest(),))
        account = cursor.fetchone()
        if account:
            session['loggedin'] = True
            session['id'] = account['id']
            session['name'] = account['name']
            session['email'] = account['email']
            msg = 'Logado com sucesso!'
        else:
            msg = 'Email ou senha incorreta!'
    return {'msg': msg}

@app.route('/logout')
def logout():
    session.pop('loggedin', None)
    session.pop('id', None)
    session.pop('username', None)
    return redirect(url_for('login'))


@app.route('/time', methods=['GET', 'POST'])
def timeT():
    return {'time': time.asctime()}

# @app.route('/teste', methods=['GET', 'POST'])
# def teste():
#  print('a')