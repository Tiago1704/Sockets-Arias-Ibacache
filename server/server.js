//CONFIGURAR SERVER PARA LUEGO PASARSELO AL Socket
const path = require('path');
const express = require('express');
const app = express();
//CONFIGURAR SERVER CON EXPRESS

//Settings
app.set('port',process.env.PORT || 3000);

//ARCHIVOS STATICOS, DONDE ESTAN LOS HTML QUE NORMALMENTE NO SE ACTUALIZAN
app.use(express.static(path.join(__dirname,'../public')));

//Start the server
const server = app.listen(app.get('port'),() =>{
  console.log("Servidor funcionando en puerto : ", app.get('port'));
});

module.exports = server;
