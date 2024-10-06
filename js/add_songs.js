document.addEventListener('DOMContentLoaded', () => {
    const addSongForm = document.getElementById('add-song-form');

    addSongForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const songName = document.getElementById('song-name').value;
        const artist = document.getElementById('artist').value;
        const duration = document.getElementById('duration').value;
        const views = document.getElementById('views').value;

        if (!songName || !artist || !duration || !views) {
            alert('All fields are required.');
            return;
        }

        if (isNaN(duration) || duration <= 0) {
            alert('Duration must be a positive number.');
            return;
        }

        if (isNaN(views) || views < 0) {
            alert('Views must be a non-negative number.');
            return;
        }

        const song = {
            name: songName,
            artist: artist,
            duration: duration,
            views: views
        };

        saveSongToLocalStorage(song);

        addSongForm.reset();
        alert('Song added successfully!');

        window.location.href = 'index.html';
    });

    const saveSongToLocalStorage = (song) => {
        let songs = JSON.parse(localStorage.getItem('songs')) || [];
        songs.push(song);
        localStorage.setItem('songs', JSON.stringify(songs));
    };
});