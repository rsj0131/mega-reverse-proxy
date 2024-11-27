const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/stream/:fileId', async (req, res) => {
  const fileId = req.params.fileId; // Mega file ID
  const megaEmbedUrl = `https://mega.nz/embed/${fileId}`;

  try {
    const response = await fetch(megaEmbedUrl);

    if (!response.ok) {
      res.status(response.status).send('Error fetching video');
      return;
    }

    res.setHeader('Content-Type', response.headers.get('Content-Type') || 'video/mp4');
    res.setHeader('Content-Length', response.headers.get('Content-Length'));

    response.body.pipe(res);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/', (req, res) => {
  res.send('Mega Reverse Proxy is Running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
