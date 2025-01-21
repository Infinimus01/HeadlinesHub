const API_KEY = 't9jr36Vd7OniZixpFj_ntvssImDt3OafwakmANu4wCHbAKT5'; // Your Currents API key

async function fetchNews() {
    const language = document.getElementById('locationInput').value.trim().toLowerCase();
    const newsContainer = document.getElementById('newsContainer');
    const errorMessage = document.getElementById('errorMessage');

    // Clear previous results
    newsContainer.innerHTML = '';
    errorMessage.textContent = '';

    if (!language) {
        errorMessage.textContent = 'Please enter a language code (e.g., en, es, fr)';
        return;
    }

    try {
        const url = `https://api.currentsapi.services/v1/latest-news?language=${language}&apiKey=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) throw new Error('News fetch failed');

        const data = await response.json();

        if (!data.news || data.news.length === 0) {
            errorMessage.textContent = 'No news found for this language. Try another code.';
            return;
        }

        newsContainer.innerHTML = data.news.map(article => `
                    <div class="news-card">
                        ${article.image ? `<img src="${article.image}" class="news-image" alt="News image">` : ''}
                        <h3 class="news-title">${article.title}</h3>
                        <p class="news-description">${article.description || ''}</p>
                        <a href="${article.url}" class="news-link" target="_blank">Read more →</a>
                    </div>
                `).join('');

    } catch (error) {
        errorMessage.textContent = 'Failed to fetch news. Please try again later.';
        console.error('Error:', error);
    }
}

// Allow Enter key to trigger search
document.getElementById('locationInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fetchNews();
});
