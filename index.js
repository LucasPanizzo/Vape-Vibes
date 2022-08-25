// Variables
let precioFinal = 0;
let precioProducto
let seguirComprando = true;
const nombre = prompt("Ingresa tu nombre");
alert("¡Bienvenido "+nombre+" a la tienda de Vape Vibes!");
let producto = parseInt(prompt(nombre+" ,selecciona el producto a comprar: 1.Vaporizadores - 2.Liquidos - 3.Respuestos"));
let reinicio
// ----------------------------
// Funciones
function continuar(){
    reinicio = parseInt(prompt(nombre+" ¿Quieres seguir comprando? 1.Si 2.No"))
    if(reinicio===1){
        producto = parseInt(prompt(nombre+" ,selecciona el producto a comprar: 1.Vaporizadores - 2.Liquidos - 3.Respuestos"));
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
        let vaporizador = parseInt(prompt("Selecciona el vaporizador que quieres comprar: 1.Vaporesso Renova Zero($10.000) 2.Uwell Caliburn($12.000) 3.Vaporesso GTX GO 80($14.000)"));  
        if(vaporizador===1){
            total(10000);
            continuar();
        }
        else if(vaporizador===2){
            total(12000);
            continuar();
        }
        else if(vaporizador===3){
            total(14000);
            continuar();
        }
        else{
            alert("El producto seleccionado es inválido")
        }
    }
    else if(producto===2){
        let liquidos = parseInt(prompt("Selecciona el liquido que quieres comprar: 1.Sabor frutilla($1.000) 2.Sabor Uva($1.300) 3.Sabor Sandía($1.600)"));  
        if(liquidos===1){
            total(1000);
            continuar();
        }
        else if(liquidos===2){
            total(1300);
            continuar();
        }
        else if(liquidos===3){
            total(1600);
            continuar();
        }
        else{
            alert("El producto seleccionado es inválido")
        }
    }
    else if(producto===3){
        let repuesto = parseInt(prompt("Selecciona el repuesto que quieres comprar: 1.Resistencia($500) 2.Baterias($2.000) 3.Cartucho($3.500)"));  
        if(repuesto===1){
            total(500);
            continuar();
        }
        else if(repuesto===2){
            total(2000);
            continuar();
        }
        else if(repuesto===3){
            total(3500);
            continuar();
        }
        else{
            alert("El producto seleccionado es inválido")
        }
    }
    else{
        alert("Selecciona una opción válida")
        producto = parseInt(prompt(nombre+" ,selecciona el producto a comprar: 1.Vaporizadores - 2.Liquidos - 3.Respuestos"));
    }
}

let envio = parseInt(prompt(nombre+" ¿A qué país envíaremos tu compra? 1.Argentina - 2.Chile - 3.Uruguay - 4.Otro"));
if(envio===1){
    total(800);
}
else if(envio===2){
    total(1200);
}
else if(envio===3){
    total(1500);
}
else{
    total(2000)
}
alert(nombre+" ,el precio final, con envío incluído, es $"+precioFinal+". Te redigiremos a la página de pago.")