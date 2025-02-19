const reiniciarCarritoElement = document.getElementById("reiniciar");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalElement = document.getElementById("total");

// Definir la variable una sola vez de forma global
window.contenedorTarjetas = document.getElementById("productos-cont");

// Al cargar la página, revisar si hay productos y ocultar el mensaje si es necesario
document.addEventListener("DOMContentLoaded", () => {
    revisarMensajeVacio();
});

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

function crearTarjetaProducto(producto) {
    // Verificar si la tarjeta ya existe para no duplicar
    if (document.getElementById(`tarjeta-${producto.id}`)) return;

    const nuevoMezcal = document.createElement("div");
    nuevoMezcal.classList.add("tarjeta-ecommerce");
    nuevoMezcal.id = `tarjeta-${producto.id}`;

    const subtotal = producto.precio * producto.cantidad;

    nuevoMezcal.innerHTML = `
        <div class="tabla-car">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-ecommerce">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button class="restar" data-id="${producto.id}">-</button>
            <span class="cantidad" id="cantidad-${producto.id}">${producto.cantidad}</span>
            <button class="sumar" data-id="${producto.id}">+</button>
            <p class="importe-producto" id="importe-${producto.id}">Importe: $${subtotal.toFixed(2)}</p>
        </div>
    `;

    // Eventos para botones
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

    window.contenedorTarjetas.appendChild(nuevoMezcal); // Agrega la tarjeta al contenedor
}

function actualizarCantidadEImporte(idProducto) {
    const memoria = JSON.parse(localStorage.getItem("mezcales")) || [];
    const producto = memoria.find(mezcal => mezcal.id === idProducto);

    if (producto) {
        const cantidadElemento = document.getElementById(`cantidad-${idProducto}`);
        const importeElemento = document.getElementById(`importe-${idProducto}`);

        if (cantidadElemento && importeElemento) {
            cantidadElemento.textContent = producto.cantidad;
            const nuevoImporte = producto.precio * producto.cantidad;
            importeElemento.textContent = `Importe: $${nuevoImporte.toFixed(2)}`;
        }
    }
}


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

    // Vaciar el contenedor de productos en el carrito
    const contenedorCarrito = document.getElementById("productos-cont");
    contenedorCarrito.innerHTML = "";

    // Actualizar el total a $0.00
    document.querySelector(".importe").textContent = "$0.00";

    // Reiniciar el contador del carrito
    document.getElementById("cuenta-carrito").textContent = "0";

    // Mostrar el mensaje de carrito vacío
    revisarMensajeVacio(true);
}

// Agregar evento al botón
botonVaciarCarrito.addEventListener("click", vaciarCarrito);

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

revisarMensajeVacio();

