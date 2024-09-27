document.addEventListener('DOMContentLoaded', () => {
  const addSongForm = document.getElementById('add-song-form');
  const mainContent = document.getElementById('main-content');
  const sortToggle = document.getElementById('sort-toggle');
  const countAllViewsButton = document.getElementById('count_all_views');
  const totalViewsLabel = document.getElementById('total-views-label');
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const deleteAllCardsButton = document.getElementById('delete-all-cards');
  let originalOrder = [];
  let isSorted = false;

  const addEventListeners = (card, songName, artist, duration, views) => {
    card.querySelector('.delete-button').addEventListener('click', () => {
      mainContent.removeChild(card);
      originalOrder = Array.from(mainContent.getElementsByClassName('song-card'));
    });

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
          <input type="text" id="edit-duration" value="${duration}">
        </div>
        <div class="edit-field">
          <label for="edit-views">Views on YouTube</label>
          <input type="text" id="edit-views" value="${views}">
        </div>
        <button class="save-button">Save</button>
        <button class="cancel-button">Cancel</button>
      `;

      card.querySelector('.save-button').addEventListener('click', () => {
        const newSongName = document.getElementById('edit-song-name').value;
        const newArtist = document.getElementById('edit-artist').value;
        const newDuration = document.getElementById('edit-duration').value;
        const newViews = document.getElementById('edit-views').value;

        card.innerHTML = `
          <h2>${newSongName}</h2>
          <p>${newArtist}</p>
          <p>Duration --- ${newDuration} seconds</p>
          <p>${newViews} views on YouTube</p>
          <button class="edit-button">Edit</button>
          <button class="delete-button">Delete</button>
        `;

        addEventListeners(card, newSongName, newArtist, newDuration, newViews);
        originalOrder = Array.from(mainContent.getElementsByClassName('song-card'));
      });

      card.querySelector('.cancel-button').addEventListener('click', () => {
        card.innerHTML = `
          <h2>${songName}</h2>
          <p>${artist}</p>
          <p>Duration --- ${duration} seconds</p>
          <p>${views} views on YouTube</p>
          <button class="edit-button">Edit</button>
          <button class="delete-button">Delete</button>
        `;

        addEventListeners(card, songName, artist, duration, views);
      });
    });
  };

  addSongForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const songName = document.getElementById('song-name').value;
    const artist = document.getElementById('artist').value;
    const duration = document.getElementById('duration').value;
    const views = document.getElementById('views').value;

    const card = document.createElement('div');
    card.classList.add('song-card');
    card.dataset.duration = duration; 
    card.dataset.views = views; 
    card.dataset.songName = songName.toLowerCase(); 
    card.dataset.artist = artist.toLowerCase(); 
    card.innerHTML = `
      <h2>${songName}</h2>
      <p>${artist}</p>
      <p>Duration --- ${duration} seconds</p>
      <p>${views} views on YouTube</p>
      <button class="edit-button">Edit</button>
      <button class="delete-button">Delete</button>
    `;

    mainContent.appendChild(card);
    addEventListeners(card, songName, artist, duration, views);
    originalOrder = Array.from(mainContent.getElementsByClassName('song-card'));
    addSongForm.reset();
  });

  sortToggle.addEventListener('click', () => {
    const cards = Array.from(mainContent.getElementsByClassName('song-card'));
    if (isSorted) {
      mainContent.innerHTML = '';
      originalOrder.forEach(card => mainContent.appendChild(card));
    } else {
      cards.sort((a, b) => parseInt(a.dataset.duration) - parseInt(b.dataset.duration));
      mainContent.innerHTML = '';
      cards.forEach(card => mainContent.appendChild(card));
    }
    isSorted = !isSorted;
  });

  countAllViewsButton.addEventListener('click', () => {
    const cards = Array.from(mainContent.getElementsByClassName('song-card'));
    const visibleCards = cards.filter(card => card.style.display !== 'none');
    const totalViews = visibleCards.reduce((sum, card) => sum + parseInt(card.dataset.views), 0);
    totalViewsLabel.textContent = `Total Views: ${totalViews}`;
  });

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchTerm = searchInput.value.toLowerCase().replace(/\s+/g, '');
    const cards = Array.from(mainContent.getElementsByClassName('song-card'));
    cards.forEach(card => {
      const songName = card.dataset.songName.toLowerCase();
      const artist = card.dataset.artist.toLowerCase();
      if (songName.includes(searchTerm) || artist.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });

  deleteAllCardsButton.addEventListener('click', () => {
    mainContent.innerHTML = '';
    originalOrder = [];
    
  });

});