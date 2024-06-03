//Variables Globales
var iniciadoMarcado = false;
var adyacentes = [];
var tamanoPanel;
var classMarcada;
var idMarcado =[];
var IDinterval;

function getrandomItgem(max){
    return Math.floor(Math.random() * max)
}

function rellenarFormularioUsuario(){
    document.getElementById('nick').value=nick; //de esta forma recogemos el nombre que ha puesto en el primer form
    document.getElementById('avatarImg').src=avatar
    tamanoPanel= parseInt(tamano)
}

function pintarpanel(){
    document.getElementById('juego').style.gridTemplateColumns= " repeat("+tamano+",1fr)"
    document.getElementById('juego').style.gridTemplateRows = " repeat("+tamano+",1fr)"
    //Elementos de forma automática
    let items = "";
    let color = ["rojo" , "verde"];
    let colorrandome = 0;
    for (let index = 0; index< (parseInt(tamano)*parseInt(tamano));  index++){
        if (index%2>0) colorrandome=getrandomItgem(2);
        items+=`<div class="containerItem"><div id="${index}" class="item ${color[colorrandome]} "></div></div>` //comilla haci la derecha son de interpretación 
    }
    document.getElementById('juego').innerHTML=items;
}
//Calculo Matemático
function calcularAdyacentes(idMarcado){
    adyacentes = []
    //adyacente superior
    if((idMarcado-tamanoPanel)>=0) adyacentes.push(idMarcado-tamanoPanel)
    //adyacente inferior
    if((idMarcado+tamanoPanel)< (tamanoPanel*tamanoPanel)) adyacentes.push(idMarcado+tamanoPanel)
    //Adyacente izquierda   
    if((idMarcado%tamanoPanel)>0 ) adyacentes.push(idMarcado-1)
    //Adyacente derecha   
    if(((idMarcado+1)%tamanoPanel)>0 ) adyacentes.push(idMarcado+1)

    for (let index = 0; index < adyacentes.length; index++) {
        console.log(adyacentes[index]);
        
    }

}
//Función que realiza el conteo haci atras del juego
function cuentaAtras(){
    let tiempo =parseInt(document.getElementById('tiempo').value)-1;
    document.getElementById('tiempo').value = tiempo
    if(tiempo==0){
        clearInterval(IDinterval);
        //Finalizar todos los eventos cuando acabe el tiempo
        const items = document.getElementsByClassName('item');
        for (let item of items){
             item.removeEventListener('mousedown',comenzarMarcar)
             item.removeEventListener('mouseover',continuarMarcando)
         }
         document.removeEventListener('mouseup', finalizarMarcado)
         //Cambiar z-index
        document.getElementById('juegoacabado').classList.add('juegoAcabadoColor')
        document.getElementById('juegoacabado').style.zIndex="2";
        document.getElementById('juego').style.zIndex="1";
        document.getElementById('nuevaPartida').addEventListener('click',(e)=>location.reload());
    } 
}

//eventos Juego 
function programarEventosJuego(){
   const items = document.getElementsByClassName('item');
   for (let item of items){
        item.addEventListener('mousedown',comenzarMarcar)
        item.addEventListener('mouseover',continuarMarcando)
    }
    document.addEventListener('mouseup', finalizarMarcado)
    //Cuenta atrás
    IDinterval= setInterval(cuentaAtras,1000)
}
//Funciones del juego
//Comenza a marcar
function comenzarMarcar(event){
   let item = event.target; //Hijo
   let containerItem= event.target.parentElement; //Padre
   if (item.classList.contains('rojo')){
       classMarcada="rojo";
        containerItem.classList.add('rojo'); //Rojo
   }else{
    classMarcada="verde" 
    containerItem.classList.add('verde');
    }//verde
   
   if(!iniciadoMarcado) iniciadoMarcado=true; //si no hemos iniciado lo pasamos a true
    //guardo los marcados
    idMarcado.push(parseInt(item.id))
   //comienzo a calcular desde el primer elemento 
   calcularAdyacentes(parseInt(item.id))
   
   console.log("Pinchando sobr el circulo");
}
//Continuar Marcando
function continuarMarcando(event){
    if(iniciadoMarcado){
        let item = event.target //Hijo
        let idNuevo = parseInt(item.id)
        if(adyacentes.includes(idNuevo) && item.classList.contains(classMarcada))
            {
                let containerItem= event.target.parentElement //Padre
                if (item.classList.contains('rojo')) containerItem.classList.add('rojo') //Rojo
                else containerItem.classList.add('verde'); //verde
                idMarcado.push(parseInt(item.id))
                calcularAdyacentes(parseInt(item.id))
            }
    
        

    }
    console.log('pasando sobre un circulo');
}
function finalizarMarcado(){
    iniciadoMarcado=false;
    adyacentes = [];
    //Añadiriamos Puntuación
    const puntuacion = document.getElementById('puntuacion');
    if(idMarcado.length>1){
        puntuacion.value= parseInt(puntuacion.value)+idMarcado.length;
    } 
    //recorrmos el idMarcado
    for (let index = 0; index < idMarcado.length; index++) {
        //capturar objeto
        var dotMarcado = document.getElementById(idMarcado[index]);
        dotMarcado.parentElement.classList.remove(classMarcada);  
        //
        let colores = ["rojo","verde"]
        let colorrandome = getrandomItgem(2)
        dotMarcado.classList.remove(classMarcada);
        dotMarcado.classList.add(colores[colorrandome]);
    }
    idMarcado = [];
    console.log("Funciona");

}



//Capturamos datos
cogerDatos()
//Comprobamos datos
if(!comprobarDatos()) location= "index.html"; //si no es true que mande al index 
console.log(comprobarDatos());    
//rellenar form
rellenarFormularioUsuario();
//Tamaño juego
pintarpanel()
programarEventosJuego()