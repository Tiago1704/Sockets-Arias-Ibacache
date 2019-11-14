socket = io();

function getParameterByName(name) {
    // LE PASAS EL NOMBRE DEL PARAMETRO Y ESTE EXTRAE SU VALOR DESDE LA URL
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const title = document.getElementById('esc1')
const div_ticket = document.getElementById('ticket-actual')
const btn = document.getElementById('btn-atender')
var num_esc = getParameterByName('escritorio');

title.innerHTML = `<h1><em>Escritorio : ${num_esc}</em></h1>`

btn.addEventListener('click',()=>{//CUANDO SE CLICKEA EL BOTON EMITE UN EVENTO, PARAMETRO: n° de escritorio
  socket.emit('atender:ticket',num_esc);
})

socket.on('ticket:atendido:esc',(datos)=>{//ESCUCHA UN EVENTO QUE RECIBE EL TICKET QUE TENDRA Q ATENDER
  div_ticket.innerHTML= `<h4>Atendiendo a turno :  ${datos.t1.num}</h4>`
});

socket.on('no:tickets',()=>{//ESCUCHA UN EVENTO QUE SE EJECUTA CUANDO NO HAY TICKETS QUE ATENDER
  alert("NO HAY NINGUN TICKET SIN ATENDER")
});
