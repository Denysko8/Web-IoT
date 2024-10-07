document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const deleteAllCardsButton = document.getElementById('delete-all-cards');
    const totalViewsLabel = document.getElementById('total-views-label');
    const sortToggle = document.getElementById('sort-toggle');

    async function loadSongsFromAPI(searchQuery = '', sortByDuration = false) {
        console.log('Loading songs...');
        try {
            const response = await fetch('http://localhost:3000/songs');
            let songs = await response.json();
            console.log('Fetched songs:', songs);

            mainContent.innerHTML = '';

            songs = songs.filter(song =>
                song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                song.artist.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (sortByDuration) {
                songs.sort((a, b) => a.duration - b.duration);
            }

            songs.forEach((song) => {
                const songCard = createSongCard(song);
                mainContent.appendChild(songCard);
            });

            countAllViews(songs);
        } catch (error) {
            console.error('Error loading songs:', error);
        }
    }

    function createSongCard(song) {
        const songCard = document.createElement('div');
        songCard.classList.add('song-card');
        songCard.innerHTML = `
            <h2>${song.name}</h2>
            <p>${song.artist}</p>
            <p>Duration: ${song.duration} seconds</p>
            <p>Views: ${song.views}</p>
            <button class="edit-button">Edit</button>
            <button class="delete-button" data-id="${song.id}">Delete</button>
        `;

        addEventListeners(songCard, song);
        return songCard;
    }

    function addEventListeners(card, song) {
        card.querySelector('.edit-button').addEventListener('click', () => {
            card.innerHTML = `
                <div class="edit-field">
                    <label for="edit-song-name">Song Name</label>
                    <input type="text" id="edit-song-name" value="${song.name}">
                </div>
                <div class="edit-field">
                    <label for="edit-artist">Artist</label>
                    <input type="text" id="edit-artist" value="${song.artist}">
                </div>
                <div class="edit-field">
                    <label for="edit-duration">Duration (in seconds)</label>
                    <input type="number" id="edit-duration" value="${song.duration}" min="1">
                </div>
                <div class="edit-field">
                    <label for="edit-views">Views on YouTube</label>
                    <input type="number" id="edit-views" value="${song.views}" min="0">
                </div>
                <button class="save-button">Save</button>
                <button class="cancel-button">Cancel</button>
            `;

            card.querySelector('.save-button').addEventListener('click', async () => {
                const newSongName = document.getElementById('edit-song-name').value;
                const newArtist = document.getElementById('edit-artist').value;
                const newDuration = document.getElementById('edit-duration').value;
                const newViews = document.getElementById('edit-views').value;

                const updatedSong = {
                    name: newSongName,
                    artist: newArtist,
                    duration: newDuration,
                    views: newViews
                };

                try {
                    const response = await fetch(`http://localhost:3000/songs/${song.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedSong)
                    });

                    if (response.ok) {
                        alert('Song updated successfully!');
                        loadSongsFromAPI();
                    } else {
                        alert('Failed to update song.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Failed to update song.');
                }
            });

            card.querySelector('.cancel-button').addEventListener('click', () => {
                loadSongsFromAPI();
            });
        });

        card.querySelector('.delete-button').addEventListener('click', async () => {
            try {
                const response = await fetch(`http://localhost:3000/songs/${song.id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    alert('Song deleted successfully!');
                    loadSongsFromAPI();
                } else {
                    alert('Failed to delete song.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to delete song.');
            }
        });
    }

    function countAllViews(songs) {
        let totalViews = songs.reduce((total, song) => total + parseInt(song.views || 0), 0);
        totalViewsLabel.textContent = `Total Views: ${totalViews}`;
    }

    console.log('Delete all button element:', deleteAllCardsButton);

    if (deleteAllCardsButton) {
        console.log('Adding click event listener to delete all button');
        deleteAllCardsButton.addEventListener('click', async () => {
            console.log('Delete all button clicked');
            if (confirm('Are you sure you want to delete all songs?')) {
                try {
                    console.log('Sending delete request...');
                    const response = await fetch('http://localhost:3000/songs', {
                        method: 'DELETE'
                    });

                    console.log('Delete response:', response);

                    if (response.ok) {
                        console.log('Delete successful');
                        mainContent.innerHTML = '';
                        totalViewsLabel.textContent = 'Total Views: 0';
                        alert('All songs deleted successfully!');
                    } else {
                        console.error('Delete failed:', await response.text());
                        alert('Failed to delete all songs.');
                    }
                } catch (error) {
                    console.error('Error deleting all songs:', error);
                    alert('Failed to delete all songs.');
                }
            }
        });
    } else {
        console.error('Delete all button not found in the DOM');
    }

    if (sortToggle) {
        sortToggle.addEventListener('change', () => {
            const sortByDuration = sortToggle.checked;
            const searchQuery = searchInput.value.trim();
            loadSongsFromAPI(searchQuery, sortByDuration);
        });
    }

    if (searchForm) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const searchQuery = searchInput.value.trim();
            loadSongsFromAPI(searchQuery, sortToggle.checked);
        });
    }

    loadSongsFromAPI();
});