function agregarAlCarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("mezcales")) || [];
    const indiceProducto = memoria.findIndex(mezcal => mezcal.id === producto.id);
    const nuevaMemoria = [...memoria]; // Clonamos el array para evitar modificarlo directamente

    if (indiceProducto === -1) {
        nuevaMemoria.push(getNuevoProductoParaMemoria(producto));
    } else {
        nuevaMemoria[indiceProducto].cantidad++;
    }

    localStorage.setItem("mezcales", JSON.stringify(nuevaMemoria));
}

function getNuevoProductoParaMemoria(producto) {
    return { ...producto, cantidad: 1 }; // Creamos una copia del producto con cantidad 1
}

/** Actualiza el número del carrito del header */
const cuentaCarritoElement = document.getElementById("cuenta-carrito");
function actualizarNumeroCarrito(){
    let cuenta = 0;
    const memoria = JSON.parse(localStorage.getItem("mezcales"));
    if(memoria && memoria.length > 0){
      cuenta = memoria.reduce((acum, current)=>acum+current.cantidad,0)
      return cuentaCarritoElement.innerText = cuenta;
    }
    cuentaCarritoElement.innerText = 0;
  }

actualizarNumeroCarrito();