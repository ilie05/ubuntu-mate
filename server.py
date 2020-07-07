from flask import Flask, render_template, jsonify, request
from communicator import Communicator
import json

app = Flask(__name__)
comm = Communicator()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/send', methods=['POST'])
def send():
    body = json.loads(request.data.decode())
    valve_pos = body['valve_pos']
    data = comm.send_position(valve_pos)
    return jsonify(data)


@app.route('/move')
def move():
    data = comm.moving()
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
    # app.run(host='0.0.0.0', port=80)
