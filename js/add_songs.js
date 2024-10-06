document.addEventListener('DOMContentLoaded', () => {
    const addSongForm = document.getElementById('add-song-form');

    addSongForm.addEventListener('submit', async (event) => {
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

        try {
            const response = await fetch('http://localhost:3000/songs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(song)
            });

            if (response.ok) {
                alert('Song added successfully!');
                window.location.href = 'index.html';
            } else {
                const errorText = await response.text();
                console.error('Failed to add song:', errorText);
                alert('Failed to add song.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add song.');
        }
    });
});