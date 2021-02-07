$(document).ready(function () {
  var socket = io.connect("http://127.0.0.1:5000");

  let user = JSON.parse(localStorage.getItem("user"));
  let room = JSON.parse(localStorage.getItem("room"));

  // // greet user once data is stored in localStorage
  if (localStorage.getItem("user")) {
    $("#greetings").html("hello " + user + "!");
  }
  // when the client connects
  socket.on("connect", () => {
    login();
  });

  //  if received a message from server that user exists, show message
  socket.on("user already exists", () => {
    $(".error-message").text("User already exists :(");
  });

  //   if requested to generate a user, set the input value to it
  socket.on("generated user", (generated_user) => {
    $("#modalInput").val(generated_user);
  });

  //   if user was added:
  socket.on("add user", (data) => {
    user = data["user"];
    // store username in localStorage
    localStorage.setItem("user", JSON.stringify(user));
    // close modal
    $("#closeModal").click();
  });

  //   greet user when created new user
  $("#closeModal").on("click", function () {
    $("#greetings").html("hello " + user + "!");
  });

  function login() {
    //   if no room saved in localStorage, set to general
    if (!localStorage.getItem("room")) {
      room = "general";
      localStorage.setItem("room", JSON.stringify(room));
    }
    // send server data about available rooms
    socket.emit("available rooms");

    // if no user saved in localStorage, pop up modal
    if (!localStorage.getItem("user")) {
      $("#myModal").modal({ backdrop: "static", keyboard: false });
      $(".modal-title").text("Your username");

      //   focus on input when modal is open
      $("#myModal").on("shown.bs.modal", function () {
        $("#modalInput").focus();
      });
      // let use enter key instead of clicking the mouse
      document
        .getElementById("modalInput")
        .addEventListener("keyup", function (e) {
          if (e.keyCode === 13) {
            e.preventDefault();
            $("#modalButton").click();
          }
        });

      // when modal is open:
      $("#modalButton").on("click", function () {
        if (!localStorage.getItem("user")) {
          // if user isn't stored in localStorage, get the new username
          let user = $("#modalInput").val();
          //   send data to server
          socket.emit("new user", { user: user });
        }
      });
      // if generate button is clicked, request server to generate a random username
      $("#generatorButton").on("click", function () {
        socket.emit("generate user");
      });
    }
    joinUserToRoom();
  }

  //   log user to a room (on initial connection)
  function joinUserToRoom() {
    const currentRoom = JSON.parse(localStorage.getItem("room"));
    joinRoom(currentRoom);
  }

  //   when server sends a list of rooms
  socket.on("receive rooms", (roomList) => {
    document.querySelector("#roomList").innerHTML = "";
    // generate a list on client-side
    roomList.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add("select-room");
      li.setAttribute("data-room", item);
      li.innerHTML = item;
      document.querySelector("#roomList").append(li);
    });
  });

  // when send message button is clicked
  $("#sendButton").on("click", function () {
    let time = new Date().toLocaleString("en-ZA");
    let msg = $("#myMessage").val();
    // don't let user send empty messages
    if (msg != "") {
      data = {
        msg: $("#myMessage").val(),
        user: user,
        room: JSON.parse(localStorage.getItem("room")),
        timestamp: time,
      };
      // send data to server
      socket.emit("receive message", data, (room = room));
      // reset the input field
      $("#myMessage").val("");
    }
  });

  //   when server sends messages
  socket.on("return message", (data) => {
    //   create all messages data (that user has sent)
    createMessage(data);
    // scroll to bottom
    scrollWindow();
  });

  // creating rooms
  $("#createRoom").on("click", function () {
    room = $("#newRoom").val();
    // allow to create room if it's not blank
    if (room != "") {
      socket.emit("create room", room);
      $("#newRoom").val("");
    }
  });

  // when user joins, show previous messages to that room
  socket.on("receive previous messages", (previous_messages) => {
    //   clear message area inbetween switching rooms
    document.querySelector("#messages").innerHTML = "";

    // create messages from data (that other users sent)
    for (var msgs in previous_messages) {
      var obj = previous_messages[msgs];
      console.log(obj["msg"]);
      createMessage(obj);
    }
    // scroll to bottom
    scrollWindow();
  });

  //   switching rooms
  var base = document.querySelector("#roomList");
  var selector = ".select-room";
  base.addEventListener("click", function (event) {
    existing_room = JSON.parse(localStorage.getItem("room"));
    var closest = event.target.closest(selector);
    if (closest && base.contains(closest)) {
      newRoom = closest.getAttribute("data-room");
      //   if user is clicking on other room (which he isn't in yet)
      if (newRoom != existing_room) {
        //   leave previous room
        leaveRoom(existing_room);
        document.querySelector("#messages").innerHTML = "";
        console.log(user + " left " + existing_room);
        // join new room
        joinRoom(newRoom);
        // console.log(user + " joined " + newRoom);
        localStorage.setItem("room", JSON.stringify(newRoom));
      }
    }
  });

  // leave room
  function leaveRoom(room) {
    socket.emit("leave", { user: user, room: room });
    // document.querySelector("#messages").innerHTML = "";
  }
  //join room
  function joinRoom(room) {
    socket.emit("join", { user: user, room: room });
    // $("room-title").html = room;
    document.querySelector("#roomTitle").innerHTML = "#" + room;
    scrollWindow();
  }

  //   function for creating messages on the window
  function createMessage(data) {
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message");
    const span = document.createElement("span");
    span.classList.add("time");
    span.append(data.timestamp);
    const text = document.createElement("p");
    text.classList.add("text");
    text.innerHTML = data.msg;
    const username = document.createElement("p");
    username.classList.add("user");
    username.innerHTML = data.user + ":  ";

    messageContainer.append(span);
    messageContainer.append(username);
    messageContainer.append(text);

    document.getElementById("messages").append(messageContainer);
  }
  //   function for scrolling window down when displaying messages
  function scrollWindow() {
    chatWindow = document.getElementById("displayMessages");
    var xH = chatWindow.scrollHeight;
    chatWindow.scrollTo(0, xH);
  }

  // listen for enter key in message input
  document.getElementById("myMessage").addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      document.getElementById("sendButton").click();
    }
  });
  // listen for enter key in creating room input
  document.getElementById("newRoom").addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      document.getElementById("createRoom").click();
    }
  });
});
