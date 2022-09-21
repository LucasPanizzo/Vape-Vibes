// Arreglos
    let productos =[
        {categoria:"vaporizadores",nombre:"Vaporesso Renova Zero",precio:10000,img:"../imagenes/vapo1.jpg",id:101,cantidad:1},
        {categoria:"vaporizadores",nombre:"Uwell Caliburn",precio:12000,img:"../imagenes/vapo2.jpg",id:102,cantidad:1},
        {categoria:"vaporizadores",nombre:"Vaporesso GTX GO 80",precio:14000,img:"../imagenes/vapo3.jpg",id:103,cantidad:1},
        {categoria:"vaporizadores",nombre:"Smok Nord 2",precio:15000,img:"../imagenes/vapo4.jpg",id:104,cantidad:1},
        {categoria:"vaporizadores",nombre:"Pachamama 1200 PUFF",precio:4000,img:"../imagenes/vapo5.jpg",id:105,cantidad:1},
        {categoria:"vaporizadores",nombre:"VooPoo Drag 3",precio:27000,img:"../imagenes/vapo6.jpg",id:106,cantidad:1},
        {categoria:"vaporizadores",nombre:"Vaporesso Luxe 80s",precio:20000,img:"../imagenes/vapo7.jpg",id:107,cantidad:1},
        {categoria:"vaporizadores",nombre:"Vaporesso Gen S",precio:34000,img:"../imagenes/vapo8.jpg",id:108,cantidad:1},
        {categoria:"liquidos",nombre:"Shibumi frutilla",precio:1000,img:"../imagenes/liquido1.jpg",id:201,cantidad:1},
        {categoria:"liquidos",nombre:"Shibumi uva",precio:1300,img:"../imagenes/liquido2.jpg",id:202,cantidad:1},
        {categoria:"liquidos",nombre:"Shibumi sandía",precio:1600,img:"../imagenes/liquido3.jpg",id:203,cantidad:1},
        {categoria:"liquidos",nombre:"Shibumi cheescake",precio:2000,img:"../imagenes/liquido4.jpg",id:204,cantidad:1},
        {categoria:"liquidos",nombre:"Shibumi limon + nicotina",precio:3300,img:"../imagenes/liquido5.jpg",id:205,cantidad:1},
        {categoria:"liquidos",nombre:"Shibumi wabi sabi + nicotina",precio:3300,img:"../imagenes/liquido6.jpg",id:206,cantidad:1},
        {categoria:"liquidos",nombre:"Element caramelo",precio:5000,img:"../imagenes/liquido7.jpg",id:207,cantidad:1},
        {categoria:"liquidos",nombre:"Element Fresa",precio:5000,img:"../imagenes/liquido8.jpg",id:208,cantidad:1},
        {categoria:"repuestos",nombre:"Resistencia",precio:500,img:"../imagenes/rep1.jpg",id:301,cantidad:1},
        {categoria:"repuestos",nombre:"Cargador micro USB",precio:800,img:"../imagenes/rep4.jpg",id:302,cantidad:1},
        {categoria:"repuestos",nombre:"Batería",precio:2000,img:"../imagenes/rep2.jpg",id:303,cantidad:1},
        {categoria:"repuestos",nombre:"Cartucho",precio:3500,img:"../imagenes/rep3.jpg",id:304,cantidad:1},
    ];
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
let ids = productos.map((el) => el.id); // Mapeo de las ids de los objetos, para pushear al carrito con cada botón.
// ------------------
// Obtención del carrito mediante localStorage
// agrego un event listener para cuando cargue la página, una vez que esto sucede, obtiene el item guardado en el storage en la function agregarItemAlCarrito, cuando obtengo todo el carrito, lo vuelvo a convertir a JS para poder reproducirlo y asi no perder los elementos del carrito.
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        agregarItemAlCarrito()
    }
})
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
    } else if(cardLiquis){
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
                <button class="btn btn-primary bott" id="boton${el.id}">Agregar al carrito <i class="bi bi-cart-fill"></i></button>
            </div>
        </div>    
        `
    }
// -------------------------
// Selecciono todos los botones del DOM en una nodelist, y luego con un foreach, le agrego un eventListener a cada uno de ellos, que ejecuta la function 'eventoPresion',explicada más abajo.
const botonesCarrito = document.querySelectorAll('.bott');
botonesCarrito.forEach((botonesCarritoPresionado) => {
    botonesCarritoPresionado.addEventListener('click', eventoPresion)
})
//Funciones Correspondientes al agregado de objetos al carrito
    // Se ejecuta cuando se presiona un boton, recibe un parametro (id), mediante la function eventoPresion() y si este existe, lo guarda en una variable, lo pushea al carrito y ejecuta la siguiente function.
    let agregar = (id) => {
        const agregado = carrito.some(el => el.id === id)
        if(agregado){
            const elem = carrito.map(elem =>{
                if(elem.id === id){
                    elem.cantidad++
                }
            })
        } else{
        let prodSeleccionado = productos.find(prod=>prod.id===id);
        carrito.push(prodSeleccionado);
        }
        agregarItemAlCarrito(); 
    };    
    // Se ejecuta luego de agregar(), primeramente vacia el elemento padre (carritoPlantilla) para que no se dupliquen los elementos, luego con un reduce calculo el precio total para que varie según elimine o agregue productos, y luego inyecto codigo HTML con los parametros correspondientes.
    const agregarItemAlCarrito= () => {
        if(carritoContainer){
                if(carrito.length < 1){
                    carritoContainer.classList.add('oculto')
                } else if(carrito.length >= 1){
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
                <div class="carrito-item-cantidad d-flex pb-2 pt-3">
                    <p class="mb-0 ms-5">${elem.cantidad}</p>
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
            
        })}};
        // configuro los botones como target, y utilizo el metodo .closest para seleccionar la card mas cercana al boton presionado, para recuperarla, luego con esa card, recupero un elemento donde guarde  la id del producto, y ejecuto la funcion agregar()
        function eventoPresion(event){
            const butt = event.target
            const item= butt.closest('.card')
        
            const itemId = parseInt(item.querySelector('.id-producto').textContent);
            agregar(itemId)
        }
//----------------------
// Funciones correspondientes al vaciado del carrito
    if(botonVaciar){
        botonVaciar.addEventListener('click', () => {
        carrito.length = 0;
        agregarItemAlCarrito();
    });};
    const eliminarDelCarrito = (ID) => {
        const itemEliminado = carrito.find((del) => del.id === ID);
        const index = carrito.indexOf(itemEliminado);
        carrito.splice(index,1);
        agregarItemAlCarrito();
    } ;
// -----------------------
if(terminarCompra){
    terminarCompra.addEventListener('click', () => {
        alert('Serás redirigido a la página de pago.')
        carrito.length = 0;
        agregarItemAlCarrito();
});}

