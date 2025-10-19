// Cargar datos desde el JSON
async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        return [];
    }
}

// Cargar contenido destacado en Novedades
async function loadFeaturedContent() {
    const data = await loadData();
    const featured = data.find(item => item.title === "Parasite");
    
    if (featured) {
        document.getElementById('featured-poster').src = featured.poster;
        document.getElementById('featured-title').textContent = featured.title;
        document.getElementById('featured-description').textContent = featured.description;
    }
}

// Cargar películas en Tendencias
async function loadTendencias() {
    const data = await loadData();
    const movies = data.filter(item => item.movie).slice(0, 8);
    const grid = document.getElementById('tendencias-grid');
    
    movies.forEach(movie => {
        const card = createCard(movie);
        grid.appendChild(card);
    });
}

// Cargar series
async function loadSeries() {
    const data = await loadData();
    const series = data.filter(item => !item.movie);
    const grid = document.getElementById('series-grid');
    
    series.forEach(serie => {
        const card = createCard(serie);
        grid.appendChild(card);
    });
}

// Crear tarjeta de película/serie
function createCard(item) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <img src="${item.poster}" alt="${item.title}">
        <div class="card-info">
            <h4>${item.title}</h4>
            <p>${item.description}</p>
            <div class="card-meta">
                <span>${item.year}</span>
                <span>${item.duration} min</span>
            </div>
        </div>
    `;
    return card;
}

// Toggle menú móvil
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}

// Manejar envío de formulario
function handleSubmit(e) {
    e.preventDefault();
    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
    e.target.reset();
}

// Scroll suave para los enlaces
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
            
            // Cerrar menú móvil después de hacer clic
            if (window.innerWidth <= 768) {
                document.getElementById('menu').classList.remove('active');
            }
        });
    });

    // Cargar todo el contenido
    loadFeaturedContent();
    loadTendencias();
    loadSeries();
});