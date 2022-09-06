const compression = require('compression');
const express = require('express');

const app = express();

app.use(compression());
app.set('etag', false);

app.use(express.static('public', {
  // We want manual control over the caching headers.
  cacheControl: false,
  etag: false,
  lastModified: false,
}));

app.get('/api/minutes', (request, response) => {
  response.append('Cache-Control', 'max-age=1, stale-while-revalidate=59');
  const minutes = (new Date()).getMinutes();
  response.send({minutes});
});

const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
