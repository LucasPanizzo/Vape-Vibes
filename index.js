// Arreglos
let categorias = ["Vaporizadores","Liquidos","Repuestos"];
let vaporizadores = [];
let liquidos = [];
let repuestos = [];
let paises = [];
let carrito = [];
// ------------------------------
//Objetos
    //Vaporizadores
    const vapo1 = {
        nombre:"Vaporesso Renova Zero",precio:10000,id:1
    };
    vaporizadores.push(vapo1)
    const vapo2 = {
        nombre:"Uwell Caliburn",precio:12000,id:2
    };
    vaporizadores.push(vapo2)
    const vapo3 = 
    {nombre:"Vaporesso GTX GO 80",precio:14000,id:3
    };
    vaporizadores.push(vapo3)
    //----------------

    //Liquidos
    const liquido1 = {
        nombre:"Sabor frutilla",precio:1000,id:1
    };
    liquidos.push(liquido1)
    const liquido2 = {
        nombre:"Sabor uva",precio:1300,id:2
    };
    liquidos.push(liquido2)
    const liquido3 = {
        nombre:"Sabor sandía",precio:1600,id:3
    };
    liquidos.push(liquido3)
    //----------------
    //Repuestos
    const rep1 = {
        nombre:"Resistencia",precio:500,id:1
    };
    repuestos.push(rep1)
    const rep2 = {
        nombre:"Batería",precio:2000,id:2
    };
    repuestos.push(rep2)
    const rep3 = {
        nombre:"Cartucho",precio:3500,id:3
    };
    repuestos.push(rep3)
    //----------------
    //Países con envío
    const arg = {
        nombre:"Argentina",precio:800,id:1
    };
    paises.push(arg)
    const chi = {
        nombre:"Chile",precio:1200,id:2
    };
    paises.push(chi)
    const uru = {
        nombre:"Uruguay",precio:1500,id:3
    };
    paises.push(uru)
    const otro = {
        nombre:"Otro",precio:2000,id:4
    };
    paises.push(otro)
    // ---------------
// Variables
let precioFinal = 0;
let precioProducto
let seguirComprando = true;
const nombre = prompt("Ingresa tu nombre");
alert("¡Bienvenido "+nombre+" a la tienda de Vape Vibes!");
let producto = parseInt(prompt(nombre+" ,selecciona el producto a comprar: 1."+categorias[0]+" - 2."+categorias[1]+" - 3."+categorias[2]+" - 4.Ver carrito."));
let reinicio
// ----------------------------precioProducto
// Funciones
function continuar(){
    reinicio = parseInt(prompt(nombre+" ¿Quieres seguir comprando? 1.Si 2.No"))
    if(reinicio===1){
        producto = parseInt(prompt(nombre+" ,selecciona el producto a comprar: 1."+categorias[0]+" - 2."+categorias[1]+" - 3."+categorias[2]+" - 4.Ver carrito."));
    }
    else if(reinicio===2){
        seguirComprando = false
    }
    else{
        alert("Selecciona una opción válida")
        continuar();
    }
}

