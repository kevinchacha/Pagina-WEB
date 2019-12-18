const axios=require('axios');
const ubicacion=require('./controlador/ubicacion');
const argv =require('yargs').options({
    nombre:{
    alias:'n',
    desc:'Nombre ciudad para obtener clima',
    demand: true
    }
}).argv;
ubicacion.getCiudadlalo(argv.nombre)
    .then(console.log);
