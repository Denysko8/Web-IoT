const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3002; // Ensure port is set to 3002

// Define images path
const imagesPath = path.join(__dirname, 'images');

// Check if images directory exists
if (!fs.existsSync(imagesPath)) {
    console.error(`Error: Images directory not found at ${imagesPath}`);
    process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the images directory
app.use('/images', express.static(imagesPath));

// Album data
const previewAlbums = [
    { id: 1, img_path: '/images/ogwau.jpg', album_name: 'Only God Was Above Us', artist_name: 'The Vampire Weekend', year: '2024', genre: 'Indie Rock', price: '$30' },
    { id: 2, img_path: '/images/paranoid.png', album_name: 'Paranoid', artist_name: 'Black Sabbath', year: '1970', genre: 'Heavy Metal', price: '$25' },
    { id: 3, img_path: '/images/blackstar.jpg', album_name: 'Blackstar', artist_name: 'David Bowie', year: '2016', genre: 'Jazz-Rock', price: '$25' },
    { id: 4, img_path: '/images/filosofem.jpg', album_name: 'Filosofem', artist_name: 'Burzum', year: '1996', genre: 'Black Metal', price: '$20' },
    { id: 5, img_path: '/images/ksg.jpg', album_name: 'Kids See Ghosts', artist_name: 'Kid Cudi & Kanye West', year: '2018', genre: 'Experimental Hip Hop', price: '$25' },
    { id: 6, img_path: '/images/tdsotm.png', album_name: 'The Dark Side Of The Moon', artist_name: 'Pink Floyd', year: '1973', genre: 'Progressive Rock', price: '$20' },
];

const fullAlbums = [
    { id: 7, img_path: '/images/in_rainbows.png', album_name: "In Rainbows", artist_name: "Radiohead", year : '2007', genre: "Art Rock", price: "$40" },
    { id: 8, img_path: '/images/dummy.jpg', album_name: "Dummy", artist_name: "Portishead", year : '1994', genre: "Trip Hop", price: "$35" },
    { id: 9, img_path: '/images/demon_days.jpg', album_name: "Demon Days", artist_name: "Gorillaz", year: '2005', genre: "Alternative Hip Hop", price: "$10" },
    { id: 10, img_path: '/images/toxicity.jpg', album_name: "Toxicity", artist_name: "System of a Down", year: '2001', genre: "Alternative Metal", price: "$20" },
    { id: 11, img_path: '/images/nevermind.jpg', album_name: "Nevermind", artist_name: "Nirvana", year: '1991', genre: "Grunge", price: "$15" },
    { id: 12, img_path: '/images/hk.jpg', album_name: "Hollow Knight OST", artist_name: "Christopher Larkin", year: '2017', genre: "Cinematic Classical", price: "$25" },
];

// API endpoints

app.get('/catalog', (req, res) => {
    try {
        console.log('Received request for /catalog');
        console.log('Query params:', req.query);
        
        const { searchQuery, genre, decade, sortBy } = req.query;
        let filteredAlbums = [...fullAlbums];

        if (searchQuery) {
            filteredAlbums = filteredAlbums.filter(album => 
                album.album_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                album.artist_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (genre && genre !== 'All genres') {
            filteredAlbums = filteredAlbums.filter(album => {
                if (genre === 'Rock') {
                    return album.genre.includes('Rock') || album.genre.includes('Grunge');
                } else if (genre === 'Other') {
                    return album.genre.includes('Cinematic Classical');
                } else {
                    return album.genre.includes(genre);
                }
            });
        }

        if (decade && decade !== 'All decades') {
            const decadeStart = parseInt(decade);
            filteredAlbums = filteredAlbums.filter(album => 
                parseInt(album.year) >= decadeStart &&
                parseInt(album.year) < decadeStart + 10
            );
        }

        if (sortBy === 'year') {
            filteredAlbums.sort((a, b) => {
                const yearA = parseInt(a.year);
                const yearB = parseInt(b.year);
                return sortDirection === 'asc' ? yearA - yearB : yearB - yearA;
            });
        }

        console.log('Sending response:', filteredAlbums);
        res.json(filteredAlbums);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to fetch preview albums
app.get('/preview', (req, res) => {
    try {
        console.log('Received request for /preview');
        res.json(previewAlbums);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to fetch a single album by ID
app.get('/catalog/:id', (req, res) => {
    try {
        const albumId = parseInt(req.params.id);
        const album = fullAlbums.find(album => album.id === albumId);
        if (!album) {
            return res.status(404).json({ error: 'Album not found' });
        }
        res.json(album);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/preview/:id', (req, res) => {
    try {
        const albumId = parseInt(req.params.id);
        const album = previewAlbums.find(album => album.id === albumId);
        if (!album) {
            return res.status(404).json({ error: 'Album not found' });
        }
        res.json(album);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use`);
        process.exit(1);
    }
});