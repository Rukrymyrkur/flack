# Slack clone: Flack

This is a solution for a task from the course of CS50.
![app-image](https://user-images.githubusercontent.com/62238800/107125437-be3bf580-68b2-11eb-8faf-137c3aa230e4.png)

## Table of contents:

- [Table of contents](#table-of-contents)
- [Task overview](#task-overview)
- [Structure](#structure)
- [Features](#features)
- [Requirements](#requirements)
- [Setup](#setup)

## Task overview

In this project, you’ll build an online messaging service using Flask, similar in spirit to Slack. Users will be able to sign into your site with a display name, create channels (i.e. chatrooms) to communicate in, as well as see and join existing channels. Once a channel is selected, users will be able to send and receive messages with one another in real time. Finally, you’ll add a personal touch to your chat application of your choosing!

### Milestones

- Complete the Display Name, Channel Creation, and Channel List steps.
- Complete the Messages View and Sending Messages steps.
- Complete the Remembering the Channel and Personal Touch steps.

### Objectives

- Learn to use JavaScript to run code server-side.
- Become more comfortable with building web user interfaces.
- Gain experience with Socket.IO to communicate between clients and servers.

## Structure

```
├───static/
│   ├───socketio.js
│   ├───style.css
│   ├───style.css.map
│   └───style.scss
├───templates/
│   └───index.html
├───application.py
└───requirements.txt
```

## Features

- Display Name:
  When a user visits the app for the first time, they are asked to type in a username to a **Bootstrap modal** input. The modal supports closing up when user inputs an available user by pressing the enter key. There's also a feature to **generate a username** from a random combination of nouns and adjectives! If user has been on the site before, the app takes the name from the localStorage saved from the previous session. There's a greeting at all times to remind user of his wonderful username.

- Channel Creation:
  All users are allowed to create new channels with titles that don't conflict with existing ones.

- Channel List:
  Users are able to see a list of all current channels, switch between them.

- Messages View:
  When user logs in for the first time, they're joined to the main, _general_, room. When the channel's switched, user can see recent 100 messages to that room, which are stored in server-side memory.

- Sending Messages:
  Users are able to send messages to each other in the room. When message is sent, it shows up in the screen with the username, the text and a timestamp when the message was sent to server.

- Remembering the Channel:
  If user closes the web browser window, the app remembers at what room the user left off.

## Requirements

- bidict==0.21.2
- click==7.1.2
- Flask==1.1.2
- Flask-SocketIO==5.0.1
- itsdangerous==1.1.0
- Jinja2==2.11.3
- MarkupSafe==1.1.1
- python-engineio==4.0.0
- python-socketio==5.0.4
- Werkzeug==1.0.1

## Setup

- python3 -m venv env
- pip install -r requirements.txt
- env\scripts\activate
- $env:FLASK_APP="application.py"
