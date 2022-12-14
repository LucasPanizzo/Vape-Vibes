    // Declaración de los elementos utilizados para los productos
    let productosFetch
    let productos
    // Elementos correspondientes al funcionamiento del carrito de compras.
    let carrito = [];
    let carritoTotal = 0;
//----------------------
// Obtención de objetos del DOM
    let card = document.getElementById("cardPlantilla");
    let cardVapos = document.getElementById("cardPlantillaVapos")
    let cardLiquis = document.getElementById("cardPlantillaLiquis")
    let cardReps = document.getElementById("cardPlantillaReps")
    let carritoPlantilla = document.getElementById("carritoPlantilla");
    let carritoTotalText = document.getElementById("carritoTotal");
    let botonVaciar = document.getElementById("carritoVaciar");
    let terminarCompra = document.getElementById("carritoTerminar")
    let carritoContainer = document.getElementById('contenedorCarrito')
// ------------------
// Cuando el documento cargue, me ejecuta la función traerProductos (Solo en las secciones correspondientes, evitando problemas de consola en el idex),y me carga el localStorage del carrrito.
document.addEventListener('DOMContentLoaded', () => {
    if(card||cardLiquis||cardReps||cardVapos){
        traerProductos()
    }
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        agregarItemAlCarrito()
    }
})
// Programación asincrona de los productos.
// Todo el programa espera el cargado de los productos que provienen del JSON, y se van ejecutando las funciones que dependen de esta.
async function traerProductos(){
    productosFetch = await fetch('./productos.json');
    productos = await productosFetch.json();
    // Filtros; Creo un array filtrando los objetos correspondientes por categoria, para luego inyectar las cards que corresponda en cada página
    let filtroVapos = productos.filter((prod) => prod.categoria === "vaporizadores")
    let filtroLiquis = productos.filter((prod) => prod.categoria === "liquidos")
    let filtroReps = productos.filter((prod) => prod.categoria === "repuestos")
    //-------------------
    // Código de las cards de producto inyectado mediante JS. Revisa si existe el objeto a llamar, y luego reproduce la function constructora de las tarjetas.   
        if(card){
            productos.forEach((el) => {
                crearCards(el,card)
            });
            
        } else if(cardVapos){
            filtroVapos.forEach((el) => {
                crearCards(el,cardVapos)
            });
        } 
        else if(cardLiquis){
            filtroLiquis.forEach((el) => {
                crearCards(el,cardLiquis)
            });
        } else if(cardReps){
            filtroReps.forEach((el) => {
                crearCards(el,cardReps)
            });
        }
        //Function creadora de cards a inyectar, recibe dos parametros, uno que define los elementos de la card, y otro que define el contenedor donde se inyectaran.
        function crearCards(el,name){
            name.innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src="${el.img}" class="card-img" alt="${el.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${el.nombre}</h5>
                    <span class="id-producto">${el.id}</span>
                    <h6 class="card-precio mb-2">$${el.precio}</h6>
                    <button class=" card-butt bott">Agregar al carrito <i class="bi bi-cart-fill"></i></button>
                </div>
            </div>    
            `
        }
        // Selecciono todos los botones del DOM en una nodelist, y luego con un foreach, le agrego un eventListener a cada uno de ellos, que ejecuta la function 'eventoPresion',explicada más abajo.
        const botonesCarrito = document.querySelectorAll('.bott');
        botonesCarrito.forEach((botonesCarritoPresionado) => {
            botonesCarritoPresionado.addEventListener('click', eventoPresion)
        })
        // configuro los botones como target, y utilizo el metodo .closest para seleccionar la card mas cercana al boton presionado, para recuperarla, luego con esa card, recupero un elemento donde guarde  la id del producto, y ejecuto la funcion agregar()
        function eventoPresion(event){
            const butt = event.target
            const item= butt.closest('.card')
            const itemId = parseInt(item.querySelector('.id-producto').textContent);
            agregar(itemId)
        }
        // Se ejecuta cuando se presiona un boton, recibe un parametro (id), mediante la function eventoPresion() y si este existe, lo guarda en una variable, lo pushea al carrito y ejecuta la siguiente function.
        function agregar(id){
            const agregado = carrito.some(el => el.id === id)
            if(agregado){
                aumentarCantidad(id)
            } else{
            let prodSeleccionado = productos.find(prod=>prod.id===id);
            prodSeleccionado.cantidad = 1
            carrito.push(prodSeleccionado);
            }    
            agregarItemAlCarrito();
            Toastify({
                text: "Producto agregado al carrito",
                duration: 1500,
                backgroundColor: '#3b71b9',
                }).showToast();
        };   
        }
// -------------------------
// Se ejecuta luego de agregar(), primeramente vacia el elemento padre (carritoPlantilla) para que no se dupliquen los elementos, luego con un reduce calculo el precio total para que varie según elimine o agregue productos, y luego inyecto codigo HTML con los parametros correspondientes.
// Agregué un if que retorna un boolenao, para que se reproduzca solo en las paginas donde este el contenedor del carrito y asi evitar errores en consola.
function agregarItemAlCarrito(){
    if(carritoContainer){
            if(carrito.length < 1){
                carritoContainer.classList.add('oculto')
            } else{
                carritoContainer.classList.remove('oculto')
            }
        carritoPlantilla.innerHTML = ""
        carritoTotalText.innerText = `$${carrito.reduce((acc,prod) => acc + prod.precio * prod.cantidad,0)}`;
        localStorage.setItem('carrito', JSON.stringify(carrito))
        carrito.forEach((elem) => {
            const carritoFila = document.createElement('div');
            const carritoContenido = `
            <div class="row carritoItem border-bottom aling-items-center">
                <div class="col-4">
                    <div class="carrito-item-title d-fle pb-2 pt-3">
                        <h6 class="ml-3 mb-0">${elem.nombre}</h6>
                    </div>
                </div>
                <div class="col-3">
                    <div class="carrito-item-precio d-flex pb-2 pt-3">
                        <p class="mb-0">$${elem.precio}</p>
                    </div>
                </div>
                <div class="col-3">
                    <div class="carrito-item-cantidad d-flex pb-2 pt-3 align-items-center">
                        <button onclick="disminuirCantidad(${elem.id})" class="carrito-item-cantidad-resta">-</button>
                        <p class="mb-0 carrito-item-cantidad-numero">${elem.cantidad}</p>
                        <button onclick="aumentarCantidad(${elem.id})" class="carrito-item-cantidad-suma">+</button>
                    </div>
                </div>
                <div class="col-2">
                    <div class="carrito-item-trash d-flex justify-content-between align-items-center h-100 pb-2pt-3">
                            <button class="carritoBasuraButt" onclick="eliminarDelCarrito(${elem.id})"><i class="bi-trash carritoBasura" id="trash${elem.id}"></i></button>
                    </div>
                </div>
            </div>
            `
            carritoFila.innerHTML = carritoContenido
            carritoPlantilla.appendChild(carritoFila)
        })}};
//----------------------
// Funciones correspondientes al vaciado del carrito
// Al clickear el boton vaciar, ejecuta una alerta de Swal que me muestra una opcion para confirmar el vaciado o cancelarlo
    botonVaciar &&
        botonVaciar.addEventListener('click', () => {
            Swal.fire({
                title: '¿Deseas vaciar el carrito?',
                text: "No podrás recuperarlo",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si,vaciar',
                cancelButtonText: 'Cancelar' 
              }).then((result) => {
                if(result.isConfirmed){
                  Swal.fire({
                    title:'Borrado',
                    text:'Has vaciado tu carrito',
                    icon:'success',
                    timer:1500,
                    showConfirmButton:false
                 })
                  carrito.length = 0
                  agregarItemAlCarrito();
              }
              })
    });
    function eliminarDelCarrito(ID){
        const itemEliminado = carrito.find((del) => del.id === ID);
        const index = carrito.indexOf(itemEliminado);
        carrito.splice(index,1);
        agregarItemAlCarrito();
        Toastify({
            text: "Producto eliminado del carrito",
            duration: 1500,
            backgroundColor: '#3b71b9',
            }).showToast();
    };
    //Funciones corresponidentes a la cantidad requerida de cada producto.
    // recibe la id mediante el boton y mapea el carrito sumandole 1 elemento por cada click.
    function aumentarCantidad(ID){
        carrito.map(elem =>{
            elem.id === ID &&
                elem.cantidad++
        })
        agregarItemAlCarrito()
    };
    // igual que la de arriba, si la cantidad llega a ser 0, se reinicia a 1 para evitar errores.
    function disminuirCantidad(ID){
        carrito.map(elem =>{
            elem.id === ID &&
                elem.cantidad--
            elem.cantidad <= 0 ? (elem.cantidad=1):null;    
        })
        agregarItemAlCarrito()
    }

// -----------------------
terminarCompra &&
    terminarCompra.addEventListener('click', () => {
        alert('Serás redirigido a la página de pago.')
        carrito.length = 0;
        agregarItemAlCarrito();
    });
