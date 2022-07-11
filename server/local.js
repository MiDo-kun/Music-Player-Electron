const fs = require('fs');

// Get local files
app.get('/directory', async function(req, res, next) {
   const dir = await fs.readdirSync('./public/music');
   res.json(dir);
   next();
});