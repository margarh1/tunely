/************
 * DATABASE *
 ************/

var db = require('../models');

// GET /api/albums
function index(req, res) {
  db.Album.find(function(err, albums) {
    if (err) { return console.log(err); }
    res.json(albums);
  });
};

function create(req, res) {
  var newAlbum = new db.Album({
    name: req.body.name,
    artistName: req.body.artistName,
    releaseDate: req.body.releaseDate,
    genres: []
  });

  var genresArray = req.body.genres.split(', ');
  newAlbum.genres = genresArray;
  newAlbum.save(function(err, album) {
    if (err) { return console.log('error creating ' + album)};
    console.log('created ' + album);
    res.json(album);
  })
};

function show(req, res) {
  // FILL ME IN !
}

function destroy(req, res) {
  // FILL ME IN !
}

function update(req, res) {
  // FILL ME IN !
}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
