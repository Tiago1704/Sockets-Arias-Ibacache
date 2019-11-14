const Cola = require('../../public/tda/cola')
const server = require('../server')
const fs = require('fs');
const socketIo = require('socket.io')

class Ticket {
  constructor(id,num) {
    this.id = id;
    this.num = num;
  }
}

class Registro{
  constructor(esc,ticket){
    this.esc = esc;
    this.ticket = ticket;
  }
}

const io = socketIo(server);// SOCKET IO REQUIERE UN Servidor Y SE LO DAMOS PARA QUE HAGA LA COMUNICAION BIDIRECCIONAL
const cola = new Cola(); //COLA DE TICKETS SIN ATENDER
const historial_g = []; // HISTORIAL DE TICKETS ATENDIDOS Y SU ESCRITORIO
const historial_t = []; // HISTORIAL DE TICKETS TANTO ATENDIDOS COMO SIN ANTENDER


function crear_ticket() {
  var t1 = new Ticket(historial_t.length+1050,historial_t.length+1)
  historial_t.push(t1);
  return t1;
}
function cargar_ticket() {
  var t1 = crear_ticket();
  cola.agregar(t1);
}

function mostrar_sigTurno(esc,socket,io) {
  var t1 = cola.obtener();
  var reg = new Registro(esc,t1);
  socket.emit('ticket:atendido:esc',{t1});
  io.emit('ticket:atendido',reg);
  return reg;
}
function cargarJson(lista) {
  fs.writeFile('archivo.json', JSON.stringify(lista),'utf8', (err) => {
  if (err) throw err;
  console.log('El archivo ha sido guardado!');
});
}

function actualizarTabla(io,lista) {
  var reg_ant = lista[lista.length-1]
  io.emit('actualizar:tabla',reg_ant);
  cargarJson(lista);
}

function noTickets(sock) {
  sock.emit('no:tickets',{});
}
io.on('connection',(socket) =>{ //ESCUCHA CUANDO CUALQUIER SOCKET SE CONECTA
   socket.on('agregar:ticket',()=>{ // ESCUCHA CUANDO UN SOCKET ENVIA LA SEÑAL DE CARGAR UN NUEVO TICKET
      cargar_ticket();                 //EN COLA SE CARGAN LOS TICKETS
    });

   socket.on('atender:ticket',(num_esc)=>{ //ESCUCHA QUE EL ESCRITORIO X ATIENDE A SIG TICKET
     if(cola.size()>0){//SI HAY TICKETS EN COLA
       var reg = mostrar_sigTurno(num_esc,socket,io);
       if (historial_g.length > 0 ){
         actualizarTabla(io,historial_g);
       }
       historial_g.push(reg);
     }
     else{
       noTickets(socket);
     }
   })});

module.exports = cola;
