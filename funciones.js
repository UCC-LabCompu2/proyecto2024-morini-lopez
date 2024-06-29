var pesoX = 30;
var cinturaX = 30;
var caderasX = 30;
var espacioX = 30;
var pesoAnterior = null;

/**
 * valída lo ingresado por el usuario en el formulario, si alguno de los campos contiene
 * un formato erróneo elimina su contenido
 * @method validar_campos_mas_info
 * @returns {boolean} true si no hay errores en lo ingresado, sino false
 */
let validar_campos_mas_info = () => {
    let error = false;
    const form_elements = document.getElementById("formulario").elements;
    let nombre = form_elements.nombre;
    let dni = form_elements.dni;
    let edad = form_elements.edad;
    let telefono = form_elements.telefono;
    let email = form_elements.email;

    // Revisa que contenga al menos dos palabras
    if (!/^(\w+\s)+\w+$/.test(nombre.value) || nombre.value.length == 0) {
        alert("Debés ingresar nombre y apellido, solo pueden contener letras");
        nombre.value = "";
        error = true;
    }
    if (isNaN(dni.value) || dni.value.length == 0) {
        alert("El DNI solo puede contener números");
        dni.value = "";
        error = true;
    }
    if (isNaN(edad.value) || edad.value.length == 0) {
        alert("En edad solo debe haber números");
        edad.value = "";
        error = true;
    }
    if (isNaN(telefono.value) || telefono.value.length == 0) {
        alert("En teléfono solo debe haber números");
        telefono.value = "";
        error = true;
    }
    // Revisa que contanga al menos un asterisco y un punto
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) || email.value.length == 0) {
        alert("El email no debe contener espacios, y debe tener @ y .");
        email.value = "";
        error = true;
    }

    return error
}

/**
 * envía los datos que ingresó el usuario si no se encuentran errores
 * @method enviar_formulario
 */
let enviar_formulario = () => {
    const form_elements = document.getElementById("formulario").elements;
    const nombre = form_elements.nombre;
    const email = form_elements.email;

    if (!validar_campos_mas_info()) {
        localStorage.setItem("nombre", nombre.value);
        localStorage.setItem("email", email.value);

        window.open("mensaje.html");
    }
}

/**
 * carga los datos que ingresó el usuario para mostrar el mensaje
 * @method cargar_datos
 */
let cargar_datos = () => {
    const nom = localStorage.getItem("nombre");
    const em = localStorage.getItem("email");

    document.getElementById("agradecimiento").children.item(0).textContent = `¡Muchas gracias por tu mensaje ${nom}!`;
    document.getElementById("agradecimiento").children.item(1).textContent = `Pronto recibirás una respuesta en ${em}!`;
}

/**
 * grafica los datos indicados por el usuario en el formulario de progreso
 * @method aniadirDatos
 */
let aniadirDatos = () => {
    if (validar_campos_progreso()) {
        return;
    }
    
    const fecha = document.getElementById('fecha').value;
    const peso = parseFloat(document.getElementById('peso').value);
    const cintura = parseFloat(document.getElementById('cintura').value);
    const caderas = parseFloat(document.getElementById('caderas').value);
        
    localStorage.setItem(fecha, true);

    dibujarImagen('graficaPeso', peso, 'blue', pesoX);
    dibujarImagen('graficaCintura', cintura, 'red', cinturaX);
    dibujarImagen('graficaCaderas', caderas, 'green', caderasX);

    pesoX += espacioX;
    cinturaX += espacioX;
    caderasX += espacioX;

    calcularDiferenciaPeso(peso);
}

/**
 * indica al usuario si hubo un error en los valores ingresados
 * elimina el contenido de los campos con valores incorrectos
 * @method validar_campos_progreso
 * @returns {boolean} - true si los campos son correctos, false si hubo algún error
 */
let validar_campos_progreso = () => {
    let error = false;
    let fecha = document.getElementById('fecha').value;
    let peso = document.getElementById('peso').value;
    let cintura = document.getElementById('cintura').value;
    let caderas = document.getElementById('caderas').value;

    if (!fecha) {
        alert('Ingrese una fecha');
        fecha = "";
        error = true;
    }
    if (localStorage.getItem(fecha)) {
        alert('La fecha ya ha sido ingresada. Por favor, seleccione una fecha diferente');
        fecha = "";
        error = true;
    }
    if (!(parseFloat(peso) > 0 && parseFloat(peso) < 150)) {
        alert('El valor de peso solo puede ser entre 0 y 150');
        peso = "";
        error = true;
    }
    if (!(parseFloat(cintura) > 0 && parseFloat(cintura) < 150)) {
        alert('El valor de cintura solo puede ser entre 0 y 150');
        cintura = "";
        error = true;
    }
    if (!(parseFloat(caderas) > 0 && parseFloat(caderas) < 150)) {
        alert('El valor de cadera solo puede ser entre 0 y 150');
        caderas = "";
        error = true;
    }

    return error;
}

/**
 * dibuja las gráficas de progreso
 * @method dibujarImagen
 * @param {string} idGrafica - ID del canvas
 * @param {number} valor - valor a graficar
 * @param {string} color - color del trazo
 * @param {number} posicionX - desplazamiento en X
 */
let dibujarImagen = (idGrafica, valor, color, posicionX) => {
    let canvas = document.getElementById(idGrafica);
    let ctx = canvas.getContext('2d');
    let alturaMax = canvas.height;
    let y = alturaMax - (valor * alturaMax/ 150);

    ctx.beginPath();
    ctx.arc(posicionX, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();

    ctx.font = "12px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(valor, posicionX, y - 10);

    let ultimaX = parseFloat(canvas.getAttribute('data-ultima-x'));
    let ultimaY = parseFloat(canvas.getAttribute('data-ultima-y'));

    if (!isNaN(ultimaX) && !isNaN(ultimaY)) {
        ctx.beginPath();
        ctx.moveTo(ultimaX, ultimaY);
        ctx.lineTo(posicionX, y);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    canvas.setAttribute('data-ultima-x', posicionX);
    canvas.setAttribute('data-ultima-y', y);
}

/**
 * calcula la diferencia de peso que hay con un valor anterior
 * @method calcularDiferenciaPeso
 * @param {number} pesoActual - el peso de la persona
 */
let calcularDiferenciaPeso = (pesoActual) => {
    if (isNaN(pesoActual)) {
        alert("Por favor, ingresa un peso válido.");
        return;
    }

    if (pesoAnterior !== null) {
        const diferencia = pesoActual - pesoAnterior;
        if (diferencia > 0) {
            alert("Has ganado " + diferencia + " kg.");
        } else if (diferencia < 0) {
            alert("Has perdido " + (-diferencia) + " kg.");
        } else {
            alert("Tu peso se ha mantenido igual.");
        }
    } else {
        alert("No hay un peso anterior registrado.");
    }
    pesoAnterior = pesoActual;
}
