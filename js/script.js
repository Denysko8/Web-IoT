document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    
    // Function to load songs from local storage and display them
    function loadSongsFromLocalStorage() {
        let songs = JSON.parse(localStorage.getItem('songs')) || [];
        mainContent.innerHTML = ''; // Clear existing content
        songs.forEach((song, index) => {
            const songCard = createSongCard(song, index);
            mainContent.appendChild(songCard);
        });
    }

    // Load songs when the page loads
    loadSongsFromLocalStorage();

    function createSongCard(song, index) {
        const songCard = document.createElement('div');
        songCard.classList.add('song-card');
        songCard.innerHTML = `
            <h2>${song.name}</h2>
            <p>${song.artist}</p>
            <p>Duration: ${song.duration} seconds</p>
            <p>Views: ${song.views} on YouTube</p>
            <button class="edit-button">Edit</button>
            <button class="delete-button" data-index="${index}">Delete</button>
        `;
        return songCard;
    }
    // Function to add event listeners to edit and delete buttons
    const addEventListeners = (card, songName, artist, duration, views) => {
        card.querySelector('.edit-button').addEventListener('click', () => {
            card.innerHTML = `
                <input type="text" value="${songName}" class="edit-song-name" />
                <input type="text" value="${artist}" class="edit-artist" />
                <input type="text" value="${duration}" class="edit-duration" />
                <input type="text" value="${views}" class="edit-views" />
                <button class="save-button">Save</button>
                <button class="cancel-button">Cancel</button>
            `;

            card.querySelector('.save-button').addEventListener('click', () => {
                const newSongName = card.querySelector('.edit-song-name').value;
                const newArtist = card.querySelector('.edit-artist').value;
                const newDuration = card.querySelector('.edit-duration').value;
                const newViews = card.querySelector('.edit-views').value;

                card.innerHTML = `
                    <h2>${newSongName}</h2>
                    <p>${newArtist}</p>
                    <p>Duration: ${newDuration} seconds</p>
                    <p>Views: ${newViews} on YouTube</p>
                    <button class="edit-button">Edit</button>
                    <button class="delete-button">Delete</button>
                `;

                addEventListeners(card, newSongName, newArtist, newDuration, newViews);
                updateLocalStorage(newSongName, newArtist, newDuration, newViews, songName, artist);
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
        });
    };

    const updateLocalStorage = (newSongName, newArtist, newDuration, newViews, oldSongName, oldArtist) => {
        let songs = JSON.parse(localStorage.getItem('songs')) || [];
        const songIndex = songs.findIndex(song => song.name === oldSongName && song.artist === oldArtist);
        if (songIndex !== -1) {
            songs[songIndex] = {
                name: newSongName,
                artist: newArtist,
                duration: newDuration,
                views: newViews
            };
            localStorage.setItem('songs', JSON.stringify(songs));
        }
    };

    // Count all YouTube views
    if (countAllViewsButton) {
        countAllViewsButton.addEventListener('click', () => {
            let songs = JSON.parse(localStorage.getItem('songs')) || [];
            let totalViews = songs.reduce((sum, song) => sum + parseInt(song.views, 10), 0);
            totalViewsLabel.textContent = `Total Views: ${totalViews}`;
        });
    }
    
    function deleteSong(index) {
        let songs = JSON.parse(localStorage.getItem('songs')) || [];
        songs.splice(index, 1);
        localStorage.setItem('songs', JSON.stringify(songs));
        loadSongsFromLocalStorage(); // Reload the songs after deletion
    }

    // Event delegation for delete buttons
    mainContent.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-button')) {
            const index = parseInt(event.target.getAttribute('data-index'));
            deleteSong(index);
        }
    });
    
    // Delete all cards
    if (deleteAllCardsButton) {
        deleteAllCardsButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete all songs?')) {
                localStorage.removeItem('songs');
                mainContent.innerHTML = '';
            }
        });
    }
});