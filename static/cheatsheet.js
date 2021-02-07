document.addEventListener("DOMContentLoaded", () => {
  // connect to a websocket, standard
  var socket = io.connect(
    location.protocol + "//" + document.domain + ":" + location.port
  );
  // once the websocket is connected, make sure all buttons are configured to do something with the websocket
  socket.on("connect", () => {
    // selecting all the buttons and for each one of them, when clicked on a button
    document.querySelectorAll("button").forEach((button) => {
      button.onclick = () => {
        // defines a variable selection (dataset in index.html)
        const selection = button.dataset.vote;
        // will emit to server, event name = 'submit vote', 'selection' is data to be sent (yes, maybe or no)
        socket.emit("submit vote", { selection: selection });
      };  
    });  
    // when you receive an announce vote, this is what should you do:
    socket.on("announce vote", (data) => {
    const li = document.createElement("li");
    li.innerHTML = `Vote recorded: ${data.selection}`;
    document.querySelector("#votes").append(li);
  });  
});  


// set starting value of counter to 0
if (!localStorage.getItem("counter")) localStorage.setItem("counter", 0);

// load current value of counter
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#counter").innerHTML = localStorage.getItem(
    "counter"
  );

  // count every time button is clicked
  document.querySelector("button").onclick = () => {
    // increment current counter
    let counter = localStorage.getItem("counter");
    counter++;

    // update the counter
    document.querySelector("#counter").innerHTML = counter;
    localStorage.setItem("counter", counter);
  };
});


if (!localStorage.getItem("messageHistory")) {
  localStorage.setItem("messageHistory", "");
}
// initialize empty array
let messageHistory = [];
// set messageHistory in localStorage in strings
localStorage.setItem("messageHistory", JSON.stringify(messageHistory));
// save translation to storedMessages
let storedMessages = JSON.parse(localStorage.getItem("messageHistory");




localStorage.setItem("messageHistory", JSON.stringify(messageHistory));
localStorage.setItem("messageHistory",localStorage.getItem("messageHistory" + JSON.stringify($("#myMessage").val())));


var messages = [];
var message1 = { m: 1 };
messages.push(message1)
localStorage.setItem("messages", JSON.stringify(messages));

var storedMessages = JSON.parse(localStorage.getItem("messages"));
var message2 = { m: 2 };

storedMessages.push(message2);

localStorage.setItem("messages", JSON.stringify(storedMessages));
var result = JSON.parse(localStorage.getItem("messages"));
console.log(result);


if (!localStorage.getItem("messages")) {
  localStorage.setItem("messages", "");
  var messages = [];
}
let messages = localStorage.getItem("messages");

let messages = localStorage.getItem("messages");



socket.on("message", function (msg) {
  $("#messages").append("<li>" + msg + "</li>");


  message = { 1: msg };
  messages.push(message);
  localStorage.setItem("messages", JSON.stringify(messages));
  storedMessages = JSON.parse(localStorage.getItem("messages"));
});


Object.keys(localStorage).forEach(function(key){
  console.log(localStorage.getItem(key));
  });

  for (msg in messages) {
    $("#messages").append("<li>" + msg + "</li>");
  }

  for (i = 0; i < messages[0].length, i++){

  }


  for (msg in messages) {
    $("#messages").append("<li>" + msg + "</li>");
  }

      // let d;
    // d = new Date().toLocaleString("en-ZA");
    // let time = d;


    // jquery:
// modalas su bootstrapu padarytas ir su jqueriu ateina
// trigerinam modala, jis turi id
if(!localStorage.username){
    $("#myModal").modal()
}

// sukuriam nauja paragrafa
const p = document.createElement('p')
p.innerHTML = data;
$("#display-message-area").append(p)


[{msg: "Hello", username: "Alice"}, {msg: "Hi", username: "Bob"}]
for (let message in messages){
    console.log(message.msg)
}




$('#myModal').modal(options)


$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })


<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>