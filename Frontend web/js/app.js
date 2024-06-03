var valueNick;
var tamanoInput ;
var emailForm ;
var formEntrada ;
var errorPopup ;
var avatarItem;
var itemimg;
var avatarcontainer;
//Funciones
//Si hay algun error de juego.html
if(sessionStorage.getItem('errorPopup')!=null){
    errorPopup.innerText = sessionStorage.getItem('errorPopup');
    sessionStorage.removeItem('errorPopup');
}
function comprobarform(event){
    //comprobar nick y select
    if(valueNick.value.match(/(?<!\S)[0-9]/)){
        valueNick.focus();
        event.preventDefault();
        errorPopup.innerText= "El campo de nick no puede comenzar por un número"
        return false;
    }else if(tamanoInput.value=="0"){
        console.log("No se ha seleccionado el tamaño del panel");
        tamanoInput.focus();
        event.preventDefault();
        errorPopup.innerText= "Debe seleccionar un tamaño de panel"
        return false;
    }
    //Información correcta
    datoUsuario(valueNick,tamanoInput,emailForm,avatarcontainer)
    historicoUsuario(valueNick)
    return true;
}
function moviendoimg(event){
    itemimg = event.target;
    console.log(itemimg.src); //propiedad src para que nos diga la imagen que estamos moviendo
}
function cambiarimg(){
    avatarcontainer.src = itemimg.src  //le damos el cambiazo
}

//Carga de objetos dom , comprobaciones y eventos del form
function domcargado(){
    //Captura de todos los elements
    valueNick = document.getElementById('nick');
    tamanoInput = document.getElementById('tamano');
    emailForm = document.getElementById('email')
    formEntrada = document.getElementById('formEntrada');
    errorPopup = document.getElementById('error')
    // Comprobar si hay algun error en el juego
    if(sessionStorage.getItem('errorPopup')!=null){
        errorPopup.innerText = sessionStorage.getItem('errorPopup');
        sessionStorage.removeItem('errorPopup');
    }
    formEntrada.addEventListener('submit', comprobarform);

    //Eventos drag & drop
    avatarItem= document.getElementsByClassName('avatarItemimg') //capturamos todos los eventos de esa clase
    for(let item of avatarItem){
        item.addEventListener('dragstart',moviendoimg);
    }
    avatarcontainer = document.getElementById('avatarimg');
    avatarcontainer.addEventListener('dragover',event=>(event.preventDefault()))
    avatarcontainer.addEventListener('drop', cambiarimg)
}

//Inicio de carga de eventos 
document.addEventListener('DOMContentLoaded', domcargado)
datoGeolocalizacion();
