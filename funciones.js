var nombre, dni, edad, telefono, email

/**
 * valida lo ingresado por el usuario en el formulario, si alguno de los campos contiene
 * un formato erróneo elimina su contenido
 * @returns {boolean} true si no hay errores en lo ingresado, sino false
 */
let validar_campos = () => {
    let error = false

    // TODO: ver si se puede usar esto, o como hacerlo mejor
    // TODO: ¿hay alguna función para recortar los espacios iniciales/finales?
    if (!/^(\w+\s)+\w+$/.test(nombre.value)) { // no me toma los acentos
        alert("Debés ingresar nombre y apellido, solo pueden contener letras")
        nombre.value = ""
        error = true
    }
    if (!/^\d+$/.test(dni.value)) {
        alert("El DNI solo puede contener números")
        dni.value = ""
        error = true
    }
    if (!/^\d+$/.test(edad.value)) {
        alert("En edad solo debe haber números")
        edad.value = ""
        error = true
    }
    if (!/^\d+$/.test(telefono.value)) {
        alert("En teléfono solo debe haber números")
        telefono.value = ""
        error = true
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
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

    if (!validar_campos()) {
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

    // TODO: ¿baja puntos por tener líneas demasiado largas?
    document.getElementById("agradecimiento").children.item(0).textContent = `¡Muchas gracias por tu mensaje ${nom}!`
    document.getElementById("agradecimiento").children.item(1).textContent = `Pronto recibirás una respuesta a  ${em}!`
}
