const express = require('express')
const app = express();
const hbs =require('hbs');
const axios=require('axios');
const ubicacion=require('./controlador/ubicacion');

//__dirname= nombre del directorio donde esta corriendo 
// en esta carpeta public estan todos los archivos estaticos 
//servidor estatico

const port=process.env.PORT || 3000;
app.use(express.static(__dirname+'/public'));
// EXPRESS HBS ENGINE
//nombre del directorio donde se esta corriendo (recibe nombre del directorio donde corre el proyecto)
hbs.registerPartials(__dirname+'/views/parciales')
app.set('view engine','hbs');
//servidor dinamico

hbs.registerHelper('capitalizar',(texto)=>{
  let palabras=texto.split(' ');
  palabras.forEach((palabra,idx)=>{
    palabras[idx]=palabra.charAt().toUpperCase()+palabra.slice(1).toLowerCase();
  });
  return palabras.join(' ');
});

hbs.registerHelper('getAnio',()=>{
  return new Date().getFullYear();
});


hbs.registerHelper('clima',async(nombre)=>{
  const ciudad =encodeURI(nombre);
  const instance=axios.create({
      baseURL:`https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${ciudad}`,
      headers:{'X-RapidAPI-Key':'2610ff15eemshfc036a40bd1c7aep1bee01jsn5914e29bec70'}
  });
  const resp=await instance.get();
  // instance.get()
  // .then(resp => {
  //     console.log(resp.data.Results[0]);
  // }).catch(err =>{
  //     console.log("error",err);
  // });

  if(resp.data.Results.length===0){
      throw new Error(`No existe resultados para ${nombre}`);
  }
  const data=resp.data.Results[0];
  const name=data.name;
  const lat=data.lat;
  const lon=data.lon; 
  return {
      name
  }
});


ubicacion.getCiudadlalo('Quito')
    .then(console.log);

a=ubicacion.getCiudadlalo('Quito')
b=a
c=Object.values(a)
console.log(b)
console.log(c)

    app.get('/', function (req, res) {
  //render = cuando se renderisa las variables toman el valor 
  res.render('home',{
    nombre:a,
    anio: new Date().getFullYear()
  });
});

app.get('/about', function (req, res) {
  //render = cuando se renderisa las variables toman el valor 
  res.render('about',{
    anio: new Date().getFullYear()
  });
});

// app.get('/about',(req,res)=>{
//   res.send('Esta es mi primera web app');
// });

app.listen(port,()=>{
  console.log(`Escuchando peticiones en el puerto  :${port}`);
});

