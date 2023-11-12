
// Permite guardaro los productos en temporal local 
function guardarProductosLocal(llave, valor_a_guardar) {
    localStorage.setItem(llave, JSON.stringify(valor_a_guardar))
}

// Permite revurpeara la informacion que esta en memoria local
function obtenerProductosLocal(llave) {
    const datos = JSON.parse(localStorage.getItem(llave))
    return datos
}

let productos = obtenerProductosLocal('productos') || [];
let contenedor = document.getElementById('contenedor')

window.addEventListener('load', ()=>{
    for (let i = 0; i < productos.length; i++){
		// innerHTML permite crear elemetos HTML desde el backend javascrip all frond 
        contenedor.innerHTML +=`<div><img src="${productos[i].urlImagen}" alt="producto 1"><div class="informacion"><p>${productos[i].nombre}</p><p class="precio">$${productos[i].valor}</p><button>Comprar</button></div></div>` 
    }
})


// Con el metodo querySelector obtenermo los atributos del componente
const header = document.querySelector("#header");
const body = document.querySelector("body");

window.addEventListener("scroll", function(){
    if(contenedor.getBoundingClientRect().top<10){
        header.classList.add("scroll")
    }
    else{
        header.classList.remove("scroll")
    }
})