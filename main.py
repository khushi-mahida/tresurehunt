from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allows frontend requests from different origins

# Sample credentials (same as frontend version)
credentials = [
    {"username": "Neel Kamal", "password": "scriptwriter", "page": "neelkamal.html"},
    {"username": "ChillPoint", "password": "Hukam ka ekka pair no 2", "page": "ChillPoint.html"},
    {"username": "Hazeleyes", "password": "gudiya", "page": "hazeleyes.html"},
    {"username": "IronFlare", "password": "Hukam Ka ekka pair no 1", "page": "IronFlare.html"},
    {"username": "Echoheart", "password": "melody", "page": "Echoheart.html"},
]

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username', '').strip()
    password = data.get('password', '').strip()

    for user in credentials:
        if user['username'] == username and user['password'] == password:
            return jsonify({
                "success": True,
                "page": user['page']
            })

    return jsonify({
        "success": False,
        "message": "Invalid username or password."
    })

if __name__ == '__main__':
    app.run(debug=True)
