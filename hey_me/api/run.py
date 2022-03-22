from flask import Flask, jsonify, request, redirect, url_for, session
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt
from flask_mysqldb import MySQL
from datetime import datetime, timedelta
import MySQLdb.cursors
import regex
import hashlib
import time

app = Flask(__name__)

app.secret_key = '7e0c336cc44b'

ACCESS_EXPIRES = timedelta(hours=1)

app.config['JWT_SECRET_KEY'] = '7e0c336cc44b'
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = ACCESS_EXPIRES
app.config['MYSQL_USER'] = 'ufabc_admin'
app.config['MYSQL_PASSWORD'] = 'bDVTFqCMZbaju5jH'
app.config['MYSQL_HOST'] = 'db-heyme.ckdrbbsyt0ye.us-east-1.rds.amazonaws.com'
app.config['MYSQL_DB'] = 'heyMe'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

jwt = JWTManager(app)

mysql = MySQL(app)

jwt_blocklist = []

@jwt.token_in_blocklist_loader
def check_if_token_is_revoked(jwt_header, jwt_payload):
    jti = jwt_payload["jti"]
    return jti in jwt_blocklist

@app.route('/register_back', methods=['POST'])
def register():
    msg = ''
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form and 'email' in request.form:
        name = request.form['username']
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
            return jsonify(msg=msg), 201
    elif request.method == 'POST':
        msg = 'Complete os campos faltantes!'
    return jsonify(msg=msg), 400

@app.route('/login_back', methods=['POST'])
def login():
    if request.method == 'POST' and 'email' in request.form and 'password' in request.form:
        email = request.form['email']
        password = request.form['password']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM heyMe.user WHERE email = %s AND password = %s', (email, hashlib.sha256(password.encode()).hexdigest(),))
        account = cursor.fetchone()
        if account:
            additional_claims = {"user_id": account['id'], "username": account['name'], "email": account['email']}
            access_token = create_access_token(email, additional_claims=additional_claims)
            return jsonify(access_token=access_token), 200
    elif request.method == 'POST':
        return jsonify(msg='Complete os campos faltantes!'), 401
    return jsonify(msg='Email ou senha incorreta!'), 401

@app.route("/logout_back", methods=["DELETE"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    jwt_blocklist.append(jti)
    return jsonify(msg="Deslogado")


@app.route('/time', methods=['GET', 'POST'])
def timeT():
    return {'time': time.asctime()}

# @app.route('/teste', methods=['GET', 'POST'])
# def teste():
#  print('a')

@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    claims = get_jwt()
    return jsonify(id=claims["user_id"], username=claims["username"], email=claims["email"])