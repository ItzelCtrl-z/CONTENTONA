const reiniciarCarritoElement = document.getElementById("reiniciar");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalElement = document.getElementById("total");

// Contenedor global para las tarjetas
window.contenedorTarjetas = document.getElementById("productos-cont");

// Cargar tarjetas al iniciar la página
document.addEventListener("DOMContentLoaded", () => {
    const productosEnCarrito = JSON.parse(localStorage.getItem("mezcales")) || [];
    productosEnCarrito.forEach(crearTarjetaProducto); // Usamos solo esta función
    actualizarTotal();
    revisarMensajeVacio();
});

function crearTarjetaProducto(producto) {
    if (document.getElementById(`tarjeta-${producto.id}`)) return;

    const fotoProducto = fotos.find(foto => foto.id === producto.id); // Busca la imagen en el array
    const imagenSrc = fotoProducto ? fotoProducto.imagen : "./IMAGENES/placeholder.jpg"; // Imagen por defecto si no se encuentra

    const nuevoMezcal = document.createElement("div");
    nuevoMezcal.classList.add("tarjeta-ecommerce");
    nuevoMezcal.id = `tarjeta-${producto.id}`;

    const subtotal = producto.precio * producto.cantidad;

    nuevoMezcal.innerHTML = `
        <div class="tabla-car">
            <img src="${imagenSrc}" alt="${producto.nombre}" class="imagen-ecommerce">
            <h3>${producto.nombre}</h3>
            <button class="restar" data-id="${producto.id}">-</button>
            <span class="cantidad" id="cantidad-${producto.id}">${producto.cantidad}</span>
            <button class="sumar" data-id="${producto.id}">+</button>
            <p class="importe-producto" id="importe-${producto.id}">$${subtotal.toFixed(2)}</p>
        </div>
    `;

    nuevoMezcal.querySelector(".sumar").addEventListener("click", () => {
        agregarAlCarrito(producto);
        actualizarCantidadEImporte(producto.id);
        actualizarTotal();
    });

    nuevoMezcal.querySelector(".restar").addEventListener("click", () => {
        restarAlCarrito(producto);
        actualizarCantidadEImporte(producto.id);
        actualizarTotal();
    });

    window.contenedorTarjetas.appendChild(nuevoMezcal);
}


/** Actualiza la cantidad e importe en la tarjeta */
function actualizarCantidadEImporte(idProducto) {
    const memoria = JSON.parse(localStorage.getItem("mezcales")) || [];
    const producto = memoria.find(mezcal => mezcal.id === idProducto);

    if (producto) {
        document.getElementById(`cantidad-${idProducto}`).textContent = producto.cantidad;
        document.getElementById(`importe-${idProducto}`).textContent = `$${(producto.precio * producto.cantidad).toFixed(2)}`;
    }
}

/** Actualiza el total general */
function actualizarTotal() {
    const productos = JSON.parse(localStorage.getItem("mezcales")) || [];
    const total = productos.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0);
    document.querySelector(".importe").textContent = `$${total.toFixed(2)}`;
}

/** Actualiza el número del carrito en el header */
function actualizarNumeroCarrito() {
    const productos = JSON.parse(localStorage.getItem("mezcales")) || [];
    const cuenta = productos.reduce((acc, producto) => acc + producto.cantidad, 0);
    document.getElementById("cuenta-carrito").innerText = cuenta;
}

/** Muestra u oculta el mensaje de carrito vacío */
function revisarMensajeVacio() {
    const productos = JSON.parse(localStorage.getItem("mezcales"));
    const hayProductos = productos && productos.length > 0;

    carritoVacioElement.classList.toggle("escondido", hayProductos);
    totalElement.classList.toggle("escondido", !hayProductos);
    document.querySelector(".btn-car").classList.toggle("escondido", !hayProductos);
}

/** Vacía todo el carrito */
document.getElementById("reiniciar").addEventListener("click", () => {
    localStorage.removeItem("mezcales");
    window.contenedorTarjetas.innerHTML = "";
    document.querySelector(".importe").textContent = "$0.00";
    actualizarNumeroCarrito();
    revisarMensajeVacio();
});