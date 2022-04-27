from flask import Flask, jsonify, render_template, request, redirect, url_for, session
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt
from flask_mysqldb import MySQL
from flask_cors import CORS
from datetime import datetime, timedelta
import MySQLdb.cursors
import regex
import hashlib
import chatbot

application = Flask(__name__)

application.secret_key = '7e0c336cc44b'

ACCESS_EXPIRES = timedelta(hours=1)

application.config['JWT_SECRET_KEY'] = '7e0c336cc44b'
application.config["JWT_ACCESS_TOKEN_EXPIRES"] = ACCESS_EXPIRES
application.config['MYSQL_USER'] = 'ufabc_admin'
application.config['MYSQL_PASSWORD'] = 'bDVTFqCMZbaju5jH'
application.config['MYSQL_HOST'] = 'db-heyme.ckdrbbsyt0ye.us-east-1.rds.amazonaws.com'
application.config['MYSQL_DB'] = 'heyMe'
application.config['MYSQL_CURSORCLASS'] = 'DictCursor'

CORS(application)

jwt = JWTManager(application)

mysql = MySQL(application)

jwt_blocklist = []

last_sent_response = ''

@jwt.token_in_blocklist_loader
def check_if_token_is_revoked(jwt_header, jwt_payload):
    jti = jwt_payload["jti"]
    return jti in jwt_blocklist


@application.route('/register_back', methods=['POST'])
def register():
    data = request.get_json()
    msg = ''
    response = None
    if data['username'] and data['password'] and data['email']:
        name = data['username']
        password = data['password']
        email = data['email']
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
            cursor.execute('INSERT INTO heyMe.user VALUES (null, %s, %s, %s, %s)', (
                email, hashlib.sha256(password.encode()).hexdigest(), name, datetime.now()))
            mysql.connection.commit()
            msg = 'Registrado com sucesso!'
            response = jsonify(success=True, msg=msg)
    elif request.method == 'POST':
        msg = 'Complete os campos faltantes!'
        response = jsonify(success=False, msg=msg)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@application.route('/login_back', methods=['POST'])
def login():
    data = request.get_json()
    response = None
    if data['email'] and data['password']:
        email = data['email']
        password = data['password']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM heyMe.user WHERE email = %s AND password = %s',
                       (email, hashlib.sha256(password.encode()).hexdigest(),))
        account = cursor.fetchone()
        if account:
            additional_claims = {
                "user_id": account['id'], "username": account['name'], "email": account['email']}
            access_token = create_access_token(
                email, additional_claims=additional_claims)
            response = jsonify(success=True, access_token=access_token, code=200)
        else:
            response = jsonify(msg='Email ou senha incorreta!', success=False, code=401)
    elif request.method == 'POST':
        response = jsonify(success=False, msg='Complete os campos faltantes!', code=401)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@application.route("/logout_back", methods=["DELETE"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    jwt_blocklist.append(jti)
    response = jsonify(msg="Deslogado")
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@application.route("/diary", methods=["POST"])
@jwt_required()
def post_new_diary():
    data = request.get_json()
    response = None
    if data['title'] and data['content']:
        title = data['title']
        content = data['content']
        claims = get_jwt()
        user_id = claims["user_id"]
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('INSERT INTO `heyMe`.`diary`(`user_id`,`title`,`content`,`created_date`)VALUES(%s,%s,%s,%s);',
                       (user_id, title, content, datetime.now()))
        mysql.connection.commit()
        msg = 'Criado com sucesso!'
        response = jsonify(success=True, msg=msg, code=200)
    elif request.method == 'POST':
        msg = 'Complete os campos faltantes!'
        response = jsonify(success=False, msg=msg, code=400)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@application.route("/diary", methods=["GET"])
@jwt_required()
def get_diary():
    claims = get_jwt()
    user_id = claims["user_id"]
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM heyMe.diary WHERE user_id = %s', (user_id,))
    diaries = cursor.fetchall()
    response = jsonify(success=True, diaries=diaries, code=200)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@application.route("/diary/<id>", methods=["PUT"])
@jwt_required()
def put_diary(id):
    claims = get_jwt()
    user_id = claims["user_id"]
    data = request.get_json()
    response = None
    if data['title'] and data['content']:
        title = data['title']
        content = data['content']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('UPDATE `heyMe`.`diary` SET `title` = %s, `content` = %s WHERE `id` = %s AND `user_id` = %s;',
                       (title, content, id, user_id))
        mysql.connection.commit()
        if cursor.rowcount <= 0:
            msg = 'Não encontrado ou não alterado!'
            response = jsonify(success=False, msg=msg, code=404)
        msg = 'Alterado com sucesso!'
        response = jsonify(success=True, msg=msg, code=200)
    elif request.method == 'PUT':
        msg = 'Complete os campos faltantes!'
        response = jsonify(success=False, msg=msg, code=400)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@application.route("/diary/<id>", methods=["DELETE"])
@jwt_required()
def delete_diary(id):
    claims = get_jwt()
    user_id = claims["user_id"]
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('DELETE FROM `heyMe`.`diary` WHERE user_id = %s AND id = %s;',
                   (user_id, id))
    mysql.connection.commit()
    if cursor.rowcount <= 0:
        msg = 'Não encontrado!'
        response = jsonify(success=False, msg=msg, code=404)
    else:
        msg = 'Deletado com sucesso!'
        response = jsonify(success=True, msg=msg, code=200)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

perguntas_yes_no = ["Voce está se sentindo ansioso (a)?", "Voce está se sentindo nervoso (a)?"]
@application.route("/chatbot/<message>", methods=['GET'])
@jwt_required()
def parse_message(message):
    global last_sent_response
    if last_sent_response in perguntas_yes_no and message == 'sim':
        ints = chatbot.predict_class(last_sent_response)
    else:
        ints = chatbot.predict_class(message)
    msg = chatbot.get_response(ints)
    res = jsonify(success=True, msg=msg)
    last_sent_response = msg
    if "psicoterapeuta" in last_sent_response:
        for k, v in chatbot.possible_outcomes.items():
            chatbot.possible_outcomes[k] = 0
    res.headers.add("Access-Control-Allow-Origin", "*")
    return res


if __name__ == "__main__":
    application.run(host='localhost', debug=True)