// Menú hamburguesa para móviles
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-list a');

// Toggle del menú
menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
    
    // Animación del icono hamburguesa a X
    const spans = menuToggle.querySelectorAll('span');
    if (navList.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navList.contains(e.target)) {
        navList.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Cambiar estilo del header al hacer scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(0, 26, 51, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = 'var(--dark-bg)';
        header.style.backdropFilter = 'none';
    }
});

// Validación del formulario de contacto
const contactForm = document.getElementById('contactForm');

// Función para validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Función para validar nombre (solo letras y espacios)
function validarNombre(nombre) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(nombre) && nombre.trim().length >= 3;
}

// Función para mostrar error
function mostrarError(input, mensaje) {
    // Remover error previo si existe
    const errorExistente = input.parentElement.querySelector('.error-message');
    if (errorExistente) {
        errorExistente.remove();
    }
    
    // Crear nuevo mensaje de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = mensaje;
    errorDiv.style.color = '#ff4444';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.style.display = 'block';
    
    // Agregar borde rojo al input
    input.style.borderColor = '#ff4444';
    
    // Insertar mensaje después del input
    input.parentElement.appendChild(errorDiv);
}

// Función para limpiar error
function limpiarError(input) {
    const errorExistente = input.parentElement.querySelector('.error-message');
    if (errorExistente) {
        errorExistente.remove();
    }
    input.style.borderColor = 'rgba(0, 212, 255, 0.2)';
}

// Validación en tiempo real
const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const mensajeInput = document.getElementById('mensaje');

nombreInput.addEventListener('blur', () => {
    const valor = nombreInput.value.trim();
    if (valor === '') {
        mostrarError(nombreInput, 'El nombre es obligatorio');
    } else if (!validarNombre(valor)) {
        mostrarError(nombreInput, 'El nombre debe contener solo letras (mínimo 3 caracteres)');
    } else {
        limpiarError(nombreInput);
    }
});

emailInput.addEventListener('blur', () => {
    const valor = emailInput.value.trim();
    if (valor === '') {
        mostrarError(emailInput, 'El email es obligatorio');
    } else if (!validarEmail(valor)) {
        mostrarError(emailInput, 'Por favor ingresa un email válido');
    } else {
        limpiarError(emailInput);
    }
});

mensajeInput.addEventListener('blur', () => {
    const valor = mensajeInput.value.trim();
    if (valor === '') {
        mostrarError(mensajeInput, 'El mensaje es obligatorio');
    } else if (valor.length < 10) {
        mostrarError(mensajeInput, 'El mensaje debe tener al menos 10 caracteres');
    } else {
        limpiarError(mensajeInput);
    }
});

// Limpiar errores al escribir
nombreInput.addEventListener('input', () => limpiarError(nombreInput));
emailInput.addEventListener('input', () => limpiarError(emailInput));
mensajeInput.addEventListener('input', () => limpiarError(mensajeInput));

// Envío del formulario
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obtener valores
    const nombre = nombreInput.value.trim();
    const email = emailInput.value.trim();
    const empresa = document.getElementById('empresa').value.trim();
    const servicio = document.getElementById('servicio').value;
    const mensaje = mensajeInput.value.trim();
    
    // Validaciones
    let esValido = true;
    
    // Validar nombre
    if (nombre === '') {
        mostrarError(nombreInput, 'El nombre es obligatorio');
        esValido = false;
    } else if (!validarNombre(nombre)) {
        mostrarError(nombreInput, 'El nombre debe contener solo letras (mínimo 3 caracteres)');
        esValido = false;
    }
    
    // Validar email
    if (email === '') {
        mostrarError(emailInput, 'El email es obligatorio');
        esValido = false;
    } else if (!validarEmail(email)) {
        mostrarError(emailInput, 'Por favor ingresa un email válido');
        esValido = false;
    }
    
    // Validar mensaje
    if (mensaje === '') {
        mostrarError(mensajeInput, 'El mensaje es obligatorio');
        esValido = false;
    } else if (mensaje.length < 10) {
        mostrarError(mensajeInput, 'El mensaje debe tener al menos 10 caracteres');
        esValido = false;
    }
    
    // Si todo es válido, mostrar mensaje de éxito
    if (esValido) {
        // Crear modal de éxito
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: var(--dark-bg);
            padding: 3rem;
            border-radius: 10px;
            text-align: center;
            max-width: 500px;
            border: 2px solid var(--primary-color);
            animation: slideIn 0.3s ease;
        `;
        
        modalContent.innerHTML = `
            <svg width="80" height="80" viewBox="0 0 80 80" style="margin-bottom: 1rem;">
                <circle cx="40" cy="40" r="35" fill="none" stroke="#00d4ff" stroke-width="3"/>
                <path d="M25 40 L35 50 L55 30" stroke="#00d4ff" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h2 style="color: var(--primary-color); margin-bottom: 1rem;">¡Mensaje Enviado!</h2>
            <p style="color: var(--text-gray); margin-bottom: 1.5rem;">
                Gracias por contactarnos, <strong style="color: var(--text-light);">${nombre}</strong>. 
                Hemos recibido tu solicitud sobre <strong style="color: var(--text-light);">${servicio || 'nuestros servicios'}</strong>.
            </p>
            <p style="color: var(--text-gray); margin-bottom: 2rem;">
                Nos pondremos en contacto contigo en las próximas 24 horas a <strong style="color: var(--text-light);">${email}</strong>.
            </p>
            <button id="cerrarModal" style="
                padding: 0.75rem 2rem;
                background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
                color: var(--dark-bg);
                border: none;
                border-radius: 5px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
            ">Cerrar</button>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Añadir animaciones
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        // Cerrar modal
        const cerrarBtn = document.getElementById('cerrarModal');
        cerrarBtn.addEventListener('click', () => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                modal.remove();
                style.remove();
            }, 300);
        });
        
        // También cerrar al hacer clic fuera
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    modal.remove();
                    style.remove();
                }, 300);
            }
        });
        
        // Agregar animación de fadeOut
        style.textContent += `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        
        // Limpiar formulario
        contactForm.reset();
    } else {
        // Hacer scroll al primer error
        const primerError = document.querySelector('.error-message');
        if (primerError) {
            primerError.parentElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    }
});

// Animación de entrada para los elementos al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a los productos
document.querySelectorAll('.producto').forEach((producto, index) => {
    producto.style.opacity = '0';
    producto.style.transform = 'translateY(30px)';
    producto.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(producto);
});

// Aplicar animación a los miembros del equipo
document.querySelectorAll('.team-member').forEach((member, index) => {
    member.style.opacity = '0';
    member.style.transform = 'translateY(30px)';
    member.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(member);
});

// Contador de caracteres para el textarea
mensajeInput.addEventListener('input', () => {
    const contador = mensajeInput.parentElement.querySelector('.char-counter');
    const length = mensajeInput.value.length;
    
    if (!contador) {
        const counterDiv = document.createElement('div');
        counterDiv.className = 'char-counter';
        counterDiv.style.cssText = `
            font-size: 0.85rem;
            color: var(--text-gray);
            text-align: right;
            margin-top: 0.25rem;
        `;
        mensajeInput.parentElement.appendChild(counterDiv);
    }
    
    const counterElement = mensajeInput.parentElement.querySelector('.char-counter');
    counterElement.textContent = `${length} caracteres`;
    
    if (length < 10) {
        counterElement.style.color = '#ff4444';
    } else {
        counterElement.style.color = 'var(--primary-color)';
    }
});

console.log('✅ SecureShield Consulting - Sistema cargado correctamente');
console.log('🔒 Protegiendo tu futuro digital');