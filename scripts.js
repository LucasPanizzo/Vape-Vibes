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
    //Arreglos correspondientes al funcionamiento del carrito de compras.
    let carrito = [];
//----------------------
let card = document.getElementById("card-plantilla");

productos.forEach((el) => {
    card.innerHTML += `
    <div class="card" style="width: 18rem;">
        <img src="${el.img}" class="card-img-top" alt="${el.nombre}">
        <div class="card-body">
        <h5 class="card-title">${el.nombre}</h5>
        <h6 class="card-subtitle mb-2 text-muted">$${el.precio}</h6>
        <a href="#" class="btn btn-primary" id="boton${el.id}">Agregar al carrito <i class="bi bi-cart-fill"></i></a>
        </div>
    </div>    
    `

    const boton = document.getElementById(`boton${el.id}`)
    console.log(boton)
    boton.addEventListener('click', alert('as'))
});





let agregar = (id) => {
    let prodSeleccionado = productos.find(prod=>prod.id===id);
    carrito.push(prodSeleccionado);
}
console.log(carrito)