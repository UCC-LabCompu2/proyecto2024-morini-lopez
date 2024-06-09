var nombre, dni, edad, telefono, email
var pesoX = 30; // Posición inicial en X para la gráfica de peso
var cinturaX = 30;  // Posición inicial en X para la gráfica de cintura
var caderasX = 30;   // Posición inicial en X para la gráfica de caderas
var espacioX = 30; // Espacio entre puntos

/**
 * valida lo ingresado por el usuario en el formulario, si alguno de los campos contiene
 * un formato erróneo elimina su contenido
 * @returns {boolean} true si no hay errores en lo ingresado, sino false
 */
let validar_campos_mas_info = () => {
    let error = false

    // Revisa que contenga al menos dos palabras
    if (!/^(\w+\s)+\w+$/.test(nombre.value) || nombre.value.length == 0) {
        alert("Debés ingresar nombre y apellido, solo pueden contener letras")
        nombre.value = ""
        error = true
    }
    if (isNaN(dni.value) || dni.value.length == 0) {
        alert("El DNI solo puede contener números")
        dni.value = ""
        error = true
    }
    if (isNaN(edad.value) || edad.value.length == 0) {
        alert("En edad solo debe haber números")
        edad.value = ""
        error = true
    }
    if (isNaN(telefono.value) || telefono.value.length == 0) {
        alert("En teléfono solo debe haber números")
        telefono.value = ""
        error = true
    }
    // Revisa que contanga al menos un asterisco y un punto
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) || email.value.length == 0) {
        alert("El email no debe contener espacios, y debe tener @ y .")
        email.value = ""
        error = true
    }

    return error
}

/**
 * envía los datos que ingresó el usuario si no se encuentran errores
 */
let enviar_formulario = () => {
    let form_elements = document.getElementById("formulario").elements
    nombre = form_elements.nombre
    dni = form_elements.dni
    edad = form_elements.edad
    telefono = form_elements.telefono
    email = form_elements.email

    if (!validar_campos_mas_info()) {
        localStorage.setItem("nombre", nombre.value)
        localStorage.setItem("email", email.value)

        window.open("mensaje.html")
    }
}

/**
 * carga los datos que ingresó el usuario para mostrar el mensaje
 */
let cargar_datos = () => {
    nom = localStorage.getItem("nombre")
    em = localStorage.getItem("email")

    document.getElementById("agradecimiento").children.item(0).textContent = `¡Muchas gracias por tu mensaje ${nom}!`
    document.getElementById("agradecimiento").children.item(1).textContent = `Pronto recibirás una respuesta a  ${em}!`
}

/**
 *
 */
let aniadirDatos = () => {
    let fecha = document.getElementById('fecha').value;
    let peso = parseFloat(document.getElementById('peso').value);
    let cintura = parseFloat(document.getElementById('cintura').value);
    let caderas = parseFloat(document.getElementById('caderas').value);

    if (fecha && peso > 0 && cintura > 0 && caderas > 0) {
        // Verificar si la fecha ya ha sido ingresada usando un atributo data
        if (localStorage.getItem(fecha)) {
            alert('La fecha ya ha sido ingresada. Por favor, seleccione una fecha diferente.');
        } else {
            // Marcar esta fecha como usada estableciendo un atributo data
            localStorage.setItem(fecha, true)

            // Dibujar puntos y líneas
            dibujarImagen('graficaPeso', peso, 'blue', pesoX);
            dibujarImagen('graficaCintura', cintura, 'red', cinturaX);
            dibujarImagen('graficaCaderas', caderas, 'green', caderasX);

            // Incrementar las posiciones en X
            pesoX += espacioX;
            cinturaX += espacioX;
            caderasX += espacioX;
        }
    } else {
        alert('Por favor, ingrese valores válidos.');
    }
}

let validar_campos_progreso = () => {

}

/**
 * Dibuja las gráficas de progreso
 * @param idGrafica
 * @param valor
 * @param color
 * @param posicionX
 */
let dibujarImagen = (idGrafica, valor, color, posicionX) => {
    let canvas = document.getElementById(idGrafica);
    let ctx = canvas.getContext('2d');
    let alturaMax = canvas.height;
    let y = alturaMax - (valor * alturaMax / 100);

    // Dibujar el punto
    ctx.beginPath();
    ctx.arc(posicionX, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();

    // Dibujar la etiqueta del valor encima del punto
    ctx.font = "12px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(valor, posicionX, y - 10);

    // Obtener las coordenadas del último punto almacenadas en el elemento canvas
    let ultimaX = parseFloat(canvas.getAttribute('data-ultima-x'));
    let ultimaY = parseFloat(canvas.getAttribute('data-ultima-y'));

    // Si hay puntos anteriores, dibujar una línea conectando al último punto
    if (!isNaN(ultimaX) && !isNaN(ultimaY)) {
        ctx.beginPath();
        ctx.moveTo(ultimaX, ultimaY);
        ctx.lineTo(posicionX, y);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Actualizar el elemento canvas con las nuevas coordenadas del último punto
    canvas.setAttribute('data-ultima-x', posicionX);
    canvas.setAttribute('data-ultima-y', y);
}
