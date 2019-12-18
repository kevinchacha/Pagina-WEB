const axios=require('axios');

const getCiudadlalo=async(nombre)=>{
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
        name,lat,lon
    }
}
module.exports={
    getCiudadlalo
}