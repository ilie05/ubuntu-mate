from flask import Flask, render_template, jsonify
from communicator import Communicator

app = Flask(__name__)
comm = Communicator()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/send')
def send():
    data = comm.send_position(5)
    return jsonify(data)


@app.route('/move')
def move():
    data = comm.moving()
    return jsonify(data)


app.run(debug=True)
