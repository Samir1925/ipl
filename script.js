const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');
const player = document.getElementById('player');
const audio = document.getElementById('audio');
const songImg = document.getElementById('songImg');
const songTitle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');

// Auto load popular search
window.addEventListener('DOMContentLoaded', () => {
  searchSongs("arijit");
});

searchInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    const query = searchInput.value.trim();
    if (query !== '') {
      searchSongs(query);
    }
  }
});

async function searchSongs(query) {
  resultsDiv.innerHTML = `<p>Loading...</p>`;
  try {
    const res = await fetch(`https://jiosaavn-api-privatecvc2.vercel.app/search/songs?query=${encodeURIComponent(query)}`);
    const data = await res.json();

    const songs = data.data?.songs || [];

    if (songs.length === 0) {
      resultsDiv.innerHTML = `<p>No songs found.</p>`;
      return;
    }

    renderSongs(songs);
  } catch (err) {
    resultsDiv.innerHTML = `<p>Error loading songs.</p>`;
    console.error(err);
  }
}

function renderSongs(songs) {
  resultsDiv.innerHTML = '';
  songs.forEach(song => {
    const div = document.createElement('div');
    div.className = 'song';
    div.innerHTML = `
      <img src="${song.image[2].link}" alt="${song.name}" />
      <div class="song-title">${song.name}</div>
      <div class="song-artist">${song.primaryArtists}</div>
    `;
    div.addEventListener('click', () => playSong(song));
    resultsDiv.appendChild(div);
  });
}

function playSong(song) {
  audio.src = song.downloadUrl[4].link; // use 160kbps MP3
  songImg.src = song.image[2].link;
  songTitle.textContent = song.name;
  songArtist.textContent = song.primaryArtists;
  player.style.display = 'flex';
  audio.play();
}
