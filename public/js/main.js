var socket = io.connect('https://etext-messaging.herokuapp.com');

// submit text message without reload/refresh the page
$('form').submit(function(e){
    e.preventDefault(); // prevents page reloading
    socket.emit('chat_message', $('#txt').val());
    $('#txt').val('');
    return false;
});

// append the chat text message
socket.on('chat_message', function(msg){
    $('#messages').append($('<li>').html(msg));
});

// append text if someone is online
socket.on('is_online', function(username) {
    $('#messages').append($('<li>').html(username));
});

// ask username
while(true){
  var username = prompt('Please tell me your name', "");
  if(username != ""){
    break;
  }
}
socket.emit('username', username);
