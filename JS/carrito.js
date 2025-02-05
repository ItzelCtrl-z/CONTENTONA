
// Definir la variable una sola vez de forma global
window.contenedorTarjetas = document.getElementById("productos-cont");

/** Crea las tarjetas de productos */
function crearTarjetasProductosInicio() {
    const productos = JSON.parse(localStorage.getItem("fotos"))
    console.log(productos)

    fotos.forEach(producto => {
        // Crear la tarjeta
        const nuevoMezcal = document.createElement("div");
        nuevoMezcal.classList.add("tarjeta-ecommerce");

        // Crear el contenido de la tarjeta con imagen
        nuevoMezcal.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-ecommerce">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <div class="cantidad-container">
                <button class="restar" data-id="${producto.id}">-</button>
                <span class="cantidad" id="cantidad-${producto.id}">1</span>
                <button class="sumar" data-id="${producto.id}">+</button>
            </div>
            <button class="agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
        `;

        // Agregar eventos a los botones de sumar y restar
        const botonSumar = nuevoMezcal.querySelector(".sumar");
        const botonRestar = nuevoMezcal.querySelector(".restar");
        const cantidadElemento = nuevoMezcal.querySelector(".cantidad");

        let cantidad = 1;

        botonSumar.addEventListener("click", () => {
            cantidad++;
            cantidadElemento.textContent = cantidad;
        });

        botonRestar.addEventListener("click", () => {
            if (cantidad > 1) {
                cantidad--;
                cantidadElemento.textContent = cantidad;
            }
        });

        // Agregar evento al botón de agregar al carrito
        const botonAgregar = nuevoMezcal.querySelector(".agregar-carrito");
        botonAgregar.addEventListener("click", () => agregarAlCarrito(producto, cantidad));

        // Agregar la tarjeta al contenedor
        contenedorTarjetas.appendChild(nuevoMezcal);
    });
}

// Llamamos a la función para generar las tarjetas
crearTarjetasProductosInicio();
