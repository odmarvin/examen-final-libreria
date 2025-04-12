const readline = require('readline-sync')
require('colors')
let catalogo = [{ titulo: "Cien años de soledad", autor: "Gabriel García Márquez", precio: 25.99, publicacion: 1967 },
{ titulo: "1984", autor: "George Orwell", precio: 19.50, publicacion: 1949 },
{ titulo: "El Principito", autor: "Antoine de Saint-Exupéry", precio: 12.95, publicacion: 1943 },
{ titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", precio: 30.00, publicacion: 1605 },
{ titulo: "Orgullo y prejuicio", autor: "Jane Austen", precio: 15.80, publicacion: 1813 },
{ titulo: "Crónica de una muerte anunciada", autor: "Gabriel García Márquez", precio: 18.75, publicacion: 1981 },
{ titulo: "El señor de los anillos", autor: "J.R.R. Tolkien", precio: 35.25, publicacion: 1954 },
{ titulo: "Harry Potter y la piedra filosofal", autor: "J.K. Rowling", precio: 22.40, publicacion: 1997 },
{ titulo: "Rayuela", autor: "Julio Cortázar", precio: 20.60, publicacion: 1963 },
{ titulo: "La sombra del viento", autor: "Carlos Ruiz Zafón", precio: 24.99, publicacion: 2001 }]

function agregarLibro() {
    let ingresarLibros = 0
    do {
        const titulo = readline.question('Ingrese el título del libro: ')
        const autor = readline.question('Ingrese el autor del libro: ')
        const precio = readline.questionInt('Ingrese el precio del libro: ')
        if (precio <= 0) {
            console.log('El precio debe ser un número positivo.'.red)
            return
        }
        const añoPublicacion = readline.questionInt('Ingrese el año de publicacion del libro: ')
        if (añoPublicacion <= 0) {
            console.log('El año de publicación debe ser un número válido.'.red)
            return
        }
        const nuevoLibro = {
            titulo: titulo,
            autor: autor,
            precio: precio,
            publicacion: añoPublicacion
        }
        catalogo.push(nuevoLibro)
        ingresarLibros = readline.prompt({
            prompt: `    
            1. Ingresar nuevo Libro
            2. Salir
            `.blue,
        })
    } while (ingresarLibros != 2);
}

function mostrarCatalogo() {
    console.table(catalogo)
    readline.question('Presione Enter para continuar...'.green)
}

function buscarLibro(titulo) {
    const tituloEncontrado = catalogo.find(libro => libro.titulo.toLowerCase() == titulo.toLowerCase())
    if (tituloEncontrado) {
        console.log(`
            Libro Encontrado:
            Título: ${tituloEncontrado.titulo}
            Autor: ${tituloEncontrado.autor}
            Precio: ${tituloEncontrado.precio}
            Año: ${tituloEncontrado.publicacion}
            `)
    } else console.log('Libro no encontrado')
    readline.question('Presione Enter para continuar...'.green)
}

function eliminarLibro(titulo) {
    const catalogoTemporal = catalogo.filter(libro => libro.titulo.toLowerCase() != titulo.toLowerCase())
    if (catalogoTemporal.length != catalogo) {
        catalogo = catalogoTemporal
        console.log('Libro eliminado correctamente')
    }
    else console.log('Libro no encontrado')
}

function verEstadistica() {
    const cantidadLibros = catalogo.length
    const sumaPrecios = catalogo.reduce((suma, libro) => suma + libro.precio, 0)
    const promedioPrecio = sumaPrecios / cantidadLibros
    const libroAntiguo = catalogo.reduce((a, b) => a.publicacion < b.publicacion ? a : b)
    const libroCaro = catalogo.reduce((a, b) => b.precio > a.precio ? b : a)
    console.log(`
    Cantidad total de libros: ${cantidadLibros}
    Precio promedio: ${promedioPrecio}
    Libro más antiguo: ${libroAntiguo.titulo} ${libroAntiguo.publicacion}
    Libro más caro: ${libroCaro.titulo} ${libroCaro.precio}
    `)
    readline.question('Presione Enter para continuar...'.green)
}

function ordenarLibros(orden) {
    let catalogoOrdenado = []
    switch (orden) {
        case 1:
            catalogoOrdenado = catalogo.sort((a, b) => a.precio - b.precio)
            console.log('Catalogo ordenado por precio ascendente')
            catalogo = catalogoOrdenado
            break
        case 2:
            catalogoOrdenado = catalogo.sort((a, b) => b.precio - a.precio)
            console.log('Catalogo ordenado por precio descendente')
            catalogo = catalogoOrdenado
            break
        case 3:
            catalogoOrdenado = catalogo.sort((a, b) => a.publicacion - b.publicacion)
            console.log('Catalogo ordenado por año de publicacion ascendete')
            catalogo = catalogoOrdenado
            break
        default:
            console.log('Opcion invalida')
            break;
    }
    mostrarCatalogo()
}

function editarLibro(titulo) {
    const tituloEncontrado = catalogo.find(libro => libro.titulo.toLowerCase() == titulo.toLowerCase())
    if (tituloEncontrado) {
        console.log(`
            Libro Encontrado:
            Título: ${tituloEncontrado.titulo}
            Autor: ${tituloEncontrado.autor}
            Precio: ${tituloEncontrado.precio}
            Año: ${tituloEncontrado.publicacion}
            `)
        tituloEncontrado.titulo = readline.question('Nuevo titulo: ')
        tituloEncontrado.autor = readline.question('Nuevo autor: ')
        tituloEncontrado.precio = readline.questionInt('Nuevo precio: ')
        if (tituloEncontrado.precio <= 0) {
            console.log('El precio debe ser un número positivo.'.red)
            return
        }
        tituloEncontrado.publicacion = readline.questionInt('Nuevo año: ')
        if (tituloEncontrado.publicacion <= 0) {
            console.log('El año debe ser un número válido.'.red)
            return
        }
    } else console.log('Libro no encontrado')
}

do {
    opcion = parseInt(readline.prompt({
        prompt: `
        1. Agregar libro
        2. Mostrar catálogo
        3. Buscar libro por título
        4. Eliminar libro
        5. Ver estadísticas
        6. Ordenar libros
        7. Editar libro
        8. Salir
        `.blue,
    }))

    switch (opcion) {
        case 1:
            agregarLibro()
            break;
        case 2:
            mostrarCatalogo()
            break;
        case 3:
            const tituloLibro = readline.question('Ingrese el titulo de libro a buscar: ')
            buscarLibro(tituloLibro)
            break;
        case 4:
            const tituloEliminado = readline.question('Ingrese el titulo de libro a eliminar: ')
            eliminarLibro(tituloEliminado)
            break;
        case 5:
            verEstadistica()
            break;
        case 6:
            const ordenLibros = readline.prompt({
                prompt: `
                Permitir ordenar el catálogo por:    
                1. Precio ascendente
                2. Precio descendente
                3. Año de Publicacion
                `.blue,
            })
            ordenarLibros(parseInt(ordenLibros))
            break;
        case 7:
            const tituloEditar = readline.question('Ingrese el titulo de libro que desea editar: ')
            editarLibro(tituloEditar)
            break;
        case 8:
            console.log('-------------HASTA LUEGO------------')
            break;
        default:
            console.log('Opcion invalida')
            break;
    }
} while (opcion != 8);
