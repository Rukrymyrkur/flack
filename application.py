from flask_socketio import SocketIO, emit, send, join_room, leave_room
from flask import Flask, render_template, request
from collections import deque
import random


app = Flask(__name__)
# app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["SECRET_KEY"] = 'mysecret'
app.config["DEBUG"] = True
socketio = SocketIO(app)

existing_users = []
current_room = 'general'
messages = {
    "general": deque([], maxlen=100)
}

generator_adj = ['thundering','somber','mountainous','boring','dapper','innate','deeply','unusual','capable','sweltering','languid','habitual','unruly','graceful','innocent']
generator_nouns = ['comedown','whitewall','rainwater','tableware','together','skateboard','watercraft','doorstop','daybed','walkways','keyword','afterimage','taxpayer','undercut','turnaround']

# main route
@app.route("/")
def index():
    return render_template("index.html")


# on client connection
@socketio.on("connect")
def test_connect():
    print(request.sid)


# generating random username
@socketio.on("generate user")
def user_generator():
    generated_user = random.choice(generator_adj) + "_" + random.choice(generator_nouns)
    emit("generated user", generated_user)


# get info about new user and send back a response
@socketio.on("new user")
def new_user(data):
    user=data["user"]

    # if username is taken:
    if user in existing_users:
        emit("user already exists")
    # if username is available:
    else:
        existing_users.append(user)
        emit("add user", {"user":user})


# when server gets a message
@socketio.on('receive message')
def handle_message(data, room):
    room = data['room']
    # store data in message deque
    messages[room].append(data)
    # bounce message back to the client
    emit("return message", data, room=data['room'], broadcast=True)

# when user joins, show previous messages in the room
@socketio.on('join')
def on_join(data):
    selected_room = data.get('room')
    join_room(selected_room)
    current_room = selected_room

    try:
        previous_messages = list(messages[current_room])
        emit("receive previous messages", previous_messages)
    except KeyError:
        print("The list is empty")

# listen for user leaving the room
@socketio.on('leave')
def on_leave(data):

    leave_room(data['room'])
    send(data['user'] + " has left the " +
         data['room'] + ' room.', room=data['room'])

# create rooms
@socketio.on('create room')
def create(room):
    
    messages.setdefault(room, deque([], maxlen=100))
    # get keys from dict as a list
    roomList = list(messages)
    emit('receive rooms', roomList, broadcast=True)

# when client requests available rooms, send the list of rooms
@socketio.on('available rooms')
def availableRoom():
    roomList = list(messages)
    emit("receive rooms", roomList, broadcast=True)


if __name__ == '__main__':
    socketio.run(app)
