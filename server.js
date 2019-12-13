const express = require('express')
const app = express();
const hbs =require('hbs');

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


app.get('/', function (req, res) {
  //render = cuando se renderisa las variables toman el valor 
  res.render('home',{
    nombre:'Kevin ChaCha M',
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

