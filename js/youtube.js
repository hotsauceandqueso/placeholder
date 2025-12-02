const API_KEY = 'AIzaSyBMOMNiDI-ASbl61gv-fecfxETRTjOznxo';
const MAX_RESULTS = 30; // now 30 results

async function searchVideos() {
    const query = document.getElementById('search').value.trim();
    if (!query) return;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<p style="text-align:center; grid-column: span 5;">Searching...</p>';

    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${MAX_RESULTS}&q=${encodeURIComponent(query)}&key=${API_KEY}`
        );
        const data = await response.json();

        resultsDiv.innerHTML = '';
        if (data.items && data.items.length > 0) {
            data.items.forEach(item => {
                const videoId = item.id.videoId;
                const title = item.snippet.title;
                const thumbnail = item.snippet.thumbnails.medium.url;

                const card = document.createElement('div');
                card.className = 'video-card';
                card.innerHTML = `
                    <img src="${thumbnail}" alt="${title}">
                    <p>${title}</p>
                `;
                card.onclick = () => playVideo(videoId);
                resultsDiv.appendChild(card);
            });
        } else {
            resultsDiv.innerHTML = '<p style="text-align:center; grid-column: span 5;">No results found.</p>';
        }
    } catch (err) {
        resultsDiv.innerHTML = '<p style="text-align:center; grid-column: span 5;">Error fetching videos. Try again later.</p>';
        console.error(err);
    }
}

function playVideo(videoId) {
    const player = document.getElementById('player');
    player.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById('search').addEventListener('keydown', function(e) {
    if(e.key === 'Enter') searchVideos();
});
