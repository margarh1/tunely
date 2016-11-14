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
}

function create(req, res) {
  // FILL ME IN !
}

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
