
const contenedorTarjetas = document.getElementById("productos-container");

/** Crea las tarjetas de productos */
function crearTarjetasProductosInicio(productos) {
    productos.forEach(producto => {
        // Crear la tarjeta
        const nuevoMezcal = document.createElement("div");
        nuevoMezcal.classList.add("tarjeta-producto");

        // Crear el contenido de la tarjeta con imagen
        nuevoMezcal.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-producto">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button class="agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
        `;

        // Agregar evento al botón
        const botonAgregar = nuevoMezcal.querySelector(".agregar-carrito");
        botonAgregar.addEventListener("click", () => {
            agregarAlCarrito(producto);
            actualizarTotal(); // Se actualiza el total inmediatamente
        });
        

        // Agregar la tarjeta al contenedor
        contenedorTarjetas.appendChild(nuevoMezcal);
    });

}

// Llamamos a la función para generar las tarjetas
crearTarjetasProductosInicio(mezcales);
