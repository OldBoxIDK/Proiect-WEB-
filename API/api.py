from flask import Flask,request, jsonify
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import sqlite3
from sqlite3 import Error

app = Flask(__name__)
CORS(app)
app.config["JWT_SECRET_KEY"] = "super-secret"
jwt = JWTManager(app)
bcrypt = Bcrypt(app)


def create_connection():
    conn = None;
    try:
        conn = sqlite3.connect('database.db')
        print(f'successful connection with sqlite version {sqlite3.version}')
    except Error as e:
        print(e)
    
    if conn:
        return conn

connection = create_connection()



@app.route('/login', methods=['POST'])
def login():
    connection = sqlite3.connect('database.db')
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    if email is None or password is None:
        return  400
    user = connection.execute("SELECT * FROM User WHERE email = ?", (email,)).fetchone()
    if user is None or not bcrypt.check_password_hash(user[2], password):
        return  401
    access_token = create_access_token(identity=email)
    return jsonify({"access_token": access_token}), 200

@app.route('/register', methods=['POST'])
def register():
    connection = sqlite3.connect('database.db')
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    if email is None or password is None:
        return  400
    if connection.execute("SELECT * FROM User WHERE email = ?", (email,)).fetchone() is not None:
        return  400
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    connection.execute("INSERT INTO User (email, password) VALUES (?, ?)", (email, hashed_password))
    connection.commit()
    connection.close()
    return "Te-ai inregistrat cu succes",  201

@app.route('/logout', methods=['DELETE'])
@jwt_required()
def logout():
    return "Te-ai delogat cu success", 200


@app.route('/posts', methods=['POST'])
@jwt_required()
def create_post():
    connection = sqlite3.connect('database.db')
    title = request.json.get('title', None)
    content = request.json.get('content', None)
    if title is None or content is None:
        return 400
    email = get_jwt_identity()
    user = connection.execute("SELECT * FROM User WHERE email = ?", (email,)).fetchone()
    connection.execute("INSERT INTO Post (title, content, user_id) VALUES (?, ?, ?)", (title, content, user[0]))
    connection.commit()
    return "Ai postat cu success", 201

@app.route('/updateemail', methods=['PUT'])
@jwt_required()
def update_email_route():
    connection = sqlite3.connect('database.db')
    email = request.json.get('email', None)
    if email is None:
        return 400
    connection.execute("UPDATE User SET email = ? WHERE email = ?", (email, get_jwt_identity()))
    connection.commit()
    return "Email-ul a fost schimbat", 200





@app.route("/posts_get", methods=["GET"])
@jwt_required()
def get_all_posts():
    connection = sqlite3.connect('database.db')
    posts = connection.execute("SELECT * FROM Post").fetchall()
    post_data = []
    for post in posts:
        post_data.append({
            'id': post[0],
            'title': post[1],
            'content': post[2],
            'user_id': post[3],
        })
    return jsonify(post_data)
if __name__ == '__main__':
    app.run(port=8080)