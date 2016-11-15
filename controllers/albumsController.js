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
  db.Album.findById(req.params.id, function(err, album) {
    if (err) { return console.log('error showing ' + album); }
    res.json(album);
  });
};

function destroy(req, res) {
  var albumId = req.params.id;
  db.Album.findOneAndRemove({ _id: albumId }, function(err, deletedAlbum) {
    if (err) { return console.log(err); }
    console.log('deleted ' + deletedAlbum);
    res.json(deletedAlbum);
  });
};

function updateSong(req, res) {
  db.Album.findById(req.params.id, function(err, album) {
    if (err) { return console.log('error updating ' + album + ' songs'); }
    album.songs.push(req.body);
    album.save(function(err, album) {
      if (err) { return console.log('error updating ' + album); }
      console.log('updated ' + album);
      res.json(album);
    });
  });
};

function update(req, res) {
  db.Album.findById(req.params.id, function(err, album) {
    if (err) { return console.log('error updating ' + album); }
    album.name = req.body.name;
    album.artistName = req.body.artistName;
    album.releaseDate = req.body.releaseDate;
    album.save(function(err, album) {
      if (err) { return console.log('error updating ' + album); }
      console.log('updated ' + album);
      res.json(album);
    });
  });
};


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  updateSong: updateSong,
  update: update
};
