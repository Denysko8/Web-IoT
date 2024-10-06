document.addEventListener('DOMContentLoaded', () => {
  const mainContent = document.getElementById('main-content');
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const deleteAllCardsButton = document.getElementById('delete-all-cards');
  const countAllViewsButton = document.getElementById('count_all_views');
  const totalViewsLabel = document.getElementById('total-views-label');
  const sortToggle = document.getElementById('sort-toggle');

  function loadSongsFromLocalStorage(searchQuery = '', sortByDuration = false) {
      let songs = JSON.parse(localStorage.getItem('songs')) || [];
      mainContent.innerHTML = '';

      songs = songs.filter(song =>
          song.name.replace(/\s+/g, '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist.replace(/\s+/g, '').toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (sortByDuration) {
          songs.sort((a, b) => a.duration - b.duration);
      }

      songs.forEach((song, index) => {
          const songCard = createSongCard(song, index);
          mainContent.appendChild(songCard);
      });

      countAllViews(songs);
  }

  function createSongCard(song, index) {
      const songCard = document.createElement('div');
      songCard.classList.add('song-card');
      songCard.setAttribute('data-views', song.views);
      songCard.innerHTML = `
          <h2>${song.name}</h2>
          <p>${song.artist}</p>
          <p>Duration: ${song.duration} seconds</p>
          <p>Views: ${song.views} on YouTube</p>
          <button class="edit-button">Edit</button>
          <button class="delete-button" data-index="${index}">Delete</button>
      `;

      addEventListeners(songCard, song.name, song.artist, song.duration, song.views);
      return songCard;
  }

  function addEventListeners(card, songName, artist, duration, views) {
      card.querySelector('.edit-button').addEventListener('click', () => {
          card.innerHTML = `
              <div class="edit-field">
                  <label for="edit-song-name">Song Name</label>
                  <input type="text" id="edit-song-name" value="${songName}">
              </div>
              <div class="edit-field">
                  <label for="edit-artist">Artist</label>
                  <input type="text" id="edit-artist" value="${artist}">
              </div>
              <div class="edit-field">
                  <label for="edit-duration">Duration (in seconds)</label>
                  <input type="number" id="edit-duration" value="${duration}" min="1">
              </div>
              <div class="edit-field">
                  <label for="edit-views">Views on YouTube</label>
                  <input type="number" id="edit-views" value="${views}" min="0">
              </div>
              <button class="save-button">Save</button>
              <button class="cancel-button">Cancel</button>
          `;

          card.querySelector('.save-button').addEventListener('click', () => {
              const newSongName = document.getElementById('edit-song-name').value;
              const newArtist = document.getElementById('edit-artist').value;
              const newDuration = document.getElementById('edit-duration').value;
              const newViews = document.getElementById('edit-views').value;

              updateSongInLocalStorage(songName, artist, newSongName, newArtist, newDuration, newViews);

              card.innerHTML = `
                  <h2>${newSongName}</h2>
                  <p>${newArtist}</p>
                  <p>Duration: ${newDuration} seconds</p>
                  <p>Views: ${newViews} on YouTube</p>
                  <button class="edit-button">Edit</button>
                  <button class="delete-button">Delete</button>
              `;

              addEventListeners(card, newSongName, newArtist, newDuration, newViews);
              loadSongsFromLocalStorage(); 
          });

          card.querySelector('.cancel-button').addEventListener('click', () => {
              card.innerHTML = `
                  <h2>${songName}</h2>
                  <p>${artist}</p>
                  <p>Duration: ${duration} seconds</p>
                  <p>Views: ${views} on YouTube</p>
                  <button class="edit-button">Edit</button>
                  <button class="delete-button">Delete</button>
              `;

              addEventListeners(card, songName, artist, duration, views);
          });
      });

      card.querySelector('.delete-button').addEventListener('click', () => {
          deleteSong(songName, artist);
          card.remove();
          loadSongsFromLocalStorage(); 
      });
  }

  function updateSongInLocalStorage(oldName, oldArtist, newName, newArtist, newDuration, newViews) {
      let songs = JSON.parse(localStorage.getItem('songs')) || [];
      const songIndex = songs.findIndex(song => song.name === oldName && song.artist === oldArtist);
      if (songIndex !== -1) {
          songs[songIndex] = {
              name: newName,
              artist: newArtist,
              duration: newDuration,
              views: newViews
          };
          localStorage.setItem('songs', JSON.stringify(songs));
      }
  }

  function deleteSong(songName, artist) {
      let songs = JSON.parse(localStorage.getItem('songs')) || [];
      const songIndex = songs.findIndex(song => song.name === songName && song.artist === artist);
      if (songIndex !== -1) {
          songs.splice(songIndex, 1);
          localStorage.setItem('songs', JSON.stringify(songs));
          loadSongsFromLocalStorage();
      }
  }

  function countAllViews(songs) {
      let totalViews = 0;
      songs.forEach(song => {
          totalViews += parseInt(song.views) || 0;
      });
      totalViewsLabel.textContent = `Total Views: ${totalViews}`;
  }

  if (deleteAllCardsButton) {
      deleteAllCardsButton.addEventListener('click', () => {
          if (confirm('Are you sure you want to delete all songs?')) {
              localStorage.removeItem('songs');
              mainContent.innerHTML = '';
              totalViewsLabel.textContent = `Total Views: 0`;
          }
      });
  }

  if (sortToggle) {
      sortToggle.addEventListener('change', () => {
          const sortByDuration = sortToggle.checked;
          const searchQuery = searchInput.value.trim();
          loadSongsFromLocalStorage(searchQuery, sortByDuration);
      });
  }

  if (searchForm) {
      searchForm.addEventListener('submit', (event) => {
          event.preventDefault();
          const searchQuery = searchInput.value.trim();
          loadSongsFromLocalStorage(searchQuery);
      });
  }

  loadSongsFromLocalStorage();
});
