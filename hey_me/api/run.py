import time
from flask import Flask
from flask_mysqldb import MySQL

app = Flask(__name__)

app.config['MYSQL_USER'] = 'ufabc_admin'
app.config['MYSQL_PASSWORD'] = 'bDVTFqCMZbaju5jH'
app.config['MYSQL_HOST'] = 'db-heyme.ckdrbbsyt0ye.us-east-1.rds.amazonaws.com'
app.config['MYSQL_DB'] = 'heyMe'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)

#cur.execute('''INSERT INTO example VALUES (1, 'Anthony')''')
#cur.execute('''INSERT INTO example VALUES (2, 'Billy')''')
#mysql.connection.commit()

@app.route('/')
def get():
    cur = mysql.connection.cursor()
    cur.execute('''SELECT * FROM heyMe.user''')
    results = cur.fetchall()
    return {'data': results}