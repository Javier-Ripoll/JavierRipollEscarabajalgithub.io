/* 
*           DATOS DE GESTIÓN 
*           DE LOS USUARIOS    
*/
var nick;
var tamano;
var email;
var geolocalizacion;
var avatar;
function datoUsuario(nick,tamano,email,avatarcontainer){
    sessionStorage.setItem('nick',nick.value); //colocamos nuevo elemento clave:valor
    sessionStorage.setItem('tamano',tamano.value);
    sessionStorage.setItem('email',email.value);
    sessionStorage.setItem('geolocalizacion',geolocalizacion);
    sessionStorage.setItem('avatar',avatarcontainer.src);
}
function cogerDatos(){
    nick = sessionStorage.getItem('nick')
    tamano = sessionStorage.getItem('tamano')
    email = sessionStorage.getItem('email')
    avatar = sessionStorage.getItem('avatar')
}
function comprobarDatos(){
    if(nick==null){
        sessionStorage.setItem('errorPopup','Completa el formulario');
        return false;
    }
    return true;
}
//Geolocalización
function datoGeolocalizacion(){
   if(!navigator.geolocation){
    geolocalizacion= "el navegador no es compatible";
   }else{
        navigator.geolocation.getCurrentPosition(
            //Exito
            (position)=>{geolocalizacion="Latitud: "+position.coords.latitude+",longitud: "
            +position.coords.longitude},
            //Error
            ()=>{geolocalizacion="La geolocaalización no se ha podido realizar"}
        )
   } 
}
//LocalStorage
function historicoUsuario(nick){
    let historicoStorage = localStorage.getItem('historico')
    let historico;
    if(historicoStorage==null){   //Sino hay ninguno osea es nulo, lo crea por primera vez
        historico=[];
    }else{
        historico=JSON.parse(historicoStorage); // hace la inversa de stringify
    }
    let registroUsurario ={
        usuario:nick.value,
        fecha: Date.now()
    }
    historico.push(registroUsurario); //almacenar los usuarios en arrays para no "destruir" los que vienepor detras
    localStorage.setItem('historico', JSON.stringify(registroUsurario))
}