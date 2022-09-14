// Arreglos
    let productos =[
        {categoria:"vaporizadores",nombre:"Vaporesso Renova Zero",precio:10000,img:"./imagenes/vapo1.jpg",id:1},
        {categoria:"vaporizadores",nombre:"Uwell Caliburn",precio:12000,img:"./imagenes/vapo2.jpg",id:2},
        {categoria:"vaporizadores",nombre:"Vaporesso GTX GO 80",precio:14000,img:"./imagenes/vapo3.jpg",id:3},
        {categoria:"liquidos",nombre:"Sabor frutilla",precio:1000,img:"./imagenes/liquido1.jpg",id:4},
        {categoria:"liquidos",nombre:"Sabor uva",precio:1300,img:"./imagenes/liquido2.jpg",id:5},
        {categoria:"liquidos",nombre:"Sabor sandía",precio:1600,img:"./imagenes/liquido3.jpg",id:6},
        {categoria:"repuestos",nombre:"Resistencia",precio:500,img:"./imagenes/rep1.jpg",id:7},
        {categoria:"repuestos",nombre:"Batería",precio:2000,img:"./imagenes/rep2.png",id:8},
        {categoria:"repuestos",nombre:"Cartucho",precio:3500,img:"./imagenes/rep3.jpg",id:9},
    ];
    // Elementos correspondientes al funcionamiento del carrito de compras.
    let carrito = [];
    let carritoTotal = 0;
//----------------------
// Obtención de objetos del DOM
    let card = document.getElementById("cardPlantilla");
    let carritoPlantilla = document.getElementById("carritoPlantilla");
    let carritoTotalText = document.getElementById("carritoTotal");
    let botonVaciar = document.getElementById("carritoVaciar");
    let terminarCompra = document.getElementById("carritoTerminar")
// ------------------

let ids = productos.map((el) => el.id); // Mapeo de las ids de los objetos, para pushear al carrito con cada botón.

// Código de las cards de producto inyectado mediante JS
    productos.forEach((el) => {
        card.innerHTML += `
        <div class="card" style="width: 18rem;">
            <img src="${el.img}" class="card-img-top" alt="${el.nombre}">
            <div class="card-body">
                <h5 class="card-title">${el.nombre}</h5>
                <h6 class="card-subtitle mb-2 text-muted">$${el.precio}</h6>
                <a href="#" class="btn btn-primary bott" onclick="agregar(${el.id})" id="boton${el.id}">Agregar al carrito <i class="bi bi-cart-fill"></i></a>
            </div>
        </div>    
        `
    });
// -------------------------

//Funciones Correspondientes al agregado de objetos al carrito
    // Se ejecuta cuando se presiona un boton, recibe un parametro (id) y si este existe, lo guarda en una variable, lo pushea al carrito y ejecuta la siguiente function.
    let agregar = (id) => {
        let prodSeleccionado = productos.find(prod=>prod.id===id);
        carrito.push(prodSeleccionado);
        agregarItemAlCarrito(); 
    };

    // Se ejecuta luego de agregar(), primeramente vacia el elemento padre (carritoPlantilla) para que no se dupliquen los elementos, luego con un reduce calculo el precio total para que varie según elimine o agregue productos, y luego inyecto codigo HTML con los parametros correspondientes.
    const agregarItemAlCarrito= () => {
        carritoPlantilla.innerHTML = ""
        carritoTotalText.innerText = `$${carrito.reduce((acc,prod) => acc + prod.precio,0)}`;
        carrito.forEach((elem) => {
            const carritoFila = document.createElement('div');
            const carritoContenido = `
            <div class="row carritoItem border-bottom aling-items-center">
            <div class="col-6">
                <div class="carrito-item-title d-fle pb-2 pt-3">
                    <h6 class="ml-3 mb-0">${elem.nombre}</h6>
                </div>
            </div>
            <div class="col-4">
                <div class="carrito-item-precio d-flex pb-2 pt-3">
                    <p class="mb-0">$${elem.precio}</p>
                </div>
            </div>
            <div class="col-2">
                <div class="carrito-item-trash d-flex justify-content-between align-items-center h-100 pb-2 pt-3">
                    <button class="carritoBasuraButt" onclick="eliminarDelCarrito(${elem.id})"><i class="bi bi-trash carritoBasura" id="trash${elem.id}"></i></button>
                </div>
            </div>
        </div>
            `
            carritoFila.innerHTML = carritoContenido
            carritoPlantilla.appendChild(carritoFila)
        })};
//----------------------
// Funciones correspondientes al vaciado del carrito
    botonVaciar.addEventListener('click', () => {
        carrito.length = 0;
        agregarItemAlCarrito();
    });
    const eliminarDelCarrito = (ID) => {
        const itemEliminado = carrito.find((del) => del.id === ID);
        const index = carrito.indexOf(itemEliminado);
        carrito.splice(index,1);
        agregarItemAlCarrito();
    } ;
// -----------------------
terminarCompra.addEventListener('click', () => alert('Serás redirigido a la página de pago.'));