total=(precioProducto) => precioFinal = precioFinal + precioProducto;
// ------------------------------
while(seguirComprando===true){
    if(producto===1){
        let vaporizador = parseInt(prompt("Selecciona el vaporizador que quieres comprar: 1."+vapo1.nombre+" ($"+vapo1.precio+") - 2."+vapo2.nombre+" ($"+vapo2.precio+") - 3."+vapo3.nombre+" ($"+vapo3.precio+"). - 4.Cancelar"));  
        if(vaporizador===1){
            total(vapo1.precio);
            continuar();
            carrito.push(vapo1.nombre+" $"+vapo1.precio)
        }
        else if(vaporizador===2){
            total(vapo2.precio);
            continuar();
            carrito.push(vapo2.nombre+" $"+vapo2.precio)
        }
        else if(vaporizador===3){
            total(vapo3.precio);
            continuar();
            carrito.push(vapo3.nombre+" $"+vapo3.precio)
        }
        // const vapoSeleccionado = vaporizadores.find(vapo=>vapo.id===vapoSeleccionado)
        // if(vapoSeleccionado){
        //     continuar();
        //     total(vapoSeleccionado.precio);
        //     carrito.push(vapoSeleccionado.nombre+" $"+vapoSeleccionado.precio)
        // }
        else if(vaporizador===4){
            producto = parseInt(prompt(nombre+" ,selecciona el producto a comprar: 1."+categorias[0]+" - 2."+categorias[1]+" - 3."+categorias[2]+" - 4.Ver carrito."));
        }
        else{
            alert("El producto seleccionado es inválido")
        }
    }
    else if(producto===2){
        let liquido = parseInt(prompt("Selecciona el liquido que quieres comprar: 1."+liquido1.nombre+" ($"+liquido1.precio+") - 2."+liquido2.nombre+" ($"+liquido2.precio+") - 3."+liquido3.nombre+" ($"+liquido3.precio+"). - 4.Cancelar"));  
        if(liquido===1){
            total(liquido1.precio);
            continuar();
            carrito.push(liquido1.nombre+" $"+liquido1.precio)
        }
        else if(liquido===2){
            total(liquido2.precio);
            continuar();
            carrito.push(liquido2.nombre+" $"+liquido2.precio)
        }
        else if(liquido===3){
            total(liquido3.precio);
            continuar();
            carrito.push(liquido3.nombre+" $"+liquido3.precio)
        }
        else if(liquido===4){
            producto = parseInt(prompt(nombre+" ,selecciona el producto a comprar: 1."+categorias[0]+" - 2."+categorias[1]+" - 3."+categorias[2]+" - 4.Ver carrito."));
        }
        else{
            alert("El producto seleccionado es inválido")
        }
    }
    else if(producto===3){
        let rep = parseInt(prompt("Selecciona el repuesto que quieres comprar: 1."+rep1.nombre+" ($"+rep1.precio+") - 2."+rep2.nombre+" ($"+rep2.precio+") - 3."+rep3.nombre+" ($"+rep3.precio+"). - 4.Cancelar"));  
        if(rep===1){
            total(rep1.precio);
            continuar();
            carrito.push(rep1.nombre+" $"+rep1.precio)
        }
        else if(rep===2){
            total(rep2.precio);
            continuar();
            carrito.push(rep1.nombre+" $"+rep1.precio)
        }
        else if(rep===3){
            total(rep3.precio);
            continuar();
            carrito.push(rep1.nombre+" $"+rep1.precio)
        }
        else if(rep===4){
            producto = parseInt(prompt(nombre+" ,selecciona el producto a comprar: 1."+categorias[0]+" - 2."+categorias[1]+" - 3."+categorias[2]+" - 4.Ver carrito."));
        }
        else{
            alert("El producto seleccionado es inválido")
        }
    }
    else if(producto===4){
        alert("Tus productos seleccionados son: "+carrito.join(" - "))
        continuar()
    }
    else{
        alert("Selecciona una opción válida")
        producto = parseInt(prompt(nombre+" ,selecciona el producto a comprar: 1."+categorias[0]+" - 2."+categorias[1]+" - 3."+categorias[2]+" - 4.Ver carrito."));
    }
}
alert("Tus productos seleccionados son: "+carrito.join(" - "))
console.log(carrito)
let envio = parseInt(prompt(nombre+" ¿A qué país envíaremos tu compra? 1."+arg.nombre+" ($"+arg.precio+") - 2."+chi.nombre+" ($"+chi.precio+") - 3."+uru.nombre+" ($"+uru.precio+") - 4."+otro.nombre+" ($"+otro.precio+")."));
if(envio===1){
    total(arg.precio);
}
else if(envio===2){
    total(chi.precio);
}
else if(envio===3){
    total(uru.precio);
}
else{
    total(otro.precio)
}
alert(nombre+" ,el precio final, con envío incluído, es $"+precioFinal+". Te redigiremos a la página de pago.")