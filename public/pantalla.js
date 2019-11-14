socket = io();

const lb_ticket_actual = document.getElementById('lblTicket1');
const lb_escritorio_actual = document.getElementById('lblEscritorio1');

const lbt0 = document.getElementById('lblTicket2');
const lbt1 = document.getElementById('lblTicket3');
const lbt2 = document.getElementById('lblTicket4');

const lbe0 = document.getElementById('lblEscritorio2');
const lbe1 = document.getElementById('lblEscritorio3');
const lbe2 = document.getElementById('lblEscritorio4');

const tr1 = document.getElementById('tr-1');
const tr2 = document.getElementById('tr-2');
const tr3 = document.getElementById('tr-3');

const historial = []; //HISTORIAL DONDE SE GUARDAN REGISTROS DE TICKETS ATENDIDOS Y SU ESCRITORIO
let cont = 0; // CONTADOR DE CONTROL PARA LA LISTA

socket.on('ticket:atendido',(datos)=>{
  // ESCUCHA UN EVENTO QUE LE ENVIA UN REGISTRO CON UN TICKET Y EL ESCRITORIO QUE LO ATENDERA
  lb_ticket_actual.innerHTML = `<span  class="ticket-actual-numero">Ticket ${datos.ticket.num}</span>`;
  lb_escritorio_actual.innerHTML = `<span  class="ticket-actual-escritorio">Escritorio ${datos.esc}</span>`;
  });



socket.on('actualizar:tabla',(reg)=>{
  historial.push(reg);
  if (cont == 0){
    lbt0.innerHTML =  `Ticket : ${reg.ticket.num}`;
    lbe0.innerHTML = `Escritorio : ${reg.esc} `
  }
  if (cont==1){
    lbt0.innerHTML =  `Ticket : ${reg.ticket.num}`;
    lbe0.innerHTML = `Escritorio : ${reg.esc} `

    lbt1.innerHTML =  `Ticket : ${historial[cont-1].ticket.num}`;
    lbe1.innerHTML = `Escritorio : ${historial[cont-1].esc} `
  }
  if (cont>=2){
    lbt0.innerHTML =  `Ticket : ${reg.ticket.num}`;
    lbe0.innerHTML = `Escritorio : ${reg.esc} `

    lbt1.innerHTML =  `Ticket : ${historial[cont-1].ticket.num}`;
    lbe1.innerHTML = `Escritorio : ${historial[cont-1].esc} `

    lbt2.innerHTML =  `Ticket : ${historial[cont-2].ticket.num}`;
    lbe2.innerHTML = `Escritorio : ${historial[cont-2].esc} `
  }
  cont+=1;
});
