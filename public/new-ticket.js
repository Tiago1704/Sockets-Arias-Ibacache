socket = io();

const button_create = document.getElementById('btn-create');

button_create.addEventListener('click', ()=> {
  // Cuando clickeamos el boton dispara un evento agregar:ticket
  socket.emit('agregar:ticket',{});
  alert('OPERACION REALIZADA CON EXITO');
});
