const reiniciarCarritoElement = document.getElementById("reiniciar");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalElement = document.getElementById("total");

// Definir la variable una sola vez de forma global
window.contenedorTarjetas = document.getElementById("productos-cont");

/** Crea las tarjetas de productos */
// Función para generar las tarjetas del carrito
function crearTarjetasProductosInicio() {
    const productosEnCarrito = JSON.parse(localStorage.getItem("mezcales")) || [];
    const contenedorCarrito = document.getElementById("productos-cont");

    // Limpiar el contenedor antes de agregar las tarjetas
    contenedorCarrito.innerHTML = "";

    // Generar las tarjetas solo para los productos en el carrito
    productosEnCarrito.forEach(producto => {
        // Crear la tarjeta
        const nuevoMezcal = document.createElement("div");
        nuevoMezcal.classList.add("tarjeta-ecommerce");

        // Crear el contenido de la tarjeta con imagen
        nuevoMezcal.innerHTML = `
            <div class="tabla-car">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-ecommerce">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <button class="restar" data-id="${producto.id}">-</button>
                <span class="cantidad" id="cantidad-${producto.id}">${producto.cantidad}</span>
                <button class="sumar" data-id="${producto.id}">+</button>
            </div>
        `;

        // Agregar eventos a los botones de sumar y restar
        const botonSumar = nuevoMezcal.querySelector(".sumar");
        const botonRestar = nuevoMezcal.querySelector(".restar");

        botonSumar.addEventListener("click", () => {
            agregarAlCarrito(producto);
            actualizarTotal();
        });

        botonRestar.addEventListener("click", () => {
            restarAlCarrito(producto);
            actualizarTotal();
        });

        // Agregar la tarjeta al contenedor
        contenedorCarrito.appendChild(nuevoMezcal);
    });
}

// Llamamos a la función para generar las tarjetas al cargar la página
crearTarjetasProductosInicio();
actualizarTotal();

function actualizarTotal() {
    const productosEnCarrito = JSON.parse(localStorage.getItem("mezcales")) || [];
    let precioTotal = 0;

    productosEnCarrito.forEach(producto => {
        precioTotal += producto.precio * producto.cantidad; 
    });

    // Insertamos el total en el HTML
    document.querySelector(".importe").textContent = `$${precioTotal.toFixed(2)}`;
}

// Seleccionar el botón "Vaciar carrito"
const botonVaciarCarrito = document.getElementById("reiniciar");

// Función para vaciar el carrito
function vaciarCarrito() {
    // Eliminar productos del localStorage
    localStorage.removeItem("mezcales");

    // Seleccionar correctamente el contenedor de productos en el carrito
    const contenedorCarrito = document.getElementById("productos-cont");

    // Vaciar el contenedor de productos en el carrito
    contenedorCarrito.innerHTML = "";

    // Actualizar el total a $0.00
    document.querySelector(".importe").textContent = "$0.00";

    // Reiniciar el contador del carrito
    document.getElementById("cuenta-carrito").textContent = "0";

    // Actualizar visibilidad
    revisarMensajeVacio();
} 

// Agregar evento al botón
botonVaciarCarrito.addEventListener("click", vaciarCarrito);

function revisarMensajeVacio(){
    const productos = JSON.parse(localStorage.getItem("mezcales"));
    carritoVacioElement.classList.toggle("escondido", productos && productos.length > 0);
    totalElement.classList.toggle("escondido", !productos || productos.length === 0);
}

revisarMensajeVacio();