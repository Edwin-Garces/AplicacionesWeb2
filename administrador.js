
// Edwin Ricardo Garcés 
// Desarrollo de Aplicciones Web 
// Tares de Carrito de compras con HTML, Javascript y CSS

// Funcion que me permite guardar los datos de manera temporal 
function guardarProductosLocal(llave, valor_a_guardar) {
    localStorage.setItem(llave, JSON.stringify(valor_a_guardar))
}

// Funcion que me permite obtene los recuros 
function obtenerProductosLocal(llave){
    const datos = JSON.parse(localStorage.getItem(llave))
    return datos
}
 
let productos = obtenerProductosLocal('productos') || [];
let mensaje = document.getElementById('mensaje')

const anadirProducto = document.getElementById('productoAñadir')
const anadirValor = document.getElementById('valorAñadir')
const anadirExistencia = document.getElementById('existenciaAñadir')
const anadirImagen = document.getElementById('imagenAñadir')


// Guardar los productos validando si existe o no el registro 
document.getElementById("botonAñadir").addEventListener("click", function(even){
    
    even.preventDefault()
    
    let vProducto =anadirProducto.value
    let vValor = anadirValor.value
    let vExistencia = anadirExistencia.value
    let vImagen = anadirImagen.value
    let bandera = true

    if(vProducto == '' || vValor == '' || vExistencia == '' || vImagen == '' ){
        
        mensaje.classList.add('llenarCampo')
        setTimeout(() => {mensaje.classList.remove('llenarCampo')}, 2500)
        bandera = false
    }
    else{
        for (let i =0; i < productos.length; i++){
            if (productos[i].nombre == vProducto){
               //alert("repetido")        
               mensaje.classList.add('repetidoError') 
               setTimeout(() => {mensaje.classList.remove('repetidoError')}, 2500)
               bandera = false
            }  
        }
    }

    if (bandera== true){
        //alert("Ingresando")
        productos.push ({
            nombre: vProducto,
            valor: vValor,
            existencia: vExistencia,
            urlImagen: vImagen
        })
        mensaje.classList.add('realizado')
        setTimeout(() => {
               mensaje.classList.remove('realizado') 
               window.location.reload()
        } ,1500)
    }
    guardarProductosLocal('productos', productos);

})



//Editar Producto dependiedo de la categoria seleccionada
const productoEd = document.getElementById('productoEditar')
const atributoEd = document.getElementById('atributoEditar')
const nuevoAtributoEd = document.getElementById('nuevoAtributo')

document.getElementById("botonEditar").addEventListener("click",function(even){
    even.preventDefault()
    let productoEditar = productoEd.value
    let atributoEditar = atributoEd.value
    let nuevoAtributo = nuevoAtributoEd.value
    let bandera = false
    
    if(productoEditar == '' || atributoEditar == '' || nuevoAtributo == ''){
        mensaje.classList.add('llenarCampo')
        setTimeout(() => {mensaje.classList.remove('llenarCampo')}, 2500)
        bandera = false
    }
    else{
        for (let i =0; i < productos.length; i++){
            if (productos[i].nombre == productoEditar){
                productos[i][atributoEditar] = nuevoAtributo
                bandera = true
            }  
        }
        if (bandera== true){
            mensaje.classList.add('realizado')
            setTimeout(() => {
               mensaje.classList.remove('realizado') 
               window.location.reload()
            } ,1500)
        }
        else {
            mensaje.classList.add('noExisteError')
            setTimeout(() => {mensaje.classList.remove('noExisteError')} ,1500)
        }
        guardarProductosLocal('productos', productos);
    }
})


// Eliminar Productos 
const productoEli = document.getElementById('productoEliminar')

document.getElementById("botonEiminar").addEventListener("click", function(even){
    even.preventDefault()
    let productoEliminar = productoEli.value
    let bandera = false

    for (let i=0; i < productos.length; i++){
        if (productos[i].nombre == productoEliminar){
            productos.splice(i,1)
            bandera= true
        }
    }

    if (bandera == false){
        mensaje.classList.add('noExisteError')
        setTimeout(() => {mensaje.classList.remove('noExisteError')} ,1500)
    }
    else {
        mensaje.classList.add('realizado')
        setTimeout(() => {
           mensaje.classList.remove('realizado') 
           window.location.reload()
        } ,1500)
    }
    guardarProductosLocal('productos', productos);

})


// Mostrar los productos de manera dinamico con la propiedad innerHTML
window.addEventListener("load", () =>  {
    const productoEd = document.getElementById('productoEditar')
    const productoEl = document.getElementById('productoEliminar')

    for (let i=0; i < productos.length; i++){
        productoEd.innerHTML += `<option>${productos[i].nombre}</option>`
        productoEl.innerHTML +=  `<option>${productos[i].nombre}</option>`          
    }

    Object.keys(productos[0]).forEach(element => {
        atributoEd.innerHTML +=  `<option>${element}</option>`
    });

    let mostrarProductos = document.getElementById('mostrarProductos')
    mostrarProductos.innerHTML= ''
    for (let i=0; i < productos.length; i++){
         
        mostrarProductos.innerHTML += `<div class="contenedorProductos"><img src="${productos[i].urlImagen}"></img><div class="informacion"><p>${productos[i].nombre}</p><p class='precio'><span>Precio: ${productos[i].valor}</span></p>Existencia: ${productos[i].existencia}<p></p></div></div>`
    }
})




