//manda llamar al boton NO
var btnNo = document.getElementById ("Boton2");
//manda llamar al boton SI
var btnSi = document.getElementById ("Boton1");

function action () {
    window.alert ("Lo siento, eres demasiado joven para este contenido.");
}

btnNo.addEventListener ("click", action);