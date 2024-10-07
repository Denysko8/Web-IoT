const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '..')));

let songs = [];
let idCounter = 1;

app.post('/songs', (req, res) => {
    const song = { id: idCounter++, ...req.body };
    songs.push(song);
    res.status(201).json(song);
});

app.get('/songs', (req, res) => {
    let { searchQuery = '', sortByDuration = 'false' } = req.query;
    searchQuery = searchQuery.toLowerCase();
    sortByDuration = sortByDuration === 'true';

    let filteredSongs = songs.filter(song =>
        song.name.toLowerCase().includes(searchQuery) ||
        song.artist.toLowerCase().includes(searchQuery)
    );

    if (sortByDuration) {
        filteredSongs.sort((a, b) => a.duration - b.duration);
    }

    const totalViews = filteredSongs.reduce((sum, song) => sum + parseInt(song.views), 0);

    res.json({ songs: filteredSongs, totalViews });
});

app.put('/songs/:id', (req, res) => {
    const { id } = req.params;
    const index = songs.findIndex(song => song.id == id);
    if (index !== -1) {
        songs[index] = { id: parseInt(id), ...req.body };
        res.json(songs[index]);
    } else {
        res.status(404).json({ message: 'Song not found' });
    }
});

app.delete('/songs/:id', (req, res) => {
    const { id } = req.params;
    const index = songs.findIndex(song => song.id == id);
    if (index !== -1) {
        const deletedSong = songs.splice(index, 1);
        res.json(deletedSong);
    } else {
        res.status(404).json({ message: 'Song not found' });
    }
});

app.delete('/songs', (req, res) => {
    songs = [];
    idCounter = 1;
    res.status(200).json({ message: 'All songs deleted successfully' });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.get('/add_songs', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'add_songs.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Serving files from: ${path.join(__dirname, '..')}`);
});