
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

    // **Actualizar el número del carrito inmediatamente**
    actualizarNumeroCarrito();

    // **Actualizar la cantidad en la interfaz**
    actualizarCantidadEnCarrito(producto.id);
}

function restarAlCarrito(producto) {
    let memoria = JSON.parse(localStorage.getItem("mezcales")) || [];
    const indiceProducto = memoria.findIndex(mezcal => mezcal.id === producto.id);

    if (indiceProducto !== -1) {
        if (memoria[indiceProducto].cantidad > 1) {
            memoria[indiceProducto].cantidad--; // Restar una unidad
        } else {
            memoria.splice(indiceProducto, 1); // Eliminar el producto si la cantidad es 1
            document.getElementById(`cantidad-${producto.id}`).closest(".tarjeta-ecommerce").remove();
        }
    }

    localStorage.setItem("mezcales", JSON.stringify(memoria));

    // Actualizar el número del carrito
    actualizarNumeroCarrito();

    // Actualizar la cantidad en el carrito si el producto ya está visible
    actualizarCantidadEnCarrito(producto.id);

    // Verificar si el carrito quedó vacío y mostrar el mensaje
    revisarMensajeVacio();
}

function actualizarCantidadEnCarrito(idProducto) {
    const memoria = JSON.parse(localStorage.getItem("mezcales")) || [];
    const productoEnCarrito = memoria.find(mezcal => mezcal.id === idProducto);

    if (productoEnCarrito) {
        const cantidadElemento = document.getElementById(`cantidad-${idProducto}`);
        if (cantidadElemento) {
            cantidadElemento.textContent = productoEnCarrito.cantidad;
        }
    }
}    

function getNuevoProductoParaMemoria(producto) {
    return { ...producto, cantidad: 1 }; // Creamos una copia del producto con cantidad 1
}

/** Actualiza el número del carrito del header */
const cuentaCarritoElement = document.getElementById("cuenta-carrito");

function actualizarNumeroCarrito() {
    let cuenta = 0;
    const memoria = JSON.parse(localStorage.getItem("mezcales")) || [];
    if (memoria.length > 0) {
        cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
    }
    cuentaCarritoElement.innerText = cuenta;
}

actualizarNumeroCarrito();