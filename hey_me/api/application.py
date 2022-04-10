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


# jwt = JWTManager(application)

mysql = MySQL(application)

# jwt_blocklist = []


# @jwt.token_in_blocklist_loader
# def check_if_token_is_revoked(jwt_header, jwt_payload):
#     jti = jwt_payload["jti"]
#     return jti in jwt_blocklist


@application.route('/register_back', methods=['POST'])
def register():
    data = request.get_json()
    msg = ''
    if data['username'] and data['password'] and data['email']:
        name = data['username']
        password = data['password']
        email = data['email']
        print('email', email, 'password', password, 'name', name)
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
            return {'success': True, 'msg': msg}
    elif request.method == 'POST':
        msg = 'Complete os campos faltantes!'
        return {'success': False, 'msg': msg}


@application.route('/login_back', methods=['POST'])
def login():
    print("called!")
    data = request.get_json()
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
            # access_token = create_access_token(
            #     email, additional_claims=additional_claims)
            response = jsonify(success=True, access_token='access', code=200)
            response.headers.add("Access-Control-Allow-Origin", "*")
            return response
    elif request.method == 'POST':
        return jsonify(success=False, msg='Complete os campos faltantes!', code=401)
    return jsonify(msg='Email ou senha incorreta!', success=False), 401


@application.route("/logout_back", methods=["DELETE"])
# @jwt_required()
def logout():
    # jti = get_jwt()["jti"]
    # jwt_blocklist.append(jti)
    return jsonify(msg="Deslogado")


@application.route("/diary", methods=["POST"])
# @jwt_required()
def post_new_diary():
    data = request.get_json()
    if data['title'] and data['content']:
        title = data['title']
        content = data['content']
        # claims = get_jwt()
        # user_id = claims["user_id"]
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('INSERT INTO `heyMe`.`diary`(`user_id`,`title`,`content`,`created_date`)VALUES(%s,%s,%s,%s);',
                       (user_id, title, content, datetime.now()))
        mysql.connection.commit()
        msg = 'Criado com sucesso!'
        return jsonify(success=True, msg=msg), 201
    elif request.method == 'POST':
        msg = 'Complete os campos faltantes!'
        return jsonify(success=False, msg=msg), 400


@application.route("/diary", methods=["GET"])
# @jwt_required()
def get_diary():
    # claims = get_jwt()
    # user_id = claims["user_id"]
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM heyMe.diary WHERE user_id = %s', (user_id,))
    diaries = cursor.fetchall()
    return jsonify(success=True, diaries=diaries), 200


@application.route("/diary/<id>", methods=["PUT"])
# @jwt_required()
def put_diary(id):
    # claims = get_jwt()
    user_id = claims["user_id"]
    data = request.get_json()
    if data['title'] and data['content']:
        title = data['title']
        content = data['content']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('UPDATE `heyMe`.`diary` SET `title` = %s, `content` = %s WHERE `id` = %s AND `user_id` = %s;',
                       (title, content, id, user_id))
        mysql.connection.commit()
        if cursor.rowcount <= 0:
            msg = 'Não encontrado ou não alterado!'
            return jsonify(success=False, msg=msg), 404
        msg = 'Alterado com sucesso!'
        return jsonify(success=True, msg=msg), 200
    elif request.method == 'PUT':
        msg = 'Complete os campos faltantes!'
        return jsonify(success=False, msg=msg), 400

@application.route("/diary/<id>", methods=["DELETE"])
# @jwt_required()
def delete_diary(id):
    # claims = get_jwt()
    # user_id = claims["user_id"]
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('DELETE FROM `heyMe`.`diary` WHERE user_id = %s AND id = %s;',
                   (user_id, id))
    mysql.connection.commit()
    if cursor.rowcount <= 0:
        msg = 'Não encontrado!'
        return jsonify(success=False, msg=msg), 404
    msg = 'Deletado com sucesso!'
    return jsonify(success=True, msg=msg), 200

@application.route("/chatbot/<message>", methods=['GET'])
# @jwt_required()
def parse_message(message):
    ints = chatbot.predict_class(message)
    res = chatbot.get_response(ints)
    return jsonify(response=res)


if __name__ == "__main__":
    print("running")
    application.run(host='localhost', debug=True)
