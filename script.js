// Guardar todos los datos cargados
let allData = [];

// Cargar datos desde el JSON
async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        allData = data;
        return data;
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        return [];
    }
}


function loadFeaturedContent() {
    const randomIndex= Math.floor(Math.random()*allData.length)
    const featured = allData[randomIndex];
    if (featured) {
        document.getElementById('featured-poster').src = featured.poster;
        document.getElementById('featured-title').textContent = featured.title;
        document.getElementById('featured-description').textContent = featured.description;
        const trailerBtn= document.getElementById('trailer-novedades');
        trailerBtn.onclick=()=>window.open(featured.trailer,'_blank')
            }
}


function renderTendencias(movies) {
    const grid = document.getElementById('tendencias-grid');
    grid.innerHTML = '';

    movies.slice(0, 3).forEach((movie, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">
            <div class="card-info">
                <h4>#${index + 1} - ${movie.title}</h4>
                <p>${movie.description}</p>
                <div class="card-meta">
                    <span>${movie.year}</span>
                    <span>${movie.duration} min</span>
                </div>
                <button onclick="window.open('${movie.trailer}', '_blank')" class="submit-btn" style="margin-top: 1rem;">Ver Trailer</button>
            </div>
        `;

        grid.appendChild(card);
    });
}


function renderSeries(series) {
    const grid = document.getElementById('series-grid');
    grid.innerHTML = '';

    series.forEach(serie => {
        const card = createCard(serie);
        grid.appendChild(card);
    });
}

function filterAndRender(searchTerm = "") {
    const term = searchTerm.toLowerCase();

    const filteredMovies = allData.filter(item => item.movie && item.title.toLowerCase().includes(term));
    const filteredSeries = allData.filter(item => !item.movie && item.title.toLowerCase().includes(term));

    renderTendencias(filteredMovies);
    renderSeries(filteredSeries);
}

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
            <button onclick="window.open('${item.trailer}', '_blank')" class="submit-btn" style="margin-top: 1rem;">Ver Trailer</button>
        </div>
    `;
    return card;
}

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}


function handleSubmit(e) {
    e.preventDefault();
    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
    e.target.reset();
}


document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    loadFeaturedContent();
    filterAndRender(); 

   
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterAndRender(e.target.value);
        });
    }

   
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });

            if (window.innerWidth <= 768) {
                document.getElementById('menu').classList.remove('active');
            }
        });
    });
});
