const reiniciarCarritoElement = document.getElementById("reiniciar");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalElement = document.getElementById("total");

// Definir la variable una sola vez de forma global
window.contenedorTarjetas = document.getElementById("productos-cont");

/** Crea las tarjetas de productos */
function crearTarjetasProductosInicio() {
    const productos = JSON.parse(localStorage.getItem("fotos"))
    const memoria = JSON.parse(localStorage.getItem("mezcales")) || []; // Obtener productos en el carrito
    console.log(productos)

    fotos.forEach(producto => {
        // Crear la tarjeta
        const nuevoMezcal = document.createElement("div");
        nuevoMezcal.classList.add("tarjeta-ecommerce");

        // Buscar si el producto ya está en el carrito
        const productoEnCarrito = memoria.find(mezcal => mezcal.id === producto.id);
        let cantidad = productoEnCarrito ? productoEnCarrito.cantidad : 1; // Si está, usa su cantidad, si no, inicia en 1

        // Crear el contenido de la tarjeta con imagen
        nuevoMezcal.innerHTML = `
        <div class="tabla-car">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-ecommerce">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button class="restar" data-id="${producto.id}">-</button>
            <span class="cantidad" id="cantidad-${producto.id}">${cantidad}</span>
            <button class="sumar" data-id="${producto.id}">+</button>
        </div>         
    `;

        // Agregar eventos a los botones de sumar y restar
        const botonSumar = nuevoMezcal.querySelector(".sumar");
        const botonRestar = nuevoMezcal.querySelector(".restar");
        const cantidadElemento = nuevoMezcal.querySelector(".cantidad");

        botonSumar.addEventListener("click", () => {
            cantidad++;
            cantidadElemento.textContent = cantidad;
            agregarAlCarrito(producto);
            actualizarTotal();
        });

        botonRestar.addEventListener("click", () => {
            if (cantidad > 1) {
                cantidad--;
                cantidadElemento.textContent = cantidad;
                restarAlCarrito(producto);
            } else {
                restarAlCarrito(producto); // Se encarga de eliminar del localStorage
                nuevoMezcal.remove();
            }

            actualizarTotal();
        });

        // Agregar la tarjeta al contenedor
        contenedorTarjetas.appendChild(nuevoMezcal);
    });
}

// Llamamos a la función para generar las tarjetas
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

// Función para revisar si el carrito está vacío
function revisarMensajeVacio() {
    const productos = JSON.parse(localStorage.getItem("mezcales"));
    
    // Mostrar el mensaje de carrito vacío si no hay productos
    carritoVacioElement.classList.toggle("escondido", productos && productos.length > 0);
    
    // Ocultar el total si no hay productos
    totalElement.classList.toggle("escondido", !productos || productos.length === 0);

    // Ocultar los botones .pay y .borrar si no hay productos
    const botonesCarrito = document.querySelector(".btn-car");
    botonesCarrito.classList.toggle("escondido", !productos || productos.length === 0);
}

// Al cargar la página, revisar si hay productos y ocultar los botones si es necesario
document.addEventListener("DOMContentLoaded", () => {
    revisarMensajeVacio();
});